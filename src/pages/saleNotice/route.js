import saleNoticeIndex from './snIndex'
import saleNoticeDetail from './snDetail'

export default [
  //FIXME 销售公告查询
  {
    path: 'saleNoticeDetail/:id',
    name: 'saleNoticeDetail',
    component: saleNoticeDetail
  },
  {
    path: 'saleNoticeIndex',
    name: 'saleNoticeIndex',
    component: saleNoticeIndex
  },
];
