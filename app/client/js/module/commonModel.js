/**
 * 公用数据模块
 */
var  util = require('../base/util.js');
var  mk = require('marked');

var CommonModel = function(){
	this.init();
	return this.data;
}

CommonModel.prototype = {
	init:function(){
		this.data = {};

		this.navs();
	},

	navs:function(){

		var _hash = window.location.hash.split('?')[0];


		if(_hash == '#/login'){
			this.data.flag =0
		}else{
			this.data.flag =1
		}
		this.data['navs'] = [{
				name:'首   页',
				url:'#/home',
				match:'home',
			},
			{
				name:'我的offer',
				url:'#/myoffer',
				match:'myoffer'
			},
			/*{
				name:'入职指引',
				url:'#/guide',
				match:'guide'
			},
			{
				name:'完善信息',
				url:'#/improve',
				match:'improve'
			}*/
			]

	}
}

module.exports = new CommonModel;