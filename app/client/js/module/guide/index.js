/**
 * Created by hzchengshuli on 2016/11/1.
 */
//

var Model = require('./model.js');
var mk = require('marked');
var Component = require('../../base/component');
var template = require('./index.html');
var _ = require('../../base/util.js');
var Cookie = require('../../../../../node_modules/js-cookie/src/js.cookie.js')

var Guide = Component.extend({
    template:template,
    config:function(){
        this.data = Model;
        _.extend(this.data, Model);
    },
    init:function () {

        if(!Cookie.get('passport')){
            location.href='#/login';
            return;
        }
    },
    enter:function(){
        this.data.selectedFirstIndex = 0;
        this.data.selectedSecondIndex = 0;
        this.data.currentFirstNav = this.data.firstNavList[0];
        this.data.currentSecondNav = this.data.secondNavList[0];
        this.data.currentTemplate = mk(this.data.guideTemplate[this.data.currentFirstNav.id + this.data.currentSecondNav.id]);
        this.$update();
    },

    //一级导航修改
    changeFirstDetail:function(index){
        this.data.selectedFirstIndex = index;
        this.data.selectedSecondIndex = 0;
        this.data.currentFirstNav = this.data.firstNavList[index];
        this.data.currentSecondNav = this.data.secondNavList[0];
        this.data.currentTemplate = mk(this.data.guideTemplate[this.data.currentFirstNav.id + this.data.currentSecondNav.id]);

        this.$update();
    },

    //二级导航修改
    changeSecondDetail:function(index){
        this.data.selectedSecondIndex = index;
        this.data.currentSecondNav = this.data.secondNavList[index];

        this.data.currentTemplate = mk(this.data.guideTemplate[this.data.currentFirstNav.id + this.data.currentSecondNav.id]);

        this.$update();
    }
})
module.exports = Guide;