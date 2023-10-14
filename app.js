const urlCity = (city) => {
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=0eee845fbfb08dcc0204fcb70613dc4a&units=metric`;

  fetch(url)
    .then((response) =>
      response.json().then((data) => {
        console.log(data);
        document.querySelector("#country").innerHTML = data.city.country;
        document.querySelector("#city").innerHTML = data.city.name;
        let tmp = '';
        for (const index of data.list) {
          let dateSansLesHeures = index.dt_txt.split(' ');
          if (dateSansLesHeures[0] !== tmp) {
            tmp = dateSansLesHeures[0];
            document.querySelector("main").innerHTML += `
            <article class="card">
                <time>Date : ${dateSansLesHeures[0]}</time>
                <p>Min : ${index.main.temp_min}°</p>
                <p>Max : ${index.main.temp_max}°</p>
            </article>`;
          }
          
        }
      })
    )
    .catch((error) => console.log("Error : " + error));
};

let searchCity = document.querySelector("#searchCity");
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  urlCity(searchCity.value);
  searchCity.value = "";
});