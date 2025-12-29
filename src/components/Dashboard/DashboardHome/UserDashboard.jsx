import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const res = await axiosSecure.get("/parcels");
        setParcels(res.data);
      } catch (err) {
        console.error("Failed to fetch parcels:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParcels();
  }, [axiosSecure]);

  const totalParcels = parcels.length;
  console.log('test',parcels);
  const inTransit = parcels.filter(p => p.delivery_status === "in_transit").length;
  const delivered = parcels.filter(p => p.delivery_status === "delivered").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 sm:px-6 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Dashboard
          </h1>
          <p className="text-slate-600 text-lg">Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Parcels */}
          <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-indigo-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Overview</p>
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 mb-2">{totalParcels}</h2>
            <p className="text-slate-600 font-medium">Total Parcels</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">All time shipments</p>
            </div>
          </div>

          {/* In Transit */}
          <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Active</p>
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 mb-2">{inTransit}</h2>
            <p className="text-slate-600 font-medium">In Transit</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${totalParcels > 0 ? (inTransit / totalParcels) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-sm font-semibold text-slate-600">
                  {totalParcels > 0 ? ((inTransit / totalParcels) * 100).toFixed(0) : 0}%
                </p>
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-green-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Complete</p>
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 mb-2">{delivered}</h2>
            <p className="text-slate-600 font-medium">Delivered</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${totalParcels > 0 ? (delivered / totalParcels) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-sm font-semibold text-slate-600">
                  {totalParcels > 0 ? ((delivered / totalParcels) * 100).toFixed(0) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Parcels Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Parcels
            </h2>
            <p className="text-indigo-100 text-sm mt-1">Your latest 5 shipments</p>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading parcels...</p>
                </div>
              </div>
            ) : parcels.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-slate-500 text-lg mb-2">No parcels found.</p>
                <p className="text-slate-400 text-sm">Your shipments will appear here once you create them.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Tracking ID</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parcels.slice(0, 5).map((parcel) => (
                      <tr key={parcel._id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="py-4 px-6 text-sm font-semibold text-slate-800">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            {parcel.tracking_id}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            parcel.delivery_status === 'delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : parcel.delivery_status === 'in_transit'
                              ? 'bg-blue-100 text-blue-800'
                              : parcel.delivery_status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              parcel.delivery_status === 'delivered' 
                                ? 'bg-green-500' 
                                : parcel.delivery_status === 'in_transit'
                                ? 'bg-blue-500'
                                : parcel.delivery_status === 'pending'
                                ? 'bg-yellow-500'
                                : 'bg-slate-500'
                            }`}></span>
                            {parcel.delivery_status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(parcel.createdAt).toLocaleString()}
                          </div>
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
  );
};

export default UserDashboard;