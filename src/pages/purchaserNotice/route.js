import purchaserNoticeIndex from '@/pages/purchaserNotice/pnIndex'
import purchaserNoticeDetail from '@/pages/purchaserNotice/pnDetail'

export default [
    //FIXME 采购公告管理
    {
      path:'purchaserNoticeDetail/:type/:id',
      name: 'purchaserNoticeDetail',
      component: purchaserNoticeDetail
    },
    {
      path:'purchaserNoticeIndex',
      name: 'purchaserNoticeIndex',
      component: purchaserNoticeIndex
    },
];
