
var Component = require('../../base/component');
var template = require('./app.html');
var _ = require('../../base/util.js'); 
var commonModel = require('../commonModel');
var Cookie  = require('../../../../../node_modules/js-cookie/src/js.cookie.js');
var cacheServer = require('../../service.js');
var Emit =  require('../../base/emit.js');
var constant = require('../../base/constant.js');

var App = Component.extend({
	template:template,
	config:function(){
		_.extend(this.data, commonModel, true);
		this.data.user = {} ;
		this.$update();
	},

	init:function () {
		constant.NOTIFYNUM = 0;

		var self = this;
		self.data.newYear = new Date().getFullYear();

		Emit.observer.regist('navShow',function(res){
			self.navShow(res);
		})
		Emit.observer.regist('navAdd', function (res) {
			self.navAdd();
		})

		Emit.observer.fire('navAdd');
		if(Cookie.get('passport')){

			this.data.user.name = Cookie.get('passport');

			this.$update();
		}

	},

	/**
	 * 当点击接受offer时添加导航
	 */
	navAdd:function () {


		var self = this;
		cacheServer.getOfferInfo(function(data,result){

			if(data.offerStatus != 3 && data.offerStatus!=8){
				if(self.data.navs.length < 4){
					self.data.navs.push({
						name:'入职指引',
						url:'#/guide',
						match:'guide'
					});

					self.data.navs.push({
						name:'完善信息',
						url:'#/improve',
						match:'improve'
					});
					self.$update();
				}else{
					return;
				}
			} else {
				window.location = '#/home';
			}
		},function(err){

			if(Cookie.get('passport')){
				Cookie.remove('passport');
				self.data.navs = [];
			}
		})

	},
	/**
	 * 登录成功后显示导航
	 * @param res
	 */
	navShow:function(res){


		this.data.user.name = res.data;
		this.$update();
	},
	isSelected:function(match){

		var isMatch = new RegExp(match);
		return isMatch.test(this.$state.current.name)
	},

	onSelected: function(index){

		this.data.currentIndex = index;

	},
	/**
	 * 忘记密码跳转
	 */
	changePwd:function(){

		this.$state.nav('/changepwd');
	},

	logout:function(){

		cacheServer.logout(function(data,result){
			Cookie.remove('passport');
			this.$state.nav('/login');
			location.reload(true);
		}.bind(this))
	}


})


module.exports = App;