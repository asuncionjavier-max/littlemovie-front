import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import MovieDetailPage from "../Pages/MovieDetailPage/MovieDetailPage";
import Layout from "../components/Layout/Layout";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage/> },
            {path: "/movies/:movieId", element: <MovieDetailPage />},
            {path: "/login", element: <Login />}
        ]
    }
]);

function AppRouter () {
    return <RouterProvider router={router} />
}

export default AppRouter;