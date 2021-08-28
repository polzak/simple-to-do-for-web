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

const ul = document.querySelector('ul');
const filteringInput = document.querySelector('#filter')
const addTodoForm = document.querySelector('#form-add')
const hidingCheckbox = document.querySelector('#hidingCheckbox')

const filters = {
    textSearch: '',
    hidingCompletedTodo: false
}

const renderTodos = function(todos, filters) {

    ul.innerHTML = ''

    const filteredTodos = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(filters.textSearch.toLowerCase())
    })

    const incompletedTodos = filteredTodos.filter((t) => t.completed === false)

    document.querySelector('#summary').textContent = `You have ${incompletedTodos.length} things to do.`

    const todosForRendering = filters.hidingCompletedTodo ? incompletedTodos : filteredTodos

    todosForRendering.map((todo) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        ul.appendChild(li);
    })
}

addTodoForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const todoText = e.target.elements.addTodoInput.value
    if (todoText.length < 1) {
        return
    }

    const todo = {text: todoText, completed: false}
    const hasSameTodo = todos.some(t => t.text === todo.text)

    if (hasSameTodo) {
        alert('You already have the same todo!')
    } else {
        todos.push(todo)
        renderTodos(todos, filters)
    }
    e.target.elements.addTodoInput.value = ""
})

filteringInput.addEventListener('input', function(e) {
    filters.textSearch = e.target.value
    renderTodos(todos, filters)
})

hidingCheckbox.addEventListener('change', function(e) {
    filters.hidingCompletedTodo = e.target.checked
    renderTodos(todos, filters)
})

renderTodos(todos, filters)
