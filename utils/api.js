import {fetch} from './util'
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
    data:{
      mobile:mobile,
      code:code,
      uuid:uuid
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
