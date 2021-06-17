import React, { useState, useEffect } from "react";
import AddTaskForm from "../../Components/AddTaskForm";
import TaskList from "../../Components/TaskList/TaskList";
import { inject, observer } from "mobx-react";
import Header from "../../Components/Header";
import Stores from "../../Stores/StoreIdentifier";
import Task from "../../Components/Task";
import "./index.css";
import { Button, Card, Tabs, Spin } from "antd";
import { Icon } from "@ant-design/compatible";
const { TabPane } = Tabs;

function TaskPage(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession();
    getAllTasks();
  }, []);

  async function getAllTasks() {
    await props.taskStore.getAll();
  }

  async function getSession() {
    await props.authStore.getSessionInformation();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  const addTask = async (task) => {
    await props.taskStore.create({
      title: task.title,
      description: task.description,
      assignedDepartment: +task.department,
    });
  };

  const removeTask = (id) => {
    props.taskStore.removeTask(id);
  };

  function onEdit(id) {
    props.taskStore.selectTask(id);
  }

  async function onReject(id) {
    await props.taskStore.rejectTask(id);
  }

  async function onFinish(id) {
    await props.taskStore.completedTask(id);
  }

  function _renderTabs() {
    if (isLoading) {
      return (
        <div
          style={{
            width: "100%",
            height: 70,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      );
    } else {
      return (
        <Tabs defaultActiveKey="1">
          <TabPane tab="All Tasks" key="1">
            {props.taskStore.tasks.map((task, index) => (
              <Task
                key={"all-" + task.id}
                onReject={onReject}
                onFinish={onFinish}
                onEdit={onEdit}
                myDepartmentId={props.authStore.session.department}
                taskData={task}
              />
            ))}
          </TabPane>
          <TabPane tab="Pending" key="2">
            {props.taskStore.pendingTasks.map((task, index) => (
              <Task
                key={"pending-" + task.id}
                onReject={onReject}
                onFinish={onFinish}
                onEdit={onEdit}
                myDepartmentId={props.authStore.session.department}
                taskData={task}
              />
            ))}
          </TabPane>
          <TabPane tab="Completed" key="3">
            {props.taskStore.completedTasks.map((task, index) => (
              <Task
                key={"completed-" + task.id}
                onReject={onReject}
                onFinish={onFinish}
                onEdit={onEdit}
                myDepartmentId={props.authStore.session.department}
                taskData={task}
              />
            ))}
          </TabPane>
          <TabPane tab="Rejected" key="4">
            {props.taskStore.rejectedTasks.map((task, index) => (
              <Task
                key={"rejected-" + task.id}
                onReject={onReject}
                onFinish={onFinish}
                onEdit={onEdit}
                myDepartmentId={props.authStore.session.department}
                taskData={task}
              />
            ))}
          </TabPane>
        </Tabs>
      );
    }
  }

  return (
    <div>
      <Header name={props.authStore.session.name} />

      <div className="taskList-container">
        <Card>{_renderTabs()}</Card>
      </div>

      <div className="add-container">
        <Button
          onClick={() => setIsModalVisible(true)}
          style={{ width: 50, height: 50 }}
          icon={<Icon style={{ fontSize: 24 }} type="plus" />}
          shape="circle"
          type="primary"
        />
      </div>

      <AddTaskForm
        isModalVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={addTask}
      ></AddTaskForm>
    </div>
  );
}

export default inject(Stores.TaskStore, Stores.AuthStore)(observer(TaskPage));
