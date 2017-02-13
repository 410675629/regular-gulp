/**
 * Created by hzchengshuli on 2016/11/3.
 */
var Model = function(){
    this.data = {};
    this.init();
    return this.data;
}

Model.prototype = {
    init:function(){
        this.country();
        this.nation();
        this.language();
        this.languageLevel();
        this.idType();
        this.married();
    },

    country:function(){
        this.data.country = [
            {
                id:'01',
                name:'中国'
            },{
                id:"02",
                name:'美国'
            },{
                id:"03",
                name:'韩国'
        }]
    },
    nation:function() {
        this.data.nation = [
            {
                id:'01',
                name:'汉族',

            },{
                id:'02',
                name:'藏族'
            }

        ]
    },
    language:function(){
        this.data.language = [
            {
                id:'01',
                name:'英语'
            },{
                id:'02',
                name:'法语'
            }
        ]
    },
    languageLevel:function(){
        this.data.languageLevel = [
            {
                id:'01',
                name:'一级'
            },{
                id:'02',
                name:'二级'
            }
        ]
    },
    idType:function(){
        this.data.idType = [
            {
                id:'01',
                name:'内籍'
            },{
                id:'02',
                name:'外籍'
            }
        ]
    },
    married:function(){
        this.data.married = [
            {
                id:'01',
                name:'未婚'
            },{
                id:'02',
                name:'已婚'
            }
        ]
    }




}

module.exports = new Model;