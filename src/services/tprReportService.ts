import GoogleScriptUtils from "../utils/googleScriptUtils";

/**
 * Service for Trading Partner Report operations.
 * This service communicates with the Google Apps Script backend.
 */
const TprReportService = {
	/**
	 * Fetches trading partner report data from the API and writes it directly to the active Google Sheet.
	 * Note: This function does NOT return data - it fetches and writes directly to the sheet.
	 *
	 * @param {Object} params - Parameters for the trading partner report
	 * @param {string} params.monthlyDate - Date range
	 * @param {number|null} params.journalId - Journal type ID (optional)
	 * @param {Array<string>} params.approvalStatuses - Approval status values
	 * @param {Array<number>} params.departmentIds - Department IDs
	 * @param {number|null} params.projectId - Project ID (optional)
	 * @param {number|null} params.counterpartyId - Counterparty ID (optional)
	 * @param {boolean} params.withSubAccounts - Include sub-accounts flag
	 * @param {boolean} params.includeTax - Include tax flag
	 * @param {string} params.cell - Starting cell (e.g., "A1")
	 * @param {boolean} params.isClear - Clear sheet before writing flag
	 * @returns {Promise<void>}
	 */
	fetchAndWriteTradingPartnerDataToSheet: async (params: any) => {
		return GoogleScriptUtils.runAsync(
			"fetchAndWriteTradingPartnerDataToSheet",
			params,
		);
	},
};

export default TprReportService;
