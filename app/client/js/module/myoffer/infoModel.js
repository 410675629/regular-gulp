/**
 * Created by hzchengshuli on 2016/11/12.
 */
var mk = require('marked');
var Model = function(options){
    this.data = {};
    this.init();
    return this.data;
}

Model.prototype = {
    init: function () {
        this.offerHintInfo();

    },
    /**
     * 接受或拒绝offer的弹框信息
     */
    offerHintInfo: function () {
        this.data.offerHintInfo = {
            accept: {
                title: '接受offer',
                contentTemplate: mk('<p class="offer-accept-tt">本人已经认真阅读并同意以上内容，并保证所提供的应聘资料属实。</p><p class="offer-accept-p">本人理解，此文件内容涉及商业秘密，在未经网易允许情况下，不能向任何第三方透露此文件内容。一旦泄露，网易有权解除本函件，取消本人的录用资格。</p>'),
                okButton: '确认接受offer',
                cancelButton: '取消'
            },
            reject:{
                title: '拒绝offer',
                contentTemplate: mk("<p>拒绝后不可撤销，确定要拒绝offer吗？</p>"),
                okButton: '确定',
                cancelButton: '取消'
            },

        }
    },
}

module.exports = new Model;
