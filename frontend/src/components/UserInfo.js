import React from "react";

const UserInfo = ({ userInfo }) => {
  return (
    <div className="user-info">
      <p><strong>Total Clicks:</strong> {userInfo.totalClicks}</p>
      <p><strong>Total Points:</strong> {userInfo.totalPoints}</p>
      <p><strong>Prizes Won:</strong> {userInfo.prizesWon}</p>
    </div>
  );
};

export default UserInfo;
