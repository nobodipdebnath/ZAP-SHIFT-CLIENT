import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import logo from "../assets/logo.png";
import {
  HiHome,
  HiClipboardList,
  HiCreditCard,
  HiLocationMarker,
  HiUserCircle,
} from "react-icons/hi";
import { MdPending, MdAssignmentTurnedIn, MdOutlinePendingActions } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaStudiovinari } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { Wallet } from "lucide-react";
import useUserRole from "../Hooks/useUserRole";

const DashBoardLayout = () => {
  const { user } = useAuth();
  const { role, authLoading } = useUserRole();
  const location = useLocation();

  // Auto hide sidebar on route change
  useEffect(() => {
    const checkbox = document.getElementById("my-drawer-3");
    if (checkbox) checkbox.checked = false;
  }, [location.pathname]);

  const activeClass = "bg-[#CAEB66] text-black"; // active link style
  const defaultClass = "hover:bg-gray-100 duration-500";

  const links = (
    <>
      <NavLink
        to="/dashboard"
        end // ✅ exact match
        className={({ isActive }) =>
          `flex items-center gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium ${
            isActive ? activeClass : defaultClass
          }`
        }
      >
        <HiHome className="text-xl" /> Home
      </NavLink>

      <NavLink
        to="/dashboard/myParcels"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium ${
            isActive ? activeClass : defaultClass
          }`
        }
      >
        <HiClipboardList className="text-xl" /> My Parcel
      </NavLink>

      <NavLink
        to="/dashboard/paymentHistory"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium ${
            isActive ? activeClass : defaultClass
          }`
        }
      >
        <HiCreditCard className="text-xl" /> Payment History
      </NavLink>

      <NavLink
        to="/dashboard/trackParcel"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium ${
            isActive ? activeClass : defaultClass
          }`
        }
      >
        <HiLocationMarker className="text-xl" /> Track Parcel
      </NavLink>

      {!authLoading && role === "admin" && (
        <>
          <NavLink
            to="/dashboard/pendingRider"
            className={({ isActive }) =>
              `flex items-center gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <MdPending className="text-xl" /> Pending Rider
          </NavLink>

          <NavLink
            to="/dashboard/activeRider"
            className={({ isActive }) =>
              `flex items-center gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <RiMotorbikeFill className="text-xl" /> Active Rider
          </NavLink>

          <NavLink
            to="/dashboard/makeAdmin"
            className={({ isActive }) =>
              `flex items-center gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <FaStudiovinari className="text-xl" /> Make Admin
          </NavLink>

          <NavLink
            to="/dashboard/assignRider"
            className={({ isActive }) =>
              `flex items-center gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <MdAssignmentTurnedIn className="text-xl" /> Assign Rider
          </NavLink>
        </>
      )}

      {!authLoading && role === "rider" && (
        <>
          <NavLink
            to="/dashboard/pendingDelivery"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full py-3 px-5 border border-input-text rounded-lg font-medium transition duration-300 cursor-pointer ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <MdOutlinePendingActions className="text-xl" /> Pending Delivery
          </NavLink>

          <NavLink
            to="/dashboard/completedDelivery"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full py-3 px-5 border border-input-text rounded-lg font-medium transition duration-300 cursor-pointer ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <GrCompliance className="text-xl" /> Completed Delivery
          </NavLink>

          <NavLink
            to="/dashboard/myEarnings"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full py-3 px-5 border border-input-text rounded-lg font-medium transition duration-300 cursor-pointer ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <Wallet className="text-xl" /> My Earnings
          </NavLink>
        </>
      )}

      <NavLink
        to="/dashboard/profile"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full py-2 border rounded-lg px-5 border-input-text font-medium ${
            isActive ? activeClass : defaultClass
          }`
        }
      >
        <HiUserCircle className="text-xl" /> Profile
      </NavLink>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <div className="navbar w-full fixed top-0 z-50 bg-white lg:hidden">
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
          <div className="mx-2 flex-1 text-3xl font-extrabold text-green-blue px-2">Dash Board</div>
        </div>

        <div className="lg:m-10 mt-20">
          <div className="py-4 mb-8 flex items-center justify-between mx-5 lg:mx-0 px-5 lg:px-10 bg-white rounded-xl">
            <div>
              <NavLink to="/">
                <img src={logo} alt="" />
              </NavLink>
            </div>
            <div className="flex items-center gap-2 ">
              <img
                className="h-14 w-14 rounded-full border-4 object-cover border-green-400"
                src={user.photoURL}
                alt=""
              />
            </div>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="bg-white min-h-full w-[80%] md:w-[300px] p-4">
          <div>
            <NavLink to="/">
              <img src={logo} alt="" />
            </NavLink>
          </div>
          <div className="flex flex-col gap-2 mt-8">{links}</div>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
