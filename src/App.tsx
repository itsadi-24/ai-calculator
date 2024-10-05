import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import '../src/index.css';
import Home from './screens/home/Home';

const paths = [
  {
    path: '/',
    element: <Home />,
  },
];

const BrowserRouter = createBrowserRouter(paths);

const App = () => {
  return (
    <MantineProvider>
      <RouterProvider router={BrowserRouter} />
    </MantineProvider>
  );
};

export default App;
