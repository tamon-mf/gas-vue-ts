// Note: In case rolldown is not working correctly because of its beta status, we can use this script to build the server code.

import { build, context } from "esbuild";
import ts from "typescript";

const ENTRY_POINT = "server/main.ts";
const GLOBAL_NAME = "_entry";

/**
 * Extracts all exported function names from a TypeScript source file.
 * This is needed to generate wrapper functions for Google Apps Script.
 */
function extractExportedFunctionNames(sourceFile: ts.SourceFile): string[] {
	const functionNames: string[] = [];

	function visit(node: ts.Node) {
		// Handle: export function myFunction() { ... }
		if (ts.isFunctionDeclaration(node) && isExported(node) && node.name) {
			functionNames.push(node.name.text);
		}

		// Handle: export const myFunction = ...
		if (ts.isVariableStatement(node) && isExported(node)) {
			node.declarationList.declarations.forEach((decl) => {
				if (ts.isIdentifier(decl.name)) {
					functionNames.push(decl.name.text);
				}
			});
		}

		// Handle: export { functionName }
		if (ts.isExportDeclaration(node) && node.exportClause) {
			if (ts.isNamedExports(node.exportClause)) {
				node.exportClause.elements.forEach((spec) => {
					functionNames.push(spec.name.text);
				});
			}
		}

		ts.forEachChild(node, visit);
	}

	visit(sourceFile);
	return functionNames;
}

/**
 * Checks if a node has the 'export' modifier.
 */
function isExported(node: ts.Node): boolean {
	const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : null;
	return (
		modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false
	);
}

/**
 * Generates wrapper functions for each exported function.
 * These wrappers allow Google Apps Script to call the bundled functions.
 */
function generateWrapperFunctions(functionNames: string[]): string {
	return functionNames
		.map(
			(name) => `function ${name}() {
  return ${GLOBAL_NAME}.${name}(...arguments);
}`,
		)
		.join("\n");
}

/**
 * Gets the build options with current exported function names.
 * This needs to be called fresh on each build to pick up new exports.
 */
function getBuildOptions() {
	// Parse the TypeScript file to find exported functions
	const program = ts.createProgram([ENTRY_POINT], {});
	const sourceFile = program.getSourceFile(ENTRY_POINT);

	if (!sourceFile) {
		throw new Error(`Could not find source file: ${ENTRY_POINT}`);
	}

	const exportedFunctionNames = extractExportedFunctionNames(sourceFile);

	return {
		entryPoints: [ENTRY_POINT],
		format: "iife" as const,
		bundle: true,
		outdir: "dist",
		target: "es6",
		globalName: GLOBAL_NAME,
		banner: {
			js: generateWrapperFunctions(exportedFunctionNames),
		},
	};
}

/**
 * Builds the server code with esbuild.
 * Supports watch mode when run with `tsx watch`.
 */
async function buildServer(watch = false) {
	const buildOptions = getBuildOptions();

	if (watch) {
		// Use context API for watch mode
		// esbuild will watch for changes in dependencies and rebuild automatically
		const ctx = await context({
			...buildOptions,
			plugins: [
				{
					name: "build-logger",
					setup(build) {
						build.onStart(() => {
							// Only show message for rebuilds, not the initial build
							console.log("🔄 Server is building...");
						});
						build.onEnd((result) => {
							if (result.errors.length > 0) {
								console.error("❌ Server build failed");
							} else {
								console.log("✓ Server build completed");
							}
						});
					},
				},
			],
		});

		await ctx.watch();
		console.log("👀 Server is watching for changes...");
		// Process stays alive - esbuild handles rebuilds automatically
	} else {
		// One-time build
		await build(buildOptions);
	}
}

// Check if running in watch mode
// Enable via: WATCH=true tsx server/build.ts
// Or when using: tsx watch server/build.ts (tsx re-runs script, but esbuild watch is more efficient)
const isWatchMode =
	process.argv.includes("--watch") || process.env.WATCH === "true";

buildServer(isWatchMode).catch((error) => {
	console.error("Build error:", error);
	process.exit(1);
});
