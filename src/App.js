import "./App.css";
import { BsCheck2, BsXLg } from "react-icons/bs";
import { useState, useEffect } from "react";
function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const AddList = () => {
    if (input) {
      let data = [...list, { text: input, complete: true }];
      setList(data);
      setInput("");
      localStorage.setItem("list", JSON.stringify(data));
    } else alert("ToDo-List Cannot be empty!");
  };
  const DeleteList = (id) => {
    let data = [...list];
    data.splice(id, 1);
    setList(data);
  };

  const MarkComplete = (id) => {
    let data = [...list];
    let newdata = data.splice(id, 1);
    if (newdata[0].complete) {
      newdata[0].complete = false;
    } else {
      newdata[0].complete = true;
    }
    let changeEle = {
      text: newdata[0].text,
      complete: newdata[0].complete,
    };
    data.push(changeEle);
    setList(data);
  };
  const updateList = (id) => {
    let data = [...list];
    let newdata = data.splice(id, 1);
    setInput(newdata[0].text);
    setList(data);
  };

  const RemoveAll = () => {
    setList([]);
    localStorage.setItem("list", JSON.stringify([]));
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("list") || "[]");
    setList(data);
  }, []);

  return (
    <div className="app">
      <h1>TO DO LIST</h1>
      <div className="clear-all">
        <button onClick={RemoveAll}>Clear Completed</button>
      </div>
      <ul>
        {list.map((data, id) => {
          return (
            <li key={id}>
              <span>
                <BsCheck2
                  title={`click to mark as ${
                    data.complete ? "completed" : "incomplete"
                  }`}
                  className={
                    data.complete ? "checkbox" : "checkbox  incomplete"
                  }
                  onClick={() => MarkComplete(id)}
                />
                <p
                  tirle="click to update todo"
                  className={data.complete ? "" : " incomplete"}
                  onClick={() => updateList(id)}
                >
                  {data.text}
                </p>
              </span>
              <BsXLg
                title="click to delete item"
                className="delete"
                onClick={() => DeleteList(id)}
              />
            </li>
          );
        })}
      </ul>
      <div className="input-task">
        <input
          type="text"
          placeholder="input your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={AddList}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
