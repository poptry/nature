//下拉动画
export function animation(obj, target, fn1) {
    // console.log(fn1);
    // fn是一个回调函数，在定时器结束的时候添加
    // 每次开定时器之前先清除掉定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      // 步长计算公式  越来越小
      // 步长取整
      var step = (target - obj.scrollTop) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (obj.scrollTop >= target) {
        clearInterval(obj.timer);
        // 如果fn1存在，调用fn
        if (fn1) {
          fn1();
        }
      } else {
        // 每30毫秒就将新的值给obj.left
        obj.scrollTop = obj.scrollTop + step;
      }
    }, 10);
  }
  export function getTime(timestamp){
    let date = new Date(timestamp * 1000);
    // 获取日期和时间的各个部分
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // 月份是从0开始的，所以要加1
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedDate
  }
  //return now timestamp
  export function getNowTimeStamp(){
    return Math.round(new Date().getTime()/1000)
  }
  //将时间转换为时间戳
  export function getTimestamp(time){
    return Math.round(new Date(time).getTime()/1000)
  }