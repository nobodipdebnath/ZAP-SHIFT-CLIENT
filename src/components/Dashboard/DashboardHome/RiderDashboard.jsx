import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [myParcels, setMyParcels] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const delivered = parcels.filter(
    (p) => p.delivery_status === "delivered"
  ).length;

  // My Parcels
  const totalParcels = myParcels.length;
  const myParcelInTransit = myParcels.filter(
    (p) => p.delivery_status === "in_transit"
  ).length;
  const myParcelInDelivered = myParcels.filter(
    (p) => p.delivery_status === "delivered"
  ).length;

  return (
    <div className="px-6 md:px-16 my-12">
      {/* Stats Cards */}
      <div>
        <h2 className="text-4xl font-extrabold text-green-blue mb-6">
          Assign Parcel
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{totalAssigned}</h2>
          <p className="text-gray-500 mt-2">Total Assigned Parcels</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{inTransit}</h2>
          <p className="text-gray-500 mt-2">In Transit</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{delivered}</h2>
          <p className="text-gray-500 mt-2">Delivered</p>
        </div>
      </div>

      <div>
        <h2 className="text-4xl font-extrabold text-green-blue my-6">
          My Parcels
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{totalParcels}</h2>
          <p className="text-gray-500 mt-2">Total Parcels</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {myParcelInTransit}
          </h2>
          <p className="text-gray-500 mt-2">In Transit</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {myParcelInDelivered}
          </h2>
          <p className="text-gray-500 mt-2">Delivered</p>
        </div>
      </div>

      {/* Parcel List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Assign Parcels</h2>
        {loading ? (
          <p>Loading parcels...</p>
        ) : parcels.length === 0 ? (
          <p>No parcels assigned yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="py-2 px-4">Tracking ID</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Assigned At</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel) => (
                  <tr key={parcel._id} className="text-center border-b">
                    <td className="py-2 px-4">{parcel.tracking_id}</td>
                    <td className="py-2 px-4">{parcel.delivery_status}</td>
                    <td className="py-2 px-4">{parcel.created_by}</td>
                    <td className="py-2 px-4">
                      {new Date(parcel.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          My Parcels
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : myParcels.length === 0 ? (
          <p>No parcels found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="py-2 px-4">Tracking ID</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Created At</th>
                </tr>
              </thead>
              <tbody>
                {myParcels.slice(0, 5).map((parcel) => (
                  <tr key={parcel._id} className="text-center border-b">
                    <td className="py-2 px-4">{parcel.tracking_id}</td>
                    <td className="py-2 px-4">{parcel.delivery_status}</td>
                    <td className="py-2 px-4">
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
  );
};

export default RiderDashboard;
