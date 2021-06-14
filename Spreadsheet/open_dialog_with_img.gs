/** @file open_dialog_with_img.gs
 *  @brief 画像付きダイアログを表示する。
 *  
 *  Brower クラスでは画像表示はできなさそうなので
 *  Uiを利用してhtmlで画像を表示させています。
 *
 *  @author Kaori Kobayashi(Takinami)
 *  @date 2021/6/13
 */

function openDialogByFilename(filename, message, imgWidth, imgHeight) {
  var files = DriveApp.getFilesByName(filename);
  var file = files.next();
  var imgUrl = file.getDownloadUrl();

  openDialogWithImg(message, imgUrl, imgWidth, imgHeight);
}

function openDialogById(fileId, message, imgWidth, imgHeight) {
  var file = DriveApp.getFileById(fileId);
  var imgUrl = file.getDownloadUrl();

  openDialogWithImg(message, imgUrl, imgWidth, imgHeight);
}

function openDialogByUrl(imgUrl, message, imgWidth, imgHeight) {
  openDialogWithImg(message, imgUrl, imgWidth, imgHeight);
}

function openDialogWithImg(msg, imgUrl, imgWidth, imgHight) {
  var html = HtmlService.createHtmlOutputFromFile('dialog_with_img');
  var body = html.getContent();

  Logger.log(imgUrl);

  if (imgWidth == undefined) imgWidth = ' ';
  else imgWidth = "width=\"" + imgWidth + '"';
  if (imgHight == undefined) imgHight = ' ';
  else imgHight = "height=\"" + imgHight + '"';

  body = body.replace("__DIALOG_CORRECT_MSG__", msg);
  body = body.replace("__DIALOG_CORRECT_IMG__", imgUrl);
  body = body.replace("__DIALOG_CORRECT_IMG_WIDTH__", imgWidth);
  body = body.replace("__DIALOG_CORRECT_IMG_HEIGHT__", imgHight);

  html.clear();
  html.append(body);
  Logger.log(html.getContent());

  SpreadsheetApp.getUi().showModalDialog(html, 'メッセージ');
}
