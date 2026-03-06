import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "./InputField";
import EyeIcon from "./EyeIcon";
import Btn from "./Btn";

export default function SignInView({ onLogin, onForgotPassword }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // ✅ Success login
      const user = data.user;

      // Save auth state in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      }));

      onLogin(user); // optional: update parent state
      setLoading(false);

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Unable to connect to server.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-normal text-white mb-1" style={{ letterSpacing: "-0.02em" }}>
          Sign in
        </h1>
        <p className="text-sm text-gray-600" style={{ fontFamily: "system-ui,sans-serif" }}>
          Use your company email to access the HRIS.
        </p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Email address"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); setError(""); }}
          placeholder="you@company.com"
          autoFocus
        />

        <InputField
          label="Password"
          type={showPass ? "text" : "password"}
          value={password}
          onChange={(v) => { setPassword(v); setError(""); }}
          placeholder="Enter your password"
          rightSlot={<EyeIcon show={showPass} onToggle={() => setShowPass((p) => !p)} />}
        />

        {error && (
          <p className="text-xs" style={{ fontFamily: "system-ui,sans-serif", color: "#f05a5a" }}>
            {error}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onForgotPassword}
          className="text-xs text-gray-500 hover:text-white transition-colors"
          style={{ fontFamily: "system-ui,sans-serif" }}
        >
          Forgot password?
        </button>
      </div>

      <Btn onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing in…" : "Sign In →"}
      </Btn>
    </div>
  );
}