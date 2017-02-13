/**
 * Created by hzchengshuli on 2016/11/3.
 */

var Component = require('../../../base/component');
var template = require('./index.html');
var _ = require('../../../base/util.js');
var AddItem = require('./addItem.js');
var cacheServer = require('../../../service.js');
var Mask = require('../../../common/mask.js');
var Notify = require('../../../common/notify.js');
var Emit =  require('../../../base/emit.js');
var Cookie  = require('../../../../../../node_modules/js-cookie/src/js.cookie.js');
var WorkExpr = Component.extend({
    template: template,

    config: function (data) {
        this.data = {};
        _.extend(this.data.data);


    },
    init:function(){

        this.__getWorkExpInfo()
        this.data.user = Cookie.get('passport');
        Emit.observer.remove('workExperienceAdd');
        Emit.observer.remove('workExperienceDelete');
        Emit.observer.remove('workExperienceUpdate');
        Emit.observer.regist('workExperienceAdd',function(res){
            this.workExperienceAdd(res);
        }.bind(this));
        Emit.observer.regist('workExperienceDelete',function(res){
            this.workExperienceDelete(res);
        }.bind(this));
        Emit.observer.regist('workExperienceUpdate',function(res){
            this.workExperienceUpdate(res);
        }.bind(this));
        this.watchAll();
    },

    watchAll:function(){

        this.$watch('pageWorkExpFlag',function(newV,oldV){
            if(newV == 0 || newV == 1){
                cacheServer.updatePageIntegrity({pageWorkExpFlag:newV},function(data,result){
                    this.$parent.data.manageState.workState = newV;
                    this.$update();
                }.bind(this))
            }
        })
    },
    /**
     * 获取工作经历
     * @private
     */
    __getWorkExpInfo:function(){

        var self = this;
        cacheServer.getWorkExpInfo(function(data,result){

            self.data.workExperience = data.workExperienceInfo;

            if(data.attLeavingFileInfo){
                self.data.attLeavingFileInfo= data.attLeavingFileInfo;
                self.data.attLeavingAffixUploadSuccess = true;
                var attLeavingPostfix = data.attLeavingFileInfo.name.split('.');
                self.data.attLeavingPostfix = attLeavingPostfix[attLeavingPostfix.length-1];
            }

            self.$update();
        })
    },

    /**
     * 工作经历增加触发的事件
     * @param res {家庭成员信息}
     */
    workExperienceAdd:function(res){
        this.data.workExperience = this.data.workExperience?this.data.workExperience:[];
        this.data.workExperience.push(res.data);
        this.checkStatus();
        this.$update();

    },
    /**
     * 工作经历删除触发的事件
     * @param res {工作经历信息}
     */
    workExperienceDelete:function(res) {

        var self = this;

        if (res) {
            for (var i = 0, len = self.data.workExperience.length; i < len; i++) {
                if (self.data.workExperience[i].id == res.data.id) {
                    self.data.workExperience.splice(i, 1);
                    self.checkStatus();

                    break;

                }
            }
        }
        this.$update();
    },
    /**
     * 工作经历更新触发的事件
     * @param res {家庭成员信息}
     */
    workExperienceUpdate:function(res){
        var self = this;
        for (var i = 0, len = self.data.workExperience.length; i < len; i++) {

            if (self.data.workExperience[i].id == res.data.id) {
                self.data.workExperience[i] = res.data;

            }
        }
        this.$update();
    },
    /**
     * 添加工作经历
     */
    addWorkExperience:function(){

        var self = this;
        new AddItem({
            data:{
                workExperience:self.data.workExperience,
                infoReadOnly:false
            }
        }).$inject(this.$refs.workExp)
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
    evChoiceFile: function (e,id) {

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

        var attLeavingPostfix = file.value.split('.');
        this.data.attLeavingPostfix = attLeavingPostfix[attLeavingPostfix.length-1];

        //file.value = '';
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
                if(id == 1){

                    self.data.attLeavingFileInfo = json.data;
                    cacheServer.setWorkAttachmentId({attLeavingId:json.data.id},function(data,result){
                        mask.close();
                        self.data.attLeavingAffixUploadSuccess = true;
                        var attLeavingPostfix = self.data.attLeavingFileInfo.name.split('.');
                        self.data.attLeavingPostfix = attLeavingPostfix[attLeavingPostfix.length-1];
                        self.checkStatus();
                        self.$update();
                    })
                    //self.data.uploadFlag.attId = true;
                }
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
     * 附件删除按钮触发的操作
     * @param val
     */
    deleteAffix:function(str){

        if(this.data[str + 'FileInfo']){
            cacheServer.deleteFile({id:this.data[str + 'FileInfo']['id']},function(data,result){
                delete this.data[str + 'FileInfo'];
                this.data[str + 'AffixUploadSuccess'] = false;
                this.$update();

            }.bind(this))
        }
        this.$update();
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
     * 状态改变控制
     */
    checkStatus:function(){

        if(this.data.workExperience && this.data.workExperience.length){

            this.data.pageWorkExpFlag = 1;

        } else {

            this.data.pageWorkExpFlag = 0;

        }
        this.$update();

    }


})

WorkExpr.component('addItem',AddItem);
module.exports = WorkExpr;