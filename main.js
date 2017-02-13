var getParams = function (url) {
	var reg = /(\w+)=([^&]+)/g,
		params = {},
		result = [];

	url = (url.split('?')[1] || '');

	while(result = reg.exec(url)) {
		params[result[1]] = result[2];
	}

	return params;
};

var extend = function (o1, o2) {
	for (var key in o2) {
		if (o2.hasOwnProperty(key) && o2[key] !== void 0) {
			o1[key] = o2[key];
		}
	}
};

module.exports = {

	/**
	 * 提交登录相关信息
	 * @param 登录需要的参数（用户名 密码等）
	 * @param 登录后返回的信息

	 */
	"POST /sys/login.do": function(req,res,next){
		res.send({
			'code':200,
			'data':null,
			'msg':'成功'
		})
	},

	/**
	 * 获取token
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	"GET　/sys/getToken.do":function(req,res,next) {

		res.send({
			'code': 200,
			'data': '00001',
			'msg': '成功'
		})
	},



	/**
	 * 登出
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /sys/logout.do':function(req,res,next) {
		res.send({
			'code': 200,
			'data': null,
			'msg': '成功'
		})
	},

	/**
	 * 发送重置密码邮件
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	"POST /forgotPwd/mail.do":function(req,res,next){
		res.send({
			'code':200,
			'data':'sl_cheng@126.com',
			'msg':'成功'
		})
	},
	/**
	 * 获取用户信息
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	"GET /forgotPwd/getUser.do":function(req,res,next){
		res.send({
			'code':200,
			'data':{
				'passport':'程程',
				'idNumber':'41092819910501561'

			},
			'msg':'success'
		})
	},

	"POST /forgotPwd/resetPwd.do":function(req,res,next){

		res.send({
			'code':200,
			'data':null,
			'msg':'成功'
		})
	},
	/**
	 * 修改密码
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	"POST /sys/resetPwd.do":function(req,res,next){

		res.send({
			'code':200,
			'data':null,
			'msg':'成功'
		})
	},

	/**
	 * 获得offer信息参数
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /myOffer/getInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':{
				'offerStatus':0,//0-考虑中，1-接受，2-拒绝
				'offerType':7,
				'name':'程书利',
				'company':'网易',
				'postName':'前端开发',
				'spcLevel': 'P3-3',
				'mngLevel': 'T3-3',
				'salary': 22222,
				'houseSubsidy':1111,
				'houseSubsidyMonth':3,
				'mealSubsidy':2222,
				'trafficSubsidy':3333,
				'entryDate':'2014-12-12',
				'contractYears':3,
				'trialPeriod':'6',
				'offerDate':'2121-5-6'
			}
		})
	},

	/**
	 * 提交接受或拒绝offer信息
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /myOffer/submitStatus.do':function(req,res,next){
		res.send({
			'code':200,
			'data':null,
			'msg':''
		})
	},

	'GET /sync/checkInfo.do':function(req,res,next){

		res.send({
			'code':200,
			'data':null,
			'msg':''
		})
	},
	/**
	 * 发送获取验证码的请求
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /sys/getVerifyCode.do':function(req,res,next){
		res.send({
			'code':200,
			'data':{
				srcImg:'',
			},
			'msg':'成功'
		})
	},

	'POST /file/delete.do':function(req,res,next){
		res.send({
			'code':200,
			'data':{
				srcImg:'',
			},
			'msg':'成功'
		})
	},


	/**
	 * 完善信息页面载入时发送的请求  请求完善信息是否提交审核以及审核后的具体信息
	 *
	 */
	"GET /audit/getStatus.do":function(req,res,next){


		var data = {
			auditStatus: 2,//0-审批中，1-通过，2-驳回，可为null,
			auditPersonalStatus: 0,
			auditPersonaRejectReason:'信息有误',
			auditEducationStatus:0,
			auditEducationRejectReason:'信息有误',
			auditWorkExperenceStatus:0,
			auditWorkExperenceRejectReason: '信息有误',
			auditFamilyStatus:0,
			auditFamilyRejectReason:'信息有误',
			auditOthersStatus:0,
			auditOthersRejectReason:'信息有误',
			auditWorkCardStatus:0,
			auditWorkCardRejectReason:'信息有误'

		};
		res.send({
			'code':200,
			'data':data,
			'msg':'信息发送成功'

		})

	},

	/**
	 * 获取个人信息页面中的外语语种 外语等级 民族 国籍 籍贯等
	 * @param callback
	 * @param errback
	 */
	'GET /common/options/ehr_native.do':function(req,res,next){

		res.send({
			"code": 200,
			"data": [
				{
					id: '01',
					name: '中国'
				}, {
					id: '02',
					name: '美国'
				}],
			'msg': '成功'
		})
	},
	'GET /common/options/nationality.do':function(req,res,next) {

		res.send({
			"code": 200,
			"data": [
				{
					id: '01',
					name: '汉族'
				}, {
					id: '02',
					name: '回族'
				}],
			'msg': '成功'
		});
	},

	'GET /common/options/ehr_language.do':function(req,res,next) {

		res.send({
			"code": 200,
			"data": [
				{
					id:'01',
					name:'英语'
				},{
					id:'02',
					name:'俄语'
				}],
			'msg': '成功'
		});
	},

	'GET /common/options/ehr_language_level.do':function(req,res,next) {

		res.send({
			"code": 200,
			"data": [
				{
					id:'01',
					name:'CET4'
				},{
					id:'02',
					name:'CET6'
				}],
			'msg': '成功'
		});
	},

	'GET /common/options/native_place.do':function(req,res,next) {

		res.send({
			"code": 200,
			"data": [
				{
					id:'01',
					name:'浙江省'
				},{
					id:'02',
					name:'河南省'
				}],
			'msg': '成功'
		});
	},

	'GET /common/options/ehr_education.do':function(req,res,next) {

		res.send({
			"code": 200,
			"data": [
				{
					id:'L05',
					name:'博士'
				},{
					id:'L10',
					name:'研究生'
				}],
			'msg': '成功'
		});
	},

	'GET /common/options/ehr_degree.do':function(req,res,next) {

		res.send({
			"code": 200,
			"data": [
				{
					id:'DG10',
					name:'博士'
				},{
					id:'DG20',
					name:'硕士'
				}],
			'msg': '成功'
		});
	},

	'GET /common/getPageIntegrity.do':function(req,res,next){

		res.send({
			"code": 200,
			"data": null,
			'msg': '成功'
		});
	},
	'POST /common/savePageIntegrity.do':function(req,res,next){

		res.send({
			"code": 200,
			"data": null,
			'msg': '成功'
		});
	},


	/**
	 * 获取个人信息
	 * @param req
	 * @param res
	 * @constructor
	 */
	'GET /personal/getInfo.do':function(req,res){
		res.send({
			"code":200,
			"data":{
				name:'程程',
				gender:'1',
				birthday:'1991-10-01',
				/*nation:'01',
				nationality:'01',*/
				married:'0',
				idType:'0',
				idNumber:'410928199105051561',
				idDeadline:'2016-09-09',
				nativePlace:'01',
				registerType:'2',
				registerAddr:'河南省',
				phone:'15140304309',
				email:'sl_cheng@126.com',
				liveAddr:'河南省',
				communicationAddr:'河南省',
				emergencyContacts:'ccc',
				emergencyRelation:'同学',
				emergencyPhone:'15140304309',
				//salaryCardType:'0',
				salaryCardNumber:null,
				cardSubbranch:null,
				workYear:'3',
				language:'01',
				languageLevel:'01',
				attIdFileInfo:{
					name:'ccc.png',
					id:'001',
				},
				attRegisterFileInfo:{
					name:'ddd.png',
					id:"002"
				}
			}
		})
	},


	/**
	 * 上传文件接口
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	"POST /file/upload.do":function(req,res,next){
		res.send({
			'code':200,
			'data':{
				'id':12,
				'name':'ccc.png',
				'url':'http://www.baid'
			}
		})
	},

	/**
	 * 获取工作地点（是否为北京的员工）和员工类型（0-正式 1-实习）
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /personal/commonInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':{
				'workType':2,
				'entryPlace':0
			}
		})
	},

	'POST /personal/saveInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':null,
			'msg':'保存成功'
		})
	},
	/**
	 * 获取教育经历
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /edu/getInfo.do':function(req,res,next){
		res.send({
				'code':'200',
				'data': {
					educationInfo: [{
						id: '01',
						schoolName: '大连理工大学',
						majorName: '计算机',
						startDate: '2010-09-01',
						finishDate: '2014-07-01',
						education: 'L10',
						degree: 'DG20',
						attTopGraduateId:'01',//最高学历毕业证id
						attTopDegreeId:'02',//最高学位的学位证id
						attIdentityCardId:'03'//学生证id

					},{
						id: '02',
						schoolName: '大连理工大学1',
						majorName: '计算机',
						startDate: '2010-09-01',
						finishDate: '2014-07-01',
						education: 'L10',
						degree: 'DG20',

					}],
					attIdentityCardFileInfo:{
						id:'01',
						name:'02',
						url:'ccc'
					}

				},
			}
		)
	},
	/**
	 * 保存教育经历
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'POST /edu/saveInfo.do':function(req,res,next){

		res.send({
			'code':200,
			'data':parseInt(Math.random()*99),
			'msg':'success'
		})
	},

	/**
	 * 删除教育经历
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'POST /edu/deleteInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':null,
			'msg':'success'
		})
	},
	/**
	 * 回传edu文件ID
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */

	'POST /edu/saveAttInfo.do':function(req,res,next){

		res.send({
			'code':200,
			'data':null,
			'msg':'success'
		})
	},

	/**
	 * 回传work文件ID
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */

	'POST /workExp/saveAttInfo.do':function(req,res,next){

		res.send({
			'code':200,
			'data':null,
			'msg':'success'
		})
	},

	/**
	 * 回传工牌照文件ID
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */

	'POST /workCard/saveAttInfo.do':function(req,res,next){

		res.send({
			'code':200,
			'data':null,
			'msg':'success'
		})
	},


	/**
	 * 保存工作经历
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'POST /workExp/saveInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':null,
			'msg':'success'
		})
	},
	/**
	 * 获取工作经历
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /workExp/getInfo.do':function(req,res,next){
		res.send({
				'code':'200',
				'data': {
					workExperienceInfo: [{
						id: '01',
						startDate: '2010-09-01',
						endDate: '2014-07-01',
						company: '公司——' + ~~Math.random()*10,
						position: '前端--' + ~~Math.random()*10
					},{
						id: '02',
						startDate: '2010-09-01',
						endDate: '2014-07-01',
						company: '公司——' + ~~Math.random()*10,
						position: '前端--' + ~~Math.random()*10
					}]
				},
			}
		)
	},

	/**
	 * 删除工作经历
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'POST /workExp/deleteInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':null,
			'msg':'success'
		})
	},

	/**
	 * 获得家庭成员
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /family/getInfo.do':function(req,res,next){
		res.send({
			'code':'200',
			'data': [{
					id: '01',
					memberName:'姓名_' + parseInt(Math.random()*10) ,
					relationship:'A' ,
					company:'公司_' + parseInt(Math.random()*10) ,
					position:'职位_' + parseInt(Math.random()*10)  ,
					phone:'15140304309'
				},{
					id: '02',
					memberName:'姓名_' + parseInt(Math.random()*10) ,
					relationship:'A' ,
					company:'公司_' + parseInt(Math.random()*10) ,
					position:'职位_' + parseInt(Math.random()*10)  ,
					phone:'15140304309'
				}],
		})
	},

	/**
	 * 保存家庭成员
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'POST /family/saveInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':null,
			'msg':'success'
		})
	},

	/**
	 * 删除家庭成员
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'POST /family/deleteInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':null,
			'msg':'success'
		})
	},

	/**
	 * 获得其他信息
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /others/getInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':{
				diseaseFlag:0
			},
			'msg':'success'
		})
	},

	'POST /others/saveInfo.do':function(req,res,next){

		res.send({
			'code':200,
			'data':null,
			'msg':'success'
		})
	},

	/**
	 * 上传工作照片
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'POST /image/cutAndUpload.do':function(req,res,next){

		res.send({
			'code': 200,
			'data': {
				'Appendix':{
					'id': '001',
					'name': '工作照--cc',
					'url': '//www.baidu.com/img/bd_logo1.png',

				}
			}
		})
	},

	/**
	 * 获取工牌照信息
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
	'GET /workCard/getInfo.do':function(req,res,next){
		res.send({
			'code':200,
			'data':{
				id:'01',
				name:'工牌照_' + parseInt(Math.random()*10) ,
				url:'//www.baidu.com/img/bd_logo1.png'
			},
			'msg':'success'
		})
	},

	'GET /sync/applicantDataFromNes.do':function(req,res,next){

		res.send({
			'code':200,
			'data':null,
			'msg':'success'

		})
	}

}










