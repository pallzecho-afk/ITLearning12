/* =========================
   OPENING ANIMATION
========================= */

window.addEventListener("load", () => {

    const intro = document.getElementById("intro");

    setTimeout(() => {

        intro.classList.add("hide");

    }, 2300);

});


/* =========================
   LOGIN SYSTEM
========================= */

const pinInputs = document.querySelectorAll(".pin-input");

const unlockBtn = document.getElementById("unlockBtn");

const message = document.getElementById("message");


/* =========================
   SECRET PIN
========================= */

/* GANTI PIN DI SINI */

const SECRET_CODE = "12908";


/* =========================
   PIN INPUT
========================= */

pinInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        /* HANYA ANGKA */

        input.value = input.value.replace(/[^0-9]/g, "");


        /* PINDAH KE KOLOM BERIKUTNYA */

        if (
            input.value !== "" &&
            index < pinInputs.length - 1
        ) {

            pinInputs[index + 1].focus();

        }

    });


    /* BACKSPACE */

    input.addEventListener("keydown", (event) => {

        if (
            event.key === "Backspace" &&
            input.value === "" &&
            index > 0
        ) {

            pinInputs[index - 1].focus();

        }

    });


    /* TOMBOL PANAH */

    input.addEventListener("keydown", (event) => {

        if (
            event.key === "ArrowLeft" &&
            index > 0
        ) {

            pinInputs[index - 1].focus();

        }


        if (
            event.key === "ArrowRight" &&
            index < pinInputs.length - 1
        ) {

            pinInputs[index + 1].focus();

        }

    });

});


/* =========================
   CHECK LOGIN
========================= */

function checkLogin() {

    let enteredCode = "";


    /* GABUNGKAN SEMUA PIN */

    pinInputs.forEach(input => {

        enteredCode += input.value;

    });


    /* CEK APAKAH LENGKAP */

    if (
        enteredCode.length !==
        pinInputs.length
    ) {

        message.style.color = "#c94b4b";

        message.textContent =
            "Masukkan semua PIN terlebih dahulu.";

        return;

    }


    /* PIN BENAR */

    if (
        enteredCode === SECRET_CODE
    ) {

        message.style.color =
            "#2d8a57";

        message.textContent =
            "PIN benar! Membuka dashboard...";


        /* DISABLE BUTTON */

        unlockBtn.disabled = true;


        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 800);


    }


    /* PIN SALAH */

    else {

        message.style.color =
            "#c94b4b";

        message.textContent =
            "PIN yang kamu masukkan salah.";


        /* KOSONGKAN PIN */

        pinInputs.forEach(input => {

            input.value = "";

        });


        /* FOKUS KE PIN PERTAMA */

        pinInputs[0].focus();

    }

}


/* =========================
   BUTTON MASUK
========================= */

unlockBtn.addEventListener(
    "click",
    checkLogin
);


/* =========================
   ENTER KEY
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            checkLogin();

        }

    }
);


/* =========================
   FOCUS PERTAMA
========================= */

pinInputs[0].focus();