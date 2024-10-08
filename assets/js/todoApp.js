let todoSubmit, todoInput, output, selected = new Array(), store = new Array(), saveBtn, deleteBtn, ItemdeleteBtn, multipleSelect, countSelected, todoList, deleteMultipleBtn;

todoSubmit = document.querySelector('.todoSubmit')
todoInput = document.querySelector('.todoInput')
todoList = document.querySelector('.todoList')
ItemdeleteBtn = document.querySelector('.ItemdeleteBtn')
countSelected = document.querySelector('.countSelected')
// deleteMultipleBtn = document.querySelector('.deleteMultiple')

output = document.querySelector('.output')


todoSubmit.addEventListener('click', saveTodo)

// deleteMultipleBtn.addEventListener('click', deleteMultiple)


document.querySelector('.todopreview').addEventListener('click', (element)=> {
    return preview(element)
})

function saveTodo() {
    // let inputForm = document.querySelector('textarea')
    // // get input from the form, add it to an object, add date, key is its index automatically. and push it to an array
    
    if (todoInput.value == '') return

    let newTodoInput = todoInput.value
    todoInput.value = ''

    const todoObject = new Object()
    todoObject.text = newTodoInput
    todoObject.time = new Date()

    store.push(todoObject)    

    return generateTodoList(store)
}


function generateTodoList(store) {
    todoList.innerHTML = ''
    store.forEach(todoItem => {
        let generatedItem = createListItemNode(todoItem)
        todoList.appendChild(generatedItem)
    });

}


function createListItemNode(listContent) {
    let parent = document.createElement('button')
    parent.id = store.indexOf(listContent)
    parent.addEventListener('click', (element) => {
        preview(element)
    })
    parent.classList = 'list-group-item list-group-item-action todopreview'


    let child = document.createElement('div')
    child.classList = 'input-group'


    let child2A = document.createElement('div')
    child2A.classList = 'input-group-text'

    let child2B = document.createElement('div')
    child2B.classList = 'input-group-text'


    let input = document.createElement('input')
    input.type = 'checkbox'
    input.value = store.indexOf(listContent)
    input.addEventListener('click', (target)=>{ selectTodo(target) })
    child2A.insertAdjacentElement('afterbegin', input)

    let span = document.createElement('span')
    span.innerHTML = listContent.text
    child2A.insertAdjacentElement('beforeend', span)

    
    let icon = document.createElement('i')
    icon.classList = 'fas fa-trash-alt'
    icon.id = store.indexOf(listContent)
    icon.role = 'button'
    icon.addEventListener('click', (target)=>{ 
        let value = target?.target?.id
        deleteTodo(value) 
    })
    child2B.insertAdjacentElement('afterbegin', icon)


    child.insertAdjacentElement('afterbegin', child2A)
    child.insertAdjacentElement('beforeend', child2B)

    parent.insertAdjacentElement('afterbegin', child)

    return parent

}



// operations

function preview(element) {
    console.log(store[parseInt(element.target.id)]);
    
    output.innerHTML = store[parseInt(element.target.id)].text
    document.querySelector('.date').innerHTML = store[parseInt(element.target.id)].time
    
}


function deleteTodo(element) {
    let index = element

    if (!index) return

    if (typeof(index) === 'object'){
        index.forEach(element => {
            let newIndex = parseInt(index)
            let elementIndex = store.indexOf()
            store.splice(newIndex, 1)
        });

    }

    if (typeof(index) === 'string') {
        let newIndex = parseInt(index)
        store.splice(newIndex, 1)
    }

    return generateTodoList(store)

}


function selectTodo(element) {
    const value = element?.target?.value
    if (!value) return

    let isFound = selected.includes(value)    

    if (!isFound) {
        selected.push(value)
    }

    if (isFound) {
        let index = selected.indexOf(value)
        selected.splice(index, 1)        
    }
    
    countSelected.innerHTML = selected.length
    
}


function deleteMultiple() {
        
    if (!selected) return

    return deleteTodo(selected)
}



