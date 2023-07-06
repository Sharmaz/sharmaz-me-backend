const  { v4 } = require('uuid');

class UsersService {
  constructor() {
    this.users = [];
  }

  create(data) {
    const newUser = {
      id: v4(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(userId) {
    return this.users.find((user) => user.id === userId);
  }

  update(userId, changes) {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const user = this.users[userIndex];
    this.users[userIndex] = {
      ...user,
      ...changes
    };

    return this.users[userIndex];
  }

  delete(userId) {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users.splice(userIndex, 1);
    return { userId };
  }
}

module.exports = UsersService;
