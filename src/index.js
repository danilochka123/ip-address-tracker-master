import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { addTileLayer, validateIp } from "./helpers";

const btn = document.querySelector(".search-bar__btn");
const input = document.querySelector(".search-bar__input");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});
addTileLayer(map);
const mapIcon = L.icon({
    iconUrl: "../images/icon-location.svg",
    iconSize: [60, 70],
});
L.marker([51.505, -0.09], { icon: mapIcon }).addTo(map);

btn.addEventListener("click", getData);
input.addEventListener("keydown", handleKey);

function getData() {
    if (validateIp(input.value)) {
        fetch(`
        https://geo.ipify.org/api/v2/country,city?apiKey=at_vD3fUk3VbnCY2ZK06UxwDwNU02yPI&ipAddress=${input.value}
        `)
            .then((response) => response.json())
            .then((response) => setInfo(response));
    }
}

function handleKey(event) {
    if (event.key === "Enter") {
        getData();
    }
}

function setInfo({ ip, location, isp }) {
    const { lat, lng } = location;

    ipInfo.textContent = ip;
    locationInfo.textContent = `${location.region}, ${location.country}`;
    timezoneInfo.textContent = `UTS${location.timezone}`;
    ispInfo.textContent = `${isp}`;

    map.setView([lat, lng]);
    L.marker([lat, lng], { icon: mapIcon }).addTo(map);
}
