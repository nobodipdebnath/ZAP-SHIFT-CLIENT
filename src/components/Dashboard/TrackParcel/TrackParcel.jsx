import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMapMarkerAlt, FaClock, FaSearch } from "react-icons/fa";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [updates, setUpdates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleTrack = async () => {
    if (!trackingId) return alert("Enter Tracking ID");

    setLoading(true);
    setError("");
    setUpdates([]);

    try {
      const res = await axiosSecure.get(`/trackings/${trackingId}`);
      setUpdates(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-200 text-gray-700";
    if (status.toLowerCase().includes("pending"))
      return "bg-yellow-100 text-yellow-700";
    if (status.toLowerCase().includes("in"))
      return "bg-blue-100 text-blue-700";
    if (status.toLowerCase().includes("delivered"))
      return "bg-green-100 text-green-700";
    if (status.toLowerCase().includes("cancel"))
      return "bg-red-100 text-red-700";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <div className="px-6 md:px-16">
      <h2 className="text-center text-4xl font-extrabold text-green-blue mb-10">
        Track Your Parcel
      </h2>

      {/* Search Box */}
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-3 w-full">
          <FaSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="w-full outline-none border border-input-text rounded-xl py-3 px-5"
          />
        </div>

        <button
          onClick={handleTrack}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? "Tracking..." : "Track"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center mt-5 font-medium">{error}</p>
      )}

      {/* No Data */}
      {!loading && !error && trackingId && updates.length === 0 && (
        <p className="text-gray-500 text-center mt-6">
          No updates available yet. Please check again later.
        </p>
      )}

      {/* Timeline */}
      {updates.length > 0 && (
        <div className="relative mt-10 border-l-2 border-green-400 ml-6">
          {updates.map((update, index) => (
            <div key={index} className="mb-10 ml-6 relative">
              <span className="absolute -left-5 top-1 w-5 h-5 bg-green-600 ring-8 ring-green-200 rounded-full"></span>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800 capitalize">
                    {update.status}
                  </h3>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                      update.status
                    )}`}
                  >
                    {update.status}
                  </span>
                </div>

                {update.location && (
                  <p className="text-gray-600 flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt /> {update.location}
                  </p>
                )}

                <p className="text-gray-400 text-xs mt-2 flex items-center gap-2">
                  <FaClock />
                  {new Date(update.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
