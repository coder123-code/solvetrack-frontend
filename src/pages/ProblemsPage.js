

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";
// const API = "http://localhost:8080/api";
// Change this line
// const API = "http://localhost:8080/api";

// To this (your Render backend URL)
// const API = "https://solvestack-backend.onrender.com/";
const API = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
export default function ProblemsPage() {
  const { session } = useSession(); 
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [problems, setProblems] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [search, setSearch] = useState("");
  const [filterDiff, setFilterDiff] = useState("All");

 useEffect(() => {
  if (!session) return;
  
  const init = async () => {
    try {
      const token = await session.getToken();
      console.log("Token being set:", token); // add this
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadData();
    } catch (err) {
      console.log("Token error:", err);
    }
  };
  init();
}, [session]);

  const loadData = async () => {
    try {
      const foldersRes = await axios.get(`${API}/folders`);
      const problemsRes = await axios.get(`${API}/problems`);
      setFolders(foldersRes.data);
      setProblems(problemsRes.data);
    } catch (err) {
      console.log("Error loading data:", err);
    }
  };

  const handleLogout = async () => {
    await signOut();
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  const createFolder = async () => {
    if (newFolderName === "") return;
    try {
      const res = await axios.post(`${API}/folders`, { name: newFolderName });
      setFolders([...folders, res.data]);
      setNewFolderName("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      await axios.delete(`${API}/folders/${folderId}`);
      setFolders(folders.filter(f => f.id !== folderId));
      if (activeFolder?.id === folderId) setActiveFolder(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addProblem = async () => {
    if (!activeFolder) { alert("Please select a folder first"); return; }
    const newProblem = {
      questionName: "New Problem",
      description: "",
      link: "",
      difficulty: "Easy",
      note: "",
      solved: false,
      revise: false,
      codeSnippet: "",
      folderId: activeFolder.id
    };
    try {
      const res = await axios.post(`${API}/problems`, newProblem);
      setProblems([...problems, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProblem = async (problemId) => {
    try {
      await axios.delete(`${API}/problems/${problemId}`);
      setProblems(problems.filter(p => p.id !== problemId));
    } catch (err) {
      console.log(err);
    }
  };

  const updateProblem = async (id, updates) => {
    const problem = problems.find(p => p.id === id);
    const updated = { ...problem, ...updates };
    try {
      const res = await axios.put(`${API}/problems/${id}`, updated);
      setProblems(problems.map(p => p.id === id ? res.data : p));
    } catch (err) {
      console.log(err);
    }
  };

  const folderProblems = activeFolder ? problems.filter(p => p.folderId === activeFolder.id) : [];
  const filteredProblems = folderProblems.filter(p => {
    const matchesSearch = search === "" || p.questionName.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = filterDiff === "All" || p.difficulty === filterDiff;
    return matchesSearch && matchesDiff;
  });

  function getBadgeClass(difficulty) {
    if (difficulty === "Easy") return "bg-success";
    if (difficulty === "Medium") return "bg-warning text-dark";
    return "bg-danger";
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="container-fluid">
        <div className="row">
          {/* SIDEBAR */}
          <div className="col-md-3 col-lg-2" style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
            <h3 className="mb-4 text-primary">📚 SolveTrack</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => { if (e.key === "Enter") createFolder(); }}
                style={{ background: "#222", color: "white", border: "none" }}
              />
              <button className="btn btn-primary w-100" onClick={createFolder}>+ Create Folder</button>
            </div>
            <hr style={{ background: "#333" }} />
            <h6 className="text-secondary mb-2">FOLDERS</h6>
            {folders.map(folder => (
              <div
                key={folder.id}
                onClick={() => setActiveFolder(folder)}
                className="d-flex justify-content-between align-items-center p-2 mb-1 rounded"
                style={{ background: activeFolder?.id === folder.id ? "#0d6efd" : "transparent", cursor: "pointer" }}
              >
                <span>📁 {folder.name}</span>
                <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}>🗑️</button>
              </div>
            ))}
          </div>

          {/* MAIN CONTENT */}
          <div className="col-md-9 col-lg-10" style={{ padding: "20px" }}>
            {!activeFolder ? (
              <div className="text-center mt-5">
                <h2>📁 Select a Folder</h2>
                <p className="text-secondary">Choose a folder from the sidebar</p>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>📁 {activeFolder.name}</h2>
                  <button className="btn btn-primary" onClick={addProblem}>+ Add Problem</button>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="🔍 Search problems..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ background: "#222", color: "white", border: "none" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="btn-group">
                      {["All", "Easy", "Medium", "Hard"].map(d => (
                        <button key={d} className={`btn ${filterDiff === d ? "btn-primary" : "btn-secondary"}`} onClick={() => setFilterDiff(d)}>{d}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-dark table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th style={{ minWidth: "200px" }}>Question Name</th>
                        <th style={{ minWidth: "200px" }}>Description</th>
                        <th style={{ minWidth: "150px" }}>Link</th>
                        <th>Difficulty</th>
                        <th style={{ minWidth: "200px" }}>Note</th>
                        <th>Solved</th>
                        <th>Revise</th>
                        <th style={{ minWidth: "250px" }}>Code</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProblems.map((problem, index) => (
                        <tr key={problem.id} style={{ background: problem.solved ? "#1a3a1a" : "transparent" }}>
                          <td className="text-secondary">{index + 1}</td>
                          <td>
                            <input type="text" className="form-control form-control-sm" value={problem.questionName}
                              onChange={(e) => updateProblem(problem.id, { questionName: e.target.value })}
                              style={{ background: "#222", color: "white", border: "none" }} />
                          </td>
                          <td>
                            <textarea className="form-control form-control-sm" rows="2" value={problem.description || ""}
                              onChange={(e) => updateProblem(problem.id, { description: e.target.value })}
                              placeholder="Description..." style={{ background: "#222", color: "white", border: "none", resize: "vertical" }} />
                          </td>
                          <td>
                            <input type="text" className="form-control form-control-sm mb-1" value={problem.link || ""}
                              onChange={(e) => updateProblem(problem.id, { link: e.target.value })}
                              placeholder="https://..." style={{ background: "#222", color: "white", border: "none" }} />
                            {problem.link && (
                              <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-100">Open</a>
                            )}
                          </td>
                          <td>
                            <select className="form-select form-select-sm mb-1" value={problem.difficulty}
                              onChange={(e) => updateProblem(problem.id, { difficulty: e.target.value })}
                              style={{ background: "#222", color: "white", border: "none" }}>
                              <option>Easy</option>
                              <option>Medium</option>
                              <option>Hard</option>
                            </select>
                            <span className={`badge ${getBadgeClass(problem.difficulty)} w-100`}>{problem.difficulty}</span>
                          </td>
                          <td>
                            <textarea className="form-control form-control-sm" rows="2" value={problem.note || ""}
                              onChange={(e) => updateProblem(problem.id, { note: e.target.value })}
                              placeholder="Your notes..." style={{ background: "#222", color: "white", border: "none", resize: "vertical" }} />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" className="form-check-input" style={{ width: "20px", height: "20px" }}
                              checked={problem.solved} onChange={() => updateProblem(problem.id, { solved: !problem.solved })} />
                          </td>
                          <td className="text-center">
                            <button className="btn btn-sm" onClick={() => updateProblem(problem.id, { revise: !problem.revise })}
                              style={{ fontSize: "24px", background: "none", border: "none" }}>
                              {problem.revise ? "⭐" : "☆"}
                            </button>
                          </td>
                          <td>
                            <textarea className="form-control form-control-sm" rows="3" value={problem.codeSnippet || ""}
                              onChange={(e) => updateProblem(problem.id, { codeSnippet: e.target.value })}
                              placeholder="// Your code here..."
                              style={{ background: "#1a1a2a", color: "#86efac", border: "none", resize: "vertical", fontFamily: "monospace" }} />
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProblem(problem.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                      {filteredProblems.length === 0 && (
                        <tr><td colSpan="10" className="text-center py-5 text-secondary">No problems. Click "Add Problem" to start!</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 text-secondary">
                  Total: {folderProblems.length} |&nbsp;
                  Solved: {folderProblems.filter(p => p.solved).length} |&nbsp;
                  Revise: {folderProblems.filter(p => p.revise).length}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}