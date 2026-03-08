
// adding item to database - at server post method
export const addItem = async (task, date) => { // export function addItem with item parameter and async
    const response = await fetch('http://localhost:3000/api/todo-items', { // fetch API with URL and options
        method: 'POST', // POST method
        headers: {
            'Content-Type': 'application/json', // Content-Type header
        },
        body: JSON.stringify({ task, date }), // 
    })
    const data = await response.json();
    return mapServiceTodoToTodoItem(data.todoItem);
}

const mapServiceTodoToTodoItem = (serviceTodoItem) => {
    return {
        id: serviceTodoItem._id,
        task: serviceTodoItem.task,
        date: serviceTodoItem.date,
        completed: serviceTodoItem.completed,
        createdAt: serviceTodoItem.createdAt,
        updatedAt: serviceTodoItem.updatedAt
    };
};

// getting items from database - at server get method
export const getTodoItemsFromServer = async () => {
    const response = await fetch('http://localhost:3000/api/todo-items'); // fetch API with Server URL
    const data = await response.json(); // await response.json() to get data
    return data.todoItems.map(mapServiceTodoToTodoItem);
}

// deleting item from database - at server delete method
export const deleteTodoItemFromServer = async (id) => {
    const response = await fetch('http://localhost:3000/api/todo-items/' + id, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data.id;
}

// updating item from database - at server put method
export const toggleCompletedMarksFromServer = async (id, currentCompleted) => {
    const response = await fetch('http://localhost:3000/api/todo-items/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: currentCompleted })
    });
    console.log("in todoServer: ", currentCompleted);
    const data = await response.json();
    return data.currentMark;
}