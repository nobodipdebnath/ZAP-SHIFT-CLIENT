import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import HomePage from "../Pages/HomePage";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../components/AuthComponents/SignIn";
import Register from "../components/AuthComponents/Register";
import ForgotPassword from "../components/AuthComponents/ForgotPassword";
import Loading from "../components/Shared/Loading";
import Coverage from "../Pages/Coverage";
import ErrorPage from "../Pages/ErrorPage";
import PrivetRoutes from "./PrivetRoutes";
import SandAParcel from "../Pages/SandAParcel";
import AboutPage from "../Pages/AboutPage";
import AboutLayout from "../Layout/AboutLayout";
import Story from "../components/About/Story";
import Mission from "../components/About/Mission";
import Success from "../components/About/Success";
import Team from "../components/About/Team";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MyParcels from "../components/Dashboard/MyParcels/MyParcels";
import Payment from "../components/Dashboard/Payment/Payment";
import PaymentHistory from "../components/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../components/Dashboard/TrackParcel/TrackParcel";

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
            },
            {
                path: 'sendParcel',
                element: <PrivetRoutes>
                    <SandAParcel></SandAParcel>
                </PrivetRoutes>,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: 'about',
                Component: AboutLayout,
                children: [
                    {
                        index: true,
                        Component: Story
                    },
                    {
                        path: '/about/mission',
                        Component: Mission
                    },
                    {
                        path: '/about/success',
                        Component: Success
                    },
                    {
                        path: '/about/team',
                        Component: Team
                    }
                ]
            },
            {
                path: '*',
                Component: ErrorPage
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
    },
    {
        path: 'dashboard',
        element: <PrivetRoutes>
            <DashBoardLayout></DashBoardLayout>
        </PrivetRoutes>,
        children: [
            {
                path: 'myParcels',
                Component: MyParcels
            },
            {
                path: 'payment/:id',
                Component: Payment
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'trackParcel',
                Component: TrackParcel
            }
        ]
    }
]);

export default router;