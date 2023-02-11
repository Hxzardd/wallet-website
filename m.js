const sleep = e => new Promise(a => setTimeout(a, e)),
    alerts = document.querySelector(".alerts");

function makeAlert(e, a, t) {
    let s = Object.assign(document.createElement("div"), {
        className: "alert"
    });
    return s.appendChild(Object.assign(document.createElement("i"), {
        className: e,
        style: a
    })), s.appendChild(Object.assign(document.createElement("p"), {
        innerHTML: t
    })), s
}
async function copy(e) {
    navigator.clipboard.writeText(e);
    let a = makeAlert("fa-regular fa-circle-check", "color: #9bfa9b", "Copied to clipboard.");
    alerts.appendChild(a), Array.from(alerts.childNodes).indexOf(a), a.animate([{
        opacity: 0,
        offset: 0
    }], {
        duration: 200
    }), await sleep(2e3), a.animate([{
        opacity: 0,
        offset: 1
    }], {
        duration: 200
    }), await sleep(200), a.style.height = 0, a.style.opacity = 0, await sleep(200), alerts.removeChild(a)
}
const ageDisplay = document.querySelector(".age"),
    birth = new Date(atob("MjIgQXVnIDIwMDQgMDA6MDA6MDAgR01UKzA1OjMw"));

function det() {
    let e = new Date;
    return ((e - birth) / 1e3 / 60 / 60 / 24 / 365).toFixed(9)
}
async function updateAge() {
    for (;;) ageDisplay.innerHTML = det(), await sleep(20)
}
updateAge();
const wrapper = document.querySelector(".wrapper"),
    r = new XMLHttpRequest;
r.open("GET", "https://api.lanyard.rest/v1/users/1004926748170915923"), r.send(), r.addEventListener("load", () => {
    let e = JSON.parse(r.responseText);
    if (e.success && e.data.listening_to_spotify) {
        console.log(e);
        let a = Object.assign(document.createElement("div"), {
            className: "listening",
            innerHTML: `<div class="listening-container"><i class="fa-brands fa-spotify"></i><p>Listening to <span class="title">${e.data.spotify.song}</span> by <span class="artist">${e.data.spotify.artist.replaceAll(";",",")}</span></p></div>`
        });
        document.body.appendChild(a)
    }
});