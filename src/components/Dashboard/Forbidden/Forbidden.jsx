// components/Forbidden.tsx
import { PackageX, AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-8">
          <PackageX className="h-12 w-12 text-red-600" />
        </div>

        {/* 403 Header */}
        <h1 className="text-6xl font-bold text-gray-900 mb-2">403</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-4">
          Access Forbidden
        </p>

        {/* Message */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start gap-3 text-left">
            <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-700 leading-relaxed">
                Sorry, you don't have permission to access this page on{" "}
                <span className="font-semibold text-emerald-600">
                  Precel Delivery
                </span>
                .
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This area might be restricted to administrators, delivery
                partners, or requires special login credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition shadow-md"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-10">
          If you believe this is an error, please contact Precel Delivery
          support.
        </p>
      </div>
    </div>
  );
}