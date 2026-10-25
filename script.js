
const searchInput = document.getElementById("searchInput");
const countryCardsContainer = document.getElementById("country-cards-container");
const regionSelect = document.getElementById("regionSelect");
const populationInput = document.getElementById("populationInput");
const showMoreButton = document.getElementById("showMoreBtn");
const previousBtn = document.getElementById("previousBtn");

const countriesPerPage = 12;
let filteredCountries = [];
let currentPage = 0;

function populateCountryCards() {
    countryCardsContainer.innerHTML = "";

    const start = currentPage * countriesPerPage;
    const end = start + countriesPerPage;
    const countriesToShow = filteredCountries.slice(start, end);

    if (filteredCountries.length === 0) {
        countryCardsContainer.innerHTML =
            "<p>No countries found.</p>";
    }

    countriesToShow.forEach(country => {
        const card = document.createElement("div");
        card.className = "country-card";

        const name = country.name.common;
        const capital = country.capital?.[0] || "N/A";
        const region = country.region || "N/A";
        const population = country.population || 0;
        const flag = country.flags?.svg || country.flags?.png || "";

        card.innerHTML = `
            <img src="${flag}" alt="Flag of ${name}">
            <h2>${name}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Population:</strong> ${population.toLocaleString()}</p>
        `;

        countryCardsContainer.appendChild(card);
    });

    showMoreButton.style.display =
        end < filteredCountries.length ? "inline-block" : "none";

    previousBtn.style.display =
        currentPage > 0 ? "inline-block" : "none";
}

function filterData() {
    const nameValue = searchInput.value.trim().toLowerCase();
    const selectedRegion = regionSelect.value;
    const populationValue = populationInput.value.trim() === ""
        ? Infinity
        : Number(populationInput.value);

    filteredCountries = data.filter(country => {
        const commonName = country.name.common.toLowerCase();
        const officialName = country.name.official.toLowerCase();

        const matchesName =
            commonName.includes(nameValue) ||
            officialName.includes(nameValue);

        const matchesRegion =
            selectedRegion === "All Regions" ||
            country.region === selectedRegion;

        const matchesPopulation =
            country.population <= populationValue;

        return matchesName && matchesRegion && matchesPopulation;
    });

    currentPage = 0;
    populateCountryCards();
}

searchInput.addEventListener("input", filterData);
regionSelect.addEventListener("change", filterData);
populationInput.addEventListener("input", filterData);

showMoreButton.addEventListener("click", () => {
    currentPage++;
    populateCountryCards();
});

previousBtn.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        populateCountryCards();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    filteredCountries = data;
    populateCountryCards();
});
