import React from "react";
import { Link, Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";
import logo from "../assets/logo.png";
import {
  HiHome,
  HiClipboardList,
  HiCreditCard,
  HiLocationMarker,
  HiUserCircle,
} from "react-icons/hi";
import { MdPending } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaStudiovinari } from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { Wallet } from "lucide-react";

const DashBoardLayout = () => {
  const { user } = useAuth();
  const { role, authLoading } = useUserRole();

  const links = (
    <>
      <Link to="/dashboard">
        <li className="flex items-center hover:bg-gray-100 duration-500 gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium">
          <HiHome className="text-xl" /> Home
        </li>
      </Link>

      <Link to="/dashboard/myParcels">
        <li className="flex items-center hover:bg-gray-100 duration-500 gap-2 w-full py-2 border rounded-lg px-5 border-input-text  font-medium">
          <HiClipboardList className="text-xl" /> My Parcel
        </li>
      </Link>

      <Link to="/dashboard/paymentHistory">
        <li className="flex items-center hover:bg-gray-100 duration-500 gap-2 w-full py-2 border rounded-lg px-5 border-input-text  font-medium">
          <HiCreditCard className="text-xl" />
          Payment History
        </li>
      </Link>

      <Link to="/dashboard/trackParcel">
        <li className="flex items-center hover:bg-gray-100 duration-500 gap-2 w-full py-2 border rounded-lg px-5 border-input-text  font-medium">
          <HiLocationMarker className="text-xl" />
          Track Parcel
        </li>
      </Link>
      {/* Admin link */}
      {!authLoading && role === "admin" && (
        <>
          <Link to="/dashboard/pendingRider">
            <li className="flex items-center hover:bg-gray-100 duration-500 gap-2 w-full py-2 border rounded-lg px-5 border-input-text  font-medium">
              <MdPending className="text-xl" />
              Pending Rider
            </li>
          </Link>

          <Link to="/dashboard/activeRider">
            <li className="flex items-center hover:bg-gray-100 duration-500 gap-2 w-full py-2 border rounded-lg px-5 border-input-text  font-medium">
              <RiMotorbikeFill className="text-xl" />
              Active Rider
            </li>
          </Link>

          <Link to="/dashboard/makeAdmin">
            <li className="flex items-center hover:bg-gray-100 duration-500 gap-2 w-full py-2 border rounded-lg px-5 border-input-text  font-medium">
              <FaStudiovinari className="text-xl" />
              Make Admin
            </li>
          </Link>

          <Link to="/dashboard/assignRider">
            <li className="flex items-center hover:bg-gray-100 duration-500 gap-2 w-full py-2 border rounded-lg px-5 border-input-text  font-medium">
              <MdAssignmentTurnedIn className="text-xl" />
              Assign Rider
            </li>
          </Link>
        </>
      )}
      {/* Rider Link */}
      {!authLoading && (role === "rider") && (
        <>
          <Link to="/dashboard/pendingDelivery">
            <li className="flex items-center gap-3 w-full py-3 px-5 border border-input-text rounded-lg font-medium hover:bg-gray-100 transition duration-300 cursor-pointer">
              <MdOutlinePendingActions className="text-xl" />
              <span>Pending Delivery</span>
            </li>
          </Link>
          <Link to="/dashboard/completedDelivery">
            <li className="flex items-center gap-3 w-full py-3 px-5 border border-input-text rounded-lg font-medium hover:bg-gray-100 transition duration-300 cursor-pointer">
              <GrCompliance className="text-xl" />
              <span>Completed Delivery</span>
            </li>
          </Link>
          <Link to="/dashboard/myEarnings">
            <li className="flex items-center gap-3 w-full py-3 px-5 border border-input-text rounded-lg font-medium hover:bg-gray-100 transition duration-300 cursor-pointer">
              <Wallet className="text-xl" />
              <span>My Earnings</span>
            </li>
          </Link>
        </>
        
      )}

      <Link to="/dashboard/profile">
        <li className="flex items-center hover:bg-gray-100 duration-500 gap-2 w-full py-2 border rounded-lg px-5 border-input-text  font-medium">
          <HiUserCircle className="text-xl" />
          Profile
        </li>
      </Link>
    </>
  );

  // console.log(user);
  // const links = [
  //   {
  //     path: "/home",
  //     text: "Home",
  //     icon: <HiHome className="text-xl" />,
  //   },
  //   {
  //     path: "/dashboard/myParcels",
  //     text: "My Parcels",
  //     icon: <HiClipboardList className="text-xl" />,
  //   },
  //   {
  //     path: "/dashboard/paymentHistory",
  //     text: "Payment History",
  //     icon: <HiCreditCard className="text-xl" />,
  //   },
  //   {
  //     path: "/dashboard/trackParcel",
  //     text: "Track Parcel",
  //     icon: <HiLocationMarker className="text-xl" />,
  //   },
  //   {
  //     path: "/dashboard/pendingRider",
  //     text: "Pending Raider",
  //     icon: <MdPending className="text-xl" />,
  //   },
  //   {
  //     path: "/dashboard/activeRider",
  //     text: "Active Raider",
  //     icon: <RiMotorbikeFill className="text-xl" />,
  //   },
  //   {
  //     path: "/dashboard/makeAdmin",
  //     text: "Make Admin",
  //     icon: <FaStudiovinari className="text-xl" />,
  //   },
  //   {
  //     path: "/dashboard/profile",
  //     text: "Profile",
  //     icon: <HiUserCircle className="text-xl" />,
  //   },
  // ];
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <div className="navbar lg:bg-base-300 lg:hidden w-full">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dash Board</div>
        </div>
        {/*  */}
        <div className="m-10 mt-6">
          <div className="py-4 mb-8 flex items-center justify-between px-10 bg-white rounded-xl">
            <div>
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="flex items-center gap-2 ">
              <img className="h-14 w-14 rounded-full border-4 object-cover border-green-400" src={user.photoURL} alt="" />
            </div>
          </div>
          <Outlet></Outlet>
        </div>
        {/*  */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="  bg-white min-h-full w-[80%] md:w-[300px] p-4">
          <div>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            {/* {links.map((link, idx) => {
              return (
                <Link
                  to={link.path}
                  className="py-2 px-5 border-input-text rounded-lg  w-full border"
                  key={idx}
                >
                  <li className="flex items-center gap-3">
                    {" "}
                    {link.icon}
                    {link.text}
                  </li>
                </Link>
              );
            })} */}
            {links}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
