function namify(users) {
  let myUsers = users;
  for (let i = 0; i < myUsers.length; i++) {
    let user = myUsers[i];
    users.splice(i, 1, user.name);
  }
  return users;
}
