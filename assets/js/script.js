let addButton = document.getElementById('add');
addButton.addEventListener('click', addTask);

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear);

function addTask() {
    let inputValue = document.getElementById('task').value;
    let div = document.createElement('div');
    div.className = 'task inWork';
    div.insertAdjacentHTML('afterbegin', '<p class="task-description">' + String(inputValue) + '</p>' )
    div.insertAdjacentHTML('afterbegin', '<input type="checkbox" id="complete" onchange="changeStatus(this)">');
    div.insertAdjacentHTML('beforeend', '<input type="button" value="X" class="delete">');
    taskList.append(div);
    clear();
}

function clear() {
    document.getElementById('task').value = '';
}

let taskList = document.getElementById('taskList');
taskList.onclick = function(event) {
    if (event.target.className != 'delete') return;
    let target = event.target.closest('.task');
    deleteTask(target);
}

function deleteTask(element) {
    element.remove();
}

let allClear = document.getElementById('allClear');
allClear.addEventListener('click', clearTaskList);

function clearTaskList() {
    let tasks = document.querySelectorAll('input[type=checkbox]');
    for (i = tasks.length - 1; i > - 1; i--){
        let element = tasks[i].closest('.task');
        element.remove();
    }
}

let allMark = document.getElementById('allMark');
allMark.addEventListener('click', changeAllTaskList);

function changeAllTaskList() {
    let tasks = document.querySelectorAll('input[type=checkbox]');
    let mark = 0;
    let taskLeng = tasks.length;
    for (let i = 0; i < taskLeng; i++) {
        if (tasks[i].checked) {
            mark += 1;
        }
    }
    if (mark != taskLeng) {
        for (let i = 0; i < taskLeng; i++) {
            tasks[i].checked = true;
            changeStatus(tasks[i]); 
        };
    } else {
        for (let i = 0; i < taskLeng; i++) {
            tasks[i].checked = false;
            changeStatus(tasks[i]); 
        };
    }
    
}

function changeStatus(element) {
    if (element.checked) {
        let block = element.closest('.task');
        block.classList.remove('inWork');
        block.classList.add('completed');
    } else {
        let block = element.closest('.task');
        block.classList.remove('completed');
        block.classList.add('inWork');
    }
}