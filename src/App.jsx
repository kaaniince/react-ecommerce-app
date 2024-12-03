import { useState } from "react";
import "./App.css";
import Products from "./containers/Products/ProductList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./containers/Products/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/products/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/",
    element: <Products />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}>
        {/* <div>
          <a href="/product">Home</a>
        </div>
        <div>
          <Products />
        </div> */}
      </RouterProvider>
    </div>
  );
}

export default App;
