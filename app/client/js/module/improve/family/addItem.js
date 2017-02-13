/**
 * Created by hzchengshuli on 2016/11/3.
 */
var Component = require('../../../base/component');
var template = require('./addItem.html');
var _ = require('../../../base/util.js');
var cacheServer = require('../../../service.js');
var Emit =  require('../../../base/emit.js');



var AddItem = Component.extend({
    template:template,
    config:function(data){
        _.extend(this.data,data);
        this.data.err = {};
        this.data.familyInfo={};
        this.data.errShowFlag = {};

    },
    init:function(){


    },

    /**
     * 鼠标悬停 改变错误显示状态
     * @param str
     */
    showErrInfo:function(str){


        if(this.data.err[str]){
            this.data.errShowFlag[str] = true;
            this.$update();
        }

    },

    /**
     * 鼠标离开 改变错误显示状态
     */
    hideErrInfo:function(str){

        if(this.data.err[str]){
            this.data.errShowFlag[str] = false;
            this.$update();
        }
    },

    /**
     * 保存家庭成员
     */
    saveMember:function(){

        var self =  this;
        if (!_.isEmptyObject(self.__validation())) {

            self.$update();
            return;
        }
        cacheServer.saveMember(this.data.familyInfo,function(data,result){



            if(self.data.familyInfo.id){
                Emit.observer.fire('memberUpdate',self.data.familyInfo);
            } else {
                self.data.familyInfo.id = data;
                Emit.observer.fire('memberAdd',self.data.familyInfo);
                self.destroy();
            }

            self.data.infoReadOnly = true;
            self.$emit('checkStatus');

            self.$update();


        })

    },
    /**
     * 修改家庭成员
     */
    editMember:function(){

        this.data.infoReadOnly = false;
    },
    /**
     * 删除教育经历
     */
    deleteMember:function(){

        var self = this;
        var itemId = this.data.familyInfo.id?this.data.familyInfo.id:'';
        if(itemId){
            cacheServer.deleteMember({id:itemId},function(data,result){

                Emit.observer.fire('memberDelete',self.data.familyInfo);
                self.$update();


            })
        }else{
            self.destroy();
        }

    },

    /**
     * 表单验证
     * @returns 字段格式错误对象
     * @private
     */
    __validation:function(){

        var self = this,
            data = self.data,
            err  = new Object(),

            required = {

                'memberName': '必填',
                'relationship': '必填',
                "company":'必填', //工作单位
                'position':'必填',//职位
                'phone':'必填',//职位
            };
        // 验证电话
        if (data.familyInfo.phone && !_.mobile(data.familyInfo.phone)) {
            err.phone = '非法';
        }


        for(var item in required) {
            if (!(data.familyInfo[item]&&data.familyInfo[item].toString().trim())) {
                err[item] = required[item];
            }
        };
        // 清除错误提示

        if (!_.isEmptyObject(err)) {
            self.__watchForm && self.$unwatch(self.__watchForm.id);
            self.__watchForm = self.$watch('base', function (newData, oldData) {
                var err = self.data.err;

                if (!oldData || !err || _.isEmptyObject(err)) {
                    return;
                }

                for(var item in err){
                    if(newData[item] != oldData[item]) {
                        delete err[item]
                        delete self.data.errShowFlag[item];

                    }
                }

                if (_.isEmptyObject(err)) {
                    self.$unwatch(self.__watchForm.id);
                    self.data.err = {};
                    self.data.errShowFlag ={};
                }

                self.$update();
            }, true);
        }

        self.data.err  = err;
        return err ;
    },

    addDatePicker:function(dom,name){

        var self = this;
        new Pikaday ({
            field: dom,
            i18n: {
                previousMonth : 'Previous Month',
                nextMonth     : 'Next Month',
                months        : ['01','02','03','04','05','06','07','08','09','10','11','12'],
                weekdays      : ['日','一','二','三','四','五','六'],
                weekdaysShort : ['日','一','二','三','四','五','六'],
            },
            onSelect: function(){
                self.data.workExperience[name] = this.toString('YYYY-MM-DD');
                self.$update();
                this.destroy();
            }
        }).show();
    },


})

module.exports = AddItem;