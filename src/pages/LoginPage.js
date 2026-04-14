// import React, { useState } from "react";
// import { useSignIn, useSignUp } from "@clerk/clerk-react";

// export default function LoginPage({ onLogin }) {
//   const [isLogin, setIsLogin] = useState(true); // true = Login, false = Sign Up
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { signIn } = useSignIn();
//   const { signUp } = useSignUp();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (isLogin) {
//         // LOGIN
//         const result = await signIn.create({
//           identifier: email,
//           password: password,
//         });
        
//         if (result.status === "complete") {
//           onLogin();
//         } else {
//           setError("Login failed. Please try again.");
//         }
//       } else {
//         // SIGN UP
//         const result = await signUp.create({
//           emailAddress: email,
//           password: password,
//           firstName: firstName,
//           lastName: lastName,
//         });
        
//         if (result.status === "complete") {
//           onLogin();
//         } else if (result.status === "needs_verification") {
//           setError("Please verify your email address");
//         } else {
//           setError("Sign up failed. Please try again.");
//         }
//       }
//     } catch (err) {
//       setError(err.errors?.[0]?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h2 style={styles.title}>📚 SolveStack</h2>
//           <p style={styles.subtitle}>
//             {isLogin ? "Welcome back! Please sign in" : "Create your account to get started"}
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div style={styles.error}>
//             ❌ {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           {/* Name fields - Only for Sign Up */}
//           {!isLogin && (
//             <div style={styles.row}>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="First name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 style={styles.inputHalf}
//               />
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Last name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 style={styles.inputHalf}
//               />
//             </div>
//           )}

//           {/* Email */}
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />

//           {/* Password */}
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={loading}
//             style={styles.button}
//           >
//             {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
//           </button>
//         </form>

//         {/* Toggle between Login and Sign Up */}
//         <div style={styles.footer}>
//           <button
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setError("");
//               setFirstName("");
//               setLastName("");
//             }}
//             style={styles.toggleButton}
//           >
//             {isLogin 
//               ? "Don't have an account? Sign up" 
//               : "Already have an account? Sign in"}
//           </button>
//         </div>

//         {/* Clerk credit */}
//         <div style={styles.credit}>
//           Secured by Clerk
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "#f5f5f5",  // Clean light gray background
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px"
//   },
//   card: {
//     background: "white",  // Clean white card
//     borderRadius: "16px",
//     padding: "40px",
//     width: "100%",
//     maxWidth: "450px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//     border: "1px solid #e0e0e0"
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "30px"
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: "bold",
//     color: "#3b82f6",
//     marginBottom: "10px"
//   },
//   subtitle: {
//     fontSize: "14px",
//     color: "#666",
//     marginBottom: "0"
//   },
//   error: {
//     background: "#fee2e2",
//     border: "1px solid #ef4444",
//     color: "#dc2626",
//     padding: "12px",
//     borderRadius: "8px",
//     marginBottom: "20px",
//     textAlign: "center",
//     fontSize: "14px"
//   },
//   row: {
//     display: "flex",
//     gap: "12px",
//     marginBottom: "15px"
//   },
//   input: {
//     background: "white",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     padding: "12px",
//     fontSize: "14px",
//     width: "100%",
//     marginBottom: "15px",
//     outline: "none",
//     transition: "border-color 0.2s"
//   },
//   inputHalf: {
//     background: "white",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     padding: "12px",
//     fontSize: "14px",
//     flex: 1,
//     outline: "none"
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     fontSize: "16px",
//     fontWeight: "600",
//     borderRadius: "8px",
//     marginTop: "10px",
//     cursor: "pointer"
//   },
//   footer: {
//     marginTop: "24px",
//     textAlign: "center"
//   },
//   toggleButton: {
//     background: "none",
//     border: "none",
//     color: "#3b82f6",
//     cursor: "pointer",
//     fontSize: "14px",
//     textDecoration: "underline"
//   },
//   credit: {
//     marginTop: "20px",
//     textAlign: "center",
//     fontSize: "11px",
//     color: "#999",
//     borderTop: "1px solid #eee",
//     paddingTop: "20px"
//   }
// };

// // Add hover effects for inputs (CSS)
// const styleSheet = document.createElement("style");
// styleSheet.textContent = `
//   input:focus {
//     border-color: #3b82f6 !important;
//     box-shadow: 0 0 0 2px rgba(59,130,246,0.1) !important;
//   }
// `;
// document.head.appendChild(styleSheet);
// import React, { useEffect } from "react";
// import { SignIn, useUser } from "@clerk/clerk-react";

// export default function LoginPage({ onLogin }) {
//   const { isSignedIn, user } = useUser();

//   useEffect(() => {
//     if (isSignedIn) {
//       // Save user info when logged in
//       localStorage.setItem("username", user?.username || user?.firstName || "User");
//       onLogin();
//     }
//   }, [isSignedIn, user, onLogin]);

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.logo}>
//           <span style={styles.logoIcon}>📚</span>
//           <span style={styles.logoText}>SolveStack</span>
//         </div>
        
//         {/* Clerk's beautiful built-in Sign In component */}
//         <SignIn 
//           routing="hash"
//           signUpUrl="#"
//           afterSignInUrl="#"
//           afterSignUpUrl="#"
//         />
        
//         <div style={styles.credit}>
//           Secure authentication by Clerk
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px"
//   },
//   card: {
//     background: "white",
//     borderRadius: "24px",
//     padding: "40px",
//     width: "100%",
//     maxWidth: "480px",
//     boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
//   },
//   logo: {
//     textAlign: "center",
//     marginBottom: "30px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px"
//   },
//   logoIcon: {
//     fontSize: "32px"
//   },
//   logoText: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     color: "#3b82f6"
//   },
//   credit: {
//     textAlign: "center",
//     fontSize: "11px",
//     color: "#999",
//     marginTop: "20px",
//     paddingTop: "20px",
//     borderTop: "1px solid #eee"
//   }
// };
// import React, { useEffect } from "react";
// import { SignIn, useUser } from "@clerk/clerk-react";

// export default function LoginPage({ onLogin }) {
//   const { isSignedIn, user } = useUser();

//   useEffect(() => {
//     if (isSignedIn && user) {
//       // Save user info
//       localStorage.setItem("username", user.username || user.firstName || "User");
//       // Call the onLogin function from App.js
//       onLogin();
//     }
//   }, [isSignedIn, user, onLogin]);

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.logo}>
//           <span style={styles.logoIcon}>📚</span>
//           <span style={styles.logoText}>SolveStack</span>
//         </div>
//         <p style={styles.welcome}>Welcome to SolveStack</p>
//         <SignIn routing="hash" />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px"
//   },
//   card: {
//     background: "white",
//     borderRadius: "24px",
//     padding: "40px",
//     width: "100%",
//     maxWidth: "480px",
//     boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
//   },
//   logo: {
//     textAlign: "center",
//     marginBottom: "20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px"
//   },
//   logoIcon: { fontSize: "32px" },
//   logoText: { fontSize: "24px", fontWeight: "bold", color: "#3b82f6" },
//   welcome: {
//     textAlign: "center",
//     fontSize: "16px",
//     color: "#666",
//     marginBottom: "30px"
//   }
// };

// import React, { useEffect } from "react";
// import { SignIn, useUser, useClerk } from "@clerk/clerk-react";
// import axios from "axios";

// export default function LoginPage({ onLogin }) {
//   const { isSignedIn, user, session } = useUser();
//   const { signOut } = useClerk();

//   useEffect(() => {
//     // Check if there's a token but user is not signed in - force fresh login
//     const token = localStorage.getItem("token");
    
//     if (token && !isSignedIn) {
//       // Token exists but Clerk says not signed in - clear everything
//       console.log("Token exists but no Clerk session - clearing...");
//       localStorage.removeItem("token");
//       localStorage.removeItem("username");
//       delete axios.defaults.headers.common["Authorization"];
//       return;
//     }
    
//     if (isSignedIn && user) {
//       console.log("User signed in:", user);
      
//       const getToken = async () => {
//         try {
//           const token = await session?.getToken();
//           console.log("Got token:", token ? "Yes" : "No");
          
//           if (token) {
//             localStorage.setItem("token", token);
//             localStorage.setItem("username", user.username || user.firstName || user.emailAddress || "User");
//             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//           }
          
//           // Go to main app
//           onLogin();
//         } catch (err) {
//           console.error("Error getting token:", err);
//           onLogin();
//         }
//       };
      
//       getToken();
//     }
//   }, [isSignedIn, user, session, onLogin]);

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.logo}>
//           <span style={styles.logoIcon}>📚</span>
//           <span style={styles.logoText}>SolveStack</span>
//         </div>
//         <p style={styles.welcome}>Welcome to SolveStack</p>
//         <SignIn routing="hash" />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px"
//   },
//   card: {
//     background: "white",
//     borderRadius: "24px",
//     padding: "40px",
//     width: "100%",
//     maxWidth: "480px",
//     boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
//   },
//   logo: {
//     textAlign: "center",
//     marginBottom: "20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px"
//   },
//   logoIcon: { fontSize: "32px" },
//   logoText: { fontSize: "24px", fontWeight: "bold", color: "#3b82f6" },
//   welcome: {
//     textAlign: "center",
//     fontSize: "16px",
//     color: "#666",
//     marginBottom: "30px"
//   }
// };

// import React, { useEffect } from "react";
// import { SignIn, useUser } from "@clerk/clerk-react";
// import axios from "axios";

// export default function LoginPage({ onLogin }) {
//   const { isSignedIn, user, session } = useUser();

//   useEffect(() => {
//     if (isSignedIn && user) {
//       const getToken = async () => {
//         try {
//           const token = await session?.getToken();
//           if (token) {
//             localStorage.setItem("token", token);
//             localStorage.setItem("username", user.username || user.firstName || user.emailAddresses?.[0]?.emailAddress || "User");
//             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//           }
//           onLogin();
//         } catch (err) {
//           console.error("Error getting token:", err);
//           onLogin();
//         }
//       };
//       getToken();
//     }
//   }, [isSignedIn, user, session, onLogin]);

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.logo}>
//           <span style={styles.logoIcon}>📚</span>
//           <span style={styles.logoText}>SolveStack</span>
//         </div>
//         <p style={styles.welcome}>Welcome to SolveStack</p>
//         <SignIn routing="hash" />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px"
//   },
//   card: {
//     background: "white",
//     borderRadius: "24px",
//     padding: "40px",
//     width: "100%",
//     maxWidth: "480px",
//     boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
//   },
//   logo: {
//     textAlign: "center",
//     marginBottom: "20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px"
//   },
//   logoIcon: { fontSize: "32px" },
//   logoText: { fontSize: "24px", fontWeight: "bold", color: "#3b82f6" },
//   welcome: {
//     textAlign: "center",
//     fontSize: "16px",
//     color: "#666",
//     marginBottom: "30px"
//   }
// };
// import React from "react";
// import { SignIn } from "@clerk/clerk-react";

// export default function LoginPage() {
//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.logo}>
//           <span style={styles.logoIcon}>📚</span>
//           <span style={styles.logoText}>SolveStack</span>
//         </div>
//         <p style={styles.welcome}>Welcome to SolveStack</p>
//         <SignIn routing="hash" />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px"
//   },
//   card: {
//     background: "white",
//     borderRadius: "24px",
//     padding: "40px",
//     width: "100%",
//     maxWidth: "480px",
//     boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
//   },
//   logo: {
//     textAlign: "center",
//     marginBottom: "20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px"
//   },
//   logoIcon: { fontSize: "32px" },
//   logoText: { fontSize: "24px", fontWeight: "bold", color: "#3b82f6" },
//   welcome: {
//     textAlign: "center",
//     fontSize: "16px",
//     color: "#666",
//     marginBottom: "30px"
//   }
// };

import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>📚</span>
          <span style={styles.logoText}>SolveTrack</span>
        </div>
        <p style={styles.welcome}>Welcome to SolveTrack</p>
        <SignIn routing="hash" afterSignInUrl="/#/problems" afterSignUpUrl="/#/problems" />
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  card: { background: "white", borderRadius: "24px", padding: "40px", width: "100%", maxWidth: "480px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" },
  logo: { textAlign: "center", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" },
  logoIcon: { fontSize: "32px" },
  logoText: { fontSize: "24px", fontWeight: "bold", color: "#3b82f6" },
  welcome: { textAlign: "center", fontSize: "16px", color: "#666", marginBottom: "30px" }
};