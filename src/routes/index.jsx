import MainLayout from '@layouts/MainLayout';
import Drag from '@pages/Drag';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Todo from '@pages/Todo';

const routes = [
  {
    path: '/',
    name: 'Todo',
    protected: false,
    component: Todo,
    // layout: MainLayout,
  },
  {
    path: '/home',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/coba',
    name: 'Coba',
    protected: false,
    component: Drag,
    // layout: MainLayout,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
