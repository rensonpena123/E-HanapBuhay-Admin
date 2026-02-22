export const businessMockData = [
  {
    id: "1111-0000-1100",
    name: "Ken Steel Corporation",
    type: "Corporation",
    owner: "Ken Demetri",
    email: "example@gmail.com",
    regNumber: "DTI-0000-1111-12-12",
    dateRegistered: "February 11, 2026",
    address: "Mandaluyong",
    phone: "0996-234-1234",
    status: "Pending",
    documents: [
      { id: 1, title: "Barangay Business Permit", status: "Pending" },
      { id: 2, title: "Mayor's Business Permit", status: "Missing" }, 
      { id: 3, title: "Localization Permit", status: "Verified" },
      { id: 4, title: "Fire Safety Inspection Certificate", status: "Verified" },
      { id: 5, title: "Sanitary Permit", status: "Verified" },
    ],
    statusHistory: {
      changedBy: "Super Admin (Email Hidden)",
      lastChanged: "February 12, 2026 11:56 AM"
    }
  },
  {
    id: "0000-1111-0010",
    name: "Neck Man, Inc.",
    type: "Sole Proprietorship",
    owner: "Nick Fury",
    email: "nick@shield.com",
    regNumber: "DTI-9999-8888-77-66",
    dateRegistered: "January 20, 2026",
    address: "Pasig City",
    phone: "0917-000-0000",
    status: "Pending",
    documents: [
      { id: 1, title: "Barangay Business Permit", status: "Verified" },
      { id: 2, title: "Mayor's Business Permit", status: "Pending" },
      { id: 3, title: "Localization Permit", status: "Missing" },
      { id: 4, title: "Fire Safety Inspection Certificate", status: "Missing" },
      { id: 5, title: "Sanitary Permit", status: "Missing" },
    ],
    statusHistory: {
      changedBy: "System",
      lastChanged: "January 21, 2026 09:00 AM"
    }
  },
  {
    id: "2131-6382-1212",
    name: "Demetrious. Corp",
    type: "Corporation",
    owner: "Demi Lovato",
    email: "demi@corp.com",
    regNumber: "SEC-1231-5555-11-22",
    dateRegistered: "December 05, 2025",
    address: "Quezon City",
    phone: "0998-111-2222",
    status: "Suspended",
    documents: [
      { id: 1, title: "Barangay Business Permit", status: "Verified" },
      { id: 2, title: "Mayor's Business Permit", status: "Verified" },
      { id: 3, title: "Localization Permit", status: "Verified" },
      { id: 4, title: "Fire Safety Inspection Certificate", status: "Verified" },
      { id: 5, title: "Sanitary Permit", status: "Verified" }, 
    ],
    statusHistory: {
      changedBy: "Super Admin",
      lastChanged: "February 01, 2026 02:30 PM"
    }
  }
];