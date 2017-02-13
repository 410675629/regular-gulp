'use strict';

var toString = Object.prototype.toString;
var _ = {
    
    /**
     * 继承
     * @param  {[type]} o1       [description]
     * @param  {[type]} o2       [description]
     * @param  {[type]} override [description]
     * @return {[type]}          [description]
     */
    extend: function(o1, o2, override) {
        for(var i in o2)
            if(override || o1[i] === undefined)
                o1[i] = o2[i]
        return o1;
    }
}


_.extend(_, {
    $: function(id) {
        return document.getElementById(id);
    },

    multiline: function(func) {
        return func.toString().replace(/^function\s*\(\)\s*\{\s*\/\*+/, '').replace(/\*+\/\s*\}$/, '').trim();
    },


    /**
     * 是否是数组
     * @param  {[type]}  target [description]
     * @return {Boolean}        [description]
     */
    isArray: function(target) {
        return typeof target === 'object' && toString.call(target) === '[object Array]';
    },

    /**
     * 是否是字符串
     * @param  {[type]}  data [description]
     * @return {Boolean}      [description]
     */
    isString : function(data){
        return util.isTypeOf(data,'string');
    },

    /**
     * 对象克隆
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    clone:function(obj){
        var newObj = new Object();
        for(var elements in obj){
          newObj[elements] = obj[elements];
        }
        return newObj;
    } , 

    /**
     * url 获取入参
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    getParams: function (url) {
        var reg = /(\w+)=([^&]+)/g,
            params = {},
            result = [];

        url = (url.split('?')[1] || '');

        while(result = reg.exec(url)) {
            params[result[1]] = result[2];
        }

        return params;
    },

    /**
     * 数据类型
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    typeOf: function(o){
        return o == null ? String(o) : o2str.call(o).slice(8, -1).toLowerCase();
    },

    /**
     * 验证手机号
     * @param  {[type]} mobile [description]
     * @return {[type]}        [description]
     */
    mobile: function (mobile) {
        return /^(13[0-9]|14[57]|15[0-35-9]|17[0-9]|18[0-9])\d{8}$|170[0125789]\d{7}$/.test(mobile);
    },

    /**
     * 判断邮箱
     * @param  {[type]} email [description]
     * @return {[type]}       [description]
     */
    email: function (email) {
        return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i.test(email)
    },

    /**
     * 身份证判断
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    idNumber:function (str) {
        var isIdCard = function(e) {
            function n(e) {
                var t = 0;
                e[17].toLowerCase() == "x" && (e[17] = 10);
                for (var n = 0; n < 17; n++) t += o[n] * e[n];
                var valCodePosition = t % 11;
                return e[17] == u[valCodePosition] ? !0 : !1;
            }
            function r(e) {
                var t = e.substring(6, 10), n = e.substring(10, 12), r = e.substring(12, 14), i = new Date(t, parseFloat(n) - 1, parseFloat(r));
                return (new Date).getFullYear() - parseInt(t) < 18 ? !1 : i.getFullYear() != parseFloat(t) || i.getMonth() != parseFloat(n) - 1 || i.getDate() != parseFloat(r) ? !1 : !0;
            }
            function i(e) {
                var t = e.substring(6, 8), n = e.substring(8, 10), r = e.substring(10, 12), i = new Date(t, parseFloat(n) - 1, parseFloat(r));
                return i.getYear() != parseFloat(t) || i.getMonth() != parseFloat(n) - 1 || i.getDate() != parseFloat(r) ? !1 : !0;
            }
            function s(e) {
                e = e.replace(/ /g, "").trim();
                if (e.length == 15) return !1;
                if (e.length == 18) {
                    var i = e.split("");
                    return r(e) && n(i) ? !0 : !1;
                }
                return !1;
            }
            var o = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ], u = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
            return s(e);
        };
        if (!str) return;
        var str = str.toUpperCase();
        return isIdCard(String(str));
    },

    /**
     * 判断目标是否在数组中
     * @param  {[type]} obj    [description]
     * @param  {[type]} target [description]
     * @return {[type]}        [description]
     */
    contains:function(obj, target) {
        if (obj == null) return false;
        for(var i = 0, l = obj.length; i < l; i++){
            if(obj[i] === target){
                return true;
            }
        }
        return false;
    },

    /**
     * 判断目标是否是指定类型
     */
    isTypeOf : function(_data,_type){
        try{
                _type = _type.toLowerCase();
                if (_data===null) return _type=='null';
                if (_data===undefined) return _type=='undefined';
                return Object.prototype.toString.call(_data).toLowerCase()=='[object '+_type+']';
        }catch(e){
                return !1;
        }
    },


    getCalendarI18n:function(){
        return {
                previousMonth : '上月',
                nextMonth     : '下月',
                months        : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                weekdays      : ['日','一','二','三','四','五','六'],
                weekdaysShort : ['日','一','二','三','四','五','六'],
                midnight:'凌晨',
                noon:'中午'
        }
    },

    hasAuthority: function(num, authority){
        return authority & Math.pow(2, num)
    },

    uniqueArr:function(data){
      data = data || [];
            var a = {};
      for (var i=0; i<data.length; i++) {
        var v = data[i];
        if (typeof(a[v]) == 'undefined'){
          a[v] = 1;
        }
      };
      data.length=0;
      for (var i in a){
        data[data.length] = i;
      }
      return data;
    },

    /**
     * 数组分割
     * @param  {[type]} arr1 [description]
     * @param  {[type]} arr2 [description]
     * @param  {[type]} key  [description]
     * @return {[type]}      [description]
     */
    spliceArray:function(arr1, arr2, key){
        var type = Object.prototype.toString.call(arr1[0]);
        var tempArr = JSON.parse(JSON.stringify(arr1));
        if(type == '[object Object]'){
            for(var i = 0,len2 = arr2.length; i <len2; i++)
                for(var j=0,len1 = arr1.length; j<len1;j++){
                    // console.log(arr2[i][key]+','+arr1[j][key]);
                    if(arr2[i][key] == arr1[j][key])
                        tempArr.splice(j,1);
                }
            return tempArr;
        }else{
             for(var len = arr2.length; len--; )
                tempArr.splice(arr1.indexOf(arr2[len]),1);
            return tempArr;
        }

    },

    multiline:function(func){
        var reg = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
        return reg.exec(func)[1];
    },

    /**
     * 存在某个类
     * @param  {[type]}  那个element [description]
     * @param  {[type]}  类名 [description]
     * @return {Boolean}     [description]
     */
    hasClass: function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    addClass:function (obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    },

    removeClass: function (obj, cls) {
        if (this.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },

    /**
     * 块动态隐藏
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    hide:function (el) {
        el.style.display = 'none';
    },
    
    /**
     * 块状显示
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    show:function (el) {
        el.style.display = '';
    },
    
    /**
     * 返回两个数字的随机值
     * @param  {[type]} minNum [description]
     * @param  {[type]} maxNum [description]
     * @return {[type]}        [description]
     */
    randomNum:function(minNum, maxNum){
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum); 
            break; 
            default: 
                return 0; 
            break;
        }
    },

    //验证是否为空对象
    isEmptyObject:function(obj){
        for(var item in  obj){
            return false;
        }
        return true;
    }

});

_.COLOR_SUCCESS = '#5cb85c';
_.COLOR_INFO = '#5bc0de';
_.COLOR_DANGER = '#d9534f';
_.COLOR_WARNING = '#f0ad4e';

module.exports = _;