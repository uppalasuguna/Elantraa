import { useState } from "react";
import { registerUser, loginUser } from "../services/auth";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await loginUser(email, password);
        alert("Logged in!");
      } else {
        await registerUser(email, password);
        alert("Registered!");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
      <input className="border p-2 w-full mb-3" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input className="border p-2 w-full mb-3" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-black text-white p-2 w-full" onClick={handleAuth}>
        {isLogin ? "Login" : "Register"}
      </button>
      <p className="mt-4 text-sm cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : "Already registered? Login"}
      </p>
    </div>
  );
}
