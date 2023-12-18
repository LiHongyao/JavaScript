var key = '';
var value = '';

function onKeyChange(event) {
  key = event.target.value;
}
function onValueChange(event) {
  value = event.target.value;
}

function onSetItem() {
  console.log(localStorage.setItem(key, value));
}

function onGetItem() {
  console.log(localStorage.getItem(key));
}

function onRemoveItem() {
  console.log(localStorage.removeItem(key));
}

function onClear() {
  console.log(localStorage.clear());
}
