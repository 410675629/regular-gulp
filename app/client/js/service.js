var ajax = require('./base/request.js');

exports.getToken = function(callback,errback){

    ajax.request({
        url:'/sys/getToken.do',
        method:'GET',
        success:callback,
        error:errback,
    })
}

//登录
exports.login = function(params,callback,errback){

    ajax.request({
        url: '/sys/login.do',
        method: 'POST',
        data: params,
        success: callback,
        error:errback
        //contentType:"application/x-www-form-urlencoded",
    });
}
/**
 * 登出
 * @param callback
 * @param errback
 */
exports.logout = function(callback,errback){


    ajax.request({
        url:'/sys/logout.do',
        method:'GET',
        success:callback,
        error:errback,
    })
}
/**
 * 获取验证码
 * @param 成功回调函数
 * @param 错误回调函数
 */
exports.getVerificationCode = function(callback,errback){

    ajax.request({
        url:'/sys/getValiationCode.do',
        method:'GET',
        success:callback,
        error:errback,
    })
}

/**
 * 发送重置密码邮件
 */
exports.sendResetPwdEmail = function(params,callback,errback){

    ajax.request({
        url: '/forgotPwd/mail.do',
        method: 'POST',
        data: params,
        success: callback,
        error:errback,

    });
}
/**
 * 获取用户信息
 * @param callback
 * @param errback
 */
exports.getUserInfo = function(callback,errback){

    ajax.request({
        url:'/forgotPwd/getUser.do',
        method:'GET',
        success:callback,
        error:errback
    })
}

exports.resetPwd = function(params,callback,errback){

    ajax.request({
        url:'/forgotPwd/resetPwd.do',
        method:'POST',
        success:callback,
        error:errback,
        data:params
    })
}
/**
 * 修改密码
 * @param params
 * @param callback
 * @param errback
 */
exports.changePwd = function(params,callback,errback){

    ajax.request({
        url: '/sys/resetPwd.do',
        method: 'POST',
        data: params,
        success: callback,
        error:errback,

    });
}


/**
 * 获取我的offer中的参数信息
 * @param callback
 * @param errback
 */
exports.getOfferInfo = function(callback,errback){

    ajax.request({
        url:'/myOffer/getInfo.do',
        method:'GET',
        success:callback,
        error:errback,
    })
}

/**
 * 提交offer状态
 * @param params
 * @param callback
 * @param errback
 */
exports.submitOfferStatus = function(callback,errback){

    ajax.request({
        url:'/myOffer/submitStatus.do',
        method:'GET',

        success:callback,
        error:errback
    })

}

/*
exports.checkInfo = function(callback,errback){

    ajax.request({
        url:'/sync/checkInfo.do',
        method:'GET',

        success:callback,
        error:errback
    })
}
*/

/**
 * 获取审核状态
 * @param callback
 * @param errback
 */
exports.getAuditStatus = function(callback,errback){

    ajax.request({
        url:'/audit/getStatus.do',
        method:'GET',
        success:callback,
        error:errback
    })
}
/**
 * 获取个人信息页面中的国籍
 * @param callback
 * @param errback
 */
exports.getNationList = function(callback,errback){

    ajax.request({
        url:'/common/options/ehr_native.do',
        method:'GET',
        success:callback,
        error:errback
    })

}

/**
 * 获取个人信息页面中的 民族
 * @param callback
 * @param errback
 */
exports.getNationalityList = function(callback,errback){

    ajax.request({
        url:'/common/options/nationality.do',
        method:'GET',
        success:callback,
        error:errback
    })
}
/**
 * 获取个人信息页面中的籍贯
 * @param callback
 * @param errback
 */
exports.getNativePlaceList = function(callback,errback){

    ajax.request({
        url:'/common/options/native_place.do',
        method:'GET',
        success:callback,
        error:errback
    })

}
/**
 * 获取个人信息页面中的外语语种
 * @param callback
 * @param errback
 */
exports.getLanguageList = function(callback,errback){

    ajax.request({
        url:'/common/options/ehr_language.do',
        method:'GET',
        success:callback,
        error:errback
    })
}

/**
 * 获取个人信息页面中的外语等级
 * @param callback
 * @param errback
 */
exports.getLanguageLevelList = function(callback,errback){

    ajax.request({
        url:'/common/options/ehr_language_level.do',
        method:'GET',
        success:callback,
        error:errback
    })
}
/**
 * 获取教育经历中的学历
 * @param callback
 * @param errback
 */
exports.getEducationListInfo = function(callback,errback){

    ajax.request({
        url:'/common/options/ehr_graduate.do',
        method:'GET',
        success:callback,
        error:errback
    })
}
/**
 * 获取教育经历中的学位
 * @param callback
 * @param errback
 */
exports.getDegreeListInfo = function(callback,errback){

    ajax.request({
        url:'/common/options/ehr_degree.do',
        method:'GET',
        success:callback,
        error:errback
    })
}

exports.deleteFile = function(params,callback,errback){

    ajax.request({
        url:'/file/delete.do',
        method:'POST',
        data:params,
        success:callback,
        error:errback
    })
}
/**
 * 获取个人信息
 * @param callback
 * @param errback
 */
exports.getPersonalInfo = function(callback,errback){

    ajax.request({
        url:'/personal/getInfo.do',
        method:'GET',
        success:callback,
        error:errback
    })
}
/**
 * 获得信息完整状态
 * @param callback
 * @param errback
 */
exports.getPageIntegrity = function(callback,errback){

    ajax.request({
        url:'/common/getPageIntegrity.do',
        method:'GET',
        success:callback,
        error:errback
    })
}

/**
 * 更新信息完整状态
 * @param callback
 * @param errback
 */
exports.updatePageIntegrity = function(params,callback,errback){

    ajax.request({
        url:'/common/savePageIntegrity.do',
        method:'POST',
        data:params,
        success:callback,
        error:errback
    })
}

/**
 * 保存个人信息
 * @param formData
 * @param callback
 * @param errback
 */
exports.savePersonalInfo = function(formData,callback,errback){

    ajax.request({
        url:'/personal/saveInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })
}

/**
 * 查询教育经历
 * @param callback
 * @param errback
 */
exports.getEduInfo = function(callback,errback){

    ajax.request({
        url:'/edu/getInfo.do',
        method:'GET',
        success:callback,
        error:errback
    })
}
/**
 * 保存教育经历
 * @param formData
 * @param callback
 * @param errback
 */
exports.saveEduInfo = function(formData,callback,errback){

    ajax.request({
        url:'/edu/saveInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })
}
/**
 * 删除教育经历
 * @param formData
 * @param callback
 * @param errback
 */
exports.deleteEduInfo = function(formData,callback,errback){

    ajax.request({
        url:'/edu/deleteInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })
}

/**
 * 回传edu中上传文件ID
 * @param formData
 * @param callback
 * @param errback
 */
exports.setEduAttachmentId = function(formData,callback,errback){

    ajax.request({
        url:'/edu/saveAttInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })
}
/**
 * 回传work中上传文件ID
 * @param formData
 * @param callback
 * @param errback
 */
exports.setWorkAttachmentId = function(formData,callback,errback){

    ajax.request({
        url:'/workExp/saveAttInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })
}
/**
 * 回传工牌照中上传文件ID
 * @param formData
 * @param callback
 * @param errback
 */
exports.setPhotoAttachmentId = function(formData,callback,errback){

    ajax.request({
        url:'/workCard/saveAttInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })
}

/**
 * 获取员工类型
 * @param callback
 * @param errback
 */
exports.salaryCardStatus = function(callback,errback){

    ajax.request({
        url:'/personal/commonInfo.do',
        method:'GET',
        success:callback,
        error:errback
    })
}
/**
 * 保存工作经历
 * @param formData
 * @param callback
 * @param errback
 */
exports.saveWorkExpInfo = function(formData,callback,errback){

    ajax.request({
        url:'/workExp/saveInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })

}

/**
 * 获取工作经历
 * @param callback
 * @param errback
 */
exports.getWorkExpInfo = function(callback,errback){

    ajax.request({
        url:'/workExp/getInfo.do',
        method:'GET',
        success:callback,
        error:errback
    })
}

/**
 * 删除工作经历
 * @param formData
 * @param callback
 * @param errback
 */
exports.deleteWorkExpInfo = function(formData,callback,errback){

    ajax.request({
        url:'/workExp/deleteInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })
}

/**
 * 获得家庭成员
 * @param callback
 * @param errback
 */
exports.getMember = function(callback,errback){

    ajax.request({
        url:'/family/getInfo.do',
        method:'GET',
        success:callback,
        error:errback
    })
}
/**
 * 保存家庭成员
 * @param formData
 * @param callback
 * @param errback
 */
exports.saveMember = function(formData,callback,errback){

    ajax.request({
        url:'/family/saveInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })
}
/**
 * 删除家庭成员
 * @param formData
 * @param callback
 * @param errback
 */
exports.deleteMember = function(formData,callback,errback){

    ajax.request({
        url:'/family/deleteInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData
    })
}
/**
 * 获取其他信息
 * @param callback
 * @param errback
 */
exports.getOthersInfo = function(callback,errback){

    ajax.request({
        url:'/others/getInfo.do',
        method:'GET',
        success:callback,
        error:errback

    })
}

exports.saveOtherInfo = function(formData,callback,errback){

    ajax.request({
        url:'/others/saveInfo.do',
        method:'POST',
        success:callback,
        error:errback,
        data:formData

    })
}
/**
 * 获取工牌照信息
 * @param callback
 * @param errback
 */
exports.getPhotoInfo = function(callback,errback){

    ajax.request({
        url:'/workCard/getInfo.do',
        method:'GET',
        success:callback,
        error:errback

    })
}

exports.applicantData = function(callback,errback){

    ajax.request({
        url:'/sync/applicantDataFromNes.do',
        method:'GET',
        success:callback,
        error:errback

    })
}