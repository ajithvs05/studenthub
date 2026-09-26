// ===============================
// StudentHub JavaScript
// ===============================


// ---------- START STUDY ----------

function startStudying() {
    document.getElementById("tasks").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("taskInput").focus();
}


// ---------- ADD TASK ----------

function addTask() {

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox" onchange="updateProgress()">
            ${taskText}
        </label>
    `;

    taskList.appendChild(li);

    input.value = "";

    updateTaskCount();
    updateProgress();
}


// ---------- TASK COUNT ----------

function updateTaskCount() {

    const tasks = document.querySelectorAll("#taskList li");

    document.getElementById("taskCount").textContent =
        tasks.length;
}


// ---------- PROGRESS ----------

function updateProgress() {

    const tasks = document.querySelectorAll("#taskList li");
    const completed = document.querySelectorAll(
        "#taskList input[type='checkbox']:checked"
    );

    let progress = 0;

    if (tasks.length > 0) {
        progress = Math.round(
            (completed.length / tasks.length) * 100
        );
    }

    document.getElementById("progressValue").textContent =
        progress + "%";
}


// ---------- ADD SUBJECT ----------

function addSubject() {

    const subjectName = prompt(
        "Enter subject name:"
    );

    if (!subjectName || subjectName.trim() === "") {
        return;
    }

    const subjectList =
        document.getElementById("subjectList");

    const card =
        document.createElement("div");

    card.className = "subject-card";

    card.innerHTML = `
        <h3>${subjectName}</h3>
        <p>New Subject</p>

        <div class="bar">
            <div style="width: 0%"></div>
        </div>

        <span>0% completed</span>
    `;

    subjectList.appendChild(card);

    updateSubjectCount();
}


// ---------- SUBJECT COUNT ----------

function updateSubjectCount() {

    const subjects =
        document.querySelectorAll(
            "#subjectList .subject-card"
        );

    document.getElementById("subjectCount").textContent =
        subjects.length;
}


// ---------- DARK MODE ----------

const themeButton =
    document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains("dark-mode")
    ) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }

});
