import { useEffect, useState } from "react";
import "./App.css"

export function Form() {
  const [error, setError] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [filter , setFilter] = useState('all')

  const [toDos, setTodo] = useState(() => {
    const data = localStorage.getItem("todos")
    return data ? JSON.parse(data) : []
  })

  // Ajouter un todo
  const afficher = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return setError('input khawi')
    setTodo(prev => [...prev, { text: inputValue, completed: false }])
    setInputValue('')
    setError('')
  }

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos))
  }, [toDos])

  // Supprimer un todo
  const supprimer = (indexToDelete) => {
    const newTodos = toDos.filter((item,index)=> index !== indexToDelete)
    setTodo(newTodos)
  }

  // Toggle completed
  const complete = (indexToUpdate) => {
    const newTodos = toDos.map((item,index)=> {
      if(index === indexToUpdate){
        return {...item, completed: !item.completed}
      }
      return item
    })
    setTodo(newTodos)
  }

  // Filter todos
  let filteredTodos = toDos
  if(filter === "active"){
    filteredTodos = toDos.filter(item => !item.completed)
  } else if(filter === "completed"){
    filteredTodos = toDos.filter(item => item.completed)
  }

  return (
    <>
      <form onSubmit={afficher}>
        <div className="formControl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ajouter un todo..."
            className="input"
          />
          <button type="submit" className="addBtn">Ajouter</button>
        </div>
      </form>

      {/* Filter Buttons */}
      <div className="filters">
        <button className={`filterBtn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
        <button className={`filterBtn ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>Active</button>
        <button className={`filterBtn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Todo List */}
      <ul className="list">
        {filteredTodos.map((item, index) => (
          <li className="todoItem" key={index}>
            <div className="left">
              <input
                type="checkbox"
                checked={item.completed}
                className="check"
                onChange={() => complete(index)}
              />
              <span className={item.completed ? "text done" : "text"}>{item.text}</span>
            </div>
            <button className="deleteBtn" onClick={(e) => { e.stopPropagation(); supprimer(index) }}>Delete</button>
          </li>
        ))}
      </ul>

      <p className="error">{error}</p>
    </>
  )
}