
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [todo, setTodo] = useState([]);


  useEffect(()=> {
    axios.get("http://127.0.0.1:8000/api/todo/")
    .then(res => {
      setTodo(res.data)
    })
  }, [])




  return (
    <>
      <h1>King Shohan</h1>
      {
        todo.length === 0 ? (
          <p>Loading.......</p>
        ) : (
          <ul>

            {todo.map((singleTodo,index) =>  (
              <li key={index}>
                    <p>{singleTodo.title}</p>
              </li>
            ) )}



          </ul>
        )
      }


      
    </>
  );
}

export default App;
