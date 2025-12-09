/**
 * Google Apps Script Utilities
 * Provides helper functions for working with google.script.run API
 */
const GoogleScriptUtils = {
	/**
	 * Runs a Google Apps Script function asynchronously with type safety
	 * @template T - The return type of the server function
	 * @param methodName - Name of the server function to call
	 * @param args - Arguments to pass to the server function
	 * @returns Promise that resolves with the typed return value
	 */
	runAsync: <T = unknown>(
		methodName: string,
		...args: Parameters<
			(typeof google.script.run)[keyof typeof google.script.run]
		>
	): Promise<T> => {
		return new Promise<T>((resolve, reject) => {
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				[methodName](...args);
		});
	},
};

export default GoogleScriptUtils;
