/** @file add_menu.gs
 *  @brief メニューバーにメニューを追加する
 *
 *  onOpen はファイルを開く度に実行されます。
 *  メニュー名を変更したい場合は menuName と menuEntries を
 *  変更します。
 *
 *  @author Kaori Kobayashi(Takinami)
 *  @date 2022/02/16
 */

function onOpen() {
  var menuName = '回答リセット'; // メニュー名
  var menuEntries = [
    { name: 'リセット', functionName: 'resetAns' }, // { name: "メニュー名1", functionName: "呼び出す関数名1" }
  ];

  SpreadsheetApp.getActive().addMenu(menuName, menuEntries);
}
