export const routes = [
  { path: '/', redirect: {name: 'logout'} },
  { path: '/auth', name: 'logout', component: () => import('../pages/auth.vue') },
  { path: '/admin', component: () => import('../pages/admin.vue'),
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import('../pages/welcome.vue'),
      },
      {
        path: 'user/info',
        name: 'userInfo',
        component: () => import('../pages/user-info.vue'),
      },
      {
        path: 'current',
        name: 'admin',
        component: () => import('../pages/components/current/index.vue'),
        children: [
          {
            path: ':callId/:clientId',
            name: 'current-detail',
            component: () => import('../pages/components/current/right-main.vue')
          }
        ]
      },
      {
        path: 'customer',
        component: () => import('../route-middleware.vue'),
        redirect: { name: 'customerList' },
        children: [
          {
            path: 'list',
            name: 'customerList',
            component: () => import('../pages/components/customer/index.vue'),
            redirect: { name: 'myCustomerList' },
            children: [
              {
                path: 'my',
                name: 'myCustomerMiddle',
                redirect: { name: 'myCustomerList' },
                component: () => import('../route-middleware.vue') ,
                children: [
                  {
                    path: 'list',
                    name: 'myCustomerList',
                    component: () => import('../pages/components/customer/my-customer.vue'),
                  },
                  {
                    path: 'new',
                    name: 'newMember',
                    component: () => import('../pages/components/customer/new-customer.vue')
                  },
                  {
                    path: 'detail/:clientId',
                    name: 'member',
                    component: () => import('../pages/components/current/right-main.vue')
                  },
                ]
              },
              {
                path: 'pool',
                name: 'poolCustomerList',
                component: () => import('../pages/components/customer/pool-customer.vue'),
              },
            ]
          }
        ]
      },
      {
        path: 'statistics',
        component: () => import('../pages/components/statistics/index.vue'),
        redirect: { name: 'costStatistics' },
        children: [
          {
            path: 'cost',
            name: 'costStatistics',
            component: () => import('../pages/components/statistics/cost-statistics.vue'),
          },
          {
            path: 'call',
            name: 'callStatistics',
            component: () => import('../pages/components/statistics/call-statistics.vue'),
          },
        ]
      },
      {
        path: 'banquet',
        component: () => import('../pages/components/banquet/index.vue'),
        children: [
          {
            path: ':skillName',
            redirect: { name: 'banquetList' },
            component: () => import('../route-middleware.vue'),
            children: [
              {
                path: 'list',
                name: 'banquetList',
                component: () => import('../pages/components/banquet/banquet-list.vue'),
              },
              {
                path: 'list/:id',
                name: 'banquetDetail',
                component: () => import('../pages/components/banquet/banquet-detail.vue'),
              },
            ]
          },
        ]
      },
    ]
  }
]
