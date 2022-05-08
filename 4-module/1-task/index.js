  function makeFriendsList(friends) {
    let ul = document.createElement('ul');
    for (let user of friends){
      ul.insertAdjacentHTML('beforeEnd',`<li>${user.firstName} ${user.lastName}</li>`)
    }
    return ul
  }
