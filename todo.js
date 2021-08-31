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


// Load to-dos from Local Storage.
// If there is no to-dos saved or this is the first time to use the app
// it returns an empty array.
const loadTodos = function() {
    const td = JSON.parse(localStorage.getItem('todos'))
    if (td === null) {
        console.log('There is no to-dos saved before.')
        return []
    }
    return td
}


// Save the current to-dos into Local Storage.
const saveTodos = function(td) {
    const todosString = JSON.stringify(td)
    localStorage.setItem('todos', todosString)
    console.log('Saved to-dos successfully!')
}


// Remove all the to-dos from Local Storage.
// Warning!!!
const removeAllTodos = function() {
    // Clear the Local Storage.
    localStorage.clear()
    todos = []
    console.log('Removed all the data from Local Storage')
    renderTodos(todos, filters)
}


const renderTodos = function(td, filters) {
    ul.innerHTML = ''

    // If there is no to-dos, then no need to render more.
    if (td.length < 1) {
        document.querySelector('#summary').textContent = `You have nothing to do.`
        return
    }
    
    // First, filter to-dos using the words which the user enters.
    const filteredTodos = td.filter((t) => {
        return t.text.toLowerCase().includes(filters.textSearch.toLowerCase())
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
    todosForRendering.map((t) => {
        const li = document.createElement('li');
        li.textContent = t.text;
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
})


todos = loadTodos()
renderTodos(todos, filters)
