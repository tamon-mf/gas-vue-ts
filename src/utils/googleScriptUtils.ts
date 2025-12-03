/**
 * Google Apps Script Utilities
 * Provides helper functions for working with google.script.run API
 */
const GoogleScriptUtils = {
	/**
	 * Wraps a google.script.run call in a Promise for easier async/await usage
	 *
	 * @param {string} methodName - The name of the server-side function to call
	 * @param {...*} args - Arguments to pass to the server-side function
	 * @returns {Promise<*>} Promise that resolves with the server-side function result
	 *
	 * @example
	 * // Without arguments
	 * const accounts = await GoogleScriptUtils.runAsync('getAccounts');
	 *
	 * @example
	 * // With arguments
	 * const data = await GoogleScriptUtils.runAsync('getTradingPartnerData', params);
	 */
	runAsync: (methodName: string, ...args: any[]) => {
		return new Promise((resolve, reject) => {
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				[methodName](...args);
		});
	},
};

export default GoogleScriptUtils;
