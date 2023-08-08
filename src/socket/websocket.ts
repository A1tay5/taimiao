import { htmlLode } from './VideoHtmlLode';
import { SomeType } from '../utils/const';
import { computed } from 'vue';
import { useUserStore } from '@/store/modules/user';
const roomNew: any = useUserStore();
const index = computed(() => roomNew.targetIndex);
const authorList = computed(() => roomNew.authorList);
// webSocket连接配置
export const WebSocketObj: SomeType = {}; //页面操作方法对象
WebSocketObj.websocket = Object; //服务对象
WebSocketObj.webtoken = '';
WebSocketObj.XinTiaoFun = Object; //心跳线程对象
WebSocketObj.XinTiao = Object; //心跳线程对象
WebSocketObj.HeadNum = 0;
WebSocketObj.zanliNum = 0;
WebSocketObj.webckTyoe = 0;
WebSocketObj.userData = [];
WebSocketObj.userAtData = [];
WebSocketObj.roomData = [];
WebSocketObj.lockType = 0; //房间状态
//==================================================websocket连接块========================================
WebSocketObj.connect = function (host) {
  console.log('host: ', host);
  WebSocketObj.userData = [];
  WebSocketObj.userAtData = [];
  WebSocketObj.roomData = [];
  try {
    console.log(1);

    var readyState = new Array('准备连接服务器...', '连接服务器成功!开始登录用户...', '正在关闭连接', '已关闭连接');

    WebSocketObj.websocket = new WebSocket(host);
    //连接
    WebSocketObj.websocket.onopen = function () {
      //htmlLode.titleShow("start");
      //开始登陆房间
      htmlLode.userCookie();
    };
    //接收
    WebSocketObj.websocket.onmessage = function (msg) {
      WebSocketObj.work(msg.data);
    };
    //断开
    WebSocketObj.websocket.onclose = function () {
      //alert("websocket.readyState:" + websocket.readyState);
      //失败重连
      if (WebSocketObj.websocket.readyState == 2 || WebSocketObj.websocket.readyState == 3) {
        if (WebSocketObj.HeadNum < 3) {
          if (WebSocketObj.webckTyoe == 0) {
            htmlLode.toUserIpType();
          }
        } else {
        }
        clearInterval(WebSocketObj.XinTiao);
        WebSocketObj.HeadNum++;
      }
    };
  } catch (exception) {
    console.log('exception: ', exception);

    //公了显示异常消息
    htmlLode.toUserIpType();
    //MiaoboView.chatlist("服务异常！" + exception, 0);
    //clearInterval(WebSocketObj.XinTiao);//清理心跳线程
  }
};
//===================================================发送消息块===========================================================
//登陆消息
WebSocketObj.LoginSendSet = null;
WebSocketObj.LoginSend = function (u_name, u_pwd, type) {
  //alert("H5登录" + "u_name:" + u_name + "u_pwd:" + u_pwd + "type:" + type);
  //htmlLode.titleShow("H5登录" + "u_name:" + u_name + "u_pwd:" + u_pwd + "type:" + type);
  var bufferRes = new ArrayBuffer(204 + 12);
  var Head = new Int32Array(bufferRes, 0, 3);
  Head[0] = 12 + 204; //len
  Head[1] = 10001; //cmd

  var typeArray = new Uint8Array(bufferRes, 12 + 74, 1);
  typeArray[0] = 99; //h5登录

  htmlLode.fillstr2ab(u_name, bufferRes, 112); //userName
  htmlLode.fillstr2ab(u_pwd, bufferRes, 176); //pwd

  var loginWay = new Int32Array(bufferRes, 212, 1);
  loginWay[0] = type; //H5登录
  console.log('发送登陆消息', { u_name: u_name, u_pwd: u_pwd, type: type });
  WebSocketObj.websocket.send(bufferRes);
  WebSocketObj.LoginSendSet = setTimeout(function () {
    //alert("close");
    //1.5秒未响应，主动断开socket 并重新解析域名重连
    WebSocketObj.webckTyoe = 1;
    WebSocketObj.websocket.onclose();

    htmlLode.toUserIpType();
    console.log('主动断开socket 并重新解析域名重连');
  }, 3000);
};
//标识不同类型进入房间 - 0 小程序 - 1 H5
WebSocketObj.LiteAppEnterRoom = function (targetidx, iconurl, type) {
  var nLen = 12 + 12 + 256;
  var bufferRes = new ArrayBuffer(nLen);
  var Head = new Int32Array(bufferRes, 0, 3);
  Head[0] = nLen;
  Head[1] = 20502;

  var userLiteAppEnterArray: any = new Uint32Array(bufferRes, 12, 3);
  userLiteAppEnterArray[0] = roomNew.info.useridx;
  userLiteAppEnterArray[1] = targetidx;
  userLiteAppEnterArray[2] = type;

  htmlLode.fillstr2ab(iconurl, bufferRes, 12 + 12);

  WebSocketObj.websocket.send(bufferRes);
};
//游客进房间
WebSocketObj.GuestEnterRoom = function () {
  //组消息
  var bufferRes = new ArrayBuffer(8 + 12);
  var Head = new Uint32Array(bufferRes, 0, 3);
  Head[0] = 12 + 8; //len
  Head[1] = 20070; //cmd
  var info = new Uint32Array(bufferRes, 12, 2);
  info[0] = authorList[index.value].roomid;
  info[1] = authorList[index.value].serverid;
  WebSocketObj.websocket.send(bufferRes);
};

//进入房间消息
WebSocketObj.EnterRoom = function () {
  var u_token = WebSocketObj.webtoken; //token 在用户登录成功后会下发，需要保存
  //组消息
  var bufferRes = new ArrayBuffer(52 + 12);

  var Head = new Int32Array(bufferRes, 0, 3);
  Head[0] = 12 + 52; //len
  Head[1] = 20002; //cmd
  //alert(u_idx +"|"+ u_roomid +"|"+ u_serverid);
  var idx: any = new Uint32Array(bufferRes, 0 + 12, 1);
  idx[0] = roomNew.info.useridx;
  var roomid = new Uint32Array(bufferRes, 4 + 12, 1);
  roomid[0] = authorList[index.value].roomid;
  var serverid = new Uint32Array(bufferRes, 8 + 12, 1);
  serverid[0] = authorList[index.value].serverid; //7
  htmlLode.fillstr2ab(u_token, bufferRes, 16 + 12); //userName
  var type = new Uint32Array(bufferRes, 48 + 12, 1);
  WebSocketObj.websocket.send(bufferRes);
};
//进入房间捧场
WebSocketObj.ShowEnterBroadcastRoom = function (nPrePresideIDx, nNextPresideIDx, nUserIDx, pwd, nSharedUserIDx, nickname) {
  var nLen = 12 + 16 + 2 * 4 + 64;
  if (nSharedUserIDx == -1) nLen = 12 + 16 + 4;

  var bufferRes = new ArrayBuffer(nLen);

  var Head = new Int32Array(bufferRes, 0, 3);
  Head[0] = nLen; //len
  Head[1] = 20038; //cmd
  var userEnterArray = new Uint32Array(bufferRes, 12, 4);
  userEnterArray[0] = authorList[index.value].roomidx;
  userEnterArray[1] = nPrePresideIDx;
  userEnterArray[2] = nNextPresideIDx;
  userEnterArray[3] = nUserIDx;

  var info = new Uint32Array(bufferRes, 12 + 16, 1);
  info[0] = pwd;

  if (nSharedUserIDx != -1) {
    var sharedInfo = new Uint32Array(bufferRes, 12 + 16 + 4, 1);
    sharedInfo[0] = nSharedUserIDx;
  }

  if (nSharedUserIDx != -1) htmlLode.fillstr2ab(nickname, bufferRes, 12 + 16 + 8); //msg

  WebSocketObj.websocket.send(bufferRes);
};
WebSocketObj.ShowEnterRoom = function (nPrePresideIDx) {
  var nLen = 12 + 20;

  var bufferRes = new ArrayBuffer(nLen);

  var Head = new Int32Array(bufferRes, 0, 3);
  Head[0] = nLen; //len
  Head[1] = 20038; //cmd
  var userEnterArray: any = new Uint32Array(bufferRes, 12, 5);
  userEnterArray[0] = authorList[index.value].roomid;
  userEnterArray[1] = nPrePresideIDx;
  userEnterArray[2] = authorList[index.value].roomidx;
  userEnterArray[3] = roomNew.info.useridx;
  userEnterArray[4] = 10;
  WebSocketObj.websocket.send(bufferRes);
};
//心跳包
WebSocketObj.Heart = function () {
  //组消息
  //console.log("心跳包");
  var bufferRes = new ArrayBuffer(12);
  var Head = new Int32Array(bufferRes, 0, 3);
  Head[0] = 12; //len
  Head[1] = 20008; //cmd
  websocket.send(bufferRes);
};
WebSocketObj.work = function (data: any) {
  var fileReader = new FileReader();
  fileReader.onload = function (progressEvent) {
    var arrayBuffer: any = this.result; // arrayBuffer即为blob对应的arrayBuffer
    var bufferlen = arrayBuffer.byteLength;
    var parcelen = 0;
    var lastlen = bufferlen - parcelen;
    while (lastlen >= 12) {
      var HeadRecv = new Uint32Array(arrayBuffer, 0, 3);
      WebSocketObj.Beffer(arrayBuffer, HeadRecv);
      parcelen += HeadRecv[0];
      lastlen = bufferlen - parcelen;
      if (lastlen > 0) {
        arrayBuffer = arrayBuffer.slice(HeadRecv[0], lastlen + HeadRecv[0]);
        //console.log("HeadRecv:" + HeadRecv)
      }
    }
  };
  fileReader.readAsArrayBuffer(data);
};
WebSocketObj.Beffer = function (arrayBuffer: any, HeadRecv: any) {
  if (HeadRecv[1] == 10007) {
    //登录成功并收到下发的用户信息
    var u_idxArray = new Uint32Array(arrayBuffer, 12, 1);
    roomNew.useridx = u_idxArray[0];
    //登陆成功清除超时机制
    if (WebSocketObj.LoginSendSet != null) {
      clearTimeout(WebSocketObj.LoginSendSet);
      WebSocketObj.LoginSendSet = null;
    }
    WebSocketObj.SendAppType(roomNew.useridx);
  } else if (HeadRecv[1] == 10010) {
    //绑定手机
    var errNumArray = new Uint32Array(arrayBuffer, 12, 1);
    var errNum = errNumArray[0];
    if (errNum != 1) {
      htmlLode.DoBindPhoneStatus = true;
    }
  } else if (HeadRecv[1] == 10008) {
    //登录失败
    var errNumArray = new Uint32Array(arrayBuffer, 12, 1);
    var errNum = errNumArray[0];
    if (errNum == 3) {
      //顶号
      alert('The account logs in somewhere else');
      htmlLode.login();
    }
    if (HeadRecv[0] - 12 - 4 <= 0) return;
    if (errNum == 4) {
      //修改密码后登出
      document.cookie = 'MCat_info_mlive=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      htmlLode.login();
    }
    //MiaoboView.chatlist(str, 0);
    WebSocketObj.webckTyoe = 1;
  } else if (HeadRecv[1] == 1006) {
    //收到下发的webtoken
    var webtokenArray = new Uint8Array(arrayBuffer, 12, 32);
    WebSocketObj.webtoken = htmlLode.arryTostr(new TextDecoder().decode(webtokenArray));
  } else if (HeadRecv[1] == 10022) {
    //视频信息(码率)
    var videoArray = new Uint32Array(arrayBuffer, 12, 5);
  } else if (HeadRecv[1] == 10017) {
    //视频流地址
    var serveridArray = new Uint32Array(arrayBuffer, 12, 1);
    var serverid = serveridArray[0];
    var flvAddressArray = new Uint8Array(arrayBuffer, 12 + 4, 256);
    var flvAddress = htmlLode.arryTostr(new TextDecoder().decode(flvAddressArray));
  } else if (HeadRecv[1] == 10002) {
    //token
    var tokenArray = new Uint8Array(arrayBuffer, 12, 32);
    token = htmlLode.arryTostr(new TextDecoder().decode(tokenArray));
    UserLoginT = token;
  } else if (HeadRecv[1] == 10012) {
    //主播时长
    var timeOnLine = new Uint32Array(arrayBuffer, 12, 2);
    WebSocketObj.EnterRoom();
  } else if (HeadRecv[1] == 20003) {
    //进入房间返回
    var retArray = new Uint32Array(arrayBuffer, 12, 1);
    var ret = retArray[0];
    WebSocketObj.HeadNum = 0;
    //  alert(ret);
    if (ret == 1) {
      //进入房间成功
      //  console.log("进入房间成功");
      // WebSocketObj.LiteAppEnterRoom(roomNew.roomidx, "[H5]", 1);
      // htmlLode.userFun.userIsFollowing();
      WebSocketObj.ShowEnterRoom(-1);
      //WebSocketObj.ShowEnterBroadcastRoom(-1, roomNew.roomidx, roomNew.useridx, 0, roomNew.fenidx, "");
      if (roomNew.isVisitors == '1' && roomNew.isVisitorsTisp == '1') {
        setTimeout(function () {
          htmlLode.gift.giftOnclic();
          $('#tips_lead')
            .show()
            .unbind()
            .bind('click', function () {
              $('#tips_lead').hide();
            });
          htmlLode.gift.gitfitemclick(htmlLode.gift.giftListDome.find('.swiper-slide').eq(1).find('.item').eq(0));
        }, 1000);
      }

      //进入房间后整理分享所需参数
      //  $(".pay").find("a").attr("href", "javascript:htmlLode.toMoney()");
      //进入房间后开启心跳线程
      WebSocketObj.Heart();
      clearInterval(WebSocketObj.XinTiao);
      WebSocketObj.XinTiaoFun();
    } else if (ret == 4) {
      htmlLode.userFun.LayuiAlert('you are asked to leaving room by admin');
      setTimeout("window.location.href = 'http://mliveh5.com/home/index.aspx'", '2000');
    } else {
      //MiaoboView.chatlist("登陆房间失败！", 0);
      webckTyoe = 1;
    }
  } else if (HeadRecv[1] == 20004) {
    //用户列表
    //用户列表用户信息

    var starLen = 12;
    //HeadRecv 0 包体长度 1 协议号 2 是否压缩（是压缩时为原始数据长度）
    var numArray = new Uint32Array(arrayBuffer, 12, 1); //424
    var num = numArray[0];
    var len = HeadRecv[0] - 16; //
    var itmeLen = len / num; //单个用户长度

    if (HeadRecv[2] > 0) {
      //压缩过的数据
      var zipSize = HeadRecv[0] - 12;
      //源数据
      var infoArr = arrayBuffer.slice(12, arrayBuffer.byteLength);
      //解压缩
      var destData = pako.inflate(infoArr);
      //转换成arraybuffer类型
      arrayBuffer = destData.buffer;
      starLen = 0;
      var numArry = new Uint32Array(arrayBuffer, 0, 1);
      num = numArry[0];
      itmeLen = (arrayBuffer.byteLength - 4) / num;
    }
    //var userlists = [];
    for (var i = 0; i < num; i++) {
      var idxArray = new Uint32Array(arrayBuffer, itmeLen * i + starLen + 4, 1);
      var nickNameArray = new Uint8Array(arrayBuffer, itmeLen * i + starLen + 4 + 4, 64);
      var nickName = htmlLode.arryTostr(new TextDecoder('utf-8').decode(nickNameArray));
      var levelArray = new Uint32Array(arrayBuffer, itmeLen * i + 4 + starLen + 4 + 64, 1);
      var signArray = new Uint8Array(arrayBuffer, itmeLen * i + 4 + starLen + 4 + 64 + 4, 128);
      var sign = htmlLode.arryTostr(new TextDecoder().decode(signArray));
      var fansAndFollowArray = new Uint32Array(arrayBuffer, itmeLen * i + 4 + starLen + 4 + 64 + 4 + 128, 2);
      var fans = fansAndFollowArray[0];
      var follow = fansAndFollowArray[1];
      var photoArray = new Uint8Array(arrayBuffer, itmeLen * i + 4 + starLen + 4 + 64 + 4 + 128 + 8, 200);
      var photo = htmlLode.arryTostr(new TextDecoder().decode(photoArray));
      var resArray = new Uint32Array(arrayBuffer, itmeLen * i + 4 + starLen + 4 + 64 + 4 + 128 + 8 + 200, 4);
      var sex = resArray[0];
      var phoneType = resArray[1];
      var gLevel = resArray[2];
      var expLevel = resArray[3];
      // photo = taiwanPhoto(photo);
      var strUserlist = {
        idx: idxArray[0],
        nickName: nickName,
        level: levelArray[0],
        sign: sign,
        follow: follow,
        photo: photo,
        sex: sex,
        phoneType: phoneType,
        gLevel: gLevel,
        expLevel: expLevel,
      };
      //var strUserlist = { m_nUserIDx: idxArray[0], m_szNickName: nickName, m_nLevel: levelArray[0], m_nLead: gLevel, m_nFansNum: follow, m_szPhoto: photo, m_szSignature: sign, m_nSex: sex, m_nGradeLevel: expLevel };
      //判断用户类型并向集合添加数据

      //if (idxArray == 62708778) {
      //    alert(idxArray)
      //}
      if (levelArray[0] == 0) {
        //htmlLode.titleShow("--20004:" + idxArray[0]);
        //userAiData.push(strUserlist);
      } else {
        WebSocketObj.userAtData.push(strUserlist);
      }
      WebSocketObj.userData.push(strUserlist);
    }
  } else if (HeadRecv[1] == 20005) {
    //用户进入房间
    if (HeadRecv[2] > 0) {
      //压缩过的数据
      var zipSize = HeadRecv[0] - 12;
      //源数据
      var infoArr = arrayBuffer.slice(12, arrayBuffer.byteLength);
      //解压缩
      var destData = pako.inflate(infoArr);
      //转换成arraybuffer类型
      arrayBuffer = destData.buffer;
      var nickNameArray = new Uint8Array(arrayBuffer, 4, 64);
      var nickName = htmlLode.arryTostr(new TextDecoder('utf-8').decode(nickNameArray));
      var idxArray = new Uint32Array(arrayBuffer, 0, 1);
      var nickNameArray = new Uint8Array(arrayBuffer, 4, 64);
      var nickName = htmlLode.arryTostr(new TextDecoder('utf-8').decode(nickNameArray));
      var levelArray = new Uint32Array(arrayBuffer, 4 + 64, 1);
      var signArray = new Uint8Array(arrayBuffer, 4 + 64 + 4, 128);
      var sign = htmlLode.arryTostr(new TextDecoder('utf-8').decode(signArray));
      var fansAndFollowArray = new Uint32Array(arrayBuffer, 4 + 64 + 4 + 128, 2);
      var fans = fansAndFollowArray[0];
      var follow = fansAndFollowArray[1];
      var photoArray = new Uint8Array(arrayBuffer, 4 + 64 + 4 + 128 + 8, 200);
      var photo = htmlLode.arryTostr(new TextDecoder('utf-8').decode(photoArray));
      var resArray = new Uint32Array(arrayBuffer, 4 + 64 + 4 + 128 + 8 + 200, 4);
      var sex = resArray[0];
      var phoneType = resArray[1];
      var gLevel = resArray[2];
      var expLevel = resArray[3];
      var strUserlist = {
        idx: idxArray[0],
        nickName: nickName,
        level: levelArray[0],
        sign: sign,
        follow: follow,
        photo: photo,
        sex: sex,
        phoneType: phoneType,
        gLevel: gLevel,
        expLevel: expLevel,
      };
      //console.log("userAtData", WebSocketObj.userAtData.length)
      if (WebSocketObj.userAtData.filter((s) => s.idx == strUserlist.idx).length > 0) {
        return;
      } else {
        //向用户集合添加用户信息并重新排序加载
        if (levelArray[0] == 0) {
          //if (userAiData.length <= 100) {
          //    userAiData.push(strUserlist);
          //    ////MiaoboView.userlist();
          //}
        } else {
          WebSocketObj.userAtData.push(strUserlist);
          ////MiaoboView.userGoroom(strUserlist);
          //在聊天块显示进入消息
          ////MiaoboView.chatlist(strUserlist, 5);
          ////MiaoboView.userlist();
        }
        WebSocketObj.userData.push(strUserlist);
        //   console.log();
        // console.log("用户进入" + WebSocketObj.userData.length);
      }
    }
  } else if (HeadRecv[1] == 20006) {
    //用户离开房间
    var idxArray = new Uint32Array(arrayBuffer, 12, 1);
    var idx = idxArray[0];
    htmlLode.userFun.deleteUser(idx);
  } else if (HeadRecv[1] == 20007) {
    //聊天
    //console.log("聊天");
    var chatArray = new Uint32Array(arrayBuffer, 12, 3);
    var strArray = new Uint8Array(arrayBuffer, 12 + 12, HeadRecv[0] - 12 - 12);
    str = htmlLode.arryTostr(new TextDecoder().decode(strArray));

    // console.log(str);
    //聊天消息加载
    var chatData = { nFromidx: chatArray[0], nToUseridx: chatArray[1], nChatype: chatArray[2], str: str };
    if (nFromidx == roomNew.useridx) {
      return;
    }
    //htmlLode.titleShow("20007:" + str);
    if (chatData.nChatype == 0) {
      htmlLode.charFun.charLode(chatData);
    } else {
      console.log(chatData);
      htmlLode.charFun.charLode(chatData);
    }
  } else if (HeadRecv[1] == 20009) {
    //礼物
    var gift = null;
    if (WebSocketObj.lockType == 1) {
      return;
    }
    var giftArray = new Uint32Array(arrayBuffer, 0 + 12, 5);
    console.log('礼物:', giftArray);
    //送礼物的玩家,收礼物的玩家,序列号,数量,类型
    var obj = { FromUseridx: giftArray[0], ToUseridx: giftArray[1], GiftID: giftArray[2], Num: giftArray[3], GiftType: giftArray[4] };
    var data = {
      m_nFromUserIDx: obj.FromUseridx,
      m_nToUserIDx: obj.ToUseridx,
      m_nGiftID: obj.GiftID,
      m_nNum: obj.Num,
      m_nGiftType: obj.GiftType,
      m_nMulti: 0,
      m_nCurCash: 0,
      m_nTotalCash: 0,
      m_nLevel: obj.ToUseridx,
      m_Maxnumtype: 0,
      m_nChatType: 3,
    };
    htmlLode.gift.giftLode(data);
    if (data.m_nNum >= 99) {
      htmlLode.charFun.giftCharLode(obj);
    }
    //htmlLode.titleShow("20009:" + giftArray[3]);
    //MiaoboView.chatlist(giftinfo, 7);
  } else if (HeadRecv[1] == 20011) {
    //币值变化4
    var cashHArray = new Int32Array(arrayBuffer, 12, 1);
    var cashLArray = new Uint32Array(arrayBuffer, 12 + 4, 1);
    var cash = cashHArray[0] * (1 << 32) + cashLArray[0];
    $('#miaobi').html(cash);
    WebSocketObj.DoMBChanged(cash);
  } else if (HeadRecv[1] == 10106) {
    //Ticket币值变化
    var TicketLArray = new Uint32Array(arrayBuffer, 12, 1);
    var Ticket = TicketLArray[0];
    WebSocketObj.TicketChanged(Ticket);
  } else if (HeadRecv[1] == 20012) {
    //房间内错误消息提醒
    var codeArrar = new Uint32Array(arrayBuffer, 12, 1);
    var errCode = codeArrar[0];
    var strArray = new Uint8Array(arrayBuffer, 12 + 4, HeadRecv[0] - 12 - 4);

    str = htmlLode.arryTostr(new TextDecoder().decode(strArray));
    if (str == 'Coins is not enough,please recharge again.') $('#Bing_dialog').show();
    else tips(str);
    if (errCode == 150) {
      //未绑定手机，强制要求绑定手机
      htmlLode.Bing_dialog(1);
    }
    //MiaoboView.titleShow(str);
  } else if (HeadRecv[1] == 20013) {
    //系统消息
    var strArray = new Uint8Array(arrayBuffer, 12 + 4, HeadRecv[0] - 12 - 4);
    str = htmlLode.arryTostr(new TextDecoder().decode(strArray));
    //console.log(str);
    htmlLode.charFun.sysCharLode(str);
  } else if (HeadRecv[1] == 20014) {
    //幸运礼物中奖
    var luckyArray = new Uint32Array(arrayBuffer, 0 + 12, 6);
    var obj = {
      nFromUseridx: luckyArray[0],
      nMulti: luckyArray[1],
      index: luckyArray[2],
      nCash: luckyArray[3],
      nOwnCash: luckyArray[4],
      nlevel: luckyArray[5],
    };
    var data = {
      m_nFromUserIDx: obj.nFromUseridx,
      m_nToUserIDx: obj.nlevel,
      m_nGiftID: obj.index,
      m_nNum: 0,
      m_nGiftType: 0,
      m_nMulti: obj.nMulti,
      m_nCurCash: obj.nCash,
      m_nTotalCash: obj.nOwnCash,
      m_nLevel: obj.nlevel,
      m_Maxnumtype: 0,
    };
    // console.log(obj.nMulti);
    //htmlLode.titleShow("20014:" + obj.nMulti);
    //MiaoboView.chatlist(togiftinfo, 2);
    htmlLode.gift.giftZhongjiang(data);
  } else if (HeadRecv[1] == 20015) {
    var leavePhoneArray = new Uint32Array(arrayBuffer, 12, 7);
    var nFromUseridx = leavePhoneArray[0];
    var nToUseridx = leavePhoneArray[1];
    var nType = leavePhoneArray[2]; //公麦 私麦
    var nCash = leavePhoneArray[3]; //获赠喵币
    var nGiftNum = leavePhoneArray[4]; //获赠点歌娃娃数
    var nAddUserNum = leavePhoneArray[5]; //总观看人数
    var nTime = leavePhoneArray[6]; //直播时长
    if (nToUseridx == roomNew.roomidx) {
      $('#ex_have').html(nAddUserNum + 'people');
      WebSocketObj.HeadNum = 5;
      WebSocketObj.webckTyoe = 1;
      websocket.onclose();
      htmlLode.gift.GiftData = [];
      $('#playDome').hide();
      //当前主播下麦
      $('.con_top').hide();
      $('.pop').hide();
      $('.finish').show();
      video.video_pause(1);
      //5秒后随机进入另一个房间
      setInterval(function () {
        //下麦
        countdown();
      }, 5000);
    } else {
      htmlLode.WheatSequence.deleteRoom(nToUseridx);
      htmlLode.WheatSequence.roomWslist();
    }
  } else if (HeadRecv[1] == 20016) {
    //初始化麦序信息
    var starLen = 12;
    //HeadRecv 0 包体长度 1 协议号 2 是否压缩（是压缩时为原始数据长度）
    var numArray = new Uint32Array(arrayBuffer, 12, 1); //424
    var num = numArray[0];
    var len = HeadRecv[0] - 16; //
    var numLenth = len / num; //单个用户长度

    if (HeadRecv[2] > 0) {
      //压缩过的数据
      var zipSize = HeadRecv[0] - 12;
      //源数据
      var infoArr = arrayBuffer.slice(12, arrayBuffer.byteLength);
      //解压缩
      var destData = pako.inflate(infoArr);
      //转换成arraybuffer类型
      arrayBuffer = destData.buffer;
      starLen = 0;
      var numArry = new Uint32Array(arrayBuffer, 0, 1);
      console.log('numArry:', numArry);
      num = numArry[0];
      numLenth = (arrayBuffer.byteLength - 4) / num;
    }

    for (var i = 0; i < num; i++) {
      var array = new Uint32Array(arrayBuffer, numLenth * i + starLen + 4, 2);
      var userIDx = array[0];
      var nLevel = array[1];
      var photoArray = new Uint8Array(arrayBuffer, numLenth * i + starLen + 4 + 8, 200);
      var photo = htmlLode.arryTostr(new TextDecoder().decode(photoArray));
      //photo = taiwanPhoto(photo);
      var typeArray = new Uint32Array(arrayBuffer, numLenth * i + starLen + 4 + 8 + 200, 2);
      var nType = typeArray[0];
      var nickNameArray = new Uint8Array(arrayBuffer, numLenth * i + starLen + 4 + 8 + 200 + 8, 64);
      var nickName = htmlLode.arryTostr(new TextDecoder().decode(nickNameArray));
      var flvAddressArray = new Uint8Array(arrayBuffer, numLenth * i + starLen + 4 + 8 + 200 + 8 + 64, 256);
      var flvAddress = htmlLode.arryTostr(new TextDecoder().decode(flvAddressArray));
      var leftArray = new Uint32Array(arrayBuffer, numLenth * i + starLen + 4 + 8 + 200 + 8 + 64 + 256, 8);
      var online = leftArray[0]; //0 在不线  1在线正常  2按home
      var audio = leftArray[1]; //1音频打开状态 0关闭状态
      var totalCash = leftArray[2]; //币累加的数量
      var totalBaby = leftArray[3]; //娃娃的数量
      var nStarLevel = leftArray[4]; //主播星级
      var nGrade = leftArray[6]; //成长等级
      var nPassWord = leftArray[7]; //主播加锁  0 不加锁 1 加锁
      var strRoomist = {
        userIDx: userIDx,
        nLevel: nLevel,
        photo: photo,
        nType: nType,
        nickName: nickName,
        flvAddress: flvAddress,
        online: online,
        audio: audio,
        totalCash: totalCash,
        totalBaby: totalBaby,
        nStarLevel: nStarLevel,
        nGrade: nGrade,
        nPassWord: nPassWord,
      };
      //向房间麦序列表添加数据

      WebSocketObj.roomData.push(strRoomist);

      //加载礼物相关数据
    }
    htmlLode.WheatSequence.roomWslist();
    // console.log("初始化麦序信息" + WebSocketObj.roomData.length);
    //if (lodeNum == 0) {
    //    loadedmetadata();
    //    lodeNum = 1;
    //}
    //MiaoboView.anchorinfo(roomidx, 1);
    //MiaoboView.giftlist();
    //MiaoboView.giftAary();
  } else if (HeadRecv[1] == 20020) {
    //点赞
    var likeArray = new Uint32Array(arrayBuffer, 12, 3);
  } else if (HeadRecv[1] == 20022) {
    //异地登录
    WebSocketObj.webckTyoe = 1;
    websocket.onclose();
    htmlLode.login();
  } else if (HeadRecv[1] == 20023) {
    //在线人数
    var onlineArray = new Uint32Array(arrayBuffer, 12, 1);
    var onlineNum = onlineArray[0];
    $('.room_king').find('.text').find('.num').html(onlineNum);
  } else if (HeadRecv[1] == 20027) {
    //踢出房间
    var strArray = new Uint32Array(arrayBuffer, 12, 2);
    var obj = {
      nFromUserIDx: strArray[0],
      nToUserIDx: strArray[1],
      nMins: strArray[2],
    };
    htmlLode.RoomExit(obj);
  } else if (HeadRecv[1] == 20029) {
    //删除管理员的麦序信息
  } else if (HeadRecv[1] == 20031) {
    //直播时按Home键和恢复直播
    var tgLiveHome = new Uint32Array(arrayBuffer, 12, 2);
    var useridx = tgLiveHome[0]; //主播IDx
    var liveStatus = tgLiveHome[1]; //0--暂停直播 1--回复直播
    if (useridx == roomNew.roomidx) {
      //WebSocketObj.zanliNum = WebSocketObj.zanliNum + 1;
      if (liveStatus == 0) {
        //if (WebSocketObj.zanliNum == 2) {
        video.video_temporarilyPart();
        //    WebSocketObj.zanliNum = 0;
        //}
      }
      if (liveStatus == 1) {
        //if (WebSocketObj.zanliNum == 3) {
        video.video_temporarilyc_play();
        //    WebSocketObj.zanliNum = 0;
        //}
      }
    }
  } else if (HeadRecv[1] == 20032) {
    //主播收到的累积币值
    var presideCashArray = new Uint32Array(arrayBuffer, 12, 3);
    $('.open_rank').html('EXP:' + htmlLode.NumTok(presideCashArray[1]));
  } else if (HeadRecv[1] == 20033) {
    //主播收到的累积娃娃
    var babyArray = new Uint32Array(arrayBuffer, 12, 2);
  } else if (HeadRecv[1] == 20038) {
    //进入房间捧场消息
    var nSize = HeadRecv[0] - 12;
    var roomid;
    var prePresideIDx;
    var nextPresideIDx;
    var userIDx;
    if (nSize >= 20) {
      //通过分享进入房间捧场
      var userInfoArray = new Uint32Array(arrayBuffer, 12, 5);
      roomid = userInfoArray[0]; //房间id
      prePresideIDx = userInfoArray[1]; //本房间内上一个主播的IDx，-1代表第一次进入直播间
      nextPresideIDx = userInfoArray[2]; //本房间内下一个主播的IDx
      userIDx = userInfoArray[3]; //用户idx
      sharedIDx = userInfoArray[4]; //分享者idx
      var nickNameArray = new Uint8Array(arrayBuffer, 12 + 20, 64);
      var nickName = htmlLode.arryTostr(new TextDecoder().decode(nickNameArray)); //分享者昵称
      if (userIDx < 1000000000) {
        htmlLode.userFun.userJoin(userIDx, nickName);
      }
    } else {
      //app进入房间捧场
      var userInfoArray2 = new Uint32Array(arrayBuffer, 12, 4);
      roomid = userInfoArray2[0]; //房间id
      prePresideIDx = userInfoArray2[1]; //本房间内上一个主播的IDx，-1代表第一次进入直播间
      nextPresideIDx = userInfoArray2[2]; //本房间内下一个主播的IDx
      userIDx = userInfoArray2[3]; //用户idx
      if (userIDx < 1000000000) {
        htmlLode.userFun.userJoin(userIDx, '');
      }
    }
  } else if (HeadRecv[1] == 20039) {
    //弹幕
    var array = new Uint32Array(arrayBuffer, 12, 2);
    var nFromUseridx = array[0];
    var nToUseridx = array[1]; //-1--主播默认不@任何人
    var contentArray = new Uint8Array(arrayBuffer, 12 + 8, HeadRecv[0] - 12 - 8);
    var content = htmlLode.arryTostr(new TextDecoder().decode(contentArray));
    var abj = { fromUserIDx: nFromUseridx, content: content, toUseridx: nToUseridx, msgtype: 5 };
    htmlLode.charFun.ShortBarrageLode(abj);
    MiaoboView.FeiPinAnimate.FeiPinququq(abj); //飘屏
  } else if (HeadRecv[1] == 20040) {
    //发红包
    var hbArray = new Uint32Array(arrayBuffer, 12, 3);

    var idx = hbArray[0]; //谁发的红包
    var cash = hbArray[1]; //红包值
    var nIndex = hbArray[2]; //本次红包系列值
    $('#alert_download').show();
    $('#alert_download').delay(60000).hide(0);
  } else if (HeadRecv[1] == 20041) {
    //接收红包
    var hbArray = new Uint32Array(arrayBuffer, 12, 4);
    //var idx = hbArray[0]; //谁发的红包
    var cash = hbArray[1]; //本次拆红包中奖值
    var nIndex = hbArray[2]; //本次红包系列值
  } else if (HeadRecv[1] == 20046) {
    //红包列表
    var ownArray = new Uint32Array(arrayBuffer, 12, 3);
    var nIndex = ownArray[0];
    var ownCash = ownArray[1];
    var nListNum = ownArray[2];
    for (var i = 0; i < nListNum; i++) {
      var idxArray = new Uint32Array(arrayBuffer, 12 + 12 + 72 * i, 1);
      var userIDx = idxArray[0];
      var nameArray = new Uint8Array(arrayBuffer, 12 + 12 + 72 * i + 4, 64);
      var nickName = htmlLode.arryTostr(new TextDecoder().decode(nameArray));
      var cashArray = new Uint32Array(arrayBuffer, 12 + 12 + 72 * i + 4 + 64, 1);
      var cash = cashArray[0];
    }
  } else if (HeadRecv[1] == 20097) {
    //更换流地址，重新拉取信息
    MiaoboView.toLiveInfo();
    //var strArray = new Uint32Array(arrayBuffer, 12, 2);
    //var contentArray = new Uint8Array(arrayBuffer, 12 + 8, HeadRecv[0] - 12 - 8);
    //var content = arryTostr(new TextDecoder().decode(contentArray));
  } else if (HeadRecv[1] == 20043) {
    //大礼物通知
    var array = new Uint32Array(arrayBuffer, 12, 2);
    var nFromUseridx = array[0];
    var nToUseridx = array[1]; //-1--主播默认不@任何人
    var strArray = new Uint8Array(arrayBuffer, 12, HeadRecv[0] - 12);
    var str = htmlLode.arryTostr(new TextDecoder().decode(strArray)); //一串json字符串
    var json = JSON.parse(str);
    var data = {
      m_nFromUserIDx: json.fromUser.idx,
      m_nToUserIDx: json.toUser.idx,
      m_nGiftID: json.gift.id,
      m_nNum: json.gift.num,
      m_nGiftType: json.type,
      m_nMulti: 0,
      m_nCurCash: 0,
      m_nTotalCash: 0,
      m_nLevel: json.toUser.idx,
      m_Maxnumtype: 0,
      m_nChatType: 3,
    };
    htmlLode.gift.giftLode(data);
  } else if (HeadRecv[1] == 20044) {
    //全服喇叭
    var array = new Uint32Array(arrayBuffer, 12, 2);
    var strArray = new Uint8Array(arrayBuffer, 12, HeadRecv[0] - 12);
    var str = htmlLode.arryTostr(new TextDecoder().decode(strArray)); //一串json字符串
    var abj = JSON.parse(str); // { fromUserIDx: nFromUseridx, content: content, toUseridx: nToUseridx, msgtype: 5 };
    MiaoboView.FeiPinAnimate.FeiPinququq(abj); //飘屏
    if (abj.msgtype != 2) {
      var abj_v2 = { fromUserIDx: abj.fromUser.idx, content: abj.content, toUseridx: 0, msgtype: abj.msgtype };
      htmlLode.charFun.ShortBarrageLode(abj_v2);
    }
  } else if (HeadRecv[1] == 20524) {
    //全服喇叭
    var array = new Uint32Array(arrayBuffer, 12, 3);
    var nFromUserIDx = array[0];
    var nToUserIDx = array[1];
    var nTimes = array[2];
    var strArray = new Uint8Array(arrayBuffer, 12 + 12, HeadRecv[0] - 12 - 12);
    var str = htmlLode.arryTostr(new TextDecoder().decode(strArray));
    var abj = { fromUserIDx: nFromUserIDx, content: str, toUseridx: nToUserIDx, nTimes: nTimes, msgtype: 6 };
    htmlLode.charFun.ShortBarrageLode(abj);
    MiaoboView.FeiPinAnimate.FeiPinququq(abj); //飘屏
  } else if (HeadRecv[1] == 20531) {
    //PK信息包
    var strArray = new Uint32Array(arrayBuffer, 12, 7);
    var nPKTime = strArray[0];

    var nFromUserIdx = strArray[1];
    if (nFromUserIdx > 0) MiaoboView.AnchorPK.Anchoridx = nFromUserIdx;
    var nFromRoomId = strArray[2];
    var nToUserIdx = strArray[3];
    if (nToUserIdx > 0) MiaoboView.AnchorPK.Otheridx = nToUserIdx;
    var nToRoomId = strArray[4];
    var nFromServerId = strArray[5];
    var nToServerId = strArray[6];

    var str1 = new Uint8Array(arrayBuffer, 12 + 28, 64);
    var sFromNickName = htmlLode.arryTostr(new TextDecoder().decode(str1));
    var str2 = new Uint8Array(arrayBuffer, 12 + 28 + 64, 64);
    var sToNickName = htmlLode.arryTostr(new TextDecoder().decode(str2));
    var str3 = new Uint8Array(arrayBuffer, 12 + 28 + 128, 256);
    var sFromPhoto = htmlLode.arryTostr(new TextDecoder().decode(str3));
    var str4 = new Uint8Array(arrayBuffer, 12 + 28 + 128 + 256, 256);
    var sToPhoto = htmlLode.arryTostr(new TextDecoder().decode(str4));
    var nSessionId = new Uint32Array(arrayBuffer, 12 + 28 + 128 + 512, 1);

    var nRemainTime = new Uint32Array(arrayBuffer, 12 + 28 + 128 + 512 + 8, 1);

    var nFromCoin = new Uint32Array(arrayBuffer, 12 + 28 + 128 + 512 + 8 + 4, 1);
    var nToCoin = new Uint32Array(arrayBuffer, 12 + 28 + 128 + 512 + 8 + 4 + 8, 1);
    var nFromExCoin = new Uint32Array(arrayBuffer, 12 + 28 + 128 + 512 + 8 + 4 + 8 + 8, 1);
    var nToExCoin = new Uint32Array(arrayBuffer, 12 + 28 + 128 + 512 + 8 + 4 + 8 + 8 + 8, 1);
    var nPkStatus = new Uint32Array(arrayBuffer, 12 + 28 + 128 + 512 + 8 + 4 + 8 + 8 + 8 + 8, 1);
    var nReset = new Uint32Array(arrayBuffer, 12 + 28 + 128 + 512 + 8 + 4 + 8 + 8 + 8 + 8 + 4, 1);
    if (nSessionId > 0) MiaoboView.AnchorPK.Pkid = nSessionId;
    MiaoboView.AnchorPK.Progress(parseInt(nFromCoin) + parseInt(nFromExCoin), parseInt(nToCoin) + parseInt(nToExCoin));
    if (nRemainTime > 0 && (nPkStatus == 1 || nPkStatus == 0)) {
      MiaoboView.AnchorPK.PkTime('PK Time ', nRemainTime);
    } else if (nRemainTime > 0 && nPkStatus == 2) {
      MiaoboView.AnchorPK.PkTime('Punish ', nRemainTime);
    }
    MiaoboView.AnchorPK.PKInIt(); //初始化pk样式
  } else if (HeadRecv[1] == 20532) {
    //PK用户前三名贡献包
    let h = HeadRecv;
    var strArray = new Uint32Array(arrayBuffer, 12, 2);
    var nFromUseridx = strArray[0];
    var nToUseridx = strArray[1];
    let list = [];
    var len = 12 + 2 * 4;
    for (var i = 0; i < 6; i++) {
      var nFromUserIdx = new Uint32Array(arrayBuffer, len + 260 * i, 1);
      var sPhoto = '';
      if (nFromUserIdx != 0) {
        var str = new Uint8Array(arrayBuffer, len + 260 * i + 4, 256);
        sPhoto = htmlLode.arryTostr(new TextDecoder().decode(str));
      }
      list.push({ nFromUserIdx: nFromUserIdx, sPhoto: sPhoto });
    }
    MiaoboView.AnchorPK.ContributeRank(nFromUserIdx, sPhoto, list);
    MiaoboView.AnchorPK.GetpkRankList();
  } else if (HeadRecv[1] == 20533) {
    //出现暴击
    var strArray = new Uint32Array(arrayBuffer, 12, 2);
    var anchorIdx = strArray[0];
    var second = strArray[1];
    if (anchorIdx == MiaoboView.AnchorPK.GetpkRankListData.ouranchor.useridx) {
      //我方主播暴击特效
      MiaoboView.AnchorPK.GiftDouble(5);
    } else {
      //对方主播暴击特效
      MiaoboView.AnchorPK.To_GiftDouble(5);
    }
  } else if (HeadRecv[1] == 20535) {
    //进度条和剩余时间更新包
    var strArray = new Uint32Array(arrayBuffer, 12, 4);
    var nFromIdx = strArray[0];
    var nToIdx = strArray[1];
    var nFromRoomId = strArray[2];
    var nToRoomId = strArray[3];
    var nFromCoin = new Uint32Array(arrayBuffer, 12 + 4 * 4, 1);
    var nToCoin = new Uint32Array(arrayBuffer, 12 + 4 * 4 + 8, 1);
    var nFromExCoin = new Uint32Array(arrayBuffer, 12 + 4 * 4 + 8 * 2, 1);

    var nToExCoin = new Uint32Array(arrayBuffer, 12 + 4 * 4 + 8 * 3, 1);
    var strArray = new Uint32Array(arrayBuffer, 12 + 4 * 4 + 8 * 4, 3);
    var nRemainTime = strArray[0];
    var nFromState = strArray[1];
    var nToState = strArray[2];
    MiaoboView.AnchorPK.Progress(parseInt(nFromCoin) + parseInt(nFromExCoin), parseInt(nToCoin) + parseInt(nToExCoin));
    if (nRemainTime > 0) {
      MiaoboView.AnchorPK.PkTime('PK Time ', nRemainTime);
    }
    MiaoboView.AnchorPK.GetpkRankList();
  } else if (HeadRecv[1] == 20540) {
    //PK倒计时结束包
    var strArray = new Uint32Array(arrayBuffer, 12, 4);
    var nFromIdx = strArray[0];
    var nToIdx = strArray[1];
    var nFromRoomId = strArray[2];
    var nToRoomId = strArray[3];
    var nFromCoin = new Uint32Array(arrayBuffer, 12 + 4 * 4, 1);
    var nToCoin = new Uint32Array(arrayBuffer, 12 + 4 * 4 + 8, 1);
    var nFromExCoin = new Uint32Array(arrayBuffer, 12 + 4 * 4 + 8 * 2, 1);
    var nToExCoin = new Uint32Array(arrayBuffer, 12 + 4 * 4 + 8 * 3, 1);
    var strArray = new Uint32Array(arrayBuffer, 12 + 4 * 4 + 8 * 4, 3);
    var nRemainTime = strArray[0];

    var nFromState = strArray[1];
    var nToState = strArray[2];
    if (nRemainTime > 0 && nFromState != 0) {
      MiaoboView.AnchorPK.PkTime('Punish ', nRemainTime);
    }
    if (nFromState >= 0) {
      MiaoboView.AnchorPK.PkResult(nFromState);
    }
    MiaoboView.AnchorPK.Progress(parseInt(nFromCoin) + parseInt(nFromExCoin), parseInt(nToCoin) + parseInt(nToExCoin));
  } else if (HeadRecv[1] == 20541) {
    // PKMVP
    var strArray = new Uint32Array(arrayBuffer, 12, 2);
    var anchorIdx = strArray[0];
    var userIdx = strArray[1];
    var strArray = new Uint32Array(arrayBuffer, 12 + 2 * 4, 1);
    var nContributionCoin = strArray[0];
    //var strArray = new Uint32Array(arrayBuffer, 12 + 2 * 4 + 8, 64);
    //var nickName = strArray[0];
    //console.log(nickName);
  } else if (HeadRecv[1] == 20543) {
    // 结束PK包
    MiaoboView.toLiveInfo();
    $('.contributorRank,.roomDate,.PkResult').addClass('pkstyle');
    $('#Pk_Progress').css('display', 'none');
    $('.PkIsfollow').css('display', 'none');
    var strArray = new Uint32Array(arrayBuffer, 12, 5);
    var nFromUserIdx = strArray[0];
    var nToUserIdx = strArray[1];
    var nFromRoomIdx = strArray[2];
    var nToRoomIdx = strArray[3];
    var nStatus = strArray[4]; //1、正常结束  2、网络异常
    var strArray = new Uint32Array(arrayBuffer, 12 + 5 * 4, 1);
    var sessionId = strArray[0];
    var strArray = new Uint32Array(arrayBuffer, 12 + 5 * 4 + 8, 2);
    var nFromServerId = strArray[0];
    var nToServerId = strArray[1];
  } else if (HeadRecv[1] == 5001) {
    //游客送非签约主播礼物失败消息
    htmlLode.Bing_dialog(2);
  } else if (HeadRecv[1] == 20706) {
    var strArray = new Uint32Array(arrayBuffer, 12, 1);
    var result = strArray[0];
    console.log(result);
  } else if (HeadRecv[1] == 20711) {
    var lockRoom = new Uint32Array(arrayBuffer, 12, 11);
    var L_roomType = lockRoom[0]; //0--normal  1--password
    var L_userTyp = lockRoom[1]; //0--normal  1--coupon  2--admin  3--super
    var L_status = lockRoom[2]; // 0--lock  1--unlock  2--password error  3--coupon error  4--coupon not enough  5--unKnow
    var L_lockType = lockRoom[3]; //-1 普通房,0 币+密码,1 礼物+密码,2 礼物锁房,3 自动锁房, （4 票据,5 票据+密码,6 票据礼物，7 票据礼物+密码，8 票据币+密码）V1 ,（9 票据锁房,10 票据+密码锁房）V2
    var L_couponOrGiftId = lockRoom[4]; //币值或者礼物id
    var L_zeroOrGiftAmount = lockRoom[5]; //0或者礼物数量
    var L_count = lockRoom[6]; //第几次设置密码房
    var L_starIdx = lockRoom[7]; //主播idx
    var L_hasPay = lockRoom[8]; //0:未支付过 1:支付过
    var L_nIsAutoLock = lockRoom[9]; //是否是自动锁房 0:不是  1:是
    var L_nPrice = lockRoom[10]; //需要增加支付的币值
    LockRoomData.L_roomType = L_roomType;
    LockRoomData.L_userTyp = L_userTyp;
    LockRoomData.L_status = L_status;
    LockRoomData.L_lockType = L_lockType;
    LockRoomData.L_couponOrGiftId = L_couponOrGiftId;
    LockRoomData.L_zeroOrGiftAmount = L_zeroOrGiftAmount;
    LockRoomData.L_count = L_count;
    LockRoomData.L_starIdx = L_starIdx;
    LockRoomData.L_hasPay = L_hasPay;
    LockRoomData.L_nIsAutoLock = L_nIsAutoLock;
    LockRoomData.L_nPrice = L_nPrice;

    var giftlock = $('#giftlock');
    var giftpwdlock = $('#giftpwdlock');
    var pwdcuplock = $('#pwdcuplock');
    var userLevel = parseInt(roomNew.level);
    var isonline = userLevel == 130 ? 1 : 0;
    if (LockRoomData.L_status == 0) {
      //开锁房
      if (isonline == 0) {
        lockRoomIng();
      } else {
        WebSocketObj.superTube();
      }
    } else if (LockRoomData.L_status == 1) {
      //unlock
      $('#lockbody').hide();
      $('.one_tan,.two_tan,.one_tan_2,.two_tan_2,.alert_Pay').slideUp(800);
      setTimeout(function () {
        $('.one_center,.two_center,.one_center_2,.two_center_2').slideUp(700);
      }, 150);
      $('.TicketLock_V1,.TicketLock_V2').slideUp(500);
    } else if (LockRoomData.L_status == 2) {
      //2--pwd err
      htmlLode.titleShow('Unlock Code is wrong, Please try again');
      $("input[name='clock'],input[name='glock']").each(function (i, obj) {
        $(obj).val('');
        if (i == 0) {
          $(obj).focus();
        }
      });
    } else if (LockRoomData.L_status == 3) {
      //3--coupon err
      htmlLode.titleShow('coupon error');
    } else if (true) {
      //4--coupon not match 5--unknow
      htmlLode.titleShow('coupon not match');
    } else {
      htmlLode.titleShow('unknow');
      $('#lockbody').hide();
    }
  } else if (HeadRecv[1] == 20518) {
    //20518中途锁房
    var lockRoom = new Uint32Array(arrayBuffer, 12, 11);
    var L_roomType = lockRoom[0]; //0--normal  1--password
    var L_userTyp = lockRoom[1]; //0--normal  1--coupon  2--admin  3--super
    var L_status = lockRoom[2]; // 0--lock  1--unlock  2--password error  3--coupon error  4--coupon not enough  5--unKnow
    var L_lockType = lockRoom[3]; //-1 普通房,0 币+密码,1 礼物+密码,2 礼物锁房,3 自动锁房, （4 票据,5 票据+密码,6 票据礼物，7 票据礼物+密码，8 票据币+密码）V1 ,（9 票据锁房,10 票据+密码锁房）V2
    var L_couponOrGiftId = lockRoom[4]; //币值或者礼物id
    var L_zeroOrGiftAmount = lockRoom[5]; //0或者礼物数量
    var L_count = lockRoom[6]; //第几次设置密码房
    var L_starIdx = lockRoom[7]; //主播idx
    var L_hasPay = lockRoom[8]; //0:未支付过 1:支付过
    var L_nIsAutoLock = lockRoom[9]; //是否是自动锁房 0:不是  1:是
    var L_nPrice = lockRoom[10]; //需要增加支付的币值
    LockRoomData.L_roomType = L_roomType;
    LockRoomData.L_userTyp = L_userTyp;
    LockRoomData.L_status = L_status;
    LockRoomData.L_lockType = L_lockType;
    LockRoomData.L_couponOrGiftId = L_couponOrGiftId;
    LockRoomData.L_zeroOrGiftAmount = L_zeroOrGiftAmount;
    LockRoomData.L_count = L_count;
    LockRoomData.L_starIdx = L_starIdx;
    LockRoomData.L_hasPay = L_hasPay;
    LockRoomData.L_nIsAutoLock = L_nIsAutoLock;
    LockRoomData.L_nPrice = L_nPrice;
    var userLevel = parseInt(roomNew.level);
    var isonline = userLevel == 130 ? 1 : 0;
    lockRoomIng();
  } else if (HeadRecv[1] == 20527) {
    // 20527后台锁房
    var lockRoom = new Uint32Array(arrayBuffer, 12, 11);
    var L_roomType = lockRoom[0]; //0--normal  1--password
    var L_userTyp = lockRoom[1]; //0--normal  1--coupon  2--admin  3--super
    var L_status = lockRoom[2]; // 0--lock  1--unlock  2--password error  3--coupon error  4--coupon not enough  5--unKnow
    var L_lockType = lockRoom[3]; //-1 普通房,0 币+密码,1 礼物+密码,2 礼物锁房,3 自动锁房, （4 票据,5 票据+密码,6 票据礼物，7 票据礼物+密码，8 票据币+密码）V1 ,（9 票据锁房,10 票据+密码锁房）V2
    var L_couponOrGiftId = lockRoom[4]; //币值或者礼物id
    var L_zeroOrGiftAmount = lockRoom[5]; //0或者礼物数量
    var L_count = lockRoom[6]; //第几次设置密码房
    var L_starIdx = lockRoom[7]; //主播idx
    var L_hasPay = lockRoom[8]; //0:未支付过 1:支付过
    var L_nIsAutoLock = lockRoom[9]; //是否是自动锁房 0:不是  1:是
    var L_nPrice = lockRoom[10]; //需要增加支付的币值
    LockRoomData.L_roomType = L_roomType;
    LockRoomData.L_userTyp = L_userTyp;
    LockRoomData.L_status = L_status;
    LockRoomData.L_lockType = L_lockType;
    LockRoomData.L_couponOrGiftId = L_couponOrGiftId;
    LockRoomData.L_zeroOrGiftAmount = L_zeroOrGiftAmount;
    LockRoomData.L_count = L_count;
    LockRoomData.L_starIdx = L_starIdx;
    LockRoomData.L_hasPay = L_hasPay;
    LockRoomData.L_nIsAutoLock = L_nIsAutoLock;
    LockRoomData.L_nPrice = L_nPrice;
    var userLevel = parseInt(roomNew.level);
    var isonline = userLevel == 130 ? 1 : 0;
    lockRoomIng();
  } else if (HeadRecv[1] == 20010) {
    //解锁后获取流地址
    var PhoneArray = new Uint32Array(arrayBuffer, 12, 5);
    var nFromidx = PhoneArray[0];
    var nToUseridx = PhoneArray[1];
    var nType = PhoneArray[2];
    var nRet = PhoneArray[3];
    var flvAddressArray = new Uint8Array(arrayBuffer, 12 + 4 * 4, 256);
    var flvAddress = htmlLode.arryTostr(new TextDecoder().decode(flvAddressArray));
    var url = '',
      streamName = '';
    if (flvAddress.indexOf('live1') > 0) {
      //flvAddress = flvAddress.replace('live1', 'live');
      //streamName = flvAddress.substring(28, flvAddress.length);
      //streamName = streamName.substring(0, streamName.indexOf("."));
      //url = "http://hls.mlive.in.th/live1/" + streamName + "/playlist.m3u8";
      url = flvAddress.replace('hdl.mlive.in.th', 'hls.mlive.in.th').replace('.flv', '/playlist.m3u8');
    } else {
      streamName = flvAddress.substring(28, flvAddress.length);
      streamName = streamName.substring(0, streamName.indexOf('.'));
      url = 'http://hls.mlive.in.th/live/' + streamName + '/playlist.m3u8';
    }
    if (url != '' && roomNew.roomidx == nToUseridx) {
      //$("#v_media").attr("src", url);
      roomNew.m3u8 = url;
      //video.video_one_play();
      video.oneLode();
    }
  }
};
