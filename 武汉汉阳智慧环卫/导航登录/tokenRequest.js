var LOGIN_CFG = {
    token_url:'http://192.168.1.242:8082',
    login_url:'http://localhost:8002/'
}

var tmg = new tokenManager(LOGIN_CFG);

export default function request(url, options) {
    tmg.tokenDetector();
    var access_token = tmg.cm.getCookie('access_token') || '';
    var token_type = tmg.cm.getCookie('token_type')|| '';
    let ajaxPropmise = new Promise((resolve,reject)=>{
        $.ajax({
            type:options.method,
            url:url,
            data:options.body || null,
            dataType:'json',
            headers: {
                'Authorization': token_type +' '+ access_token
            },
            success:function (data) {
                resolve(data);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(XMLHttpRequest.status==401){
                    tmg.deleteToken();
                    tmg.jumpLoginPage(true);
                }
                reject(textStatus);
            }
        });
    });
    return ajaxPropmise.then(data => ({data}))
    .catch(err=>{
        // console.error("请求数据失败")
        return {data:null};
    });
}

function getUserInfo() {
    return request(LOGIN_CFG+"/ums/user/getUserInfo",{method:'post'});
}