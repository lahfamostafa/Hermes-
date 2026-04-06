import { useEffect, useState } from "react";
import "./App.css"

export function Form() {
  const [error, setError] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [filter , setFilter] = useState('All')

  const [toDos, setTodo] = useState(() => {
    const data = localStorage.getItem("todos")
    return data ? JSON.parse(data) : []
  })


  const afficher = (e) => {
    e.preventDefault()

    if (inputValue.trim() === '') return setError('input khawi')

    setTodo((prev) => [...prev, {"text" : inputValue, "completed" : false}])
    setInputValue('')
    setError('')
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos))
  }, [toDos])

  const infos = (item) => {
    console.log(item)
  }

  const supprimer = (indexToDelete) => {
      const newTodos = toDos.filter((item,index)=>{
        return index !== indexToDelete
      })
      setTodo(newTodos)
  }

  const completed = (indexToUpdate) =>{
    const newTodos = toDos.map((item, index)=>{
      if(indexToUpdate === index){
        return {
          ...item,
          completed : !item.completed
        }
      }
      return item
    })
    setTodo(newTodos)
  }

  const noComplete = () =>{
    const newTodos = toDos.filter(())
  }

  const complete = () =>{
    
  }


  return (
    <>
      <form action="" onSubmit={afficher}>

        <div className="formControl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ajouter un todo..."
            className="input"
          />

          <button type="submit" className="addBtn">
            Ajouter
          </button>
        </div>
      </form>
      <div className="filters">

        <button className="filterBtn active" onClick={()=>{afficher}}>
          All
        </button>

        <button className="filterBtn" onClick={()=>{noComplete}}>
          Active
        </button>

        <button className="filterBtn" onClick={()=>{complete}}>
          Completed
        </button>

      </div>
      <ul className="list">
        {toDos.map((item, index) => {
          return (
            <li className="todoItem" key={index}>

              <div className="left">
                <input type="checkbox" checked={item.completed} className="check" onChange={()=>completed(index)} />
                <span className={item.completed?"text done":"text"}>{item.text}</span>
              </div>

              <button className="deleteBtn"  onClick={(e)=>{
                e.stopPropagation()
                supprimer(index)
              }}>Delete</button>

            </li>
          )
        })}
      </ul>
      <p className="error">{error}</p>
    </>);
}