
var restate = require('regular-state');
var Component = require('./base/component.js');

/* App */
var App = require('./module/app/app.js');
/*var Empty = '<div ref=view></div>';*/

var Login = require('./module/login/index.js');
var ResetPwd = require('./module/login/resetPwd.js');
var ChangePwd = require('./module/login/changePwd.js');



//首页
var Home = require('./module/home/index.js');
//myoffer

//var commonModel = require('../commonModel');
var Emit =  require('./base/emit.js');
var Myoffer = require('./module/myoffer/index.js');

//guide
var Guide = require('./module/guide/index.js');
var Improve = require('./module/improve/index.js');



/* App */
var router = restate({view: document.getElementById('view'), Component: Component, rebuild: true})
    .on('begin',function(evt){
        if(evt.current.name === 'app.improve'|| evt.current.name === 'app.guide'){
             Emit.observer.fire('navAdd');
        }
    })
    .state('app', App , '')
    .state('$notfound', {
        enter: function(option){
            router.nav('/home');
        }
    })


/* 登录页面*/
router
    .state('app.login',Login,'login')
    .state('app.resetPwd',ResetPwd,'resetpwd')
    .state('app.changePwd',ChangePwd,'changepwd')

	//.state('app.login',Login,'login')
//首页
router.state('app.home',Home,'home');

//myoffer
router.state('app.myoffer',Myoffer,'myoffer');

//guide
router.state('app.guide',Guide,'guide');

//improvre
router.state('app.improve', Improve, 'improve')



// 只能解决强刷之前的捕获
router.lock = function(message){

    window.onbeforeunload = function(){return message}
}

router.unlock = function(message){

    window.onbeforeunload = null
}

module.exports = router;
