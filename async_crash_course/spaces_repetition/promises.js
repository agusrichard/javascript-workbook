// async function getUsers() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   const users = await response.json();

//   let output = '';
//   users.forEach(user => {
//     output += `<li>${user.name} --- ${user.email}</li>`;
//   });

//   document.body.innerHTML = output;
// }