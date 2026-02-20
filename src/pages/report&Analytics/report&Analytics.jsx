import React from "react";
import { Building2, Briefcase, Timer, BadgeCheck } from "lucide-react";
import StatCard from "../../components/statCard.jsx";

export default function ReportsAndAnalytics() {
  return (
      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Reports & Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Jobs" value="248" icon={Building2} />
          <StatCard title="Active" value="142" icon={Briefcase} />
          <StatCard title="Pending Reviews" value="38" icon={Timer} />
          <StatCard title="Expired" value="15" icon={BadgeCheck} />
        </div>
      </div>
  );
}