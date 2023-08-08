import { defineStore } from 'pinia';
// 直播间内容 全局数据存储
export const authorDetails = defineStore({
  id: 'author-details',
  state: () => ({
    privateMactShow: false, //隐私聊天得切换和显示
    privateToggle: true, //私聊列表和私聊得切换
    shareShow: false, //分享界面显示/隐藏
    giftShow: false, //礼物面板得显示和隐藏
    followShow: false, //观看一会弹出来的关注弹窗
    authorProList:[],
    authorStarList:[],
    authorInterList:[],
    authorProIndex:0,
    authorStarIndex:0,
    authorInterIndex:0,
  }),
  getters: {},
  actions: {},
});
