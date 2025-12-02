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
