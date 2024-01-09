import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export const Navbar = () => {
  const [cookies, setCookies] = useCookies("access_token");
  const [temp, SetTemp] = useState(false);
  const [uid, setUid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    SetTemp(window.localStorage.getItem("userid"));
    if (temp !== undefined) {
      setUid(true);
    } else {
      setUid(false);
    }
  }, []);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userid");
    setUid(false);
    alert("Successfully Logged Out");
  };

  const logoClick = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <span className="logotext" onClick={logoClick}>
          Prashnaavali
        </span>
      </div>
      <div className="navElements">
        {uid ? (
          <>
            <Link to="/start">
              <span className="navText">Start</span>
            </Link>
            <Link to="/profile">
              <span className="navText">Profile</span>
            </Link>
            <Link to="/login">
              <span className="navText" onClick={logout}>
                Logout
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <span className="navText">Register</span>
            </Link>
            <Link to="/login">
              <span className="navText">Sign In</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
