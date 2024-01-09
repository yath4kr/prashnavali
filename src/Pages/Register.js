import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [email, setEmail] = useState();

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "https://prashnavali.onrender.com/auth/register",
        {
          email,
          password,
          username,
        }
      );
      alert("Successfully Created..!!");
      navigate("/");
    } catch (err) {
      setError("Something Went Wrong..!!");
    }
  };

  return (
    <>
      <div className="form">
        <form onSubmit={formSubmitHandler}>
          <div className="formElement">
            <label for="username">Name : </label>
            <br />
            <input id="username" onChange={usernameChangeHandler} />
          </div>
          <br />
          <div className="formElement">
            <label for="email">Email : </label>
            <br />
            <input type="email" id="email" onChange={emailChangeHandler} />
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
