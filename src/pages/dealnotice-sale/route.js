const details =()=>import( './details')
const dealnoticeprocurement =()=>import( './dealnoticeprocurement')

export default [
    //FIXME 成交通知书管理
    {
      path: 'saleDealnoticeprocurement',
      name: 'saleDealnoticeprocurement',
      component: dealnoticeprocurement
    },
    {
      path: 'saleDealnoticeDetails/:id',
      name: 'saleDealnoticeDetails',
      component: details
    },
];
