let timerSeconds = 25 * 60;
let timerInterval = null;

function updateTimerDisplay() {
    let minutes = Math.floor(timerSeconds / 60);
    let seconds = timerSeconds % 60;

    document.getElementById("timerDisplay").textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

function startTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(function() {

        if (timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Study session completed! 🎉");
        }

    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    timerSeconds = 25 * 60;

    updateTimerDisplay();
}

updateTimerDisplay();
// ===============================
// StudentHub - Application Logic
// ===============================


// ---------- LOAD DATA ----------

let tasks = JSON.parse(
    localStorage.getItem("studenthub_tasks")
) || [];

let subjects = JSON.parse(
    localStorage.getItem("studenthub_subjects")
) || [
    {
        name: "Artificial Intelligence & ML",
        code: "AIML",
        progress: 70
    },
    {
        name: "Operating Systems",
        code: "OS",
        progress: 50
    },
    {
        name: "Embedded Systems",
        code: "ERSO",
        progress: 40
    }
];


// ---------- SAVE DATA ----------

function saveData() {

    localStorage.setItem(
        "studenthub_tasks",
        JSON.stringify(tasks)
    );

    localStorage.setItem(
        "studenthub_subjects",
        JSON.stringify(subjects)
    );
}


// ---------- START STUDY ----------

function startStudying() {

    document.getElementById("tasks").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("taskInput").focus();
}


// ---------- ADD TASK ----------

function addTask() {

    const input =
        document.getElementById("taskInput");

    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";

    saveData();
    renderTasks();
}


// ---------- DISPLAY TASKS ----------

function renderTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li =
            document.createElement("li");

        li.innerHTML = `
            <label>
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})"
                >

                <span class="${
                    task.completed
                    ? "completed-task"
                    : ""
                }">
                    ${task.text}
                </span>
            </label>

            <button
                onclick="deleteTask(${index})"
                style="
                    float:right;
                    border:none;
                    background:none;
                    cursor:pointer;
                "
            >
                🗑️
            </button>
        `;

        taskList.appendChild(li);
    });

    updateTaskCount();
    updateProgress();
}


// ---------- COMPLETE TASK ----------

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveData();
    renderTasks();
}


// ---------- DELETE TASK ----------

function deleteTask(index) {

    tasks.splice(index, 1);

    saveData();
    renderTasks();
}


// ---------- TASK COUNT ----------

function updateTaskCount() {

    document.getElementById("taskCount").textContent =
        tasks.length;
}


// ---------- PROGRESS ----------

function updateProgress() {

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    let progress = 0;

    if (tasks.length > 0) {

        progress =
            Math.round(
                (completed / tasks.length) * 100
            );
    }

    document.getElementById("progressValue")
        .textContent = progress + "%";
}


// ---------- ADD SUBJECT ----------

function addSubject() {

    const name =
        prompt("Enter subject name:");

    if (!name || name.trim() === "") {
        return;
    }

    subjects.push({
        name: name.trim(),
        code: "NEW",
        progress: 0
    });

    saveData();
    renderSubjects();
}


// ---------- DISPLAY SUBJECTS ----------

function renderSubjects() {

    const subjectList =
        document.getElementById("subjectList");

    subjectList.innerHTML = "";

    subjects.forEach(function(subject) {

        const card =
            document.createElement("div");

        card.className = "subject-card";

        card.innerHTML = `
            <h3>${subject.name}</h3>

            <p>${subject.code}</p>

            <div class="bar">
                <div
                    style="width:${subject.progress}%"
                ></div>
            </div>

            <span>
                ${subject.progress}% completed
            </span>
        `;

        subjectList.appendChild(card);
    });

    updateSubjectCount();
}


// ---------- SUBJECT COUNT ----------

function updateSubjectCount() {

    document.getElementById("subjectCount")
        .textContent = subjects.length;
}


// ---------- DARK MODE ----------

const themeButton =
    document.getElementById("themeButton");

themeButton.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark-mode"
        );

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            themeButton.textContent = "☀️";

            localStorage.setItem(
                "studenthub_theme",
                "dark"
            );

        } else {

            themeButton.textContent = "🌙";

            localStorage.setItem(
                "studenthub_theme",
                "light"
            );
        }
    }
);


// ---------- LOAD THEME ----------

if (
    localStorage.getItem(
        "studenthub_theme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

    themeButton.textContent = "☀️";
}


// ---------- INITIALIZE APP ----------

renderTasks();
renderSubjects();
