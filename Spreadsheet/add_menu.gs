/** @file add_menu.gs
 *  @brief メニューバーにメニューを追加する
 *
 *  onOpen はファイルを開く度に実行されます。
 *  メニュー名を変更したい場合は menuName と menuEntries を
 *  変更します。
 *
 *  @author Kaori Kobayashi(Takinami)
 *  @date 2021/6/13
 */

function onOpen() {
  var menuName = 'ダイアログサンプル'; // メニュー名
  var menuEntries = [
    { name: 'ダイアログのテスト1', functionName: 'sampleDialog1' }, //  { name: "メニュー名1", functionName: "呼び出す関数名1" },
    null, // 区切り線
    { name: 'ダイアログのテスト2', functionName: 'sampleDialog2' }, //  { name: "メニュー名2", functionName: "呼び出す関数名2" },
    { name: 'ダイアログのテスト3', functionName: 'sampleDialog3' }  //  { name: "メニュー名2", functionName: "呼び出す関数名3" },
  ];

  SpreadsheetApp.getActive().addMenu(menuName, menuEntries);
}
