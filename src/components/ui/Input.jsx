import React from "react";

export default function Input({ label, value, onChange, type = "text", placeholder = "", className = "", rightSlot }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1 text-sm text-gray-300">{label}</label>}
      <div className="relative flex items-center">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {rightSlot && <div className="absolute right-2">{rightSlot}</div>}
      </div>
    </div>
  );
}