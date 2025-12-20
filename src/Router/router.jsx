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
import PendingRaider from "../components/Dashboard/PendingRaider/PendingRaider";
import BeARaider from "../Pages/BeARaider";
import ActiveRider from "../components/Dashboard/ActiveRider/ActiveRider";
import MakeAdmin from "../components/Dashboard/MakeAdmin/MakeAdmin";
import Dashboard from "../components/Dashboard/DashboardHome/DashboardHome";
import Profile from "../components/Dashboard/Profile/Profile";
import Forbidden from "../components/Dashboard/Forbidden/Forbidden";
import AdminRoute from "./AdminRoute";
import AssignRider from "../components/Dashboard/AssignRider/AssignRider";
import PendingDeliveries from "../components/Dashboard/PendingDeliveries/PendingDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../components/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../components/Dashboard/MyEarnings/MyEarnings";
import Pricing from "../Pages/Pricing";

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
                path: 'forbidden',
                Component: Forbidden
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
                path: 'beARider',
                element: <PrivetRoutes>
                    <BeARaider></BeARaider>
                </PrivetRoutes>,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: 'pricing',
                element: <PrivetRoutes>
                    <Pricing></Pricing>
                </PrivetRoutes>,
                loader: () => fetch('./warehouses.json')
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
            },
            {
                path: 'pendingRider',
                element: <AdminRoute>
                    <PendingRaider></PendingRaider>
                </AdminRoute>
            },
            {
                path: 'activeRider',
                element: <AdminRoute>
                    <ActiveRider></ActiveRider>
                </AdminRoute>
            },
            {
                path: 'makeAdmin',
                element: <AdminRoute>
                    <MakeAdmin></MakeAdmin>
                </AdminRoute>
            },
            {
                index: true,
                Component: Dashboard
            },
            {
                path: 'profile',
                Component: Profile
            },
            {
                path: 'assignRider',
                element: <AdminRoute>
                    <AssignRider></AssignRider>
                </AdminRoute>
            },
            {
                path: 'pendingDelivery',
                element: <RiderRoute>
                    <PendingDeliveries></PendingDeliveries>
                </RiderRoute>
            },
            {
                path: 'completedDelivery',
                element: <RiderRoute>
                    <CompletedDeliveries></CompletedDeliveries>
                </RiderRoute>
            },
            {
                path: 'myEarnings',
                element: <RiderRoute>
                    <MyEarnings></MyEarnings>
                </RiderRoute>
            }
        ]
    }
]);

export default router;