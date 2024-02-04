import React, { useEffect, useState } from 'react';
import './Todo.css'

function Task({ task, index, completeTask, removeTask }) {
    return (
        <div className="task" style={{ textDecoration: task.completed ? "line-through" : "" }}>
            {task.title}
            <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
            <button onClick={() => completeTask(index)}>Complete</button>
        </div>
    );
}
function CreateTask({ addTask }) {
    const [value, setValue] =useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;

        addTask(value);
        setValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              className='input'
              value={value}
              placeholder='Add a New Task!'
              onChange={e => setValue(e.target.value)}
              />
        </form>
    );
}
function Todo() {
    const initialTasks = [
        {
            title: "Wake up at 6am",
            completed: true
        },
        {
            title: "Eat Breakfast at 9am",
            completed: false
        }
    ];
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : initialTasks;
    });
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };
    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };
    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }
    return (
        <div className='todo-container'>
            <div className='header'>TODO - ITEMS</div>
            <div className='tasks'>
                {tasks.map((task, index) => (
                    <Task 
                      task={task}
                      index={index}
                      completeTask={completeTask}
                      removeTask={removeTask}
                      key={index}
                      />
                ))}
            </div>
            <div className='create-task'>
                <CreateTask addTask={ addTask } />
            </div>
            <div className='portfolio'>
                <p id='lokesh'>Created by Lokesh B</p>
                <a id='portfolio-id' href='https://www.lokeshb.xyz'>Checkout my Portfolio</a>        
            </div>
        </div>
    );
}

export default Todo;
