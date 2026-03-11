import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/react/") // Your Django API endpoint
      .then((response) => {
        setEmployees(response.data); // Save API data in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>King Arena Employees</h1>
      {employees.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {employees.map((emp, index) => (
            <li key={index}>
              <strong>{emp.employee}</strong> - {emp.department}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;