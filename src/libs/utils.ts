export function dateformat(date: Date, fmt: string) {
  date = date == undefined ? new Date() : date;
  date = typeof date == 'number' ? new Date(date) : date;
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  let obj =
    {
        'y': date.getFullYear(),
        'M': date.getMonth() + 1,
        'd': date.getDate(),
        'q': Math.floor((date.getMonth() + 3) / 3),
        'w': date.getDay(),
        'H': date.getHours(),
        'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
        'm': date.getMinutes(),
        's': date.getSeconds(),
        'S': date.getMilliseconds()
    };
  let week = ['天', '一', '二', '三', '四', '五', '六'];
  for (let i in obj) {
      fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
          let val = obj[i] + '';
          if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
          for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
          return m.length == 1 ? val : val.substring(val.length - m.length);
      });
  }
  return fmt;
}