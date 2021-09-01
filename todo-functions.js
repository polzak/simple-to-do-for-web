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
    console.log('Removed all the data from Local Storage')
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
