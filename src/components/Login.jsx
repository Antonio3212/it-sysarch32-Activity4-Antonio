import { Link } from "react-router-dom";
import { useState } from "react";
import { login_route } from "../api/routes";
import ReactSVG from "../assets/react.svg";

function Login() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [authRes, setAuthRes] = useState(null);

  const handleInputs = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(login_route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLogin),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        window.location.href = "/products";
      } else {
        setAuthRes("Please Try Again!");
      }
    } catch (error) {
      console.log(error);
      setAuthRes("Please Try Again");
    }
  };

  return (
    <div className="wrapper">
      <div className="side">
        <img className="image-absolute" src={ReactSVG} />
        <div className="desc-relative">
          <label className="big-header font-poppins text-white">Activity 4</label>
          <label className="big-subheader font-poppins text-gray-300">
            React + API
          </label>
        </div>
      </div>
      <div className="main bg-white">
        <div className="form-container">
          <label className="form-label font-header font-poppins font-bold mb-3 text-gray-800">
            Login
          </label>
          <form onSubmit={handleSubmission} className="form">
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formLogin.email}
              onChange={handleInputs}
              required
              className="input-field border border-gray-300 p-2 mb-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formLogin.password}
              onChange={handleInputs}
              required
              className="input-field border border-gray-300 p-2 mb-4 rounded"
            />
            {authRes && (
              <label className="form-error text-red text-center font-poppins">
                {authRes}
              </label>
            )}
            <button className="form-button font-poppins bg-blue-500 text-white p-2 rounded">
              Login
            </button>
          </form>
          <Link to="/register" className="form-link font-poppins text-blue-500 mt-4">
            Register Here
          </Link>
        </div>
      </div>
      <div className="footer">
        <p className="text-gray-600 text-center mt-4">
          &copy; {new Date().getFullYear()} Activity 4 - React + API
        </p>
      </div>
    </div>
  );
}

export default Login;