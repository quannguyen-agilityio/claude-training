import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BookProvider } from '@stores/book';
import Home from '@pages/Home';
import BookPage from '@pages/Book';
import AddPage from '@pages/Add';
import './index.css';
import EditPage from '@pages/Edit';
import NotFoundPage from '@pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:bookId',
    element: <BookPage />,
  },
  {
    path: '/add-new-book',
    element: <AddPage />,
  },
  {
    path: '/edit-book/:bookId',
    element: <EditPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <BookProvider>
      <RouterProvider router={router} />
    </BookProvider>
  );
}

export default App;
