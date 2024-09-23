import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/homePage";
import { Root } from "../pages/Root";
import { AddVehiclePage } from "../pages/AddPage/addPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />, 
      children: [
        {
          path: "/", 
          element: <HomePage /> 
        },
        {
            path: 'add-vehicle',
            element: <AddVehiclePage />
          }
      ]
    }
  ]);