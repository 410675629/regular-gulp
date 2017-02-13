/**
 * Created by hzchengshuli on 2016/11/2.
 */
//var Model = require('./model.js');
var Component = require('../../base/component');
var template = require('./index.html');
var _ = require('../../base/util.js');
var Model = require('./model.js');
var Mask = require('../../common/mask');
var cacheService = require('../../service.js');
var Cookie = require('../../../../../node_modules/js-cookie/src/js.cookie.js');
var Info = require('./info/index.js');
var Education = require('./education/index.js');
var Work = require('./work/index.js');
var Family = require('./family/index.js');
var Other = require('./other/index.js');
var Photo = require('./photo/index.js');
var mk = require('marked');
var Modal = require('../../common/modal.js')

var Improve = Component.extend({
    template:template,
    config: function() {
        this.data = {
            //0 初始化  1 保存成功  2 驳回  3 驳回后删除信息
            manageState:{
                infoState:0,
                educationState:0,
                workState:0,
                familyState:0,
                otherState:0,
                photoState:0,
            }
        }
        _.extend(this.data,Model);
        this.data.activeIndex = 0;
    },

    init:function(){
        this.data.workYearRequired = false;
        this.__getPageIntegrity();
        this.__getWorkType();
        this.__watchAll();


        if(!Cookie.get('passport')){
            location.href='#/login';
            return;
        }

    },

    __watchAll:function(){
        var self = this;

        this.$watch('workYear',function(newV,oldV){

            if(self.data.workType == 0 || self.data.workType == 2){
                if(newV && newV!='-1'){
                    self.data.navList[2].required = true;
                } else {
                    self.data.navList[2].required = false;
                }
                self.$update();
            }else{
                self.data.navList[2].required = false;
            }
        })
    },
    __getWorkType:function(){
        var self = this;
        cacheService.salaryCardStatus(function (data, result) {
            self.data.workType = data.workType;
        })
    },
    /**
     * 获得页面完整状态
     * @private
     */
    __getPageIntegrity:function(){
        var self = this;
        cacheService.getPageIntegrity(function(data,result){
            self.data.pageFlag = data;

            if(data){

                if(data.pagePersonalFlag){
                    self.data.manageState.infoState = 1;
                }
                if(data.pageEducationFlag){
                    self.data.manageState.educationState = 1;
                }
                if(data.pageWorkExpFlag){
                    self.data.manageState.workState = 1;
                }
                if(data.pageFamilyFlag){
                    self.data.manageState.familyState = 1;
                }
                if(data.pageOthersFlag){
                    self.data.manageState.otherState = 1;
                }
                if(data.pageWorkCardFlag){
                    self.data.manageState.photoState = 1;
                }
            }
            self.__getAuditStatus();
            self.$update();
        })
    },
    /**
     * 获得驳回信息 根据驳回信息修改图标状态
     */
    __getAuditStatus:function(){

        var self = this;

        cacheService.getAuditStatus(function(data,result){

            //0 审核中  1 审核通过
            if(data == null){
               // self.__getPageIntegrity();
                self.data.auditStatus = null;
                self.$update();
                return;
            }
            self.data.auditStatus = data.auditStatus;
            self.data.offerId = data.offerId;

            if(self.data.auditStatus == 0 || self.data.auditStatus == 1){

                for(var item in self.data.manageState){
                    self.data.manageState[item] = 1;
                }
            }

            //审核驳回

            if(self.data.auditStatus == 2){

                self.data.auditArr = [];
                if(!data.auditPersonalStatus){
                    if(self.data.pageFlag.pagePersonalFlag == 0){
                        self.data.manageState.infoState = 3;
                    }else {
                        self.data.manageState.infoState = 2;
                    }
                    self.data.auditArr[0] = data.auditPersonaRejectReason;

                } else {
                    //if(self.data.pageFlag.pagePersonalFlag == 0){
                        //self.data.manageState.infoState = 3;
                   // }else{
                        self.data.manageState.infoState = 1;
                    //}

                }

                if(!data.auditWorkExperenceStatus ){
                    self.data.manageState.workState = 2;
                    self.data.auditArr[2] = data.auditWorkExperenceRejectReason;
                }else {
                    /*if(self.data.pageFlag.pageWorkExpFlag == 0){
                        self.data.manageState.workState = 3;
                    }else{*/
                        self.data.manageState.workState = 1;
                    //}

                }

                if(!data.auditEducationStatus){
                    /*if(self.data.pageFlag.pageEducationFlag == 0){
                        self.data.manageState.educationcaState = 3;
                    }else {*/
                        self.data.manageState.educationState = 2;
                    //}

                    self.data.auditArr[1] = data.auditEducationRejectReason;
                }else {
                   /* if(self.data.pageFlag.pageEducationFlag == 0){
                        self.data.manageState.educationcaState = 3;
                    }else{*/
                        self.data.manageState.educationState = 1;
                    //}

                }

                if(!data.auditFamilyStatus){
                    self.data.manageState.familyState = 2;
                    self.data.auditArr[3] = data.auditFamilyRejectReason;
                }else {
                    /*if(self.data.pageFlag.pageFamilyFlag == 0){
                        self.data.manageState.familyState = 3;
                    }else{*/
                        self.data.manageState.familyState = 1;
                    //}

                }

                if(!data.auditOthersStatus){
                    self.data.manageState.otherState = 2;
                    self.data.auditArr[4] = data.auditOthersRejectReason;
                }else {

                    /*if(self.data.pageFlag.pageOthersFlag == 0){
                        self.data.manageState.otherState = 3;
                    }else{*/
                        self.data.manageState.otherState = 1;
                   // }
                }

                if(!data.auditWorkCardStatus){
                    self.data.manageState.photoState = 2;
                    self.data.auditArr[5] = data.auditWorkCardRejectReason;
                }else {
                   /* if(self.data.pageFlag.pageWorkCardFlag == 0){
                        self.data.manageState.photoState = 3;
                    }else{*/
                        self.data.manageState.photoState = 1;
                    //}
                }


            }
            self.$update();

        })

    },

    onSelected:function(index){

        this.data.activeIndex = index;
    },

    /**
     * navslide  选择
     * @param  { 传入正则}
     * @return {Boolean}
     * @author :hzzhangzhang1@corp.neteasec.com;
     */
    isSelected:function(id){

        return id == this.data.activeIndex;
    },
    /**
     * 提交审核执行代码
     */
    submitAudit:function() {
        var self = this;
        //正式员工
        if ((self.data.workType !=1 ) && self.data.workYear!='-1') {
            for (var item in self.data.manageState) {
                if (self.data.manageState[item] != 1 && item != 'familyState') {
                    self.data.manageState[item] = 2;
                }
            }
        } else {
            for (var item in self.data.manageState) {
                if (self.data.manageState[item] != 1 && item != 'familyState' && item != 'workState') {
                    self.data.manageState[item] = 2;
                }
            }
        }

        for (var item in self.data.manageState) {
            if (self.data.manageState[item] == 2) {

                new Modal({
                    data: {
                        title: '提示',
                        content: '信息未填写完整，不能提交审核',
                        okButton: '确定',
                    }
                }).$on('ok', function () {
                    self.$update();
                })


                return;
            }
        }
        var modal = new Modal({
            data: {
                title: '提示',
                contentTemplate: mk('<p>提交审核后不可修改，请确保信息填写准确。</p><p>是否确认提交？</p>'),
                okButton: '确定',
                cancelButton: '取消'
            }
        }).$on('ok', function () {
            var mask = new Mask().$inject(document.body);
            cacheService.applicantData(function(data, result) {
                self.data.auditArr = [];
                mask.close();
                new Modal({
                    data: {
                        title: '提示',
                        content: '提交成功!',
                        okButton: '确定',

                    }
                }).$on('ok', function () {

                    self.data.auditStatus = 0;
                    self.$update();
                })

                self.$update();
            })
        })

    },
})


Improve.component('info',Info);
Improve.component('education',Education);
Improve.component('work',Work);
Improve.component('family',Family);
Improve.component('other',Other);
Improve.component('photo',Photo);
module.exports = Improve;
