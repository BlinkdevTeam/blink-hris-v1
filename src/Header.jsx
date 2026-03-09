import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ── Nav config ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard",    path: "/dashboard"  },
  { label: "People",       path: "/people"     },
  { label: "Payroll",      path: "/payroll"    },
  { label: "Time & Leave", path: "/time-leave" },
  { label: "Recruitment",  path: "/recruitment"},
  { label: "Reports",      path: "/reports"    },
];

// ── TopNav ────────────────────────────────────────────────────────────────────
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight active nav item
  const activeLabel = NAV_ITEMS.find(item =>
    location.pathname.startsWith(item.path)
  )?.label;

  // ── Temporary Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header
      className="border-b px-8 py-4 flex items-center justify-between flex-shrink-0"
      style={{ backgroundColor: "#000", borderColor: "#222" }}
    >
      <div className="flex items-center gap-10">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-white flex items-center justify-center">
            <span className="text-black font-bold text-sm" style={{ fontFamily: "monospace" }}>H</span>
          </div>
          <span className="text-lg text-white" style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Hera
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="px-4 py-1.5 rounded text-sm transition-all"
              style={{
                fontFamily:      "system-ui, sans-serif",
                backgroundColor: activeLabel === item.label ? "#fff" : "transparent",
                color:           activeLabel === item.label ? "#000" : "#666",
                fontWeight:      activeLabel === item.label ? 600    : 400,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-white">
          <span className="text-xl">🔔</span>
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs text-black bg-white flex items-center justify-center font-bold"
            style={{ fontFamily: "monospace" }}
          >
            3
          </span>
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
          AK
        </div>

        {/* ── Temporary Logout Button */}
        <button
          onClick={handleLogout}
          className="text-xs text-gray-500 hover:text-red-500 transition-colors px-2 py-1 border rounded"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}