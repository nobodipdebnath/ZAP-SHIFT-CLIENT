import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { Link, Links } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth(); // firebase user
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState([]);
  const [completed, setCompleted] = useState([]);
  console.log(completed);

  const totalParcels = stats.length;
  const inTransit = stats.filter(
    (p) => p.delivery_status === "in_transit"
  ).length;
  const delivered = stats.filter(
    (p) => p.delivery_status === "delivered"
  ).length;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}/role`)
        .then((res) => {
          setProfile(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });

      // Fetch user statistics
      axiosSecure
        .get(`/parcels`)
        .then((res) => {
          setStats(res.data);
        })
        .catch((err) => {
          console.error(err);
        });

      axiosSecure
        .get("/rider/completed-parcels")
        .then((res) => {
          setCompleted(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-600 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  // ====== New function for human-friendly "days ago" ======
  function daysAgo(isoDate) {
    if (!isoDate) return "Delivery pending";

    const delivered = new Date(isoDate);
    const today = new Date();

    delivered.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today - delivered) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} day ago`;
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week ago`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-80">
            <img
              className="w-full h-full object-cover"
              src="https://i.ibb.co.com/q3gmmh6N/banner2.png"
              alt="Profile Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>

          <div className="absolute top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-4">
            <div className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative group shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                  <img
                    src={profile?.photo || user?.photoURL}
                    alt="Profile"
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                <div className="flex-1 space-y-6 text-center md:text-left w-full">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {profile?.name || user?.displayName}
                    </h2>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm md:text-base">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-lg transition duration-300">
                      <p className="text-green-600 text-xs font-semibold uppercase tracking-wide mb-1">
                        Phone
                      </p>
                      <p className="text-gray-800 font-semibold text-lg">
                        {profile?.phone || "Not Added"}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition duration-300">
                      <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">
                        Role
                      </p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-semibold shadow-md">
                        {profile?.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <button className="w-full sm:w-auto group relative px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 overflow-hidden">
                      <span className="relative z-10">Edit Profile</span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-700 to-blue-700 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    </button>
                    <Link to="/sendParcel" className="w-full sm:w-auto">
                      <button className="w-full px-8 py-3 rounded-xl bg-white text-gray-800 font-semibold border-2 border-gray-300 hover:border-green-600 hover:text-green-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-300">
                        Add a Parcel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Total Parcels
                </p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {totalParcels}
                </h3>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Pending
                </p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {inTransit}
                </h3>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Delivered
                </p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {delivered}
                </h3>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Total Spent
                </p>
                <h3 className="text-3xl font-bold text-gray-800">
                  ${stats.totalSpent}
                </h3>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="border-b border-gray-200">
            <div className="flex gap-2 p-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                  activeTab === "activity"
                    ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                  activeTab === "settings"
                    ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Settings
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Account Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">
                        Member Since
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {profile?.created_at || "January 2024"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">
                        Account Status
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">
                        Location
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {profile?.location || "Not Set"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">
                        Preferred Language
                      </span>
                      <span className="text-gray-800 font-semibold">
                        English
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {completed.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          Parcel # {item.title} delivered
                        </p>
                        <p className="text-sm text-gray-500">
                          {daysAgo(item.delivered_at)}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Completed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Email Notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Receive updates about your parcels
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800">
                        SMS Notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Get text updates on your phone
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500">
                        Add extra security to your account
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition duration-300">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
