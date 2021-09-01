let todos = []

const ul = document.querySelector('ul'); // to-dos are appended here.
const filteringInput = document.querySelector('#filter') // input field for filtering.
const addTodoForm = document.querySelector('#formAdd') // form field to add to-dos.
const hidingCheckbox = document.querySelector('#hidingCheckbox') // checkbox to hide completed to-dos.
const sortDropdown = document.querySelector('#sortDropdown') // dropdown to sort
const removeAllButton = document.querySelector('#removeAll') // a button to remove all the data from Local Storage

const filters = {
    textSearch: '',
    hidingCompletedTodo: false,
    sortbyName: false
}


// If the button within the form is clicked, this event goes.
addTodoForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const todoText = e.target.elements.addTodoInput.value
    if (todoText.length < 1) {
        return
    }

    const todo = {text: todoText, completed: false}

    // Check if there is a duplicate to-do.
    const hasSameTodo = todos.some(t => t.text === todo.text)

    if (hasSameTodo) {
        alert('You already have the same todo!')
    } else {
        todos.push(todo)
        saveTodos(todos)
        renderTodos(todos, filters)
    }

    // Empty the input field.
    e.target.elements.addTodoInput.value = ""
})

// Whenever the user adds a letter, filtering applies.
filteringInput.addEventListener('input', function(e) {
    filters.textSearch = e.target.value
    renderTodos(todos, filters)
})

hidingCheckbox.addEventListener('change', function(e) {
    filters.hidingCompletedTodo = e.target.checked
    renderTodos(todos, filters)
})

sortDropdown.addEventListener('change', function(e) {
    if (e.target.value === 'byName') {
        filters.sortbyName = true;
    } else {
        filters.sortbyName = false;
    }

    renderTodos(todos, filters);
})

removeAllButton.addEventListener('click', function(e) {
    removeAllTodos()
    todos = []
    renderTodos(todos, filters)
})


todos = loadTodos()
renderTodos(todos, filters)
