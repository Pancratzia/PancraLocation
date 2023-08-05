import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Config from "./pages/config/Config";
import Home from "./pages/home/Home";
import "./assets/global.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";


function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/config",
          element: <Config />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;