/*
 * @Author: Lee
 * @Date: 2021-12-15 10:10:45
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-20 15:28:36
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

Object.prototype.compare = function (object) {
  var propNamesA = Object.getOwnPropertyNames(this);
  var propNamesB = Object.getOwnPropertyNames(object);

  if (propNamesA.length !== propNamesB.length) {
    return false;
  }
  for (var i = 0; i < propNamesA.length; i++) {
    var propName = propNamesA[i];
    var valueA = this[propName];
    var valueB = object[propName];
    if (typeof valueA === 'object') {
      if (!valueA.compare(valueB)) {
        return false;
      }
    } else {
      if (valueA !== valueB) {
        return false;
      }
    }
  }
  return true;
};
