import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import MovieDetailPage from "../Pages/MovieDetailPage/MovieDetailPage";
import Layout from "../components/Layout/Layout";
import Login from "../Pages/Login/Login";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import Register from "../Pages/Register/Register";
import MoviePage from "../Pages/MoviePage/MoviePage";
import CartPage from "../Pages/CartPage/CartPage";
import AdminRoute from "../components/AdminRoute/AdminRoute";
import AdminPage from "../Pages/AdminPage/AdminPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import AboutUs from "../Pages/AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/movies/:movieId", element: <MovieDetailPage /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/register", element: <Register /> },
      { path: "/movies", element: <MoviePage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/about", element: <AboutUs /> },

      {
        element: <AdminRoute />,
        children: [{ path: "/admin", element: <AdminPage /> }],
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
