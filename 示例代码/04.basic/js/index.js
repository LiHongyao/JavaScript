var o = { a: 1 };
function t() {
  console.log(this)
}
[1, 2, 3].forEach(t, o);
