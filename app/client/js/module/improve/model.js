var Model = function(){
    this.data = {};
    this.init();
    return this.data;
}

Model.prototype = {
    init:function(){
        this.navList();
    },
    navList : function(){
        this.data.navList = [{
            id:0,
            name:'个人信息',
            url:'#/improve/info',
            match:'info',
            required:true,
        },
            {
                id:1,
                name:'教育经历',
                url:'#/improve/education',
                match:'education',
                required:true,
            },
            {
                id:2,
                name:'工作经历',
                url:'#/improve/work',
                match:'work',
                required:false,
            },
            {
                id:3,
                name:'家庭成员',
                url:'#/improve/family',
                match:'family',
                required:false,
            },
            {
                id:4,
                name:'其他信息',
                url:'#/improve/other',
                match:'other',
                required:true,
            },
            {
                id:5,
                name:'工牌照',
                url:'#/improve/photo',
                match:'photo',
                required:true,
            },
        ]
    },

}

module.exports = new Model;