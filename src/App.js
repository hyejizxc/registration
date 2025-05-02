import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        newErrors.name = value.trim() === "" ? "Name is required." : "";
        break;
      case "email":
        newErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format.";
        break;
      case "password":
        newErrors.password =
          value.length < 6 ? "Password must be at least 6 characters." : "";
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value !== password ? "Passwords do not match." : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const isFormValid = () => {
    return (
      name &&
      email &&
      password &&
      confirmPassword &&
      Object.values(errors).every((e) => e === "")
    );
  };

  const getPasswordStrength = () => {
    if (password.length >= 8) return "Strong";
    if (password.length >= 6) return "Moderate";
    if (password) return "Weak";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setSuccess(true);
    } else {
      setSuccess(false); 
    }
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validate("name", e.target.value);
            }}
          />
          <span className="error">{errors.name}</span>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validate("email", e.target.value);
            }}
          />
          <span className="error">{errors.email}</span>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validate("password", e.target.value);
              validate("confirmPassword", confirmPassword);
            }}
          />
          <span className="error">{errors.password}</span>
          <div className={`strength ${getPasswordStrength().toLowerCase()}`}>
            Strength: {getPasswordStrength()}
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validate("confirmPassword", e.target.value);
            }}
          />
          <span className="error">{errors.confirmPassword}</span>
        </div>

        <button type="submit" disabled={!isFormValid()}>
          Register
        </button>
      </form>

      {success && <div className="success">🎉 Registration Successful!</div>}
    </div>
  );
}

export default App;