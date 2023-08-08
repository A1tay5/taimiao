import service from '@/utils/request';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return service({
    method: 'get',
    url: `/grade/rank`,
    params: {
      uid: '707215947',
    },
  });
}
