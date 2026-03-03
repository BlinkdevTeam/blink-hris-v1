// ── compData.js ───────────────────────────────────────────────────────────────
// Seed data and pure helper functions shared across the entire app.
// No React, no JSX — just plain JS so any file can import from here.
//
// Usage:
//   import { EMPLOYEES, DEFAULT_BASIC_PAY_SETS, seedEmpComp } from "../data/compData";
// ─────────────────────────────────────────────────────────────────────────────


// ── EMPLOYEES ─────────────────────────────────────────────────────────────────
export const EMPLOYEES = [
  {
    id: 1,
    name: "Sara Okafor",
    avatar: "SO",
    dept: "Engineering",
    role: "Senior Engineer",
    salary: "$142,000",
    salaryNumeric: 142000,
    payFreq: "Bi-weekly",
    tax: 28,
    benefits: 1280,
    status: "Active",
    empType: "Full-time",     // From second dataset
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:true, pagibig:true },

    location: "New York",
    joined: "Jan 12, 2021",
    manager: "Devon Park",
    email: "sara.okafor@hera.io",
    phone: "+1 212 555 0191",
    schedule: "Mon–Fri, 9am–5pm",
    benefitsTier: "Premium",
    gender: "Female",
    dob: "Mar 14, 1990"
  },

  {
    id: 2,
    name: "Marcus Chen",
    avatar: "MC",
    dept: "Sales",
    role: "Account Executive",
    salary: "$98,000",
    salaryNumeric: 98000,
    payFreq: "Bi-weekly",
    tax: 22,
    benefits: 960,
    status: "Active",
    empType: "Full-time",
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:true, pagibig:true },

    location: "Chicago",
    joined: "Mar 5, 2022",
    manager: "Rita Vance",
    email: "marcus.chen@hera.io",
    phone: "+1 312 555 0144",
    schedule: "Mon–Fri, Flexible",
    benefitsTier: "Standard",
    gender: "Male",
    dob: "Jul 22, 1993"
  },

  {
    id: 3,
    name: "Priya Nair",
    avatar: "PN",
    dept: "Product",
    role: "Product Manager",
    salary: "$126,000",
    salaryNumeric: 126000,
    payFreq: "Semi-monthly",
    tax: 26,
    benefits: 1280,
    status: "Active",
    empType: "Full-time",
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:true, pagibig:true },

    location: "Remote",
    joined: "Jul 19, 2023",
    manager: "Devon Park",
    email: "priya.nair@hera.io",
    phone: "+1 415 555 0172",
    schedule: "Mon–Fri, Flexible",
    benefitsTier: "Premium",
    gender: "Female",
    dob: "Nov 5, 1991"
  },

  {
    id: 4,
    name: "James Kowalski",
    avatar: "JK",
    dept: "Engineering",
    role: "DevOps Engineer",
    salary: "$134,000",
    salaryNumeric: 134000,
    payFreq: "Bi-weekly",
    tax: 27,
    benefits: 960,
    status: "Active",
    empType: "Full-time",
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:true, pagibig:true },

    location: "Austin",
    joined: "Nov 1, 2020",
    manager: "Sara Okafor",
    email: "james.k@hera.io",
    phone: "+1 512 555 0103",
    schedule: "Mon–Fri, 9am–5pm",
    benefitsTier: "Standard",
    gender: "Male",
    dob: "Apr 18, 1988"
  },

  {
    id: 5,
    name: "Leila Farouk",
    avatar: "LF",
    dept: "Product",
    role: "Senior PM",
    salary: "$148,000",
    salaryNumeric: 148000,
    payFreq: "Monthly",
    tax: 30,
    benefits: 1280,
    status: "Active",
    empType: "Full-time",
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:true, pagibig:true },

    location: "New York",
    joined: "Feb 28, 2019",
    manager: "Devon Park",
    email: "leila.f@hera.io",
    phone: "+1 212 555 0165",
    schedule: "4-day week",
    benefitsTier: "Premium",
    gender: "Female",
    dob: "Sep 30, 1987"
  },

  {
    id: 6,
    name: "Devon Park",
    avatar: "DP",
    dept: "Engineering",
    role: "VP Engineering",
    salary: "$210,000",
    salaryNumeric: 210000,
    payFreq: "Monthly",
    tax: 35,
    benefits: 1280,
    status: "Active",
    empType: "Full-time",
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:true, pagibig:true },

    location: "New York",
    joined: "Jun 14, 2018",
    manager: "CEO",
    email: "devon.park@hera.io",
    phone: "+1 212 555 0188",
    schedule: "Mon–Fri, Flexible",
    benefitsTier: "Premium",
    gender: "Male",
    dob: "Jan 2, 1982"
  },

  {
    id: 7,
    name: "Rita Vance",
    avatar: "RV",
    dept: "Sales",
    role: "Sales Director",
    salary: "$175,000",
    salaryNumeric: 175000,
    payFreq: "Monthly",
    tax: 32,
    benefits: 1280,
    status: "Active",
    empType: "Full-time",
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:true, pagibig:true },

    location: "Chicago",
    joined: "Sep 3, 2020",
    manager: "CEO",
    email: "rita.vance@hera.io",
    phone: "+1 312 555 0121",
    schedule: "Mon–Fri, 9am–5pm",
    benefitsTier: "Premium",
    gender: "Female",
    dob: "Jun 15, 1984"
  },

  {
    id: 8,
    name: "Tomás Rivera",
    avatar: "TR",
    dept: "Design",
    role: "UX Designer",
    salary: "$112,000",
    salaryNumeric: 112000,
    payFreq: "Bi-weekly",
    tax: 24,
    benefits: 960,
    status: "Active",
    empType: "Full-time", // overrides Contractual since second dataset is richer
    taxExempt: false,
    deductOverrides: { sss:false, philhealth:false, pagibig:false },

    location: "Remote",
    joined: "Apr 11, 2022",
    manager: "Leila Farouk",
    email: "tomas.r@hera.io",
    phone: "+1 415 555 0199",
    schedule: "Mon–Fri, Flexible",
    benefitsTier: "Standard",
    gender: "Male",
    dob: "Feb 27, 1994"
  },

  {
    id: 9,
    name: "Ananya Bose",
    avatar: "AB",
    dept: "Operations",
    role: "Data Analyst",
    salary: "$95,000",
    salaryNumeric: 95000,
    payFreq: "Bi-weekly",
    tax: 22,
    benefits: 960,
    status: "On Leave",
    empType: "Full-time",
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:true, pagibig:true },

    location: "Austin",
    joined: "Oct 22, 2021",
    manager: "Rita Vance",
    email: "ananya.b@hera.io",
    phone: "+1 512 555 0177",
    schedule: "Mon–Fri, 9am–5pm",
    benefitsTier: "Standard",
    gender: "Female",
    dob: "Aug 8, 1995"
  },

  {
    id: 10,
    name: "Chris Mendez",
    avatar: "CM",
    dept: "HR & Admin",
    role: "HR Specialist",
    salary: "$88,000",
    salaryNumeric: 88000,
    payFreq: "Bi-weekly",
    tax: 0,
    benefits: 0,
    status: "Active",
    empType: "Full-time",
    taxExempt: "Minimum Wage",
    deductOverrides: { sss:true, philhealth:true, pagibig:true },

    location: "New York",
    joined: "Jan 7, 2023",
    manager: "Devon Park",
    email: "chris.m@hera.io",
    phone: "+1 212 555 0134",
    schedule: "Mon–Fri, 9am–5pm",
    benefitsTier: "Standard",
    gender: "Male",
    dob: "Dec 3, 1997"
  },

  {
    id: 11,
    name: "Fatima Al-Hassan",
    avatar: "FA",
    dept: "Engineering",
    role: "Frontend Engineer",
    salary: "$128,000",
    salaryNumeric: 128000,
    payFreq: "Bi-weekly",
    tax: 26,
    benefits: 1280,
    status: "Active",
    empType: "Full-time",
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:true, pagibig:false },

    location: "Remote",
    joined: "Mar 30, 2022",
    manager: "Sara Okafor",
    email: "fatima.a@hera.io",
    phone: "+1 415 555 0156",
    schedule: "Mon–Fri, Flexible",
    benefitsTier: "Premium",
    gender: "Female",
    dob: "May 11, 1992"
  },

  {
    id: 12,
    name: "Noah Kim",
    avatar: "NK",
    dept: "Marketing",
    role: "Marketing Manager",
    salary: "$104,000",
    salaryNumeric: 104000,
    payFreq: "Bi-weekly",
    tax: 23,
    benefits: 960,
    status: "Active",
    empType: "Full-time",
    taxExempt: false,
    deductOverrides: { sss:true, philhealth:false, pagibig:true },

    location: "Chicago",
    joined: "Aug 15, 2021",
    manager: "Rita Vance",
    email: "noah.kim@hera.io",
    phone: "+1 312 555 0143",
    schedule: "Mon–Fri, Flexible",
    benefitsTier: "Standard",
    gender: "Male",
    dob: "Oct 19, 1993"
  }
];


// ── COMPENSATION PACKAGE SETS ─────────────────────────────────────────────────

export const DEFAULT_BASIC_PAY_SETS = [
  { id: "bp1", name: "Standard",   desc: "Default pay structure for full-time employees", payFreq: "Bi-weekly",    overtimeRate: 1.5,  nightDiffRate: 0.1,  holidayRate: 2.0, color: "#5af07a" },
  { id: "bp2", name: "Executive",  desc: "Senior leadership pay structure",               payFreq: "Monthly",      overtimeRate: 2.0,  nightDiffRate: 0.15, holidayRate: 2.5, color: "#f0c85a" },
  { id: "bp3", name: "Part-time",  desc: "Prorated structure for part-time staff",        payFreq: "Bi-weekly",    overtimeRate: 1.25, nightDiffRate: 0.1,  holidayRate: 1.5, color: "#5a9af0" },
  { id: "bp4", name: "Contractor", desc: "Fixed-rate, no overtime or differentials",      payFreq: "Semi-monthly", overtimeRate: 1.0,  nightDiffRate: 0.0,  holidayRate: 1.0, color: "#aaaaaa" },
];

export const DEFAULT_CONTRIBUTION_SETS = [
  { id: "cs1", name: "Full Statutory", desc: "SSS, PhilHealth & Pag-IBIG at standard rates",          sss: true,  sssRate: 4.5, philhealth: true,  philhealthRate: 2.0, pagibig: true,  pagibigRate: 2.0, withholdingTax: true,  taxRate: 20, color: "#5af07a" },
  { id: "cs2", name: "Exempt",         desc: "No statutory deductions — for tax-exempt employees",    sss: false, sssRate: 0,   philhealth: false, philhealthRate: 0,   pagibig: false, pagibigRate: 0,   withholdingTax: false, taxRate: 0,  color: "#9b8aff" },
  { id: "cs3", name: "Minimal",        desc: "Pag-IBIG only — for probationary or project-based staff", sss: false, sssRate: 0, philhealth: false, philhealthRate: 0,   pagibig: true,  pagibigRate: 2.0, withholdingTax: true,  taxRate: 15, color: "#f0c85a" },
];

export const DEFAULT_BENEFITS_SETS = [
  { id: "bf1", name: "Standard", desc: "HMO, life insurance, 15 VL + 15 SL",                    hmo: true,  lifeInsurance: true,  annualLeave: 15, sickLeave: 15, mealAllowance: 0,    transportAllowance: 0,    thirteenthMonth: true,  color: "#5af07a" },
  { id: "bf2", name: "Premium",  desc: "HMO+1, life insurance, 20 VL + 15 SL, allowances",      hmo: true,  lifeInsurance: true,  annualLeave: 20, sickLeave: 15, mealAllowance: 2000, transportAllowance: 1500, thirteenthMonth: true,  color: "#f0c85a" },
  { id: "bf3", name: "Basic",    desc: "SSS & PhilHealth only — no HMO or leave",                hmo: false, lifeInsurance: false, annualLeave: 5,  sickLeave: 5,  mealAllowance: 0,    transportAllowance: 0,    thirteenthMonth: true,  color: "#5a9af0" },
  { id: "bf4", name: "None",     desc: "No company benefits — contractor arrangement",           hmo: false, lifeInsurance: false, annualLeave: 0,  sickLeave: 0,  mealAllowance: 0,    transportAllowance: 0,    thirteenthMonth: false, color: "#aaaaaa" },
];


// ── SEED HELPER ───────────────────────────────────────────────────────────────
// Maps an employee's benefits field to their default package set IDs.
// Used when initialising empComps state in App.jsx.

const EMP_COMP_DEFAULTS = {
  basicPaySetId:     { Premium: "bp2", Standard: "bp1", "Contractor (None)": "bp4" },
  contributionSetId: { Premium: "cs1", Standard: "cs1", "Contractor (None)": "cs2" },
  benefitsSetId:     { Premium: "bf2", Standard: "bf1", "Contractor (None)": "bf4" },
};

export function seedEmpComp(emp) {
  const b = emp.benefits || "Standard";
  return {
    basicPaySetId:     EMP_COMP_DEFAULTS.basicPaySetId[b]     || "bp1",
    contributionSetId: EMP_COMP_DEFAULTS.contributionSetId[b] || "cs1",
    benefitsSetId:     EMP_COMP_DEFAULTS.benefitsSetId[b]     || "bf1",
    adjustments: [],
    // adjustments shape: { id, type: "bonus"|"deduction", amount, reason, date, addedBy }
  };
}


// ── SHARED UI CONSTANTS ───────────────────────────────────────────────────────
// Non-React constants used across multiple components.
// Import these instead of redefining them in each file.

export const DEPTS    = ["All", "Engineering", "Sales", "Product", "Design", "Operations", "Marketing", "HR & Admin"];
export const STATUSES = ["All", "Active", "On Leave", "Inactive"];

// Status badge styles
export const STATUS_STYLES = {
  "Active":   { bg: "#0f1f0f", color: "#5af07a" },
  "On Leave": { bg: "#1f1a0f", color: "#f0c85a" },
  "Inactive": { bg: "#1f0f0f", color: "#f05a5a" },
};

// Avatar background colours (cycled by emp.id)
const AVATAR_COLORS = [
  "#ffffff", "#cccccc", "#999999", "#777777",
  "#555555", "#444444", "#ffffff", "#bbbbbb",
  "#888888", "#666666", "#aaaaaa", "#333333",
];

// Returns { bg, fg } for an employee's avatar
export function getAvatarColors(id) {
  const bg = AVATAR_COLORS[id % AVATAR_COLORS.length];
  const lightBg = ["#fff", "#ddd", "#eee", "#ccc", "#bbb"].some(x =>
    bg.startsWith(x.slice(0, 4))
  );
  return { bg, fg: lightBg ? "#000" : "#fff" };
}


// ── PAY HELPERS ───────────────────────────────────────────────────────────────
// Pure functions for pay calculations — no React, safe to use anywhere.

export function periodsPerYear(payFreq) {
  if (payFreq === "Monthly")      return 12;
  if (payFreq === "Semi-monthly") return 24;
  return 26; // Bi-weekly / Weekly default
}

export function parseSalary(salary) {
  // Handles both "$142,000" strings and plain numbers
  return parseFloat(String(salary).replace(/[$,]/g, "")) || 0;
}

export function grossPerPeriod(salary, payFreq) {
  return parseSalary(salary) / periodsPerYear(payFreq);
}

export function formatCurrency(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function gc(id){ 
    const bg=AV[id%AV.length]; 
    return { 
        bg, 
        fg:["#fff","#ddd","#eee","#ccc","#bbb"].some(x=>bg.startsWith(x.slice(0,4))) ? "#000" : "#fff" 

    }; 
}


export const SS = { 
    "Active":{
        bg:"#0f1f0f",
        color:"#5af07a"
    }, 
    "On Leave":{
        bg:"#1f1a0f",
        color:"#f0c85a"
    }, 
    "Inactive":{
        bg:"#1f0f0f",
        color:"#f05a5a"
    } 
};

export const AV = ["#ffffff","#cccccc","#999999","#777777","#555555","#444444","#ffffff","#bbbbbb","#888888","#666666","#aaaaaa","#333333"];

export function Avatar({emp,size=36}) { 
    const{bg,fg}=gc(emp.id)
    return <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{width:size,height:size,backgroundColor:bg,color:fg,fontFamily:"system-ui,sans-serif",fontSize:size<32?11:size<56?13:20}}>{emp.avatar}</div>
}

export const IC = "w-full px-3 py-2.5 rounded text-sm text-white placeholder-gray-600 outline-none";

export const IS = {
    backgroundColor:"#111111",
    border:"1px solid #2a2a2a",
    fontFamily:"system-ui,sans-serif"
};

export function Field({label,children})
    { 
        return <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1.5" style={{fontFamily:"system-ui,sans-serif"}}>{label}</label>{children}
        </div>; 
    }
    
export const BADGE = {
  Approved:    {bg:"#0f1f0f", color:"#5af07a"},
  Pending:     {bg:"#1f1a0f", color:"#f0c85a"},
  Rejected:    {bg:"#1f0f0f", color:"#f05a5a"},
  Flagged:     {bg:"#1f0f0f", color:"#f05a5a"},
  "For Review":{bg:"#0a1a2a", color:"#5a9af0"},
  "—":         {bg:"transparent", color:"#444"},
};