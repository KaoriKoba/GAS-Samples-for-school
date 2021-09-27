function createTestForm() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    var today = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd_hh:mm:ss");
    const formTitle = ss.getName() + today; // ファイル名
    const formCreatedMsg = '';
    var i, j, k, l;
    var correctans;
    var question;
    var questionnumber = 0;
    var point = 0;
  
    // Forms作成
    const form = FormApp.create(formTitle);
    Logger.log("ファイル作成中:" + formTitle);
  
    // テストに関する設定
    form.setIsQuiz(true); // テスト形式にする(true)
    // form.setRequireLogin(true); // loginを求める こちらは自動的に変更されるため設定できません。
    form.setCollectEmail(false); // E-mailは集めない(false)
    form.setLimitOneResponsePerUser(false); //  何度も返答可能(false)
    form.setPublishingSummary(false); // 他のユーザーのテキストの回答と概要グラフを閲覧しない(false)
    form.setAllowResponseEdits(false); // 送信後に編集しない(false)
    form.setShowLinkToRespondAgain(true); // 別の回答を送信するためのリンクを表示する(true)
    // メッセージ
    form.setConfirmationMessage(""); // 送信時表示されるメッセージ
    form.setDescription(""); // 説明
  
    // 問題シート読み取り
    const datavalues = ss.getSheetByName('問題と解答').getDataRange().getValues(); //データが入っている範囲を読み込む。
    // 1行目は見出し行として捨てる
    datavalues.shift();
    //Logger.log(datavalues);
  
  
  
    //開始番号
    questionnumber = 0;
  
    // ここでフォームの質問を生成
    if (datavalues.length > 0) {
      for (i = 0; i < datavalues.length; i++) {
        var item = form.addMultipleChoiceItem(); // ラジオボタンの質問作成。
        var table = ss.getSheetByName('問題と解答').getRange(i + 2, 2, 1, 5).getValues(); // 各行の2列目、1行5列分読み込む
        var feedback = FormApp.createFeedback();
        var correctComment = datavalues[i][8];
        var incorrectComment = datavalues[i][7];
  
        question = datavalues[i][0]; // 問題
        correctans = getcorrectans(datavalues[i][6]); // 正解の選択肢
        questionnumber++;
        item.setTitle(questionnumber + ". " + datavalues[i][0]); // 質問番号と質問内容
        item.setPoints(datavalues[i][9]); // 得点
        //Logger.log('%s : %s',correctComment, incorrectComment); 
        // 正解だった時のコメント
        if (String(correctComment).length > 0) {
          item.setFeedbackForCorrect(FormApp.createFeedback().setText(String(correctComment)).build());
        }
        // 不正解だった時のコメント
        if (String(incorrectComment).length > 0) {
          item.setFeedbackForIncorrect(FormApp.createFeedback().setText(String(incorrectComment)).build());
        }
        //
  
  
        // ラジオボタンの選択肢作成 空白は飛ばす。
        var n = 0;
        for (l = 0; l < 5; l++) {
          if (table[0][1] !== "") { n++ }
        }
  
        // 選択肢の数に応じてラジオボタンの項目を設定する
        if (n == 5) {
          item.setChoices([
            item.createChoice(String(datavalues[i][1]), correctans[1]),
            item.createChoice(String(datavalues[i][2]), correctans[2]),
            item.createChoice(String(datavalues[i][3]), correctans[3]),
            item.createChoice(String(datavalues[i][4]), correctans[4]),
            item.createChoice(String(datavalues[i][5]), correctans[5]),
          ]);
        } else if (n == 4) {
          item.setChoices([
            item.createChoice(String(datavalues[i][1]), correctans[1]),
            item.createChoice(String(datavalues[i][2]), correctans[2]),
            item.createChoice(String(datavalues[i][3]), correctans[3]),
            item.createChoice(String(datavalues[i][4]), correctans[4]),
          ]);
        } else if (n == 3) {
          item.setChoices([
            item.createChoice(String(datavalues[i][1]), correctans[1]),
            item.createChoice(String(datavalues[i][2]), correctans[2]),
            item.createChoice(String(datavalues[i][3]), correctans[3]),
          ]);
        } else if (n == 2) {
          item.setChoices([
            item.createChoice(String(datavalues[i][1]), correctans[1]),
            item.createChoice(String(datavalues[i][2]), correctans[2]),
          ]);
        }
      }
  
    }
    Browser.msgBox("テストが作成できました。\n" + formTitle);
  }
  
  
  function getcorrectans(values) {
    var rc = [];
    var i;
    for (i = 1; i <= 5; i++) rc[1] = false;
    if (values == '1') {
      rc[1] = true;
    } else if (values == '2') {
      rc[2] = true;
    } else if (values == '3') {
      rc[3] = true;
    } else if (values == '4') {
      rc[4] = true;
    } else if (values == '5') {
      rc[5] = true;
    }
    return rc;
  }
