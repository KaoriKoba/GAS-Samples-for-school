/** @file reset_answer.gs
 *  @brief 回答欄を初期化する
 *
 *  @author Kaori Kobayashi(Takinami)
 *  @date 2022/02/16
 */


function clrColumn(col) {
  var sheet = SpreadsheetApp.getActiveSheet();
  const lastrow = sheet.getDataRange().getLastRow();
  var range = sheet.getRange(2,col,lastrow);

  range.setValue(false);
}


function resetAns() {
  for (let col = 6; col <= 12; col=col+2 ) {
    clrColumn(col); 
  }

}
