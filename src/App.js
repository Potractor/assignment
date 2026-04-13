import './App.css';
import Products from './pages/Products';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Favourites from './pages/Favourites';
import Login from './pages/Login';
import ProductsList from './components/ProductsList';
import AutoComplete from './components/Autocomplete'
import InfiniteScroll from './components/InfiniteScroll';
import { useTheme } from './context/theme-context';
function App() {
  const {webTheme , toggleTheme}  = useTheme();
  console.log(webTheme)
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
    <div>
      <InfiniteScroll/>
      {/* <ProductsList/> */}
    </div>
    // <RouterProvider router = {router}>
    // </RouterProvider>
  );
}

export default App;
