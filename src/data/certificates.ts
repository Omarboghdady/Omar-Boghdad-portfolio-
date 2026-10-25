export type CertificateCategory = "Data Analysis" | "AI" | "Business" | "Training";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: CertificateCategory;
  image: string;
  credentialUrl?: string;
};

export const certificates: Certificate[] = [
  {
    id: "lia-python-sql",
    title: "Professional Diploma in Data Analysis (Python & SQL)",
    issuer: "London Innovation Academy (LIA)",
    date: "October 2026",
    description: "40 training hours covering data analysis using Python and SQL. CPD approved. Certificate ID: DA-EG497.",
    category: "Data Analysis",
    image: "/certificates/lia-python-sql.jpg",
  },
  {
    id: "meta-ai-academy",
    title: "AI Academy Program Certificate",
    issuer: "Meta & Career 180",
    date: "September 2026",
    description: "20 hours of learning and participation in the Meta AI Academy program, building practical skills in artificial intelligence.",
    category: "AI",
    image: "/certificates/meta-ai-academy.jpg",
  },
  {
    id: "petrobakr-summer-training",
    title: "Summer Training, Business Information Systems",
    issuer: "Petrobakr Petroleum Company",
    date: "July 2026",
    description: "One week of summer training (27-30 July 2026) at the Administration General Department.",
    category: "Training",
    image: "/certificates/petrobakr-summer-training.jpg",
  },
  {
    id: "lia-excel-powerbi",
    title: "Professional Diploma in Data Analysis (Excel & Power BI)",
    issuer: "London Innovation Academy (LIA)",
    date: "May 2026",
    description: "40 training hours using Microsoft Excel and Power BI, under the auspices of the Ministry of Youth and Sports. CPD approved. Certificate ID: DA-EG272.",
    category: "Data Analysis",
    image: "/certificates/lia-excel-powerbi.jpg",
  },
  {
    id: "nti-ai-ambassadors",
    title: "Artificial Intelligence Ambassadors Program",
    issuer: "NTI & Engineers for a Sustainable Egypt (ESE)",
    date: "2026",
    description: "Successfully completed the AI Ambassadors Program, in collaboration with the Ministry of Communications and Information Technology.",
    category: "AI",
    image: "/certificates/nti-ai-ambassadors.jpg",
  },
  {
    id: "cib-green-leap",
    title: "CIB Summer Program: The Green Leap",
    issuer: "Commercial International Bank (CIB)",
    date: "July 2025",
    description: "Certificate of attendance for the CIB Summer internship program.",
    category: "Training",
    image: "/certificates/cib-green-leap.jpg",
  },
  {
    id: "google-digital-marketing",
    title: "Fundamentals of Digital Marketing",
    issuer: "Google (Maharat min Google) & Banque Misr",
    date: "2025",
    description: "Training completion certificate for the Maharat min Google digital marketing course in partnership with Banque Misr.",
    category: "Business",
    image: "/certificates/google-digital-marketing.jpg",
  },
];
