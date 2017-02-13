/**
 * Created by hzchengshuli on 2016/11/3.
 */

var Component = require('../../../base/component');
var template = require('./index.html');
var _ = require('../../../base/util.js');
var cacheServer = require('../../../service.js');
var Mask = require('../../../common/mask.js');

var Other = Component.extend({
    template: template,

    config: function (data) {

        _.extend(this.data,data);

    },
    init:function(){
        this.data.err = {};
        this.data.errShowFlag = {};

        this.data.formData = {};
        this.data.optionState = {};

        this.__watchAll();
        this.__getOthersInfo();

    },

    /**
     * 获得其他信息
     * @private
     */
    __getOthersInfo:function(){

        var self = this;
        cacheServer.getOthersInfo(function(data,result){
            self.data.formData = data;
            if(self.$parent.data.manageState.otherState==1 || self.data.rejectInfo){
                self.data.infoReadOnly = true;
            } else {
                self.data.infoReadOnly = false;
            }
            self.$update();
        })
    },

    /**
     * 点击修改按钮 改变为编辑状态
     */
    changeToEdit:function(){
        this.data.infoReadOnly = false;
        this.$update();
    },
    /**
     * 上传其他信息
     */
    submit:function(){

        var self = this;

        var mask = new Mask().$inject(document.body);
        cacheServer.saveOtherInfo(self.data.formData,function(data,result){

            cacheServer.updatePageIntegrity({pageOthersFlag:1},function(data,result){
                mask.close();
                self.$parent.data.manageState.otherState = 1;
                self.data.infoReadOnly = true;
                self.$update();
            })

        })

    },
    /**
     * 监听所有字段
     * @returns 判断所有字段是否填写完整
     * @private
     */
    __watchAll:function(){

        var self = this,
            data = self.data,
            required = {
                'crimeFlag': false,
                'relativeWorkedFlag': false,
                "workedFlag": false,
                'diseaseFlag':false,
                "partTimeJobFlag": false,
                "keepSercetFlag": false
            };

        //self.__watchForm && self.$unwatch(self.__watchForm.id);
        self.__watchForm = self.$watch('formData', function (newData, oldData) {

            self.data.saveButtonActive = false;
            if(data.formData.crimeFlag){
                if(data.formData.crimeFlag==true ||data.formData.crimeFlag==1){
                    required.crimeReason = false;

                    self.data.crimeInputShow = true;
                } else {

                    delete self.data.formData.crimeReason;
                    required.crimeReason = true;
                }
            }

            if(data.formData.relativeWorkedFlag){

                if(data.formData.relativeWorkedFlag==true ||data.formData.relativeWorkedFlag==1){
                    required.relativeName = false;
                    self.data.relativeNameInputShow = true;
                    required.relationship = false
                    self.data.relationshipInputShow = true;
                } else {
                    delete self.data.formData.relativeName;
                    delete self.data.formData.relationship;
                    required.relativeName = true;
                    required.relationship = true;
                }
            }

            if(self.data.auditStatus ==2 && self.data.rejectInfo){

                if(!oldData || _.isEmptyObject(oldData)){
                    return;
                }
            }

            for(var item in required){

                if(newData[item]!=='' && newData[item]!=null) {
                    required[item] = true;

                    if(item!='relativeName' && item!='relationship' && item!='crimeReason'){
                        if(newData[item]=='0'){
                            self.data.formData[item ] = false;
                        } else if(newData[item]=='1'){
                            self.data.formData[item ] = true;
                        }
                    }

                }
            }

            for(var item in required){
                if(required[item] == false){
                    //self.$parent.data.manageState.otherState = 0;
                    return;
                } else {
                    //self.$parent.data.manageState.otherState = 1;
                }
            }

            self.data.saveButtonActive = true;


            self.$update();
        }, true);

    },



})

module.exports = Other;