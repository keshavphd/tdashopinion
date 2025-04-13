import Applayout from "./assets/Applayout";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Dasboard from "./pages/Dasboard";

import ScrollToTop from "./pages/TopOfPage";
import NewReferals from "./pages/NewReferals";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
      <ScrollToTop/>,
      <Applayout />
      </>,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: ":userIds",
              element: <NewReferals />,
            },
            {
              path: "dasboard",
              element: <Dasboard />,
            },
         
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
