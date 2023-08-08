import { WebSocketObj } from './websocket';
export const htmlLode = {
  userFun: {
    //在活跃用户集合查找用户信息
    toUserAtSet: function (idx) {
      var lengths = WebSocketObj.userAtData.length;
      for (var i = 0; i < lengths; i++) {
        if (WebSocketObj.userAtData[i].idx != null && WebSocketObj.userAtData[i].idx == idx) {
          return WebSocketObj.userAtData[i];
        }
      }
      var lengths = WebSocketObj.userData.length;
      for (var i = 0; i < lengths; i++) {
        if (WebSocketObj.userData[i].idx != null && WebSocketObj.userData[i].idx == idx) {
          return WebSocketObj.userData[i];
        }
      }
      return null;
    },
    getUserInfo: function (idx) {
      htmlLode.ajaxs('POST', 'Ajax/live_userData.aspx', 'json', { useridx: idx }, function (data) {});
    },
    deleteUser: function (idx) {
      for (var i = 0; i < WebSocketObj.userAtData.length; i++) {
        if (WebSocketObj.userAtData[i].idx == idx) {
          WebSocketObj.userAtData.splice(i, 1);
        }
      }
      for (var i = 0; i < WebSocketObj.userData.length; i++) {
        if (WebSocketObj.userData[i].idx == idx) {
          WebSocketObj.userData.splice(i, 1);
        }
      }
    },
    userIsFollowing: function () {
      if (roomNew.useridx == '' || roomNew.useridx == 0 || roomNew.useridx == '0' || roomNew.useridx > 1000000000) {
        //游客
        $('.btn_follow').eq(0).attr('href', 'javascript:htmlLode.userFun.userFollowing(1)');
      } else {
        htmlLode.ajaxs('POST', 'Ajax/live_iffollow.aspx', 'text', { useridx: roomNew.useridx, fuseridx: roomNew.roomidx }, function (data) {
          if (data == 'false') {
            $('.btn_follow').attr('href', 'javascript:htmlLode.userFun.userFollowing(2)');
            $('.btn_follow_3').attr('href', 'javascript:htmlLode.userFun.userFollowing(2)');
            $('.follow_live_btn').attr('href', 'javascript:htmlLode.userFun.userFollowing(2)');
          } else {
            $('.chat_follow').hide();
            $('.btn_follow').hide();
            $('.black').hide();
          }
        });
      }
    },
    LayuiAlert: function (msg) {
      layui.use(['layer'], function () {
        var layer = layui.layer;
        layer.msg(msg);
      });
    },
    userFollowing: function (type) {
      if (
        roomNew.useridx == '' ||
        roomNew.useridx == 0 ||
        roomNew.useridx == '0' ||
        (roomNew.useridx >= 10000000 && roomNew.useridx <= 20000000)
      ) {
        //游客
        $('#windowss').show();
        return;
      }
      if (type == 1) {
        $('.btn_follow').eq(0).hide();
        $('.black').hide();
      }
      if (type == 2) {
        if ($('#play').css('display') != 'block') {
          $.ajax({
            type: 'post',
            url: '../Ajax/live/live_Following.ashx?ran=' + Math.random(),
            data: {
              useridx: roomNew.useridx,
              fuseridx: roomNew.roomidx,
              type: 1,
            },
            dataType: 'json',
            success: function (data) {
              if (data != null && data != '') {
                if (data.data == 100) {
                  WebSocketObj.AttentionUser(roomNew.roomidx, roomNew.useridx, 1);
                  $('.btn_follow').hide();
                  $('.black').hide();
                  //关注成功后终止弹框跳出
                  clearTimeout(IsFollowTime);
                }
              }
            },
          });
        }
      }
    },
    userJoin: function (idx, nickName) {
      var userinfo = htmlLode.userFun.toUserAtSet(idx);
      if (userinfo != null && userinfo != '') {
        var strHtml =
          '<div class="item"><span class="spelevel"><div class="the_level">  <span class="level level' +
          userinfo.level +
          '"></span><span class="num_bg bg' +
          htmlLode.swlevelicold(userinfo.expLevel) +
          '"></span><span class="ka_num">' +
          userinfo.expLevel +
          '</span></div></span><span class="name">' +
          userinfo.nickName +
          ' </span><span class="text" >is coming welcome~</span></div>';
        var itemList = htmlLode.charFun.chatDome.find('.item');
        if (itemList != null && itemList.length > 0) {
          var endItem = itemList.eq(itemList.length - 1);
          if (endItem.find('.text').html() == 'is coming welcome~') {
            endItem.find('.level').attr('class', 'level level' + userinfo.level);
            endItem.find('.num_bg').attr('class', 'num_bg bg' + htmlLode.swlevelicold(userinfo.expLevel));
            endItem.find('.name').html(userinfo.nickName);
            //if (nickName != "") {
            //    endItem.find(".text").html(userinfo.nickName + "通过<span style=\"color:#ffda77\" >「" + nickName + "」</span>的分享前来捧场~");
            //}
          } else {
            htmlLode.charFun.chatDomeAppent(strHtml);
          }
        } else {
          htmlLode.charFun.chatDomeAppent(strHtml);
        }
      }
    },
    tofenxUserinfo: function () {
      htmlLode.ajaxs('POST', 'Ajax/live_userData.aspx', 'json', { useridx: roomNew.fenidx }, function (data) {
        if (data != null && data != '') {
          WebSocketObj.ShowEnterBroadcastRoom(-1, roomNew.roomidx, roomNew.useridx, 0, roomNew.fenidx, data[0].mynme);
        }
      });
    },
    token: function (tokenStr) {
      return tokenStr.substring(4, tokenStr.length - 4);
    },
  },
};
