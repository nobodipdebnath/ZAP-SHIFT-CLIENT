import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GiProfit } from "react-icons/gi";
import {
    FaMotorcycle,
    FaCheckCircle,
    FaShippingFast,
    FaBoxOpen,
} from "react-icons/fa";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const COLORS = {
    not_collected: '#F87171',      // red-400
    in_transit: '#FBBF24',         // yellow-400
    rider_assigned: '#60A5FA',     // blue-400
    delivered: '#34D399',          // green-400
};

const statusIcons = {
    rider_assigned: <FaMotorcycle className="text-4xl text-info" />,
    delivered: <FaCheckCircle className="text-4xl text-success" />,
    in_transit: <FaShippingFast className="text-4xl text-warning" />,
    not_collected: <FaBoxOpen className="text-4xl text-error" />,
};

const statusLabels = {
    rider_assigned: "Assigned to Rider",
    delivered: "Delivered",
    in_transit: "In Transit",
    not_collected: "Not Collected",
};

const statusDescriptions = {
    rider_assigned: "Parcels assigned to delivery riders",
    delivered: "Successfully delivered parcels",
    in_transit: "Parcels currently being transported",
    not_collected: "Parcels awaiting collection",
};

const statusGradients = {
    rider_assigned: "from-blue-50 to-blue-100",
    delivered: "from-green-50 to-green-100",
    in_transit: "from-yellow-50 to-yellow-100",
    not_collected: "from-red-50 to-red-100",
};

export default function AdminDashboard() {
    const [parcels, setParcels] = useState([]);
    const axiosSecure = useAxiosSecure()
    const { data: deliveryStatus = [], isLoading, isError, error } = useQuery({
        queryKey: ["parcelStatusCount"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels/delivery/status-count");
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });

    useEffect(() => {
        axiosSecure.get('/parcels')
        .then(res => {
            setParcels(res.data);
        })
    },[])

    const totalCost = parcels.reduce((sum, parcel) => {return sum + Number(parcel.cost);}, 0);
    const adminProfit = (totalCost / 100) * 40;
    // console.log(adminProfit)

    const processedPieData = deliveryStatus.map((item) => ({
        name: statusLabels[item.status] || item.status,
        value: item.count,
        status: item.status
    }))

    const totalParcels = deliveryStatus.reduce((sum, item) => sum + item.count, 0);
    

    if (isLoading)
        return (
            <div className="flex flex-col justify-center items-center min-h-[70vh] gap-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-gray-600 font-medium">Loading dashboard data...</p>
            </div>
        );

    if (isError)
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold text-red-700 mb-2">Error Loading Data</h3>
                    <p className="text-red-600">{error.message}</p>
                </div>
            </div>
        );

    return (
        <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                    Parcel Delivery Dashboard
                </h1>
                <p className="text-gray-600 text-lg">Real-time overview of your delivery operations</p>
                {totalParcels > 0 && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                        <span className="text-gray-600 font-medium">Total Parcels:</span>
                        <span className="text-2xl font-bold text-primary">{totalParcels}</span>
                    </div>
                )}
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {deliveryStatus.map(({ count, status }) => (
                    <div
                        key={status}
                        className={`relative overflow-hidden bg-gradient-to-br ${statusGradients[status] || 'from-gray-50 to-gray-100'} 
                        rounded-2xl shadow-lg border-2 border-white hover:shadow-2xl hover:scale-105 
                        transform transition-all duration-300 group`}
                    >
                        <div className="p-6 flex flex-col items-center justify-center relative z-10">
                            {/* Icon Container */}
                            <div className="bg-white p-4 rounded-2xl shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
                                {statusIcons[status] || <FaBoxOpen className="text-4xl" />}
                            </div>
                            
                            {/* Status Label */}
                            <h2 className="text-lg font-bold text-gray-800 text-center mb-1">
                                {statusLabels[status] || status}
                            </h2>
                            
                            {/* Description */}
                            <p className="text-xs text-gray-600 text-center mb-3 px-2">
                                {statusDescriptions[status] || ''}
                            </p>
                            
                            {/* Count */}
                            <div className="flex items-center gap-2">
                                <p className="text-5xl font-extrabold text-gray-800">
                                    {count}
                                </p>
                            </div>
                            
                            {/* Percentage Badge */}
                            {totalParcels > 0 && (
                                <div className="mt-3 bg-white bg-opacity-80 px-3 py-1 rounded-full">
                                    <span className="text-sm font-semibold text-gray-700">
                                        {((count / totalParcels) * 100).toFixed(1)}%
                                    </span>
                                </div>
                            )}
                        </div>
                        
                        {/* Decorative Background Pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                    </div>
                ))}
                <div
                    className={`relative overflow-hidden bg-gradient-to-br from-green-100 to-green-200|| 'from-gray-50 to-gray-100'} 
                    rounded-2xl shadow-lg border-2 border-white hover:shadow-2xl hover:scale-105 
                    transform transition-all duration-300 group`}
                    >
                        <div className="p-6 flex flex-col items-center justify-center relative z-10">
                            {/* Icon Container */}
                        <div className="bg-white p-4 rounded-2xl shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
                            <GiProfit className="text-4xl text-green-300" />
                        </div>
                            
                        {/* Status Label */}
                        <h2 className="text-lg font-bold text-gray-800 text-center mb-1">
                            Income
                        </h2>
                            
                        {/* Description */}
                        <p className="text-xs text-gray-600 text-center mb-3 px-2">
                            Total income in parcel Delivery
                        </p>
                            
                        {/* Count */}
                        <div className="flex items-center gap-2">
                            <p className="text-5xl font-extrabold text-gray-800">
                                {adminProfit} ৳
                            </p>
                        </div>
                            
                        {/* Percentage Badge */}
                        {totalParcels > 0 && (
                            <div className="mt-3 bg-white bg-opacity-80 px-3 py-1 rounded-full">
                                <span className="text-sm font-semibold text-gray-700">
                                    40%
                                </span>
                            </div>
                        )}
                    </div>
                        
                        {/* Decorative Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                </div>
            </div>

            {/* Pie Chart Section */}
            <div className="bg-white rounded-3xl shadow-2xl md:p-8 p-4 border border-gray-100">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Delivery Status Breakdown
                    </h2>
                    <p className="text-gray-600">Visual representation of parcel distribution</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl md:p-6">
                    <ResponsiveContainer width="100%" height={500}>
                        <PieChart>
                            <Pie
                                data={processedPieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={180}
                                innerRadius={80}
                                paddingAngle={2}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                labelLine={{ stroke: '#666', strokeWidth: 1 }}
                            >
                                {processedPieData.map((entry) => (
                                    <Cell
                                        key={`cell-${entry.status}`}
                                        fill={COLORS[entry.status] || '#A78BFA'}
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                    />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: 'white', 
                                    borderRadius: '12px', 
                                    border: '2px solid #e5e7eb',
                                    padding: '12px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Legend 
                                verticalAlign="bottom" 
                                height={50}
                                iconType="circle"
                                wrapperStyle={{
                                    paddingTop: '20px',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Quick Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {deliveryStatus.map(({ count, status }) => (
                        <div key={status} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="text-2xl font-bold" style={{ color: COLORS[status] }}>
                                {count}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                                {statusLabels[status]}
                            </div>
                        </div>
                    ))}
                    <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="text-2xl font-bold text-green-600">
                            {adminProfit} ৳
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                            Total income
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}