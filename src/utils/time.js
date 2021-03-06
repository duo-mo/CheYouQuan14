export default function time(UTCtiem) {
  var T_pos = UTCtiem.indexOf('T');
  var Z_pos = UTCtiem.indexOf('Z');
  var year_month_day = UTCtiem.substr(0, T_pos);
  var hour_minute_second = UTCtiem.substr(T_pos + 1, Z_pos - T_pos - 1);
  var new_datetime = year_month_day + " " + hour_minute_second;

  var dateTime = new Date(new_datetime);

  var no1new = dateTime.valueOf();

  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  // var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = now.valueOf();  //typescript转换写法

  var milliseconds = 0;
  var timeSpanStr;

  milliseconds = now_new - no1new - 480000;
  // console.log('milliseconds:', milliseconds);

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  }
  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  }
  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }
  return timeSpanStr;

}