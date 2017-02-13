
/*
 /**
 * Created by hzchengshuli on 2016/11/1.
 */
var mk = require('marked');
var Model = function(options){
    this.data = options.data;
    this.init();
    this.data.offerListInfo = this.__setOfferIndex(options.data.offerType);
    return this.data.offerListInfo;
}

Model.prototype = {
    init:function(){
        this.offerList();

    },

    /**
     * 获取模板ID
     * @param id
     * @returns {*}
     * @private
     */
    __setOfferIndex:function(id){


        return this.data.offerList[id-1];
    },


    offerList : function() {
        //1-北京实习生-通用,2-北京正式-乐得，3-北京正式-通用，4-广州实习通用，
        // 5-广州正式通用，6-杭州實習通用，7-杭州正式通用，8-杭州正式销售  9-北京bobo
        if(this.data.entryDate) {
            var entryDateArr = this.data.entryDate.split('-');


            var entryDateYear = entryDateArr[0];
            var entryDateMonth = entryDateArr[1];
            var entryDateDay = entryDateArr[2];

            var houseSubsidy = this.data.houseSubsidy || 0;
            var houseSubsidyMonth = this.data.houseSubsidyMonth || 0;
            var trafficSubsidy = this.data.trafficSubsidy || 0;
            var mealSubsidy = this.data.mealSubsidy || 0;
            var contractYears = ['无', '一', '二', '三'];

        }

        var mkStr = '';

        if(this.data.offerType == 1 || this.data.offerType == 4 || this.data.offerType == 6){
            if(houseSubsidy){
                mkStr = '<p class="indent-cont"><span class="second-cont-strong">异地补贴：</span>税前人民币<span class="spec-cont">' + houseSubsidy + '</span>元/月</p>'
            }

        } else {
            mkStr = '<p>4) 其他福利：';
            if(houseSubsidy){
                mkStr = mkStr +'异地/住房补贴<span class="spec-cont">' + houseSubsidy + '</span>元/月';
                if(houseSubsidyMonth && houseSubsidyMonth != 0){
                    mkStr = mkStr + ',发放月数<span class="spec-cont">' + houseSubsidyMonth + '</span>个月'
                }
            }
            if(mealSubsidy){
                if(houseSubsidy){
                    mkStr = mkStr + '；'
                }
                mkStr = mkStr +'餐补<span class="spec-cont">'+ mealSubsidy  + '</span>元/月'

            }
            if(trafficSubsidy){
                if(houseSubsidy || mealSubsidy){
                    mkStr = mkStr + '；';
                }
                mkStr = mkStr + '交通补贴<span class="spec-cont">'+ trafficSubsidy + '</span>元/月'
            }
            if((!houseSubsidy) && (!trafficSubsidy) && (!houseSubsidy)){
                mkStr ='';
            } else {
                mkStr = mkStr + '。</p>';
            }
        }


        var youdaoStr = '';
        if(this.data.offerType == 10){
            /*yearBonus: 0 //年度奖金
             quarterBonus:1212,//季度奖金
             monthBonus :1212,月度奖金
             commissionBonus:1 //提成奖金*/
            if(this.data.yearBonus>0){
                youdaoStr = youdaoStr + '<p class="indent-cont"><span class="second-cont-strong">年度奖金：</span>一般为1-2个月基本月薪，实际发放金额将根据公司政策和绩效考核结果确定。</p>'
            }
            if(this.data.quarterBonus>0){
                youdaoStr = youdaoStr + '<p class="indent-cont"><span class="second-cont-strong">季度奖金：</span>奖金基数为<span class="spec-cont">' + this.data.quarterBonus + '</span>元/季度，实际发放金额将根据公司政策和绩效考核结果确定。</p>'
            }
            if(this.data.monthBonus > 0){
                youdaoStr = youdaoStr + '<p class="indent-cont"><span class="second-cont-strong">月度奖金：</span>奖金基数为<span class="spec-cont">' + this.data.monthBonus + '</span>元/月，实际发放金额将根据公司政策和绩效考核结果确定。</p>'

            }
            if(this.data.commissionBonus>0){
                youdaoStr = youdaoStr + '<p class="indent-cont"><span class="second-cont-strong">提成奖金：</span>具体绩效目标、提成比例和奖金方案在入职后会由部门主管与您订立，实际奖金的发放金额将根据目标绩效完成情况和奖金方案计算确定和发放。</p>'

            }
        }


        var level = this.data.spcLevel && this.data.mngLevel ? this.data.spcLevel + '/' + this.data.mngLevel : this.data.spcLevel || this.data.mngLevel;


        this.data.offerList = [{
            title:'参加实习通知书',
            name:  this.data.name + ", 您好：",
            intro: mk('感谢您对网易的关注，我们很高兴的通知您，您已经通过我们的考核环节，我们拟同意您到网易参加实习。本通知书为机密文件，请妥善保管。'),
            content:[{
                //1-北京实习生-通用
                title: '1. 关于职位',
                cont: mk('您在实习期的职位是<span class="spec-cont">' + this.data.postName +'</span>'),
            }, {
                title: '2. 关于实习薪资',
                cont: mk('<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>元/月</p>' + mkStr
                ),
            },{
                title:'3. 关于福利',
                cont:mk('<p>公司提供工作日的餐食及班车。</p>')

            },{

                title: '4. 关于实习时间',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:30正式报到。实习周期为<span class="spec-cont">'+ this.data.contractYears + '个月</span> </p>' +
                    '<p>报到地址：<span class="spec-cont">北京市海淀区西北旺东路10号院 中关村软件园二期西区7号 网易大厦 前台</span></p>'+
                    '<p>入职需提交的资料，详见“入职指引”。</p>')
            },{
                title: '5. 关于实习协议',
                cont:mk('<p>由于您是外派到网易实习，您将与派遣公司签订学生实习协议。如您最终未与派遣公司签署学生实习协议或您未满足上述学生实习协议中的可实习条件，则本通知书将自始无效。</p>')

            },{
                title:'6. 其他',
                cont:mk('<p>如果无法按照预约时间到公司报到实习，请提前联系人力资源部 张琴，电话：010-82558574。</p>')

            }],
            offerDate:this.data.offerDate,
            company:'网易公司'

        },{
            //2-北京正式-乐得
            title:'录用通知书',
                name:  "尊敬的" + this.data.name +'：',
                intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
                content:[{
                    title: '1. 职位及级别',
                    cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
                }, {
                    title: '2. 薪金',
                    cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                        '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                        + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底三薪：</span>年度结束后，您将获得相当于2个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底三薪。</p>' +
                        '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>一般为3个月基本月薪，实际发放金额将根据公司政策和年度绩效考核结果确定。</p>' +
                        '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                        '<p>3）根据公司经营状况和您本人的绩效考核结果，每半年复核一次您的基本月薪。</p>'
                    ),
                    specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                        '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                        '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


                },{
                    title:'3. 员工福利',
                    cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                            '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                            '<p>3) 公司还将提供餐食供应、班车、年度体检、带薪休假、生日礼物等福利。</p>'+ mkStr


                    ),
                    specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                        '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

                },{

                    title: '4. 报到日期',
                    cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:30正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                        '<p>报到地址：<span class="spec-cont">北京市海淀区西北旺东路10号院 中关村软件园二期西区7号 网易大厦 前台</span></p>'+
                        '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                        '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                    )
                },{
                    title: '5. 其他',
                    cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                            '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                            '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                        )

                }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //3-北京正式-通用
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + ':' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>一般为3个月基本月薪，实际发放金额将根据公司政策和年度绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'
                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供餐食供应、班车、年度体检、带薪休假、生日礼物等福利。</p>'+ mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '4. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:30正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p>报到地址：<span class="spec-cont">北京市海淀区西北旺东路10号院 中关村软件园二期西区7号 网易大厦 前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '5. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //4-广州实习通用
            title:'参加实习通知书',
            name:  this.data.name + ", 您好：",
            intro: mk('感谢您对网易的关注，我们很高兴的通知您，您已经通过我们的考核环节，我们拟同意您到网易参加实习。本通知书为机密文件，请妥善保管。'),
            content:[{
                title: '1. 关于职位',
                cont: mk('您在实习期的职位是：<span class="spec-cont">' + this.data.postName +'</span>'),
            }, {
                title: '2. 关于实习薪资',
                cont: mk('<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>元/月</p>' + mkStr
                ),
            },{
                title:'3. 关于福利',
                cont:mk('<p>公司免费提供工作日的三餐及班车</p>')

            },{

                title: '4. 关于实习时间',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:15正式报到。实习周期为<span class="spec-cont">'+ this.data.contractYears + '个月</span>。 </p>' +
                    '<p><span class="spec-cont">报到地址：广州市天河区科韵路16号广州信息港E座网易大厦一楼前台</span></p>'+
                    '<p>入职需提交的资料，详见“入职指引”。</p>')
            },{
                title: '5. 关于实习生协议',
                cont:mk('<p>由于您是外派到网易实习，您将与派遣公司签订学生实习协议。如您最终未与派遣公司签署学生实习协议或您未满足上述学生实习协议中的可实习条件，则本通知书将自始无效。</p>')

            },{
                title:'6. 其他',
                cont:mk('<p>如果无法按照预约时间到公司报到实习，请提前联系HR服务台，联系方式见“入职指引“。</p>')

            }],
            offerDate:this.data.offerDate,
            company:'网易公司'

        },{
            //5-广州正式通用
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + ':',
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>您的试用期薪资为税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>，个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>实际发放金额将根据公司政策和年度绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'
                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供免费三餐、班车、年度体检、带薪休假、生日礼物等福利。</p>'+ mkStr

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '4. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:15正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p>报到地址：<span class="spec-cont">广州市天河区科韵路16号广州信息港E座网易大厦一楼前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '5. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //6 杭州实习通用
            title:'参加实习通知书',
            name:  this.data.name + ", 您好：",
            intro: mk('感谢您对网易的关注，我们很高兴的通知您，您已经通过我们的考核环节，我们拟同意您到网易参加实习。本通知书为机密文件，请妥善保管。'),
            content:[{
                title: '1. 关于职位',
                cont: mk('您在实习期的职位是<span class="spec-cont">' + this.data.postName +'</span>'),
            }, {
                title: '2. 关于实习薪资',
                cont: mk('<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>元/月</p>' + mkStr
                ),
            },{
                title:'3. 关于福利',
                cont:mk('<p>公司免费提供工作日的三餐及班车。</p>')

            },{

                title: '4. 关于实习时间',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:00正式报到。实习周期为<span class="spec-cont">'+ this.data.contractYears + '个月。</span> </p>' +
                    '<p>报到地址：<span class="spec-cont">杭州市滨江区网商路599号网易大厦C1楼前台</span></p>'+
                    '<p>入职需提交的资料，详见“入职指引”。若入职时间有变动，务必提前告知相关HR：<span class="spec-cont">'+ this.data.hrName + '|' + this.data.hrEmail + '</span></p>')
            },{
                title: '5. 关于实习协议',
                cont:mk('<p>由于您是外派到网易实习，您将与派遣公司签订学生实习协议。如您最终未与派遣公司签署学生实习协议或您未满足上述学生实习协议中的可实习条件，则本通知书将自始无效。</p>')

            },{
                title:'6. 其他',
                cont:mk('<p>如果无法按照预约时间到公司报到实习，请提前联系HR。</p>')

            }],
            offerDate:this.data.offerDate,
            company:'网易公司'

        },{
            //7 杭州正式通用
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + '：' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>一般为3个月基本月薪，实际发放金额将根据公司政策和年度绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供免费三餐、班车、年度体检、带薪休假、生日礼物等福利。</p>' + mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '4. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:00正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p><span class="spec-cont">报到地址：杭州市滨江区网商路599号 网易大厦 C1楼前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '5. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //8 杭州销售通用
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + '：' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的固定年薪包括以下两个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p>2）您的目标绩效奖金采取提成制，具体绩效目标、提成比例和奖金方案在入职后会由部门主管与您订立，实际奖金的发放金额将根据目标绩效完成情况和奖金方案计算确定和发放。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'
                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供免费三餐、班车、年度体检、带薪休假、生日礼物等福利。</p>'+ mkStr

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '4. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:00正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p>报到地址：<span class="spec-cont">杭州市滨江区网商路599号 网易大厦 C1楼前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '5. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //9-北京正式-BOBO
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + ':' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>一般为2个月基本月薪，实际发放金额将根据公司政策和年度绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'
                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供餐食供应、班车、年度体检、带薪休假、生日礼物等福利。</p>'+ mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '4. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:30正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p>报到地址：<span class="spec-cont">北京市海淀区西北旺东路10号院 中关村软件园二期西区7号 网易大厦 前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '5. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //10-北京有道
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + ':' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ this.data.empLevel +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' + youdaoStr +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每半年复核一次您的基本月薪。</p>'

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供餐食供应、班车、年度体检、带薪休假、生日礼物等福利。</p>'+ mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '4. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:30正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p>报到地址：<span class="spec-cont">北京市海淀区西北旺东路10号院 中关村软件园二期西区7号 网易大厦 前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '5. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //11 杭州正式通用-云音乐-一万期权
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + '：' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>一般为3个月基本月薪，实际发放金额将根据公司政策和年度绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 股票期权',
                cont:mk('<p>在您入职后，网易关联公司将授予您 10000 股的 杭州网易云音乐科技有限公司 期权，分 四 年进行归属，分别归属比例依次为0%、50%、25%、25%，您最终获得的具体收益金额将根据约定行权价及上市股价情况来确定，同时关于前述期权的所有事宜均以网易关联公司与您签署的《期权授予协议》为准。</p>')
            },{
                title:'4. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供免费三餐、班车、年度体检、带薪休假、生日礼物等福利。</p>' + mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '5. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:00正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p><span class="spec-cont">报到地址：杭州市滨江区网商路599号 网易大厦 C1楼前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '6. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //12 杭州正式通用-云音乐-2万期权
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + '：' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>一般为3个月基本月薪，实际发放金额将根据公司政策和年度绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 股票期权',
                cont:mk('<p>在您入职后，网易关联公司将授予您 20000 股的 杭州网易云音乐科技有限公司 期权，分 四 年进行归属，分别归属比例依次为0%、50%、25%、25%，您最终获得的具体收益金额将根据约定行权价及上市股价情况来确定，同时关于前述期权的所有事宜均以网易关联公司与您签署的《期权授予协议》为准。</p>')
            },{
                title:'4. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供免费三餐、班车、年度体检、带薪休假、生日礼物等福利。</p>' + mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '5. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:00正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p><span class="spec-cont">报到地址：杭州市滨江区网商路599号 网易大厦 C1楼前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '6. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //13 杭州正式通用-云音乐-3万期权
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + '：' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>一般为3个月基本月薪，实际发放金额将根据公司政策和年度绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 股票期权',
                cont:mk('<p>在您入职后，网易关联公司将授予您 30000 股的 杭州网易云音乐科技有限公司 期权，分 四 年进行归属，分别归属比例依次为0%、50%、25%、25%，您最终获得的具体收益金额将根据约定行权价及上市股价情况来确定，同时关于前述期权的所有事宜均以网易关联公司与您签署的《期权授予协议》为准。</p>')
            },{
                title:'4. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供免费三餐、班车、年度体检、带薪休假、生日礼物等福利。</p>' + mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '5. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:00正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p><span class="spec-cont">报到地址：杭州市滨江区网商路599号 网易大厦 C1楼前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '6. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //14 杭州正式通用-云音乐-5万期权
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + '：' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>一般为3个月基本月薪，实际发放金额将根据公司政策和年度绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 股票期权',
                cont:mk('<p>在您入职后，网易关联公司将授予您 50000 股的 杭州网易云音乐科技有限公司 期权，分 四 年进行归属，分别归属比例依次为0%、50%、25%、25%，您最终获得的具体收益金额将根据约定行权价及上市股价情况来确定，同时关于前述期权的所有事宜均以网易关联公司与您签署的《期权授予协议》为准。</p>')
            },{
                title:'4. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供免费三餐、班车、年度体检、带薪休假、生日礼物等福利。</p>' + mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '5. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:00正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p><span class="spec-cont">报到地址：杭州市滨江区网商路599号 网易大厦 C1楼前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '6. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //15 杭州正式-云信客服
            title:'录用通知书',
            name:  "尊敬的" + this.data.name + '：' ,
            intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
            content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期薪资不变），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金（月度）：</span>实际发放金额将根据公司政策和月度绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供免费三餐、班车、年度体检、带薪休假、生日礼物等福利。</p>' + mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '4. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:00正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p><span class="spec-cont">报到地址：杭州市滨江区网商路599号 网易大厦 C1楼前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '5. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
            offerDate:this.data.offerDate,
            company:this.data.company
        },{
            //16 杭州正式通用-邮件客服
            title:'录用通知书',
                name:  "尊敬的" + this.data.name + '：' ,
                intro: mk('本信函是为了确认您与<span class="spec-cont">' + this.data.company + '</span> 达成的劳动合同条款。具体情况如下：'),
                content:[{
                title: '1. 职位及级别',
                cont: mk('您就任的职位是：<span class="spec-cont">' + this.data.postName +'</span>，级别是：<span class="spec-cont">'+ level +'</span>'),
            }, {
                title: '2. 薪金',
                cont: mk('<p> 1）您的目标年薪包括以下三个部分</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">基本月薪：</span>税前人民币<span class="spec-cont">'
                    + this.data.salary + '</span>（试用期结束后根据工作表现复核基本月薪），个人所得税将由您本人负担。</p>' + '<p class="indent-cont"><span class="second-cont-strong">年底双薪：</span>年度结束后，您将获得相当于1个月的基本月薪，具体数额将根据您在职时间确定，当年12月31日之前离职将不能享受本年度年底双薪。</p>' +
                    '<p class="indent-cont"><span class="second-cont-strong">目标绩效奖金：</span>实际发放金额将根据公司政策和绩效考核结果确定。</p>' +
                    '<p>2）如果所在部门有设立项目，根据项目完成情况有机会获得项目奖金，项目奖金不包含在目标年薪之内。</p>' +
                    '<p>3）根据公司经营状况和您本人的绩效考核结果，每年复核一次您的基本月薪。</p>'

                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '上述条款中所提及的“目标”奖金并非员工最终获得的实际奖金，实际奖金以“目标”奖金作为基础，根据公司、部门、个人业绩进行浮动，并需折算当期工作时间等多种因素确定。实际奖金的具体计算和发放办法将按公司相关政策执行。</p>'+
                '<p>若在适用过程中对奖金相关政策产生歧义，公司享有解释的权利。</p>'


            },{
                title:'3. 员工福利',
                cont:mk('<p>1) 公司将为员工提供基本医疗保险、养老保险、失业保险、生育保险、工伤保险和住房公积金等法定福利，每个月将会从工资中代扣员工个人缴纳部分。</p>' +
                    '<p>2) 在您转正后，可以从工作第一年开始享受7个工作日的带薪年假。工作年限每增加1年，年假天数增加1个工作日，最多不超过20个工作日。如果年假天数低于法定年休假天数，按就高原则确定。实际可休年假以公司内网公布的为准。</p>'+
                    '<p>3) 公司还将提供免费三餐、班车、年度体检、带薪休假、生日礼物等福利。</p>' + mkStr


                ),
                specialInfo:'<p><span class="second-cont-strong">*特别说明：</span>'+
                '若在适用过程中对福利相关政策产生歧义，公司享有解释的权利。</p>'

            },{

                title: '4. 报到日期',
                cont:mk('<p>您将于<span class="spec-cont">'+ entryDateYear + '年' + entryDateMonth + '月' + entryDateDay + '日</span>上午9:00正式报到。若入职时间有变动，务必提前告知相关HR。入职需提交的资料，详见“入职指引”。</p>' +
                    '<p><span class="spec-cont">报到地址：杭州市滨江区网商路599号 网易大厦 C1楼前台</span></p>'+
                    '<p>公司将与您签订<span class="spec-cont">' + contractYears[this.data.contractYears/12] + '年固定期限</span>劳动合同，<span class="spec-cont">试用期'+ this.data.trialPeriod +'个月</span>。公司将视试用情况决定您是否可以转为正式员工。</p>'+
                    '<p>若您接收我公司的offer，请在3个工作日之内操作“接受offer”；若3个工作日之内未确认，公司将有权取消offer。若没有事前通知公司且得到公司许可，在应入职时间未准时报到并办理入职手续的，offer将自动失效。</p>'

                )
            },{
                title: '5. 其他',
                cont:mk('<p>1）在入职之前，公司有权对您提供的资料进行核查，若在此过程中发现您提供虚假信息（包括但不限于：学历信息、薪酬信息、过往工作经历信息等）公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>2）如发现您刻意隐瞒重大病史（包括但不限于影响工作的重大疾病、传染病等）、体检不合格或其他不适宜参加入职的身体状况，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'+
                    '<p>3）如您与原单位存在有效的竞业限制协议而未申报或披露，公司将有权取消offer；如双方已经签订劳动合同，任何时候公司均有权单方解除劳动合同。</p>'
                )

            }],
                offerDate:this.data.offerDate,
                company:this.data.company
        }];
    },
}

module.exports = Model;