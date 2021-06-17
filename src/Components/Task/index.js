import React from "react";
import "./index.css";
import { toJS } from "mobx";
import { Row, Col, Button,Tag } from "antd";
import { Icon } from "@ant-design/compatible";

function Task(props) {
  const { myDepartmentId, taskData, onEdit, onFinish,onReject } = props;


  function _renderTag(){
    switch(taskData.status){
      case 0: return <Tag color="gold">Pending</Tag>;
      case 1: return <Tag color="green">Completed</Tag>;
      case 2: return <Tag color="magenta">Rejected</Tag>;
      default: return <Tag color="lime">Loading...</Tag>
    }
  }

  return (
    <Row className="task-item">
      <Col span={12}>
        <h3>{taskData.title}</h3>
        <span>{taskData.description}</span>
      </Col>
      <Col span={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        {_renderTag()}
      </Col>
      <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
        {myDepartmentId === taskData.assignedDepartment ? (
          <div>
            <Button
              disabled={taskData.status !== 0 ? true : false}
              onClick={() => onReject(taskData.id)}
              icon={<Icon type="delete" />}
              shape="circle"
              danger
              style={{ width: 40, height: 40, marginRight: 10 }}
            />            
            <Button
              disabled={taskData.status !== 0 ? true : false}
              icon={<Icon type="check" />}
              shape="circle"
              onClick={() => onFinish(taskData.id)}
              style={{
                width: 40,
                height: 40,
                backgroundColor: taskData.status === 1 ? "rgba(183, 235, 143, 0.7)" : "#fff",
              }}
            />
          </div>
        ) : null}
      </Col>
    </Row>
  );
}

export default Task;
