export const routes = [
  {
    path: '/',
    redirect: '/home',
    name:'BasicLayoutPage',
    component: () => import('@/layout/basic/index.vue'),
    meta:
    {keepAlive:true},
    children: [
      {
        name:'home',
        path: 'home', //首页
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'tabbar.home',
          keepAlive: true,
        },
      },
      {
        name:'focus',
        path: 'focus', //关注
        component: () => import('@/views/focus/index.vue'),
        meta: {
          title: 'tabbar.list',
          keepAlive: true,
        },
      },
      {
        name:'my',
        path: 'my', //我的
        component: () => import('@/views/my/index.vue'),
        meta: {
          title: 'tabbar.member',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
  {
    name: 'details', //直播间
    path: '/details',
    component: () => import('@/views/author-detail/index.vue'),
    meta: {
      title: 'list.details',
      border: false,
    },
  },
  {
    name: 'openfans', //视频
    path: '/openfans',
    component: () => import('@/views/opFans/index1.vue'),
    meta: {
      // title: 'list.details',
      border: false,
    },
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/search/index.vue'),
    meta: {
      title: '搜索',
    },
  },
  {
    name: 'opfansSearch',
    path: '/opsearch',
    component: () => import('@/views/opFans/search.vue'),
    meta: {
      title: '搜索',
    },
  },
  {
    name: 'rank',
    path: '/rank',
    component: () => import('@/views/rank/index.vue'),
    meta: {
      title: 'Weekly Rank',
    },
  },
  {
    name: 'mycol',
    path: '/mycol',
    component: () => import('@/views/myCollect/index.vue'),
    meta: {
      title: 'mycol',
    },
  },
  {
    name: 'Agreement',
    path: '/Agreement',
    component: () => import('@/views/Agreement/index.vue'),
    meta: {
      title: 'Agreement',
    },
  },
  // 匹配不到重定向会主页
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: '/Home',
  },
];

export default routes;
