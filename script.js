const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

let taskId = 1;

function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskItem = document.createElement('li');

        taskItem.innerHTML = `
            <span>${taskText}</span>
            <input type="checkbox" class="task-Done">
            <p id="text">Task incomplete</p>
            <br>
            <button class="del-btn">Delete</button>
            <button class="edit-btn">Edit</button>
            <br>
            <br>
        `;

        taskList.append(taskItem);

        taskInput.value = "";
        taskId++;
        
        const delBtn = taskItem.querySelector('.del-btn');
        delBtn.addEventListener('click', delTask);

        const editBtn = taskItem.querySelector('.edit-btn');
        editBtn.addEventListener('click', editTask);

        const checkBox = taskItem.querySelector('.task-Done');
        checkBox.addEventListener('change', taskDone);
        
        taskCount();
    
    }
}

function delTask(event) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
    
    taskCount();
}

function editTask(event) {
    const taskItem = event.target.parentElement;
    const span = taskItem.querySelector('span');

    const input = document.createElement('input');

    input.type = 'text';
    input.value = span.textContent;

    taskItem.replaceChild(input, span);

    input.addEventListener('blur', function () {
        span.textContent = input.value;
        taskItem.replaceChild(span, input);
        taskCount();
    });

    input.focus();
}

function taskDone(event) {
    const checkBox = event.target;
    const taskItem = checkBox.parentElement;
    const text = taskItem.querySelector('#text');

    if (checkBox.checked) {
        text.innerText = "Task completed";
    } else {
        text.innerText = "Task not completed";
    }

}

function taskCount() {
    const count = taskList.childElementCount;
    taskCounter.innerText = `Task Count: ${count}`;
}

taskForm.addEventListener('submit', addTask);
