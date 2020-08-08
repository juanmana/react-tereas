import React,{useState} from 'react';



const TaskCretor = (props) => {


const [newTask, setNewTask] = useState('')

const updateNewTask = (e)=> setNewTask(e.target.value)


const createNewTask = ()=>{
     
      props.callback(newTask)
      setNewTask("")
}


    return ( 


        <div className='my-1'>

   <input 
   type="text"
   className="form-control"
   value= {newTask}
   onChange={updateNewTask}
   
   />

     <button className="btn btn-primary mt-1" onClick={createNewTask}>

          Add
     </button>
        </div>
     );
}
 
export default TaskCretor;