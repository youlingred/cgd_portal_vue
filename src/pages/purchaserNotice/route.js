const purchaserNoticeIndex =()=>import( '@/pages/purchaserNotice/pnIndex')
const purchaserNoticeDetail =()=>import( '@/pages/purchaserNotice/pnDetail')

export default [
    //FIXME 采购公告管理
    {
      path:'purchaserNoticeDetail/:type/:id/:seq',
      name: 'purchaserNoticeDetail',
      component: purchaserNoticeDetail
    },
    {
      path:'purchaserNoticeIndex',
      name: 'purchaserNoticeIndex',
      component: purchaserNoticeIndex
    },
];
