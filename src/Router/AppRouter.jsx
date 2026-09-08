import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import MovieDetailPage from "../Pages/MovieDetailPage/MovieDetailPage";
import Layout from "../components/Layout/Layout";
import Login from "../Pages/Login/Login";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import Register from "../Pages/Register/Register";
import MoviePage from "../Pages/MoviePage/MoviePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage/> },
            {path: "/movies/:movieId", element: <MovieDetailPage />},
            {path: "/login", element: <Login />},
            {path: "/profile", element: <ProfilePage />},
            {path: "/register", element: <Register />},
            {path: "movies", element: <MoviePage />}
        ]
    }
]);

function AppRouter () {
    return <RouterProvider router={router} />
}

export default AppRouter;