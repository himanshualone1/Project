import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem("captainToken");

        if (!token) {
          navigate("/captain-login");
          return;
        }

        await axios.get("http://localhost:4000/captains/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("captainToken");
        navigate("/captain-login");
      } catch (error) {
        console.error("Captain logout error:", error);
        localStorage.removeItem("captainToken");
        navigate("/captain-login");
      }
    };

    logout();
  }, [navigate]);

  return <p>Logging out captain...</p>;
};

export default CaptainLogout;
