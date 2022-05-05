function showSalary(users, age) {
  let newData = users.filter((user) => {
    return user.age <= age;
  });
  let name = newData.map((user) => {
    return `${user.name}, ${user.balance}`;
  });
  let formName = name.join("\n");
  return formName;
}
