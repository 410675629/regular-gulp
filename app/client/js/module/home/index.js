/**
 * Created by hzchengshuli on 2016/10/28.
 */
var Component = require('../../base/component');
var template = require('./index.html');
var Model = require('./model');
var Cookie = require('../../../../../node_modules/js-cookie/src/js.cookie.js');
var _ = require('../../base/util.js');

var Home = Component.extend({
    template:template,
    config:function(){
        _.extend(this.data,Model);
    },

    init:function(){
        if(!Cookie.get('passport')){
            location.href='#/login';
            return;
        }
    }

})
module.exports = Home;
