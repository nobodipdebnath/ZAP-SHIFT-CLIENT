import { useQuery } from "@tanstack/react-query";
import { startOfDay, startOfWeek, startOfMonth, startOfYear, isAfter } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyEarnings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["completedDeliveries", email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/completed-parcels?email=${email}`);
            return res.data;
        },
    });

    const calculateEarning = (parcel) => {
        const cost = Number(parcel.cost);
        return parcel.sender_center === parcel.receiver_center ? cost * 0.8 : cost * 0.3;
    };

    // Filtered earnings
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const monthStart = startOfMonth(now);
    const yearStart = startOfYear(now);

    let total = 0,
        totalCashedOut = 0,
        totalPending = 0,
        today = 0,
        week = 0,
        month = 0,
        year = 0;

    parcels.forEach((p) => {
        const earning = calculateEarning(p);
        const deliveredAt = new Date(p.delivered_at);
        total += earning;
        if (p.cashout_status === "cashed_out") totalCashedOut += earning;
        else totalPending += earning;

        if (isAfter(deliveredAt, todayStart)) today += earning;
        if (isAfter(deliveredAt, weekStart)) week += earning;
        if (isAfter(deliveredAt, monthStart)) month += earning;
        if (isAfter(deliveredAt, yearStart)) year += earning;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                        My Earnings
                    </h1>
                    <p className="text-slate-600 text-lg">Track your delivery earnings and payouts</p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
                            <p className="text-slate-600 text-lg">Loading your earnings...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Main Earnings Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Total Earnings */}
                            <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-emerald-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Overall</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 font-medium mb-2">Total Earnings</p>
                                <p className="text-4xl font-extrabold text-emerald-600">৳{total.toFixed(2)}</p>
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <p className="text-sm text-slate-500">{parcels.length} completed deliveries</p>
                                </div>
                            </div>

                            {/* Cashed Out */}
                            <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Received</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 font-medium mb-2">Cashed Out</p>
                                <p className="text-4xl font-extrabold text-blue-600">৳{totalCashedOut.toFixed(2)}</p>
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div 
                                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${total > 0 ? (totalCashedOut / total) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-600">
                                            {total > 0 ? ((totalCashedOut / total) * 100).toFixed(0) : 0}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pending */}
                            <div className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Waiting</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 font-medium mb-2">Pending</p>
                                <p className="text-4xl font-extrabold text-amber-600">৳{totalPending.toFixed(2)}</p>
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div 
                                                className="bg-gradient-to-r from-amber-500 to-yellow-500 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${total > 0 ? (totalPending / total) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-600">
                                            {total > 0 ? ((totalPending / total) * 100).toFixed(0) : 0}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Time Period Breakdown */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Earnings Timeline
                                </h3>
                            </div>
                            
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Today */}
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-100 hover:border-green-300 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Today</p>
                                                <p className="text-2xl font-extrabold text-green-700">৳{today.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* This Week */}
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">This Week</p>
                                                <p className="text-2xl font-extrabold text-blue-700">৳{week.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* This Month */}
                                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">This Month</p>
                                                <p className="text-2xl font-extrabold text-purple-700">৳{month.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* This Year */}
                                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border-2 border-orange-100 hover:border-orange-300 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">This Year</p>
                                                <p className="text-2xl font-extrabold text-orange-700">৳{year.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyEarnings;