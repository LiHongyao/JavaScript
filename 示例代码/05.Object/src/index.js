function format(n) {
  return n < 10 ? '0' + n : n;
}
function calc(targetDate, callback) {
  var d, ms, t;
  t = setInterval(function () {
    d = new Date();
    ms = targetDate - d;
    if (ms > 0) {
      var day = format(Math.floor(ms / 1000 / 60 / 60 / 24));
      var hours = format(Math.floor((ms / 1000 / 60 / 60) % 24));
      var minutes = format(Math.floor((ms / 1000 / 60) % 60));
      var seconds = format(Math.floor((ms / 1000) % 60));
      callback({
        day,
        hours,
        minutes,
        seconds,
      });
    } else {
      clearInterval(t);
    }
  }, 1000);
}

calc(new Date('2022/02/01'), function (r) {
  console.log(
    `距离2022年春节还有${r.day}天${r.hours}时${r.minutes}分${r.seconds}秒`
  );
});