import { useState } from "react";

import StepWelcome from "./components/Welcome";
import StepCompany from "./components/CompanyInfo";
import ProgressBar from "./components/ProgressBar";
import StepAdminAccount from "./components/StepAdminAccount";
import StepConfirm from "./components/StepConfirm";
import StepDone from "./components/StepDone";

import { TOTAL_STEPS } from "../../data/compData";

export default function SetupWizard() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState({
    companyName: "",
    industry: "",
    size: "",
  });

  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  function setCompanyField(k, v) { setCompany(c => ({ ...c, [k]: v })); }
  function setAdminField(k, v) { setAdmin(a => ({ ...a, [k]: v })); }

  async function handleSubmit() {
  setLoading(true);

  try {
    const response = await fetch("http://localhost:3000/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ company, admin }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Setup failed");
      setLoading(false);
      return;
    }

    setStep(5); // Move to the done step
  } catch (error) {
    console.error(error);
    alert("Could not connect to the server. Make sure backend is running.");
  } finally {
    setLoading(false);
  }
}

  const showProgress = step >= 1 && step <= 4;

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#000" }}>
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(#ffffff04 1px, transparent 1px), linear-gradient(90deg, #ffffff04 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative w-full max-w-md rounded-2xl p-8" style={{ backgroundColor: "#080808", border: "1px solid #1e1e1e", boxShadow: "0 0 80px rgba(0,0,0,0.8)" }}>
        {showProgress && (
          <div className="absolute top-6 right-7 text-xs text-gray-700" style={{ fontFamily: "monospace" }}>
            {step} / {TOTAL_STEPS}
          </div>
        )}

        {showProgress && <ProgressBar step={step} />}

        {step === 0 && <StepWelcome onNext={() => setStep(1)} />}
        {step === 1 && (
          <StepCompany
            data={company}
            onChange={setCompanyField}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <StepAdminAccount
            data={admin}
            onChange={setAdminField}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepConfirm
            company={company}
            admin={admin}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
        {step === 5 && (
          <StepDone
            admin={admin}
            company={company}
            onGoToLogin={() => {
              setStep(0);
              setCompany({ companyName: "", industry: "", size: "" });
              setAdmin({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
            }}
          />
        )}
      </div>

      {step < 5 && (
        <p className="fixed bottom-6 text-xs text-gray-800" style={{ fontFamily: "system-ui,sans-serif" }}>
          HRIS System · First-time setup
        </p>
      )}
    </div>
  );
}