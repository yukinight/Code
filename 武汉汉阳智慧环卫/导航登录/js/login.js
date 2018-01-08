function login(tmg,verifyCode) {
    var name = $('#name').val();
    var pwd = $('#pwd').val();
    var vcode = $('#vcode').val();
    var cm = new cookieManager();
    // 清除登录报错提示
    clearErrorMsg();

    if(!/\S+/.test(name)){
        addErrorMsg('请输入用户名');
        return;
    }
    if(!/\S+/.test(pwd)){
        addErrorMsg('请输入密码');
        return;
    }
    if(!($.browser.msie && $.browser.version<'9.0')){
        if(!/\S+/.test(vcode)){
            addErrorMsg('请输入验证码');
            return;
        }
        if(!verifyCode.validate(vcode)){
            addErrorMsg('验证码错误');
            return;
        }
    }
    
    
    // 记住用户设置到cookie
    if($('#remember_user').prop('checked')){
        cm.setCookie('username',name,0);
        cm.setCookie('remember_user',1,0);
    }
    else{
        cm.delCookie('remember_user');
    }
    // 自动登录设置到cookie
    if($('#auto_login').prop('checked')){
        cm.setCookie('username',name,0);
        cm.setCookie('password',hex_md5(pwd),0);
        cm.setCookie('auto_login',1,0);
    }
    else{
        cm.delCookie('auto_login');
        cm.delCookie('password');
    }

    tmg.createToken({
        name:name,
        pwd:pwd,
        loginFail:loginFail,
        loginSuccess:loginSuccess
    });
}

function addErrorMsg(info) {
    $('#errorMsg').html($('#errorMsg').html()+info+'<br/>');
}

function clearErrorMsg() {
    $('#errorMsg').html('');
}
// 登录失败的操作
function loginFail(error_type) {
    clearErrorMsg();
    switch (error_type) {
        case 1:
            addErrorMsg('用户名或密码错误')
            break;
        default:
            addErrorMsg('登录失败')
            break;
    }
}
// 登录成功的操作
function loginSuccess() {
    var jump_url = getUrlParam('jumpurl') || LOGIN_CFG.jump_url;
    window.location.href = jump_url;
}

// 登录页初始化方法
function init(tmg) {
    var cm = new cookieManager();
    // cookie中已存在token且验证成功，直接跳转页面
    if(cm.getCookie('access_token') && cm.getCookie('refresh_token')){
        if(tmg.getUserInfo()){
            loginSuccess();
        }
    }
    // 若勾选记住用户名，填写相关表单
    if(cm.getCookie('remember_user')==1){
        $('#remember_user').prop('checked',true);
        $('#name').val(cm.getCookie('username'));
    };
    // 若勾选自动登录，填写相关表单，直接登录
    if(cm.getCookie('auto_login')==1){
        $('#auto_login').prop('checked',true);
        var name = cm.getCookie('username');
        var pwd = cm.getCookie('password');
        $('#name').val(name);
        if(name && pwd){
            tmg.createToken({
                name:name,
                pwd:pwd,
                md5:true,
                loginFail:loginFail,
                loginSuccess:loginSuccess
            });
        }
    }
}


jQuery(document).ready(function($) {
    var tmg = new tokenManager({
        token_url:LOGIN_CFG.token_url,
    });
    var verifyCode = new GVerify("vc_container");
    console.log(verifyCode)
    init(tmg);
	$('#loginButton').click(function(){
        login(tmg, verifyCode);
    });

});
