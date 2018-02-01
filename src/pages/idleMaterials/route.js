import idleMaterialsIndex from '@/pages/idleMaterials/imIndex'
import idleMaterialsDetail from '@/pages/idleMaterials/imDetail'

export default [
    //FIXME 闲置物资管理
    {
      path:'idleMaterialsDetail/:type/:id',
      name: 'idleMaterialsDetail',
      component: idleMaterialsDetail
    },
    {
      path:'idleMaterialsIndex',
      name: 'idleMaterialsIndex',
      component: idleMaterialsIndex
    },
];
