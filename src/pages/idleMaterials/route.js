const idleMaterialsIndex =()=>import('./imIndex')
const idleMaterialsDetail =()=>import('./imDetail')

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
