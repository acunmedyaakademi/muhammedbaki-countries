let countries = [];
let id = 0;
if (localStorage.countries) {
  countries = JSON.parse(localStorage.countries);
  renderCountries();
}
if (localStorage.id) {
  id = Number(localStorage.id);
}
function generateId() {
  id++;
  localStorage.id = id;
  return id;
}
addcountrieBtn.addEventListener("click", () => {
  document.querySelector('input[name="id"]').value = "";
  modal.classList.remove("editModal");
  modal.showModal();
});

function handleCountrieForm() {
  let formData = new FormData(addCountrieForm);
  let formObj = Object.fromEntries(formData);
  addCountrieForm.reset();


  if (formObj.id !== "") {
    let countrie = countries.find((x) => x.id === Number(formObj.id));
    countrie.countryName = formObj.countryName;
    countrie.population = formObj.population;
    countrie.flag = formObj.flag;
    countrie.famousFood = formObj.famousFood;
    countrie.capitalCity = formObj.capitalCity;
  } else {
    formObj.id = generateId();
    countries.push(formObj);
  }

  save();
  renderCountries();
}

addCountrieForm.addEventListener("submit", handleCountrieForm);

function save() {
  localStorage.countries = JSON.stringify(countries);
}
function createCountrieHtml(count) {
  return `<div class="count-item">
        
        <h3><img src="https://flagsapi.com/${count.flag}/shiny/64.png"> <span>${count.countryName}</span></h3>
        <p>Nüfus:${count.population}</p>
        <p>Başkent: ${count.capitalCity}</p>
        <p>Meşhur Yemeği: ${count.famousFood}</p>
        <div class="countEditControls">
          <a class="countEditBtn" href="#" data-countid="${count.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
          </a>
          <a class="countDeleteBtn" href="#" data-countid="${count.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
          </a>
        </div>
      </div>`;
}
function handleDeleteBtn(e) {
  e.preventDefault();
  if (!confirm("Emin misin?")) {
    return;
  }
  countries = countries.filter((x) => x.id !== Number(this.dataset.countid));
  save();
  renderCountries();
}

function handleEditBtn(e) {
  e.preventDefault();

  modal.classList.add("editModal");
  let countId = Number(this.dataset.countid); 
  let count = countries.find((x) => x.id === countId);

  document.querySelector('input[name="id"]').value = count.id;
  document.querySelector('input[name="countryName"]').value = count.countryName;
  document.querySelector('input[name="population"]').value = count.population;
  document.querySelector('input[name="flag"]').value = count.flag;
  document.querySelector('input[name="famousFood"]').value = count.famousFood;
  document.querySelector('input[name="capitalCity"]').value = count.capitalCity;

  modal.showModal(); 
}



function renderCountries() {
  countriesContainer.innerHTML = countries.map((x) => createCountrieHtml(x)).join("");
  document
    .querySelectorAll(".countDeleteBtn")
    .forEach((x) => x.addEventListener("click", handleDeleteBtn)); 
  document 
    .querySelectorAll(".countEditBtn")
    .forEach((x) => x.addEventListener("click", handleEditBtn));
}
