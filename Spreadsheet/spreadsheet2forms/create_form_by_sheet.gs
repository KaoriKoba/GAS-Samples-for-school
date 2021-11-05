/** 
 *  @file create_form_by_sheet.gs
 *  @brief スプレッドシートから問題用のFormを生成する。
 * 
 *  @author Kaori Kobayashi(Takinami)
 *  @date 2021/6/20
 */

const IS_QUIZ = true; // true:テスト形式にする false:テスト形式にしない

/**
 * @param {string} message 送信時に表示するメッセージはここを書き換えてください
 * @param {string} description アンケートやフォームの説明はここを書き換えてください 
 */
function SETTING_FORMS (forms, message="", description="")
{
  forms.setIsQuiz(IS_QUIZ); // テスト形式にする(true)
  // form.setRequireLogin(true); // loginを求める こちらは自動的に変更されるため設定できません。
  forms.setCollectEmail(false); // E-mailは集めない(false) 集める場合は true
  forms.setLimitOneResponsePerUser(false); //  何度も返答可能(false)
  forms.setPublishingSummary(false); // 他のユーザーのテキストの回答と概要グラフを閲覧しない(false)
  forms.setAllowResponseEdits(false); // 送信後に編集しない(false)
  forms.setShowLinkToRespondAgain(true); // 別の回答を送信するためのリンクを表示する(true)

  // メッセージ
  forms.setConfirmationMessage(message); // 送信時表示されるメッセージ
  forms.setDescription(description); // 説明
}

/**
 * Formをスプレッドシートからつくる。
 * @param {string} formFilename 書き出されるFormのファイル名。デフォルトはスプレッドシート名+実行日時
 * @param {string} sheetName Formsを作るための問題が記載されているシート名。デフォルトは「問題と解答」
 */
function createTestBySheet(formFilename, sheetName = '問題と解答') {
  const dateString = Utilities.formatDate(new Date(), "JMT", "yyyy/MM/dd_hh:mm:ss");
  const spreadsheet = getSettingSheet(sheetName);
  var forms;

  // 書き出しファイル名の確認。未設定の場合現在は スプレッドシート名+生成日時
  if (!formFilename) {
    formFilename = SpreadsheetApp.getActiveSpreadsheet().getName() + dateString;
  };

  forms = new FormApp.create(formFilename);
  SETTING_FORMS(forms);

  // データの読み出し
  const values = spreadsheet.getDataRange().getValues();
  
  // 1行目は見出しとして飛ばす
  for (var i = 1; i < values.length ; i++ ) {
      var j = 0;
      Logger.log(values[i] + "\n");

      // 問題文セット
      item.setTitle( values[i][j++] ); 

      // テストなら 正解と点数、フィードバックをセット
      if (IS_QUIZ) {
      const correctAns = values[i][j++];
      const points = values[i][j++];
      const correctFeedbak = values[i][j++];

      // 正解だった時のコメント
      if (String(correctFeedbak).length > 0) {
        item.setFeedbackForCorrect(FormApp.createFeedback().setText(String(correctComment)).build());
      }
      // 不正解だった時のコメント
      if (String(incorrectComment).length > 0) {
        item.setFeedbackForIncorrect(FormApp.createFeedback().setText(String(incorrectComment)).build());
      }
      }

      // ラジオボタンの項目設定
      for (itemNo = j; itemNo < values[i].length ; itemNo++) {

      }

  }

}





function getSettingSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!sheetName)
    return ss.getActiveSheet();
  else
    return ss.getSheetByName(sheetName);

}

function gatCellImages(sheetName = '問題と解答') {
  const sheet = getSettingSheet(sheetName);
  var cellImg = sheet.getImage();
  Logger.log(cellImg);

}

function gatSettingValuse(sheetName) {
  var sheet;
  var valuses;

  sheet = getSettingSheet(sheetName);
  valuse = sheet.getDataRange().getValues();
  return valuses;


}
