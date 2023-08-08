import { defineStore } from 'pinia';
// OPfans内容 全局数据存储
export const useOpenfansStore = defineStore({
  id: 'openfans',
  state: () => ({
    OpHotList:[],
    OpnewList:[],
    OpfowList:[],
    OpcolList:[],
    OpbyList:[],
    OpserlList:[],
    hotIndex:0,
    newIndex:0,
    fowIndex:0,
    colIndex:0,
    byIndex:0,
    serIndex:0,
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'opfan',
    storage: sessionStorage,
    paths: ['OpHotList','OpnewList','OpfowList','hotIndex','newIndex','fowIndex'],
  },
});
