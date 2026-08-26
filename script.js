/* =========================================
   ELEMENTS
========================================= */

const music = document.getElementById("music");

const playBtn = document.getElementById("playBtn");

const pauseBtn = document.getElementById("pauseBtn");

const introScreen =
    document.getElementById("introScreen");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const progressBar =
    document.getElementById("progressBar");

const progressBar2 =
    document.getElementById("progressBar2");

const currentTime =
    document.getElementById("currentTime");

const currentTime2 =
    document.getElementById("currentTime2");

const duration =
    document.getElementById("duration");

const duration2 =
    document.getElementById("duration2");

const wishLink =
    document.getElementById("wishLink");

const wishPopup =
    document.getElementById("wishPopup");

const closePopup =
    document.getElementById("closePopup");


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${secs}`;
}


/* =========================================
   PLAY MUSIC
========================================= */

async function startMusic() {

    try {

        await music.play();

        /*
         * Animate first screen away
         */

        introScreen.classList.add("playing");


        /*
         * Show birthday screen
         */

        setTimeout(() => {

            birthdayScreen.classList.add("active");

            /*
             * Scroll to the birthday content
             */

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 850);


        /*
         * Change play button
         */

        playBtn.textContent = "❚❚";

    }

    catch (error) {

        console.log(
            "Music could not start:",
            error
        );

        alert(
            "Please make sure music.mp3 is inside the same folder as index.html."
        );

    }

}


/* =========================================
   PLAY BUTTON
========================================= */

playBtn.addEventListener(
    "click",
    startMusic
);


/* =========================================
   PAUSE BUTTON
========================================= */

pauseBtn.addEventListener(
    "click",
    () => {

        if (music.paused) {

            music.play();

            pauseBtn.textContent = "❚❚";

        }
        else {

            music.pause();

            pauseBtn.textContent = "▶";

        }

    }
);


/* =========================================
   MUSIC LOADED
========================================= */

music.addEventListener(
    "loadedmetadata",
    () => {

        const time =
            formatTime(music.duration);

        duration.textContent = time;

        duration2.textContent = time;

    }
);


/* =========================================
   MUSIC PROGRESS
========================================= */

music.addEventListener(
    "timeupdate",
    () => {

        if (!music.duration) {
            return;
        }

        const percentage =
            (music.currentTime /
                music.duration) * 100;


        progressBar.style.width =
            percentage + "%";

        progressBar2.style.width =
            percentage + "%";


        const time =
            formatTime(music.currentTime);

        currentTime.textContent =
            time;

        currentTime2.textContent =
            time;

    }
);


/* =========================================
   PROGRESS CLICK
========================================= */

function seekMusic(event) {

    const rect =
        event.currentTarget.getBoundingClientRect();

    const clickPosition =
        event.clientX - rect.left;

    const percentage =
        clickPosition / rect.width;

    music.currentTime =
        percentage * music.duration;

}


/*
 * Both progress bars can control music
 */

document
    .querySelectorAll(".progress-container")
    .forEach(bar => {

        bar.addEventListener(
            "click",
            seekMusic
        );

    });


/* =========================================
   PREVIOUS
========================================= */

document
    .getElementById("prevBtn")
    .addEventListener(
        "click",
        () => {

            music.currentTime = 0;

        }
    );


document
    .getElementById("prevBtn2")
    .addEventListener(
        "click",
        () => {

            music.currentTime = 0;

        }
    );


/* =========================================
   NEXT
========================================= */

document
    .getElementById("nextBtn")
    .addEventListener(
        "click",
        () => {

            music.currentTime =
                music.duration;

        }
    );


document
    .getElementById("nextBtn2")
    .addEventListener(
        "click",
        () => {

            music.currentTime =
                music.duration;

        }
    );


/* =========================================
   SONG ENDED
========================================= */

music.addEventListener(
    "ended",
    () => {

        playBtn.textContent = "▶";

        pauseBtn.textContent = "▶";

    }
);


/* =========================================
   WISH POPUP
========================================= */

wishLink.addEventListener(
    "click",
    () => {

        wishPopup.classList.add("show");

    }
);


closePopup.addEventListener(
    "click",
    () => {

        wishPopup.classList.remove("show");

    }
);


/* =========================================
   CLOSE POPUP BY CLICKING OUTSIDE
========================================= */

wishPopup.addEventListener(
    "click",
    (event) => {

        if (
            event.target === wishPopup
        ) {

            wishPopup.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            wishPopup.classList.remove(
                "show"
            );

        }

    }
);
