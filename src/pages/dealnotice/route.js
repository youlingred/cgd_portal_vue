const details =()=>import( './details')
const dealnoticeprocurement =()=>import( './dealnoticeprocurement')

export default [
    //FIXME 成交通知书管理
    {
      path: 'dealnoticeprocurement',
      name: 'dealnoticeprocurement1',
      component: dealnoticeprocurement
    },
    {
      path: 'details/:type/:id',
      name: 'details1',
      component: details
    },
];
