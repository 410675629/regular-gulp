/**
 * Created by hzchengshuli on 2016/11/3.
 */

var Component = require('../../../base/component');
var template = require('./index.html');
var _ = require('../../../base/util.js');
var Notify = require('../../../common/notify.js');
var PhotoModal = require('./photoModal.js');
var cacheServer = require('../../../service.js');
var Cookie  = require('../../../../../../node_modules/js-cookie/src/js.cookie.js');

var Photo = Component.extend({
    template: template,

    config: function () {


    },
    init:function(){
        this.data.formData = {};
        this.__getPhotoInfo();
        this.data.user = Cookie.get('passport');

    },
    /**
     * 获取工牌照信息
     * @private
     */
    __getPhotoInfo:function(){

        cacheServer.getPhotoInfo(function(data,result){
            this.data.attWorkCardFileInfo = data.attWorkCardFileInfo;

            if(data.attWorkCardFileInfo){
                //this.$parent.data.manageState.photoState = 1;
                var workCardPostfix = data.attWorkCardFileInfo.name.split('.');
                this.data.workCardPostfix = workCardPostfix[workCardPostfix.length-1];
            }
            this.$update();
        }.bind(this))
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
        this.__getFileInfo(file);
        if (!/\.(jpg)$/i.test(file.value)) {
            Notify.warning('文件格式非法');
            return;
        }

        if (fileSize > 20 * 1024) {
            Notify.warning('附件必须小于20Mb');
            return;
        }



        var workCardPostfix = file.value.split('.');
        self.data.workCardPostfix = workCardPostfix[workCardPostfix.length-1];

        self.$update();
        var fileUrl = self.__getImgUrl(file)
        new PhotoModal({
            data:{
                fileUrl:fileUrl
            }
        }).$on('ok',function(){

            self.data.formData.beginWidth = parseInt(this.data.x);
            self.data.formData.beginHeight = parseInt(this.data.y);
            self.data.formData.widthSize = parseInt(this.data.w);
            self.data.formData.heightSize = parseInt(this.data.h);


            if((self.data.formData.beginWidth + self.data.formData.widthSize > self.data.width) || (self.data.formData.beginHeight + self.data.formData.heightSize > self.data.height)  ){
                Notify.warning('裁剪区域越界')
                return
            }

            self.$update();
            self.__fileUpload(id);
        })


    },

    /**
     * 主要处理不同上传的回调
     * @param id
     * @private
     */
    __fileUpload:function(id){


        var self = this,
            refs = self.$refs;

        this.__upload(refs['form'+id],function(json){
            refs['form'+id].elements.file.value='';
            if(json.code == 200){
                if(id == 1 || id == 2){
                    self.data.attWorkCardFileInfo = json.data;
                    cacheServer.setPhotoAttachmentId({attWorkCardId:json.data.id},function(data,result){
                        cacheServer.updatePageIntegrity({pageWorkCardFlag:1},function(data,result){
                            self.$parent.data.manageState.photoState = 1;

                            var workCardPostfix = self.data.attWorkCardFileInfo.name.split('.');
                            self.data.workCardPostfix = workCardPostfix[workCardPostfix.length-1];

                            self.$update();
                        })

                    })

                }
            }

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

    /*获取图片的宽高*/
    __getFileInfo: function(file){
        var self = this;
        if(file){
            //读取图片数据
            //var f = input.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {

                var data = e.target.result;
                //加载图片获取图片真实宽度和高度
                var image = new Image();
                image.onload=function(){

                    self.data.width = image.width;
                    self.data.height = image.height;

                };
                image.src = data;
            };
            reader.readAsDataURL(file.files[0]);
        }else{
            var image = new Image();
            image.onload =function() {
                self.data.width = image.width;
                self.data.height = image.height;


            }
            image.src = file.value;

        }


    },

    /**
     * 获得图片的url
     * @param node
     */
    __getImgUrl:function(node){

        var imgURL = "";
        try{
            var file = null;
            if(node.files && node.files[0] ){
                file = node.files[0];
            }else if(node.files && node.files.item(0)) {
                file = node.files.item(0);
            }
            //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
            try{
                //Firefox7.0

                imgURL =  file.getAsDataURL();
                //alert("//Firefox7.0"+imgRUL);
            }catch(e){
                //Firefox8.0以上

                imgURL = window.URL.createObjectURL(file);
                //alert("//Firefox8.0以上"+imgRUL);
            }
        }catch(e){      //这里不知道怎么处理了，如果是遨游的话会报这个异常
            //支持html5的浏览器,比如高版本的firefox、chrome、ie10
            if (node.files && node.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    imgURL = e.target.result;

                };
                reader.readAsDataURL(node.files[0]);
            } else if(node.select){
                //这种获取方式支持IE10

                node.select();
                imgURL = document.selection.createRange().text;
            }
        }
        return imgURL;
    }




})

module.exports = Photo;