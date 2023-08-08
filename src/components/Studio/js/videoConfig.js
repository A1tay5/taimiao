import $ from 'jquery';
import { htmlLode } from '@/socket/VideoHtmlLode';
import '@/utils/qiniu-web-player-1.2.3';
/**
 *
 * @param {*} rootId 播放器id
 * @param {*} posterId  封面id
 * @param {*} loadId 加载id
 * @param {*} playId 播放id
 */
let v;
export default function Video(rootId, posterId, loadId, playId, coverImg) {
  v = this;
  v.rootId = rootId;
  v.videoDome_js = document.getElementById(rootId); //播放器
  v.videoDome_jq = $(`#${rootId}`); //播放器
  v.posterDome = $(`#${posterId}`); //封面
  v.loadDome = $(`#${loadId}`); //加载状态
  v.playDome = $(`#${playId}`); //播放按钮
  v.videoDiv = $('video');
  v.videohw = { w: 0, h: 0 };
  v.url = [];
  v.isOneLive = true;
  v.browser = {
    is_weixin: function () {
      var ua = navigator.userAgent;
      //if (ua.match(/MicroMessenger/i) == "micromessenger") {
      if (ua.match(/MicroMessenger\/[0-9]/i)) {
        //正确方法
        return true;
      } else {
        return false;
      }
    },
    is_QQ: function () {
      var ua = navigator.userAgent;
      if (ua.match(/QQ\/[0-9]/i)) {
        //if (ua.match(/qq/i) == "qq") {
        return true;
      } else {
        return false;
      }
    },
    is_weibo: function () {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/WeiBo/i) == 'weibo') {
        return true;
      } else {
        return false;
      }
    },
    is_Allpay: function () {
      return navigator.userAgent.indexOf('Alipay') > -1;
    },
    versions: (function () {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        m9158: u.indexOf('9158') > -1,
        isMiaobo: u.indexOf('miaobo') > -1,
        isApp: u.indexOf('packageid') > -1,
      };
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    userAgent: function () {
      return navigator.userAgent;
    },
  };
  v.video_playboos = true;
  v.lodePaly = true;
}

Video.prototype.video_temporarilyPart = () => {
  //主播暂离
  v.video_pause(1);
  v.posterDome.show();
  v.loadDome.show().find('p').html('VJ temporarily leave...');
  v.loadDome.show();
};
Video.prototype.video_temporarilyc_play = function () {
  //主播恢复
  v.video_load('', 0);
  v.videoDome_js.play();
  v.loadDome.find('p').html('loading...');
  v.videoDome_js.addEventListener('timeupdate', video.timeupdate);
};
Video.prototype.timeupdate = function () {
  //绝对播放状态监控
  // if (video.player.currentTime > 0) {
  //video.msg("绝对播放状态监控");
  $('.qplayer-wrapper')
    .children('div')
    .each(function () {
      if ($(v).attr('class') != 'qplayer-video') {
        $(v).hide();
      }
    });
  v.lodePaly = false;
  //隐藏视频封面
  v.posterDome.hide();
  //隐藏播放按钮
  v.playDome.hide();
  v.loadDome.hide(); //隐藏加载按钮
  //解除视频播放监控
  ///video.videoDome_js.removeEventListener("timeupdate", video.timeupdate);
  //video.player.off("timeupdate", video.timeupdate);

  //} else {
  //    //video.msg("视频加载失败");
  //}

  if (htmlLode.loadNum) {
    htmlLode.loadNum = false;
    if (roomNew.islock == 0) {
      htmlLode.div_Adaptation();
    }
  }
};

Video.prototype.video_temporarilyc_play = () => {
  //主播恢复
  v.video_load('', 0);
  v.videoDome_js.play();
  v.loadDome.find('p').html('loading...');
  v.videoDome_js.addEventListener('timeupdate', v.timeupdate);
};
Video.prototype.timeupdate = () => {
  //绝对播放状态监控
  // if (video.player.currentTime > 0) {
  //video.msg("绝对播放状态监控");
  $('.qplayer-wrapper')
    .children('div')
    .each(function () {
      if ($(v).attr('class') != 'qplayer-video') {
        $(v).hide();
      }
    });
  v.lodePaly = false;
  //隐藏视频封面
  v.posterDome.hide();
  //隐藏播放按钮
  v.playDome.hide();
  v.loadDome.hide(); //隐藏加载按钮
  //解除视频播放监控
  ///video.videoDome_js.removeEventListener("timeupdate", video.timeupdate);
  //video.player.off("timeupdate", video.timeupdate);

  //} else {
  //    //video.msg("视频加载失败");
  //}

  //   if (htmlLode?.loadNum) {
  //     htmlLode.loadNum = false;
  //     if (roomNew.islock == 0) {
  //       htmlLode.div_Adaptation();
  //     }
  //   }
};
Video.prototype.video_load = (url, mtype) => {
  //重新load video
  //alert(0)

  let m3u8 = url;
  if (url != undefined && url != '' && !url.includes('\u0000')) {
    m3u8 = url;
    // roomNew.m3u8 = m3u8;
  }
  if (htmlLode.getRequestType()) {
    //如果是https
    m3u8 = m3u8.replace('http', 'https');
    // roomNew.m3u8 = m3u8;
  }
  if (m3u8 != '') {
    v.posterDome.show();
    v.playDome.hide();
    v.lodePaly = true;

    if (v.player != null) {
      v.player.destroy();
    }

    v.player = new QPlayer({
      url: m3u8,
      container: document.getElementById('v_media'),
      autoplay: this.browser.versions.ios ? true : true,
      // isLive: true,
      loggerLevel: 2,
      defaultViewConfig: {
        noControls: true,
      },
    });
    // document.getElementById('v_media').controls = false;
    v.isOneLive = false;
    //播放器准备完成
    v.player.on('ready', function () {
      if (v.browser.is_weixin() && v.browser.versions.ios) {
        v.playDome.hide();
      } else {
        if (mtype == 1) {
          v.playDome.hide();
        } else {
          v.playDome.show();
        }
      }
      v.loadDome.hide(); //隐藏加载按钮
    });

    v.player.on('timeupdate', function () {
      //htmlLode.titleShow("timeupdate");
      v.timeupdate();
    });

    v.player.on('pause', function (e) {
      if (!e.isPlay) {
        v.video_errPause();
      } else {
        v.loadDome.hide();
        v.posterDome.hide();
      }
    });
    //   video.videoDome_js.addEventListener("pause", video.video_errPause);
    // 16、error：播放错误
    v.player.on('error', function (e) {
      if (e.code == 10002) {
        //htmlLode.titleShow("video error");
        v.loadDome.show();
        v.posterDome.show();
        //无法加载视频，已下麦
        //htmlLode.WheatSequence.deleteRoom(roomNew.roomidx);
        //htmlLode.WheatSequence.roomWslist();
      } else if (e.code == 10000) {
        htmlLode.titleShow('Browsers do not support v video source');
      } else if (e.code == 10006) {
        //htmlLode.titleShow("Video playback failure");
      } else if (e.code == 10008) {
        htmlLode.titleShow('unexpected error');
      } else if (e.code == 10009) {
        htmlLode.titleShow('HLS engine error');
      } else {
        v.loadDome.show();
        v.posterDome.show();
      }
    });
    v.player.on('loading', function (e) {
      //htmlLode.titleShow("loading");
      if (e.isPause || (e.isEnded && v.isOneLive)) {
        v.loadDome.show();
        v.posterDome.show();
      } else {
        //video.loadDome.hide();
        //video.posterDome.hide();
      }
    });
    //v.videoScaleCalculation();
  } else {
    if (htmlLode.loadNum) {
      htmlLode.loadNum = false;
      if (roomNew.islock == 0) {
        htmlLode.div_Adaptation();
      }
    }
  }
};
Video.prototype.video_pause = (type) => {
  //主动暂停
  v.videoDome_js.pause();
  if (type == 0) {
    v.playDome.show();
  }
};
Video.prototype.video_errPause = () => {
  //htmlLode.titleShow("video_errPause");
  v.posterDome.show();
  v.playDome.show();
};
Video.prototype.videoIfromLode = () => {
  $('#videoLode')[0].contentWindow.into(live.live.config.roominfo.url, 2);
  setTimeout(function () {
    $('#videoLode').attr('src', $('#videoLode').attr('src'));
  }, 1000);
};
Video.prototype.video_play = () => {
  //点击播放
  //alert(1111)
  if (v.lodePaly) {
    v.player.play();
    v.playDome.hide();
    v.loadDome.show();
    v.posterDome.hide();
    //v.video_load("", 1);
    //video.videoDome_js.play();
  } else {
    v.player.play();
    //v.video_load("", 1);
    //video.videoDome_js.play();
    v.playDome.hide();
    v.posterDome.hide();
  }
  v.player.once('timeupdate', function () {
    v.timeupdate();
  });
};
Video.prototype.oneLode = (parme) => {
  v.url = WebSocketObj.roomData;
  v.msg = parme;
  v.loadDome.show();
  v.playDome.click(function () {
    v.video_play();
  });
  $('.video-57f88b').click(function () {
    v.video_pause(0);
  });
  v.video_load('', 0);
  v.videoScaleCalculation();
  v.x5videoexitfullscreen = false;
  window.onresize = function () {
    return;
    if (!v.browser.versions.ios && video.x5videoexitfullscreen) {
      var hc = window.screen.height - window.innerHeight;
      var hz = window.innerHeight;
      //video.msg("窗口变化1" + $("body").height() + "/" + $(".view-black").height() + "/");

      $('.qplayer').height(window.screen.height);
      $('.qplayer-wrapper').height(window.screen.height);
      $('.qplayer-video').height(window.screen.height);

      //live.live.blockHeight(window.screen.width, hz);
      document.getElementById('v_media').style.width = window.innerWidth + 2 + 'px';
      document.getElementById('v_media').style.height = window.screen.height + 'px';
      video.x5videoexitfullscreen = false;

      //setTimeout(function () {
      //    live.live.blockHeight(window.screen.width, $("body").height());
      //}, 1000);
    }
  };
};
Video.prototype.videoScaleCalculation = () => {
  var winw = window.innerWidth + 20;
  var winh = (winw * 16) / 9;

  //v.videoDome_js.style.top = 10 + "px";
  //v.videoDome_js.style.width = winw + "px";
  document.getElementById('v_media').style.width = winw + 'px';
  document.getElementById('v_media').style.height = winh + 'px';
  document.getElementById('v_media').style.top = -20 + 'px';
  //console.log("h=" + h + ",w=" + w + ",winh=" + winh + ",winw=" + winw);
  //video.handleResize();
};
Video.prototype.handleResize = () => {
  var sWidth = 9;
  var sHeight = 16;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var marginTop = height - (width * sHeight) / sWidth;
  marginTop = Math.round(marginTop);
  if (marginTop < -2) {
    $('#v_media').css('margin-top', marginTop / 2 + 'px');
  } else {
    $('#v_media').css('margin-top', '0');
  }
};
