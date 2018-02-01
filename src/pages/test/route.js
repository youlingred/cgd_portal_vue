import dylyIndex from './dylyIndex';
import test from './test'
import reset from './reset'
import tabs from './tabs'
import detail from './detail'
import list from './list'
import edit from './edit'

export default [
  //FIXME 测试
  {
    path: 'dylyIndex',
    name: 'dylyIndex',
    component: dylyIndex
  },
  {
    path: 'test',
    name: 'test',
    component: test
  },
  {
    path: 'reset',
    name: 'reset',
    component: reset
  },
  {
    path: 'tabs',
    name: 'tabs',
    component: tabs
  },
  {
    path: 'detail',
    name: 'detail',
    component: detail
  },
  {
    path: 'list',
    name: 'list',
    component: list
  },
  {
    path: 'edit',
    name: 'edit',
    component: edit
  },
];
