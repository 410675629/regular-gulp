/**
 * Created by hzchengshuli on 2016/11/3.
 */

var Component = require('../../../base/component');
var template = require('./index.html');
var _ = require('../../../base/util.js');
var AddItem = require('./addItem.js');
var cacheServer = require('../../../service.js');
var Emit =  require('../../../base/emit.js');

var Family = Component.extend({
    template: template,

    config: function () {

    },
    init:function(){
        this.data.checkDelete = true;
        this.data.familyState = {};
        this.__getMember();
        this.watchAll();
        Emit.observer.remove('memberAdd');
        Emit.observer.remove('memberDelete');
        Emit.observer.remove('memberUpdate');
        Emit.observer.regist('memberAdd',function(res){
            this.memberAdd(res);
        }.bind(this));
        Emit.observer.regist('memberDelete',function(res){
            this.memberDelete(res);
        }.bind(this));
        Emit.observer.regist('memberUpdate',function(res){
            this.memberUpdate(res);
        }.bind(this));

    },
    watchAll:function(){
        var self = this;
        self.$watch('pageFamilyFlag',function(newV,oldV){
            if(newV == 0 || newV == 1){
                cacheServer.updatePageIntegrity({pageFamilyFlag:newV},function(data,result){
                    self.$parent.data.manageState.familyState = newV;
                    self.$update();
                })
            }
        })
    },
    /**
     * 获取家庭成员
     * @private
     */
    __getMember:function(){

        var self = this;
        cacheServer.getMember(function(data,result){

            self.data.familyInfo = data;

            if(self.data.familyInfo&&self.data.familyInfo.length == 1){
                self.data.checkDelete = false;
            }
            //self.checkStatus();
            self.$update();
        })
    },
    /**
     * 家庭成员增加触发的事件
     * @param res {家庭成员信息}
     */
    memberAdd:function(res){


        this.data.familyInfo = this.data.familyInfo?this.data.familyInfo:[];
        this.data.familyInfo.push(res.data);
        this.checkStatus();
        this.$update();

    },
    /**
     * 家庭成员删除触发的事件
     * @param res {家庭成员信息}
     */
    memberDelete:function(res) {

        var self = this;
        if (res) {
            for (var i = 0, len = self.data.familyInfo.length; i < len; i++) {
                if (self.data.familyInfo[i].id == res.data.id) {
                    self.data.familyInfo.splice(i, 1);
                    self.checkStatus();
                    break;

                }
            }
        }
        this.$update();
    },
    /**
     * 家庭成员更新触发的事件
     * @param res {家庭成员信息}
     */
    memberUpdate:function(res){
        var self = this;
        for (var i = 0, len = self.data.familyInfo.length; i < len; i++) {

            if (self.data.familyInfo[i].id == res.data.id) {
                self.data.familyInfo[i] = res.data;

            }
        }
        this.$update();
    },


    checkStatus:function(){

        if(this.data.familyInfo && this.data.familyInfo.length){
            this.data.pageFamilyFlag = 1;
        } else {
            this.data.pageFamilyFlag = 0;

        }
        this.$update();


    },
    /**
     * 添加家庭成员
     */
    addFamilyMember:function(){

        var self = this;
        new AddItem({
            data:{
                familyInfo:self.data.familyInfo,
                infoReadOnly:false
            }
        }).$inject(this.$refs.familyCont);
    },



})
Family.component('addItem',AddItem);
module.exports = Family;