function loadJsonData(url, user) {
  document.querySelector('.modal').classList.add('is-active');

  fetch(`${url}${user}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      document.querySelector('.message-body').innerHTML = JSON.stringify(res);
      document.querySelector('.modal').classList.add('is-active');
    })
    .catch((error) => console.log(error));
}

function closeModal() {
  document.querySelector('.modal').classList.remove('is-active');
}
