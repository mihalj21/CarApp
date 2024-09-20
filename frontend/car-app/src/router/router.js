import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/homePage";
import { Root } from "../pages/Root";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />, 
      children: [
        {
          path: "/", 
          element: <HomePage /> 
        },
      ]
    }
  ]);