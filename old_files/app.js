document.addEventListener('DOMContentLoaded', () => {
  const starList = document.getElementById('stars');
  const starForm = document.getElementById('star-form');

  // funkcja dodająca gwiazdę do listy
  const addStar = (id, name, coordinates, description) => {
    const row = `
      <tr data-id="${id}">
        <td>${id}</td>
        <td>${name}</td>
        <td>${coordinates}</td>
        <td>${description}</td>
        <td><button class="btn btn-danger delete-star">Usuń</button></td>
      </tr>
    `;
    starList.insertAdjacentHTML('beforeend', row);
  };

  // obsługa przycisku "Dodaj"
  starForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const coordinates = document.getElementById('coordinates').value;
    const description = document.getElementById('description').value;

    fetch('/stars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, coordinates, description }),
    })
      .then(response => response.json())
      .then(data => {
        const { id, name, coordinates, description } = data;
        addStar(id, name, coordinates, description);
      })
      .catch(error => console.error(error+'1'));

    // reset formularza
    starForm.reset();
  });

  // funkcja usuwająca gwiazdę z listy
  const deleteStar = (id) => {
    const row = document.querySelector(`[data-id='${id}']`);
    row.remove();
  };

  // obsługa przycisku "Usuń"
  starList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-star')) {
      const id = event.target.parentNode.parentNode.dataset.id;
      fetch(`/stars/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          const { id } = data;
          deleteStar(id);
        })
        .catch(error => console.error(error));
    }
  });

  // funkcja wczytująca gwiazdy na liście
  const loadStars = () => {
    fetch('/stars')
      .then(response => response.json())
      .then(data => {
        data.forEach(star => {
          addStar(star.id, star.name, star.coordinates, star.description);
        });
      })
      .catch(error => console.error(error));
  };

  // wczytanie gwiazd na start
  loadStars();
});
