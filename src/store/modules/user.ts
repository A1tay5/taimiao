import { loginPassword } from '@/api';
import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';

const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  token: string;
  info: Record<any, any>;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    token: token,
    info: {
      userType: 0,
      // 普通用户
      useridx: '63037325',
      // 超管
      // useridx: '62886125',
    },
    authorList: [
      {
        column1: 54970277,
        pos: 3,
        roomid: 51139398,
        useridx: 54970277,
        gender: 0,
        serverid: 2,
        lrcurrent: 10,
        allnum: 610,
        userid: '54970277',
        myname: '90s.พยอมมมม',
        signatures: '😴😴😴',
        rate: 'https://img.winnine.com.au/pic/rate//MCat.png',
        smallpic: 'https://img.winnine.com.au/pic/avator/2023-07/26/22/20230726221558_54970277_250.png',
        bigpic: 'https://img.winnine.com.au/pic/avator/2023-07/26/22/20230726221558_54970277_640.png',
        gps: '',
        flv: 'http://hdl.mlive.in.th/live/35ccbfd03eaba626607a586cf6660f23.flv',
        starlevel: 2,
        familyname: '90s Angel Club',
        stardate: '8/8/2023 8:36:05 AM',
        issign: 1,
        nation: '',
        nationflag: '',
        islock: 0,
        gameid: 0,
      },
      {
        column1: 64356660,
        pos: 4,
        roomid: 64356660,
        useridx: 64356660,
        gender: 0,
        serverid: 1,
        lrcurrent: 6,
        allnum: 257,
        userid: '64356660',
        myname: 'RerunLuckygames',
        signatures: '',
        rate: 'https://img.winnine.com.au/pic/rate//MCat.png',
        smallpic: 'https://img.winnine.com.au/pic/avator/2023-07/27/18/20230727180857_64356660_250.png',
        bigpic: 'https://img.winnine.com.au/pic/avator/2023-07/27/18/20230727180857_64356660_640.png',
        gps: '',
        flv: 'http://hdl.mlive.in.th/live/cf69418b5855238e4f10a7cbb2787ab7.flv',
        starlevel: 1,
        familyname: '',
        stardate: '8/8/2023 8:40:40 AM',
        issign: 1,
        nation: '',
        nationflag: '',
        islock: 0,
        gameid: 0,
      },
      {
        column1: 50056331,
        pos: 5,
        roomid: 66508020,
        useridx: 50056331,
        gender: 0,
        serverid: 5,
        lrcurrent: 7,
        allnum: 424,
        userid: '50056331',
        myname: '[90s]บบ🫧🌈',
        signatures: 'ขอบคุณสำหรับทุกอย่างนะคะ.🥲',
        rate: 'https://img.winnine.com.au/pic/rate//MCat.png',
        smallpic: 'https://img.winnine.com.au/pic/avator/2022-11/12/11/20221112110922_50056331_250.png',
        bigpic: 'https://img.winnine.com.au/pic/avator/2022-11/12/11/20221112110922_50056331_640.png',
        gps: 'From M Star',
        flv: 'http://hdl.mlive.in.th/live/a2dc7a5816f9956254f52dc5377b8578.flv',
        starlevel: 3,
        familyname: '90s club',
        stardate: '8/8/2023 9:20:52 AM',
        issign: 1,
        nation: '',
        nationflag: '',
        islock: 0,
        gameid: 0,
      },
    ],
    targetIndex: 2,
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : '';
    },
    login() {
      return new Promise((resolve) => {
        loginPassword().then((res) => {
          this.setInfo(res);
          resolve(res);
        });
      });
    },
  },
  persist: {
    key: 'token',
    storage: localStorage,
    paths: ['token'],
  },
});
