import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function LoginSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login Successful ✅</h2>
      <p>Welcome to Alumni Connect++</p>
    </div>
  );
}

export default LoginSuccess;
