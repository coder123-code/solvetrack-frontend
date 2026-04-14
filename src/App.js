
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:8080/api/problems";

// const defaultProblem = {
//   questionName: "",
//   description: "",
//   link: "",
//   difficulty: "Easy",
//   note: "",
//   solved: false,
//   revise: false,
//   codeSnippet: "",
// };

// export default function App() {
//   const [problems, setProblems] = useState([]);

//   // ── Fetch all problems from backend on load ──
//   useEffect(() => {
//     axios.get(API).then((res) => setProblems(res.data)).catch(console.error);
//   }, []);

//   // ── Add a new blank row (saves to backend) ──
//   const addProblem = () => {
//     axios.post(API, defaultProblem).then((res) => {
//       setProblems((prev) => [...prev, res.data]);
//     });
//   };

//   // ── Delete a row ──
//   const deleteProblem = (id) => {
//     axios.delete(`${API}/${id}`).then(() => {
//       setProblems((prev) => prev.filter((p) => p.id !== id));
//     });
//   };

//   // ── Update any field inline ──
//   const updateField = (id, field, value) => {
//     setProblems((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
//     );
//   };

//   // ── Save updated row to backend on blur ──
//   const saveRow = (problem) => {
//     axios.put(`${API}/${problem.id}`, problem).catch(console.error);
//   };

//   // ── Toggle solved ──
//   const toggleSolved = (id) => {
//     axios.patch(`${API}/${id}/toggle-solved`).then((res) => {
//       setProblems((prev) => prev.map((p) => (p.id === id ? res.data : p)));
//     });
//   };

//   // ── Toggle revise ──
//   const toggleRevise = (id) => {
//     axios.patch(`${API}/${id}/toggle-revise`).then((res) => {
//       setProblems((prev) => prev.map((p) => (p.id === id ? res.data : p)));
//     });
//   };

//   return (
//     <div style={styles.app}>
//       {/* ── HEADER ── */}
//       <div style={styles.header}>
//         <div style={styles.headerLeft}>
//           <div style={styles.folderIcon}>📁</div>
//           <span style={styles.folderTitle}>problems</span>
//         </div>
//         <button style={styles.addBtn} onClick={addProblem}>
//           + Add Problem
//         </button>
//       </div>

//       {/* ── TABLE ── */}
//       <div style={styles.tableWrap}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               {[
//                 "", "Question Name", "Description", "Link",
//                 "Difficulty", "Note", "Solved", "Revise", "Snippet",
//               ].map((h) => (
//                 <th key={h} style={styles.th}>{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {problems.map((p) => (
//               <ProblemRow
//                 key={p.id}
//                 problem={p}
//                 onDelete={() => deleteProblem(p.id)}
//                 onFieldChange={(field, val) => updateField(p.id, field, val)}
//                 onBlur={() => saveRow(p)}
//                 onToggleSolved={() => toggleSolved(p.id)}
//                 onToggleRevise={() => toggleRevise(p.id)}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // ── SINGLE ROW COMPONENT ──
// function ProblemRow({ problem, onDelete, onFieldChange, onBlur, onToggleSolved, onToggleRevise }) {
//   return (
//     <tr style={styles.row}>
//       {/* Delete */}
//       <td style={styles.td}>
//         <button style={styles.delBtn} onClick={onDelete}>🗑</button>
//       </td>

//       {/* Question Name */}
//       <td style={styles.td}>
//         <input
//           style={styles.input}
//           placeholder="Problem name"
//           value={problem.questionName}
//           onChange={(e) => onFieldChange("questionName", e.target.value)}
//           onBlur={onBlur}
//         />
//       </td>

//       {/* Description */}
//       <td style={styles.td}>
//         <textarea
//           style={styles.textarea}
//           placeholder="Describe the problem..."
//           value={problem.description}
//           onChange={(e) => onFieldChange("description", e.target.value)}
//           onBlur={onBlur}
//         />
//       </td>

//       {/* Link */}
//       <td style={styles.td}>
//         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//           <input
//             style={{ ...styles.input, flex: 1, minWidth: 0 }}
//             placeholder="LeetCode / GFG url"
//             value={problem.link}
//             onChange={(e) => onFieldChange("link", e.target.value)}
//             onBlur={onBlur}
//           />
//           {problem.link && (
//             <a href={problem.link} target="_blank" rel="noreferrer" style={styles.linkGo}>↗</a>
//           )}
//         </div>
//       </td>

//       {/* Difficulty */}
//       <td style={styles.td}>
//         <select
//           style={styles.select}
//           value={problem.difficulty}
//           onChange={(e) => { onFieldChange("difficulty", e.target.value); onBlur(); }}
//         >
//           <option>Easy</option>
//           <option>Medium</option>
//           <option>Hard</option>
//         </select>
//       </td>

//       {/* Note */}
//       <td style={styles.td}>
//         <textarea
//           style={styles.textarea}
//           placeholder="Your notes..."
//           value={problem.note}
//           onChange={(e) => onFieldChange("note", e.target.value)}
//           onBlur={onBlur}
//         />
//       </td>

//       {/* Solved */}
//       <td style={{ ...styles.td, textAlign: "center" }}>
//         <input
//           type="checkbox"
//           checked={problem.solved}
//           onChange={onToggleSolved}
//           style={styles.checkbox}
//         />
//       </td>

//       {/* Revise */}
//       <td style={{ ...styles.td, textAlign: "center" }}>
//         <button style={styles.starBtn} onClick={onToggleRevise}>
//           {problem.revise ? "⭐" : "☆"}
//         </button>
//       </td>

//       {/* Code Snippet */}
//       <td style={styles.td}>
//         <textarea
//           style={{ ...styles.textarea, fontFamily: "monospace", fontSize: 11 }}
//           placeholder="Paste your code..."
//           value={problem.codeSnippet}
//           onChange={(e) => onFieldChange("codeSnippet", e.target.value)}
//           onBlur={onBlur}
//         />
//       </td>
//     </tr>
//   );
// }

// // ── STYLES ──
// const styles = {
//   app: {
//     background: "#0f0f0f",
//     minHeight: "100vh",
//     padding: 24,
//     fontFamily: "sans-serif",
//     color: "#e0e0e0",
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   headerLeft: { display: "flex", alignItems: "center", gap: 12 },
//   folderIcon: {
//     width: 36, height: 36,
//     background: "#3b82f6",
//     borderRadius: 8,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontSize: 18,
//   },
//   folderTitle: { fontSize: 22, fontWeight: 500, color: "#fff" },
//   addBtn: {
//     background: "transparent",
//     border: "1.5px solid #3b82f6",
//     color: "#3b82f6",
//     padding: "6px 16px",
//     borderRadius: 6,
//     fontSize: 13,
//     cursor: "pointer",
//     fontWeight: 500,
//   },
//   tableWrap: { overflowX: "auto" },
//   table: {
//     width: "100%",
//     borderCollapse: "separate",
//     borderSpacing: "0 8px",
//     minWidth: 900,
//   },
//   th: {
//     fontSize: 12,
//     fontWeight: 500,
//     color: "#888",
//     padding: "8px 10px",
//     textAlign: "left",
//     borderTop: "0.5px solid #333",
//     borderBottom: "0.5px solid #333",
//     background: "#0f0f0f",
//   },
//   row: {},
//   td: {
//     background: "#141414",
//     padding: "8px 10px",
//     verticalAlign: "middle",
//     borderTop: "0.5px solid #2a2a2a",
//     borderBottom: "0.5px solid #2a2a2a",
//   },
//   input: {
//     background: "#1e1e1e",
//     border: "0.5px solid #2e2e2e",
//     borderRadius: 6,
//     padding: "5px 8px",
//     fontSize: 13,
//     color: "#e0e0e0",
//     width: "100%",
//     outline: "none",
//   },
//   textarea: {
//     background: "#1e1e1e",
//     border: "0.5px solid #2e2e2e",
//     borderRadius: 6,
//     padding: "5px 8px",
//     fontSize: 13,
//     color: "#e0e0e0",
//     width: "100%",
//     resize: "none",
//     minHeight: 58,
//     lineHeight: 1.5,
//     outline: "none",
//     fontFamily: "sans-serif",
//   },
//   select: {
//     background: "#1e1e1e",
//     border: "0.5px solid #2e2e2e",
//     borderRadius: 6,
//     padding: "5px 6px",
//     fontSize: 12,
//     color: "#e0e0e0",
//     cursor: "pointer",
//     width: "100%",
//     outline: "none",
//   },
//   checkbox: { width: 16, height: 16, accentColor: "#3b82f6", cursor: "pointer" },
//   starBtn: { background: "transparent", border: "none", fontSize: 16, cursor: "pointer", padding: 0 },
//   delBtn: { background: "transparent", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: 15 },
//   linkGo: { color: "#3b82f6", fontSize: 12, textDecoration: "none", whiteSpace: "nowrap" },
// };
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";

// const PROBLEMS_API = "http://localhost:8080/api/problems";
// const FOLDERS_API  = "http://localhost:8080/api/folders";
// const DEFAULT_PROBLEM = {
//   questionName: "",
//   description: "",
//   link: "",
//   difficulty: "Easy",
//   note: "",
//   solved: false,
//   revise: false,
//   codeSnippet: ""
// };

// // ─────────────────────────────────────────────────────────────
// // ROOT
// // ─────────────────────────────────────────────────────────────
// export default function App() {
//   const [folders,        setFolders]        = useState([]);
//   const [activeFolder,   setActiveFolder]   = useState(null);
//   const [problems,       setProblems]       = useState([]);
//   const [filterDiff,     setFilterDiff]     = useState("All");
//   const [filterStatus,   setFilterStatus]   = useState("All");
//   const [search,         setSearch]         = useState("");
//   const [showFilter,     setShowFilter]     = useState(false);
//   const [showModal,      setShowModal]      = useState(false);
//   const [newFolderName,  setNewFolderName]  = useState("");

//   // Keep a ref to folders so async callbacks always see latest value
//   const foldersRef = useRef(folders);
//   useEffect(() => { foldersRef.current = folders; }, [folders]);

//   // Keep a ref to activeFolder so addProblem always sees latest
//   const activeFolderRef = useRef(activeFolder);
//   useEffect(() => { activeFolderRef.current = activeFolder; }, [activeFolder]);

//   // ── Load data on mount ──
//   useEffect(() => {
//     axios.get(PROBLEMS_API).then(r => setProblems(r.data)).catch(console.error);
//     axios.get(FOLDERS_API).then(r => setFolders(r.data)).catch(console.error);
//   }, []);

//   // ── Create folder ──
//   const createFolder = () => {
//     if (!newFolderName.trim()) return;
//     axios
//       .post(FOLDERS_API, { name: newFolderName, color: "#3b82f6", problemIds: [], starred: false })
//       .then(r => {
//         setFolders(prev => [...prev, r.data]);
//         setShowModal(false);
//         setNewFolderName("");
//       })
//       .catch(console.error);
//   };

//   // ── Add problem ──
//   // FIX: read activeFolder from ref, update folder on backend after getting new problem id
//   const addProblem = useCallback(() => {
//     const currentFolder = activeFolderRef.current;
//     if (!currentFolder) return;

//     axios.post(PROBLEMS_API, DEFAULT_PROBLEM)
//       .then(r => {
//         const newProblem = r.data;

//         // 1. Add problem to local state
//         setProblems(prev => [...prev, newProblem]);

//         // 2. Get the LATEST folder from ref (not stale closure)
//         const latestFolder = foldersRef.current.find(f => f.id === currentFolder.id);
//         if (!latestFolder) return;

//         const updatedProblemIds = [...(latestFolder.problemIds || []), newProblem.id];
//         const updatedFolder = { ...latestFolder, problemIds: updatedProblemIds };

//         // 3. Save updated folder to backend
//         axios.put(`${FOLDERS_API}/${latestFolder.id}`, updatedFolder)
//           .then(r2 => {
//             // 4. Update folder in state AND update activeFolder so table refreshes
//             setFolders(prev => prev.map(f => f.id === r2.data.id ? r2.data : f));
//             setActiveFolder(r2.data);
//           })
//           .catch(console.error);
//       })
//       .catch(console.error);
//   }, []); // no deps needed — reads from refs

//   // ── Delete problem ──
//   const deleteProblem = id => {
//     axios.delete(`${PROBLEMS_API}/${id}`)
//       .then(() => setProblems(prev => prev.filter(p => p.id !== id)))
//       .catch(console.error);
//   };

//   // ── Update a field locally ──
//   const updateField = (id, field, val) => {
//     setProblems(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));
//   };

//   // ── Save row to backend (called on blur) ──
//   // FIX: pass the full updated problem object directly — don't read from state
//   const saveRow = problem => {
//     axios.put(`${PROBLEMS_API}/${problem.id}`, problem).catch(console.error);
//   };

//   // ── Toggle solved ──
//   const toggleSolved = id => {
//     axios.patch(`${PROBLEMS_API}/${id}/toggle-solved`)
//       .then(r => setProblems(prev => prev.map(p => p.id === id ? r.data : p)))
//       .catch(console.error);
//   };

//   // ── Toggle revise ──
//   const toggleRevise = id => {
//     axios.patch(`${PROBLEMS_API}/${id}/toggle-revise`)
//       .then(r => setProblems(prev => prev.map(p => p.id === id ? r.data : p)))
//       .catch(console.error);
//   };

//   // ── Derived: problems in active folder ──
//   const folderProblems = activeFolder
//     ? problems.filter(p => (activeFolder.problemIds || []).includes(p.id))
//     : [];

//   // ── Derived: apply filters ──
//   const visible = folderProblems.filter(p => {
//     if (filterDiff   !== "All" && p.difficulty !== filterDiff)  return false;
//     if (filterStatus === "Solved"   && !p.solved)               return false;
//     if (filterStatus === "Unsolved" &&  p.solved)               return false;
//     if (search && !(p.questionName || "").toLowerCase().includes(search.toLowerCase())) return false;
//     return true;
//   });

//   const reviseInFolder = folderProblems.filter(p => p.revise);
//   const allRevise      = problems.filter(p => p.revise);

//   return (
//     <div style={css.root}>

//       {/* ════════ SIDEBAR ════════ */}
//       <aside style={css.sidebar}>
//         <div style={css.logo}>
//           <div style={css.logoIcon}>
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
//                 stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </div>
//           <span style={css.logoText}>SolveStack</span>
//         </div>

//         <div style={css.divider} />
//         <div style={css.sectionLabel}>ALL FOLDERS</div>

//         <div style={css.folderList}>
//           {folders.length === 0 ? (
//             <div style={css.noFolders}>
//               <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 6 }}>
//                 <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
//                   stroke="#444" strokeWidth="1.5"/>
//               </svg>
//               No folders yet
//             </div>
//           ) : folders.map(f => (
//             <div
//               key={f.id}
//               style={css.folderItem(activeFolder?.id === f.id)}
//               onClick={() => setActiveFolder(f)}
//             >
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
//                 <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
//                   stroke={activeFolder?.id === f.id ? "#3b82f6" : "#666"} strokeWidth="1.5"/>
//               </svg>
//               <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                 {f.name}
//               </span>
//               <span style={{ fontSize: 11, color: "#555" }}>{(f.problemIds || []).length}</span>
//             </div>
//           ))}
//         </div>

//         <div style={css.divider} />

//         <button style={css.createBtn} onClick={() => setShowModal(true)}>
//           <span style={{ fontSize: 18, marginRight: 6 }}>+</span> Create
//         </button>

//         {allRevise.length > 0 && (
//           <div style={css.reviseSide}>
//             <div style={css.reviseSideTitle}>⭐ REVISE LATER</div>
//             {allRevise.map(p => (
//               <div key={p.id} style={css.reviseSideItem}>
//                 <span style={{ color: "#4ade80", fontSize: 10 }}>●</span>
//                 <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12 }}>
//                   {p.questionName || "Untitled"}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={css.userRow}>
//           <div style={css.userAvatar}>g</div>
//         </div>
//       </aside>

//       {/* ════════ MAIN ════════ */}
//       <main style={css.main}>
//         {!activeFolder ? (
//           <div style={css.emptyState}>
//             <div style={css.emptyGlow} />
//             <div style={css.emptyCircle}>
//               <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
//                 <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
//                   stroke="#3b82f6" strokeWidth="1.2" fill="rgba(59,130,246,0.07)"/>
//               </svg>
//             </div>
//             <h2 style={css.emptyTitle}>No Folder Selected</h2>
//             <p style={css.emptySubtitle}>Please select a folder from the sidebar to view and manage your sums</p>
//             <div style={css.emptyHint}>✦ Choose a folder to get started ✦</div>
//             <div style={css.emptyTip}>💡 Tip: Tap on any folder in the sidebar to explore your content</div>
//           </div>
//         ) : (
//           <>
//             {/* Topbar */}
//             <div style={css.topbar}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <div style={css.topIcon}>📁</div>
//                 <span style={css.topTitle}>{activeFolder.name}</span>
//                 <span style={{ fontSize: 12, color: "#555" }}>
//                   {folderProblems.length} problem{folderProblems.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
//               <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                 <input
//                   style={css.searchInput}
//                   placeholder="🔍  Search problems..."
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                 />
//                 <button
//                   style={showFilter ? css.btnActive : css.btn}
//                   onClick={() => setShowFilter(v => !v)}
//                 >
//                   ⊙ Filter
//                 </button>
//                 <button style={css.addProblemBtn} onClick={addProblem}>
//                   ＋ Add Problem
//                 </button>
//               </div>
//             </div>

//             {/* Filter bar */}
//             {showFilter && (
//               <div style={css.filterBar}>
//                 <span style={css.filterLabel}>Difficulty:</span>
//                 {["All", "Easy", "Medium", "Hard"].map(d => (
//                   <div key={d} style={css.chip(filterDiff === d)} onClick={() => setFilterDiff(d)}>{d}</div>
//                 ))}
//                 <span style={{ ...css.filterLabel, marginLeft: 16 }}>Status:</span>
//                 {["All", "Solved", "Unsolved"].map(s => (
//                   <div key={s} style={css.chip(filterStatus === s)} onClick={() => setFilterStatus(s)}>{s}</div>
//                 ))}
//               </div>
//             )}

//             {/* Revise banner */}
//             {reviseInFolder.length > 0 && (
//               <div style={css.reviseBanner}>
//                 <div style={css.reviseBannerTitle}>
//                   ⭐ Marked for Revision — {reviseInFolder.length} problem{reviseInFolder.length > 1 ? "s" : ""}
//                 </div>
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
//                   {reviseInFolder.map(p => (
//                     <span key={p.id} style={css.reviseChip}>{p.questionName || "Untitled"}</span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Table */}
//             <div style={css.tableWrap}>
//               <table style={css.table}>
//                 <thead>
//                   <tr>
//                     {["", "Question Name", "Description", "Link", "Difficulty", "Note", "Solved", "Revise", "Snippet"].map((h, i) => (
//                       <th key={i} style={css.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {visible.length === 0 && (
//                     <tr>
//                       <td colSpan={9} style={{ textAlign: "center", padding: 40, color: "#444", background: "transparent", border: "none" }}>
//                         No problems yet — click "＋ Add Problem" to start
//                       </td>
//                     </tr>
//                   )}
//                   {visible.map(p => (
//                     <ProblemRow
//                       key={p.id}
//                       problem={p}
//                       onDelete={()         => deleteProblem(p.id)}
//                       onFieldChange={(f,v) => updateField(p.id, f, v)}
//                       onBlur={updated      => saveRow(updated)}
//                       onToggleSolved={()   => toggleSolved(p.id)}
//                       onToggleRevise={()   => toggleRevise(p.id)}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </main>

//       {/* ════════ CREATE FOLDER MODAL ════════ */}
//       {showModal && (
//         <div style={css.overlay} onClick={() => setShowModal(false)}>
//           <div style={css.modal} onClick={e => e.stopPropagation()}>
//             <div style={css.modalHeader}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <div style={css.modalHeaderIcon}>
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
//                       stroke="#3b82f6" strokeWidth="1.5"/>
//                     <path d="M12 11v6M9 14h6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
//                   </svg>
//                 </div>
//                 <span style={css.modalTitle}>Create Folder</span>
//               </div>
//               <button style={css.modalClose} onClick={() => setShowModal(false)}>✕</button>
//             </div>
//             <div style={css.divider} />
//             <div style={{ padding: "20px 24px 24px" }}>
//               <label style={css.modalLabel}>Folder Name</label>
//               <input
//                 style={css.modalInput}
//                 placeholder="Enter folder name..."
//                 value={newFolderName}
//                 onChange={e => setNewFolderName(e.target.value)}
//                 onKeyDown={e => e.key === "Enter" && createFolder()}
//                 autoFocus
//               />
//               <div style={css.modalFooter}>
//                 <button style={css.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
//                 <button style={css.createModalBtn} onClick={createFolder}>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }}>
//                     <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
//                       stroke="white" strokeWidth="1.5"/>
//                     <path d="M12 11v6M9 14h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
//                   </svg>
//                   Create
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // PROBLEM ROW
// // FIX: onBlur now passes the full current problem object up
// // ─────────────────────────────────────────────────────────────
// function ProblemRow({ problem, onDelete, onFieldChange, onBlur, onToggleSolved, onToggleRevise }) {
//   const [openDesc,    setOpenDesc]    = useState(false);
//   const [openNote,    setOpenNote]    = useState(false);
//   const [openSnippet, setOpenSnippet] = useState(false);

//   // Keep a ref to the latest problem so onBlur always sends fresh data
//   const problemRef = useRef(problem);
//   useEffect(() => { problemRef.current = problem; }, [problem]);

//   const handleBlur = () => onBlur(problemRef.current);

//   const p = problem;

//   return (
//     <tr>
//       {/* Delete */}
//       <td style={{ ...css.td, ...css.tdFirst }}>
//         <button style={css.delBtn} onClick={onDelete}>🗑</button>
//       </td>

//       {/* Question Name */}
//       <td style={css.td} width={150}>
//         <input
//           style={css.inlineInput}
//           placeholder="Problem name"
//           value={p.questionName}
//           onChange={e => onFieldChange("questionName", e.target.value)}
//           onBlur={handleBlur}
//         />
//       </td>

//       {/* Description */}
//       <td style={css.td} width={140}>
//         <button style={css.expandBtn} onClick={() => setOpenDesc(v => !v)}>
//           <span style={{ fontSize: 11 }}>{openDesc ? "▲" : "+"}</span>
//           <span style={{ color: p.description ? "#bbb" : "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 95 }}>
//             {p.description ? p.description.slice(0, 20) + (p.description.length > 20 ? "…" : "") : "Description"}
//           </span>
//         </button>
//         {openDesc && (
//           <textarea
//             style={css.expandArea}
//             autoFocus
//             placeholder="Describe the problem..."
//             value={p.description}
//             onChange={e => onFieldChange("description", e.target.value)}
//             onBlur={handleBlur}
//           />
//         )}
//       </td>

//       {/* Link */}
//       <td style={css.td} width={160}>
//         <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
//           <input
//             style={{ ...css.inlineInput, flex: 1, minWidth: 0 }}
//             placeholder="LeetCode / GFG url"
//             value={p.link}
//             onChange={e => onFieldChange("link", e.target.value)}
//             onBlur={handleBlur}
//           />
//           {p.link && (
//             <a href={p.link} target="_blank" rel="noreferrer" style={css.linkGo}>↗</a>
//           )}
//         </div>
//       </td>

//       {/* Difficulty */}
//       <td style={css.td} width={100}>
//         <select
//           style={css.select}
//           value={p.difficulty}
//           onChange={e => { onFieldChange("difficulty", e.target.value); handleBlur(); }}
//         >
//           <option>Easy</option>
//           <option>Medium</option>
//           <option>Hard</option>
//         </select>
//         <span style={css.badge(p.difficulty)}>{p.difficulty}</span>
//       </td>

//       {/* Note */}
//       <td style={css.td} width={140}>
//         <button style={css.expandBtn} onClick={() => setOpenNote(v => !v)}>
//           <span style={{ fontSize: 11 }}>{openNote ? "▲" : "+"}</span>
//           <span style={{ color: p.note ? "#bbb" : "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 95 }}>
//             {p.note ? p.note.slice(0, 20) + (p.note.length > 20 ? "…" : "") : "Note"}
//           </span>
//         </button>
//         {openNote && (
//           <textarea
//             style={css.expandArea}
//             autoFocus
//             placeholder="Notes, approach, complexity..."
//             value={p.note}
//             onChange={e => onFieldChange("note", e.target.value)}
//             onBlur={handleBlur}
//           />
//         )}
//       </td>

//       {/* Solved */}
//       <td style={{ ...css.td, textAlign: "center" }} width={60}>
//         <input type="checkbox" checked={p.solved} onChange={onToggleSolved} style={css.checkbox} />
//         <div style={{ fontSize: 10, color: p.solved ? "#4ade80" : "#555", marginTop: 2 }}>
//           {p.solved ? "Done" : "Pending"}
//         </div>
//       </td>

//       {/* Revise */}
//       <td style={{ ...css.td, textAlign: "center" }} width={60}>
//         <button style={css.starBtn} onClick={onToggleRevise}>{p.revise ? "⭐" : "☆"}</button>
//         <div style={{ fontSize: 10, color: p.revise ? "#fde68a" : "#555", marginTop: 2 }}>
//           {p.revise ? "Yes" : "No"}
//         </div>
//       </td>

//       {/* Snippet */}
//       <td style={{ ...css.td, ...css.tdLast }} width={150}>
//         <button style={css.expandBtn} onClick={() => setOpenSnippet(v => !v)}>
//           <span style={{ fontSize: 11 }}>{openSnippet ? "▲" : "+"}</span>
//           <span style={{ color: p.codeSnippet ? "#bbb" : "#555", fontFamily: p.codeSnippet ? "monospace" : "sans-serif", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 90 }}>
//             {p.codeSnippet ? p.codeSnippet.slice(0, 18) + "…" : "Code snippet"}
//           </span>
//         </button>
//         {openSnippet && (
//           <textarea
//             style={css.snippetArea}
//             autoFocus
//             placeholder="Paste your solution..."
//             value={p.codeSnippet}
//             onChange={e => onFieldChange("codeSnippet", e.target.value)}
//             onBlur={handleBlur}
//           />
//         )}
//       </td>
//     </tr>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // STYLES
// // ─────────────────────────────────────────────────────────────
// const css = {
//   root:         { display: "flex", height: "100vh", background: "#0d0d0d", fontFamily: "'Segoe UI', sans-serif", color: "#e0e0e0", overflow: "hidden" },

//   sidebar:      { width: 240, background: "#111318", borderRight: "1px solid #1e1e2a", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" },
//   logo:         { display: "flex", alignItems: "center", gap: 10, padding: "18px 16px 14px" },
//   logoIcon:     { width: 36, height: 36, background: "#1a2540", border: "1px solid #2a3a5a", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" },
//   logoText:     { fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" },
//   divider:      { height: 1, background: "#1e1e2a", margin: "0 0 8px" },
//   sectionLabel: { fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.1em", padding: "6px 16px 8px", textTransform: "uppercase" },
//   folderList:   { flex: 1, padding: "0 8px" },
//   noFolders:    { display: "flex", flexDirection: "column", alignItems: "center", color: "#555", fontSize: 13, padding: "24px 0" },
//   folderItem:   a => ({ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, color: a ? "#3b82f6" : "#aaa", background: a ? "rgba(59,130,246,0.1)" : "transparent", marginBottom: 2 }),
//   createBtn:    { display: "flex", alignItems: "center", justifyContent: "center", margin: "8px 16px 16px", padding: 11, borderRadius: 10, background: "#3b82f6", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" },
//   reviseSide:   { padding: "0 16px 12px" },
//   reviseSideTitle: { fontSize: 10, color: "#555", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 },
//   reviseSideItem:  { display: "flex", alignItems: "center", gap: 6, padding: "3px 0", color: "#86efac" },
//   userRow:      { padding: "12px 16px 16px", borderTop: "1px solid #1e1e2a", display: "flex", alignItems: "center", gap: 8, marginTop: "auto" },
//   userAvatar:   { width: 32, height: 32, borderRadius: "50%", background: "#1e2a3a", border: "1px solid #2a3a5a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#3b82f6", fontWeight: 600 },

//   main:         { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },

//   emptyState:   { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" },
//   emptyGlow:    { position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", pointerEvents: "none" },
//   emptyCircle:  { width: 120, height: 120, borderRadius: "50%", background: "#111318", border: "2px solid #1e3a6a", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, position: "relative", zIndex: 1 },
//   emptyTitle:   { fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 10, zIndex: 1 },
//   emptySubtitle:{ fontSize: 15, color: "#666", textAlign: "center", maxWidth: 360, marginBottom: 20, lineHeight: 1.6, zIndex: 1 },
//   emptyHint:    { color: "#3b82f6", fontSize: 14, marginBottom: 16, zIndex: 1 },
//   emptyTip:     { background: "#111318", border: "1px solid #1e1e2a", borderRadius: 10, padding: "12px 24px", fontSize: 13, color: "#777", zIndex: 1 },

//   topbar:       { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid #1e1e2a", flexShrink: 0 },
//   topIcon:      { width: 30, height: 30, background: "#1a2540", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 },
//   topTitle:     { fontSize: 18, fontWeight: 600, color: "#fff" },
//   searchInput:  { background: "#111318", border: "1px solid #1e1e2a", borderRadius: 8, padding: "7px 12px", fontSize: 12, color: "#e0e0e0", outline: "none", width: 200 },
//   btn:          { background: "transparent", border: "1px solid #1e1e2a", color: "#aaa", padding: "7px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer" },
//   btnActive:    { background: "rgba(59,130,246,0.1)", border: "1px solid #3b82f6", color: "#3b82f6", padding: "7px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer" },
//   addProblemBtn:{ background: "transparent", border: "1.5px solid #3b82f6", color: "#3b82f6", padding: "7px 16px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: 600 },

//   filterBar:    { display: "flex", gap: 8, padding: "10px 24px", borderBottom: "1px solid #1e1e2a", flexShrink: 0, flexWrap: "wrap", alignItems: "center" },
//   filterLabel:  { fontSize: 12, color: "#666" },
//   chip:         a => ({ padding: "4px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", border: "1px solid", borderColor: a ? "#3b82f6" : "#1e1e2a", background: a ? "rgba(59,130,246,0.1)" : "#111318", color: a ? "#3b82f6" : "#888" }),

//   reviseBanner:     { background: "rgba(16,40,16,0.6)", borderBottom: "1px solid #1e3a1e", padding: "10px 24px", flexShrink: 0 },
//   reviseBannerTitle:{ fontSize: 11, color: "#4ade80", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" },
//   reviseChip:       { background: "#1a2e1a", border: "1px solid #2d4a2d", borderRadius: 6, padding: "3px 10px", fontSize: 12, color: "#86efac", display: "inline-block" },

//   tableWrap:    { flex: 1, overflowY: "auto", overflowX: "auto", padding: "16px 24px" },
//   table:        { width: "100%", borderCollapse: "separate", borderSpacing: "0 6px", minWidth: 900 },
//   th:           { fontSize: 11, fontWeight: 500, color: "#555", padding: "6px 8px", textAlign: "left", borderTop: "1px solid #1a1a2a", borderBottom: "1px solid #1a1a2a", background: "#0d0d0d", whiteSpace: "nowrap" },
//   td:           { background: "#111318", padding: "8px 8px", verticalAlign: "top", borderTop: "1px solid #1a1a22", borderBottom: "1px solid #1a1a22" },
//   tdFirst:      { borderLeft: "1px solid #1a1a22", borderRadius: "8px 0 0 8px" },
//   tdLast:       { borderRight: "1px solid #1a1a22", borderRadius: "0 8px 8px 0" },

//   inlineInput:  { background: "#0d0d0d", border: "1px solid #1e1e2a", borderRadius: 6, padding: "6px 8px", fontSize: 12, color: "#e0e0e0", width: "100%", outline: "none" },
//   expandBtn:    { background: "#0d0d0d", border: "1px solid #1e1e2a", borderRadius: 6, padding: "6px 8px", fontSize: 12, color: "#555", cursor: "pointer", width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 6 },
//   expandArea:   { background: "#0a0a12", border: "1px solid #3b82f6", borderRadius: 6, padding: 8, marginTop: 4, width: "100%", fontSize: 12, color: "#e0e0e0", resize: "vertical", minHeight: 80, outline: "none", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.5, display: "block", boxSizing: "border-box" },
//   snippetArea:  { background: "#0a0a12", border: "1px solid #3b82f6", borderRadius: 6, padding: 8, marginTop: 4, width: "100%", fontSize: 11, color: "#e0e0e0", resize: "vertical", minHeight: 80, outline: "none", fontFamily: "monospace", lineHeight: 1.5, display: "block", boxSizing: "border-box" },
//   select:       { background: "#0d0d0d", border: "1px solid #1e1e2a", borderRadius: 6, padding: "5px 6px", fontSize: 12, color: "#e0e0e0", cursor: "pointer", width: "100%", outline: "none", marginBottom: 4 },
//   badge:        d => ({ display: "inline-block", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, background: d === "Easy" ? "#14532d" : d === "Medium" ? "#713f12" : "#7f1d1d", color: d === "Easy" ? "#86efac" : d === "Medium" ? "#fde68a" : "#fca5a5" }),
//   checkbox:     { width: 15, height: 15, accentColor: "#3b82f6", cursor: "pointer" },
//   starBtn:      { background: "transparent", border: "none", fontSize: 16, cursor: "pointer", padding: 0 },
//   delBtn:       { background: "transparent", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: 14, padding: 0 },
//   linkGo:       { color: "#3b82f6", fontSize: 12, textDecoration: "none", flexShrink: 0 },

//   overlay:      { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 },
//   modal:        { background: "#111318", border: "1px solid #1e1e2a", borderRadius: 16, width: 400, overflow: "hidden" },
//   modalHeader:  { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px" },
//   modalHeaderIcon: { width: 32, height: 32, background: "#1a2540", border: "1px solid #2a3a5a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" },
//   modalTitle:   { fontSize: 16, fontWeight: 700, color: "#fff" },
//   modalClose:   { background: "transparent", border: "none", color: "#666", fontSize: 18, cursor: "pointer" },
//   modalLabel:   { fontSize: 13, fontWeight: 600, color: "#ccc", display: "block", marginBottom: 8 },
//   modalInput:   { background: "#0d0d0d", border: "1px solid #1e1e2a", borderRadius: 8, padding: "12px 14px", fontSize: 14, color: "#e0e0e0", width: "100%", outline: "none", marginBottom: 20, boxSizing: "border-box" },
//   modalFooter:  { display: "flex", gap: 10 },
//   cancelBtn:    { flex: 1, background: "#1a1a24", border: "1px solid #1e1e2a", borderRadius: 10, color: "#aaa", padding: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" },
//   createModalBtn:{ flex: 1.5, background: "#3b82f6", border: "none", borderRadius: 10, color: "#fff", padding: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
// };
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:8080/api";

// export default function App() {
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [showCreateFolder, setShowCreateFolder] = useState(false);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");

//   // Load data
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [foldersRes, problemsRes] = await Promise.all([
//         axios.get(`${API}/folders`),
//         axios.get(`${API}/problems`)
//       ]);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.error("Failed to load data", err);
//     }
//   };

//   // Create folder
//   const createFolder = async () => {
//     if (!newFolderName.trim()) return;
//     try {
//       const res = await axios.post(`${API}/folders`, {
//         name: newFolderName,
//         problemIds: []
//       });
//       setFolders([...folders, res.data]);
//       setNewFolderName("");
//       setShowCreateFolder(false);
//     } catch (err) {
//       console.error("Failed to create folder", err);
//     }
//   };

//   // Add problem to active folder
//   const addProblem = async () => {
//     if (!activeFolder) return;
    
//     try {
//       // Create empty problem
//       const problemRes = await axios.post(`${API}/problems`, {
//         questionName: "New Problem",
//         description: "",
//         link: "",
//         difficulty: "Easy",
//         note: "",
//         solved: false,
//         revise: false,
//         codeSnippet: ""
//       });
      
//       const newProblem = problemRes.data;
//       setProblems([...problems, newProblem]);
      
//       // Add to folder
//       const updatedFolder = {
//         ...activeFolder,
//         problemIds: [...activeFolder.problemIds, newProblem.id]
//       };
      
//       const folderRes = await axios.put(`${API}/folders/${activeFolder.id}`, updatedFolder);
//       setActiveFolder(folderRes.data);
//       setFolders(folders.map(f => f.id === folderRes.data.id ? folderRes.data : f));
      
//     } catch (err) {
//       console.error("Failed to add problem", err);
//     }
//   };

//   // Update problem
//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
    
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.error("Failed to update problem", err);
//     }
//   };

//   // Toggle solved/revise
//   const toggleField = async (id, field) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, [field]: !problem[field] };
    
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.error(`Failed to toggle ${field}`, err);
//     }
//   };

//   // Delete problem
//   const deleteProblem = async (id) => {
//     try {
//       await axios.delete(`${API}/problems/${id}`);
//       setProblems(problems.filter(p => p.id !== id));
      
//       // Remove from folder
//       if (activeFolder) {
//         const updatedFolder = {
//           ...activeFolder,
//           problemIds: activeFolder.problemIds.filter(pid => pid !== id)
//         };
//         const folderRes = await axios.put(`${API}/folders/${activeFolder.id}`, updatedFolder);
//         setActiveFolder(folderRes.data);
//         setFolders(folders.map(f => f.id === folderRes.data.id ? folderRes.data : f));
//       }
//     } catch (err) {
//       console.error("Failed to delete problem", err);
//     }
//   };

//   // Get problems in active folder
//   const folderProblems = activeFolder 
//     ? problems.filter(p => activeFolder.problemIds?.includes(p.id))
//     : [];

//   // Filter problems
//   const filteredProblems = folderProblems.filter(p => 
//     !search || p.questionName?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div style={styles.app}>
//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         <h2 style={styles.logo}>SolveStack</h2>
        
//         <button style={styles.createFolderBtn} onClick={() => setShowCreateFolder(true)}>
//           + New Folder
//         </button>
        
//         <div style={styles.folderList}>
//           {folders.map(folder => (
//             <div
//               key={folder.id}
//               style={{
//                 ...styles.folder,
//                 ...(activeFolder?.id === folder.id ? styles.activeFolder : {})
//               }}
//               onClick={() => setActiveFolder(folder)}
//             >
//               📁 {folder.name} ({folder.problemIds?.length || 0})
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={styles.main}>
//         {!activeFolder ? (
//           <div style={styles.emptyState}>
//             <h3>Select a folder to get started</h3>
//             <p>Click on any folder from the sidebar</p>
//           </div>
//         ) : (
//           <>
//             {/* Header */}
//             <div style={styles.header}>
//               <h2>{activeFolder.name}</h2>
//               <div style={styles.headerActions}>
//                 <input
//                   style={styles.search}
//                   placeholder="Search problems..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button style={styles.addBtn} onClick={addProblem}>
//                   + Add Problem
//                 </button>
//               </div>
//             </div>

//             {/* Problems Table */}
//             <div style={styles.tableContainer}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th></th>
//                     <th>Problem</th>
//                     <th>Difficulty</th>
//                     <th>Solved</th>
//                     <th>Revise</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredProblems.map(problem => (
//                     <ProblemRow
//                       key={problem.id}
//                       problem={problem}
//                       onUpdate={(updates) => updateProblem(problem.id, updates)}
//                       onToggleSolved={() => toggleField(problem.id, "solved")}
//                       onToggleRevise={() => toggleField(problem.id, "revise")}
//                       onDelete={() => deleteProblem(problem.id)}
//                     />
//                   ))}
//                   {filteredProblems.length === 0 && (
//                     <tr>
//                       <td colSpan="6" style={styles.noData}>
//                         No problems yet. Click "Add Problem" to get started!
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Create Folder Modal */}
//       {showCreateFolder && (
//         <div style={styles.modalOverlay} onClick={() => setShowCreateFolder(false)}>
//           <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <h3>Create New Folder</h3>
//             <input
//               style={styles.modalInput}
//               placeholder="Folder name"
//               value={newFolderName}
//               onChange={(e) => setNewFolderName(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && createFolder()}
//             />
//             <div style={styles.modalActions}>
//               <button onClick={() => setShowCreateFolder(false)}>Cancel</button>
//               <button onClick={createFolder}>Create</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Simplified Problem Row Component
// function ProblemRow({ problem, onUpdate, onToggleSolved, onToggleRevise, onDelete }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(problem.questionName);

//   const handleSave = () => {
//     onUpdate({ questionName: editValue });
//     setIsEditing(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSave();
//     if (e.key === "Escape") {
//       setEditValue(problem.questionName);
//       setIsEditing(false);
//     }
//   };

//   return (
//     <tr style={styles.row}>
//       <td style={styles.cell}>
//         <button style={styles.deleteBtn} onClick={onDelete}>🗑️</button>
//       </td>
//       <td style={styles.cell}>
//         {isEditing ? (
//           <input
//             style={styles.editInput}
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//             onBlur={handleSave}
//             onKeyDown={handleKeyPress}
//             autoFocus
//           />
//         ) : (
//           <span onClick={() => setIsEditing(true)} style={styles.editable}>
//             {problem.questionName || "Click to edit"}
//           </span>
//         )}
//       </td>
//       <td style={styles.cell}>
//         <select
//           value={problem.difficulty}
//           onChange={(e) => onUpdate({ difficulty: e.target.value })}
//           style={styles.select}
//         >
//           <option>Easy</option>
//           <option>Medium</option>
//           <option>Hard</option>
//         </select>
//       </td>
//       <td style={styles.cell}>
//         <input
//           type="checkbox"
//           checked={problem.solved}
//           onChange={onToggleSolved}
//           style={styles.checkbox}
//         />
//       </td>
//       <td style={styles.cell}>
//         <button style={styles.starBtn} onClick={onToggleRevise}>
//           {problem.revise ? "⭐" : "☆"}
//         </button>
//       </td>
//       <td style={styles.cell}>
//         <button style={styles.linkBtn} onClick={() => window.open(problem.link, "_blank")}>
//           🔗
//         </button>
//       </td>
//     </tr>
//   );
// }

// // Simplified Styles
// const styles = {
//   app: {
//     display: "flex",
//     height: "100vh",
//     fontFamily: "system-ui, -apple-system, sans-serif",
//     background: "#0a0a0a",
//     color: "#e0e0e0"
//   },
//   sidebar: {
//     width: 260,
//     background: "#111",
//     borderRight: "1px solid #222",
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px"
//   },
//   logo: {
//     margin: 0,
//     fontSize: "20px",
//     color: "#3b82f6"
//   },
//   createFolderBtn: {
//     padding: "10px",
//     background: "#3b82f6",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "bold"
//   },
//   folderList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px"
//   },
//   folder: {
//     padding: "10px",
//     background: "#1a1a1a",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "all 0.2s"
//   },
//   activeFolder: {
//     background: "#3b82f6",
//     color: "white"
//   },
//   main: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden"
//   },
//   emptyState: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#666"
//   },
//   header: {
//     padding: "20px",
//     borderBottom: "1px solid #222",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   headerActions: {
//     display: "flex",
//     gap: "12px"
//   },
//   search: {
//     padding: "8px 12px",
//     background: "#1a1a1a",
//     border: "1px solid #333",
//     borderRadius: "6px",
//     color: "#e0e0e0",
//     outline: "none"
//   },
//   addBtn: {
//     padding: "8px 16px",
//     background: "transparent",
//     border: "1px solid #3b82f6",
//     color: "#3b82f6",
//     borderRadius: "6px",
//     cursor: "pointer"
//   },
//   tableContainer: {
//     flex: 1,
//     overflow: "auto",
//     padding: "20px"
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse"
//   },
//   row: {
//     borderBottom: "1px solid #222"
//   },
//   cell: {
//     padding: "12px 8px",
//     textAlign: "left"
//   },
//   editable: {
//     cursor: "pointer",
//     padding: "4px 8px",
//     borderRadius: "4px",
//     display: "inline-block"
//   },
//   editInput: {
//     padding: "6px 8px",
//     background: "#1a1a1a",
//     border: "1px solid #3b82f6",
//     borderRadius: "4px",
//     color: "#e0e0e0",
//     width: "200px"
//   },
//   select: {
//     padding: "6px 8px",
//     background: "#1a1a1a",
//     border: "1px solid #333",
//     borderRadius: "4px",
//     color: "#e0e0e0"
//   },
//   checkbox: {
//     width: "18px",
//     height: "18px",
//     cursor: "pointer"
//   },
//   starBtn: {
//     background: "none",
//     border: "none",
//     fontSize: "18px",
//     cursor: "pointer",
//     padding: 0
//   },
//   deleteBtn: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px"
//   },
//   linkBtn: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px"
//   },
//   noData: {
//     textAlign: "center",
//     padding: "40px",
//     color: "#666"
//   },
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "rgba(0,0,0,0.8)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   modal: {
//     background: "#1a1a1a",
//     padding: "24px",
//     borderRadius: "12px",
//     width: "320px"
//   },
//   modalInput: {
//     width: "100%",
//     padding: "10px",
//     margin: "16px 0",
//     background: "#0a0a0a",
//     border: "1px solid #333",
//     borderRadius: "6px",
//     color: "#e0e0e0"
//   },
//   modalActions: {
//     display: "flex",
//     gap: "12px",
//     justifyContent: "flex-end"
//   }
// };
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:8080/api";

// export default function App() {
//   // State
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDifficulty, setFilterDifficulty] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [showFilters, setShowFilters] = useState(false);

//   // Load data on startup
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [foldersRes, problemsRes] = await Promise.all([
//         axios.get(`${API}/folders`),
//         axios.get(`${API}/problems`)
//       ]);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   // Create new folder
//   const createFolder = async () => {
//     if (!newFolderName.trim()) return;
//     try {
//       const response = await axios.post(`${API}/folders`, {
//         name: newFolderName,
//         problemIds: []
//       });
//       setFolders([...folders, response.data]);
//       setNewFolderName("");
//       setShowCreateModal(false);
//     } catch (error) {
//       console.error("Error creating folder:", error);
//     }
//   };

//   // Add new problem to active folder
//   const addProblem = async () => {
//     if (!activeFolder) return;
    
//     try {
//       // Create empty problem
//       const problemResponse = await axios.post(`${API}/problems`, {
//         questionName: "New Problem",
//         description: "",
//         link: "",
//         difficulty: "Easy",
//         note: "",
//         solved: false,
//         revise: false,
//         codeSnippet: ""
//       });
      
//       const newProblem = problemResponse.data;
//       setProblems([...problems, newProblem]);
      
//       // Add problem to folder
//       const updatedFolder = {
//         ...activeFolder,
//         problemIds: [...activeFolder.problemIds, newProblem.id]
//       };
      
//       const folderResponse = await axios.put(`${API}/folders/${activeFolder.id}`, updatedFolder);
//       setActiveFolder(folderResponse.data);
//       setFolders(folders.map(f => f.id === folderResponse.data.id ? folderResponse.data : f));
      
//     } catch (error) {
//       console.error("Error adding problem:", error);
//     }
//   };

//   // Update problem (generic function)
//   const updateProblem = async (problemId, updates) => {
//     const problem = problems.find(p => p.id === problemId);
//     const updatedProblem = { ...problem, ...updates };
    
//     try {
//       const response = await axios.put(`${API}/problems/${problemId}`, updatedProblem);
//       setProblems(problems.map(p => p.id === problemId ? response.data : p));
//     } catch (error) {
//       console.error("Error updating problem:", error);
//     }
//   };

//   // Toggle solved status
//   const toggleSolved = async (problemId) => {
//     const problem = problems.find(p => p.id === problemId);
//     await updateProblem(problemId, { solved: !problem.solved });
//   };

//   // Toggle revise status
//   const toggleRevise = async (problemId) => {
//     const problem = problems.find(p => p.id === problemId);
//     await updateProblem(problemId, { revise: !problem.revise });
//   };

//   // Delete problem
//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
//       setProblems(problems.filter(p => p.id !== problemId));
      
//       // Remove from active folder if needed
//       if (activeFolder) {
//         const updatedFolder = {
//           ...activeFolder,
//           problemIds: activeFolder.problemIds.filter(id => id !== problemId)
//         };
//         const folderResponse = await axios.put(`${API}/folders/${activeFolder.id}`, updatedFolder);
//         setActiveFolder(folderResponse.data);
//         setFolders(folders.map(f => f.id === folderResponse.data.id ? folderResponse.data : f));
//       }
//     } catch (error) {
//       console.error("Error deleting problem:", error);
//     }
//   };

//   // Get problems in current folder
//   const folderProblems = activeFolder 
//     ? problems.filter(p => activeFolder.problemIds?.includes(p.id))
//     : [];

//   // Apply filters and search
//   const filteredProblems = folderProblems.filter(problem => {
//     // Search filter
//     if (search && !problem.questionName?.toLowerCase().includes(search.toLowerCase())) {
//       return false;
//     }
    
//     // Difficulty filter
//     if (filterDifficulty !== "All" && problem.difficulty !== filterDifficulty) {
//       return false;
//     }
    
//     // Status filter
//     if (filterStatus === "Solved" && !problem.solved) return false;
//     if (filterStatus === "Unsolved" && problem.solved) return false;
    
//     return true;
//   });

//   // Problems marked for revision
//   const reviseProblems = problems.filter(p => p.revise);

//   return (
//     <div style={styles.app}>
//       {/* SIDEBAR */}
//       <div style={styles.sidebar}>
//         <div style={styles.logo}>
//           <span style={styles.logoIcon}>📚</span>
//           <span style={styles.logoText}>SolveStack</span>
//         </div>

//         <button style={styles.createFolderBtn} onClick={() => setShowCreateModal(true)}>
//           + Create Folder
//         </button>

//         <div style={styles.foldersSection}>
//           <div style={styles.sectionTitle}>ALL FOLDERS</div>
//           {folders.map(folder => (
//             <div
//               key={folder.id}
//               style={{
//                 ...styles.folderItem,
//                 ...(activeFolder?.id === folder.id ? styles.activeFolder : {})
//               }}
//               onClick={() => setActiveFolder(folder)}
//             >
//               <span>📁 {folder.name}</span>
//               <span style={styles.folderCount}>{(folder.problemIds || []).length}</span>
//             </div>
//           ))}
//         </div>

//         {reviseProblems.length > 0 && (
//           <div style={styles.reviseSection}>
//             <div style={styles.sectionTitle}>⭐ REVISE LATER</div>
//             {reviseProblems.map(problem => (
//               <div key={problem.id} style={styles.reviseItem}>
//                 <span>•</span>
//                 <span style={styles.reviseText}>{problem.questionName || "Untitled"}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* MAIN CONTENT */}
//       <div style={styles.main}>
//         {!activeFolder ? (
//           <div style={styles.emptyState}>
//             <div style={styles.emptyIcon}>📁</div>
//             <h2>No Folder Selected</h2>
//             <p>Select a folder from the sidebar or create a new one to get started</p>
//           </div>
//         ) : (
//           <>
//             {/* Header */}
//             <div style={styles.header}>
//               <div style={styles.headerLeft}>
//                 <span style={styles.folderIcon}>📁</span>
//                 <h2 style={styles.folderTitle}>{activeFolder.name}</h2>
//                 <span style={styles.problemCount}>
//                   {folderProblems.length} problem{folderProblems.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
              
//               <div style={styles.headerRight}>
//                 <input
//                   style={styles.searchInput}
//                   placeholder="🔍 Search problems..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button 
//                   style={showFilters ? styles.activeFilterBtn : styles.filterBtn}
//                   onClick={() => setShowFilters(!showFilters)}
//                 >
//                   Filter
//                 </button>
//                 <button style={styles.addBtn} onClick={addProblem}>
//                   + Add Problem
//                 </button>
//               </div>
//             </div>

//             {/* Filter Bar */}
//             {showFilters && (
//               <div style={styles.filterBar}>
//                 <div style={styles.filterGroup}>
//                   <span>Difficulty:</span>
//                   {["All", "Easy", "Medium", "Hard"].map(d => (
//                     <button
//                       key={d}
//                       style={filterDifficulty === d ? styles.activeChip : styles.chip}
//                       onClick={() => setFilterDifficulty(d)}
//                     >
//                       {d}
//                     </button>
//                   ))}
//                 </div>
//                 <div style={styles.filterGroup}>
//                   <span>Status:</span>
//                   {["All", "Solved", "Unsolved"].map(s => (
//                     <button
//                       key={s}
//                       style={filterStatus === s ? styles.activeChip : styles.chip}
//                       onClick={() => setFilterStatus(s)}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Revision Banner */}
//             {filteredProblems.filter(p => p.revise).length > 0 && (
//               <div style={styles.revisionBanner}>
//                 <div style={styles.bannerTitle}>
//                   ⭐ Marked for Revision — {filteredProblems.filter(p => p.revise).length} problem
//                 </div>
//                 <div style={styles.bannerProblems}>
//                   {filteredProblems.filter(p => p.revise).map(p => (
//                     <span key={p.id} style={styles.revisionChip}>
//                       {p.questionName || "Untitled"}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Problems Table */}
//             <div style={styles.tableContainer}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}></th>
//                     <th style={styles.th}>Question Name</th>
//                     <th style={styles.th}>Description</th>
//                     <th style={styles.th}>Link</th>
//                     <th style={styles.th}>Difficulty</th>
//                     <th style={styles.th}>Note</th>
//                     <th style={styles.th}>Solved</th>
//                     <th style={styles.th}>Revise</th>
//                     <th style={styles.th}>Snippet</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredProblems.map(problem => (
//                     <ProblemRow
//                       key={problem.id}
//                       problem={problem}
//                       onUpdate={(updates) => updateProblem(problem.id, updates)}
//                       onToggleSolved={() => toggleSolved(problem.id)}
//                       onToggleRevise={() => toggleRevise(problem.id)}
//                       onDelete={() => deleteProblem(problem.id)}
//                     />
//                   ))}
//                   {filteredProblems.length === 0 && (
//                     <tr>
//                       <td colSpan="9" style={styles.noData}>
//                         No problems found. Click "Add Problem" to get started!
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Create Folder Modal */}
//       {showCreateModal && (
//         <div style={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
//           <div style={styles.modal} onClick={e => e.stopPropagation()}>
//             <div style={styles.modalHeader}>
//               <h3>Create New Folder</h3>
//               <button style={styles.closeBtn} onClick={() => setShowCreateModal(false)}>✕</button>
//             </div>
//             <input
//               style={styles.modalInput}
//               placeholder="Folder name..."
//               value={newFolderName}
//               onChange={(e) => setNewFolderName(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && createFolder()}
//               autoFocus
//             />
//             <div style={styles.modalFooter}>
//               <button style={styles.cancelBtn} onClick={() => setShowCreateModal(false)}>
//                 Cancel
//               </button>
//               <button style={styles.createBtn} onClick={createFolder}>
//                 Create Folder
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // PROBLEM ROW COMPONENT (with all features)
// function ProblemRow({ problem, onUpdate, onToggleSolved, onToggleRevise, onDelete }) {
//   const [expandedFields, setExpandedFields] = useState({
//     description: false,
//     note: false,
//     snippet: false
//   });

//   const toggleExpand = (field) => {
//     setExpandedFields({
//       ...expandedFields,
//       [field]: !expandedFields[field]
//     });
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch(difficulty) {
//       case "Easy": return styles.easyBadge;
//       case "Medium": return styles.mediumBadge;
//       case "Hard": return styles.hardBadge;
//       default: return {};
//     }
//   };

//   return (
//     <tr style={styles.tr}>
//       {/* Delete */}
//       <td style={styles.td}>
//         <button style={styles.deleteBtn} onClick={onDelete}>🗑️</button>
//       </td>

//       {/* Question Name */}
//       <td style={styles.td}>
//         <input
//           style={styles.input}
//           value={problem.questionName || ""}
//           onChange={(e) => onUpdate({ questionName: e.target.value })}
//           placeholder="Problem name"
//         />
//       </td>

//       {/* Description */}
//       <td style={styles.td}>
//         <button style={styles.expandBtn} onClick={() => toggleExpand("description")}>
//           {expandedFields.description ? "▼" : "▶"} Description
//         </button>
//         {expandedFields.description && (
//           <textarea
//             style={styles.textarea}
//             value={problem.description || ""}
//             onChange={(e) => onUpdate({ description: e.target.value })}
//             placeholder="Describe the problem..."
//             rows={3}
//           />
//         )}
//       </td>

//       {/* Link */}
//       <td style={styles.td}>
//         <input
//           style={styles.input}
//           value={problem.link || ""}
//           onChange={(e) => onUpdate({ link: e.target.value })}
//           placeholder="https://..."
//         />
//         {problem.link && (
//           <a href={problem.link} target="_blank" rel="noopener noreferrer" style={styles.linkIcon}>
//             🔗
//           </a>
//         )}
//       </td>

//       {/* Difficulty */}
//       <td style={styles.td}>
//         <select
//           style={styles.select}
//           value={problem.difficulty}
//           onChange={(e) => onUpdate({ difficulty: e.target.value })}
//         >
//           <option>Easy</option>
//           <option>Medium</option>
//           <option>Hard</option>
//         </select>
//         <span style={{...styles.badge, ...getDifficultyColor(problem.difficulty)}}>
//           {problem.difficulty}
//         </span>
//       </td>

//       {/* Note */}
//       <td style={styles.td}>
//         <button style={styles.expandBtn} onClick={() => toggleExpand("note")}>
//           {expandedFields.note ? "▼" : "▶"} Note
//         </button>
//         {expandedFields.note && (
//           <textarea
//             style={styles.textarea}
//             value={problem.note || ""}
//             onChange={(e) => onUpdate({ note: e.target.value })}
//             placeholder="Add your notes here..."
//             rows={3}
//           />
//         )}
//       </td>

//       {/* Solved */}
//       <td style={{...styles.td, textAlign: "center"}}>
//         <input
//           type="checkbox"
//           checked={problem.solved}
//           onChange={onToggleSolved}
//           style={styles.checkbox}
//         />
//         <div style={styles.statusText}>{problem.solved ? "Done" : "Pending"}</div>
//       </td>

//       {/* Revise */}
//       <td style={{...styles.td, textAlign: "center"}}>
//         <button style={styles.starBtn} onClick={onToggleRevise}>
//           {problem.revise ? "⭐" : "☆"}
//         </button>
//         <div style={styles.statusText}>{problem.revise ? "Yes" : "No"}</div>
//       </td>

//       {/* Code Snippet */}
//       <td style={styles.td}>
//         <button style={styles.expandBtn} onClick={() => toggleExpand("snippet")}>
//           {expandedFields.snippet ? "▼" : "▶"} Code
//         </button>
//         {expandedFields.snippet && (
//           <textarea
//             style={{...styles.textarea, fontFamily: "monospace"}}
//             value={problem.codeSnippet || ""}
//             onChange={(e) => onUpdate({ codeSnippet: e.target.value })}
//             placeholder="Paste your code here..."
//             rows={5}
//           />
//         )}
//       </td>
//     </tr>
//   );
// }

// // STYLES
// const styles = {
//   app: {
//     display: "flex",
//     height: "100vh",
//     fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//     background: "#0d0d0d",
//     color: "#e0e0e0"
//   },
  
//   // Sidebar
//   sidebar: {
//     width: "280px",
//     background: "#111318",
//     borderRight: "1px solid #1e1e2a",
//     display: "flex",
//     flexDirection: "column",
//     overflowY: "auto"
//   },
//   logo: {
//     padding: "20px",
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     borderBottom: "1px solid #1e1e2a"
//   },
//   logoIcon: { fontSize: "24px" },
//   logoText: { fontSize: "18px", fontWeight: "bold", color: "#3b82f6" },
//   createFolderBtn: {
//     margin: "16px",
//     padding: "10px",
//     background: "#3b82f6",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold"
//   },
//   foldersSection: { flex: 1, padding: "0 12px" },
//   sectionTitle: {
//     fontSize: "11px",
//     fontWeight: "bold",
//     color: "#555",
//     textTransform: "uppercase",
//     padding: "12px 8px 8px",
//     letterSpacing: "0.5px"
//   },
//   folderItem: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     marginBottom: "2px",
//     color: "#aaa"
//   },
//   activeFolder: {
//     background: "rgba(59,130,246,0.1)",
//     color: "#3b82f6"
//   },
//   folderCount: {
//     fontSize: "11px",
//     color: "#555"
//   },
//   reviseSection: {
//     padding: "12px",
//     borderTop: "1px solid #1e1e2a",
//     marginTop: "auto"
//   },
//   reviseItem: {
//     display: "flex",
//     gap: "8px",
//     alignItems: "center",
//     padding: "6px 8px",
//     fontSize: "12px",
//     color: "#86efac"
//   },
//   reviseText: {
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap"
//   },
  
//   // Main content
//   main: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden"
//   },
//   emptyState: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#666"
//   },
//   emptyIcon: { fontSize: "48px", marginBottom: "20px" },
  
//   // Header
//   header: {
//     padding: "16px 24px",
//     borderBottom: "1px solid #1e1e2a",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
//   folderIcon: { fontSize: "20px" },
//   folderTitle: { margin: 0, fontSize: "18px" },
//   problemCount: { fontSize: "12px", color: "#555" },
//   headerRight: { display: "flex", gap: "12px" },
//   searchInput: {
//     padding: "8px 12px",
//     background: "#111318",
//     border: "1px solid #1e1e2a",
//     borderRadius: "6px",
//     color: "#e0e0e0",
//     width: "200px"
//   },
//   filterBtn: {
//     padding: "8px 16px",
//     background: "transparent",
//     border: "1px solid #1e1e2a",
//     borderRadius: "6px",
//     color: "#aaa",
//     cursor: "pointer"
//   },
//   activeFilterBtn: {
//     padding: "8px 16px",
//     background: "rgba(59,130,246,0.1)",
//     border: "1px solid #3b82f6",
//     borderRadius: "6px",
//     color: "#3b82f6",
//     cursor: "pointer"
//   },
//   addBtn: {
//     padding: "8px 16px",
//     background: "transparent",
//     border: "1px solid #3b82f6",
//     borderRadius: "6px",
//     color: "#3b82f6",
//     cursor: "pointer",
//     fontWeight: "bold"
//   },
  
//   // Filter bar
//   filterBar: {
//     padding: "12px 24px",
//     borderBottom: "1px solid #1e1e2a",
//     display: "flex",
//     gap: "24px"
//   },
//   filterGroup: {
//     display: "flex",
//     gap: "8px",
//     alignItems: "center",
//     fontSize: "12px"
//   },
//   chip: {
//     padding: "4px 12px",
//     background: "#111318",
//     border: "1px solid #1e1e2a",
//     borderRadius: "20px",
//     cursor: "pointer",
//     color: "#888"
//   },
//   activeChip: {
//     padding: "4px 12px",
//     background: "rgba(59,130,246,0.1)",
//     border: "1px solid #3b82f6",
//     borderRadius: "20px",
//     cursor: "pointer",
//     color: "#3b82f6"
//   },
  
//   // Revision banner
//   revisionBanner: {
//     background: "rgba(16,40,16,0.6)",
//     borderBottom: "1px solid #1e3a1e",
//     padding: "12px 24px"
//   },
//   bannerTitle: {
//     fontSize: "11px",
//     fontWeight: "bold",
//     color: "#4ade80",
//     textTransform: "uppercase",
//     marginBottom: "8px"
//   },
//   bannerProblems: {
//     display: "flex",
//     gap: "8px",
//     flexWrap: "wrap"
//   },
//   revisionChip: {
//     padding: "4px 12px",
//     background: "#1a2e1a",
//     border: "1px solid #2d4a2d",
//     borderRadius: "6px",
//     fontSize: "12px",
//     color: "#86efac"
//   },
  
//   // Table
//   tableContainer: {
//     flex: 1,
//     overflow: "auto",
//     padding: "20px 24px"
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     minWidth: "1000px"
//   },
//   th: {
//     textAlign: "left",
//     padding: "12px 8px",
//     fontSize: "11px",
//     fontWeight: "bold",
//     color: "#555",
//     borderBottom: "1px solid #1a1a2a"
//   },
//   tr: {
//     borderBottom: "1px solid #1a1a22"
//   },
//   td: {
//     padding: "8px",
//     verticalAlign: "top",
//     background: "#111318"
//   },
//   noData: {
//     textAlign: "center",
//     padding: "40px",
//     color: "#666"
//   },
  
//   // Form elements
//   input: {
//     width: "100%",
//     padding: "6px 8px",
//     background: "#0d0d0d",
//     border: "1px solid #1e1e2a",
//     borderRadius: "4px",
//     color: "#e0e0e0",
//     fontSize: "12px"
//   },
//   textarea: {
//     width: "100%",
//     marginTop: "8px",
//     padding: "8px",
//     background: "#0a0a12",
//     border: "1px solid #3b82f6",
//     borderRadius: "4px",
//     color: "#e0e0e0",
//     fontSize: "12px",
//     resize: "vertical"
//   },
//   select: {
//     width: "100%",
//     padding: "6px 8px",
//     background: "#0d0d0d",
//     border: "1px solid #1e1e2a",
//     borderRadius: "4px",
//     color: "#e0e0e0",
//     marginBottom: "4px"
//   },
//   badge: {
//     display: "inline-block",
//     padding: "2px 8px",
//     borderRadius: "12px",
//     fontSize: "10px",
//     fontWeight: "bold"
//   },
//   easyBadge: { background: "#14532d", color: "#86efac" },
//   mediumBadge: { background: "#713f12", color: "#fde68a" },
//   hardBadge: { background: "#7f1d1d", color: "#fca5a5" },
//   checkbox: {
//     width: "16px",
//     height: "16px",
//     cursor: "pointer"
//   },
//   statusText: {
//     fontSize: "10px",
//     marginTop: "4px",
//     textAlign: "center"
//   },
//   starBtn: {
//     background: "none",
//     border: "none",
//     fontSize: "18px",
//     cursor: "pointer",
//     padding: 0
//   },
//   deleteBtn: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px"
//   },
//   expandBtn: {
//     background: "#0d0d0d",
//     border: "1px solid #1e1e2a",
//     borderRadius: "4px",
//     padding: "4px 8px",
//     fontSize: "11px",
//     cursor: "pointer",
//     color: "#aaa",
//     width: "100%",
//     textAlign: "left"
//   },
//   linkIcon: {
//     marginLeft: "8px",
//     textDecoration: "none",
//     fontSize: "14px"
//   },
  
//   // Modal
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "rgba(0,0,0,0.8)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000
//   },
//   modal: {
//     background: "#111318",
//     borderRadius: "12px",
//     width: "400px",
//     border: "1px solid #1e1e2a"
//   },
//   modalHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "20px 24px",
//     borderBottom: "1px solid #1e1e2a"
//   },
//   closeBtn: {
//     background: "none",
//     border: "none",
//     color: "#666",
//     fontSize: "20px",
//     cursor: "pointer"
//   },
//   modalInput: {
//     width: "calc(100% - 48px)",
//     margin: "24px",
//     padding: "12px",
//     background: "#0d0d0d",
//     border: "1px solid #1e1e2a",
//     borderRadius: "6px",
//     color: "#e0e0e0",
//     fontSize: "14px"
//   },
//   modalFooter: {
//     display: "flex",
//     gap: "12px",
//     padding: "20px 24px",
//     borderTop: "1px solid #1e1e2a"
//   },
//   cancelBtn: {
//     flex: 1,
//     padding: "10px",
//     background: "#1a1a24",
//     border: "1px solid #1e1e2a",
//     borderRadius: "6px",
//     color: "#aaa",
//     cursor: "pointer"
//   },
//   createBtn: {
//     flex: 1,
//     padding: "10px",
//     background: "#3b82f6",
//     border: "none",
//     borderRadius: "6px",
//     color: "white",
//     cursor: "pointer",
//     fontWeight: "bold"
//   }
// };

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:8080/api";

// export default function App() {
//   // STATE - Just what we need
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);

//   // Load data when page starts
//   useEffect(() => {
//     loadData();
//   }, []);

//   // ============ LOAD DATA ============
//   const loadData = async () => {
//     try {
//       const foldersRes = await axios.get(`${API}/folders`);
//       const problemsRes = await axios.get(`${API}/problems`);
      
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   // ============ CREATE FOLDER ============
//   const createFolder = async () => {
//     const name = prompt("Folder name:");
//     if (!name) return;

//     try {
//       const res = await axios.post(`${API}/folders`, {
//         name: name,
//         problemIds: []
//       });
      
//       setFolders([...folders, res.data]);
//     } catch (error) {
//       console.error("Error creating folder:", error);
//     }
//   };

//   // ============ ADD PROBLEM TO FOLDER ============
//   const addProblem = async () => {
//     if (!activeFolder) {
//       alert("Select a folder first!");
//       return;
//     }

//     const questionName = prompt("Problem name:");
//     if (!questionName) return;

//     try {
//       // Step 1: Create problem
//       const problemRes = await axios.post(`${API}/problems`, {
//         questionName: questionName,
//         description: "",
//         link: "",
//         difficulty: "Easy",
//         note: "",
//         solved: false,
//         revise: false,
//         codeSnippet: ""
//       });

//       const newProblem = problemRes.data;
//       setProblems([...problems, newProblem]);

//       // Step 2: Add problem ID to folder
//       const updatedFolder = {
//         ...activeFolder,
//         problemIds: [...activeFolder.problemIds, newProblem.id]
//       };

//       const folderRes = await axios.put(`${API}/folders/${activeFolder.id}`, updatedFolder);
//       setActiveFolder(folderRes.data);
//       setFolders(folders.map(f => f.id === folderRes.data.id ? folderRes.data : f));
//     } catch (error) {
//       console.error("Error adding problem:", error);
//     }
//   };

//   // ============ UPDATE PROBLEM ============
//   const updateProblem = async (problemId, updates) => {
//     try {
//       const problem = problems.find(p => p.id === problemId);
//       const updated = { ...problem, ...updates };

//       const res = await axios.put(`${API}/problems/${problemId}`, updated);
//       setProblems(problems.map(p => p.id === problemId ? res.data : p));
//     } catch (error) {
//       console.error("Error updating problem:", error);
//     }
//   };

//   // ============ DELETE PROBLEM ============
//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
//       setProblems(problems.filter(p => p.id !== problemId));

//       if (activeFolder) {
//         const updated = {
//           ...activeFolder,
//           problemIds: activeFolder.problemIds.filter(id => id !== problemId)
//         };
//         const folderRes = await axios.put(`${API}/folders/${activeFolder.id}`, updated);
//         setActiveFolder(folderRes.data);
//         setFolders(folders.map(f => f.id === folderRes.data.id ? folderRes.data : f));
//       }
//     } catch (error) {
//       console.error("Error deleting problem:", error);
//     }
//   };

//   // Get problems in active folder
//   const folderProblems = activeFolder
//     ? problems.filter(p => activeFolder.problemIds?.includes(p.id))
//     : [];

//   // ============ RENDER ============
//   return (
//     <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
//       {/* SIDEBAR */}
//       <div style={{ width: "250px", borderRight: "1px solid #ccc", padding: "20px" }}>
//         <h2>SolveStack</h2>

//         <button onClick={createFolder} style={{ padding: "10px", marginBottom: "20px", cursor: "pointer" }}>
//           + Create Folder
//         </button>

//         <div>
//           <h3>Folders:</h3>
//           {folders.map(folder => (
//             <div
//               key={folder.id}
//               onClick={() => setActiveFolder(folder)}
//               style={{
//                 padding: "10px",
//                 margin: "5px 0",
//                 backgroundColor: activeFolder?.id === folder.id ? "#e0e0e0" : "#f5f5f5",
//                 cursor: "pointer",
//                 borderRadius: "4px"
//               }}
//             >
//               {folder.name} ({folder.problemIds.length} problems)
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
//         {!activeFolder ? (
//           <p>Select a folder to see problems</p>
//         ) : (
//           <>
//             <h2>{activeFolder.name}</h2>
//             <button onClick={addProblem} style={{ padding: "10px", marginBottom: "20px", cursor: "pointer" }}>
//               + Add Problem
//             </button>

//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ borderBottom: "2px solid #000" }}>
//                   <th style={{ padding: "10px", textAlign: "left" }}>Question Name</th>
//                   <th style={{ padding: "10px", textAlign: "left" }}>Description</th>
//                   <th style={{ padding: "10px", textAlign: "left" }}>Difficulty</th>
//                   <th style={{ padding: "10px", textAlign: "left" }}>Solved</th>
//                   <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {folderProblems.map(problem => (
//                   <tr key={problem.id} style={{ borderBottom: "1px solid #ddd" }}>
//                     <td style={{ padding: "10px" }}>
//                       <input
//                         type="text"
//                         value={problem.questionName}
//                         onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//                         style={{ width: "100%", padding: "5px" }}
//                       />
//                     </td>
//                     <td style={{ padding: "10px" }}>
//                       <textarea
//                         value={problem.description}
//                         onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
//                         style={{ width: "100%", height: "40px", padding: "5px" }}
//                       />
//                     </td>
//                     <td style={{ padding: "10px" }}>
//                       <select
//                         value={problem.difficulty}
//                         onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//                         style={{ padding: "5px" }}
//                       >
//                         <option>Easy</option>
//                         <option>Medium</option>
//                         <option>Hard</option>
//                       </select>
//                     </td>
//                     <td style={{ padding: "10px", textAlign: "center" }}>
//                       <input
//                         type="checkbox"
//                         checked={problem.solved}
//                         onChange={(e) => updateProblem(problem.id, { solved: e.target.checked })}
//                       />
//                     </td>
//                     <td style={{ padding: "10px" }}>
//                       <button
//                         onClick={() => deleteProblem(problem.id)}
//                         style={{ padding: "5px 10px", backgroundColor: "red", color: "white", cursor: "pointer", border: "none", borderRadius: "4px" }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:8080/api";

// export default function App() {
//   // State
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDifficulty, setFilterDifficulty] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [showFilters, setShowFilters] = useState(false);

//   // Load data on startup
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [foldersRes, problemsRes] = await Promise.all([
//         axios.get(`${API}/folders`),
//         axios.get(`${API}/problems`)
//       ]);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   // Create new folder
//   const createFolder = async () => {
//     if (!newFolderName.trim()) return;
//     try {
//       const response = await axios.post(`${API}/folders`, {
//         name: newFolderName,
//         problemIds: []
//       });
//       setFolders([...folders, response.data]);
//       setNewFolderName("");
//       setShowCreateModal(false);
//     } catch (error) {
//       console.error("Error creating folder:", error);
//     }
//   };

//   // Add new problem to active folder
//   const addProblem = async () => {
//     if (!activeFolder) return;
    
//     try {
//       // Create empty problem
//       const problemResponse = await axios.post(`${API}/problems`, {
//         questionName: "New Problem",
//         description: "",
//         link: "",
//         difficulty: "Easy",
//         note: "",
//         solved: false,
//         revise: false,
//         codeSnippet: ""
//       });
      
//       const newProblem = problemResponse.data;
//       setProblems([...problems, newProblem]);
      
//       // Add problem to folder
//       const updatedFolder = {
//         ...activeFolder,
//         problemIds: [...activeFolder.problemIds, newProblem.id]
//       };
      
//       const folderResponse = await axios.put(`${API}/folders/${activeFolder.id}`, updatedFolder);
//       setActiveFolder(folderResponse.data);
//       setFolders(folders.map(f => f.id === folderResponse.data.id ? folderResponse.data : f));
      
//     } catch (error) {
//       console.error("Error adding problem:", error);
//     }
//   };

//   // Update problem (generic function)
//   const updateProblem = async (problemId, updates) => {
//     const problem = problems.find(p => p.id === problemId);
//     const updatedProblem = { ...problem, ...updates };
    
//     try {
//       const response = await axios.put(`${API}/problems/${problemId}`, updatedProblem);
//       setProblems(problems.map(p => p.id === problemId ? response.data : p));
//     } catch (error) {
//       console.error("Error updating problem:", error);
//     }
//   };

//   // Toggle solved status
//   const toggleSolved = async (problemId) => {
//     const problem = problems.find(p => p.id === problemId);
//     await updateProblem(problemId, { solved: !problem.solved });
//   };

//   // Toggle revise status
//   const toggleRevise = async (problemId) => {
//     const problem = problems.find(p => p.id === problemId);
//     await updateProblem(problemId, { revise: !problem.revise });
//   };

//   // Delete problem
//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
//       setProblems(problems.filter(p => p.id !== problemId));
      
//       // Remove from active folder if needed
//       if (activeFolder) {
//         const updatedFolder = {
//           ...activeFolder,
//           problemIds: activeFolder.problemIds.filter(id => id !== problemId)
//         };
//         const folderResponse = await axios.put(`${API}/folders/${activeFolder.id}`, updatedFolder);
//         setActiveFolder(folderResponse.data);
//         setFolders(folders.map(f => f.id === folderResponse.data.id ? folderResponse.data : f));
//       }
//     } catch (error) {
//       console.error("Error deleting problem:", error);
//     }
//   };

//   // Get problems in current folder
//   const folderProblems = activeFolder 
//     ? problems.filter(p => activeFolder.problemIds?.includes(p.id))
//     : [];

//   // Apply filters and search
//   const filteredProblems = folderProblems.filter(problem => {
//     // Search filter
//     if (search && !problem.questionName?.toLowerCase().includes(search.toLowerCase())) {
//       return false;
//     }
    
//     // Difficulty filter
//     if (filterDifficulty !== "All" && problem.difficulty !== filterDifficulty) {
//       return false;
//     }
    
//     // Status filter
//     if (filterStatus === "Solved" && !problem.solved) return false;
//     if (filterStatus === "Unsolved" && problem.solved) return false;
    
//     return true;
//   });

//   // Problems marked for revision
//   const reviseProblems = problems.filter(p => p.revise);

//   return (
//     <div style={styles.app}>
//       {/* SIDEBAR */}
//       <div style={styles.sidebar}>
//         <div style={styles.logo}>
//           <span style={styles.logoIcon}>📚</span>
//           <span style={styles.logoText}>SolveStack</span>
//         </div>

//         <button style={styles.createFolderBtn} onClick={() => setShowCreateModal(true)}>
//           + Create Folder
//         </button>

//         <div style={styles.foldersSection}>
//           <div style={styles.sectionTitle}>ALL FOLDERS</div>
//           {folders.map(folder => (
//             <div
//               key={folder.id}
//               style={{
//                 ...styles.folderItem,
//                 ...(activeFolder?.id === folder.id ? styles.activeFolder : {})
//               }}
//               onClick={() => setActiveFolder(folder)}
//             >
//               <span>📁 {folder.name}</span>
//               <span style={styles.folderCount}>{(folder.problemIds || []).length}</span>
//             </div>
//           ))}
//         </div>

//         {reviseProblems.length > 0 && (
//           <div style={styles.reviseSection}>
//             <div style={styles.sectionTitle}>⭐ REVISE LATER</div>
//             {reviseProblems.map(problem => (
//               <div key={problem.id} style={styles.reviseItem}>
//                 <span>•</span>
//                 <span style={styles.reviseText}>{problem.questionName || "Untitled"}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* MAIN CONTENT */}
//       <div style={styles.main}>
//         {!activeFolder ? (
//           <div style={styles.emptyState}>
//             <div style={styles.emptyIcon}>📁</div>
//             <h2>No Folder Selected</h2>
//             <p>Select a folder from the sidebar or create a new one to get started</p>
//           </div>
//         ) : (
//           <>
//             {/* Header */}
//             <div style={styles.header}>
//               <div style={styles.headerLeft}>
//                 <span style={styles.folderIcon}>📁</span>
//                 <h2 style={styles.folderTitle}>{activeFolder.name}</h2>
//                 <span style={styles.problemCount}>
//                   {folderProblems.length} problem{folderProblems.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
              
//               <div style={styles.headerRight}>
//                 <input
//                   style={styles.searchInput}
//                   placeholder="🔍 Search problems..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button 
//                   style={showFilters ? styles.activeFilterBtn : styles.filterBtn}
//                   onClick={() => setShowFilters(!showFilters)}
//                 >
//                   Filter
//                 </button>
//                 <button style={styles.addBtn} onClick={addProblem}>
//                   + Add Problem
//                 </button>
//               </div>
//             </div>

//             {/* Filter Bar */}
//             {showFilters && (
//               <div style={styles.filterBar}>
//                 <div style={styles.filterGroup}>
//                   <span>Difficulty:</span>
//                   {["All", "Easy", "Medium", "Hard"].map(d => (
//                     <button
//                       key={d}
//                       style={filterDifficulty === d ? styles.activeChip : styles.chip}
//                       onClick={() => setFilterDifficulty(d)}
//                     >
//                       {d}
//                     </button>
//                   ))}
//                 </div>
//                 <div style={styles.filterGroup}>
//                   <span>Status:</span>
//                   {["All", "Solved", "Unsolved"].map(s => (
//                     <button
//                       key={s}
//                       style={filterStatus === s ? styles.activeChip : styles.chip}
//                       onClick={() => setFilterStatus(s)}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Revision Banner */}
//             {filteredProblems.filter(p => p.revise).length > 0 && (
//               <div style={styles.revisionBanner}>
//                 <div style={styles.bannerTitle}>
//                   ⭐ Marked for Revision — {filteredProblems.filter(p => p.revise).length} problem
//                 </div>
//                 <div style={styles.bannerProblems}>
//                   {filteredProblems.filter(p => p.revise).map(p => (
//                     <span key={p.id} style={styles.revisionChip}>
//                       {p.questionName || "Untitled"}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Problems Table */}
//             <div style={styles.tableContainer}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}></th>
//                     <th style={styles.th}>Question Name</th>
//                     <th style={styles.th}>Description</th>
//                     <th style={styles.th}>Link</th>
//                     <th style={styles.th}>Difficulty</th>
//                     <th style={styles.th}>Note</th>
//                     <th style={styles.th}>Solved</th>
//                     <th style={styles.th}>Revise</th>
//                     <th style={styles.th}>Snippet</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredProblems.map(problem => (
//                     <ProblemRow
//                       key={problem.id}
//                       problem={problem}
//                       onUpdate={(updates) => updateProblem(problem.id, updates)}
//                       onToggleSolved={() => toggleSolved(problem.id)}
//                       onToggleRevise={() => toggleRevise(problem.id)}
//                       onDelete={() => deleteProblem(problem.id)}
//                     />
//                   ))}
//                   {filteredProblems.length === 0 && (
//                     <tr>
//                       <td colSpan="9" style={styles.noData}>
//                         No problems found. Click "Add Problem" to get started!
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Create Folder Modal */}
//       {showCreateModal && (
//         <div style={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
//           <div style={styles.modal} onClick={e => e.stopPropagation()}>
//             <div style={styles.modalHeader}>
//               <h3>Create New Folder</h3>
//               <button style={styles.closeBtn} onClick={() => setShowCreateModal(false)}>✕</button>
//             </div>
//             <input
//               style={styles.modalInput}
//               placeholder="Folder name..."
//               value={newFolderName}
//               onChange={(e) => setNewFolderName(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && createFolder()}
//               autoFocus
//             />
//             <div style={styles.modalFooter}>
//               <button style={styles.cancelBtn} onClick={() => setShowCreateModal(false)}>
//                 Cancel
//               </button>
//               <button style={styles.createBtn} onClick={createFolder}>
//                 Create Folder
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // PROBLEM ROW COMPONENT (with all features)
// function ProblemRow({ problem, onUpdate, onToggleSolved, onToggleRevise, onDelete }) {
//   const [expandedFields, setExpandedFields] = useState({
//     description: false,
//     note: false,
//     snippet: false
//   });

//   const toggleExpand = (field) => {
//     setExpandedFields({
//       ...expandedFields,
//       [field]: !expandedFields[field]
//     });
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch(difficulty) {
//       case "Easy": return styles.easyBadge;
//       case "Medium": return styles.mediumBadge;
//       case "Hard": return styles.hardBadge;
//       default: return {};
//     }
//   };

//   return (
//     <tr style={styles.tr}>
//       {/* Delete */}
//       <td style={styles.td}>
//         <button style={styles.deleteBtn} onClick={onDelete}>🗑️</button>
//       </td>

//       {/* Question Name */}
//       <td style={styles.td}>
//         <input
//           style={styles.input}
//           value={problem.questionName || ""}
//           onChange={(e) => onUpdate({ questionName: e.target.value })}
//           placeholder="Problem name"
//         />
//       </td>

//       {/* Description */}
//       <td style={styles.td}>
//         <button style={styles.expandBtn} onClick={() => toggleExpand("description")}>
//           {expandedFields.description ? "▼" : "▶"} Description
//         </button>
//         {expandedFields.description && (
//           <textarea
//             style={styles.textarea}
//             value={problem.description || ""}
//             onChange={(e) => onUpdate({ description: e.target.value })}
//             placeholder="Describe the problem..."
//             rows={3}
//           />
//         )}
//       </td>

//       {/* Link */}
//       <td style={styles.td}>
//         <input
//           style={styles.input}
//           value={problem.link || ""}
//           onChange={(e) => onUpdate({ link: e.target.value })}
//           placeholder="https://..."
//         />
//         {problem.link && (
//           <a href={problem.link} target="_blank" rel="noopener noreferrer" style={styles.linkIcon}>
//             🔗
//           </a>
//         )}
//       </td>

//       {/* Difficulty */}
//       <td style={styles.td}>
//         <select
//           style={styles.select}
//           value={problem.difficulty}
//           onChange={(e) => onUpdate({ difficulty: e.target.value })}
//         >
//           <option>Easy</option>
//           <option>Medium</option>
//           <option>Hard</option>
//         </select>
//         <span style={{...styles.badge, ...getDifficultyColor(problem.difficulty)}}>
//           {problem.difficulty}
//         </span>
//       </td>

//       {/* Note */}
//       <td style={styles.td}>
//         <button style={styles.expandBtn} onClick={() => toggleExpand("note")}>
//           {expandedFields.note ? "▼" : "▶"} Note
//         </button>
//         {expandedFields.note && (
//           <textarea
//             style={styles.textarea}
//             value={problem.note || ""}
//             onChange={(e) => onUpdate({ note: e.target.value })}
//             placeholder="Add your notes here..."
//             rows={3}
//           />
//         )}
//       </td>

//       {/* Solved */}
//       <td style={{...styles.td, textAlign: "center"}}>
//         <input
//           type="checkbox"
//           checked={problem.solved}
//           onChange={onToggleSolved}
//           style={styles.checkbox}
//         />
//         <div style={styles.statusText}>{problem.solved ? "Done" : "Pending"}</div>
//       </td>

//       {/* Revise */}
//       <td style={{...styles.td, textAlign: "center"}}>
//         <button style={styles.starBtn} onClick={onToggleRevise}>
//           {problem.revise ? "⭐" : "☆"}
//         </button>
//         <div style={styles.statusText}>{problem.revise ? "Yes" : "No"}</div>
//       </td>

//       {/* Code Snippet */}
//       <td style={styles.td}>
//         <button style={styles.expandBtn} onClick={() => toggleExpand("snippet")}>
//           {expandedFields.snippet ? "▼" : "▶"} Code
//         </button>
//         {expandedFields.snippet && (
//           <textarea
//             style={{...styles.textarea, fontFamily: "monospace"}}
//             value={problem.codeSnippet || ""}
//             onChange={(e) => onUpdate({ codeSnippet: e.target.value })}
//             placeholder="Paste your code here..."
//             rows={5}
//           />
//         )}
//       </td>
//     </tr>
//   );
// }

// // STYLES
// const styles = {
//   app: {
//     display: "flex",
//     height: "100vh",
//     fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//     background: "#0d0d0d",
//     color: "#e0e0e0"
//   },
  
//   // Sidebar
//   sidebar: {
//     width: "280px",
//     background: "#111318",
//     borderRight: "1px solid #1e1e2a",
//     display: "flex",
//     flexDirection: "column",
//     overflowY: "auto"
//   },
//   logo: {
//     padding: "20px",
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     borderBottom: "1px solid #1e1e2a"
//   },
//   logoIcon: { fontSize: "24px" },
//   logoText: { fontSize: "18px", fontWeight: "bold", color: "#3b82f6" },
//   createFolderBtn: {
//     margin: "16px",
//     padding: "10px",
//     background: "#3b82f6",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold"
//   },
//   foldersSection: { flex: 1, padding: "0 12px" },
//   sectionTitle: {
//     fontSize: "11px",
//     fontWeight: "bold",
//     color: "#555",
//     textTransform: "uppercase",
//     padding: "12px 8px 8px",
//     letterSpacing: "0.5px"
//   },
//   folderItem: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     marginBottom: "2px",
//     color: "#aaa"
//   },
//   activeFolder: {
//     background: "rgba(59,130,246,0.1)",
//     color: "#3b82f6"
//   },
//   folderCount: {
//     fontSize: "11px",
//     color: "#555"
//   },
//   reviseSection: {
//     padding: "12px",
//     borderTop: "1px solid #1e1e2a",
//     marginTop: "auto"
//   },
//   reviseItem: {
//     display: "flex",
//     gap: "8px",
//     alignItems: "center",
//     padding: "6px 8px",
//     fontSize: "12px",
//     color: "#86efac"
//   },
//   reviseText: {
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap"
//   },
  
//   // Main content
//   main: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden"
//   },
//   emptyState: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#666"
//   },
//   emptyIcon: { fontSize: "48px", marginBottom: "20px" },
  
//   // Header
//   header: {
//     padding: "16px 24px",
//     borderBottom: "1px solid #1e1e2a",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
//   folderIcon: { fontSize: "20px" },
//   folderTitle: { margin: 0, fontSize: "18px" },
//   problemCount: { fontSize: "12px", color: "#555" },
//   headerRight: { display: "flex", gap: "12px" },
//   searchInput: {
//     padding: "8px 12px",
//     background: "#111318",
//     border: "1px solid #1e1e2a",
//     borderRadius: "6px",
//     color: "#e0e0e0",
//     width: "200px"
//   },
//   filterBtn: {
//     padding: "8px 16px",
//     background: "transparent",
//     border: "1px solid #1e1e2a",
//     borderRadius: "6px",
//     color: "#aaa",
//     cursor: "pointer"
//   },
//   activeFilterBtn: {
//     padding: "8px 16px",
//     background: "rgba(59,130,246,0.1)",
//     border: "1px solid #3b82f6",
//     borderRadius: "6px",
//     color: "#3b82f6",
//     cursor: "pointer"
//   },
//   addBtn: {
//     padding: "8px 16px",
//     background: "transparent",
//     border: "1px solid #3b82f6",
//     borderRadius: "6px",
//     color: "#3b82f6",
//     cursor: "pointer",
//     fontWeight: "bold"
//   },
  
//   // Filter bar
//   filterBar: {
//     padding: "12px 24px",
//     borderBottom: "1px solid #1e1e2a",
//     display: "flex",
//     gap: "24px"
//   },
//   filterGroup: {
//     display: "flex",
//     gap: "8px",
//     alignItems: "center",
//     fontSize: "12px"
//   },
//   chip: {
//     padding: "4px 12px",
//     background: "#111318",
//     border: "1px solid #1e1e2a",
//     borderRadius: "20px",
//     cursor: "pointer",
//     color: "#888"
//   },
//   activeChip: {
//     padding: "4px 12px",
//     background: "rgba(59,130,246,0.1)",
//     border: "1px solid #3b82f6",
//     borderRadius: "20px",
//     cursor: "pointer",
//     color: "#3b82f6"
//   },
  
//   // Revision banner
//   revisionBanner: {
//     background: "rgba(16,40,16,0.6)",
//     borderBottom: "1px solid #1e3a1e",
//     padding: "12px 24px"
//   },
//   bannerTitle: {
//     fontSize: "11px",
//     fontWeight: "bold",
//     color: "#4ade80",
//     textTransform: "uppercase",
//     marginBottom: "8px"
//   },
//   bannerProblems: {
//     display: "flex",
//     gap: "8px",
//     flexWrap: "wrap"
//   },
//   revisionChip: {
//     padding: "4px 12px",
//     background: "#1a2e1a",
//     border: "1px solid #2d4a2d",
//     borderRadius: "6px",
//     fontSize: "12px",
//     color: "#86efac"
//   },
  
//   // Table
//   tableContainer: {
//     flex: 1,
//     overflow: "auto",
//     padding: "20px 24px"
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     minWidth: "1000px"
//   },
//   th: {
//     textAlign: "left",
//     padding: "12px 8px",
//     fontSize: "11px",
//     fontWeight: "bold",
//     color: "#555",
//     borderBottom: "1px solid #1a1a2a"
//   },
//   tr: {
//     borderBottom: "1px solid #1a1a22"
//   },
//   td: {
//     padding: "8px",
//     verticalAlign: "top",
//     background: "#111318"
//   },
//   noData: {
//     textAlign: "center",
//     padding: "40px",
//     color: "#666"
//   },
  
//   // Form elements
//   input: {
//     width: "100%",
//     padding: "6px 8px",
//     background: "#0d0d0d",
//     border: "1px solid #1e1e2a",
//     borderRadius: "4px",
//     color: "#e0e0e0",
//     fontSize: "12px"
//   },
//   textarea: {
//     width: "100%",
//     marginTop: "8px",
//     padding: "8px",
//     background: "#0a0a12",
//     border: "1px solid #3b82f6",
//     borderRadius: "4px",
//     color: "#e0e0e0",
//     fontSize: "12px",
//     resize: "vertical"
//   },
//   select: {
//     width: "100%",
//     padding: "6px 8px",
//     background: "#0d0d0d",
//     border: "1px solid #1e1e2a",
//     borderRadius: "4px",
//     color: "#e0e0e0",
//     marginBottom: "4px"
//   },
//   badge: {
//     display: "inline-block",
//     padding: "2px 8px",
//     borderRadius: "12px",
//     fontSize: "10px",
//     fontWeight: "bold"
//   },
//   easyBadge: { background: "#14532d", color: "#86efac" },
//   mediumBadge: { background: "#713f12", color: "#fde68a" },
//   hardBadge: { background: "#7f1d1d", color: "#fca5a5" },
//   checkbox: {
//     width: "16px",
//     height: "16px",
//     cursor: "pointer"
//   },
//   statusText: {
//     fontSize: "10px",
//     marginTop: "4px",
//     textAlign: "center"
//   },
//   starBtn: {
//     background: "none",
//     border: "none",
//     fontSize: "18px",
//     cursor: "pointer",
//     padding: 0
//   },
//   deleteBtn: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px"
//   },
//   expandBtn: {
//     background: "#0d0d0d",
//     border: "1px solid #1e1e2a",
//     borderRadius: "4px",
//     padding: "4px 8px",
//     fontSize: "11px",
//     cursor: "pointer",
//     color: "#aaa",
//     width: "100%",
//     textAlign: "left"
//   },
//   linkIcon: {
//     marginLeft: "8px",
//     textDecoration: "none",
//     fontSize: "14px"
//   },
  
//   // Modal
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "rgba(0,0,0,0.8)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000
//   },
//   modal: {
//     background: "#111318",
//     borderRadius: "12px",
//     width: "400px",
//     border: "1px solid #1e1e2a"
//   },
//   modalHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "20px 24px",
//     borderBottom: "1px solid #1e1e2a"
//   },
//   closeBtn: {
//     background: "none",
//     border: "none",
//     color: "#666",
//     fontSize: "20px",
//     cursor: "pointer"
//   },
//   modalInput: {
//     width: "calc(100% - 48px)",
//     margin: "24px",
//     padding: "12px",
//     background: "#0d0d0d",
//     border: "1px solid #1e1e2a",
//     borderRadius: "6px",
//     color: "#e0e0e0",
//     fontSize: "14px"
//   },
//   modalFooter: {
//     display: "flex",
//     gap: "12px",
//     padding: "20px 24px",
//     borderTop: "1px solid #1e1e2a"
//   },
//   cancelBtn: {
//     flex: 1,
//     padding: "10px",
//     background: "#1a1a24",
//     border: "1px solid #1e1e2a",
//     borderRadius: "6px",
//     color: "#aaa",
//     cursor: "pointer"
//   },
//   createBtn: {
//     flex: 1,
//     padding: "10px",
//     background: "#3b82f6",
//     border: "none",
//     borderRadius: "6px",
//     color: "white",
//     cursor: "pointer",
//     fontWeight: "bold"
//   }
// };
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:8080/api";

// const DIFF_COLORS = {
//   Easy:   { background: "#14532d", color: "#86efac" },
//   Medium: { background: "#78350f", color: "#fcd34d" },
//   Hard:   { background: "#450a0a", color: "#fca5a5" },
// };

// export default function App() {
//   // State - simple and clean
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDifficulty, setFilterDifficulty] = useState("All");

//   // Load data on startup
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [foldersRes, problemsRes] = await Promise.all([
//         axios.get(`${API}/folders`),
//         axios.get(`${API}/problems`)
//       ]);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.error("Error loading:", err);
//     }
//   };

//   // ========== FOLDER FUNCTIONS ==========
  
//   const createFolder = async () => {
//     if (!newFolderName.trim()) return;
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       setFolders([...folders, res.data]);
//       setNewFolderName("");
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   const deleteFolder = async (folderId) => {
//     try {
//       await axios.delete(`${API}/folders/${folderId}`);
//       setFolders(folders.filter(f => f.id !== folderId));
//       if (activeFolder?.id === folderId) setActiveFolder(null);
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   // ========== PROBLEM FUNCTIONS ==========
  
//   const addProblem = async () => {
//     if (!activeFolder) return;
    
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id  // Simple! No mapping array needed
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       setProblems([...problems, res.data]);
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   const updateProblem = async (problemId, updates) => {
//     const problem = problems.find(p => p.id === problemId);
//     const updated = { ...problem, ...updates };
    
//     try {
//       const res = await axios.put(`${API}/problems/${problemId}`, updated);
//       setProblems(problems.map(p => p.id === problemId ? res.data : p));
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
//       setProblems(problems.filter(p => p.id !== problemId));
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   // Get problems in current folder - SIMPLE filter
//   const folderProblems = problems.filter(p => p.folderId === activeFolder?.id);
  
//   // Apply search and difficulty filters
//   const filteredProblems = folderProblems.filter(p => {
//     if (search && !p.questionName?.toLowerCase().includes(search.toLowerCase())) return false;
//     if (filterDifficulty !== "All" && p.difficulty !== filterDifficulty) return false;
//     return true;
//   });

//   // Problems marked for revision
//   const reviseProblems = problems.filter(p => p.revise);

//   // Styles
//   const styles = {
//     app: {
//       display: "flex",
//       height: "100vh",
//       background: "#0d0d0d",
//       color: "#e2e8f0",
//       fontFamily: "system-ui, -apple-system, sans-serif",
//     },
//     sidebar: {
//       width: 280,
//       background: "#111318",
//       borderRight: "1px solid #1e1e2a",
//       display: "flex",
//       flexDirection: "column",
//       padding: "20px",
//       overflowY: "auto",
//     },
//     logo: {
//       fontSize: "20px",
//       fontWeight: "bold",
//       marginBottom: "24px",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//     createSection: {
//       marginBottom: "24px",
//     },
//     folderInput: {
//       width: "100%",
//       padding: "10px",
//       background: "#0d0d0d",
//       border: "1px solid #1e1e2a",
//       borderRadius: "8px",
//       color: "#e2e8f0",
//       fontSize: "13px",
//       marginBottom: "8px",
//       outline: "none",
//     },
//     createBtn: {
//       width: "100%",
//       padding: "10px",
//       background: "#3b82f6",
//       border: "none",
//       borderRadius: "8px",
//       color: "white",
//       fontWeight: "bold",
//       cursor: "pointer",
//     },
//     sectionTitle: {
//       fontSize: "11px",
//       fontWeight: "bold",
//       color: "#64748b",
//       textTransform: "uppercase",
//       marginBottom: "12px",
//     },
//     folderList: {
//       flex: 1,
//     },
//     folderItem: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "10px 12px",
//       borderRadius: "8px",
//       cursor: "pointer",
//       marginBottom: "4px",
//       transition: "all 0.2s",
//     },
//     activeFolder: {
//       background: "#1e3a5f",
//       border: "1px solid #3b82f6",
//     },
//     deleteFolderBtn: {
//       background: "none",
//       border: "none",
//       color: "#ef4444",
//       cursor: "pointer",
//       fontSize: "14px",
//     },
//     reviseSection: {
//       marginTop: "auto",
//       paddingTop: "20px",
//       borderTop: "1px solid #1e1e2a",
//     },
//     reviseItem: {
//       padding: "6px 8px",
//       fontSize: "12px",
//       color: "#86efac",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       whiteSpace: "nowrap",
//     },
//     main: {
//       flex: 1,
//       display: "flex",
//       flexDirection: "column",
//       overflow: "hidden",
//     },
//     header: {
//       padding: "16px 24px",
//       borderBottom: "1px solid #1e1e2a",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     headerLeft: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//     folderTitle: {
//       fontSize: "20px",
//       fontWeight: "600",
//     },
//     problemCount: {
//       fontSize: "12px",
//       color: "#64748b",
//     },
//     headerRight: {
//       display: "flex",
//       gap: "12px",
//       alignItems: "center",
//     },
//     searchInput: {
//       padding: "8px 12px",
//       background: "#0d0d0d",
//       border: "1px solid #1e1e2a",
//       borderRadius: "8px",
//       color: "#e2e8f0",
//       width: "200px",
//       outline: "none",
//     },
//     filterBtn: {
//       padding: "8px 12px",
//       background: "#0d0d0d",
//       border: "1px solid #1e1e2a",
//       borderRadius: "8px",
//       color: "#94a3b8",
//       cursor: "pointer",
//     },
//     activeFilterBtn: {
//       background: "#1e3a5f",
//       border: "1px solid #3b82f6",
//       color: "#60a5fa",
//     },
//     addBtn: {
//       padding: "8px 16px",
//       background: "transparent",
//       border: "1px solid #3b82f6",
//       borderRadius: "8px",
//       color: "#60a5fa",
//       fontWeight: "bold",
//       cursor: "pointer",
//     },
//     filterBar: {
//       padding: "12px 24px",
//       borderBottom: "1px solid #1e1e2a",
//       display: "flex",
//       gap: "16px",
//     },
//     filterGroup: {
//       display: "flex",
//       gap: "8px",
//       alignItems: "center",
//     },
//     chip: {
//       padding: "4px 12px",
//       background: "#0d0d0d",
//       border: "1px solid #1e1e2a",
//       borderRadius: "20px",
//       fontSize: "12px",
//       cursor: "pointer",
//     },
//     activeChip: {
//       background: "#1e3a5f",
//       border: "1px solid #3b82f6",
//       color: "#60a5fa",
//     },
//     revisionBanner: {
//       background: "rgba(16, 40, 16, 0.6)",
//       borderBottom: "1px solid #1e3a1e",
//       padding: "12px 24px",
//     },
//     bannerTitle: {
//       fontSize: "11px",
//       fontWeight: "bold",
//       color: "#4ade80",
//       marginBottom: "8px",
//     },
//     bannerProblems: {
//       display: "flex",
//       gap: "8px",
//       flexWrap: "wrap",
//     },
//     revisionChip: {
//       padding: "4px 12px",
//       background: "#1a2e1a",
//       border: "1px solid #2d4a2d",
//       borderRadius: "6px",
//       fontSize: "12px",
//       color: "#86efac",
//     },
//     tableContainer: {
//       flex: 1,
//       overflow: "auto",
//       padding: "20px 24px",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       minWidth: "900px",
//     },
//     th: {
//       textAlign: "left",
//       padding: "12px 8px",
//       fontSize: "11px",
//       fontWeight: "bold",
//       color: "#64748b",
//       borderBottom: "1px solid #1e1e2a",
//     },
//     td: {
//       padding: "12px 8px",
//       borderBottom: "1px solid #1a1a22",
//     },
//     emptyState: {
//       flex: 1,
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#64748b",
//     },
//     emptyIcon: {
//       fontSize: "48px",
//       marginBottom: "16px",
//     },
//     input: {
//       width: "100%",
//       padding: "6px 8px",
//       background: "#0d0d0d",
//       border: "1px solid #1e1e2a",
//       borderRadius: "4px",
//       color: "#e2e8f0",
//       fontSize: "13px",
//       outline: "none",
//     },
//     textarea: {
//       width: "100%",
//       marginTop: "8px",
//       padding: "8px",
//       background: "#0a0a12",
//       border: "1px solid #3b82f6",
//       borderRadius: "4px",
//       color: "#e2e8f0",
//       fontSize: "12px",
//       resize: "vertical",
//     },
//     select: {
//       padding: "6px 8px",
//       background: "#0d0d0d",
//       border: "1px solid #1e1e2a",
//       borderRadius: "4px",
//       color: "#e2e8f0",
//     },
//     badge: {
//       display: "inline-block",
//       padding: "2px 8px",
//       borderRadius: "12px",
//       fontSize: "10px",
//       fontWeight: "bold",
//       marginLeft: "8px",
//     },
//     checkbox: {
//       width: "16px",
//       height: "16px",
//       cursor: "pointer",
//     },
//     starBtn: {
//       background: "none",
//       border: "none",
//       fontSize: "18px",
//       cursor: "pointer",
//     },
//     deleteBtn: {
//       background: "none",
//       border: "none",
//       color: "#ef4444",
//       cursor: "pointer",
//       fontSize: "16px",
//     },
//     expandBtn: {
//       background: "#0d0d0d",
//       border: "1px solid #1e1e2a",
//       borderRadius: "4px",
//       padding: "4px 8px",
//       fontSize: "11px",
//       cursor: "pointer",
//       color: "#94a3b8",
//       width: "100%",
//       textAlign: "left",
//     },
//     linkIcon: {
//       marginLeft: "8px",
//       textDecoration: "none",
//       fontSize: "14px",
//     },
//   };

//   // Problem Row Component (inline for simplicity)
//   const ProblemRow = ({ problem }) => {
//     const [expanded, setExpanded] = useState({ description: false, note: false, snippet: false });

//     const toggleExpand = (field) => {
//       setExpanded({ ...expanded, [field]: !expanded[field] });
//     };

//     const difficultyColor = DIFF_COLORS[problem.difficulty];

//     return (
//       <tr style={{ background: problem.solved ? "#0a1a0a" : "transparent" }}>
//         <td style={styles.td}>
//           <button onClick={() => deleteProblem(problem.id)} style={styles.deleteBtn}>🗑️</button>
//         </td>
//         <td style={styles.td}>
//           <input
//             value={problem.questionName}
//             onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//             style={styles.input}
//             placeholder="Problem name"
//           />
//         </td>
//         <td style={styles.td}>
//           <button onClick={() => toggleExpand("description")} style={styles.expandBtn}>
//             {expanded.description ? "▼" : "▶"} Description
//           </button>
//           {expanded.description && (
//             <textarea
//               value={problem.description || ""}
//               onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
//               style={styles.textarea}
//               placeholder="Describe the problem..."
//               rows={3}
//             />
//           )}
//         </td>
//         <td style={styles.td}>
//           <input
//             value={problem.link || ""}
//             onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
//             style={styles.input}
//             placeholder="https://..."
//           />
//           {problem.link && (
//             <a href={problem.link} target="_blank" rel="noopener noreferrer" style={styles.linkIcon}>🔗</a>
//           )}
//         </td>
//         <td style={styles.td}>
//           <select
//             value={problem.difficulty}
//             onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//             style={styles.select}
//           >
//             <option>Easy</option>
//             <option>Medium</option>
//             <option>Hard</option>
//           </select>
//           <span style={{ ...styles.badge, background: difficultyColor.background, color: difficultyColor.color }}>
//             {problem.difficulty}
//           </span>
//         </td>
//         <td style={styles.td}>
//           <button onClick={() => toggleExpand("note")} style={styles.expandBtn}>
//             {expanded.note ? "▼" : "▶"} Note
//           </button>
//           {expanded.note && (
//             <textarea
//               value={problem.note || ""}
//               onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
//               style={styles.textarea}
//               placeholder="Add your notes..."
//               rows={3}
//             />
//           )}
//         </td>
//         <td style={{ ...styles.td, textAlign: "center" }}>
//           <input
//             type="checkbox"
//             checked={problem.solved}
//             onChange={() => updateProblem(problem.id, { solved: !problem.solved })}
//             style={styles.checkbox}
//           />
//           <div style={{ fontSize: "10px", marginTop: "4px" }}>{problem.solved ? "Done" : "Pending"}</div>
//         </td>
//         <td style={{ ...styles.td, textAlign: "center" }}>
//           <button onClick={() => updateProblem(problem.id, { revise: !problem.revise })} style={styles.starBtn}>
//             {problem.revise ? "⭐" : "☆"}
//           </button>
//         </td>
//         <td style={styles.td}>
//           <button onClick={() => toggleExpand("snippet")} style={styles.expandBtn}>
//             {expanded.snippet ? "▼" : "▶"} Code
//           </button>
//           {expanded.snippet && (
//             <textarea
//               value={problem.codeSnippet || ""}
//               onChange={(e) => updateProblem(problem.id, { codeSnippet: e.target.value })}
//               style={{ ...styles.textarea, fontFamily: "monospace" }}
//               placeholder="Paste your code..."
//               rows={5}
//             />
//           )}
//         </td>
//       </tr>
//     );
//   };

//   // Main render
//   return (
//     <div style={styles.app}>
//       {/* SIDEBAR */}
//       <div style={styles.sidebar}>
//         <div style={styles.logo}>
//           <span style={{ fontSize: "24px" }}>📚</span>
//           <span>SolveStack</span>
//         </div>

//         <div style={styles.createSection}>
//           <input
//             type="text"
//             placeholder="New folder name..."
//             value={newFolderName}
//             onChange={(e) => setNewFolderName(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && createFolder()}
//             style={styles.folderInput}
//           />
//           <button onClick={createFolder} style={styles.createBtn}>
//             + Create Folder
//           </button>
//         </div>

//         <div style={styles.folderList}>
//           <div style={styles.sectionTitle}>ALL FOLDERS</div>
//           {folders.map(folder => (
//             <div
//               key={folder.id}
//               onClick={() => setActiveFolder(folder)}
//               style={{
//                 ...styles.folderItem,
//                 ...(activeFolder?.id === folder.id ? styles.activeFolder : {})
//               }}
//             >
//               <span>📁 {folder.name}</span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   deleteFolder(folder.id);
//                 }}
//                 style={styles.deleteFolderBtn}
//               >
//                 🗑️
//               </button>
//             </div>
//           ))}
//         </div>

//         {reviseProblems.length > 0 && (
//           <div style={styles.reviseSection}>
//             <div style={styles.sectionTitle}>⭐ REVISE LATER</div>
//             {reviseProblems.slice(0, 5).map(problem => (
//               <div key={problem.id} style={styles.reviseItem}>
//                 • {problem.questionName || "Untitled"}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* MAIN CONTENT */}
//       <div style={styles.main}>
//         {!activeFolder ? (
//           <div style={styles.emptyState}>
//             <div style={styles.emptyIcon}>📁</div>
//             <h3>Select a Folder</h3>
//             <p>Choose a folder from the sidebar or create a new one</p>
//           </div>
//         ) : (
//           <>
//             <div style={styles.header}>
//               <div style={styles.headerLeft}>
//                 <span style={{ fontSize: "24px" }}>📁</span>
//                 <h2 style={styles.folderTitle}>{activeFolder.name}</h2>
//                 <span style={styles.problemCount}>{folderProblems.length} problems</span>
//               </div>
//               <div style={styles.headerRight}>
//                 <input
//                   type="text"
//                   placeholder="🔍 Search problems..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   style={styles.searchInput}
//                 />
//                 <button
//                   onClick={() => setFilterDifficulty("All")}
//                   style={{ ...styles.filterBtn, ...(filterDifficulty === "All" ? styles.activeFilterBtn : {}) }}
//                 >
//                   All
//                 </button>
//                 <button
//                   onClick={() => setFilterDifficulty("Easy")}
//                   style={{ ...styles.filterBtn, ...(filterDifficulty === "Easy" ? styles.activeFilterBtn : {}) }}
//                 >
//                   Easy
//                 </button>
//                 <button
//                   onClick={() => setFilterDifficulty("Medium")}
//                   style={{ ...styles.filterBtn, ...(filterDifficulty === "Medium" ? styles.activeFilterBtn : {}) }}
//                 >
//                   Medium
//                 </button>
//                 <button
//                   onClick={() => setFilterDifficulty("Hard")}
//                   style={{ ...styles.filterBtn, ...(filterDifficulty === "Hard" ? styles.activeFilterBtn : {}) }}
//                 >
//                   Hard
//                 </button>
//                 <button onClick={addProblem} style={styles.addBtn}>
//                   + Add Problem
//                 </button>
//               </div>
//             </div>

//             {/* Revision Banner */}
//             {filteredProblems.filter(p => p.revise).length > 0 && (
//               <div style={styles.revisionBanner}>
//                 <div style={styles.bannerTitle}>
//                   ⭐ Marked for Revision — {filteredProblems.filter(p => p.revise).length} problem
//                 </div>
//                 <div style={styles.bannerProblems}>
//                   {filteredProblems.filter(p => p.revise).map(p => (
//                     <span key={p.id} style={styles.revisionChip}>
//                       {p.questionName || "Untitled"}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Problems Table */}
//             <div style={styles.tableContainer}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}></th>
//                     <th style={styles.th}>Question Name</th>
//                     <th style={styles.th}>Description</th>
//                     <th style={styles.th}>Link</th>
//                     <th style={styles.th}>Difficulty</th>
//                     <th style={styles.th}>Note</th>
//                     <th style={styles.th}>Solved</th>
//                     <th style={styles.th}>Revise</th>
//                     <th style={styles.th}>Snippet</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredProblems.map(problem => (
//                     <ProblemRow key={problem.id} problem={problem} />
//                   ))}
//                   {filteredProblems.length === 0 && (
//                     <tr>
//                       <td colSpan="9" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
//                         No problems found. Click "Add Problem" to get started!
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const API = "http://localhost:8080/api";

// export default function App() {
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   // Load data
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const foldersRes = await axios.get(`${API}/folders`);
//       const problemsRes = await axios.get(`${API}/problems`);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Create folder
//   const createFolder = async () => {
//     if (!newFolderName.trim()) return;
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       setFolders([...folders, res.data]);
//       setNewFolderName("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete folder
//   const deleteFolder = async (id) => {
//     try {
//       await axios.delete(`${API}/folders/${id}`);
//       setFolders(folders.filter(f => f.id !== id));
//       if (activeFolder?.id === id) setActiveFolder(null);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Add problem
//   const addProblem = async () => {
//     if (!activeFolder) return;
    
//     const newProb = {
//       questionName: "New Problem",
//       link: "",
//       difficulty: "Easy",
//       solved: false,
//       revise: false,
//       note: "",
//       folderId: activeFolder.id
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProb);
//       setProblems([...problems, res.data]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Update problem
//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete problem
//   const deleteProblem = async (id) => {
//     try {
//       await axios.delete(`${API}/problems/${id}`);
//       setProblems(problems.filter(p => p.id !== id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Filter problems
//   const folderProblems = problems.filter(p => p.folderId === activeFolder?.id);
//   const filteredProblems = folderProblems.filter(p => {
//     if (search && !p.questionName?.toLowerCase().includes(search.toLowerCase())) return false;
//     if (filterDiff !== "All" && p.difficulty !== filterDiff) return false;
//     return true;
//   });

//   const getBadgeClass = (diff) => {
//     if (diff === "Easy") return "bg-success";
//     if (diff === "Medium") return "bg-warning";
//     return "bg-danger";
//   };

//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       <div className="container-fluid">
//         <div className="row">
          
//           {/* SIDEBAR */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4">📚 SolveStack</h3>
            
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && createFolder()}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>
            
//             <hr style={{ background: "#333" }} />
            
//             <h6 className="text-secondary">FOLDERS</h6>
//             {folders.map(f => (
//               <div
//                 key={f.id}
//                 onClick={() => setActiveFolder(f)}
//                 className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                 style={{
//                   background: activeFolder?.id === f.id ? "#0d6efd" : "transparent",
//                   cursor: "pointer"
//                 }}
//               >
//                 <span>📁 {f.name}</span>
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={(e) => { e.stopPropagation(); deleteFolder(f.id); }}
//                 >
//                   🗑️
//                 </button>
//               </div>
//             ))}
//           </div>
          
//           {/* MAIN CONTENT */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {!activeFolder ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>
                
//                 {/* Search & Filter */}
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       <button
//                         className={`btn ${filterDiff === "All" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("All")}
//                       >
//                         All
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Easy" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Easy")}
//                       >
//                         Easy
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Medium" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Medium")}
//                       >
//                         Medium
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Hard" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Hard")}
//                       >
//                         Hard
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Bootstrap Table */}
//                 <div className="table-responsive">
//                   <table className="table table-dark table-hover">
//                     <thead>
//                       <tr>
//                         <th></th>
//                         <th>Problem Name</th>
//                         <th>Link</th>
//                         <th>Difficulty</th>
//                         <th>Solved</th>
//                         <th>Revise</th>
//                         <th>Note</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map(p => (
//                         <tr key={p.id} style={{ background: p.solved ? "#1a3a1a" : "transparent" }}>
//                           <td>📝</td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               value={p.questionName}
//                               onChange={(e) => updateProblem(p.id, { questionName: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none", width: "200px" }}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               value={p.link || ""}
//                               onChange={(e) => updateProblem(p.id, { link: e.target.value })}
//                               placeholder="URL"
//                               style={{ background: "#222", color: "white", border: "none", width: "150px" }}
//                             />
//                             {p.link && (
//                               <a href={p.link} target="_blank" rel="noopener noreferrer" className="ms-1">🔗</a>
//                             )}
//                           </td>
//                           <td>
//                             <select
//                               className="form-select form-select-sm"
//                               value={p.difficulty}
//                               onChange={(e) => updateProblem(p.id, { difficulty: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none", width: "100px" }}
//                             >
//                               <option>Easy</option>
//                               <option>Medium</option>
//                               <option>Hard</option>
//                             </select>
//                             <span className={`badge ${getBadgeClass(p.difficulty)} ms-1`}>
//                               {p.difficulty}
//                             </span>
//                           </td>
//                           <td className="text-center">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               checked={p.solved}
//                               onChange={() => updateProblem(p.id, { solved: !p.solved })}
//                             />
//                           </td>
//                           <td className="text-center">
//                             <button
//                               className="btn btn-sm btn-link"
//                               onClick={() => updateProblem(p.id, { revise: !p.revise })}
//                               style={{ fontSize: "20px", textDecoration: "none" }}
//                             >
//                               {p.revise ? "⭐" : "☆"}
//                             </button>
//                           </td>
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               value={p.note || ""}
//                               onChange={(e) => updateProblem(p.id, { note: e.target.value })}
//                               placeholder="Add note..."
//                               rows={1}
//                               style={{ background: "#222", color: "white", border: "none", width: "150px" }}
//                             />
//                           </td>
//                           <td>
//                             <button
//                               className="btn btn-sm btn-outline-danger"
//                               onClick={() => deleteProblem(p.id)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="8" className="text-center text-secondary py-4">
//                             No problems. Click "Add Problem" to start!
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const API = "http://localhost:8080/api";

// export default function App() {
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   // Load data on startup
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [foldersRes, problemsRes] = await Promise.all([
//         axios.get(`${API}/folders`),
//         axios.get(`${API}/problems`)
//       ]);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//       console.log("Loaded:", foldersRes.data.length, "folders,", problemsRes.data.length, "problems");
//     } catch (err) {
//       console.error("Error loading data:", err);
//     }
//   };

//   // ========== FOLDER FUNCTIONS ==========

//   const createFolder = async () => {
//     if (!newFolderName.trim()) {
//       alert("Please enter a folder name");
//       return;
//     }
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       setFolders([...folders, res.data]);
//       setNewFolderName("");
//     } catch (err) {
//       console.error("Error creating folder:", err);
//       alert("Failed to create folder");
//     }
//   };

//   const deleteFolder = async (id) => {
//     if (!window.confirm("Delete this folder and all problems inside?")) return;
//     try {
//       await axios.delete(`${API}/folders/${id}`);
//       setFolders(folders.filter(f => f.id !== id));
//       if (activeFolder?.id === id) setActiveFolder(null);
//       // Also remove problems from this folder
//       setProblems(problems.filter(p => p.folderId !== id));
//     } catch (err) {
//       console.error("Error deleting folder:", err);
//       alert("Failed to delete folder");
//     }
//   };

//   // ========== PROBLEM FUNCTIONS ==========

//   const addProblem = async () => {
//     if (!activeFolder) {
//       alert("Please select a folder first");
//       return;
//     }
    
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       setProblems([...problems, res.data]);
//       console.log("Problem added:", res.data);
//     } catch (err) {
//       console.error("Error adding problem:", err);
//       alert("Failed to add problem");
//     }
//   };

//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.error("Error updating problem:", err);
//     }
//   };

//   const deleteProblem = async (id) => {
//     if (!window.confirm("Delete this problem?")) return;
//     try {
//       await axios.delete(`${API}/problems/${id}`);
//       setProblems(problems.filter(p => p.id !== id));
//     } catch (err) {
//       console.error("Error deleting problem:", err);
//       alert("Failed to delete problem");
//     }
//   };

//   const toggleSolved = async (id, currentStatus) => {
//     try {
//       const res = await axios.patch(`${API}/problems/${id}/toggle-solved`);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.error("Error toggling solved:", err);
//       // Fallback to manual update
//       updateProblem(id, { solved: !currentStatus });
//     }
//   };

//   const toggleRevise = async (id, currentStatus) => {
//     try {
//       const res = await axios.patch(`${API}/problems/${id}/toggle-revise`);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.error("Error toggling revise:", err);
//       // Fallback to manual update
//       updateProblem(id, { revise: !currentStatus });
//     }
//   };

//   // ========== FILTERING ==========

//   const folderProblems = problems.filter(p => p.folderId === activeFolder?.id);
  
//   const filteredProblems = folderProblems.filter(p => {
//     if (search && !p.questionName?.toLowerCase().includes(search.toLowerCase())) return false;
//     if (filterDiff !== "All" && p.difficulty !== filterDiff) return false;
//     return true;
//   });

//   const getDifficultyBadge = (diff) => {
//     if (diff === "Easy") return "bg-success";
//     if (diff === "Medium") return "bg-warning text-dark";
//     return "bg-danger";
//   };

//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       <div className="container-fluid">
//         <div className="row">
          
//           {/* ========== SIDEBAR ========== */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>
            
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && createFolder()}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>
            
//             <hr style={{ background: "#333" }} />
            
//             <h6 className="text-secondary mb-2">FOLDERS</h6>
//             {folders.length === 0 && (
//               <div className="text-secondary small">No folders yet. Create one!</div>
//             )}
//             {folders.map(folder => (
//               <div
//                 key={folder.id}
//                 onClick={() => setActiveFolder(folder)}
//                 className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                 style={{
//                   background: activeFolder?.id === folder.id ? "#0d6efd" : "transparent",
//                   cursor: "pointer"
//                 }}
//               >
//                 <span>📁 {folder.name}</span>
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}
//                 >
//                   🗑️
//                 </button>
//               </div>
//             ))}
//           </div>
          
//           {/* ========== MAIN CONTENT ========== */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {!activeFolder ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar or create a new one</p>
//               </div>
//             ) : (
//               <>
//                 {/* Header */}
//                 <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>
                
//                 {/* Search & Filter */}
//                 <div className="row mb-3">
//                   <div className="col-md-4 mb-2 mb-md-0">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group flex-wrap">
//                       {["All", "Easy", "Medium", "Hard"].map(diff => (
//                         <button
//                           key={diff}
//                           className={`btn ${filterDiff === diff ? "btn-primary" : "btn-secondary"}`}
//                           onClick={() => setFilterDiff(diff)}
//                         >
//                           {diff}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Problems Table */}
//                 <div className="table-responsive">
//                   <table className="table table-dark table-hover">
//                     <thead>
//                       <tr>
//                         <th style={{ width: "40px" }}></th>
//                         <th>Problem Name</th>
//                         <th style={{ width: "150px" }}>Link</th>
//                         <th style={{ width: "120px" }}>Difficulty</th>
//                         <th style={{ width: "80px" }} className="text-center">Solved</th>
//                         <th style={{ width: "80px" }} className="text-center">Revise</th>
//                         <th style={{ width: "150px" }}>Note</th>
//                         <th style={{ width: "80px" }}></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map(problem => (
//                         <tr key={problem.id} style={{ background: problem.solved ? "#1a3a1a" : "transparent" }}>
//                           <td>📝</td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               value={problem.questionName}
//                               onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none", minWidth: "200px" }}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               value={problem.link || ""}
//                               onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
//                               placeholder="URL"
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                             {problem.link && (
//                               <a href={problem.link} target="_blank" rel="noopener noreferrer" className="ms-1">🔗</a>
//                             )}
//                           </td>
//                           <td>
//                             <select
//                               className="form-select form-select-sm"
//                               value={problem.difficulty}
//                               onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             >
//                               <option>Easy</option>
//                               <option>Medium</option>
//                               <option>Hard</option>
//                             </select>
//                             <span className={`badge ${getDifficultyBadge(problem.difficulty)} ms-1`}>
//                               {problem.difficulty}
//                             </span>
//                           </td>
//                           <td className="text-center">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               checked={problem.solved}
//                               onChange={() => toggleSolved(problem.id, problem.solved)}
//                             />
//                           </td>
//                           <td className="text-center">
//                             <button
//                               className="btn btn-sm btn-link text-warning"
//                               onClick={() => toggleRevise(problem.id, problem.revise)}
//                               style={{ fontSize: "20px", textDecoration: "none" }}
//                             >
//                               {problem.revise ? "⭐" : "☆"}
//                             </button>
//                           </td>
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               value={problem.note || ""}
//                               onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
//                               placeholder="Add note..."
//                               rows={1}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                           </td>
//                           <td className="text-center">
//                             <button
//                               className="btn btn-sm btn-outline-danger"
//                               onClick={() => deleteProblem(problem.id)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="8" className="text-center text-secondary py-4">
//                             No problems. Click "Add Problem" to start!
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Stats */}
//                 <div className="mt-3 text-secondary">
//                   Showing {filteredProblems.length} of {folderProblems.length} problems
//                   {filteredProblems.filter(p => p.revise).length > 0 && (
//                     <span className="ms-3">⭐ {filteredProblems.filter(p => p.revise).length} for revision</span>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const API = "http://localhost:8080/api";

// export default function App() {
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [foldersRes, problemsRes] = await Promise.all([
//         axios.get(`${API}/folders`),
//         axios.get(`${API}/problems`)
//       ]);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   const createFolder = async () => {
//     if (!newFolderName.trim()) return;
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       setFolders([...folders, res.data]);
//       setNewFolderName("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteFolder = async (id) => {
//     try {
//       await axios.delete(`${API}/folders/${id}`);
//       setFolders(folders.filter(f => f.id !== id));
//       if (activeFolder?.id === id) setActiveFolder(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addProblem = async () => {
//     if (!activeFolder) {
//       alert("Select a folder first!");
//       return;
//     }
    
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       setProblems([...problems, res.data]);
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteProblem = async (id) => {
//     try {
//       await axios.delete(`${API}/problems/${id}`);
//       setProblems(problems.filter(p => p.id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const folderProblems = problems.filter(p => p.folderId === activeFolder?.id);
  
//   const filteredProblems = folderProblems.filter(p => {
//     if (search && !p.questionName?.toLowerCase().includes(search.toLowerCase())) return false;
//     if (filterDiff !== "All" && p.difficulty !== filterDiff) return false;
//     return true;
//   });

//   const getBadgeClass = (diff) => {
//     if (diff === "Easy") return "bg-success";
//     if (diff === "Medium") return "bg-warning text-dark";
//     return "bg-danger";
//   };

//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       <div className="container-fluid">
//         <div className="row">
          
//           {/* ========== SIDEBAR ========== */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>
            
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && createFolder()}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>
            
//             <hr style={{ background: "#333" }} />
            
//             <h6 className="text-secondary mb-2">FOLDERS</h6>
//             {folders.map(folder => (
//               <div
//                 key={folder.id}
//                 onClick={() => setActiveFolder(folder)}
//                 className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                 style={{
//                   background: activeFolder?.id === folder.id ? "#0d6efd" : "transparent",
//                   cursor: "pointer"
//                 }}
//               >
//                 <span>📁 {folder.name}</span>
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}
//                 >
//                   🗑️
//                 </button>
//               </div>
//             ))}
//           </div>
          
//           {/* ========== MAIN CONTENT ========== */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {!activeFolder ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>
                
//                 {/* Search & Filter */}
//                 <div className="row mb-3">
//                   <div className="col-md-4 mb-2 mb-md-0">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       {["All", "Easy", "Medium", "Hard"].map(d => (
//                         <button
//                           key={d}
//                           className={`btn ${filterDiff === d ? "btn-primary" : "btn-secondary"}`}
//                           onClick={() => setFilterDiff(d)}
//                         >
//                           {d}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* ========== COMPLETE TABLE WITH ALL COLUMNS ========== */}
//                 <div className="table-responsive">
//                   <table className="table table-dark table-hover" style={{ fontSize: "14px" }}>
//                     <thead>
//                       <tr style={{ background: "#1a1a2a" }}>
//                         <th style={{ width: "40px" }}>#</th>
//                         <th style={{ width: "200px" }}>Question Name</th>
//                         <th style={{ width: "250px" }}>Description</th>
//                         <th style={{ width: "150px" }}>Link</th>
//                         <th style={{ width: "100px" }}>Difficulty</th>
//                         <th style={{ width: "200px" }}>Note</th>
//                         <th style={{ width: "80px" }} className="text-center">Solved</th>
//                         <th style={{ width: "80px" }} className="text-center">Revise</th>
//                         <th style={{ width: "250px" }}>Code Snippet</th>
//                         <th style={{ width: "80px" }}>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map((problem, idx) => (
//                         <tr key={problem.id} style={{ background: problem.solved ? "#1a3a1a" : "transparent" }}>
//                           {/* Serial Number */}
//                           <td className="text-secondary">{idx + 1}</td>
                          
//                           {/* Question Name */}
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               value={problem.questionName}
//                               onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                           </td>
                          
//                           {/* Description */}
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               value={problem.description || ""}
//                               onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
//                               placeholder="Problem description..."
//                               rows={2}
//                               style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                             />
//                           </td>
                          
//                           {/* Link */}
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm mb-1"
//                               value={problem.link || ""}
//                               onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
//                               placeholder="https://..."
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                             {problem.link && (
//                               <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">
//                                 🔗 Open
//                               </a>
//                             )}
//                           </td>
                          
//                           {/* Difficulty */}
//                           <td>
//                             <select
//                               className="form-select form-select-sm mb-1"
//                               value={problem.difficulty}
//                               onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             >
//                               <option>Easy</option>
//                               <option>Medium</option>
//                               <option>Hard</option>
//                             </select>
//                             <span className={`badge ${getBadgeClass(problem.difficulty)} w-100`}>
//                               {problem.difficulty}
//                             </span>
//                           </td>
                          
//                           {/* Note */}
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               value={problem.note || ""}
//                               onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
//                               placeholder="Your notes..."
//                               rows={2}
//                               style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                             />
//                           </td>
                          
//                           {/* Solved Checkbox */}
//                           <td className="text-center">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               style={{ width: "20px", height: "20px", cursor: "pointer" }}
//                               checked={problem.solved}
//                               onChange={async () => {
//                                 try {
//                                   const res = await axios.patch(`${API}/problems/${problem.id}/toggle-solved`);
//                                   setProblems(problems.map(p => p.id === problem.id ? res.data : p));
//                                 } catch (err) {
//                                   updateProblem(problem.id, { solved: !problem.solved });
//                                 }
//                               }}
//                             />
//                             <div className="small text-secondary mt-1">{problem.solved ? "✅ Done" : "⭕ Pending"}</div>
//                           </td>
                          
//                           {/* Revise Star */}
//                           <td className="text-center">
//                             <button
//                               className="btn btn-sm"
//                               onClick={async () => {
//                                 try {
//                                   const res = await axios.patch(`${API}/problems/${problem.id}/toggle-revise`);
//                                   setProblems(problems.map(p => p.id === problem.id ? res.data : p));
//                                 } catch (err) {
//                                   updateProblem(problem.id, { revise: !problem.revise });
//                                 }
//                               }}
//                               style={{ fontSize: "28px", background: "none", border: "none", cursor: "pointer" }}
//                             >
//                               {problem.revise ? "⭐" : "☆"}
//                             </button>
//                             <div className="small text-secondary mt-1">{problem.revise ? "Revise" : "Optional"}</div>
//                           </td>
                          
//                           {/* Code Snippet */}
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               value={problem.codeSnippet || ""}
//                               onChange={(e) => updateProblem(problem.id, { codeSnippet: e.target.value })}
//                               placeholder="// Your code here..."
//                               rows={3}
//                               style={{ background: "#1a1a2a", color: "#86efac", border: "none", resize: "vertical", fontFamily: "monospace", fontSize: "11px" }}
//                             />
//                           </td>
                          
//                           {/* Delete Button */}
//                           <td className="text-center">
//                             <button
//                               className="btn btn-sm btn-outline-danger"
//                               onClick={() => deleteProblem(problem.id)}
//                             >
//                               🗑️ Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="10" className="text-center text-secondary py-5">
//                             📭 No problems. Click "Add Problem" to get started!
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Stats Footer */}
//                 <div className="mt-3 d-flex justify-content-between text-secondary">
//                   <span>📊 Total: {folderProblems.length} problems</span>
//                   <span>⭐ Revision: {folderProblems.filter(p => p.revise).length} problems</span>
//                   <span>✅ Solved: {folderProblems.filter(p => p.solved).length} problems</span>
//                   <span>🔍 Showing: {filteredProblems.length} of {folderProblems.length}</span>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const API = "http://localhost:8080/api";

// export default function App() {
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   // Load data when app opens
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const foldersRes = await axios.get(`${API}/folders`);
//       const problemsRes = await axios.get(`${API}/problems`);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Create folder
//   const createFolder = async () => {
//     if (!newFolderName.trim()) return;
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       setFolders([...folders, res.data]);
//       setNewFolderName("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete folder
//   const deleteFolder = async (id) => {
//     try {
//       await axios.delete(`${API}/folders/${id}`);
//       setFolders(folders.filter(f => f.id !== id));
//       if (activeFolder?.id === id) setActiveFolder(null);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Add problem - SIMPLE
//   const addProblem = async () => {
//     if (!activeFolder) {
//       alert("Select a folder first");
//       return;
//     }
    
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       setProblems([...problems, res.data]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete problem - SIMPLE
//   const deleteProblem = async (id) => {
//     try {
//       await axios.delete(`${API}/problems/${id}`);
//       setProblems(problems.filter(p => p.id !== id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Get problems for current folder
//   const folderProblems = problems.filter(p => p.folderId === activeFolder?.id);
  
//   // Filter by search and difficulty
//   const filteredProblems = folderProblems.filter(p => {
//     if (search && !p.questionName?.toLowerCase().includes(search.toLowerCase())) return false;
//     if (filterDiff !== "All" && p.difficulty !== filterDiff) return false;
//     return true;
//   });

//   const getBadgeClass = (diff) => {
//     if (diff === "Easy") return "bg-success";
//     if (diff === "Medium") return "bg-warning text-dark";
//     return "bg-danger";
//   };

//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       <div className="container-fluid">
//         <div className="row">
          
//           {/* SIDEBAR */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>
            
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && createFolder()}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>
            
//             <hr style={{ background: "#333" }} />
            
//             <h6 className="text-secondary mb-2">FOLDERS</h6>
//             {folders.map(folder => (
//               <div
//                 key={folder.id}
//                 onClick={() => setActiveFolder(folder)}
//                 className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                 style={{
//                   background: activeFolder?.id === folder.id ? "#0d6efd" : "transparent",
//                   cursor: "pointer"
//                 }}
//               >
//                 <span>📁 {folder.name}</span>
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}
//                 >
//                   🗑️
//                 </button>
//               </div>
//             ))}
//           </div>
          
//           {/* MAIN CONTENT */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {!activeFolder ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>
                
//                 {/* Search & Filter */}
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       {["All", "Easy", "Medium", "Hard"].map(d => (
//                         <button
//                           key={d}
//                           className={`btn ${filterDiff === d ? "btn-primary" : "btn-secondary"}`}
//                           onClick={() => setFilterDiff(d)}
//                         >
//                           {d}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* TABLE - Everything inline, NO extra functions */}
//                 <div className="table-responsive">
//                   <table className="table table-dark table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th style={{ minWidth: "200px" }}>Question Name</th>
//                         <th style={{ minWidth: "200px" }}>Description</th>
//                         <th style={{ minWidth: "150px" }}>Link</th>
//                         <th>Difficulty</th>
//                         <th style={{ minWidth: "200px" }}>Note</th>
//                         <th>Solved</th>
//                         <th>Revise</th>
//                         <th style={{ minWidth: "250px" }}>Code</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map((p, idx) => (
//                         <tr key={p.id} style={{ background: p.solved ? "#1a3a1a" : "transparent" }}>
//                           <td>{idx + 1}</td>
                          
//                           {/* Question Name - Direct update */}
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               value={p.questionName}
//                               onChange={async (e) => {
//                                 const updated = { ...p, questionName: e.target.value };
//                                 const res = await axios.put(`${API}/problems/${p.id}`, updated);
//                                 setProblems(problems.map(prob => prob.id === p.id ? res.data : prob));
//                               }}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                           </td>
                          
//                           {/* Description - Direct update */}
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               rows="2"
//                               value={p.description || ""}
//                               onChange={async (e) => {
//                                 const updated = { ...p, description: e.target.value };
//                                 const res = await axios.put(`${API}/problems/${p.id}`, updated);
//                                 setProblems(problems.map(prob => prob.id === p.id ? res.data : prob));
//                               }}
//                               placeholder="Description..."
//                               style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                             />
//                           </td>
                          
//                           {/* Link - Direct update */}
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm mb-1"
//                               value={p.link || ""}
//                               onChange={async (e) => {
//                                 const updated = { ...p, link: e.target.value };
//                                 const res = await axios.put(`${API}/problems/${p.id}`, updated);
//                                 setProblems(problems.map(prob => prob.id === p.id ? res.data : prob));
//                               }}
//                               placeholder="URL"
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                             {p.link && (
//                               <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">
//                                 Open
//                               </a>
//                             )}
//                           </td>
                          
//                           {/* Difficulty - Direct update */}
//                           <td>
//                             <select
//                               className="form-select form-select-sm mb-1"
//                               value={p.difficulty}
//                               onChange={async (e) => {
//                                 const updated = { ...p, difficulty: e.target.value };
//                                 const res = await axios.put(`${API}/problems/${p.id}`, updated);
//                                 setProblems(problems.map(prob => prob.id === p.id ? res.data : prob));
//                               }}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             >
//                               <option>Easy</option>
//                               <option>Medium</option>
//                               <option>Hard</option>
//                             </select>
//                             <span className={`badge ${getBadgeClass(p.difficulty)} w-100`}>
//                               {p.difficulty}
//                             </span>
//                           </td>
                          
//                           {/* Note - Direct update */}
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               rows="2"
//                               value={p.note || ""}
//                               onChange={async (e) => {
//                                 const updated = { ...p, note: e.target.value };
//                                 const res = await axios.put(`${API}/problems/${p.id}`, updated);
//                                 setProblems(problems.map(prob => prob.id === p.id ? res.data : prob));
//                               }}
//                               placeholder="Your notes..."
//                               style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                             />
//                           </td>
                          
//                           {/* Solved - Direct toggle */}
//                           <td className="text-center">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               style={{ width: "20px", height: "20px" }}
//                               checked={p.solved}
//                               onChange={async () => {
//                                 const updated = { ...p, solved: !p.solved };
//                                 const res = await axios.put(`${API}/problems/${p.id}`, updated);
//                                 setProblems(problems.map(prob => prob.id === p.id ? res.data : prob));
//                               }}
//                             />
//                           </td>
                          
//                           {/* Revise - Direct toggle */}
//                           <td className="text-center">
//                             <button
//                               className="btn btn-sm"
//                               onClick={async () => {
//                                 const updated = { ...p, revise: !p.revise };
//                                 const res = await axios.put(`${API}/problems/${p.id}`, updated);
//                                 setProblems(problems.map(prob => prob.id === p.id ? res.data : prob));
//                               }}
//                               style={{ fontSize: "24px", background: "none", border: "none" }}
//                             >
//                               {p.revise ? "⭐" : "☆"}
//                             </button>
//                           </td>
                          
//                           {/* Code Snippet - Direct update */}
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               rows="3"
//                               value={p.codeSnippet || ""}
//                               onChange={async (e) => {
//                                 const updated = { ...p, codeSnippet: e.target.value };
//                                 const res = await axios.put(`${API}/problems/${p.id}`, updated);
//                                 setProblems(problems.map(prob => prob.id === p.id ? res.data : prob));
//                               }}
//                               placeholder="// Your code here..."
//                               style={{ background: "#1a1a2a", color: "#86efac", border: "none", resize: "vertical", fontFamily: "monospace" }}
//                             />
//                           </td>
                          
//                           {/* Delete button */}
//                           <td>
//                             <button
//                               className="btn btn-sm btn-outline-danger"
//                               onClick={() => deleteProblem(p.id)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="10" className="text-center py-5 text-secondary">
//                             No problems. Click "Add Problem" to start!
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Stats */}
//                 <div className="mt-3 text-secondary">
//                   Total: {folderProblems.length} | Solved: {folderProblems.filter(p => p.solved).length} | Revise: {folderProblems.filter(p => p.revise).length}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const API = "http://localhost:8080/api";

// export default function App() {
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   // Load data when app starts
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const foldersRes = await axios.get(`${API}/folders`);
//       const problemsRes = await axios.get(`${API}/problems`);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.log("Error:", err);
//     }
//   };

//   // Create a new folder
//   const createFolder = async () => {
//     if (newFolderName === "") {
//       return; // Don't create empty folder
//     }
    
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
      
//       // Make a new list with old folders + new folder
//       const newFoldersList = [...folders, res.data];
//       setFolders(newFoldersList);
      
//       // Clear the input box
//       setNewFolderName("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete a folder
//   const deleteFolder = async (folderId) => {
//     try {
//       await axios.delete(`${API}/folders/${folderId}`);
      
//       // Remove the deleted folder from list
//       const remainingFolders = folders.filter(function(folder) {
//         return folder.id !== folderId;
//       });
//       setFolders(remainingFolders);
      
//       // If the deleted folder was selected, deselect it
//       if (activeFolder !== null && activeFolder.id === folderId) {
//         setActiveFolder(null);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Add a new problem to current folder
//   const addProblem = async () => {
//     // Check if a folder is selected
//     if (activeFolder === null) {
//       alert("Please select a folder first");
//       return;
//     }
    
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id  // Link to current folder
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
      
//       // Add new problem to list
//       const newProblemsList = [...problems, res.data];
//       setProblems(newProblemsList);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete a problem
//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
      
//       // Remove the deleted problem from list
//       const remainingProblems = problems.filter(function(problem) {
//         return problem.id !== problemId;
//       });
//       setProblems(remainingProblems);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Get problems that belong to the selected folder
//   let folderProblems = [];
  
//   if (activeFolder !== null) {
//     folderProblems = problems.filter(function(problem) {
//       return problem.folderId === activeFolder.id;
//     });
//   }
  
//   // Apply search filter
//   let filteredProblems = [];
  
//   for (let i = 0; i < folderProblems.length; i++) {
//     const problem = folderProblems[i];
    
//     // Check search
//     let matchesSearch = true;
//     if (search !== "") {
//       const lowerCaseName = problem.questionName.toLowerCase();
//       const lowerCaseSearch = search.toLowerCase();
//       if (lowerCaseName.includes(lowerCaseSearch) === false) {
//         matchesSearch = false;
//       }
//     }
    
//     // Check difficulty filter
//     let matchesDifficulty = true;
//     if (filterDiff !== "All") {
//       if (problem.difficulty !== filterDiff) {
//         matchesDifficulty = false;
//       }
//     }
    
//     // If both match, add to filtered list
//     if (matchesSearch === true && matchesDifficulty === true) {
//       filteredProblems.push(problem);
//     }
//   }

//   // Get badge color for difficulty
//   function getBadgeClass(difficulty) {
//     if (difficulty === "Easy") {
//       return "bg-success";
//     } else if (difficulty === "Medium") {
//       return "bg-warning text-dark";
//     } else {
//       return "bg-danger";
//     }
//   }

//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       <div className="container-fluid">
//         <div className="row">
          
//           {/* ========== SIDEBAR ========== */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>
            
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => {
//                   if (e.key === "Enter") {
//                     createFolder();
//                   }
//                 }}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>
            
//             <hr style={{ background: "#333" }} />
            
//             <h6 className="text-secondary mb-2">FOLDERS</h6>
            
//             {/* Show each folder */}
//             {folders.map(function(folder) {
//               // Check if this folder is selected
//               let isSelected = false;
//               if (activeFolder !== null && activeFolder.id === folder.id) {
//                 isSelected = true;
//               }
              
//               // Set background color based on selection
//               let backgroundColor = "transparent";
//               if (isSelected === true) {
//                 backgroundColor = "#0d6efd";
//               }
              
//               return (
//                 <div
//                   key={folder.id}
//                   onClick={() => setActiveFolder(folder)}
//                   className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                   style={{
//                     background: backgroundColor,
//                     cursor: "pointer"
//                   }}
//                 >
//                   <span>📁 {folder.name}</span>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Don't select folder when clicking delete
//                       deleteFolder(folder.id);
//                     }}
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
          
//           {/* ========== MAIN CONTENT ========== */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {activeFolder === null ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>
                
//                 {/* Search & Filter */}
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       <button
//                         className={`btn ${filterDiff === "All" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("All")}
//                       >
//                         All
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Easy" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Easy")}
//                       >
//                         Easy
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Medium" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Medium")}
//                       >
//                         Medium
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Hard" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Hard")}
//                       >
//                         Hard
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* TABLE */}
//                 <div className="table-responsive">
//                   <table className="table table-dark table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th style={{ minWidth: "200px" }}>Question Name</th>
//                         <th style={{ minWidth: "200px" }}>Description</th>
//                         <th style={{ minWidth: "150px" }}>Link</th>
//                         <th>Difficulty</th>
//                         <th style={{ minWidth: "200px" }}>Note</th>
//                         <th>Solved</th>
//                         <th>Revise</th>
//                         <th style={{ minWidth: "250px" }}>Code</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map(function(problem, index) {
//                         // Set row background if solved
//                         let rowBackground = "transparent";
//                         if (problem.solved === true) {
//                           rowBackground = "#1a3a1a";
//                         }
                        
//                         return (
//                           <tr key={problem.id} style={{ background: rowBackground }}>
//                             <td>{index + 1}</td>
                            
//                             {/* Question Name */}
//                             <td>
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 value={problem.questionName}
//                                 onChange={async (e) => {
//                                   const updatedProblem = {
//                                     ...problem,
//                                     questionName: e.target.value
//                                   };
//                                   const res = await axios.put(`${API}/problems/${problem.id}`, updatedProblem);
                                  
//                                   // Update problems list
//                                   const newProblemsList = problems.map(function(p) {
//                                     if (p.id === problem.id) {
//                                       return res.data;
//                                     } else {
//                                       return p;
//                                     }
//                                   });
//                                   setProblems(newProblemsList);
//                                 }}
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               />
//                             </td>
                            
//                             {/* Description */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="2"
//                                 value={problem.description || ""}
//                                 onChange={async (e) => {
//                                   const updatedProblem = {
//                                     ...problem,
//                                     description: e.target.value
//                                   };
//                                   const res = await axios.put(`${API}/problems/${problem.id}`, updatedProblem);
                                  
//                                   const newProblemsList = problems.map(function(p) {
//                                     if (p.id === problem.id) {
//                                       return res.data;
//                                     } else {
//                                       return p;
//                                     }
//                                   });
//                                   setProblems(newProblemsList);
//                                 }}
//                                 placeholder="Description..."
//                                 style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                               />
//                             </td>
                            
//                             {/* Link */}
//                             <td>
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm mb-1"
//                                 value={problem.link || ""}
//                                 onChange={async (e) => {
//                                   const updatedProblem = {
//                                     ...problem,
//                                     link: e.target.value
//                                   };
//                                   const res = await axios.put(`${API}/problems/${problem.id}`, updatedProblem);
                                  
//                                   const newProblemsList = problems.map(function(p) {
//                                     if (p.id === problem.id) {
//                                       return res.data;
//                                     } else {
//                                       return p;
//                                     }
//                                   });
//                                   setProblems(newProblemsList);
//                                 }}
//                                 placeholder="https://..."
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               />
//                               {problem.link !== "" && (
//                                 <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">
//                                   Open
//                                 </a>
//                               )}
//                             </td>
                            
//                             {/* Difficulty */}
//                             <td>
//                               <select
//                                 className="form-select form-select-sm mb-1"
//                                 value={problem.difficulty}
//                                 onChange={async (e) => {
//                                   const updatedProblem = {
//                                     ...problem,
//                                     difficulty: e.target.value
//                                   };
//                                   const res = await axios.put(`${API}/problems/${problem.id}`, updatedProblem);
                                  
//                                   const newProblemsList = problems.map(function(p) {
//                                     if (p.id === problem.id) {
//                                       return res.data;
//                                     } else {
//                                       return p;
//                                     }
//                                   });
//                                   setProblems(newProblemsList);
//                                 }}
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               >
//                                 <option>Easy</option>
//                                 <option>Medium</option>
//                                 <option>Hard</option>
//                               </select>
//                               <span className={`badge ${getBadgeClass(problem.difficulty)} w-100`}>
//                                 {problem.difficulty}
//                               </span>
//                             </td>
                            
//                             {/* Note */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="2"
//                                 value={problem.note || ""}
//                                 onChange={async (e) => {
//                                   const updatedProblem = {
//                                     ...problem,
//                                     note: e.target.value
//                                   };
//                                   const res = await axios.put(`${API}/problems/${problem.id}`, updatedProblem);
                                  
//                                   const newProblemsList = problems.map(function(p) {
//                                     if (p.id === problem.id) {
//                                       return res.data;
//                                     } else {
//                                       return p;
//                                     }
//                                   });
//                                   setProblems(newProblemsList);
//                                 }}
//                                 placeholder="Your notes..."
//                                 style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                               />
//                             </td>
                            
//                             {/* Solved Checkbox */}
//                             <td className="text-center">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 style={{ width: "20px", height: "20px" }}
//                                 checked={problem.solved}
//                                 onChange={async () => {
//                                   const updatedProblem = {
//                                     ...problem,
//                                     solved: !problem.solved
//                                   };
//                                   const res = await axios.put(`${API}/problems/${problem.id}`, updatedProblem);
                                  
//                                   const newProblemsList = problems.map(function(p) {
//                                     if (p.id === problem.id) {
//                                       return res.data;
//                                     } else {
//                                       return p;
//                                     }
//                                   });
//                                   setProblems(newProblemsList);
//                                 }}
//                               />
//                             </td>
                            
//                             {/* Revise Star */}
//                             <td className="text-center">
//                               <button
//                                 className="btn btn-sm"
//                                 onClick={async () => {
//                                   const updatedProblem = {
//                                     ...problem,
//                                     revise: !problem.revise
//                                   };
//                                   const res = await axios.put(`${API}/problems/${problem.id}`, updatedProblem);
                                  
//                                   const newProblemsList = problems.map(function(p) {
//                                     if (p.id === problem.id) {
//                                       return res.data;
//                                     } else {
//                                       return p;
//                                     }
//                                   });
//                                   setProblems(newProblemsList);
//                                 }}
//                                 style={{ fontSize: "24px", background: "none", border: "none" }}
//                               >
//                                 {problem.revise === true ? "⭐" : "☆"}
//                               </button>
//                             </td>
                            
//                             {/* Code Snippet */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="3"
//                                 value={problem.codeSnippet || ""}
//                                 onChange={async (e) => {
//                                   const updatedProblem = {
//                                     ...problem,
//                                     codeSnippet: e.target.value
//                                   };
//                                   const res = await axios.put(`${API}/problems/${problem.id}`, updatedProblem);
                                  
//                                   const newProblemsList = problems.map(function(p) {
//                                     if (p.id === problem.id) {
//                                       return res.data;
//                                     } else {
//                                       return p;
//                                     }
//                                   });
//                                   setProblems(newProblemsList);
//                                 }}
//                                 placeholder="// Your code here..."
//                                 style={{ background: "#1a1a2a", color: "#86efac", border: "none", resize: "vertical", fontFamily: "monospace" }}
//                               />
//                             </td>
                            
//                             {/* Delete Button */}
//                             <td>
//                               <button
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() => deleteProblem(problem.id)}
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
                      
//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="10" className="text-center py-5 text-secondary">
//                             No problems. Click "Add Problem" to start!
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Stats */}
//                 <div className="mt-3 text-secondary">
//                   Total: {folderProblems.length} | 
//                   Solved: {
//                     (function() {
//                       let count = 0;
//                       for (let i = 0; i < folderProblems.length; i++) {
//                         if (folderProblems[i].solved === true) {
//                           count++;
//                         }
//                       }
//                       return count;
//                     })()
//                   } | 
//                   Revise: {
//                     (function() {
//                       let count = 0;
//                       for (let i = 0; i < folderProblems.length; i++) {
//                         if (folderProblems[i].revise === true) {
//                           count++;
//                         }
//                       }
//                       return count;
//                     })()
//                   }
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser, SignOutButton } from "@clerk/clerk-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// // ✅ CORRECT - looking in pages folder
// import LoginPage from "./pages/LoginPage";

// const API = "http://localhost:8080/api";

// export default function App() {
//   const { isSignedIn, user } = useUser();
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   // Load data when user logs in
//   useEffect(() => {
//     if (isSignedIn && user) {
//       loadData();
//       // Set username for backend (optional)
//       localStorage.setItem("username", user.username);
//     }
//   }, [isSignedIn, user]);

//   const loadData = async () => {
//     try {
//       const [foldersRes, problemsRes] = await Promise.all([
//         axios.get(`${API}/folders`),
//         axios.get(`${API}/problems`)
//       ]);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.log("Error:", err);
//     }
//   };

//   const handleLogin = () => {
//     // Clerk handles everything automatically
//   };

//   // Show login page if not signed in
//   if (!isSignedIn) {
//     return <LoginPage onLogin={handleLogin} />;
//   }

//   // Rest of your app code (same as before)
//   const createFolder = async () => {
//     if (!newFolderName.trim()) return;
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       setFolders([...folders, res.data]);
//       setNewFolderName("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteFolder = async (folderId) => {
//     try {
//       await axios.delete(`${API}/folders/${folderId}`);
//       setFolders(folders.filter(f => f.id !== folderId));
//       if (activeFolder !== null && activeFolder.id === folderId) {
//         setActiveFolder(null);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const addProblem = async () => {
//     if (!activeFolder) {
//       alert("Select a folder first");
//       return;
//     }
    
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       setProblems([...problems, res.data]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
//       setProblems(problems.filter(p => p.id !== problemId));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   let folderProblems = [];
//   if (activeFolder !== null) {
//     folderProblems = problems.filter(p => p.folderId === activeFolder.id);
//   }
  
//   let filteredProblems = folderProblems.filter(p => {
//     if (search && !p.questionName?.toLowerCase().includes(search.toLowerCase())) return false;
//     if (filterDiff !== "All" && p.difficulty !== filterDiff) return false;
//     return true;
//   });

//   function getBadgeClass(diff) {
//     if (diff === "Easy") return "bg-success";
//     if (diff === "Medium") return "bg-warning text-dark";
//     return "bg-danger";
//   }

//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       {/* Logout Button with Clerk */}
//       <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
//         <SignOutButton>
//           <button className="btn btn-outline-danger">
//             Logout ({user?.username})
//           </button>
//         </SignOutButton>
//       </div>

//       <div className="container-fluid">
//         <div className="row">
          
//           {/* SIDEBAR */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>
            
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && createFolder()}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>
            
//             <hr style={{ background: "#333" }} />
            
//             <h6 className="text-secondary mb-2">FOLDERS</h6>
//             {folders.map(folder => (
//               <div
//                 key={folder.id}
//                 onClick={() => setActiveFolder(folder)}
//                 className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                 style={{
//                   background: activeFolder?.id === folder.id ? "#0d6efd" : "transparent",
//                   cursor: "pointer"
//                 }}
//               >
//                 <span>📁 {folder.name}</span>
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}
//                 >
//                   🗑️
//                 </button>
//               </div>
//             ))}
//           </div>
          
//           {/* MAIN CONTENT */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {activeFolder === null ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>
                
//                 {/* Search & Filter */}
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       {["All", "Easy", "Medium", "Hard"].map(d => (
//                         <button
//                           key={d}
//                           className={`btn ${filterDiff === d ? "btn-primary" : "btn-secondary"}`}
//                           onClick={() => setFilterDiff(d)}
//                         >
//                           {d}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* TABLE */}
//                 <div className="table-responsive">
//                   <table className="table table-dark table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Question Name</th>
//                         <th>Description</th>
//                         <th>Link</th>
//                         <th>Difficulty</th>
//                         <th>Note</th>
//                         <th>Solved</th>
//                         <th>Revise</th>
//                         <th>Code</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map((problem, idx) => (
//                         <tr key={problem.id} style={{ background: problem.solved ? "#1a3a1a" : "transparent" }}>
//                           <td>{idx + 1}</td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               value={problem.questionName}
//                               onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                           </td>
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               rows="2"
//                               value={problem.description || ""}
//                               onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
//                               placeholder="Description..."
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm mb-1"
//                               value={problem.link || ""}
//                               onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
//                               placeholder="URL"
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                             {problem.link && (
//                               <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">
//                                 Open
//                               </a>
//                             )}
//                           </td>
//                           <td>
//                             <select
//                               className="form-select form-select-sm"
//                               value={problem.difficulty}
//                               onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             >
//                               <option>Easy</option>
//                               <option>Medium</option>
//                               <option>Hard</option>
//                             </select>
//                             <span className={`badge ${getBadgeClass(problem.difficulty)} w-100 mt-1`}>
//                               {problem.difficulty}
//                             </span>
//                           </td>
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               rows="2"
//                               value={problem.note || ""}
//                               onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
//                               placeholder="Notes..."
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                           </td>
//                           <td className="text-center">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               checked={problem.solved}
//                               onChange={() => updateProblem(problem.id, { solved: !problem.solved })}
//                             />
//                           </td>
//                           <td className="text-center">
//                             <button
//                               className="btn btn-sm"
//                               onClick={() => updateProblem(problem.id, { revise: !problem.revise })}
//                               style={{ fontSize: "24px", background: "none", border: "none" }}
//                             >
//                               {problem.revise ? "⭐" : "☆"}
//                             </button>
//                           </td>
//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               rows="3"
//                               value={problem.codeSnippet || ""}
//                               onChange={(e) => updateProblem(problem.id, { codeSnippet: e.target.value })}
//                               placeholder="// Code here..."
//                               style={{ background: "#1a1a2a", color: "#86efac", fontFamily: "monospace" }}
//                             />
//                           </td>
//                           <td>
//                             <button
//                               className="btn btn-sm btn-outline-danger"
//                               onClick={() => deleteProblem(problem.id)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="10" className="text-center py-5 text-secondary">
//                             No problems. Click "Add Problem" to start!
//                            </td>
//                          </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";

// const API = "http://localhost:8080/api";

// export default function App() {
//   // Page state
//   const [page, setPage] = useState("landing");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//   // Data state
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   // Check if already logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       setIsAuthenticated(true);
//       setPage("app");
//       loadData();
//     }
//   }, []);

//   const loadData = async () => {
//     try {
//       const foldersRes = await axios.get(`${API}/folders`);
//       const problemsRes = await axios.get(`${API}/problems`);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.log("Error:", err);
//       if (err.response && err.response.status === 401) {
//         handleLogout();
//       }
//     }
//   };

//   // Navigation functions
//   const handleGetStarted = () => {
//     setPage("login");
//   };

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//     setPage("app");
//     loadData();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     delete axios.defaults.headers.common["Authorization"];
//     setIsAuthenticated(false);
//     setPage("landing");
//     setFolders([]);
//     setProblems([]);
//     setActiveFolder(null);
//   };

//   // Create a new folder
//   const createFolder = async () => {
//     if (newFolderName === "") {
//       return;
//     }
    
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       const newFoldersList = [...folders, res.data];
//       setFolders(newFoldersList);
//       setNewFolderName("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete a folder
//   const deleteFolder = async (folderId) => {
//     try {
//       await axios.delete(`${API}/folders/${folderId}`);
      
//       const remainingFolders = folders.filter(function(folder) {
//         return folder.id !== folderId;
//       });
//       setFolders(remainingFolders);
      
//       if (activeFolder !== null && activeFolder.id === folderId) {
//         setActiveFolder(null);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Add a new problem to current folder
//   const addProblem = async () => {
//     if (activeFolder === null) {
//       alert("Please select a folder first");
//       return;
//     }
    
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       const newProblemsList = [...problems, res.data];
//       setProblems(newProblemsList);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete a problem
//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
      
//       const remainingProblems = problems.filter(function(problem) {
//         return problem.id !== problemId;
//       });
//       setProblems(remainingProblems);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Update problem
//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Get problems that belong to the selected folder
//   let folderProblems = [];
  
//   if (activeFolder !== null) {
//     folderProblems = problems.filter(function(problem) {
//       return problem.folderId === activeFolder.id;
//     });
//   }
  
//   // Apply search filter
//   let filteredProblems = [];
  
//   for (let i = 0; i < folderProblems.length; i++) {
//     const problem = folderProblems[i];
    
//     let matchesSearch = true;
//     if (search !== "") {
//       const lowerCaseName = problem.questionName.toLowerCase();
//       const lowerCaseSearch = search.toLowerCase();
//       if (lowerCaseName.includes(lowerCaseSearch) === false) {
//         matchesSearch = false;
//       }
//     }
    
//     let matchesDifficulty = true;
//     if (filterDiff !== "All") {
//       if (problem.difficulty !== filterDiff) {
//         matchesDifficulty = false;
//       }
//     }
    
//     if (matchesSearch === true && matchesDifficulty === true) {
//       filteredProblems.push(problem);
//     }
//   }

//   function getBadgeClass(difficulty) {
//     if (difficulty === "Easy") {
//       return "bg-success";
//     } else if (difficulty === "Medium") {
//       return "bg-warning text-dark";
//     } else {
//       return "bg-danger";
//     }
//   }

//   // Show Landing Page
//   if (page === "landing") {
//     return <LandingPage onGetStarted={handleGetStarted} />;
//   }

//   // Show Login Page
//   if (page === "login") {
//     return <LoginPage onLogin={handleLogin} />;
//   }

//   // Show Main App
//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       {/* Logout Button */}
//       <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
//         <button className="btn btn-outline-danger" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       <div className="container-fluid">
//         <div className="row">
          
//           {/* ========== SIDEBAR ========== */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>
            
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => {
//                   if (e.key === "Enter") {
//                     createFolder();
//                   }
//                 }}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>
            
//             <hr style={{ background: "#333" }} />
            
//             <h6 className="text-secondary mb-2">FOLDERS</h6>
            
//             {folders.map(function(folder) {
//               let isSelected = false;
//               if (activeFolder !== null && activeFolder.id === folder.id) {
//                 isSelected = true;
//               }
              
//               let backgroundColor = "transparent";
//               if (isSelected === true) {
//                 backgroundColor = "#0d6efd";
//               }
              
//               return (
//                 <div
//                   key={folder.id}
//                   onClick={() => setActiveFolder(folder)}
//                   className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                   style={{
//                     background: backgroundColor,
//                     cursor: "pointer"
//                   }}
//                 >
//                   <span>📁 {folder.name}</span>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       deleteFolder(folder.id);
//                     }}
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
          
//           {/* ========== MAIN CONTENT ========== */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {activeFolder === null ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>
                
//                 {/* Search & Filter */}
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       <button
//                         className={`btn ${filterDiff === "All" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("All")}
//                       >
//                         All
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Easy" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Easy")}
//                       >
//                         Easy
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Medium" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Medium")}
//                       >
//                         Medium
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Hard" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Hard")}
//                       >
//                         Hard
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* TABLE */}
//                 <div className="table-responsive">
//                   <table className="table table-dark table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th style={{ minWidth: "200px" }}>Question Name</th>
//                         <th style={{ minWidth: "200px" }}>Description</th>
//                         <th style={{ minWidth: "150px" }}>Link</th>
//                         <th>Difficulty</th>
//                         <th style={{ minWidth: "200px" }}>Note</th>
//                         <th>Solved</th>
//                         <th>Revise</th>
//                         <th style={{ minWidth: "250px" }}>Code</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map(function(problem, index) {
//                         let rowBackground = "transparent";
//                         if (problem.solved === true) {
//                           rowBackground = "#1a3a1a";
//                         }
                        
//                         return (
//                           <tr key={problem.id} style={{ background: rowBackground }}>
//                             <td className="text-secondary">{index + 1}</td>
                            
//                             {/* Question Name */}
//                             <td>
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 value={problem.questionName}
//                                 onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               />
//                             </td>
                            
//                             {/* Description */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="2"
//                                 value={problem.description || ""}
//                                 onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
//                                 placeholder="Description..."
//                                 style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                               />
//                             </td>
                            
//                             {/* Link */}
//                             <td>
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm mb-1"
//                                 value={problem.link || ""}
//                                 onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
//                                 placeholder="https://..."
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               />
//                               {problem.link !== "" && (
//                                 <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">
//                                   Open
//                                 </a>
//                               )}
//                             </td>
                            
//                             {/* Difficulty */}
//                             <td>
//                               <select
//                                 className="form-select form-select-sm mb-1"
//                                 value={problem.difficulty}
//                                 onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               >
//                                 <option>Easy</option>
//                                 <option>Medium</option>
//                                 <option>Hard</option>
//                               </select>
//                               <span className={`badge ${getBadgeClass(problem.difficulty)} w-100`}>
//                                 {problem.difficulty}
//                               </span>
//                             </td>
                            
//                             {/* Note */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="2"
//                                 value={problem.note || ""}
//                                 onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
//                                 placeholder="Your notes..."
//                                 style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                               />
//                             </td>
                            
//                             {/* Solved Checkbox */}
//                             <td className="text-center">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 style={{ width: "20px", height: "20px" }}
//                                 checked={problem.solved}
//                                 onChange={() => updateProblem(problem.id, { solved: !problem.solved })}
//                               />
//                             </td>
                            
//                             {/* Revise Star */}
//                             <td className="text-center">
//                               <button
//                                 className="btn btn-sm"
//                                 onClick={() => updateProblem(problem.id, { revise: !problem.revise })}
//                                 style={{ fontSize: "24px", background: "none", border: "none" }}
//                               >
//                                 {problem.revise === true ? "⭐" : "☆"}
//                               </button>
//                             </td>
                            
//                             {/* Code Snippet */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="3"
//                                 value={problem.codeSnippet || ""}
//                                 onChange={(e) => updateProblem(problem.id, { codeSnippet: e.target.value })}
//                                 placeholder="// Your code here..."
//                                 style={{ background: "#1a1a2a", color: "#86efac", border: "none", resize: "vertical", fontFamily: "monospace" }}
//                               />
//                             </td>
                            
//                             {/* Delete Button */}
//                             <td>
//                               <button
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() => deleteProblem(problem.id)}
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
                      
//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="10" className="text-center py-5 text-secondary">
//                             No problems. Click "Add Problem" to start!
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Stats */}
//                 <div className="mt-3 text-secondary">
//                   Total: {folderProblems.length} | 
//                   Solved: {
//                     (function() {
//                       let count = 0;
//                       for (let i = 0; i < folderProblems.length; i++) {
//                         if (folderProblems[i].solved === true) {
//                           count++;
//                         }
//                       }
//                       return count;
//                     })()
//                   } | 
//                   Revise: {
//                     (function() {
//                       let count = 0;
//                       for (let i = 0; i < folderProblems.length; i++) {
//                         if (folderProblems[i].revise === true) {
//                           count++;
//                         }
//                       }
//                       return count;
//                     })()
//                   }
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";

// const API = "http://localhost:8080/api";

// export default function App() {
//   // Page state
//   const [page, setPage] = useState("landing");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//   // Data state
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   // Check if already logged in when app starts
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token found:", token ? "Yes" : "No");
    
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       setIsAuthenticated(true);
//       setPage("app");
//       loadData();
//     }
//   }, []);

//   const loadData = async () => {
//     try {
//       console.log("Loading folders and problems...");
//       const foldersRes = await axios.get(`${API}/folders`);
//       const problemsRes = await axios.get(`${API}/problems`);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//       console.log("Data loaded:", foldersRes.data.length, "folders,", problemsRes.data.length, "problems");
//     } catch (err) {
//       console.log("Error loading data:", err);
//       if (err.response && err.response.status === 401) {
//         handleLogout();
//       }
//     }
//   };

//   // Navigation functions
//   const handleGetStarted = () => {
//     console.log("Get Started clicked - going to login page");
//     setPage("login");
//   };

//   const handleLogin = () => {
//     console.log("Login successful - going to main app");
//     setIsAuthenticated(true);
//     setPage("app");
//     loadData();
//   };

//   const handleLogout = () => {
//     console.log("Logout - going to landing page");
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     delete axios.defaults.headers.common["Authorization"];
//     setIsAuthenticated(false);
//     setPage("landing");
//     setFolders([]);
//     setProblems([]);
//     setActiveFolder(null);
//   };

//   // Create a new folder
//   const createFolder = async () => {
//     if (newFolderName === "") {
//       return;
//     }
    
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       const newFoldersList = [...folders, res.data];
//       setFolders(newFoldersList);
//       setNewFolderName("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete a folder
//   const deleteFolder = async (folderId) => {
//     try {
//       await axios.delete(`${API}/folders/${folderId}`);
      
//       const remainingFolders = folders.filter(function(folder) {
//         return folder.id !== folderId;
//       });
//       setFolders(remainingFolders);
      
//       if (activeFolder !== null && activeFolder.id === folderId) {
//         setActiveFolder(null);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Add a new problem to current folder
//   const addProblem = async () => {
//     if (activeFolder === null) {
//       alert("Please select a folder first");
//       return;
//     }
    
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       const newProblemsList = [...problems, res.data];
//       setProblems(newProblemsList);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete a problem
//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
      
//       const remainingProblems = problems.filter(function(problem) {
//         return problem.id !== problemId;
//       });
//       setProblems(remainingProblems);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Update problem
//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Get problems that belong to the selected folder
//   let folderProblems = [];
  
//   if (activeFolder !== null) {
//     folderProblems = problems.filter(function(problem) {
//       return problem.folderId === activeFolder.id;
//     });
//   }
  
//   // Apply search filter
//   let filteredProblems = [];
  
//   for (let i = 0; i < folderProblems.length; i++) {
//     const problem = folderProblems[i];
    
//     let matchesSearch = true;
//     if (search !== "") {
//       const lowerCaseName = problem.questionName.toLowerCase();
//       const lowerCaseSearch = search.toLowerCase();
//       if (lowerCaseName.includes(lowerCaseSearch) === false) {
//         matchesSearch = false;
//       }
//     }
    
//     let matchesDifficulty = true;
//     if (filterDiff !== "All") {
//       if (problem.difficulty !== filterDiff) {
//         matchesDifficulty = false;
//       }
//     }
    
//     if (matchesSearch === true && matchesDifficulty === true) {
//       filteredProblems.push(problem);
//     }
//   }

//   function getBadgeClass(difficulty) {
//     if (difficulty === "Easy") {
//       return "bg-success";
//     } else if (difficulty === "Medium") {
//       return "bg-warning text-dark";
//     } else {
//       return "bg-danger";
//     }
//   }

//   // Show Landing Page
//   if (page === "landing") {
//     return <LandingPage onGetStarted={handleGetStarted} />;
//   }

//   // Show Login Page
//   if (page === "login") {
//     return <LoginPage onLogin={handleLogin} />;
//   }

//   // Show Main App
//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       {/* Logout Button */}
//       <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
//         <button className="btn btn-outline-danger" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       <div className="container-fluid">
//         <div className="row">
          
//           {/* ========== SIDEBAR ========== */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>
            
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => {
//                   if (e.key === "Enter") {
//                     createFolder();
//                   }
//                 }}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>
            
//             <hr style={{ background: "#333" }} />
            
//             <h6 className="text-secondary mb-2">FOLDERS</h6>
            
//             {folders.map(function(folder) {
//               let isSelected = false;
//               if (activeFolder !== null && activeFolder.id === folder.id) {
//                 isSelected = true;
//               }
              
//               let backgroundColor = "transparent";
//               if (isSelected === true) {
//                 backgroundColor = "#0d6efd";
//               }
              
//               return (
//                 <div
//                   key={folder.id}
//                   onClick={() => setActiveFolder(folder)}
//                   className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                   style={{
//                     background: backgroundColor,
//                     cursor: "pointer"
//                   }}
//                 >
//                   <span>📁 {folder.name}</span>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       deleteFolder(folder.id);
//                     }}
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
          
//           {/* ========== MAIN CONTENT ========== */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {activeFolder === null ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>
                
//                 {/* Search & Filter */}
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       <button
//                         className={`btn ${filterDiff === "All" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("All")}
//                       >
//                         All
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Easy" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Easy")}
//                       >
//                         Easy
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Medium" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Medium")}
//                       >
//                         Medium
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Hard" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Hard")}
//                       >
//                         Hard
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* TABLE */}
//                 <div className="table-responsive">
//                   <table className="table table-dark table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th style={{ minWidth: "200px" }}>Question Name</th>
//                         <th style={{ minWidth: "200px" }}>Description</th>
//                         <th style={{ minWidth: "150px" }}>Link</th>
//                         <th>Difficulty</th>
//                         <th style={{ minWidth: "200px" }}>Note</th>
//                         <th>Solved</th>
//                         <th>Revise</th>
//                         <th style={{ minWidth: "250px" }}>Code</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map(function(problem, index) {
//                         let rowBackground = "transparent";
//                         if (problem.solved === true) {
//                           rowBackground = "#1a3a1a";
//                         }
                        
//                         return (
//                           <tr key={problem.id} style={{ background: rowBackground }}>
//                             <td className="text-secondary">{index + 1}</td>
                            
//                             {/* Question Name */}
//                             <td>
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 value={problem.questionName}
//                                 onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               />
//                             </td>
                            
//                             {/* Description */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="2"
//                                 value={problem.description || ""}
//                                 onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
//                                 placeholder="Description..."
//                                 style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                               />
//                             </td>
                            
//                             {/* Link */}
//                             <td>
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm mb-1"
//                                 value={problem.link || ""}
//                                 onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
//                                 placeholder="https://..."
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               />
//                               {problem.link !== "" && (
//                                 <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">
//                                   Open
//                                 </a>
//                               )}
//                             </td>
                            
//                             {/* Difficulty */}
//                             <td>
//                               <select
//                                 className="form-select form-select-sm mb-1"
//                                 value={problem.difficulty}
//                                 onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               >
//                                 <option>Easy</option>
//                                 <option>Medium</option>
//                                 <option>Hard</option>
//                               </select>
//                               <span className={`badge ${getBadgeClass(problem.difficulty)} w-100`}>
//                                 {problem.difficulty}
//                               </span>
//                             </td>
                            
//                             {/* Note */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="2"
//                                 value={problem.note || ""}
//                                 onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
//                                 placeholder="Your notes..."
//                                 style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                               />
//                             </td>
                            
//                             {/* Solved Checkbox */}
//                             <td className="text-center">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 style={{ width: "20px", height: "20px" }}
//                                 checked={problem.solved}
//                                 onChange={() => updateProblem(problem.id, { solved: !problem.solved })}
//                               />
//                             </td>
                            
//                             {/* Revise Star */}
//                             <td className="text-center">
//                               <button
//                                 className="btn btn-sm"
//                                 onClick={() => updateProblem(problem.id, { revise: !problem.revise })}
//                                 style={{ fontSize: "24px", background: "none", border: "none" }}
//                               >
//                                 {problem.revise === true ? "⭐" : "☆"}
//                               </button>
//                             </td>
                            
//                             {/* Code Snippet */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="3"
//                                 value={problem.codeSnippet || ""}
//                                 onChange={(e) => updateProblem(problem.id, { codeSnippet: e.target.value })}
//                                 placeholder="// Your code here..."
//                                 style={{ background: "#1a1a2a", color: "#86efac", border: "none", resize: "vertical", fontFamily: "monospace" }}
//                               />
//                             </td>
                            
//                             {/* Delete Button */}
//                             <td>
//                               <button
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() => deleteProblem(problem.id)}
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
                      
//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="10" className="text-center py-5 text-secondary">
//                             No problems. Click "Add Problem" to start!
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Stats */}
//                 <div className="mt-3 text-secondary">
//                   Total: {folderProblems.length} | 
//                   Solved: {
//                     (function() {
//                       let count = 0;
//                       for (let i = 0; i < folderProblems.length; i++) {
//                         if (folderProblems[i].solved === true) {
//                           count++;
//                         }
//                       }
//                       return count;
//                     })()
//                   } | 
//                   Revise: {
//                     (function() {
//                       let count = 0;
//                       for (let i = 0; i < folderProblems.length; i++) {
//                         if (folderProblems[i].revise === true) {
//                           count++;
//                         }
//                       }
//                       return count;
//                     })()
//                   }
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";

// const API = "http://localhost:8080/api";

// export default function App() {
//   // Page state
//   const [page, setPage] = useState("landing");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//   // Data state
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   // Check if already logged in when app starts
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token found on startup:", token ? "Yes" : "No");
    
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       setIsAuthenticated(true);
//       setPage("app");
//       loadData();
//     }
//   }, []);

//   const loadData = async () => {
//     try {
//       console.log("Loading folders and problems...");
//       const foldersRes = await axios.get(`${API}/folders`);
//       const problemsRes = await axios.get(`${API}/problems`);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//       console.log("Data loaded:", foldersRes.data.length, "folders,", problemsRes.data.length, "problems");
//     } catch (err) {
//       console.log("Error loading data:", err);
//       if (err.response && err.response.status === 401) {
//         handleLogout();
//       }
//     }
//   };

//   // Navigation functions
//   const handleGetStarted = () => {
//     console.log("Get Started clicked - going to login page");
//     setPage("login");
//   };

//   const handleLogin = () => {
//     console.log("Login successful - going to main app");
//     setIsAuthenticated(true);
//     setPage("app");
//     loadData();
//   };

//   const handleLogout = async () => {
//     console.log("Logging out...");
    
//     // Clear Clerk session
//     try {
//       if (window.Clerk) {
//         await window.Clerk.signOut();
//       }
//     } catch (err) {
//       console.log("Clerk signout error:", err);
//     }
    
//     // Clear localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
    
//     // Clear axios headers
//     delete axios.defaults.headers.common["Authorization"];
    
//     // Clear all state
//     setIsAuthenticated(false);
//     setFolders([]);
//     setProblems([]);
//     setActiveFolder(null);
//     setNewFolderName("");
//     setSearch("");
//     setFilterDiff("All");
    
//     // Go to landing page
//     setPage("landing");
//   };

//   // Create a new folder
//   const createFolder = async () => {
//     if (newFolderName === "") {
//       return;
//     }
    
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       const newFoldersList = [...folders, res.data];
//       setFolders(newFoldersList);
//       setNewFolderName("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete a folder
//   const deleteFolder = async (folderId) => {
//     try {
//       await axios.delete(`${API}/folders/${folderId}`);
      
//       const remainingFolders = folders.filter(function(folder) {
//         return folder.id !== folderId;
//       });
//       setFolders(remainingFolders);
      
//       if (activeFolder !== null && activeFolder.id === folderId) {
//         setActiveFolder(null);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Add a new problem to current folder
//   const addProblem = async () => {
//     if (activeFolder === null) {
//       alert("Please select a folder first");
//       return;
//     }
    
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id
//     };
    
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       const newProblemsList = [...problems, res.data];
//       setProblems(newProblemsList);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Delete a problem
//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
      
//       const remainingProblems = problems.filter(function(problem) {
//         return problem.id !== problemId;
//       });
//       setProblems(remainingProblems);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Update problem
//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Get problems that belong to the selected folder
//   let folderProblems = [];
  
//   if (activeFolder !== null) {
//     folderProblems = problems.filter(function(problem) {
//       return problem.folderId === activeFolder.id;
//     });
//   }
  
//   // Apply search filter
//   let filteredProblems = [];
  
//   for (let i = 0; i < folderProblems.length; i++) {
//     const problem = folderProblems[i];
    
//     let matchesSearch = true;
//     if (search !== "") {
//       const lowerCaseName = problem.questionName.toLowerCase();
//       const lowerCaseSearch = search.toLowerCase();
//       if (lowerCaseName.includes(lowerCaseSearch) === false) {
//         matchesSearch = false;
//       }
//     }
    
//     let matchesDifficulty = true;
//     if (filterDiff !== "All") {
//       if (problem.difficulty !== filterDiff) {
//         matchesDifficulty = false;
//       }
//     }
    
//     if (matchesSearch === true && matchesDifficulty === true) {
//       filteredProblems.push(problem);
//     }
//   }

//   function getBadgeClass(difficulty) {
//     if (difficulty === "Easy") {
//       return "bg-success";
//     } else if (difficulty === "Medium") {
//       return "bg-warning text-dark";
//     } else {
//       return "bg-danger";
//     }
//   }

//   // Show Landing Page
//   if (page === "landing") {
//     return <LandingPage onGetStarted={handleGetStarted} />;
//   }

//   // Show Login Page
//   if (page === "login") {
//     return <LoginPage onLogin={handleLogin} />;
//   }

//   // Show Main App
//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       {/* Logout Button */}
//       <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
//         <button className="btn btn-outline-danger" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       <div className="container-fluid">
//         <div className="row">
          
//           {/* ========== SIDEBAR ========== */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>
            
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => {
//                   if (e.key === "Enter") {
//                     createFolder();
//                   }
//                 }}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>
            
//             <hr style={{ background: "#333" }} />
            
//             <h6 className="text-secondary mb-2">FOLDERS</h6>
            
//             {folders.map(function(folder) {
//               let isSelected = false;
//               if (activeFolder !== null && activeFolder.id === folder.id) {
//                 isSelected = true;
//               }
              
//               let backgroundColor = "transparent";
//               if (isSelected === true) {
//                 backgroundColor = "#0d6efd";
//               }
              
//               return (
//                 <div
//                   key={folder.id}
//                   onClick={() => setActiveFolder(folder)}
//                   className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                   style={{
//                     background: backgroundColor,
//                     cursor: "pointer"
//                   }}
//                 >
//                   <span>📁 {folder.name}</span>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       deleteFolder(folder.id);
//                     }}
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
          
//           {/* ========== MAIN CONTENT ========== */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {activeFolder === null ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>
                
//                 {/* Search & Filter */}
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       <button
//                         className={`btn ${filterDiff === "All" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("All")}
//                       >
//                         All
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Easy" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Easy")}
//                       >
//                         Easy
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Medium" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Medium")}
//                       >
//                         Medium
//                       </button>
//                       <button
//                         className={`btn ${filterDiff === "Hard" ? "btn-primary" : "btn-secondary"}`}
//                         onClick={() => setFilterDiff("Hard")}
//                       >
//                         Hard
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* TABLE */}
//                 <div className="table-responsive">
//                   <table className="table table-dark table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th style={{ minWidth: "200px" }}>Question Name</th>
//                         <th style={{ minWidth: "200px" }}>Description</th>
//                         <th style={{ minWidth: "150px" }}>Link</th>
//                         <th>Difficulty</th>
//                         <th style={{ minWidth: "200px" }}>Note</th>
//                         <th>Solved</th>
//                         <th>Revise</th>
//                         <th style={{ minWidth: "250px" }}>Code</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map(function(problem, index) {
//                         let rowBackground = "transparent";
//                         if (problem.solved === true) {
//                           rowBackground = "#1a3a1a";
//                         }
                        
//                         return (
//                           <tr key={problem.id} style={{ background: rowBackground }}>
//                             <td className="text-secondary">{index + 1}</td>
                            
//                             {/* Question Name */}
//                             <td>
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 value={problem.questionName}
//                                 onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               />
//                             </td>
                            
//                             {/* Description */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="2"
//                                 value={problem.description || ""}
//                                 onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
//                                 placeholder="Description..."
//                                 style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                               />
//                             </td>
                            
//                             {/* Link */}
//                             <td>
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm mb-1"
//                                 value={problem.link || ""}
//                                 onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
//                                 placeholder="https://..."
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               />
//                               {problem.link !== "" && (
//                                 <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">
//                                   Open
//                                 </a>
//                               )}
//                             </td>
                            
//                             {/* Difficulty */}
//                             <td>
//                               <select
//                                 className="form-select form-select-sm mb-1"
//                                 value={problem.difficulty}
//                                 onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//                                 style={{ background: "#222", color: "white", border: "none" }}
//                               >
//                                 <option>Easy</option>
//                                 <option>Medium</option>
//                                 <option>Hard</option>
//                               </select>
//                               <span className={`badge ${getBadgeClass(problem.difficulty)} w-100`}>
//                                 {problem.difficulty}
//                               </span>
//                             </td>
                            
//                             {/* Note */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="2"
//                                 value={problem.note || ""}
//                                 onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
//                                 placeholder="Your notes..."
//                                 style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                               />
//                             </td>
                            
//                             {/* Solved Checkbox */}
//                             <td className="text-center">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 style={{ width: "20px", height: "20px" }}
//                                 checked={problem.solved}
//                                 onChange={() => updateProblem(problem.id, { solved: !problem.solved })}
//                               />
//                             </td>
                            
//                             {/* Revise Star */}
//                             <td className="text-center">
//                               <button
//                                 className="btn btn-sm"
//                                 onClick={() => updateProblem(problem.id, { revise: !problem.revise })}
//                                 style={{ fontSize: "24px", background: "none", border: "none" }}
//                               >
//                                 {problem.revise === true ? "⭐" : "☆"}
//                               </button>
//                             </td>
                            
//                             {/* Code Snippet */}
//                             <td>
//                               <textarea
//                                 className="form-control form-control-sm"
//                                 rows="3"
//                                 value={problem.codeSnippet || ""}
//                                 onChange={(e) => updateProblem(problem.id, { codeSnippet: e.target.value })}
//                                 placeholder="// Your code here..."
//                                 style={{ background: "#1a1a2a", color: "#86efac", border: "none", resize: "vertical", fontFamily: "monospace" }}
//                               />
//                             </td>
                            
//                             {/* Delete Button */}
//                             <td>
//                               <button
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() => deleteProblem(problem.id)}
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
                      
//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="10" className="text-center py-5 text-secondary">
//                             No problems. Click "Add Problem" to start!
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Stats */}
//                 <div className="mt-3 text-secondary">
//                   Total: {folderProblems.length} | 
//                   Solved: {
//                     (function() {
//                       let count = 0;
//                       for (let i = 0; i < folderProblems.length; i++) {
//                         if (folderProblems[i].solved === true) {
//                           count++;
//                         }
//                       }
//                       return count;
//                     })()
//                   } | 
//                   Revise: {
//                     (function() {
//                       let count = 0;
//                       for (let i = 0; i < folderProblems.length; i++) {
//                         if (folderProblems[i].revise === true) {
//                           count++;
//                         }
//                       }
//                       return count;
//                     })()
//                   }
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";

// const API = "http://localhost:8080/api";

// export default function App() {
//   const [page, setPage] = useState("landing");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const refreshAndLoad = async () => {
//       try {
//         await window.Clerk?.load();
//         const session = window.Clerk?.session;

//         if (!session) {
//           handleLogout();
//           return;
//         }

//         const freshToken = await session.getToken();
//         if (!freshToken) {
//           handleLogout();
//           return;
//         }

//         localStorage.setItem("token", freshToken);
//         axios.defaults.headers.common["Authorization"] = `Bearer ${freshToken}`;
//         setIsAuthenticated(true);
//         setPage("app");
//         loadData();
//       } catch (err) {
//         console.log("Session refresh failed:", err);
//         handleLogout();
//       }
//     };

//     refreshAndLoad();
//   }, []);

//   const loadData = async () => {
//     try {
//       const foldersRes = await axios.get(`${API}/folders`);
//       const problemsRes = await axios.get(`${API}/problems`);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.log("Error loading data:", err);
//       if (err.response && err.response.status === 401) {
//         handleLogout();
//       }
//     }
//   };

//   const handleGetStarted = () => {
//     setPage("login");
//   };

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//     setPage("app");
//     loadData();
//   };

//   const handleLogout = async () => {
//     try {
//       if (window.Clerk) {
//         await window.Clerk.signOut();
//       }
//     } catch (err) {
//       console.log("Clerk signout error:", err);
//     }

//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     delete axios.defaults.headers.common["Authorization"];

//     setIsAuthenticated(false);
//     setFolders([]);
//     setProblems([]);
//     setActiveFolder(null);
//     setNewFolderName("");
//     setSearch("");
//     setFilterDiff("All");
//     setPage("landing");
//   };

//   const createFolder = async () => {
//     if (newFolderName === "") return;
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       setFolders([...folders, res.data]);
//       setNewFolderName("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteFolder = async (folderId) => {
//     try {
//       await axios.delete(`${API}/folders/${folderId}`);
//       setFolders(folders.filter(f => f.id !== folderId));
//       if (activeFolder !== null && activeFolder.id === folderId) {
//         setActiveFolder(null);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const addProblem = async () => {
//     if (activeFolder === null) {
//       alert("Please select a folder first");
//       return;
//     }
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id
//     };
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       setProblems([...problems, res.data]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
//       setProblems(problems.filter(p => p.id !== problemId));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const folderProblems = activeFolder
//     ? problems.filter(p => p.folderId === activeFolder.id)
//     : [];

//   const filteredProblems = folderProblems.filter(p => {
//     const matchesSearch = search === "" || p.questionName.toLowerCase().includes(search.toLowerCase());
//     const matchesDiff = filterDiff === "All" || p.difficulty === filterDiff;
//     return matchesSearch && matchesDiff;
//   });

//   function getBadgeClass(difficulty) {
//     if (difficulty === "Easy") return "bg-success";
//     if (difficulty === "Medium") return "bg-warning text-dark";
//     return "bg-danger";
//   }

//   if (page === "landing") return <LandingPage onGetStarted={handleGetStarted} />;
//   if (page === "login") return <LoginPage onLogin={handleLogin} />;

//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
//         <button className="btn btn-outline-danger" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       <div className="container-fluid">
//         <div className="row">

//           {/* SIDEBAR */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>

//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => { if (e.key === "Enter") createFolder(); }}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>
//                 + Create Folder
//               </button>
//             </div>

//             <hr style={{ background: "#333" }} />
//             <h6 className="text-secondary mb-2">FOLDERS</h6>

//             {folders.map(folder => (
//               <div
//                 key={folder.id}
//                 onClick={() => setActiveFolder(folder)}
//                 className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                 style={{
//                   background: activeFolder?.id === folder.id ? "#0d6efd" : "transparent",
//                   cursor: "pointer"
//                 }}
//               >
//                 <span>📁 {folder.name}</span>
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}
//                 >
//                   🗑️
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* MAIN CONTENT */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {activeFolder === null ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>
//                     + Add Problem
//                   </button>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       {["All", "Easy", "Medium", "Hard"].map(d => (
//                         <button
//                           key={d}
//                           className={`btn ${filterDiff === d ? "btn-primary" : "btn-secondary"}`}
//                           onClick={() => setFilterDiff(d)}
//                         >
//                           {d}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="table-responsive">
//                   <table className="table table-dark table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th style={{ minWidth: "200px" }}>Question Name</th>
//                         <th style={{ minWidth: "200px" }}>Description</th>
//                         <th style={{ minWidth: "150px" }}>Link</th>
//                         <th>Difficulty</th>
//                         <th style={{ minWidth: "200px" }}>Note</th>
//                         <th>Solved</th>
//                         <th>Revise</th>
//                         <th style={{ minWidth: "250px" }}>Code</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map((problem, index) => (
//                         <tr key={problem.id} style={{ background: problem.solved ? "#1a3a1a" : "transparent" }}>
//                           <td className="text-secondary">{index + 1}</td>

//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               value={problem.questionName}
//                               onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                           </td>

//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               rows="2"
//                               value={problem.description || ""}
//                               onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
//                               placeholder="Description..."
//                               style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                             />
//                           </td>

//                           <td>
//                             <input
//                               type="text"
//                               className="form-control form-control-sm mb-1"
//                               value={problem.link || ""}
//                               onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
//                               placeholder="https://..."
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             />
//                             {problem.link && (
//                               <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">
//                                 Open
//                               </a>
//                             )}
//                           </td>

//                           <td>
//                             <select
//                               className="form-select form-select-sm mb-1"
//                               value={problem.difficulty}
//                               onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none" }}
//                             >
//                               <option>Easy</option>
//                               <option>Medium</option>
//                               <option>Hard</option>
//                             </select>
//                             <span className={`badge ${getBadgeClass(problem.difficulty)} w-100`}>
//                               {problem.difficulty}
//                             </span>
//                           </td>

//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               rows="2"
//                               value={problem.note || ""}
//                               onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
//                               placeholder="Your notes..."
//                               style={{ background: "#222", color: "white", border: "none", resize: "vertical" }}
//                             />
//                           </td>

//                           <td className="text-center">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               style={{ width: "20px", height: "20px" }}
//                               checked={problem.solved}
//                               onChange={() => updateProblem(problem.id, { solved: !problem.solved })}
//                             />
//                           </td>

//                           <td className="text-center">
//                             <button
//                               className="btn btn-sm"
//                               onClick={() => updateProblem(problem.id, { revise: !problem.revise })}
//                               style={{ fontSize: "24px", background: "none", border: "none" }}
//                             >
//                               {problem.revise ? "⭐" : "☆"}
//                             </button>
//                           </td>

//                           <td>
//                             <textarea
//                               className="form-control form-control-sm"
//                               rows="3"
//                               value={problem.codeSnippet || ""}
//                               onChange={(e) => updateProblem(problem.id, { codeSnippet: e.target.value })}
//                               placeholder="// Your code here..."
//                               style={{ background: "#1a1a2a", color: "#86efac", border: "none", resize: "vertical", fontFamily: "monospace" }}
//                             />
//                           </td>

//                           <td>
//                             <button
//                               className="btn btn-sm btn-outline-danger"
//                               onClick={() => deleteProblem(problem.id)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}

//                       {filteredProblems.length === 0 && (
//                         <tr>
//                           <td colSpan="10" className="text-center py-5 text-secondary">
//                             No problems. Click "Add Problem" to start!
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mt-3 text-secondary">
//                   Total: {folderProblems.length} |&nbsp;
//                   Solved: {folderProblems.filter(p => p.solved).length} |&nbsp;
//                   Revise: {folderProblems.filter(p => p.revise).length}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useUser, useClerk } from "@clerk/clerk-react";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";

// const API = "http://localhost:8080/api";

// export default function App() {
//   const { isSignedIn, isLoaded, session } = useUser();
//   const { signOut } = useClerk();

//   const [page, setPage] = useState("landing");
//   const [folders, setFolders] = useState([]);
//   const [activeFolder, setActiveFolder] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterDiff, setFilterDiff] = useState("All");

//   useEffect(() => {
//     if (!isLoaded) return;

//     if (isSignedIn && session) {
//       // User is signed in — set token and go to app
//       const init = async () => {
//         try {
//           const token = await session.getToken();
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//           setPage("app");
//           loadData();
//         } catch (err) {
//           console.log("Token error:", err);
//         }
//       };
//       init();
//     }
//     // Do NOT redirect to landing here — let the user navigate freely
//   }, [isLoaded, isSignedIn, session]);

//   const loadData = async () => {
//     try {
//       const foldersRes = await axios.get(`${API}/folders`);
//       const problemsRes = await axios.get(`${API}/problems`);
//       setFolders(foldersRes.data);
//       setProblems(problemsRes.data);
//     } catch (err) {
//       console.log("Error loading data:", err);
//     }
//   };

//   const handleLogout = async () => {
//     await signOut();
//     delete axios.defaults.headers.common["Authorization"];
//     setFolders([]);
//     setProblems([]);
//     setActiveFolder(null);
//     setNewFolderName("");
//     setSearch("");
//     setFilterDiff("All");
//     setPage("landing"); // Only place we go back to landing
//   };

//   const createFolder = async () => {
//     if (newFolderName === "") return;
//     try {
//       const res = await axios.post(`${API}/folders`, { name: newFolderName });
//       setFolders([...folders, res.data]);
//       setNewFolderName("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteFolder = async (folderId) => {
//     try {
//       await axios.delete(`${API}/folders/${folderId}`);
//       setFolders(folders.filter(f => f.id !== folderId));
//       if (activeFolder?.id === folderId) setActiveFolder(null);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const addProblem = async () => {
//     if (!activeFolder) { alert("Please select a folder first"); return; }
//     const newProblem = {
//       questionName: "New Problem",
//       description: "",
//       link: "",
//       difficulty: "Easy",
//       note: "",
//       solved: false,
//       revise: false,
//       codeSnippet: "",
//       folderId: activeFolder.id
//     };
//     try {
//       const res = await axios.post(`${API}/problems`, newProblem);
//       setProblems([...problems, res.data]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteProblem = async (problemId) => {
//     try {
//       await axios.delete(`${API}/problems/${problemId}`);
//       setProblems(problems.filter(p => p.id !== problemId));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateProblem = async (id, updates) => {
//     const problem = problems.find(p => p.id === id);
//     const updated = { ...problem, ...updates };
//     try {
//       const res = await axios.put(`${API}/problems/${id}`, updated);
//       setProblems(problems.map(p => p.id === id ? res.data : p));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const folderProblems = activeFolder ? problems.filter(p => p.folderId === activeFolder.id) : [];
//   const filteredProblems = folderProblems.filter(p => {
//     const matchesSearch = search === "" || p.questionName.toLowerCase().includes(search.toLowerCase());
//     const matchesDiff = filterDiff === "All" || p.difficulty === filterDiff;
//     return matchesSearch && matchesDiff;
//   });

//   function getBadgeClass(difficulty) {
//     if (difficulty === "Easy") return "bg-success";
//     if (difficulty === "Medium") return "bg-warning text-dark";
//     return "bg-danger";
//   }

//   if (!isLoaded) {
//     return (
//       <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <p style={{ color: "white" }}>Loading...</p>
//       </div>
//     );
//   }

//   if (page === "landing") return <LandingPage onGetStarted={() => setPage("login")} />;
//   if (page === "login") return <LoginPage />;

//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
//       <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
//         <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
//       </div>

//       <div className="container-fluid">
//         <div className="row">

//           {/* SIDEBAR */}
//           <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
//             <h3 className="mb-4 text-primary">📚 SolveStack</h3>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Folder name"
//                 value={newFolderName}
//                 onChange={(e) => setNewFolderName(e.target.value)}
//                 onKeyPress={(e) => { if (e.key === "Enter") createFolder(); }}
//                 style={{ background: "#222", color: "white", border: "none" }}
//               />
//               <button className="btn btn-primary w-100" onClick={createFolder}>+ Create Folder</button>
//             </div>
//             <hr style={{ background: "#333" }} />
//             <h6 className="text-secondary mb-2">FOLDERS</h6>
//             {folders.map(folder => (
//               <div
//                 key={folder.id}
//                 onClick={() => setActiveFolder(folder)}
//                 className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
//                 style={{ background: activeFolder?.id === folder.id ? "#0d6efd" : "transparent", cursor: "pointer" }}
//               >
//                 <span>📁 {folder.name}</span>
//                 <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}>🗑️</button>
//               </div>
//             ))}
//           </div>

//           {/* MAIN CONTENT */}
//           <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
//             {!activeFolder ? (
//               <div className="text-center mt-5">
//                 <h2>📁 Select a Folder</h2>
//                 <p className="text-secondary">Choose a folder from the sidebar</p>
//               </div>
//             ) : (
//               <>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2>📁 {activeFolder.name}</h2>
//                   <button className="btn btn-primary" onClick={addProblem}>+ Add Problem</button>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="🔍 Search problems..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       style={{ background: "#222", color: "white", border: "none" }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="btn-group">
//                       {["All", "Easy", "Medium", "Hard"].map(d => (
//                         <button key={d} className={`btn ${filterDiff === d ? "btn-primary" : "btn-secondary"}`} onClick={() => setFilterDiff(d)}>{d}</button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="table-responsive">
//                   <table className="table table-dark table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th style={{ minWidth: "200px" }}>Question Name</th>
//                         <th style={{ minWidth: "200px" }}>Description</th>
//                         <th style={{ minWidth: "150px" }}>Link</th>
//                         <th>Difficulty</th>
//                         <th style={{ minWidth: "200px" }}>Note</th>
//                         <th>Solved</th>
//                         <th>Revise</th>
//                         <th style={{ minWidth: "250px" }}>Code</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProblems.map((problem, index) => (
//                         <tr key={problem.id} style={{ background: problem.solved ? "#1a3a1a" : "transparent" }}>
//                           <td className="text-secondary">{index + 1}</td>
//                           <td>
//                             <input type="text" className="form-control form-control-sm" value={problem.questionName}
//                               onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none" }} />
//                           </td>
//                           <td>
//                             <textarea className="form-control form-control-sm" rows="2" value={problem.description || ""}
//                               onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
//                               placeholder="Description..." style={{ background: "#222", color: "white", border: "none", resize: "vertical" }} />
//                           </td>
//                           <td>
//                             <input type="text" className="form-control form-control-sm mb-1" value={problem.link || ""}
//                               onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
//                               placeholder="https://..." style={{ background: "#222", color: "white", border: "none" }} />
//                             {problem.link && (
//                               <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">Open</a>
//                             )}
//                           </td>
//                           <td>
//                             <select className="form-select form-select-sm mb-1" value={problem.difficulty}
//                               onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
//                               style={{ background: "#222", color: "white", border: "none" }}>
//                               <option>Easy</option>
//                               <option>Medium</option>
//                               <option>Hard</option>
//                             </select>
//                             <span className={`badge ${getBadgeClass(problem.difficulty)} w-100`}>{problem.difficulty}</span>
//                           </td>
//                           <td>
//                             <textarea className="form-control form-control-sm" rows="2" value={problem.note || ""}
//                               onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
//                               placeholder="Your notes..." style={{ background: "#222", color: "white", border: "none", resize: "vertical" }} />
//                           </td>
//                           <td className="text-center">
//                             <input type="checkbox" className="form-check-input" style={{ width: "20px", height: "20px" }}
//                               checked={problem.solved} onChange={() => updateProblem(problem.id, { solved: !problem.solved })} />
//                           </td>
//                           <td className="text-center">
//                             <button className="btn btn-sm" onClick={() => updateProblem(problem.id, { revise: !problem.revise })}
//                               style={{ fontSize: "24px", background: "none", border: "none" }}>
//                               {problem.revise ? "⭐" : "☆"}
//                             </button>
//                           </td>
//                           <td>
//                             <textarea className="form-control form-control-sm" rows="3" value={problem.codeSnippet || ""}
//                               onChange={(e) => updateProblem(problem.id, { codeSnippet: e.target.value })}
//                               placeholder="// Your code here..."
//                               style={{ background: "#1a1a2a", color: "#86efac", border: "none", resize: "vertical", fontFamily: "monospace" }} />
//                           </td>
//                           <td>
//                             <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProblem(problem.id)}>Delete</button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredProblems.length === 0 && (
//                         <tr><td colSpan="10" className="text-center py-5 text-secondary">No problems. Click "Add Problem" to start!</td></tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mt-3 text-secondary">
//                   Total: {folderProblems.length} |&nbsp;
//                   Solved: {folderProblems.filter(p => p.solved).length} |&nbsp;
//                   Revise: {folderProblems.filter(p => p.revise).length}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProblemsPage from "./pages/ProblemsPage";

export default function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "white" }}>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={isSignedIn ? <Navigate to="/problems" /> : <LoginPage />} />
      <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to="/login" />} />
    </Routes>
  );
}