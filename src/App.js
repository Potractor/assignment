import './App.css';
import Products from './pages/Products';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Favourites from './pages/Favourites';
import Login from './pages/Login';
function App() {
  const router = createBrowserRouter( [
    {
      path: "/",
      Component: Layout,
      children: [
        {index: true , Component: Products},
        {path: "favourites", Component: Favourites},
        // {path: "cart", Component: Orders}, 
        // {path: "products",
        //   children: [
        //     {
        //       path: ":productId",Component:ProductDetail
        //     }
        //   ]
        // }
      ]
    },
    {path: "/login",
      Component: Login
    }
  ])
  return (
    <RouterProvider router = {router}>
    </RouterProvider>
  );
}

export default App;
