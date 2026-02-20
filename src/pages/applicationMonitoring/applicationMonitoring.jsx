import React from "react";
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import StatCard from "../../components/statCard.jsx";

export default function ApplicationMonitoring() {
  return (
      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">ApplicationMonitoring</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Business" value="248" icon={FileText} />
          <StatCard title="Verified" value="142" icon={CheckCircle} />
          <StatCard title="Pending" value="38" icon={Clock} />
          <StatCard title="Suspended" value="15" icon={AlertTriangle} />
        </div>
      </div>
  );
}