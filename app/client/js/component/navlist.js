/**
 * Created by hzchengshuli on 2016/11/1.
 */

var Component = require('../base/component.js');
var template = require('./navlist.html');
var _ = require('../base/util.js');


var NavList = Component.extend({
    name: 'navlist',
    template: template,

    config: function() {
        _.extend(this.data, {
            navFirstList: []
        });
        this.supr();
        //this.data.activeIndex = 0;
    },
    //一级导航修改
    changeFirstDetail:function(index){
        this.data.selectedFirstIndex = index;
        this.data.currentFirstNav = this.data.firstNavList[index];
        this.$update();
    },


});


module.exports = NavList;