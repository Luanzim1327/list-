const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const editForm = document.getElementById("edit-form");
const editInput = document.getElementById("edit-input");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const filterTodo = document.getElementById("filter-select");
const searchTodo = document.getElementById("search-input");

let oldInputValue;

const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = ' <i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = ' <i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = ' <i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn);

    todoList.append(todo);

    todoInput.value = "";
    todoInput.focus();

    updateLocalStorage(text);

}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        console.log(todoTitle , text);

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })

    updateLocalStorage(text);
} 

const updateLocalStorage = (todo) => {
    let todos;

    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));
}

const refreshTitlesUsingLocalStorage = () => {
    let todos;

    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach((function(todo) {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo");
    
        const todoTitle = document.createElement("h3");
        todoTitle.innerText = todo;
        todoItem.appendChild(todoTitle);
    
        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = ' <i class="fa-solid fa-check"></i>'
        todoItem.appendChild(doneBtn);
    
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = ' <i class="fa-solid fa-pen"></i>'
        todoItem.appendChild(editBtn);
    
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("remove-todo");
        deleteBtn.innerHTML = ' <i class="fa-solid fa-xmark"></i>'
        todoItem.appendChild(deleteBtn);
    
        todoList.append(todoItem);
    }))

    
}

const removeLocalTodos = (todo) => {
    let todos;

    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex) , 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
}   

searchTodo.addEventListener("input" ,  (e) => {
    const contentItems = todoList.querySelectorAll("h3");
    const valueSearch = e.target.value;
    
    contentItems.forEach((title) => {
        const isVisible = 
        title.innerText.toLowerCase().includes(valueSearch) || 
        title.innerHTML.toLowerCase().includes(valueSearch)
        if(!isVisible) {
           title.closest("div").style.display = "none";
        } else {
            title.closest("div").style.display = "flex";
        }

})

})

todoForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    
    const inputValue = todoInput.value;

    if(inputValue) {
        saveTodo(inputValue); 
    }
})

document.addEventListener("click" , (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
        removeLocalTodos(parentEl);
    }

    if(targetEl.classList.contains("edit-todo")) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click" , (e) => {
    e.preventDefault();
   
    toggleForms();
})

editForm.addEventListener("submit" , (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
})

filterTodo.addEventListener("change" , (e) => {
    const todoFilterAll = todoList.querySelectorAll(".todo");

    todoFilterAll.forEach(function (todoEl) {
        switch (e.target.value) {
            case "all":
                todoEl.style.display = "flex";
                break;

            case "done":
                if(todoEl.classList.contains("done")) {
                    todoEl.style.display = "flex";
                }  else {
                    todoEl.style.display = "none";
                }
                break;

            case "todo":
                if(!(todoEl.classList.contains("done"))) {
                    todoEl.style.display = "flex"
                } else {
                    todoEl.style.display = "none"
                }
        }
    })
})

document.addEventListener("DOMContentLoaded" , refreshTitlesUsingLocalStorage)