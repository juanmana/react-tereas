import React, { useState,useEffect } from "react";
import TaskRow from "./components/TaskRow";

import TaskBanner from "./components/TaskBanner";

import TaskCreator from "./components/TaskCreator";
import VisibilityControl from "./components/VisibilityControl";

function App() {
  const [userName, setUserName] = useState("Juan");

  const [taskItems, setTask] = useState([
    { name: "Task 1", done: false },
    { name: "Task 2", done: false },
    { name: "Task 3", done: true },
    { name: "Task 4", done: false }
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

      useEffect(()=>{
       
        let data = localStorage.getItem('tasks');

        if(data !=null){

          setTask(JSON.parse(data))
        }else{
          setUserName('Juan example')
          setTask([
            { name: "Task 1 example", done: false },
            { name: "Task 2 example", done: false },
            { name: "Task 3 example", done: true },
            { name: "Task 4 example", done: false }


          ])

          setShowCompleted(true)
        }

      },[]);


          useEffect(()=>{

localStorage.setItem('tasks',JSON.stringify(taskItems))

          },[taskItems]);





  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      setTask([...taskItems, { name: taskName, done: false }]);
    }
  };

  const toggleTask = task =>
    setTask(
      taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  //  taskTableRow

  const taskTableRow = (doneValue) =>
    taskItems
    .filter(task =>task.done===doneValue)
    .map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ));

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={createNewTask} />

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{taskTableRow(false)}</tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>
      {
        
        showCompleted && (

          <table className="table table-striped table-bordered">

<thead>


  <th>Description</th>
  <th>Done</th>
</thead>
<tbody>


  {taskTableRow(true)}
</tbody>



          </table>
        )
      
      
      }
    </div>
  );
}

export default App;
