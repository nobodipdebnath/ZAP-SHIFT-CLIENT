import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import HomePage from "../Pages/HomePage";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../components/AuthComponents/SignIn";

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
                path: '/signUp',
                Component: SignIn
            }
        ]
    }
]);

export default router;