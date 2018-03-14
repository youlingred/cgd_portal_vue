const details =()=>import( './details')
const dealnoticeprocurement =()=>import( './dealnoticeprocurement')

export default [
    //FIXME 成交通知书管理
    {
      path: 'dealnoticeprocurement',
      name: 'dealnoticeprocurement',
      component: dealnoticeprocurement
    },
    {
      path: 'dealnoticeDetails/:type/:id',
      name: 'dealnoticeDetails',
      component: details
    },
];
