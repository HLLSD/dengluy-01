/**
 * Created by 王福雄 on 2018/4/6.
 */
// 防止全局变量污染, 等待dom渲染再执行

$(function(){
  // 1. 进行表单校验
  //    校验要求: (1) 用户名不能为空
  //             (2) 密码不能为空, 且必须是 6-12 位

  $("#form").bootstrapValidator({
    // 配置图标
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },



    // 对字段进行校验
    fields:{

      username:{
        // 校验的规则
        validators:{
          // 非空校验
          notEmpty:{
            // 为空时显示的提示信息
            message:"用户名不可为空"
          },
          // 长度要求 2-6 位
          stringLength:{
            min:2,
            max:6,
            message:"用户名只支持2-6位"
          },
          callback:{
            message:"用户名错误"
          }
        }
      },

      password :{
        validators:{
          notEmpty:{
            message:"密码不可为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码只支持6-12位"
          },
          callback:{
            message:"密码错误"
          }

        }
      }
    }
  })
});


// 2. 进行登录请求
//    通过 ajax 进行登录请求

// 表单校验插件有一个特点, 在表单提交的时候进行校验
// 如果校验成功, 继续提交, 需要阻止这次默认的提交, 通过 ajax 进行请求提交
// 如果校验失败, 阻止默认的提交

//表单序列化直接将字符串转成json
$("#form").on("success.form.bv",function( e ){
  e.preventDefault();

  $.ajax({
    url:"/employee/employeeLogin",
    type:"post",
    dataType:"json",
    data:$('#form').serialize(),
    success:function(info){
      console.log(info);

      if(info.success){
        alert("登陆成功");
        location.href = "index.html"
      }

      if(info.error === 1000){
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
      }
      if(info.error === 1001){
        $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
      }
    }
  })
});