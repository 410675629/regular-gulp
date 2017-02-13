/**
 * Created by hzchengshuli on 2016/10/31.
 */

var Component = require('../../base/component');
var template = require('./index.html');
var cacheService = require('../../service.js');
var Model = require('./model.js');
var Modal = require('../../common/modal.js')
var _ = require('../../base/util.js');
var infoModel = require('./infoModel.js');
var Notify = require('../../common/notify.js');
var Cookie = require('../../../../../node_modules/js-cookie/src/js.cookie.js');
var Mask = require('../../common/mask.js');

var Emit =  require('../../base/emit.js');

var Myoffer = Component.extend({
    template:template,
    init:function(){

        this.data = {};
        _.extend(this.data,infoModel);
        this.getInitInfo();

        if(!Cookie.get('passport')){
            location.href='#/login';
            return;
        }
    },

    /**
     * 获取offer中的信息
     */
    getInitInfo:function(){

        var self = this;

        cacheService.getOfferInfo(function(data,result){
            self.data.offerStatus = data.offerStatus;
            self.data.offerType = data.offerType;
            self.data.offerInfo = data;

            //获取模板
            self.data.offerListInfo = new Model({
                data:self.data.offerInfo,
            });

            self.$update();
        })
    },

    /**
     * 提交offer信息
     * @param index
     */
    submitOfferStatus:function(index){

        var formData = {};
        var self = this;
        formData.offerStatus = index;
        if(index == '9'){

            new Modal({data:self.data.offerHintInfo.accept}).$on('ok',function(){
                var mask = new Mask().$inject(document.body);
                cacheService.submitOfferStatus(function(data,result){

                   mask.close();
                    Emit.observer.fire('navAdd');
                    Notify.success('操作成功');
                    self.data.offerStatus = 9;
                    self.$update();
                })
            });

        }else{
            new Modal({data:self.data.offerHintInfo.reject}).$on('ok',function(){
                cacheService.submitOfferStatus(function(data,result){

                    Notify.success('操作成功');
                    self.data.offerStatus = 3;
                    self.$update();
                })
            });
        }


    }

})

module.exports = Myoffer;