const fs = require('fs');
const first = [];
const second = [];
const users = [];

// Returns the data via a callback
function fileRead(callback) {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(data);
  });
}

// Function to add a new user to the users array
function getUsers() {
  fileRead((data) => {
    const jsonUsers = JSON.parse(data);
    try {
      jsonUsers.forEach((jsonUser) => {
        const user = {
          userName: jsonUser.userName,
          passWord: jsonUser.passWord,
        };
        first.push(user.userName);
        second.push(user.passWord);
      });
    } catch (error) {
      console.log("Hata getUsers'de",error);
    }
  });
}

// Join user to chat
function userJoin(id, username, password, room) {
  for (let uName of first) {
    for (let pWord of second) {
      if (uName === username && pWord === password) {
        const user = { id, username, room };
        users.push(user);
        return user;
      }
    }
  }
  getUsers(username, password);
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getUsers,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
