const posts = [
  {
    id: 1,
    title: 'Post One',
    body: 'This is post one'
  },
  {
    id: 2,
    title: 'Post Two',
    body: 'This is post two'
  },
  {
    id: 3,
    title: 'Post Three',
    body: 'This is post three'
  }
];

function getPosts() {
  setTimeout(() => {
    let output = '';
    posts.forEach(post => {
      output += `<li>${post.title}: ${post.body}</li>`;
    });

    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
}

createPost({id: 4, title: 'Post Four', body: 'This is post four'}, getPosts);



