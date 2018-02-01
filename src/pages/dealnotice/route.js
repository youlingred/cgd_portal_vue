import details from './details'
import dealnoticeprocurement from './dealnoticeprocurement'

export default [
    //FIXME 成交通知书管理
    {
      path: 'dealnoticeprocurement',
      name: 'dealnoticeprocurement',
      component: dealnoticeprocurement
    },
    {
      path: 'details/:type/:id',
      name: 'details',
      component: details
    },
];
