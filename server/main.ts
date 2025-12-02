// Learn more about extending Sheets with Editor add-ons at https://developers.google.com/workspace/add-ons/editors/sheets

function setupSideBar() {
  const ui = SpreadsheetApp.getUi();
  const html = HtmlService
    .createTemplateFromFile('src/index.html')
    .evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
  html.setTitle(' ');
  ui.showSidebar(html);
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('MoneyForward')
    .addItem('Start', 'setupSideBar')
    .addToUi();
}

function onInstall() {
  onOpen();
}
