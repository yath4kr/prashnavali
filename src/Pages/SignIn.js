import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["access_token"]);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "https://prashnavali.onrender.com/auth/login",
        {
          password,
          username,
        }
      );
      console.log(res);
      console.log(res.status);
      if (res.status !== 404) {
        setCookies("access_token", res.data.token);
        window.localStorage.setItem("userid", res.data.userid);
        window.localStorage.setItem("userID", res.data.userid);
        alert("Successfully Logged In");
        navigate("/");
        window.location.reload();
      } else {
        setError("Not Good..!!");
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <>
      <h1 className="login-heading">Login Page</h1>
      <div className="form">
        <form onSubmit={formSubmitHandler}>
          <div className="formElement">
            <label for="username">Name : </label>
            <br />
            <input id="username" onChange={usernameChangeHandler} />
          </div>
          <br />
          <div className="formElement">
            <label for="password">Password : </label>
            <br />
            <input
              type="password"
              id="password"
              onChange={passwordChangeHandler}
            />
          </div>
          <br />
          <button type="submit" className="sachin">
            Submit
          </button>
          <p className="error-msg">{error}</p>
        </form>
      </div>
    </>
  );
};
