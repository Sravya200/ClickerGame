import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./components/Button";
import UserInfo from "./components/UserInfo";

const App = () => {
  const [userId] = useState("user1"); // Hardcoded user ID for simplicity
  const [userInfo, setUserInfo] = useState(null);
  const [rewardMessage, setRewardMessage] = useState("");

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/click", { userId });
      setRewardMessage(response.data.reward || "No reward this time.");
      setUserInfo({
        totalClicks: response.data.totalClicks,
        totalPoints: response.data.totalPoints,
        prizesWon: response.data.prizesWon,
      });
    } catch (error) {
      console.error("Error processing click:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="app">
      <h1>Clicker Game</h1>
      {userInfo ? (
        <UserInfo userInfo={userInfo} />
      ) : (
        <p>Loading user info...</p>
      )}
      <Button onClick={handleButtonClick} />
      {rewardMessage && <p>{rewardMessage}</p>}
    </div>
  );
};

export default App;
