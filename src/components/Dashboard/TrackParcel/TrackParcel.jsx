import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [updates, setUpdates] = useState([]);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleTrack = async () => {
    if (!trackingId) return alert("Enter Tracking ID");

    try {
      const res = await axiosSecure.get(`/trackings/${trackingId}`);
      setUpdates(res.data);
      setError("");
    } catch (err) {
      setUpdates([]);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="px-6 md:px-16 my-12">
      <h2 className="text-center text-5xl font-extrabold text-green-700 my-10">
        Track Parcel
      </h2>

      {/* Input */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="border p-3 rounded-lg w-full md:w-1/2"
        />
        <button
          onClick={handleTrack}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Track
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Timeline */}
      {updates.length > 0 && (
        <div className="relative border-l-2 border-green-600 ml-6">
          {updates.map((update, index) => (
            <div key={index} className="mb-8 ml-6 relative">
              <span className="absolute -left-5 top-0 w-4 h-4 bg-green-600 rounded-full"></span>
              <div className="bg-white shadow-md rounded-xl p-4">
                <h3 className="font-bold text-gray-800">{update.status}</h3>
                {update.location && (
                  <p className="text-gray-500 text-sm">{update.location}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">
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
