// Função para salvar no Local Storage
function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tarefas', JSON.stringify(tasks));
}

// Função para obter as tarefas do Local Storage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tarefas')) || [];
}

// Função para exibir as tarefas no HTML
function displayTasks() {
    const tasks = getTasksFromLocalStorage();
    const ToDoList = document.querySelector('.added_tasks ul');
    ToDoList.innerHTML = tasks.map((task, index) => `<li>${task} <button class="remove_task" data-index="${index}">Remover</button></li>`).join('');

    // Adiciona um evento de clique para cada botão de remoção
    document.querySelectorAll('.remove_task').forEach(button => {
        button.addEventListener('click', removeTask);
    });
}

// Função para remover uma tarefa
function removeTask() {
    const index = this.dataset.index;
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tasks));
    displayTasks();
}

// Evento de clique no botão de salvar
document.querySelector('.btn_save').addEventListener('click', () => {
    const savedUserTask = document.querySelector('.add_task');
    const userTask = savedUserTask.value.trim();

    if (userTask) {
        saveTaskToLocalStorage(userTask);
        displayTasks();
        savedUserTask.value = '';
    }
});

// Inicialização: exibe as tarefas ao carregar a página
displayTasks();
