import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import ToDoList from './components/ToDoList/ToDoList';
import { useState } from 'react';
import { Board} from './components/TicTacToe/Board';
import { PhoneBook } from './components/PhoneBook/PhoneBook';
import { LogicIndex } from './components/XuLyLogic/LogicIndex';
import { ToDoListv2 } from './components/ToDoListv2/ToDoListv2';
import { QuizApp } from './components/QuizApp/QuizApp';


function App() {
  // const [items, setItems] = useState([]);
  
  // const addItem = () => {
  //   const newItem = {
  //     text: 'New item',
  //     time: new Date().toLocaleString() // Lấy thời gian hiện tại
  //   };
  //   setItems([...items, newItem]);
  // };
  return (
    <div className="App">
      {/* <LogicIndex/> */}
      {/* <PhoneBook/> */}
      {/* <Board/> */}
      {/* <ToDoList/> */}
      {/* <ToDoListv2/> */}
      {/* <button onClick={addItem}>Add item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.text} - {item.time}
          </li>
        ))}
      </ul> */}
      <QuizApp/>
    </div>
  );
}

export default App;
