import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RoleSelector.css";

function RoleSelector() {
  const location = useLocation();
  const navigate = useNavigate();
  const roles = location.state?.roles || [];

  // Redirect to /login if roles are not exactly BUYER and SELLER
  // useEffect(() => {
  //   const validRoles = roles.includes("BUYER") && roles.includes("SELLER") && roles.length === 2;
  //   if (!validRoles) {
  //     navigate("/login");
  //   }
  // }, [roles, navigate]);

  const handleRoleSelect = (role) => {
    if (role === "BUYER" || role === "SELLER") {
      navigate(`/${role.toLowerCase()}`);
    }
  };

  return (
    <div className="role-selector-container">
      <div className="role-selector-card">
        <h2 className="role-selector-title">🔄 Choose Your Role</h2>
        <p>You are registered as both <strong>Buyer</strong> and <strong>Seller</strong>.</p>
        <p>Please select the role you wish to continue with:</p>

        <div className="role-buttons">
          <button className="role-btn" onClick={() => handleRoleSelect("BUYER")}>
            🛒 Continue as Buyer
          </button>
          <button className="role-btn" onClick={() => handleRoleSelect("SELLER")}>
            🏠 Continue as Seller
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;
