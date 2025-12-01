// Learn more about extending Sheets with Editor add-ons at https://developers.google.com/workspace/add-ons/editors/sheets

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initialization work is done immediately.
 */
function onInstall() {
  SpreadsheetApp.getUi()
    .createMenu('MoneyForward')
    .addItem('Start', 'setupSideBar')
    .addToUi();
}

function setupSideBar() {
  const ui = SpreadsheetApp.getUi();
  const html = HtmlService
    .createTemplateFromFile('src/index.html')
    .evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
  html.setTitle(' ');
  ui.showSidebar(html);
}
