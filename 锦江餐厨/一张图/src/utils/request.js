// import fetch from 'dva/fetch';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
/* 
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}
*/
/* 
export default function request(url, options) {
    let data = null;
    $.ajax({
        type:options.method,
        url:url,
        data:options.body,
        async:false,
        dataType:'json',
        success:function (d) {
            data = d;
        }
    });
    return {data: data};
}
*/
export default function request(url, options) {
    let ajaxPropmise = new Promise((resolve,reject)=>{
        $.ajax({
            type:options.method,
            url:url,
            data:options.body || null,
            dataType:'json',
            // jsonpCallback: "GetData",
            success:function (data) {
                // console.log(data)
                resolve(data);
            }
        });
    });
    return ajaxPropmise.then(data => ({data}));
}

function GetData(data){
    console.log(data)
}

