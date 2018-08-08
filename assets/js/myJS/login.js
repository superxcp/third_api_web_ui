//初始化加载信息
window.onload = function () {

    vloginInfo = new Vue({
        el: "#_j_login_form",
        data: {
            userId: "",
            userPassword: ""
        },
        methods: {
            onUserLogin: function () {
                validateRemotes(this.userId, this.userPassword);
            }
        }
    });

    //读取本地密码库，查看是否保存本次密码
}

//验证远程账户名和密码信息，现在没有填写用户名跟密码，等后台完善后将name和password插入到该方法即可
function validateRemotes(userId, userPassword) {

    var urlString = "http://localhost:8080/third/user/login";
    $.ajax({
        //选择POST的提交方式
        type: "POST",
        //false表示同步，true表示异步，默认异步
        async:false,
        //api入口路径
        url: urlString,
        //返回类型
        dataType: "json",
        //需要提交的参数
        data: {username: "xcp",userpass: "superxcp"},
        //执行成功时的函数入口
        success: function (data) {
            alert("yes|"+data+"|");
            var m_Json = JSON.parse(data);
            alert(m_Json.tel);
            if (m_Jso != null) {
                alert("yes2");
                //此处处理返回的数据
                // processObject.remoteUserInfo(m_Json.success);
            }
        },
        //执行失败时的函数入口
        error: function (data) {
            alert("nA"+data);
            // alert("网络存在异常，请重新提交");
        }
    });
}


//通过统一的处理对象入口，对数据进行处理，这样的目的是便于管理，所有的操作写到一个对象里面，直接对这个对象进行处理就行了
var processObject = {
    //处理用户登录信息
    remoteUserInfo: function (data) {
        //登陆认证成功，跳转到index页面
        if(data){
            //关闭当前页面，并打开新界面
            window.open("index.html");           
            window.opener=null;
            window.open('','_self');
            window.close();
        }       
    },    
    
}


//所有的验证方式都写到验证方法中，便于管理和使用
var validObject={

    //使用正则表达式进行匹配，该正则表达式表示，以0016开头，后面跟6位数字，如果不满足该需要，则result返回Null
    isValidUserId:function(userId) {
        var result = userId.match(/^(0016)\d{6}/);
        if (result != null) {
            return true;
        } else {
            return false;
        }
    },
}





//获取上次登录时保存的密码
function GetLastUser() {
    var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67"; //GUID标识符  
    var usr = GetCookie(id);
    if (usr != null) {
        vloginInfo.setUserId(usr);
    } else {
        vloginInfo.setUserId("");
    }
    GetPwdAndChk();
}

function SetPwdAndChk() {
    //取用户名  
    var usr = vloginInfo.userId;
    alert("用户名：" + usr);
    //将最后一个用户信息写入到Cookie  
    SetLastUser(usr);
    //如果记住密码选项被选中  
    if (vloginInfo.remember == true) {
        //取密码值  
        var pwd = vloginInfo.userPassword;
        alert("你选择了记住密码，我们将记住你的密码：" + pwd);
        var expdate = new Date();
        expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
        //将用户名和密码写入到Cookie  
        SetCookie(usr, pwd, expdate);
    } else {
        //如果没有选中记住密码,则立即过期  
        ResetCookie();
    }
}

function SetLastUser(usr) {
    var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
    var expdate = new Date();
    //当前时间加上两周的时间  
    expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
    SetCookie(id, usr, expdate);
}

function GetPwdAndChk() {
    var usr = vloginInfo.userId;
    var pwd = GetCookie(usr);
    if (pwd != null) {
        vloginInfo.setRemember(true);
        vloginInfo.setUserPassword(pwd);
    } else {
        vloginInfo.setRemember(false);
        vloginInfo.setUserPassword("");
    }
}

//取Cookie的值  
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        //alert(j);  
        if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

//写入到Cookie  
function SetCookie(name, value, expires) {
    var argv = SetCookie.arguments;
    //本例中length = 3  
    var argc = SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
}

function ResetCookie() {
    var usr = vloginInfo.userId;
    var expdate = new Date();
    SetCookie(usr, null, expdate);
}