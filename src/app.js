document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask (e) {

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const task = {
        title,
        description
    };

    if (localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTask();
    document.getElementById('formTask').reset();
    e.preventDefault();
}

function getTask () {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `<div class="card mb-4">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <p><b>#Task: ${i+1}</b></p>
                        </div>
                        <div class="col-sm">
                            <p><b>Activity: ${title}</b></p>
                        </div>
                        <div class="col-2 pb-2">
                            <!--
                                <a class="btn btn-success" onclick="deleteTask('${title}')">Modify</a>
                            -->
                            <a class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm card-body__description">
                            <p><b>Description:</b> ${description}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>`
    }
}

function deleteTask (title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == title) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTask();
}

getTask();