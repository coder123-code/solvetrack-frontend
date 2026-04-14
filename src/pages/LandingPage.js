// import React from "react";

// export default function LandingPage({ onGetStarted }) {
//   const features = [
//     {
//       icon: "📁",
//       title: "Organize Problems",
//       description: "Create folders to organize problems by topic, company, or difficulty"
//     },
//     {
//       icon: "⭐",
//       title: "Track Progress",
//       description: "Mark problems solved and flag important ones for revision"
//     },
//     {
//       icon: "📝",
//       title: "Add Notes",
//       description: "Keep detailed notes, code snippets, and solution approaches"
//     },
//     {
//       icon: "🎯",
//       title: "Filter & Search",
//       description: "Quickly find problems by difficulty, name, or status"
//     }
//   ];

//   return (
//     <div style={styles.container}>
//       {/* Navigation */}
//       <nav style={styles.nav}>
//         <div style={styles.logo}>
//           <span style={styles.logoIcon}>📚</span>
//           <span style={styles.logoText}>SolveTrack</span>
//         </div>
//         <button onClick={onGetStarted} style={styles.navButton}>
//           Get Started →
//         </button>
//       </nav>

//       {/* Hero Section */}
//       <section style={styles.hero}>
//         <h1 style={styles.title}>
//           Solve. Learn. Grow
//           <br />
//           <span style={styles.titleGradient}>Coding Problems</span>
//         </h1>
//         <p style={styles.subtitle}>
//           The simple way to organize your coding practice.
//           Create folders, add problems, take notes, and track your progress.
//         </p>
//         <button onClick={onGetStarted} style={styles.primaryBtn}>
//           Start Now → 
//         </button>
//       </section>

//       {/* Features Section */}
//       <section style={styles.features}>
//         <h2 style={styles.sectionTitle}>Why Use SolveTrack?</h2>
//         <div style={styles.featuresGrid}>
//           {features.map((feature, index) => (
//             <div key={index} style={styles.featureCard}>
//               <div style={styles.featureIcon}>{feature.icon}</div>
//               <h3 style={styles.featureTitle}>{feature.title}</h3>
//               <p style={styles.featureDesc}>{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer style={styles.footer}>
//         <p>© 2024 SolveTrack. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "#0a0a0a",
//     color: "#e2e8f0",
//     fontFamily: "system-ui, -apple-system, sans-serif"
//   },

//   // Navigation
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "20px 48px",
//     borderBottom: "1px solid #1e1e2a",
//     background: "#0d0d0d"
//   },
//   logo: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px"
//   },
//   logoIcon: {
//     fontSize: "28px"
//   },
//   logoText: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#3b82f6"
//   },
//   navButton: {
//     background: "#3b82f6",
//     border: "none",
//     borderRadius: "8px",
//     color: "white",
//     padding: "10px 24px",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "14px"
//   },

//   // Hero
//   hero: {
//     textAlign: "center",
//     padding: "80px 24px",
//     maxWidth: "800px",
//     margin: "0 auto"
//   },
//   title: {
//     fontSize: "56px",
//     fontWeight: "700",
//     marginBottom: "20px",
//     lineHeight: "1.2"
//   },
//   titleGradient: {
//     background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     backgroundClip: "text"
//   },
//   subtitle: {
//     fontSize: "18px",
//     color: "#94a3b8",
//     maxWidth: "600px",
//     margin: "0 auto 32px",
//     lineHeight: "1.6"
//   },
//   primaryBtn: {
//     background: "#3b82f6",
//     border: "none",
//     borderRadius: "12px",
//     color: "white",
//     padding: "14px 32px",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "16px"
//   },

//   // Features
//   features: {
//     padding: "60px 48px",
//     maxWidth: "1200px",
//     margin: "0 auto"
//   },
//   sectionTitle: {
//     textAlign: "center",
//     fontSize: "32px",
//     fontWeight: "600",
//     marginBottom: "48px"
//   },
//   featuresGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//     gap: "32px"
//   },
//   featureCard: {
//     background: "#111",
//     padding: "32px",
//     borderRadius: "16px",
//     border: "1px solid #1e1e2a",
//     textAlign: "center"
//   },
//   featureIcon: {
//     fontSize: "48px",
//     marginBottom: "16px"
//   },
//   featureTitle: {
//     fontSize: "20px",
//     fontWeight: "600",
//     marginBottom: "12px"
//   },
//   featureDesc: {
//     fontSize: "14px",
//     color: "#94a3b8",
//     lineHeight: "1.5"
//   },

//   // Footer
//   footer: {
//     textAlign: "center",
//     padding: "32px",
//     borderTop: "1px solid #1e1e2a",
//     color: "#475569",
//     fontSize: "14px"
//   }
// };

// import React from "react";

// export default function LandingPage({ onGetStarted }) {
//   return (
//     <div style={styles.container}>
//       <nav style={styles.nav}>
//         <div style={styles.logo}>
//           <span style={styles.logoIcon}>📚</span>
//           <span style={styles.logoText}>SolveStack</span>
//         </div>
//         <button onClick={onGetStarted} style={styles.navButton}>
//           Get Started →
//         </button>
//       </nav>

//       <section style={styles.hero}>
//         <h1 style={styles.title}>
//           Master Coding Problems
//           <br />
//           <span style={styles.titleGradient}>with Confidence</span>
//         </h1>
//         <p style={styles.subtitle}>
//           The simple way to organize your coding practice.
//           Create folders, add problems, take notes, and track your progress.
//         </p>
//         <button onClick={onGetStarted} style={styles.primaryBtn}>
//           Start Now →
//         </button>
//       </section>

//       <footer style={styles.footer}>
//         <p>© 2024 SolveStack. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "#0a0a0a",
//     color: "#e2e8f0"
//   },
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "20px 48px",
//     borderBottom: "1px solid #1e1e2a"
//   },
//   logo: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px"
//   },
//   logoIcon: { fontSize: "28px" },
//   logoText: { fontSize: "20px", fontWeight: "bold", color: "#3b82f6" },
//   navButton: {
//     background: "#3b82f6",
//     border: "none",
//     borderRadius: "8px",
//     color: "white",
//     padding: "10px 24px",
//     cursor: "pointer"
//   },
//   hero: {
//     textAlign: "center",
//     padding: "80px 24px",
//     maxWidth: "800px",
//     margin: "0 auto"
//   },
//   title: { fontSize: "56px", fontWeight: "700", marginBottom: "20px" },
//   titleGradient: {
//     background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent"
//   },
//   subtitle: {
//     fontSize: "18px",
//     color: "#94a3b8",
//     maxWidth: "600px",
//     margin: "0 auto 32px"
//   },
//   primaryBtn: {
//     background: "#3b82f6",
//     border: "none",
//     borderRadius: "12px",
//     color: "white",
//     padding: "14px 32px",
//     cursor: "pointer",
//     fontSize: "16px"
//   },
//   footer: {
//     textAlign: "center",
//     padding: "32px",
//     borderTop: "1px solid #1e1e2a",
//     color: "#475569"
//   }
// };
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>📚</span>
          <span style={styles.logoText}>SolveTrack</span>
        </div>
        <button onClick={() => navigate("/login")} style={styles.navButton}>
          Get Started →
        </button>
      </nav>

      <section style={styles.hero}>
        <h1 style={styles.title}>
          Master Coding Problems
          <br />
          <span style={styles.titleGradient}>with Confidence</span>
        </h1>
        <p style={styles.subtitle}>
          The simple way to organize your coding practice.
          Create folders, add problems, take notes, and track your progress.
        </p>
        <button onClick={() => navigate("/login")} style={styles.primaryBtn}>
          Start Now →
        </button>
      </section>

      <footer style={styles.footer}>
        <p>© 2024 SolveTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#0a0a0a", color: "#e2e8f0" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: "1px solid #1e1e2a" },
  logo: { display: "flex", alignItems: "center", gap: "10px" },
  logoIcon: { fontSize: "28px" },
  logoText: { fontSize: "20px", fontWeight: "bold", color: "#3b82f6" },
  navButton: { background: "#3b82f6", border: "none", borderRadius: "8px", color: "white", padding: "10px 24px", cursor: "pointer" },
  hero: { textAlign: "center", padding: "80px 24px", maxWidth: "800px", margin: "0 auto" },
  title: { fontSize: "56px", fontWeight: "700", marginBottom: "20px" },
  titleGradient: { background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle: { fontSize: "18px", color: "#94a3b8", maxWidth: "600px", margin: "0 auto 32px" },
  primaryBtn: { background: "#3b82f6", border: "none", borderRadius: "12px", color: "white", padding: "14px 32px", cursor: "pointer", fontSize: "16px" },
  footer: { textAlign: "center", padding: "32px", borderTop: "1px solid #1e1e2a", color: "#475569" }
};