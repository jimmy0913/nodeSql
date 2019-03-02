module.exports = {
  /* eslint-disable */
  isEmpty:function(v) {
    if (v == undefined || v == null || v == 'null' || v == 'undefined' || v.toString().trim() == "") {
      return true;
    }
    return false;
  },

  dataLength:function(fData) {
    var intLength = 0
    for (var i = 0; i < fData.length; i++) {
      if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
        intLength = intLength + 2
      else
        intLength = intLength + 1
    }
    return intLength
  },

  ltos:function(str) {
    if (str != null && str.length > 10)
      return str.substring(0, 10)
    return str;

  },

  checkMobile:function(mobile) {
    var myreg = /^((1)+\d{10})$/;
    if (myreg.test(mobile)) {
      return false;
    }
    return true;
  },

  checkVerifi:function(ver) {
    var myreg = /^(\d{6})$/;
    if (myreg.test(ver)) {
      return false;
    }
    return true;
  },

  getParam:function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },

  stoptouchmove:function() {
    document.body.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, false);
  },

  starttouchmove:function() {
    document.body.addEventListener('touchmove', function(event) {
      window.event.returnValue = true;
    }, false);
  },

  stoptouchmoveid:function(id) {
    document.getElementById(id).addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, false);
  },

  starttouchmoveid:function(id) {
    document.getElementById(id).addEventListener('touchmove', function(event) {
      window.event.returnValue = true;
    }, false);
  },

  //[n,m]   返回n,m之间的随机数。包括n和m。
  random:function(n,m){
      return Math.floor(Math.random()*(m-n+1)+n);
  },

  isWeiXin:function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },


  isChinese:function(str){   
   var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
   return reg.test(str);
  },

  checkPoint:function(str) {
    if (!str)
      return false;
    return str.indexOf('.') == -1 ? false : true;
  },

  validPrice:function(str) {
    var reg = /^[1-9]\d*.\d*|0.\d*[1-9]\d*|[1-9]\d*$/;
    return reg.test(str.toString()) ? true : false;
  },


  getWeek:function(date){
    return "星期"+(["天","一","二","三","四","五","六"][new Date(date).getDay()]);
  }

}

/*
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  }
  String.prototype.ltrim = function() {
    return this.replace(/(^\s*)/g, "");
  }
  String.prototype.rtrim = function() {
    return this.replace(/(\s*$)/g, "");
  }

  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  Date.prototype.Format = function(fmt) {
    var o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }

  //两种调用方式
  // var template1="我是{0}，今年{1}了";
  // var template2="我是{name}，今年{age}了";
  // var result1=template1.format("loogn",22);
  // var result2=template2.format({name:"loogn",age:22});
  //两个结果都是"我是loogn，今年22了"
  String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
      if (arguments.length == 1 && typeof(args) == "object") {
        for (var key in args) {
          if (args[key] != undefined) {
            var reg = new RegExp("({" + key + "})", "g");
            result = result.replace(reg, args[key]);
          }
        }
      } else {
        for (var i = 0; i < arguments.length; i++) {
          if (arguments[i] != undefined) {
            var reg = new RegExp("({)" + i + "(})", "g");
            result = result.replace(reg, arguments[i]);
          }
        }
      }
    }
    return result;
  }*/