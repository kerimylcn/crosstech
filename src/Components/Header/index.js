import React,{useState} from 'react'
import "./index.css";
import { Avatar, Image, Row, Col,Menu,Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from "../assets/logo.jpg";
import { Redirect } from 'react-router-dom';
import { Icon } from "@ant-design/compatible";
import { inject, observer } from "mobx-react";
import Stores from "../../Stores/StoreIdentifier";


function Header(props) {
  const [isRedirect,setIsRedirect] = useState(false);

  async function onClick(e){
    console.log(e);
    if(e.key === "0"){
      // reset all data
      await props.taskStore.resetData();
      await props.taskStore.getAll();
    }
    else if(e.key === "1"){
      localStorage.removeItem("TODOAPPJWTKEY");
      setIsRedirect(true);
    }
  }
  
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item icon={<Icon type="delete" />} key="0">Clear All Tasks</Menu.Item>
      <Menu.Item icon={<Icon type="logout" />} key="1">Çıkış Yap</Menu.Item>
    </Menu>
  );
  

  if(isRedirect) return <Redirect to="/login" />
  return (
    <div className="header-container">
      <Row>
        <Col span={12} style={{display:'flex',alignItems:'center'}}>
          <h2 style={{margin:0}}>CompanyName</h2>

        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Dropdown overlay={menu}>
          <div className="user-container">
            <span>{props.name}</span>

            <Avatar size={40} src={<Image preview={false} src={logo} />} />

          </div>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}

export default inject(Stores.TaskStore)(observer(Header));
