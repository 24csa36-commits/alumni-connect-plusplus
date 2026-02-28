import "./App.css";
import AlumniList from "./pages/AlumniList";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>🎓 AlumniConnect+</h1>

      <p>Login using LinkedIn to continue</p>

      {/* 🔹 LinkedIn Login Button */}
      <a
        href="http://localhost:5000/auth/linkedin"
        style={{
          padding: "12px 20px",
          backgroundColor: "#0A66C2",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          display: "inline-block",
          marginBottom: "40px",
        }}
      >
        Login with LinkedIn
      </a>

      {/* 🔹 Alumni List */}
      <AlumniList />
    </div>
  );
  
}

export default App;
