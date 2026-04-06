import { useEffect, useState } from "react";
import "./App.css"

export function Form() {
  const [error, setError] = useState('')
  const [inputValue, setInputValue] = useState('')

  const [toDos, setTodo] = useState(() => {
    const data = localStorage.getItem("todos")
    return data ? JSON.parse(data) : []
  })


  const afficher = (e) => {
    e.preventDefault()

    if (inputValue.trim() === '') return setError('input khawi')

    setTodo((prev) => [...prev, inputValue])
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
      const newTodos = toDos.filter((index,item)=>{
        index !== indexToDelete
      })
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
      <ul className="list">
        {toDos.map((item, index) => {
          return (
            <li className="todoItem" key={index}>

              <div className="left">
                <input type="checkbox" className="check" />
                <span className="text">{item}</span>
              </div>

              <button className="deleteBtn"  onClick={()=>supprimer(index)}>Delete</button>

            </li>
          )
        })}
      </ul>
      <p className="error">{error}</p>
    </>);
}