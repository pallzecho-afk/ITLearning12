const quizHome = document.getElementById("quizHome");
const quizArea = document.getElementById("quizArea");
const resultArea = document.getElementById("resultArea");

const categoryCards = document.querySelectorAll(".category-card");
const countButtons = document.querySelectorAll(".count-btn");

const startQuiz = document.getElementById("startQuiz");

const questionNumber = document.getElementById("questionNumber");
const progressFill = document.getElementById("progressFill");
const currentScore = document.getElementById("currentScore");

const questionCategory = document.getElementById("questionCategory");
const questionText = document.getElementById("questionText");

const answerOptions = document.getElementById("answerOptions");
const nextQuestion = document.getElementById("nextQuestion");

const finalScore = document.getElementById("finalScore");
const totalScore = document.getElementById("totalScore");

const resultMessage = document.getElementById("resultMessage");
const resultDescription = document.getElementById("resultDescription");

const playAgain = document.getElementById("playAgain");
const backHome = document.getElementById("backHome");


let selectedCategory = "all";
let selectedCount = 20;

let quizQuestions = [];

let currentQuestionIndex = 0;
let score = 0;

let answered = false;


/* =====================
   CATEGORY
===================== */

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        categoryCards.forEach(item => {
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedCategory = card.dataset.category;

    });

});


/* =====================
   QUESTION COUNT
===================== */

countButtons.forEach(button => {

    button.addEventListener("click", () => {

        countButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedCount = Number(button.dataset.count);

    });

});


/* =====================
   SHUFFLE ARRAY
===================== */

function shuffle(array) {

    return [...array].sort(() => Math.random() - 0.5);

}


/* =====================
   START QUIZ
===================== */

startQuiz.addEventListener("click", () => {

    let availableQuestions;


    if (selectedCategory === "all") {

        availableQuestions = [...questionBank];

    } else {

        availableQuestions =
            questionBank.filter(question =>
                question.category === selectedCategory
            );

    }


    if (availableQuestions.length === 0) {

        alert(
            "Soal untuk kategori ini belum tersedia."
        );

        return;

    }


    const shuffledQuestions =
        shuffle(availableQuestions);


    quizQuestions =
        shuffledQuestions.slice(
            0,
            Math.min(
                selectedCount,
                shuffledQuestions.length
            )
        );


    currentQuestionIndex = 0;

    score = 0;

    currentScore.textContent = score;


    quizHome.classList.add("hidden");

    quizArea.classList.remove("hidden");


    showQuestion();

});


/* =====================
   SHOW QUESTION
===================== */

function showQuestion() {

    answered = false;

    nextQuestion.disabled = true;


    const currentQuestion =
        quizQuestions[currentQuestionIndex];


    questionNumber.textContent =
        `Soal ${currentQuestionIndex + 1} / ${quizQuestions.length}`;


    const progress =
        ((currentQuestionIndex) /
        quizQuestions.length) * 100;


    progressFill.style.width =
        `${progress}%`;


    questionCategory.textContent =
        currentQuestion.category.toUpperCase();


    questionText.textContent =
        currentQuestion.question;


    answerOptions.innerHTML = "";


    const letters =
        ["A", "B", "C", "D"];


    currentQuestion.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.classList.add(
                "answer-btn"
            );


            button.innerHTML = `

                <span class="answer-letter">
                    ${letters[index]}
                </span>

                <span>
                    ${answer}
                </span>

            `;


            button.addEventListener(
                "click",
                () => selectAnswer(
                    button,
                    index
                )
            );


            answerOptions.appendChild(
                button
            );

        }
    );

}


/* =====================
   SELECT ANSWER
===================== */

function selectAnswer(
    selectedButton,
    selectedIndex
) {

    if (answered) return;


    answered = true;


    const currentQuestion =
        quizQuestions[currentQuestionIndex];


    const allButtons =
        document.querySelectorAll(
            ".answer-btn"
        );


    allButtons.forEach(
        (button, index) => {

            button.classList.add(
                "disabled"
            );


            if (
                index ===
                currentQuestion.correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selectedIndex ===
        currentQuestion.correct
    ) {

        score++;

        currentScore.textContent =
            score;

    } else {

        selectedButton.classList.add(
            "wrong"
        );

    }


    nextQuestion.disabled = false;

}


/* =====================
   NEXT QUESTION
===================== */

nextQuestion.addEventListener(
    "click",
    () => {

        currentQuestionIndex++;


        if (
            currentQuestionIndex <
            quizQuestions.length
        ) {

            showQuestion();

        } else {

            showResult();

        }

    }
);


/* =====================
   SHOW RESULT
===================== */

function showResult() {

    quizArea.classList.add("hidden");

    resultArea.classList.remove("hidden");


    finalScore.textContent =
        score;


    totalScore.textContent =
        quizQuestions.length;


    const percentage =
        (score /
        quizQuestions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Sempurna! 🔥";

        resultDescription.textContent =
            "Hebat! Semua jawaban kamu benar.";

    }

    else if (percentage >= 80) {

        resultMessage.textContent =
            "Sangat Bagus! 🎉";

        resultDescription.textContent =
            "Pengetahuan IT kamu sudah sangat baik.";

    }

    else if (percentage >= 60) {

        resultMessage.textContent =
            "Bagus! 👍";

        resultDescription.textContent =
            "Terus belajar agar hasilnya semakin baik.";

    }

    else {

        resultMessage.textContent =
            "Tetap Semangat! 💪";

        resultDescription.textContent =
            "Coba pelajari kembali materi ITLearn.";

    }


    progressFill.style.width = "100%";

}


/* =====================
   PLAY AGAIN
===================== */

playAgain.addEventListener(
    "click",
    () => {

        resultArea.classList.add(
            "hidden"
        );

        quizHome.classList.remove(
            "hidden"
        );

    }
);


/* =====================
   BACK HOME
===================== */

backHome.addEventListener(
    "click",
    () => {

        resultArea.classList.add(
            "hidden"
        );

        quizHome.classList.remove(
            "hidden"
        );

    }
);