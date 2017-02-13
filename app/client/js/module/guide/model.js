/**
 * Created by hzchengshuli on 2016/11/1.
 */
var util = require('../../base/util.js');
var hzsxTemplate = require('./hzsx.html');
var hzzsTemplate = require('./hzzs.html');
var shsxTemplate = require('./shsx.html');
var shzsTemplate = require('./shzs.html');
var bjsxTemplate = require('./bjsx.html');
var bjzsTemplate = require('./bjzs.html');
var gzsxTemplate = require('./gzsx.html');
var gzzsTemplate = require('./gzzs.html');


var Model = function(){
    this.data = {};
    this.init();
    return this.data;
}

Model.prototype = {
    init:function(){
        //this.guideNavList();
        this.guideFirstNavList();
        this.guideSecondNavList();
        this.guideTemplate();
    },

    guideFirstNavList : function(){
        this.data.firstNavList = [{
                name:'杭州',
                id:'0',
                match:'hz'
            },
            {
                name:'广州',
                id:'1',
                match:'gz'
            },
            {
                name:'北京',
                id:'2',
                match:'bj'
            }]
    },
    guideSecondNavList:function(){
        this.data.secondNavList = [{
            name:'正式员工',
            id:'0',
            match:'zs'
        },{
            name:'实习生',
            id:'1',
            match:'sx'

        }]
    },
    guideTemplate:function(){
        this.data.guideTemplate = {
            '00':hzzsTemplate,
            '01':hzsxTemplate,
            '10':gzzsTemplate,
            '11':gzsxTemplate,
            '20':bjzsTemplate,
            '21':bjsxTemplate,
            '30':shzsTemplate,
            '31':shsxTemplate
        }
    }

}

module.exports = new Model;