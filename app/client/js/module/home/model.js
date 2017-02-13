/**
 * Created by hzchengshuli on 2016/10/28.
 */
var Model = function(){
    this.data = {
    };
    this.init();
    return this.data;
}

Model.prototype = {
    init:function(){
        this.homeList();
    },
    homeList : function(){
        this.data.homeList = [{
            zhName:'接受offer',
            enName:'Accept the offer',
            id:1,

        },{
            zhName:'完善个人信息',
            enName:'Submit personal information',
            id:2,

        },
        {
            zhName:'等待审核',
            enName:'Waiting for review',
            id:3
        },
        {
            zhName:'准备入职',
            enName:'Ready for entry',
            id:4
        },]
    }
}

module.exports = new Model;