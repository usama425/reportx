import React, { useState } from "react";
import "./LoginStyles.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Index = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const LoginUser = () => {
    if (email === "" || password === "") {
      toast.warn("Please fill all fields");
    } else {
      const formdata = new FormData();
      formdata.append("email", loginEmail);
      formdata.append("password", loginPassword);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("https://apis.reportsxapis.com/api/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const registerUser = () => {
    if (email === "" || password === "" || confirmPassword === "") {
      toast.warn("Please fill all fields");
    } else if (password.length < 8 || confirmPassword.length < 8) {
      toast.warn("Password must be 8 digits");
    } else if (password !== confirmPassword) {
      toast.warn("Password does not matched");
    } else {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("password_confirmation", confirmPassword);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("https://apis.reportsxapis.com/api/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleSwitch = (formType) => {
    setActiveForm(formType);
  };

  return (
    <div className="login-screen">
      <section className="forms-section">
        <h1 className="section-title">CSV GENERATOR</h1>
        <div className="forms">
          <div
            className={`form-wrapper ${
              activeForm === "login" ? "is-active" : ""
            }`}
          >
            <button
              type="button"
              className="switcher switcher-login"
              onClick={() => handleSwitch("login")}
            >
              Login
              <span className="underline" />
            </button>
            <div className="form form-login">
              <fieldset>
                <legend>
                  Please, enter your email and password for login.
                </legend>
                <div className="input-block">
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    id="login-email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    type="email"
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    type="password"
                    required
                  />
                </div>
              </fieldset>
              <button type="submit" onClick={LoginUser} className="btn-login">
                Login
              </button>
            </div>
          </div>
          <div
            className={`form-wrapper ${
              activeForm === "signup" ? "is-active" : ""
            }`}
          >
            <button
              type="button"
              className="switcher switcher-signup"
              onClick={() => handleSwitch("signup")}
            >
              Sign Up
              <span className="underline" />
            </button>
            <div className="form form-signup">
              <fieldset>
                <legend>
                  Please, enter your email, password, and password confirmation
                  for sign up.
                </legend>
                <div className="input-block">
                  <label htmlFor="signup-email">E-mail</label>
                  <input
                    id="signup-email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    onChange={(e) => SetPassword(e.target.value)}
                    type="password"
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password-confirm">
                    Confirm password
                  </label>
                  <input
                    id="signup-password-confirm"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    required
                  />
                </div>
              </fieldset>
              <button
                type="submit"
                onClick={registerUser}
                className="btn-signup"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
