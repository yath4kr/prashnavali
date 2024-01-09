import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [userid, setUserid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const uid = window.localStorage.getItem("userid");
    if (!uid) {
      navigate("/login");
    }
    setter();
  }, []);

  const setter = async () => {
    const uid = window.localStorage.getItem("userid");
    console.log(uid);
    setUserid(uid);
    console.log(userid);
    try {
      // const res = await axios.get(`http://localhost:8000/auth/fetch/${uid}`);
      const res = await axios.get(
        `https://prashnavali.onrender.com/auth/fetch/${uid}`
      );
      setName(res.data.details.username);
      setEmail(res.data.details.email);
      setScore(res.data.details.score);
      setTotal(res.data.details.total);
      console.log(res);
    } catch (err) {
      console.log("frontEnd Error");
      console.log(err);
    }
  };
  return (
    <>
      <h1 className="profile-page">Profile Details</h1>
      <div className="profile-main">
        <div className="dp"></div>
        <h1 className="profile-title">Hello Learner !</h1>
        <br />
        <h2>{name}</h2>
        <br />
        <h2>{email}</h2>
        <br />
        <h2>Your Score So far - {score}</h2>
        <br />
        <h2>Number of quizes in which you participated - {total}</h2>
      </div>
    </>
  );
};
