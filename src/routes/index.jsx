import { Navigate } from 'react-router-dom';
import { Default } from '../pages/Default';
import Home from '../pages/Home';

export default [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/plus',
    element: <Navigate to='/products/plus' />,
  },
  {
    path: '/pair',
    element: <Navigate to='/products/pair' />,
  },
  {
    path: '/ask',
    element: <Navigate to='/products/ask' />,
  },
  {
    path: '/products',
    element: <Default />,
    children: [
      {
        path: '',
        element: <Navigate to='/products/ask' />,
      },
      {
        path: 'ask',
        element: <></>,
      },
      {
        path: 'pair',
        element: <></>,
      },
      {
        path: 'plus',
        element: <></>,
      },
    ],
  },
];
