import React, { useState, useMemo } from "react";
import FileOffsetRequestDrawer from "./FileOffsetRequestDrawer";
import GrantCustomOffsetDrawer from "./GrandCustomOffsetDrawer";
import {
  EMPLOYEES, Avatar, CURRENT_CUTOFF_END, hoursWorked, effectiveHours
} from "../../../data/compData";

export default function OffsetTab({ bank, setBank, requests, setRequests }) {
  const [subTab,        setSubTab]       = useState("bank");      // "bank" | "requests"
  const [showGrant,     setShowGrant]    = useState(false);
  const [showFile,      setShowFile]     = useState(false);
  const [empFilter,     setEmpFilter]    = useState("All");
  const [statusFilter,  setStatusFilter] = useState("All");

  const pendingRequests = requests.filter(r=>r.status==="Pending").length;

  // ── Bank helpers
  function grantCustom(form) {
    setBank(p=>[...p,{
      id:        "ob"+Date.now(),
      empId:     Number(form.empId),
      source:    "Custom",
      hours:     parseFloat(form.hours),
      earnedDate: form.earnedDate,
      otRef:     null,
      grantedBy: "Admin",
      reason:    form.reason,
      mode:      form.mode,
      expiresAt: CURRENT_CUTOFF_END,
      status:    "Available",
    }]);
    setShowGrant(false);
  }

  function voidBankEntry(id) {
    setBank(p=>p.map(b=>b.id===id?{...b,status:"Voided"}:b));
  }

  // ── Request helpers
  function fileRequest(form) {
    setRequests(p=>[...p,{
      id:        "or"+Date.now(),
      empId:     Number(form.empId),
      bankId:    form.bankId,
      hoursUsed: parseFloat(form.hoursUsed)||0,
      useDate:   form.useDate,
      mode:      form.mode,
      timeIn:    form.timeIn,
      timeOut:   form.timeOut,
      note:      form.note,
      filedBy:   form.filedBy,
      status:    "Pending",
      reviewedBy:null,
      reviewedOn:null,
    }]);
    setShowFile(false);
  }

  function approveRequest(id) {
    // Mark request approved, mark bank entry as Used
    const req = requests.find(r=>r.id===id);
    setRequests(p=>p.map(r=>r.id===id?{...r,status:"Approved",reviewedBy:"Admin",reviewedOn:"Mar 2, 2026"}:r));
    if (req) setBank(p=>p.map(b=>b.id===req.bankId?{...b,status:"Used"}:b));
  }

  function rejectRequest(id) {
    setRequests(p=>p.map(r=>r.id===id?{...r,status:"Rejected",reviewedBy:"Admin",reviewedOn:"Mar 2, 2026"}:r));
  }

  // ── Filtered bank
  const filteredBank = useMemo(()=>bank.filter(b=>{
    const empMatch = empFilter==="All" || String(b.empId)===empFilter;
    const stMatch  = statusFilter==="All" || b.status===statusFilter;
    return empMatch && stMatch;
  }),[bank,empFilter,statusFilter]);

  const filteredReqs = useMemo(()=>requests.filter(r=>{
    const empMatch = empFilter==="All" || String(r.empId)===empFilter;
    const stMatch  = statusFilter==="All" || r.status===statusFilter;
    return empMatch && stMatch;
  }),[requests,empFilter,statusFilter]);

  // Summary stats
  const totalAvailable = bank.filter(b=>b.status==="Available").reduce((s,b)=>s+b.hours,0);
  const totalUsed      = bank.filter(b=>b.status==="Used").reduce((s,b)=>s+b.hours,0);
  const totalExpired   = bank.filter(b=>b.status==="Expired").reduce((s,b)=>s+b.hours,0);
  const customGrants   = bank.filter(b=>b.source==="Custom").length;

  const MODE_LABELS = { "late-in":"Come in Late","early-out":"Leave Early","flexible":"Flexible" };
  const SOURCE_STYLE = { OT:{ bg:"#0a1a2a",color:"#5a9af0" }, Custom:{ bg:"#1a0a2a",color:"#c07af0" } };

  return (
    <>
      <div className="space-y-5">

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            ["Available Hours",  `${totalAvailable.toFixed(1)}h`, "#5af07a", "#0d0d0d"],
            ["Used This Cutoff", `${totalUsed.toFixed(1)}h`,      "#5a9af0", "#0d0d0d"],
            ["Expired / Voided", `${totalExpired.toFixed(1)}h`,   "#555",    "#0d0d0d"],
            ["Custom Grants",    `${customGrants}`,               "#c07af0", "#0d0d0d"],
          ].map(([l,v,c,bg])=>(
            <div key={l} className="rounded-lg p-4" style={{backgroundColor:bg,border:"1px solid #1e1e1e"}}>
              <p className="text-xs uppercase tracking-widest mb-2" style={{fontFamily:"system-ui,sans-serif",color:"#555"}}>{l}</p>
              <p className="text-2xl font-light" style={{fontFamily:"monospace",color:c}}>{v}</p>
            </div>
          ))}
        </div>

        {/* Sub-tabs + actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 rounded-lg p-0.5" style={{backgroundColor:"#111",border:"1px solid #2a2a2a"}}>
            <button onClick={()=>setSubTab("bank")}
              className="px-4 py-1.5 rounded text-sm transition-all"
              style={{fontFamily:"system-ui,sans-serif",backgroundColor:subTab==="bank"?"#fff":"transparent",color:subTab==="bank"?"#000":"#555"}}>
              Offset Bank
            </button>
            <button onClick={()=>setSubTab("requests")}
              className="px-4 py-1.5 rounded text-sm transition-all relative"
              style={{fontFamily:"system-ui,sans-serif",backgroundColor:subTab==="requests"?"#fff":"transparent",color:subTab==="requests"?"#000":"#555"}}>
              Requests
              {pendingRequests>0&&<span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full" style={{fontFamily:"monospace",backgroundColor:subTab==="requests"?"#1f1a0f":"#1f1a0f",color:"#f0c85a"}}>{pendingRequests}</span>}
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <select className="px-3 py-1.5 rounded text-xs text-gray-300 outline-none" style={{fontFamily:"system-ui,sans-serif",backgroundColor:"#111",border:"1px solid #2a2a2a"}}
              value={empFilter} onChange={e=>setEmpFilter(e.target.value)}>
              <option value="All">All Employees</option>
              {EMPLOYEES.map(e=><option key={e.id} value={String(e.id)}>{e.name}</option>)}
            </select>
            <select className="px-3 py-1.5 rounded text-xs text-gray-300 outline-none" style={{fontFamily:"system-ui,sans-serif",backgroundColor:"#111",border:"1px solid #2a2a2a"}}
              value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              {subTab==="bank"
                ? ["All","Available","Used","Expired","Voided"].map(s=><option key={s}>{s}</option>)
                : ["All","Pending","Approved","Rejected"].map(s=><option key={s}>{s}</option>)
              }
            </select>
            <div className="flex gap-2 ml-2">
              <button onClick={()=>setShowFile(true)}
                className="px-3 py-1.5 rounded text-xs hover:opacity-80"
                style={{fontFamily:"system-ui,sans-serif",backgroundColor:"#111",color:"#aaa",border:"1px solid #2a2a2a"}}>
                + File Request
              </button>
              <button onClick={()=>setShowGrant(true)}
                className="px-3 py-1.5 rounded text-xs font-medium bg-white text-black hover:opacity-80"
                style={{fontFamily:"system-ui,sans-serif"}}>
                + Grant Custom
              </button>
            </div>
          </div>
        </div>

        {/* ── BANK TABLE ── */}
        {subTab==="bank" && (
          <div className="rounded-lg overflow-hidden" style={{border:"1px solid #1e1e1e"}}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{backgroundColor:"#0a0a0a",borderBottom:"1px solid #1e1e1e"}}>
                  {["Employee","Source","Mode","Hours","Earned Date","Reason","Expires","Status",""].map(h=>(
                    <th key={h} className="px-4 py-3 text-left font-normal text-gray-600" style={{fontFamily:"system-ui,sans-serif",fontSize:10,textTransform:"uppercase",letterSpacing:"0.07em",whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBank.length===0?(
                  <tr><td colSpan={8} className="px-4 py-10 text-center text-gray-600" style={{fontFamily:"system-ui,sans-serif"}}>No offset bank entries found.</td></tr>
                ):filteredBank.map((b,i)=>{
                  const emp=EMPLOYEES.find(e=>e.id===b.empId);
                  const ss=SOURCE_STYLE[b.source]||SOURCE_STYLE.Custom;
                  const statusStyle={Available:{bg:"#0f1f0f",color:"#5af07a"},Used:{bg:"#0a1a2a",color:"#5a9af0"},Expired:{bg:"#1a1a1a",color:"#555"},Voided:{bg:"#1f0f0f",color:"#f05a5a"}}[b.status]||{bg:"#111",color:"#aaa"};
                  return(
                    <tr key={b.id} className="group" style={{borderBottom:i<filteredBank.length-1?"1px solid #141414":"none",backgroundColor:"#0d0d0d"}}
                      onMouseEnter={e=>e.currentTarget.style.backgroundColor="#111"}
                      onMouseLeave={e=>e.currentTarget.style.backgroundColor="#0d0d0d"}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {emp&&<Avatar emp={emp} size={26}/>}
                          <div>
                            <p className="text-gray-200 text-sm" style={{fontFamily:"system-ui,sans-serif"}}>{emp?.name}</p>
                            <p className="text-gray-600 text-xs" style={{fontFamily:"system-ui,sans-serif"}}>{emp?.dept}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded" style={{fontFamily:"system-ui,sans-serif",...ss}}>{b.source}</span>
                      </td>
                      <td className="px-4 py-3">
                        {b.mode ? (
                          <span className="text-xs px-2 py-0.5 rounded" style={{fontFamily:"system-ui,sans-serif",
                            backgroundColor: b.mode==="late-in"?"#0a1a2a":b.mode==="early-out"?"#1a1a0a":"#0a1a0a",
                            color: b.mode==="late-in"?"#5a9af0":b.mode==="early-out"?"#f0c85a":"#5af07a"}}>
                            {b.mode==="late-in"?"Come in Late":b.mode==="early-out"?"Leave Early":"Flexible"}
                          </span>
                        ) : <span className="text-gray-700 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3 font-medium" style={{fontFamily:"monospace",color:"#5af07a",fontSize:13}}>{b.hours.toFixed(1)}h</td>
                      <td className="px-4 py-3 text-gray-400 text-xs" style={{fontFamily:"monospace"}}>{b.earnedDate}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-xs" style={{fontFamily:"system-ui,sans-serif"}}>
                        <span className="line-clamp-2">{b.reason}</span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{fontFamily:"monospace",color:"#f0c85a"}}>{b.expiresAt}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{fontFamily:"system-ui,sans-serif",...statusStyle}}>{b.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        {b.status==="Available"&&(
                          <button onClick={()=>voidBankEntry(b.id)}
                            className="text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{fontFamily:"system-ui,sans-serif",backgroundColor:"#1f0f0f",color:"#f05a5a",border:"1px solid #3a1515"}}>
                            Void
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── REQUESTS TABLE ── */}
        {subTab==="requests" && (
          <div className="rounded-lg overflow-hidden" style={{border:"1px solid #1e1e1e"}}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{backgroundColor:"#0a0a0a",borderBottom:"1px solid #1e1e1e"}}>
                  {["Employee","Use Date","Mode","Schedule","Hours Used","Effective Day","Filed By","Status",""].map(h=>(
                    <th key={h} className="px-4 py-3 text-left font-normal text-gray-600" style={{fontFamily:"system-ui,sans-serif",fontSize:10,textTransform:"uppercase",letterSpacing:"0.07em",whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredReqs.length===0?(
                  <tr><td colSpan={9} className="px-4 py-10 text-center text-gray-600" style={{fontFamily:"system-ui,sans-serif"}}>No offset requests found.</td></tr>
                ):filteredReqs.map((r,i)=>{
                  const emp=EMPLOYEES.find(e=>e.id===r.empId);
                  const worked=hoursWorked(r.timeIn,r.timeOut);
                  const eff=effectiveHours(r.timeIn,r.timeOut,r.hoursUsed);
                  const valid=eff>=8;
                  const statusStyle={Pending:{bg:"#1f1a0f",color:"#f0c85a"},Approved:{bg:"#0f1f0f",color:"#5af07a"},Rejected:{bg:"#1f0f0f",color:"#f05a5a"}}[r.status]||{bg:"#111",color:"#aaa"};
                  return(
                    <tr key={r.id} className="group" style={{borderBottom:i<filteredReqs.length-1?"1px solid #141414":"none",backgroundColor:"#0d0d0d"}}
                      onMouseEnter={e=>e.currentTarget.style.backgroundColor="#111"}
                      onMouseLeave={e=>e.currentTarget.style.backgroundColor="#0d0d0d"}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {emp&&<Avatar emp={emp} size={26}/>}
                          <span className="text-gray-200 text-sm" style={{fontFamily:"system-ui,sans-serif"}}>{emp?.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-xs" style={{fontFamily:"monospace"}}>{r.useDate}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded" style={{fontFamily:"system-ui,sans-serif",backgroundColor:"#0a1a2a",color:"#5a9af0"}}>{MODE_LABELS[r.mode]}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-xs" style={{fontFamily:"monospace"}}>{r.timeIn} – {r.timeOut}</td>
                      <td className="px-4 py-3 text-xs font-medium" style={{fontFamily:"monospace",color:"#5a9af0"}}>+{r.hoursUsed.toFixed(1)}h</td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="text-sm font-medium" style={{fontFamily:"monospace",color:valid?"#5af07a":"#f05a5a"}}>{eff.toFixed(1)}h</span>
                          <p className="text-xs text-gray-600" style={{fontFamily:"system-ui,sans-serif"}}>{worked.toFixed(1)}h + {r.hoursUsed.toFixed(1)}h offset</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded" style={{fontFamily:"system-ui,sans-serif",backgroundColor:r.filedBy==="HR"?"#1a1a0a":"#0a0a1a",color:r.filedBy==="HR"?"#f0c85a":"#5a9af0"}}>{r.filedBy}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{fontFamily:"system-ui,sans-serif",...statusStyle}}>{r.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        {r.status==="Pending"&&(
                          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={()=>approveRequest(r.id)}
                              className="text-xs px-2 py-1 rounded hover:opacity-80"
                              style={{fontFamily:"system-ui,sans-serif",backgroundColor:"#0f2a0f",color:"#5af07a",border:"1px solid #2a4a2a"}}>✓ Approve</button>
                            <button onClick={()=>rejectRequest(r.id)}
                              className="text-xs px-2 py-1 rounded hover:opacity-80"
                              style={{fontFamily:"system-ui,sans-serif",backgroundColor:"#1a1a1a",color:"#888",border:"1px solid #2a2a2a"}}>✕</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showGrant && <GrantCustomOffsetDrawer onClose={()=>setShowGrant(false)} onSave={grantCustom}/>}
      {showFile  && <FileOffsetRequestDrawer bank={bank} onClose={()=>setShowFile(false)} onSave={fileRequest} filedBy="HR"/>}
    </>
  );
}