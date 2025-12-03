import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import HomePage from "../Pages/HomePage";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../components/AuthComponents/SignIn";
import Register from "../components/AuthComponents/Register";
import ForgotPassword from "../components/AuthComponents/ForgotPassword";
import Loading from "../components/Shared/Loading";
import Coverage from "../Pages/Coverage";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        hydrateFallbackElement: <Loading></Loading>,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path:'coverage',
                Component: Coverage,
                loader: ()=> fetch('./warehouses.json')
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        hydrateFallbackElement: <Loading></Loading>,
        children: [
            {
                path: '/login',
                Component: SignIn
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'forgotPassword',
                Component: ForgotPassword
            }
        ]
    }
]);

export default router;