const dylyIndex = () => import( './dylyIndex')
const test = () => import( './test')
const reset = () => import( './reset')
const tabs = () => import( './tabs')
const detail = () => import( './detail')
const list = () => import( './list')
const edit = () => import( './edit')

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
    path: 'detail/:type/:id',
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
