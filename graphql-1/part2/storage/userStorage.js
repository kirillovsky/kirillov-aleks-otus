module.exports = new (class {
  constructor() {
    this.users = [
      {
        id: 1,
        login: "Kirillov A",
        passwordHash: "TestHash",
        avatar: {
          width: 100,
          height: 100,
          url: "https://tinyurl.com/yaktzu5h"
        },
        email: "somebody@gmail.com",
        fullName: "Kirillov A. V",
        address: "Big address string"
      }
    ]
  }

  get(id) {
    const result = this.users.filter(({ id: userId }) => userId === id)[0];

    return result ?
      Promise.resolve(result) :
      Promise.reject(`Not found user with id - ${id}`);
  }

  create(user) {
    const result = {
      id: this.users.length + 1,
      ...user
    };
    this.users.push(result);

    return Promise.resolve(result);
  }
})();