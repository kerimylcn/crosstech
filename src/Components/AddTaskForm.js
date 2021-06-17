import React ,{useState} from 'react'
import { Modal,Input,Select  } from 'antd';

const { Option } = Select;

function AddTaskForm(props ) {
    const {onSubmit,onCancel,isModalVisible}  = props;
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [selectedDepartment,setSelectedDepartment] = useState("1");

    const handleSubmit = e => {

        onSubmit({
            id: Math.floor(Math.random() *10000),
            title:title,
            description:description,
            department:selectedDepartment
        });

        setTitle('');
        setDescription('');
    };

    const cancel = () => {
        setTitle("");
        onCancel();
    }


    function departmentHandleChange(value) {
        setSelectedDepartment(value);
    }

    return (
        <Modal title="New Task" visible={isModalVisible} onOk={handleSubmit} onCancel={cancel}>
            <Input type="text" placeholder="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} autoComplete="off"></Input> 
            <div style={{height:10}} />
            <Input type="text" placeholder="description" id="title" value={description} onChange={(e) => setDescription(e.target.value)} autoComplete="off"></Input>   
            <div style={{height:10}} />
            <Select onChange={departmentHandleChange} style={{width:"100%"}} defaultValue="1">
        <Option value="1">Department 1</Option>
        <Option value="2">Department 2</Option>
    </Select>                 
       </Modal>
    )
}


export default AddTaskForm;
