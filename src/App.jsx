import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store/store";

import {
  EMPLOYEES,
  DEFAULT_BASIC_PAY_SETS,
  DEFAULT_CONTRIBUTION_SETS,
  DEFAULT_BENEFITS_SETS,
  seedEmpComp,
  gc,
  SS,
  BADGE,
} from "./data/compData";

import Header from "./Header/Header";

// HRIS Pages
import Dashboard from "./components/dashboard/Dashboard";
import People from "./components/people/People";
import EmployeeProfile from "./components/people/EmployeeProfile";
import Payroll from "./components/payroll/Payroll";
import TimeAndLeave from "./components/time-leave/TimeInLeave";
import RecruitmentPage from "./components/recruitment/Recruitment";

// Auth / Setup Pages
import InitialSetup from "./components/initial-setup/InitialSetup";
import Login from "./components/login/Login";
import UserManagement from "./templates/UserManagement";

// ─────────────────────────────────────────
// Layout (Used ONLY for the HRIS system)
// ─────────────────────────────────────────
function AppLayout({ children }) {
  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{ fontFamily: "'Georgia', serif", backgroundColor: "#000" }}
    >
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}

// ─────────────────────────────────────────
// Route Guards
// ─────────────────────────────────────────
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function SetupRoute({ children }) {
  const setupComplete = localStorage.getItem("setupComplete") === "true";

  if (!setupComplete) {
    return <Navigate to="/initial-setup" replace />;
  }

  return children;
}

// ─────────────────────────────────────────
// Wrappers for navigation
// ─────────────────────────────────────────
function InitialSetupWrapper() {
  const navigate = useNavigate();

  return (
    <InitialSetup
      onFinishSetup={() => {
        localStorage.setItem("setupComplete", "true");
        navigate("/login", { replace: true });
      }}
    />
  );
}

function LoginWrapper({ onLogin }) {
  const navigate = useNavigate();

  return (
    <Login
      onLogin={(user) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard", { replace: true });
        if (onLogin) onLogin(user);
      }}
    />
  );
}

// ─────────────────────────────────────────
// APP
// ─────────────────────────────────────────
export default function App() {
  // ── Employees ──────────────────────────
  const [employees, setEmployees] = useState(EMPLOYEES);

  function updateEmployee(updated) {
    setEmployees((p) => p.map((e) => (e.id === updated.id ? updated : e)));
  }

  function addEmployee(newEmp) {
    setEmployees((p) => [...p, newEmp]);
    setEmpComps((m) => ({ ...m, [newEmp.id]: seedEmpComp(newEmp) }));
  }

  // ── Employee Compensation ──────────────
  const [empComps, setEmpComps] = useState(() => {
    const map = {};
    EMPLOYEES.forEach((e) => {
      map[e.id] = seedEmpComp(e);
    });
    return map;
  });

  function getEmpComp(id) {
    return empComps[id] || seedEmpComp(employees.find((e) => e.id === id) || {});
  }

  function updateEmpComp(id, comp) {
    setEmpComps((m) => ({ ...m, [id]: comp }));
  }

  // ── Compensation Packages ──────────────
  const [basicPaySets, setBasicPaySets] = useState(DEFAULT_BASIC_PAY_SETS);
  const [contributionSets, setContributionSets] = useState(DEFAULT_CONTRIBUTION_SETS);
  const [benefitsSets, setBenefitsSets] = useState(DEFAULT_BENEFITS_SETS);

  // ── Payroll Cutoff Adjustments ─────────
  const [cutoffAdjs, setCutoffAdjs] = useState({});

  function getCutoffAdj(id) {
    return cutoffAdjs[id] || { proratedSalary: null, adjustments: [] };
  }

  function updateCutoffAdj(id, adj) {
    setCutoffAdjs((m) => ({ ...m, [id]: adj }));
  }

  // ── Prop Bundles ───────────────────────
  const employeeProps = {
    employees,
    onUpdateEmployee: updateEmployee,
    onAddEmployee: addEmployee,
    getEmpComp,
    onUpdateEmpComp: updateEmpComp,
    seedEmpComp,
  };

  const compPackageProps = {
    basicPaySets,
    onUpdateBasicPay: setBasicPaySets,
    contributionSets,
    onUpdateContributions: setContributionSets,
    benefitsSets,
    onUpdateBenefits: setBenefitsSets,
    gc,
    SS,
    BADGE,
  };

  const payrollProps = {
    employees,
    getCutoffAdj,
    onUpdateCutoffAdj: updateCutoffAdj,
    ...compPackageProps,
  };

  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* ROOT REDIRECT */}
        <Route
          path="/"
          element={
            localStorage.getItem("setupComplete") !== "true" ? (
              <Navigate to="/initial-setup" replace />
            ) : localStorage.getItem("isAuthenticated") !== "true" ? (
              <Navigate to="/login" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* INITIAL SETUP */}
        <Route
          path="/initial-setup"
          element={
            localStorage.getItem("setupComplete") === "true" ? (
              <Navigate to="/login" replace />
            ) : (
              <InitialSetupWrapper />
            )
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginWrapper />
            )
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <SetupRoute>
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            </SetupRoute>
          }
        />

        {/* PEOPLE */}
        <Route
          path="/people"
          element={
            <SetupRoute>
              <ProtectedRoute>
                <AppLayout>
                  <People {...employeeProps} {...compPackageProps} />
                </AppLayout>
              </ProtectedRoute>
            </SetupRoute>
          }
        />

        <Route
          path="/people/:id"
          element={
            <SetupRoute>
              <ProtectedRoute>
                <AppLayout>
                  <EmployeeProfile {...employeeProps} {...compPackageProps} />
                </AppLayout>
              </ProtectedRoute>
            </SetupRoute>
          }
        />

        <Route
          path="/people/:id/:tab"
          element={
            <SetupRoute>
              <ProtectedRoute>
                <AppLayout>
                  <EmployeeProfile {...employeeProps} {...compPackageProps} />
                </AppLayout>
              </ProtectedRoute>
            </SetupRoute>
          }
        />

        {/* PAYROLL */}
        <Route
          path="/payroll"
          element={
            <SetupRoute>
              <ProtectedRoute>
                <AppLayout>
                  <Payroll {...payrollProps} />
                </AppLayout>
              </ProtectedRoute>
            </SetupRoute>
          }
        />

        {/* TIME & LEAVE */}
        <Route
          path="/time-leave"
          element={
            <SetupRoute>
              <ProtectedRoute>
                <AppLayout>
                  <TimeAndLeave employees={employees} />
                </AppLayout>
              </ProtectedRoute>
            </SetupRoute>
          }
        />

        {/* RECRUITMENT */}
        <Route
          path="/recruitment"
          element={
            <SetupRoute>
              <ProtectedRoute>
                <AppLayout>
                  <RecruitmentPage />
                </AppLayout>
              </ProtectedRoute>
            </SetupRoute>
          }
        />

        {/* USERS */}
        <Route
          path="/users"
          element={
            <SetupRoute>
              <ProtectedRoute>
                <AppLayout>
                  <UserManagement />
                </AppLayout>
              </ProtectedRoute>
            </SetupRoute>
          }
        />

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    // </Provider>
  );
}