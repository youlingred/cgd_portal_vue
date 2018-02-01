import spublicdetails from './spublicdetails'
import spubliclist from './spubliclist'

export default [
  //FIXME 单一来源公示采购公告
  {
    path: 'spublicdetails',
    name: 'spublicdetails',
    component: spublicdetails
  },
  {
    path: 'spubliclist',
    name: 'spubliclist',
    component: spubliclist
  },
];
