const spublicdetails =()=>import( './spublicdetails')
const spubliclist =()=>import( './spubliclist')

export default [
  //FIXME 单一来源公示采购公告
  {
    path: 'spublicdetails/:publicityId/:publicityObjectionId',
    name: 'spublicdetails',
    component: spublicdetails
  },
  {
    path: 'spubliclist',
    name: 'spubliclist',
    component: spubliclist
  },
];
