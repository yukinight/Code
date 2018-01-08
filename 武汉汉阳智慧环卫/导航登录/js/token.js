// 获取URL查询参数的函数
function getUrlParam(key) {
    var paramObj = {};
    var matchList = window.location.search.match(/([^\?&]+)=([^&]+)/g) || [];
    for(var i=0,len = matchList.length;i<len;i++){
        var r = matchList[i].match(/([^\?&]+)=([^&]+)/);
        paramObj[r[1]] = r[2];
    }
    if(key){
        return paramObj[key]?decodeURIComponent(paramObj[key]):null;
    }
    else{
        return paramObj;
    }
}

// 操作cookie的类
function cookieManager(domain,path){
    this.domain = domain || null;
    this.path = path || null;
}
cookieManager.prototype = {
    //设置cookies,secs设为0表示永久(10年)
    setCookie : function(name,value,secs){ 
        var exp = new Date(); 
        if(secs==0){
            exp.setFullYear(exp.getFullYear()+10);
        }
        else{
            exp.setTime(exp.getTime() + secs*1000); 
        }
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + 
        (this.domain?(';domain='+this.domain):'') +(this.path?(';path='+this.path):''); 
    },
    //读取cookies 
    getCookie : function(name){ 
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]); 
        else 
            return null; 
    },
    //删除cookies 
    delCookie : function(name){ 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval=this.getCookie(name); 
        if(cval!=null) 
            document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
    } 
}

//操作token的类 
function tokenManager(config){
    config = config || {};
    // 请求token的地址（必需）
    this.Token_URL = config.token_url;
    // 跳转的登录页地址（非登录页面需要）
    this.Login_URL = config.login_url;
    // token生命小于此时间执行刷新token操作，默认10分钟
    this.Token_Refresh_Time = config.rrt || 10*60*1000;
    this.cm = new cookieManager(config.domain);
}
tokenManager.prototype = {
    // 根据token获取用户信息，参数为true时若token过期则跳转登录页
    getUserInfo: function(jmp){
        var t = this;
        var access_token = t.cm.getCookie('access_token') || '';
        var token_type = t.cm.getCookie('token_type')|| '';
        var user_info = null;
        if(access_token && token_type){
            $.ajax({
                type:"POST",
                async:false,
                url: t.Token_URL+"/ums/user/getUserInfo",
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': token_type+' '+ access_token
                },
                success:function(data, textStatus, jqXHR){
                    // console.log(data,textStatus,jqXHR);
                    if(data && data.rc==0){
                        user_info = data.ret;
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    if(XMLHttpRequest.status==401){
                        t.deleteToken();
                        if(jmp){
                            t.jumpLoginPage(true);
                        }
                    }
                }
            });
        }
        return user_info;
    },
    logout:function(){
        var t = this;
        t.cm.delCookie('auto_login');
        t.cm.delCookie('password');
        t.deleteToken();
        t.jumpLoginPage();
    },
    // 设置token
    setToken: function(data){
        this.cm.setCookie('access_token',data['access_token'],data['expires_in']);
        this.cm.setCookie('token_type',data['token_type'],data['expires_in']);
        this.cm.setCookie('refresh_token',data['refresh_token'],data['expires_in']);
        this.cm.setCookie('token_expire_time',new Date().getTime()+parseInt(data['expires_in'])*1000,data['expires_in']);
    },
    // 删除token
    deleteToken: function(){
        this.cm.delCookie('access_token');
        this.cm.delCookie('refresh_token');
        this.cm.delCookie('token_type');
        this.cm.delCookie('token_expire_time');
    },
    // 根据用户名，密码创建token
    createToken: function(param){
        var t = this;
        var name = param.name,//用户名（必须）
        pwd = param.pwd,//密码（必须）
        md5 = param.md5,//此密码是否是加密的
        loginSuccess = param.loginSuccess,//登录成功的操作
        loginFail = param.loginFail;//登录失败的操作

        $.ajax({
            type:"POST",
            url: t.Token_URL + "/cas/login",
            data:JSON.stringify({
                username: name,
                password: md5?pwd:hex_md5(pwd)
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            // headers: {
            // 	'Content-Type': 'application/json;charset=UTF-8'
            // }, 
            success:function(data, textStatus, jqXHR){
                // console.log(data,textStatus,jqXHR);
                if(data){
                    if(data.rc==0){
                        var token_obj = JSON.parse(jqXHR.getResponseHeader("ACCESS-TOKEN"));
                        t.setToken(token_obj);
                        if(loginSuccess)loginSuccess();
                    }
                    else if(data.rc==1){
                        if(loginFail)loginFail(1);
                        // alert('用户名或密码错误！');
                    }
                    else{
                        if(loginFail)loginFail(2);
                        // alert('未知错误！');
                    }
                    
                }
                else{
                    if(loginFail)loginFail(3);
                    // alert('未知错误！');
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(loginFail)loginFail(4);
            }
        });
    },
    // 执行token刷新操作，参数为true时若token过期则跳转登录页
    refreshToken: function(jmp){
        var t = this;
        var access_token = t.cm.getCookie('access_token');
        var token_type = t.cm.getCookie('token_type');
        var refresh_token = t.cm.getCookie('refresh_token');
        var flag = false;
        $.ajax({
            type:"POST",
            url: t.Token_URL+"/cas/refreshToken?refresh_token="+refresh_token,
            dataType: 'json',
            async:false,
            headers: {
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': token_type+' '+ access_token
            },
            success:function(data, textStatus, jqXHR){
                // console.log(data,textStatus,jqXHR);
                if(data && data.rc==0){
                    var token_obj = JSON.parse(jqXHR.getResponseHeader("ACCESS-TOKEN"));
                    t.setToken(token_obj);
                    flag = true;
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(XMLHttpRequest.status==401){
                    t.deleteToken();
                    if(jmp){
                        t.jumpLoginPage(true);
                    }
                }
            }
        });
        return flag;
    },
    // 监测token状态，生命周期将结束时执行刷新token操作，token已过期直接跳转登录页
    tokenDetector: function(){
        var t = this;
        var access_token = t.cm.getCookie('access_token');
        var token_type = t.cm.getCookie('token_type');
        var refresh_token = t.cm.getCookie('refresh_token');
        var token_expire_time = parseInt(t.cm.getCookie('token_expire_time'));
        if(refresh_token && access_token && token_type && token_expire_time){
            if(token_expire_time - new Date().getTime() < t.Token_Refresh_Time){
                t.refreshToken(true);
            }
            // else{
            //     console.log('token剩余时间：'+ (token_expire_time - new Date().getTime())/60000 +'分钟')
            // }
        }
        else{
            t.jumpLoginPage(true);
        }
    },
    // 若配置登录页，则跳转登录页，否则弹出重新登录窗口
    jumpLoginPage: function (jumpBack) {
        var t = this;
        if(t.Login_URL){
            if(jumpBack){
                if(t.Login_URL.indexOf('?')!=-1){
                    window.location.href = t.Login_URL + '&jumpurl=' + encodeURIComponent(window.location.href);
                }
                else{
                    window.location.href = t.Login_URL + '?jumpurl=' + encodeURIComponent(window.location.href);
                }
            }
            else{
                window.location.href = t.Login_URL;
            }
        }
        else{
            alert('您已登出，请重新登录');
        }
    }
}