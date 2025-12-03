// Learn more about extending Sheets with Editor add-ons at https://developers.google.com/workspace/add-ons/editors/sheets
import fetchAndWriteTradingPartnerDataToSheet from "./fetchAndWriteTradingPartnerDataToSheet";

export function setupSideBar() {
	const ui = SpreadsheetApp.getUi();
	const html = HtmlService.createTemplateFromFile("src/index.html")
		.evaluate()
		.setSandboxMode(HtmlService.SandboxMode.IFRAME);
	html.setTitle(" ");
	ui.showSidebar(html);
}

export function onOpen() {
	SpreadsheetApp.getUi()
		.createMenu("MoneyForward")
		.addItem("Start", "setupSideBar")
		.addToUi();
}

export function onInstall() {
	onOpen();
}

// Export all functions to expose to the client
export { fetchAndWriteTradingPartnerDataToSheet };
