import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [myParcels, setMyParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
  const email = user?.email;

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const res = await axiosSecure.get("/rider/parcels");
        setParcels(res.data);
      } catch (err) {
        console.error("Failed to fetch rider parcels:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParcels();
  }, [axiosSecure]);

  const { data: delivere = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcels?email=${email}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const res = await axiosSecure.get("/parcels");
        setMyParcels(res.data);
      } catch (err) {
        console.error("Failed to fetch parcels:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParcels();
  }, [axiosSecure]);

  // Assign Parcels
  const totalAssigned = parcels.length;
  const inTransit = parcels.filter(
    (p) => p.delivery_status === "in_transit"
  ).length;
  // const delivered = parcels.filter(
  //   (p) => p.delivery_status === "delivered"
  // ).length;

  // My Parcels
  const totalParcels = myParcels.length;
  const myParcelInTransit = myParcels.filter(
    (p) => p.delivery_status === "in_transit"
  ).length;
  const myParcelInDelivered = myParcels.filter(
    (p) => p.delivery_status === "delivered"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 sm:px-6 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Rider Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Manage your deliveries and track performance
          </p>
        </div>

        {/* Assigned Parcels Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-800">
              Assigned Parcels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-emerald-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-800 mb-2">
                {totalAssigned}
              </h3>
              <p className="text-slate-600 font-medium">Total Assigned</p>
            </div>

            <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-800 mb-2">
                {inTransit}
              </h3>
              <p className="text-slate-600 font-medium">In Transit</p>
            </div>

            <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-green-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-800 mb-2">
                {delivere.length}
              </h3>
              <p className="text-slate-600 font-medium">Delivered</p>
            </div>
          </div>
        </div>

        {/* My Parcels Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-800">My Parcels</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-indigo-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-800 mb-2">
                {totalParcels}
              </h3>
              <p className="text-slate-600 font-medium">Total Parcels</p>
            </div>

            <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-800 mb-2">
                {myParcelInTransit}
              </h3>
              <p className="text-slate-600 font-medium">In Transit</p>
            </div>

            <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-teal-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-800 mb-2">
                {myParcelInDelivered}
              </h3>
              <p className="text-slate-600 font-medium">Delivered</p>
            </div>
          </div>
        </div>

        {/* Assigned Parcels Table */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
              <h3 className="text-2xl font-bold text-white">
                Assigned Parcels Details
              </h3>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
              ) : parcels.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-lg">
                    No parcels assigned yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Tracking ID
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Assigned At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {parcels.map((parcel) => (
                        <tr
                          key={parcel._id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="py-4 px-6 text-sm font-semibold text-slate-800">
                            {parcel.tracking_id}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                parcel.delivery_status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : parcel.delivery_status === "in_transit"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {parcel.delivery_status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">
                            {parcel.created_by}
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">
                            {new Date(parcel.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* My Parcels Table */}
        <div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
              <h3 className="text-2xl font-bold text-white">
                My Parcels ({totalParcels})
              </h3>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : myParcels.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-lg">No parcels found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Tracking ID
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {myParcels.slice(0, 5).map((parcel) => (
                        <tr
                          key={parcel._id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="py-4 px-6 flex items-center gap-2 text-sm font-semibold text-slate-800">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span>{parcel.tracking_id}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                parcel.delivery_status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : parcel.delivery_status === "in_transit"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {parcel.delivery_status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">
                            {new Date(parcel.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
