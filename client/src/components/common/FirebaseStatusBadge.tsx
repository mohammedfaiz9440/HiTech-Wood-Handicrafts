import { useState, useEffect } from "react";
import { checkFirebaseConnection, seedInitialProducts, type FirebaseConnectionStatus } from "../../services/productService";
import { Database, CheckCircle2, AlertCircle, RefreshCw, UploadCloud } from "lucide-react";

export default function FirebaseStatusBadge() {
  const [status, setStatus] = useState<FirebaseConnectionStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [seeding, setSeeding] = useState<boolean>(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const runCheck = async () => {
    setLoading(true);
    const res = await checkFirebaseConnection();
    setStatus(res);
    setLoading(false);
  };

  useEffect(() => {
    runCheck();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    const res = await seedInitialProducts();
    if (res.success) {
      setSeedResult(`Successfully uploaded ${res.count} products to Firestore!`);
      await runCheck();
    } else {
      setSeedResult(`Seeding failed: ${res.error || "Check Firestore permissions/rules"}`);
    }
    setSeeding(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 bg-gray-900/90 text-white text-xs px-3 py-2 rounded-full shadow-lg backdrop-blur-xs hover:bg-gray-900 transition"
        >
          <Database className="w-3.5 h-3.5 text-amber-400" />
          <span>Firebase Status:</span>
          {loading ? (
            <span className="text-yellow-400">Testing...</span>
          ) : status?.connected ? (
            <span className="text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </span>
          ) : (
            <span className="text-red-400 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Fallback Mode
            </span>
          )}
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 max-w-sm text-sm space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-800" />
              <h3 className="font-bold text-gray-900">Firebase Connection</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 text-xs font-semibold px-2 py-1 bg-gray-100 rounded-md"
            >
              Close
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Project ID:</span>
              <span className="font-mono font-medium text-gray-800">hitechwoodhandicrafts</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Status:</span>
              {loading ? (
                <span className="text-yellow-600 font-medium">Checking...</span>
              ) : status?.connected ? (
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              ) : (
                <span className="text-amber-700 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Offline / Rules Blocked
                </span>
              )}
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Firestore Products:</span>
              <span className="font-semibold text-gray-800">
                {status?.productCount ?? 0} Items
              </span>
            </div>
          </div>

          {seedResult && (
            <div className={`p-2.5 rounded-lg text-xs font-medium ${seedResult.includes("Successfully") ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>
              {seedResult}
            </div>
          )}

          <div className="pt-2 flex gap-2">
            <button
              onClick={runCheck}
              disabled={loading}
              className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1 transition"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              Re-test
            </button>

            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex-1 bg-amber-800 hover:bg-amber-900 text-white text-xs py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1 transition shadow-xs"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              {seeding ? "Uploading..." : "Seed Products"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
