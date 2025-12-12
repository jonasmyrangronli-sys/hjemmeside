document.addEventListener("DOMContentLoaded", function () {
    const knapper = document.querySelectorAll("#nav button");
    const main = document.getElementById("main");

    const sider = {
        "startside": "startside.html",
        "ommeg": "ommeg.html",
        "interesse": "interesse.html",
        "kontaktinfo": "kontaktinfo.html",
        "innstillinger": "innstillinger.html"
    };

    async function lastInnSide(sideKey) {
        const sideFil = sider[sideKey];

        try {
            const response = await fetch(sideFil);
            if (!response.ok) throw new Error("Fant ikke filen");

            const html = await response.text();
            main.innerHTML = html;

            const loadedArticle = main.querySelector(".side");
            if (loadedArticle) loadedArticle.classList.add("aktiv");

            knapper.forEach(btn => {
                btn.classList.remove("aktiv");
                if (btn.getAttribute("data-side") === sideKey) {
                    btn.classList.add("aktiv");
                }
            });

            initFargevelger();
            initInteresseBytte();

        } catch (error) {
            main.innerHTML = `<p style="color:red;">Feil: ${error.message}</p>`;
        }
    }

    function initFargevelger() {
        const fargeKnapper = document.querySelectorAll(".fargevalg button");
        fargeKnapper.forEach(knapp => {
            const farge = knapp.getAttribute("data-farge");

            if (farge.includes("gradient")) {
                knapp.textContent = "Gradient";
                knapp.style.background = farge;
                knapp.style.color = "white";
                knapp.style.fontSize = "10px";
            } else {
                knapp.style.backgroundColor = farge;
                knapp.textContent = "";
            }

            knapp.onclick = () => {
                if (farge.includes("gradient")) {
                    document.body.style.backgroundImage = farge;
                    document.body.style.backgroundColor = "";
                } else {
                    document.body.style.backgroundImage = "";
                    document.body.style.backgroundColor = farge;
                }
                localStorage.setItem("valgtBakgrunn", farge);
            };
        });
    }

    function initInteresseBytte() {
        const fagKnapper = document.querySelectorAll(".fagknapp");
        fagKnapper.forEach(knapp => {
            knapp.addEventListener("click", () => {
                const maal = knapp.getAttribute("data-vis");

                document.getElementById("interesse").classList.remove("aktiv");
                document.getElementById("faglig").classList.remove("aktiv");

                document.getElementById(maal).classList.add("aktiv");
            });
        });
    }

    const lagret = localStorage.getItem("valgtBakgrunn");
    if (lagret) {
        if (lagret.includes("gradient")) {
            document.body.style.backgroundImage = lagret;
        } else {
            document.body.style.backgroundColor = lagret;
        }
    }

    knapper.forEach(knapp => {
        knapp.addEventListener("click", () => {
            const side = knapp.getAttribute("data-side");
            lastInnSide(side);
        });
    });

    lastInnSide("startside");
    initInteresseBytte();
});