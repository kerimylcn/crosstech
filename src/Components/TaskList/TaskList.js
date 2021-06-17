import React ,{useState,useEffect} from 'react';

function TaskList( props ) {
    const {removeTask , updateTaks} = props;
    const [data,setData] = useState(props.tasks);
    useEffect(() => {
        console.log("Değiştiii");
        setData(props.data);
    }, [props.tasks])
     
    const [edit,setEdit] = useState ({
        id:null,
        value:''
    })

   const submitUpdate = value => {
       updateTaks(edit.id,value)
       setEdit({
           id:null,
           value:''
       })
   } 
    
    if(data === undefined) return null;

    return data.map((task,index) =>(
        <div className="deneme" key={index}>{task.text}
        <button className="bt" onClick={()=> removeTask(task.id)}>Delete</button>
        </div>
    ))
}

export default TaskList;
