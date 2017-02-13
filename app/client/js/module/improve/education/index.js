/**
 * Created by hzchengshuli on 2016/11/3.
 */

var Component = require('../../../base/component');
var template = require('./index.html');
var _ = require('../../../base/util.js');
var cacheServer = require('../../../service.js');
var Mask = require('../../../common/mask.js');
var AddItem = require('./addItem.js');
var Emit =  require('../../../base/emit.js');
var Notify = require('../../../common/notify.js');
var Cookie  = require('../../../../../../node_modules/js-cookie/src/js.cookie.js');

var Education = Component.extend({
    template: template,

    config: function (data) {
        this.data = {};
        this.data.educationState = {};
        _.extend(this.data,data);
        this.data.user = Cookie.get('passport');
    },
    init:function(){

        this.data.formData = {};
        this.__getEducationList();
        this.__getDegreeList();
        this.__getEduInfo();
        this.isIntern();

        Emit.observer.remove('educationAdd');
        Emit.observer.remove('educationDelete');
        Emit.observer.remove('educationUpdate');
        Emit.observer.regist('educationAdd',function(res){
            this.educationAdd(res);
        }.bind(this));
        Emit.observer.regist('educationDelete',function(res){
            this.educationDelete(res);
        }.bind(this));
        Emit.observer.regist('educationUpdate',function(res){
            this.educationUpdate(res);
        }.bind(this));

        this.watchAll();
    },



    watchAll:function(){

        this.$watch('pageEducationFlag',function(newV,oldV){

            if(newV == 0 || newV == 1){
                cacheServer.updatePageIntegrity({pageEducationFlag:newV},function(data,result){
                    this.$parent.data.manageState.educationState = newV;
                    this.$update();
                }.bind(this))
            }
        })


    },
    /**
     * 获取学历
     * @private
     */
    __getEducationList:function(){

        var self = this;
        cacheServer.getEducationListInfo(function(data,result){
            self.data.education = data;
            self.$update();
        },function(err){})
    },

    /**
     * 获取学位
     * @private
     */
    __getDegreeList:function(){

        var self = this;
        cacheServer.getDegreeListInfo(function(data,result){
            self.data.degree = data;


            self.$update();

        },function(err){})
    },
    /**
     * 教育经历增加触发的事件
     * @param res {教育经历信息}
     */
    educationAdd:function(res){

        this.data.educationInfo = this.data.educationInfo?this.data.educationInfo:[];
        this.data.educationInfo.push(res.data);
        this.checkStatus();
        this.$update();

    },
    /**
     * 教育经历删除触发的事件
     * @param res {教育经历信息}
     */
    educationDelete:function(res) {

        var self = this;
        if (res) {
            for (var i = 0, len = self.data.educationInfo.length; i < len; i++) {

                if (self.data.educationInfo[i].id == res.data) {
                    self.data.educationInfo.splice(i, 1);
                    this.checkStatus();
                    this.$update();
                    return;

                }
            }
        }

    },
    /**
     * 教育经历更新触发的事件
     * @param res {教育经历信息}
     */
    educationUpdate:function(res){
        var self = this;
        for (var i = 0, len = self.data.educationInfo.length; i < len; i++) {

            if (self.data.educationInfo[i].id == res.data.id) {
                self.data.educationInfo[i] = res.data;

            }
        }
        this.$update();
    },

    /**
     * 获取教育经历
     * @private
     */
    __getEduInfo:function(){

        var self = this;
        cacheServer.getEduInfo(function(data,result){

            self.data.educationInfo = data.educationInfo;

            if(data.attTopGraduateFileInfo){
                self.data.attTopGraduateFileInfo = data.attTopGraduateFileInfo;
                self.data.attTopGraduateAffixUploadSuccess = true;
                var topGraduatePostfix = data.attTopGraduateFileInfo.name.split('.');
                self.data.topGraduatePostfix = topGraduatePostfix[topGraduatePostfix.length-1];

            }
            if(data.attTopDegreeFileInfo){
                self.data.attTopDegreeFileInfo = data.attTopDegreeFileInfo;
                self.data.attTopDegreeAffixUploadSuccess = true;
                var topDegreePostfix = data.attTopDegreeFileInfo.name.split('.');
                self.data.topDegreePostfix = topDegreePostfix[topDegreePostfix.length-1];
            }
            if(data.attIdentityCardFileInfo){
                self.data.attIdentityCardFileInfo = data.attIdentityCardFileInfo;
                self.data.attIdentityCardAffixUploadSuccess = true;
                var identityCardPostfix = data.attIdentityCardFileInfo.name.split('.');
                self.data.identityCardPostfix = identityCardPostfix[identityCardPostfix.length-1];
            }


            //self.checkStatus();
            self.$update();
        },function(err){})
    },

    /**
     * 添加教育经历
     */
    addEducation:function(){
        var self = this;
        new AddItem({
            data:{
                educationInfoArr: self.data.educationInfo,
                infoReadOnly:false,
                education:self.data.education,
                degree:self.data.degree
            }
        }).$inject(this.$refs.eduCont)
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
        if(name == 'attTopGraduate'){

            var topGraduatePostfix = file.value.split('.');
            this.data.topGraduatePostfix = topGraduatePostfix[topGraduatePostfix.length-1];
        }
        if(name == 'attTopDegree'){

            var topDegreePostfix = file.value.split('.');
            this.data.topDegreePostfix = topDegreePostfix[topDegreePostfix.length-1];
        }
        if(name == 'attIdentityCard'){

            var identityCardPostfix = file.value.split('.');
            this.data.identityCardPostfix = identityCardPostfix[identityCardPostfix.length-1];
        }

        self.$update();
        self.__fileUpload(id);

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

            refs['form'+id].elements.file.value='';
            if(json.code == 200){
                mask.close()
                if(id == 1){

                    self.data.attTopGraduateFileInfo  = json.data;

                    cacheServer.setEduAttachmentId({attTopGraduateId:json.data.id},function(data,result){

                        self.data.attTopGraduateAffixUploadSuccess = true;
                        var topGraduatePostfix = self.data.attTopGraduateFileInfo.name.split('.');
                        self.data.topGraduatePostfix = topGraduatePostfix[topGraduatePostfix.length-1];
                        self.checkStatus();
                        self.$update();

                    },function(err){

                    })

                }else if(id == 2){

                    self.data.attTopDegreeFileInfo = json.data;
                    cacheServer.setEduAttachmentId({attTopDegreeId:json.data.id},function(data,result){
                        self.data.attTopDegreeAffixUploadSuccess = true;
                        var topDegreePostfix = self.data.attTopDegreeFileInfo.name.split('.');
                        self.data.topDegreePostfix = topDegreePostfix[topDegreePostfix.length-1];
                        self.checkStatus()
                    },function(err){

                    })
                    //self.data.uploadFlag.attRegisterId = true;


                }else if(id == 3){

                    self.data.attIdentityCardFileInfo = json.data;
                    cacheServer.setEduAttachmentId({attIdentityCardId:json.data.id},function(data,result){
                        self.data.attIdentityCardAffixUploadSuccess = true;

                        var identityCardPostfix = self.data.attIdentityCardFileInfo.name.split('.');
                        self.data.identityCardPostfix = identityCardPostfix[identityCardPostfix.length-1];
                        self.checkStatus();
                        self.$update();
                    },function(err){

                    })
                    //self.data.uploadFlag.attRegisterId = true;


                }
            }else{
                console.log(json.msg);
            }
            self.$update();
        })
    },

    /**
     * 附件删除按钮触发的操作
     * @param val
     */
    deleteAffix:function(str){

        if(this.data[str + 'FileInfo']){
            cacheServer.deleteFile({id:this.data[str + 'FileInfo']['id']},function(data,result){
                delete this.data[str + 'FileInfo'];
                this.data[str + 'AffixUploadSuccess'] = false;
                this.checkStatus();
                this.$update();

            }.bind(this))
        }
        this.$update();
    },
    /**
     * 判断员工类型
     */
    isIntern:function(){

        var self = this;
        cacheServer.salaryCardStatus(function(data,result){

            self.data.isIntern = data.workType;
            self.$update();
        },function(err){})
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
    //检测教育经历是否已填完

    checkStatus:function(){
        if(!(this.data.educationInfo && this.data.educationInfo.length)){
            this.data.pageEducationFlag = 0;
            return;
        }

        if( this.data.isIntern==1){
            if(!this.data.attIdentityCardFileInfo){
                this.data.pageEducationFlag = 0;
                return
            }

        } else {


            if(!this.data.attTopGraduateFileInfo){
                this.data.pageEducationFlag = 0;
                return
            }


        }
        this.data.pageEducationFlag = 1;

        this.$update();

    }





})
Education.component('addItem',AddItem);
module.exports = Education;