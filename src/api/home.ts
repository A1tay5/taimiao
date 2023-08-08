import service from '@/utils/request';


export function homeTab() {
  return service({
    method: 'get',
    url: `/Room/GetHotTabList_H5`,
  });
}
export function AnchorList(data) {
  return service({
    method: 'get',
    url: `/Room/GetIndexAnchorList_H5`,
    params:data
  });
}
