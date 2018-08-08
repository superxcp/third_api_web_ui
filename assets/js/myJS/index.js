// require(['jquery','bootstrapTableCN','moment'],function($,bootstrapTable,moment){
//     var $win = $(window),$toolbar = $("#toolbar"),
//         $top = $toolbar.offset().top, $height = 0
//     layer = parent.layer;
//初始化加载信息
window.onload = function () {

    artInfo = new Vue({
        el: "#artId",
        data: {
            artId: "",
        },
        methods: {
            artlist: function () {
                articles(this.artId);
            }
        }
    });

    //验证远程账户名和密码信息，现在没有填写用户名跟密码，等后台完善后将name和password插入到该方法即可
    function articles(artId) {

        var url = "http://10.206.48.69:8080/third/index/article";
        $.ajax({
            //选择POST的提交方式
            type: "POST",
            //false表示同步，true表示异步，默认异步
            async: false,
            //api入口路径
            url: url,
            //返回类型
            dataType: "json",
            //需要提交的参数
            data: {offset: "0", limit: "10",artId:"artInfo.artId"},
            //执行成功时的函数入口
            success: function (data) {
                alert("________________________yes|" + data + "|_____________________");
                var m_Json = JSON.parse(data);
                if (m_Json.code == 0) {
                    var title1 = m_Json.response['title'];
                    var abstra1 = m_Json.response['abstra'];
                    var content1 = m_Json.response['contentId'];
                    var tag1 = m_Json.response['tag'];
                    $("#title").html('<a href="" class="sin_tw_title_title">title1</a>');
                    $("#summary").html(abstra1);
                    $("#title").html('<a href="content1" class="sin_tw_title_title"></a>');
                    $("#sin1").html('<li id="tag" class="sin_tw_infoicon1"><i></i><a href="">tag1</a></li><em>/</em>');
                }

            },
            //执行失败时的函数入口
            error: function (data) {
                alert("———————————————————失败：" + data.message);
                // alert("网络存在异常，请重新提交");
            }
        });
    }


    // function cjdsign() {
    //     window.location.reload();
    // }
    //
    // initSearchmenu('scbar', '');
    //
    // document.getElementById("scbar").addEventListener("click", function (e) {
    //     if (this.className == "fold") {
    //         this.className = "";
    //         e.stopPropagation();
    //         return false
    //     }
    // });
    //
    // if (typeof succeedhandle_pagejs961 != 'function') {
    //     function succeedhandle_pagejs961(url, msg, values) {
    //         var id = values['0'];
    //         $('block_id_961').innerHTML = values[0]
    //     };
    //
    //     function errorhandle_pagejs961(msg) {
    //         showDialog(msg)
    //     };
    // }
    //
    // (function () {
    //
    //     var postAct = document.getElementById("sin_post_huadong");
    //     var postActTop = postAct.offsetTop;
    //     document.onscroll = function () {
    //         var docTop = document.body.scrollTop | document.documentElement.scrollTop;
    //         if (postActTop < (docTop + 100)) {
    //             postAct.setAttribute("style", "position:fixed; top: 0px; z-index:300;box-shadow:0 0 5px 2px rgba(0,0,0,0.3);width:310px;");
    //         } else {
    //             postAct.setAttribute("style", "");
    //         }
    //     }
    // })()
    //
    //
    // var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    // var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    // if (!important) {
    //     if (in_array(direction, [1, 4]) && ml < 0) {
    //         ml = bpl;
    //         if (in_array(basePoint, [1, 4])) ml += sw;
    //     } else if (ml + mw > scrollLeft + document.body.clientWidth && sx >= mw) {
    //         ml = bpl - mw;
    //         if (in_array(basePoint, [2, 3])) {
    //             ml -= sw;
    //         } else if (basePoint == 4) {
    //             ml += sw;
    //         }
    //     }
    //     if (in_array(direction, [1, 2]) && mt < 0) {
    //         mt = bpt;
    //         if (in_array(basePoint, [1, 2])) mt += sh;
    //     } else if (mt + mh > scrollTop + document.documentElement.clientHeight && sy >= mh) {
    //         mt = bpt - mh;
    //         if (in_array(basePoint, [3, 4])) mt -= sh;
    //     }
    // }
    // if (pos.substr(0, 3) == '210') {
    //     ml += 69 - sw / 2;
    //     mt -= 5;
    //     if (showObj.tagName == 'TEXTAREA') {
    //         ml -= sw / 2;
    //         mt += sh / 2;
    //     }
    // }
    // if (direction == 0 || menuObj.scrolly) {
    //     if (BROWSER.ie && BROWSER.ie < 7) {
    //         if (direction == 0) mt += scrollTop;
    //     } else {
    //         if (menuObj.scrolly) mt -= scrollTop;
    //         menuObj.style.position = 'fixed';
    //     }
    // }
    //
    //
    // function fetchOffset(obj, mode) {
    //     var left_offset = 0, top_offset = 0, mode = !mode ? 0 : mode;
    //
    //     if (obj.getBoundingClientRect && !mode) {
    //         var rect = obj.getBoundingClientRect();
    //         var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    //         var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    //         if (document.documentElement.dir == 'rtl') {
    //             scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;
    //         }
    //         left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;
    //         top_offset = rect.top + scrollTop - document.documentElement.clientTop;
    //     }
    //     if (left_offset <= 0 || top_offset <= 0) {
    //         left_offset = obj.offsetLeft;
    //         top_offset = obj.offsetTop;
    //         while ((obj = obj.offsetParent) != null) {
    //             position = getCurrentStyle(obj, 'position', 'position');
    //             if (position == 'relative') {
    //                 continue;
    //             }
    //             left_offset += obj.offsetLeft;
    //             top_offset += obj.offsetTop;
    //         }
    //     }
    //     return {'left': left_offset, 'top': top_offset};
    // }
    //
    //
    // function initSearchmenu(searchform, cloudSearchUrl) {
    //     var defaultUrl = 'search.php?searchsubmit=yes';
    //     if (typeof cloudSearchUrl == "undefined" || cloudSearchUrl == null || cloudSearchUrl == '') {
    //         cloudSearchUrl = defaultUrl;
    //     }
    // }
    //
    // function searchFocus(obj) {
    //     if (obj.value == '请输入搜索内容') {
    //         obj.value = '';
    //     }
    //     if ($('cloudsearchquery') != null) {
    //         $('cloudsearchquery').value = obj.value;
    //     }
    // }


    // $win.on('resize', function () {
    //     $height = $win.height() - $top;
    //     $table.bootstrapTable('resetView', {height: $height});
    // })

}
// });