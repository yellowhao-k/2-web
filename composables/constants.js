// 公司信息常量
export const COMPANY_INFO = {
  name: '跨境物流公司',
  phone: '400-123-4567',
  email: 'service@logistics.com',
  address: '中国广东省深圳市南山区科技园',
  logo: '/logo.png',
  wechat: 'logistics_service',
  wechatQR: '/images/wechat-qr.png',
  domain: 'https://yourdomain.com',


  /* ===== 业务关键词（SEO / JSON-LD 用） ===== */
  services: [
    'FBA头程物流',
    '国际海运',
    '国际空运',
    '海外仓一件代发',
    '双清包税'
  ],

  markets: [
    '美国',
    '加拿大',
    '英国',
    '德国',
    '法国',
    '澳大利亚'
  ]
}


export const navItems = [
  { name: '首页', path: '/' },
  { name: '业务范围', path: '/services' },
  { name: '客户案例', path: '/cases' },
  { 
    name: '资讯中心', 
    path: '/articles',
    children: [
      { name: '公司动态', path: '/articles/company' },
      { name: '行业新闻', path: '/articles/industry' },
      { name: '知识百科', path: '/articles/knowledge' }
    ]
  },
  { 
    name: '热门线路', 
    path: '/routes',
    children: [
      { name: '美国专线', path: '/routes/usa' },
      { name: '澳洲专线', path: '/routes/australia' },
      { name: '东南亚专线', path: '/routes/sea' }
    ]
  },
  { name: '关于我们', path: '/about' },
  { name: '联系我们', path: '/contact' },
  { name: '热门工具', path: '/tools' }
]

export const routes = [
  {
    name: '美国专线',
    description: '快速直达美国，时效稳定，价格优惠',
    path: '/routes/usa',
    features: ['7-15个工作日', '双清包税', '全程跟踪', '专业清关']
  },
  {
    name: '澳洲专线',
    description: '专业澳洲物流解决方案，服务完善',
    path: '/routes/australia',
    features: ['10-20个工作日', '包税服务', '安全可靠', '快速清关']
  },
  {
    name: '东南亚专线',
    description: '覆盖东南亚主要国家，物流网络完善',
    path: '/routes/sea',
    features: ['5-12个工作日', '多国覆盖', '价格优惠', '时效稳定']
  }
]


export const services = [
  {
    id: 'fba',
    name: 'FBA头程',
    description: '专业的FBA头程物流服务，快速安全送达亚马逊仓库',
    icon: '🚚',
    path: '/services/fba'
  },
  {
    id: 'air',
    name: '空运专线',
    description: '快速空运服务，时效稳定可靠，适合紧急货物',
    icon: '✈️',
    path: '/services/air'
  },
  {
    id: 'sea',
    name: '海运专线',
    description: '经济实惠的海运服务，适合大批量货物运输',
    icon: '🚢',
    path: '/services/sea'
  },
  {
    id: 'parcel',
    name: '电商小包',
    description: '专业的电商小包服务，快速便捷，价格优惠',
    icon: '📦',
    path: '/services/parcel'
  },
  {
    id: 'express',
    name: '快递专线',
    description: '门到门快递服务，全程跟踪，安全可靠',
    icon: '📮',
    path: '/services/express'
  },
  {
    id: 'warehouse',
    name: '海外仓一件代发',
    description: '海外仓储服务，支持一件代发，高效便捷',
    icon: '🏭',
    path: '/services/warehouse'
  },
  {
    id: 'clearance',
    name: '双清包税',
    description: '一站式清关服务，省心省力，价格透明',
    icon: '📋',
    path: '/services/clearance'
  },
  {
    id: 'truck',
    name: '欧洲卡航',
    description: '欧洲卡航专线，快速直达，时效稳定',
    icon: '🚛',
    path: '/services/truck'
  },
  {
    id: 'railway',
    name: '铁路专线',
    description: '中欧铁路专线，经济高效，适合大批量货物',
    icon: '🚂',
    path: '/services/railway'
  }
]

