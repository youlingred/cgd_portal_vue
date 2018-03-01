const details =()=>import( './details')
const dealnoticeprocurement =()=>import( './dealnoticeprocurement')

export default [
    //FIXME 成交通知书管理
    {
      path: 'dealnoticeprocurement-sale',
      name: 'dealnoticeprocurement2',
      component: dealnoticeprocurement
    },
    {
      path: 'details/:type/:id',
      name: 'details',
      component: details
    },
];
