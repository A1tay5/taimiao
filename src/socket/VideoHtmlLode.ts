import { WebSocketObj } from './websocket';
import { useUserStore } from '@/store/modules/user';
const roomNew = useUserStore();
export const htmlLode: any = {
  fillstr2ab: function (str, buf, offset) {
    var uint8array = new TextEncoder().encode(str);
    var strLen = uint8array.length;
    var bufView = new Uint8Array(buf, offset, strLen);
    for (var i = 0; i < strLen; i++) {
      bufView[i] = uint8array[i];
    }
  },
  toUserIpType: () => {
    //WebSocketObj.connect("ws://210.246.248.127:7510/test");
    if (htmlLode.getRequestType()) {
      //如果使用https请求，使用tcp代理
      WebSocketObj.connect('wss://proxyh5.mlive.la//websocket');
    } else {
   
      /* WebSocketObj.connect("ws://202.170.113.118:7538/test"); 正式*/
      WebSocketObj.connect('ws://210.246.248.13:7540/test'); /*测试*/
      /*WebSocketObj.connect("ws://" + data.json.ip + ":" + data.json.port + "/test");*/
    }
  },
  getRequestType: () => {
    var ishttps = 'https:' == document.location.protocol ? true : false;


    return ishttps;
  },
  userCookie: function () {
    if (roomNew.info.useridx != '' || roomNew.token == '') {
      //登陆
      // WebSocketObj.LoginSend(roomNew.info.useridx, htmlLode.userFun.token(roomNew.token), roomNew.info.userType);
      WebSocketObj.LoginSend(roomNew.info.useridx, 'b0453f5cf133441cf3b5708fde416b9b', roomNew.info.userType);
    } else {
      //跳转登陆'
      // setTimeout(function () {
      //   //htmlLode.login();
      //   $('#windowss').show();
      // }, 10000);
    }
  },
  //调礼物列表和socket
  giftlistload: function () {
    htmlLode.gift.giftAary();
    var giftStr = '';
    htmlLode.ajaxs('GET', 'Ajax/Live_Gift_2.aspx', 'JSON', { Type: 1 }, function (data) {
      htmlLode.gift.GiftList = data;
      data.tabList = data.tabList.filter((s) => s.ishidden != 1);
      if (data != '' && data != null) {
        htmlLode.toUserIpType();
        //调整标签顺序
        //var tab = [];
        //var tabTitle = [];
        //for (var i = 1; i <= data.tabList.length; i++) {
        //    for (var j = 0; j < data.tabList.length; j++) {
        //        if (data.tabList[j].order == i) {
        //            $.each(data.tab, function (index, obj) {
        //                if (obj.tabid == data.tabList[j].id) {
        //                    tab.push(obj.giftlist);
        //                    tabTitle.push(data.tabList[j]);
        //                    return false;
        //                }
        //            });
        //            break;
        //        }
        //    }
        //}
        //data.tabList = tabTitle;
        //data.tab = tab;
        //htmlLode.gift.giftData = data;
        //htmlLode.gift.tabTitle = tabTitle;
        /*htmlLode.gift.giftData.tab.splice(3, 1);*/
        data.tab = data.datalist.filter((item) => item.isvideo == 1);
        //礼物元素加载
        giftStr += '<div class="swiper-container"> <div class="swiper-wrapper">';
        for (var i = 0; i < 1; i++) {
          giftStr += '  <div class="swiper-slide"><div style="width:100%">';
          for (var j = 0; j < data.tab.length && data.tab[j] != null; j++) {
            if (j > 0 && j % 8 == 0) {
              giftStr += '</div></div>';
              giftStr += '<div class="swiper-slide"><div style="width:100%">';
              giftStr +=
                '<div  idx="' +
                data.tab[j].giftid +
                '" giftType="' +
                data.tab[j].gifttype +
                '" title="' +
                data.tab[j].content +
                '"  style="user-select: none" class="item  ">';
              giftStr += '<div class="num"><span>x1</span>   </div>';
              giftStr += '<div class="img" unselectable="on" style=" background-image:url(' + data.tab[j].hoticon + ');"></div>';
              giftStr += '<div unselectable="on" class="price">' + data.tab[j].price + '</div></div>';
            } else {
              giftStr +=
                '<div  idx="' +
                data.tab[j].giftid +
                '" giftType="' +
                data.tab[j].gifttype +
                '" title="' +
                data.tab[j].content +
                '"  style="user-select: none" class="item  ">';
              giftStr += '<div class="num"><span>x1</span>   </div>';
              giftStr += '<div class="img" unselectable="on" style=" background-image:url(' + data.tab[j].hoticon + ');"></div>';
              giftStr += '<div unselectable="on" class="price">' + data.tab[j].price + '</div></div>';
            }
          }

          giftStr += '</div></div>';
        }
        giftStr += '</div></div>';
        htmlLode.gift.giftListDome.html(giftStr);
        htmlLode.fat_bottom_Dome.find('.gift').unbind().bind('click', htmlLode.gift.giftOnclic);
        //标签单击
        //礼物tab数据填充
        var tabStr = '';
        tabStr += '<li><a href="javascript: htmlLode.gift.giftTabTouchend(' + 1 + ')" class="current">' + 'OpenFans' + '</a></li>';
        ////var Tabobj = htmlLode.gift.tabTitle;
        ////$.each(Tabobj, function (i, obj) {
        ////    if (i == 0) {
        ////        tabStr += "<li><a href=\"javascript: htmlLode.gift.giftTabTouchend(" + i + ")\" class=\"current\">" + obj.tabname + "</a></li>";
        ////    } else {
        ////        tabStr += "<li><a href=\"javascript: htmlLode.gift.giftTabTouchend(" + i + ")\">" + obj.tabname + "</a></li>";
        ////    }
        ////});
        if (tabStr != '') {
          $('.the_gift ul').html(tabStr);
          var tabwidth = 20;
          $('.the_gift ul li').css('width', tabwidth + '%');
        }
        //htmlLode.gift.giftDome.find(".tab li").each(function () {
        //    $(this).find("a").attr("href", "javascript: htmlLode.gift.giftTabTouchend(" + $(this).index() + ")");
        //    $(this).find("a").html(htmlLode.gift.tabTitle[$(this).index()].tabname);
        //});
        //礼物单击
        htmlLode.gift.giftListDome.find('.item').each(function () {
          $(this).unbind();
          $(this).bind('touchend', function () {
            htmlLode.gift.gitfitemclick($(this));
          });
        });
        htmlLode.gift.giftShowNum = false;
        //   }
        // });
      }
    });
  },
};
