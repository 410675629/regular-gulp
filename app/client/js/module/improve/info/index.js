/**
 * Created by hzchengshuli on 2016/11/2.
 */

var Component = require('../../../base/component');
var template = require('./index.html');
var _ = require('../../../base/util.js');
var Mask = require('../../../common/mask.js');
var Notify = require('../../../common/notify.js');
var Pikaday = require('pikaday');
var cacheService = require('../../../service.js');
var Cookie  = require('../../../../../../node_modules/js-cookie/src/js.cookie.js');
var PhotoMask = require('../../../common/photoMask.js');
var Modal = require('../../../common/modal.js');
var mk = require('marked');


var Info = Component.extend({
    template: template,

    config: function (data) {

        this.data={};
        _.extend(this.data,data);
        this.data.base = {};
        this.data.formData = {};

        this.data.uploadFlag = {
            attId:false,
            attRegisterId:false
        };
        this.data.getPersonalInfoFlag=0;
        this.data.getSubmitFlag=0;

        this.data.infoReadOnly = false;//标示是否为只读状态
        this.data.err = {};
        this.data.errShowFlag = {};
        this.data.chinaNationFlag = false;//标示国籍是否为中国
        this.data.user = Cookie.get('passport');


        this.$update();


    },

    init:function(){
        this.__loadWorkYearsList();
        this.__getNationList();
        this.__getNationalityList();
        this.__getLanguageList();
        this.__getLanguageLevelList();
        this.__getNativePlaceList();


        this.__watchAll();

    },

    __watchAll:function () {

        var self = this;
        this.$watch('base.nation',function(newV,oldV){

            if(newV == '156' || newV==''){
                self.data.chinaNationFlag = true;
            } else {
                self.data.chinaNationFlag = false;
            }

            this.$update();
        });
        /*this.$watch('auditStatus',function(newV,oldV){

            if(newV==0 || newV==1 || newV==2){
                self.data.infoReadOnly = true;
            }
        })*/

        this.$watch('getPersonalInfoFlag',function(newV,oldV){
            if(newV==5){
                self.__getPersonalInfo();
            }
        })

        this.$watch('getSubmitFlag',function(newV,oldV){


            if(newV == 2){

                self.submitForm();

            }
        })

        this.$watch('infoReadOnly',function(newV,oldV){

            if(newV == true){
                _.removeClass(self.$refs.infoTable,'info-table')
            } else{
                _.addClass(self.$refs.infoTable,'info-table');

            }

        })
    },

    /**
     * 获得国籍
     */
    __getNationList:function(){

            cacheService.getNationList(function(data,result){

                this.data.nation = data;
                this.data.getPersonalInfoFlag++;

                this.$update();
            }.bind(this))
    },
    /**
     * 获得籍贯
     */
    __getNativePlaceList:function(){

        cacheService.getNativePlaceList(function(data,result){
            this.data.getPersonalInfoFlag++;
            this.data.nativePlace = data;

            this.$update();
        }.bind(this))
    },
    /**
     * 获得民族
     */
    __getNationalityList:function(){

         cacheService.getNationalityList(function(data,result){
             this.data.getPersonalInfoFlag++;
             this.data.nationality = data;
             this.$update();
        }.bind(this))
    },
    /**
     * 获得外语语种
     */
    __getLanguageList:function(){

         cacheService.getLanguageList(function(data,result){
             this.data.getPersonalInfoFlag++;
             this.data.language = data;
             this.$update();
        }.bind(this))
    },
    /**
     * 获得外语等级
     */
    __getLanguageLevelList:function(){

         cacheService.getLanguageLevelList(function(data,result){
             this.data.getPersonalInfoFlag++;
             this.data.languageLevel = data;
             this.$update();
        }.bind(this))
    },

    /**
     * 判断工资卡详细信息的显示与隐藏
     * @param {[type]} bool [description]
     */
    setIconStatus:function(bool){

        this.data.iconStatus = bool;
        this.$update();
    },
    /**
     * 北京实习生 自行准备
     * 北京正式员工 公司办理
     */
    __salaryCardStatus:function(){

        cacheService.salaryCardStatus(function(data,result){

            if(data.entryPlace == 1){

                if(data.workType == 1 || data.workType == 2 ){
                    this.data.salaryCardTypeReadOnly = true;
                    this.data.BJ_intern = true;
                    this.data.base.salaryCardType = 1;
                }
            }

            this.$update();

        }.bind(this))
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
     * 参加工作时间
     * @private
     */
    __loadWorkYearsList: function () {
        var self = this,
            i = 0,
            workYears = [],
            workMonth = [],
            year = new Date().getFullYear();

        // 取最近30年
        for (; i <= 30; i++) {
            workYears.push({
                id: year - i,
                name: (year - i) + '年'
            });
        }

        workYears[30].name = workYears[30].name + '或更早';

        // 取月份
        for (i = 1; i <= 12; i++) {
            workMonth.push({
                id: (i < 10 ? '0' : '') + i,
                name: i + '月'
            });
        }
        self.data.__lastWorkYear = workYears[30].id;
        self.data.__workYearList = workYears;
        self.data.__workMonthList = workMonth;

    },

    /**
     * 获得个人信息
     * @private
     */
    __getPersonalInfo:function(){

        var self = this;
        cacheService.getPersonalInfo(function(data,result){
            self.$parent.data.workYear = data.workYear || '-1';
            self.data.idNumber = data.idNumber;
            self.data.gender = data.gender;
            self.data.base = data;
            self.data.base.nationality = data.nationality || 'N01';
            self.data.base.nation = data.nation || '156';
            self.data.base.workYearNum = '-1';

            self.__salaryCardStatus();

            if(self.$parent.data.manageState.infoState == 1 || self.$parent.data.manageState.infoState == 2){

                self.data.infoReadOnly = true;
            }
            if(data.attIdFileInfo){

                var idPostfix = data.attIdFileInfo.name.split('.');
                self.data.idPostfix = idPostfix[idPostfix.length-1];

            }
            if(data.attRegisterFileInfo){

                var registerPostfix = data.attRegisterFileInfo.name.split('.');
                self.data.registerPostfix = registerPostfix[registerPostfix.length-1];

            }

            if(data.workYear){
                var dataArr = data.workYear.split('-');
                self.data.base.workYearNum = dataArr[0];
                self.data.base.workMonth = dataArr[1];
            }

            if(!_.isEmptyObject(self.data.base)){


                self.__getSelectedName(self.data.nationality,self.data.base.nationality,'nationalityName');
                self.__getSelectedName(self.data.nation,self.data.base.nation,'nationName');
                self.__getSelectedName(self.data.nativePlace,self.data.base.nativePlace,'nativePlaceName');
                self.__getSelectedName(self.data.language,self.data.base.language,'languageName');
                self.__getSelectedName(self.data.languageLevel,self.data.base.languageLevel,'languageLevelName');
            }
            self.$update();
        })
    },
    /**
     * 验证上传的文件是否合法
     * @param e
     * @param name
     */
    evChoiceFile: function (e,name,id) {

        var self = this,
            file = e.target,
            fileSize = self.__getFileSize(file);
        if (!/\.(png|jpg|jpeg|pdf)$/i.test(file.value)) {
            Notify.warning('文件格式非法');
            return;
        }

        if (fileSize > 20 * 1024) {
            Notify.warning('附件必须小于20Mb');

            return;
        }

        if(name == 'attId'){
            this.data.base.attIdFilePath = file.value;
            var idPostfix = file.value.split('.');
            this.data.idPostfix = idPostfix[idPostfix.length-1];
        }
        if(name == 'attRegisterId'){
            this.data.base.attRegisterFilePath = file.value;
            var registerPostfix = file.value.split('.');
            this.data.registerPostfix = registerPostfix[registerPostfix.length-1];
        }

        self.$update();


    },

    /**
     * 鼠标悬停 改变错误显示状态
     * @param str
     */
    showErrInfo:function(str){

        if(this.data.err[str]){
            this.data.errShowFlag[str] = true;
        }
    },

    /**
     * 鼠标离开 改变错误显示状态
     */
    hideErrInfo:function(str){

        if(this.data.err[str]){
            this.data.errShowFlag[str] = false;
        }
    },

    /**
     * 点击修改按钮 改变为编辑状态
     */
    changeToEdit:function(){
        this.data.infoReadOnly = false;
        this.$update();
    },

    /**
     * 显示查看示例
     * @param src
     */
    showEg:function(src){
        new PhotoMask({
            data:{
                srcImg:src
            }
        }).$inject(document.body)
    },

    /**
     * 查看附件hover的样式
     */
    evHoverButtonStyle:function(str){

        _.addClass(this.$refs[str],'hover-btn-gray');
    },

    evLeaveButtonStyle:function(str){
        _.removeClass(this.$refs[str],'hover-btn-gray');
    },
    /**
     * 主要处理不同上传的回调
     * @param id
     * @private
     */
    __fileUpload:function(id){

        var self = this,
            refs = self.$refs;
        var mask = new Mask().$inject(document.body);
        this.__upload(refs['form'+id],function(json){

            mask.close()
            if(json.code == 200){
                refs['form'+id].elements.file.value='';
                if(id == 1){

                    self.data.base.attIdFileInfo  = json.data;

                    self.data.getSubmitFlag++;
                    self.data.uploadFlag.attId = true;

                    var idPostfix = json.data.name.split('.');
                    self.data.idPostfix = idPostfix[idPostfix.length-1];

                }else if(id == 2){
                    self.data.getSubmitFlag++
                    self.data.base.attRegisterFileInfo = json.data;
                    self.data.uploadFlag.attRegisterId = true;

                    var registerPostfix = json.data.name.split('.');
                    self.data.registerPostfix = registerPostfix[registerPostfix.length-1];


                }
            }else{

            }
            self.$update();
        })
    },

    /**
     * 上传
     * @param form
     * @param callback
     * @private
     */
    __upload: function (form, callback) {

        var self = this,
            //$form = $(form),
            ifr = document.createElement('iframe'),
            rnd = (Math.random() + '').substr(-8),
            name = 'upload-ifr' + rnd;
        ifr.style.display = 'none';

        // 需要在 append 页面时, 对 name 属性赋值
        ifr.setAttribute('name', name);
        document.body.appendChild(ifr);
        form.setAttribute('target', name);
        ifr.onload = function () {
            var ifrBody = ifr.contentDocument.body,
                html = ifrBody.innerHTML,
                json;
            html = html.replace(/^<.+?>/, '').replace(/<.+?>$/, '');

            json = eval('(' + html + ')');
            callback && callback(json);
            ifr.remove();
        };
        // 延迟零毫秒，再次提交
        setTimeout(function () {

            form.submit();

        }, 0);
    },

    /**
     * 获取文件大小
     * @param input 上传文件的input元素
     * @returns {number}
     * @private
     */
    __getFileSize: function (input) {

        var  fileSize = 0;
        if (!input.files) {
            return;
        }
        if (input.files[0]) {
            fileSize = input.files[0].size;
        }
        return fileSize / 1024;
    },

    /**
     * 对象克隆
     * @param obj
     * @returns {Object}
     * @private
     */
    __clone:function(result, source){
        for(var key in source) {
            var copy = source[key];
            if(source === copy) continue;//如window.window === window，会陷入死循环，需要处理一下

            if(_.typeOf(copy) == 'object'){
                result[key] = arguments.callee(result[key] || {}, copy);
            }else if(_.typeOf(copy) == 'array'){
                result[key] = arguments.callee(result[key] || [], copy);
            }else{
                result[key] = copy;
            }
        }
        return result;
    },

    /**
     * 保存操作
     */
    submitUpload:function(){

        this.data.getSubmitFlag = 0;
        if(this.data.base.attIdFilePath){
            this.__fileUpload('1');
        }else{
            this.data.getSubmitFlag++;
            this.$update();
        }


        if(this.data.base.attRegisterFilePath){
            this.__fileUpload('2');
        }else{
            this.data.getSubmitFlag++;
            this.$update();
        }



    },
    submit:function() {
        var self = this;

        if(!_.isEmptyObject(self.__validation()))
        {

            cacheService.updatePageIntegrity({pagePersonalFlag: 0}, function (data, result) {

                self.$parent.data.manageState.infoState = 0;

                self.$update();
            })

            self.$update();
            return;
        }
        //公司办理

        if (self.data.base.salaryCardType == 0) {
            new Modal({
                data: {
                    title: '提示',
                    contentTemplate: mk('<p class="card-p">招商银行规定，在全国范围内只允许办理一张借记卡。您选择由公司办理工资卡，请确认您名下没有招商银行借记卡。</p>'),
                    okButton: '确认提交',
                    cancelButton: '重新编辑',
                    width:400
                }
            }).$on('ok', function () {
                self.submitUpload();
            })


        }
        if (self.data.base.salaryCardType == 1) {
            if(!(/支行/.test(self.data.base.cardSubbranch))){
                new Modal({
                    data: {
                        title: '提示',
                        content: '开户行需要具体到支行，请确认是否填写准确。',
                        okButton: '确认提交',
                        cancelButton: '重新编辑',
                        width:400
                    }
                }).$on('ok', function () {
                    self.submitUpload();
                })
            } else {
                self.submitUpload();
            }



        }
    },

    submitForm:function(){


        var self = this;
        self.data.workYear = self.data.base.workYearNum;
        self.data.workMonth = self.data.base.workMonth;
        if(self.data.base.workYearNum!='-1' && self.data.base.workYearNum != self.data.__lastWorkYear){

            self.data.base.workYear = self.data.base.workYearNum + '-' + self.data.base.workMonth + '-' + '01';

        }
        if(self.data.base.workYearNum == '-1'){
            self.data.base.workYear = '-1';
        }
        if(self.data.base.workMonth){
            delete self.data.base.workMonth;
        }
        delete self.data.base.workYearNum;
        delete self.data.base.attIdFilePath;
        delete self.data.base.attRegisterFilePath;
        var upload = self.__clone({},self.data.base);
        upload.attId = upload.attIdFileInfo.id;
        upload.attRegisterId = upload.attRegisterFileInfo.id;
        delete upload.attIdFileInfo;
        delete upload.attRegisterFileInfo

        if(self.data.idNumber == upload.idNumber){
            delete upload.idNumber;
        }

        if(self.data.gender== upload.gender){
            delete upload.gender;
        }

        var mask = new Mask().$inject(document.body);
        cacheService.savePersonalInfo(upload,function(data,result){

            mask.close();
            self.data.infoReadOnly = true;

            self.$parent.data.workYear = self.data.base.workYear;

            self.data.base.workYearNum = self.data.workYear;
            self.data.gender = upload.gender;
            self.data.idNumber = upload.idNumber;

            if(self.data.workYearNum!='-1' && self.data.workYearNum != self.data.__lastWorkYear){
                self.data.base.workMonth = self.data.workMonth;

            }

            self.__getSelectedName(self.data.nation,self.data.base.nation,'nationName');
            self.__getSelectedName(self.data.nationality,self.data.base.nationality,'nationalityName');
            self.__getSelectedName(self.data.nativePlace,self.data.base.nativePlace,'nativePlaceName');
            self.__getSelectedName(self.data.language,self.data.base.language,'languageName');
            self.__getSelectedName(self.data.languageLevel,self.data.base.languageLevel,'languageLevelName');

            cacheService.updatePageIntegrity({pagePersonalFlag:1},function(data,result){
                self.$parent.data.manageState.infoState = 1;

                self.$update();
            })
            self.$update();

        })
        self.$update();
    },
    /**
     * 附件删除按钮触发的操作
     * @param val
     */
    deleteAffix:function(str){

        var self = this;
        if(self.data.base[str + 'FileInfo']){
            cacheService.deleteFile({id:self.data.base[str + 'FileInfo']['id']},function(data,result){
                delete self.data.base[str + 'FileInfo'];
                cacheService.updatePageIntegrity({pagePersonalFlag:0},function(data,result){
                    self.$parent.data.manageState.infoState = 0;

                    self.$update();
                })

                self.$update();
            })
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
                'name': '必填',
                'gender': '必填',
                "birthday":'必填', //生日
                'nation':'必填',//国籍
                "nationality":'必填',//民族
                "married":'必填',//婚否
                "idType":'必填',//证件类型
                "idNumber":'必填' ,//证件号码
                "idDeadline":'必填',//证件到期日
                "registerAddr":'必填',//户籍地址
                "liveAddr":'必填',  //现居地址
                "communicationAddr":'必填',//通信地址
                "emergencyContacts":'必填',//紧急联系人
                "emergencyRelation":'必填',
                "emergencyPhone":'必填',
                "salaryCardType":'必填',//工资卡类型
                "workYearNum":'必填',  //参加工作年份

                "attRegisterFilePath":'必填',//户口本
                "attIdFilePath":'必填'//身份证
            };


        //根据工资卡类型确定有无工资卡号和开户行
        if(data.base.salaryCardType!=null && data.base.salaryCardType==1){
            required.salaryCardNumber ='必填';
            required.cardSubbranch = '必填';
        }

        if(data.base.nation && data.base.nation=='156'){
            required.nativePlace = '必填';//籍贯
            required.registerType='必填'//户籍性质
        }


        if(data.base.workYearNum!='-1' &&  data.base.workYearNum != data.__lastWorkYear){

            required.workMonth = '必填';
        }
        // 紧急联系人
        if (data.base.emergencyPhone && !_.mobile(data.base.emergencyPhone)) {
            err.emergencyPhone = '非法';
        }

        //验证身份证号
        if(data.base.idType==0 && data.base.idNumber && !_.idNumber(data.base.idNumber)){

            err.idNumber = '非法';
        }

        for(var item in required) {
            if (!(data.base[item]!=undefined && data.base[item]!=null && data.base[item].toString().trim())) {
                err[item] = required[item];
            }
            if((data.base.attRegisterFilePath || data.base.attRegisterFileInfo) && item=='attRegisterFilePath'){
                delete err[item];
            }

            if((data.base.attIdFilePath || data.base.attIdFileInfo) && item=='attIdFilePath'){
                delete err[item];
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

    /**
     *
     * @param dom
     * @param name
     */
    addDatePicker:function(str,name){

        var self = this;
        var config = {};
        var nowDate = new Date().getFullYear();
        config.field = this.$refs[str];
        config.i18n = {
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : ['01','02','03','04','05','06','07','08','09','10','11','12'],
            weekdays      : ['日','一','二','三','四','五','六'],
            weekdaysShort : ['日','一','二','三','四','五','六'],
        };
        if(str == 'idDeadline'){
            config.yearRange = [];
            config.yearRange.push(+nowDate);
            config.yearRange.push(+nowDate + 30);

        }
        if(str == 'birthDateStr'){
            config.yearRange = [];
            config.yearRange.push(nowDate - 60);
            config.yearRange.push(+nowDate);
        }
        config.onSelect = function(){
            self.data.base[name] = this.toString('YYYY-MM-DD');
            self.$update();
            this.destroy();
        }

        new Pikaday (config).show();
    },


})


module.exports = Info;