/**
 * Created by hzchengshuli on 2016/11/16.
 */

var template = require('./photoModal.html');
var _ = require('../../../base/util.js');

var Modal = require('../../../common/modal.js');


var Cropper = require('cropperjs').default;

var PhotoMask = Modal.extend({
    config: function(data) {
        _.extend(this.data, data);
        _.extend(this.data,{
            formData:{},
            okButton:true,
                cancelButton:true,
                contentTemplate:template,
                title:'工牌照上传',
                width:400,
                disable:true
        })

        this.supr();
    },

    init:function () {
        var self = this;
        this.supr();
        new Cropper(self.$refs.photoImg, {
            aspectRatio: 358 / 441,
            background:true,
            autoCrop:true,
            autoCropArea:1,
            scalable:false,
            zoomable:false,
            zoomOnWheel:false,
            crop: function(e) {

                self.data.x = e.detail.x;
                self.data.y = e.detail.y;
                self.data.w = e.detail.width;
                self.data.h = e.detail.height;

            }
        });

        this.$update();

    },

})

module.exports = PhotoMask;