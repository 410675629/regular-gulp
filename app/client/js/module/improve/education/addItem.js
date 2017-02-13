/**
 * Created by hzchengshuli on 2016/11/3.
 */
var Component = require('../../../base/component');
var template = require('./addItem.html');
var _ = require('../../../base/util.js');

var Pikaday = require('pikaday');
var cacheServer = require('../../../service.js');

var Emit =  require('../../../base/emit.js');
var AddItem = Component.extend({
    template:template,
    config:function(data){


        this.data.err = {};
        this.data.educationInfo={};
        this.data.errShowFlag = {};

        _.extend(this.data,data);

    },
    init:function(){

        this.__watchAll();

    },

    __watchAll:function(){
        this.$watch('educationInfo',function(newV,oldV){
            if(newV){
                this.__getSelectedName(this.data.education,this.data.educationInfo.education,'educationName');
                this.__getSelectedName(this.data.degree,this.data.educationInfo.degree,'degreeName');
                this.$update();
            }
        }.bind(this));
        /*this.$watch('infoReadOnly',function(newV,oldV){

            if(newV == true){
                _.removeClass(self.$refs.eduTr,'info-tr')
            } else{
                _.addClass(self.$refs.eduTr,'info-tr');

            }

        })*/
    },
    /**
     * 根据选项中的id获取相应的name
     * @param 选项
     * @param 选中id
     * @param 相应的name属性
     * @private
     */
    __getSelectedName:function(options,selectedId,selectedName){


        for(var i = 0,len = options.length;  i < len; i++){

            if(options[i].id == selectedId){
                this.data[selectedName] = options[i].name;
            }
        }
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
     * 保存教育经历
     */
    saveEduInfo:function(){
        
        var self =  this;

        if (!_.isEmptyObject(self.__validation())) {

            self.$update();
            return;
        }
        cacheServer.saveEduInfo(this.data.educationInfo,function(data,result){



            if(self.data.educationInfo.id){
                Emit.observer.fire('educationUpdate',self.data.educationInfo);
            } else {
                self.data.educationInfo.id = data;
                Emit.observer.fire('educationAdd',self.data.educationInfo);
                self.destroy();
            }

            self.data.infoReadOnly = true;
            self.__getSelectedName(self.data.degree,self.data.educationInfo.degree,'degreeName');
            self.__getSelectedName(self.data.education,self.data.educationInfo.education,'educationName');

            self.$emit('checkStatus');


            self.$update();


        })

    },
    /**
     * 修改教育经历
     */
    editEduInfo:function(){

        this.data.infoReadOnly = false;
    },
    /**
     * 删除教育经历
     */
    deleteEduInfo:function(){

        var self = this;


        var itemId = this.data.educationInfo.id?this.data.educationInfo.id:'';
        if(itemId){
            cacheServer.deleteEduInfo({id:itemId},function(data,result){

                Emit.observer.fire('educationDelete',itemId);
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
                'startDate': '必填',
                'finishDate': '必填',
                "education":'必填', //学历
                'degree':'必填',//学位
                "schoolName":'必填',//学校名
                "majorName":'必填',//专业名

            };


        for(var item in required ) {
            if (!(data.educationInfo[item] && data.educationInfo[item].toString().trim())) {
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
        var yearArr = [];
        var nowDate = new Date().getFullYear();
        yearArr.push(+nowDate -30);
        yearArr.push(+nowDate );
        new Pikaday ({
            field: dom,
            yearRange:yearArr,
            i18n: {
                previousMonth : 'Previous Month',
                nextMonth     : 'Next Month',
                months        : ['01','02','03','04','05','06','07','08','09','10','11','12'],
                weekdays      : ['日','一','二','三','四','五','六'],
                weekdaysShort : ['日','一','二','三','四','五','六'],


            },
            onSelect: function(){
                self.data.educationInfo[name] = this.toString('YYYY-MM-DD');
                self.$update();
                this.destroy();
            }
        }).show();
    },

})

module.exports = AddItem;