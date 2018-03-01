const details =()=>import( './details')
const dealnoticeprocurementP =()=>import( './dealnoticeprocurementP')
const dealnoticeprocurementS =()=>import( './dealnoticeprocurementS')

export default [
    //FIXME 成交通知书管理
    {
      path: 'dealnoticeprocurementP',
      name: 'dealnoticeprocurement1',
      component: dealnoticeprocurementP
    },
    {
      path: 'dealnoticeprocurementS',
      name: 'dealnoticeprocurement2',
      component: dealnoticeprocurementS
    },
    {
      path: 'details/:type/:id',
      name: 'details',
      component: details
    },
];
