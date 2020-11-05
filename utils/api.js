import {fetch,upload} from './util'
//注册
export function register(options){
  var {account,password,code,success,error } = options
  fetch({
    url:'register',
    data:{
      account:account,
      password:password,
      code:code
    },
    success,error
  })
}

// 登录
export function login(options){
  var {account,password,type,success,error  } = options
  fetch({
    url:'login',
    data:{
      account:account,
      password:password,
      type:type
    },
    success,error
  })
}
// 获取验证码
export function getCode(options){
  var {account,success,error } = options
  fetch({
    url:'auth/code',
    method:'get',
    data:{
      account:account
    },
    success,error
  })
}
// 注册短信
export function sendRegSms(options){
  var {mobile,code,uuid,success,error  } = options
  fetch({
    url:'auth/sendRegSms',
    method:'GET',
    data:{
      mobile:mobile,
      code:code,
      uuid:uuid
    },
    success,error
  })
}
// 修改密码短信
export function sendResetPwdSms(options){
  var {mobile,code,uuid,success,error  } = options
  fetch({
    url:'auth/sendResetPwdSms',
    method:'GET',
    data:{
      mobile:mobile,
      code:code,
      uuid:uuid
    },
    success,error
  })
}
// 修改密码
export function resetPwd(options){
  var {account,code,password,success,error  } = options
  fetch({
    url:'resetPwd',
    data:{
      account:account,
      code:code,
      password:password
    },
    success,error
  })
}
// 用户信息
export function userInfo(options){
  var {success,error  } = options
  fetch({
    url:'user/info',
    method:'GET',
    data:{},
    success,error
  })
}
// 老师信息
export function teacherInfo(options){
  var {success,error  } = options
  fetch({
    url:'teacher/info',
    method:'GET',
    data:{},
    success,error
  })
}
// 机构下考级列表
export function teacherList(options){
  var {page,status,success,error  } = options
  fetch({
    url:'organizationEnrollDate/teacherList',
    method:'GET',
    data:{
      page:page,
      pageSize:10,
      status:status
    },
    success,error
  })
}
// 考级详情
export function examDetail(options){
  var {id,status,success,error  } = options
  fetch({
    url:'organizationEnrollDate/info',
    method:'GET',
    data:{
      id:id,
      status:status
    },
    success,error
  })
}
// 老师名下学生数量
export function teacherCount(options){
  var {oId,success,error } = options
  fetch({
    url:'orderStudent/teacherCount',
    method:'GET',
    data:{
      organizationEnrollDateId:oId
    },
    success,error
  })
}
// 老师名下学生列表
export function teacherCountList(options){
  var {page,success,error } = options
  fetch({
    url:'orderStudent/list',
    method:'GET',
    data:{
      page:page,
      pageSize:10
    },
    success,error
  })
}
// 学生详情
export function studentInfo(options){
  var {orderStudentId,studentId,success,error } = options
  fetch({
    url:'orderStudent/info',
    method:'GET',
    data:{
      orderStudentId:orderStudentId,
      studentId:studentId
    },
    success,error
  })
}
// 学生列表
export function studentList(options){
  var {page,success,error } = options
  fetch({
    url:'student/list',
    method:'GET',
    data:{
      page:page,
      pageSize:10
    },
    success,error
  })
}
// 机构列表
export function sysDeptList(options){
  var {success,error } = options
  fetch({
    url:'sysDept/list',
    method:'GET',
    data:{},
    success,error
  })
}
// 民族列表
export function chooseNationList(options){
  var {success,error } = options
  fetch({
    url:'nation/chooseNationList',
    method:'GET',
    data:{},
    success,error
  })
}
// 国家列表
export function chooseCountriesList(options){
  var {success,error } = options
  fetch({
    url:'countries/chooseCountriesList',
    method:'GET',
    data:{},
    success,error
  })
}
// 考级列表
export function enrollList(options){
  var {studentId,page,success,error } = options
  fetch({
    url:'organizationEnrollDate/studentList',
    method:'GET',
    data:{
      studentId:studentId,
      page:page,
      pageSize:10
    },
    success,error
  })
}

// 视频考级列表
export function levelExamList(options){
  var {page,success,error } = options
  fetch({
    url:'levelExam/list',
    method:'GET',
    data:{
      page:page,
      pageSize:10
    },
    success,error
  })
}

// 视频考级详情
export function levelExamDetail(options){
  var {id,success,error } = options
  fetch({
    url:'levelExam/detail',
    method:'GET',
    data:{
      id:id
    },
    success,error
  })
}

// 考场详情
export function roomDetail(options){
  var {id,success,error } = options
  fetch({
    url:'examRoom/info',
    method:'GET',
    data:{
      id:id
    },
    success,error
  })
}

// 考题详情
export function examPaperDetail(options){
  var {id,success,error } = options
  fetch({
    url:'examPaper/info',
    method:'GET',
    data:{
      id:id
    },
    success,error
  })
}

// 科目列表
export function pItemList(options){
  var {pid,success,error } = options
  fetch({
    url:'professionalItem/list',
    method:'GET',
    data:{
      pid:pid
    },
    success,error
  })
}
// 改变准考证状态
export function examStart(options){
  var {id,success,error } = options
  fetch({
    url:'levelExam/start',
    method:'GET',
    data:{
      id:id
    },
    success,error
  })
}
// 上传作品
export function updateWorks(options){
  var {id,opus,success,error } = options
  fetch({
    url:'levelExam/update',
    method:'POST',
    data:{
      id:id,
      opus:opus
    },
    success,error
  })
}
// 级别列表
export function subItemList(options){
  var {success,error } = options
  fetch({
    url:'subjectLevel/list',
    method:'GET',
    data:{},
    success,error
  })
}
// 考级价格
export function professionalPrice(options){
  var {professionalId,subjectLevelId,success,error } = options
  fetch({
    url:'professionalItemDetail/info',
    method:'GET',
    data:{
      professionalId,
      subjectLevelId
    },
    success,error
  })
}
// 图片上传
export function imgUpload(options){
  var {images,success,error } = options
  upload({
    url:'image/upload',
    filePath:images,
    success,error
  })
}
// 添加学生
export function addStudent(options){
  var {organizationId,name,alphabet,sex,birthday,nationality,mobile,nation,idCard,contacts,urgentMobile,address,avatar,success,error } = options
  fetch({
    url:'student/add',
    method:'POST',
    data:{
      organizationId:organizationId,
      name:name,
      alphabet:alphabet,
      sex:sex,
      birthday:birthday,
      nationality:nationality,
      nation:nation,
      idCard:idCard,
      contacts:contacts,
      mobile:mobile,
      urgentMobile:urgentMobile,
      address:address,
      avatar:avatar
    },
    success,error
  })
}
// 学生信息详情
export function studentDetail(options){
  var {studentId,success,error } = options
  fetch({
    url:'student/info',
    method:'GET',
    data:{
      studentId:studentId
    },
    success,error
  })
}
// 修改学生信息
export function updateStudentInfo(options){
  var {id,organizationId,name,alphabet,sex,birthday,nationality,mobile,nation,idCard,contacts,urgentMobile,address,avatar,success,error } = options
  fetch({
    url:'student/update',
    method:'POST',
    data:{
      id:id,
      organizationId:organizationId,
      name:name,
      alphabet:alphabet,
      sex:sex,
      birthday:birthday,
      nationality:nationality,
      nation:nation,
      idCard:idCard,
      contacts:contacts,
      mobile:mobile,
      urgentMobile:urgentMobile,
      address:address,
      avatar:avatar
    },
    success,error
  })
}
// 删除学生信息
export function detStudent(options){
  var {studentId,success,error } = options
  fetch({
    url:'student/del',
    method:'POST',
    data:{
      id:studentId
    },
    success,error
  })
}
// 下单
export function addOrder(options){
  var {organizationEnrollDateId,professionalItemId,levelId,studentId,success,error } = options
  fetch({
    url:'order/add',
    method:'POST',
    data:{
      organizationEnrollDateId:organizationEnrollDateId,
      professionalItemId:professionalItemId,
      levelId:levelId,
      studentId:studentId
    },
    success,error
  })
}
// 支付
export function payOrder(options){
  var {orderId,openId,success,error } = options
  fetch({
    url:'pay/getPayParams',
    method:'GET',
    data:{
      orderId:orderId,
      openId:openId
    },
    success,error
  })
}
// 获取openid
export function getOpenId(options){
  var {code,success,error } = options
  fetch({
    url:'auth/getOpenId',
    method:'POST',
    data:{
      code:code
    },
    success,error
  })
}
// 报名列表
export function orderList(options){
  var {page,success,error } = options
  fetch({
    url:'order/list',
    method:'GET',
    data:{
      page:page,
      pageSize:10
    },
    success,error
  })
}
// 取消报名（退款）

export function applyBack(options){
  var {orderId,success,error } = options
  fetch({
    url:'pay/applyBack',
    method:'GET',
    data:{
      orderId:orderId
    },
    success,error
  })
}
// 取消报名
export function cancelOrder(options){
  var {orderId,success,error } = options
  fetch({
    url:'order/cancel',
    method:'POST',
    data:{
      id:orderId
    },
    success,error
  })
}
// 查询支付结果
export function orderQuery(options){
  var {orderId,success,error } = options
  fetch({
    url:'pay/orderQuery',
    method:'GET',
    data:{
      orderId:orderId
    },
    success,error
  })
}

// 准考证
export function levelExamCard(options){
  var {orderId,success,error } = options
  fetch({
    url:'levelExam/info',
    method:'GET',
    data:{
      orderId:orderId
    },
    success,error
  })
}

// 成绩列表
export function examScoreList(options){
  var {page,success,error } = options
  fetch({
    url:'examScore/list',
    method:'GET',
    data:{
      page:page,
      pageSize:10
    },
    success,error
  })
}
// 成绩详情
export function examScoreInfo(options){
  var {id,success,error } = options
  fetch({
    url:'examScore/info',
    method:'GET',
    data:{
      id:id
    },
    success,error
  })
}

// 邮寄地址信息
export function examScoreAddress(options){
  var {organizationId,success,error } = options
  fetch({
    url:'address/info',
    method:'GET',
    data:{
      organizationId:organizationId
    },
    success,error
  })
}
// 更新证书邮寄地址
export function examScoreUpdate(options){
  var {id,name,mobile,address,status,success,error } = options
  fetch({
    url:'examScore/update',
    method:'POST',
    data:{
      id:id,
      name:name,
      status:status,
      mobile:mobile,
      address:address
    },
    success,error
  })
}
// 更新作品邮寄单号
export function addTrackingNumber(options){
  var {id,num,success,error } = options
  fetch({
    url:'examScore/addTrackingNumber',
    method:'POST',
    data:{
      id:id,
      trackingNumber:num
    },
    success,error
  })
}
// 证书信息获取
export function Credentials(options){
  var {id,success,error } = options
  fetch({
    url:'credentials/info',
    method:'GET',
    data:{
      examScoreId:id
    },
    success,error
  })
}
// 视频考级中点击完成
export function examComplete(options){
  var {id,success,error } = options
  fetch({
    url:'levelExam/complete',
    method:'GET',
    data:{
      id:id
    },
    success,error
  })
}
// 分享页面打开请求
export function getShareMsg(options){
  var {openId,organizationId,teacherId,success,error } = options
  fetch({
    url:'auth/organization',
    method:'GET',
    data:{
      openId:openId,
      organizationId:organizationId,
      teacherId:teacherId
    },
    success,error
  })
}