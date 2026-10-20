
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => console.log("Service Worker działa"))
            .catch(error => console.error(error));
    });
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    installBtn.hidden = true;
});

window.addEventListener("appinstalled", () => {
    installBtn.hidden = true;
    deferredPrompt = null;
});
