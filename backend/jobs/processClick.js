const db = require("../models/db");

const processClick = async (userId) => {
  const [rows] = await db.query("SELECT * FROM users WHERE userId = ?", [userId]);

  let user;
  if (rows.length > 0) {
    user = rows[0];
    await db.query("UPDATE users SET totalClicks = totalClicks + 1 WHERE userId = ?", [userId]);
  } else {
    await db.query("INSERT INTO users (userId, totalClicks) VALUES (?, ?)", [userId, 1]);
    user = { userId, totalClicks: 1, totalPoints: 0, prizesWon: 0 };
  }

  const random = Math.random();
  let reward = null;

  if (random <= 0.5) {
    user.totalPoints += 10;
    reward = "10 Points";
    await db.query("UPDATE users SET totalPoints = totalPoints + 10 WHERE userId = ?", [userId]);
  } else if (random <= 0.75) {
    user.prizesWon += 1;
    reward = "Generic Prize";
    await db.query("UPDATE users SET prizesWon = prizesWon + 1 WHERE userId = ?", [userId]);
  }

  const [updatedUser] = await db.query("SELECT * FROM users WHERE userId = ?", [userId]);

  return {
    totalClicks: updatedUser[0].totalClicks,
    totalPoints: updatedUser[0].totalPoints,
    prizesWon: updatedUser[0].prizesWon,
    reward,
  };
};

module.exports = processClick;
