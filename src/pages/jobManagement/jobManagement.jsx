import React from "react";
import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import StatCard from "../../components/statCard.jsx";

export default function JobManagement() {
  return (
      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Job Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Jobs" value="248" icon={Briefcase} />
          <StatCard title="Active" value="142" icon={CheckCircle} />
          <StatCard title="Pending Reviews" value="38" icon={Clock} />
          <StatCard title="Expired" value="15" icon={XCircle} />
        </div>
      </div>
  );
}