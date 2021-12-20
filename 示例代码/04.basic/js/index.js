/*
 * @Author: Lee
 * @Date: 2021-12-15 10:10:45
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-20 15:05:16
 */
(function () {
  var color = 'blue';
  function changeColor() {
    var anotherColor = 'red';
    function swapColors() {
      var tempColor = anotherColor;
      anotherColor = color;
      color = tempColor;
    }
    swapColors();
  }
  changeColor();
})();