import Button from "../ui/Button";
import { useState, useRef } from "react";
import { signInWithEmailAndPassword, getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/login.css";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  // const registerEmailRef = useRef();
  // const registerPasswordRef = useRef();
  const [isFlipped, setIsFlipped] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      alert("user registered")
      // Optionally, save the user's name to the user profile or database here

      // Navigate to the products page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User successfully logged in, handle redirection or state updates
      console.log("User logged in:", userCredential.user);
      // Navigate to the products page after successful login
      navigate("/products");

      // Optionally redirect to a protected route or set a logged-in state
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Invalid Credentials!",
        text: "Check email and password!",
        icon: "error",
      });
    }
  };
  return (
    <div className={`container ${isFlipped ? "flipped" : ""}`}>
      <div className="login login-register-wrapper">
        <div className="form-container login">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div className="uname form-group">
              <label htmlFor="uname">Username:</label>
              <input type="text" name="uname" id="uname" placeholder="Email" ref={emailRef} />
            </div>
            <div className="pwd form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </div>
            <div className="btns1   ">
              <Button className="btn-login" type="submit">
                Login
              </Button>
              <Button className="btn-flip" onClick={handleFlip}>
                New User? Register here
              </Button>
            </div>
          </form>
        </div>

        <div className="login form-container register">
          <h1>Register</h1>
          <form className=" login form" onSubmit={handleRegister}>
            {/* <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" />
          </div> */}
            <div className="form-group">
              <label htmlFor="">Email:</label>
              <input type="email" name="email" id="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" />
            </div>
            <div className="btns">
              <Button
                className="btn-login"
                type="submit"
                onClick={handleRegister}
              >
                Register
              </Button>
              <Button className="btn-flip" onClick={handleFlip}>
                Already Registered?Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
