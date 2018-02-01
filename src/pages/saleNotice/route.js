const saleNoticeIndex =()=>import( './snIndex')
const saleNoticeDetail =()=>import( './snDetail')

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
