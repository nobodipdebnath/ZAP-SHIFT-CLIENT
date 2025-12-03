import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import HomePage from "../Pages/HomePage";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../components/AuthComponents/SignIn";
import Register from "../components/AuthComponents/Register";
import ForgotPassword from "../components/AuthComponents/ForgotPassword";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: HomePage
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
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