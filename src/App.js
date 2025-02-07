import React, { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState('');

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    //store array as string in localstorage key
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo = index =>{
    let reducedTodo =[...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  };


  //used whenever new page is rendered{
  //checking whether locastorage has item or not

  useEffect(()=>{
    //using json parse when you want to convert the backend to array of object
    //json.parse convert localstorage data to array
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    if(savedTodo)
      {
        setTodos(savedTodo);
      }
  },[])
  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What is your Task title?" />
          </div>

          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What is the Description ?" />
          </div>

          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>

        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          {allTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index) } title='delete?'/>
                  <BsCheck className='check-icon' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App;

