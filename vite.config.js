import vue from "@vitejs/plugin-vue2";
import path from "path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), viteSingleFile()],
	resolve: {
		alias: [
			{
				find: /^@\/(.+)/,
				replacement: path.resolve(__dirname, "src") + "/$1",
			},
		],
	},
	css: {
		preprocessorOptions: {
			scss: {
				// Add global SASS variables, mixins, etc. if needed
				// additionalData: `@import "@/styles/variables.scss";`,
			},
			sass: {
				// SASS-specific options
			},
		},
	},
	build: {
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "src/index.html"),
			},
		},
		outDir: "dist",
		emptyOutDir: false,
	},
});
