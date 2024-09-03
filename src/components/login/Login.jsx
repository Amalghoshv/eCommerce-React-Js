import Button from "../ui/Button";
import { useState, useRef } from "react";
import { signInWithEmailAndPassword, getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/login.css";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const registerEmailRef = useRef(); 
  const registerPasswordRef = useRef();
  const registerNameRef =useRef();
  const [isFlipped, setIsFlipped] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const email = registerEmailRef.current.value;
    const password = registerPasswordRef.current.value;
    const name = registerNameRef.current.value;

    if (!email || !password || !name) {
      Swal.fire({
        title:"All fields required!",
        icon:"warning"

      })
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      Swal.fire({
        title:"User Registered Successfully",
        text: userCredential.user,
        icon:"success"
      })
      await updateProfile(user, {
        displayName: name
      });
      
    navigate("/login");
     
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Registration failed!",
        text: error.message,
        icon: "error"
      });    }
  };

  const handleLogin = async (event) => {
    event.preventDefault(); 
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("User logged in:", userCredential.user);
      
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
          <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" id="name" ref={registerNameRef} />
            </div> 
            <div className="form-group">
              <label htmlFor="">Email:</label>
              <input type="email" name="email" id="email"  ref={registerEmailRef}/>
            </div>
   
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" ref={registerPasswordRef} />
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
