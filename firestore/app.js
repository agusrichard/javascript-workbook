const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';
  
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  cafeList.appendChild(li);

  cross.addEventListener('click', (event) => {
    event.stopPropagation()
    let parentId = event.target.parentElement.getAttribute('data-id');
    db.collection('cafes').doc(parentId).delete();
  })
}

// db.collection('cafes').where('city', '==', 'Jakarta').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     renderCafe(doc)
//   });
// });


form.addEventListener('submit', (event) => {
  event.preventDefault();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value
  });

  form.name.value = '';
  form.city.value = '';
})

db.collection('cafes').onSnapshot(snapshot => {
  let changes = snapshot.docChanges()
  changes.forEach(change => {
    if (change.type == 'added') {
      console.log(change.doc);
      renderCafe(change.doc);
    } else if (change.type == 'removed') {
      let li = cafeList.querySelector(`[data-id=${change.doc.id}]`)
      cafeList.removeChild(li);
    }
  })
})