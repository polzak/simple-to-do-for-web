const todos = [
    {
        text: 'Study Java',
        completed: false
    },
    {
        text: 'Play the piano',
        completed: true
    },
    {
        text: 'Learn Kotlin',
        completed: false
    },
    {
        text: 'Practice React',
        completed: true
    },
    {
        text: 'Build the house',
        completed: true
    },
];

const ul = document.querySelector('ul'); // to-dos are appended here.
const filteringInput = document.querySelector('#filter') // input field for filtering.
const addTodoForm = document.querySelector('#formAdd') // form field to add to-dos.
const hidingCheckbox = document.querySelector('#hidingCheckbox') // checkbox to hide completed to-dos.
const sortDropdown = document.querySelector('#sortDropdown') // dropdown to sort
const saveButton = document.querySelector('#saveButton') // a button to save to-dos

const filters = {
    textSearch: '',
    hidingCompletedTodo: false,
    sortbyName: false
}


const renderTodos = function(todos, filters) {
    ul.innerHTML = ''

    // First, filter to-dos using the words which the user enters.
    const filteredTodos = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(filters.textSearch.toLowerCase())
    })

    // Second, filter to-dos based on completion.
    const incompletedTodos = filteredTodos.filter((t) => t.completed === false)

    // Show a summary of to-dos the user needs to complete.
    document.querySelector('#summary').textContent = `You have ${incompletedTodos.length} things to do.`

    // To-dos for rendering are determined by the user's check on the checkbox.
    const todosForRendering = filters.hidingCompletedTodo ? incompletedTodos : filteredTodos

    // if the user asks to sort by Name using dropdown...
    if (filters.sortbyName) {
        todosForRendering.sort(function(a, b) {
            return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
        })
    }

    // Display to-dos using <li> tags into <ul> tag.
    todosForRendering.map((todo) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        ul.appendChild(li);
    })
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

saveButton.addEventListener('click', function(e) {
    // Convert todos object into JSON string to save it anywhere.
    const todosForSave = JSON.stringify(todos)

    // pseudo saving.
    console.log(todosForSave)
})

renderTodos(todos, filters)
