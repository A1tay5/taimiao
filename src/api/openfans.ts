import service from '@/utils/request';


export function openList(data:any) {
  return service({
    method: 'get',
    url: `/Vdo/GetVideoStreamList`,
    params:data
  });
}
export function SearchVideoList(data:any) {
  return service({
    method: 'get',
    url: `/Vdo/GetSearchVideoStreamList`,
    params:data
  });
}
//收藏视频
export function CollectVideo(data:any) {
  return service({
    method: 'post',
    url: `/Vdo/CollectVideo`,
    data
  });
}
//收藏视频列表
export function CollectVideoStreamList(data:any) {
  return service({
    method: 'get',
    url: `/Vdo/GetCollectVideoStreamList`,
    params:data
  });
}
//获取该视频收藏信息
export function IsCollect(data:any) {
  return service({
    method: 'post',
    url: `/Vdo/IsCollect`,
    data
  });
}
// 购买视频
export function BuyVideo(data:any) {
  return service({
    method: 'post',
    url: `/Vdo/BuyVideo`,
    data
  });
}

// 我购买的视频列表
export function MyBuyVideoList(data:any) {
  return service({
    method: 'get',
    url: `/Vdo/GetMyBuyVideoList`,
    params:data
  });
}

// 获取视频信息
export function VideoInfo(data:any) {
  return service({
    method: 'post',
    url: `/Vdo/GetVideoInfo`,
    data
  });
}