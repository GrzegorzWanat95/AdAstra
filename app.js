const stars = []; // array to store all the star objects

function addStar() {
  const name = document.getElementById("name").value;
  const coordinates = document.getElementById("coordinates").value;
  const description = document.getElementById("description").value;
  const id = stars.length + 1; // generate unique ID based on array length
  
  const star = {
    id,
    name,
    coordinates,
    description,
  };
  
  stars.push(star); // add star object to array
  displayStars(); // update the display
}

function editStar(id) {
  const index = stars.findIndex(star => star.id === id); // find index of star with matching ID
  const star = stars[index]; // get the star object
  
  // prompt user for new values and update star object
  star.name = prompt(`Enter new name for ${star.name}:`, star.name);
  star.coordinates = prompt(`Enter new coordinates for ${star.name}:`, star.coordinates);
  star.description = prompt(`Enter new description for ${star.name}:`, star.description);
  
  displayStars(); // update the display
}

function deleteStar(id) {
  const index = stars.findIndex(star => star.id === id); // find index of star with matching ID
  stars.splice(index, 1); // remove star object from array
  displayStars(); // update the display
}

function displayStars() {
  const starList = document.getElementById("stars");
  starList.innerHTML = ""; // clear the star list
  
  // loop through the array of stars and add them to the list
  stars.forEach(star => {
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const coordinatesCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const editCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    idCell.textContent = star.id;
    nameCell.textContent = star.name;
    coordinatesCell.textContent = star.coordinates;
    descriptionCell.textContent = star.description;
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-warning", "mx-2");
    editButton.addEventListener("click", () => editStar(star.id));
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => deleteStar(star.id));

    editCell.appendChild(editButton);
    deleteCell.appendChild(deleteButton);
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(coordinatesCell);
    row.appendChild(descriptionCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    starList.appendChild(row);
});
}

document.getElementById("add-star").addEventListener("click", addStar); // add event listener to "Add Star" button
displayStars(); // initially display all the stars in the list