import React from "react";
import cn from "classnames";
import { Link, useLocation } from "react-router-dom";
import styles from "./InforNewUser.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Dropdown from "../../../components/Dropdown";

const optionsRole = ["User", "Admin", "Admin_Blog", "Admin_Hotel"];

const InforNewUser = ({ userInfo, setUserInfo, className }) => {

  const location = useLocation();
  const createLink = location.pathname.startsWith('/products') 
        ? '/products/dashboard' 
        : location.pathname.startsWith('/customers') 
            ? '/customers/overview' 
            : '/'; 
  

  // const optionsRole = [
  //   { value: "User", label: "User" },
  //   { value: "Admin", label: "Admin" },
  //   { value: "Admin_Blog", label: "Admin Blog" },
  //   { value: "Admin_Hotel", label: "Admin Hotel" },
  // ];     
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleRoleChange = (selectedRole) => {
    setUserInfo({
      ...userInfo,
      role: selectedRole,
    });
  };

  return (
    <Card
      className={cn(styles.card, className)}
      title="Information"
      classTitle="title-green"
      head={
        <Link
          className={cn("button-stroke button-small", styles.button)}
          to={createLink}
        >
          <Icon name="arrow-left" size="24" />
          <span>Back</span>
        </Link>
      }
    >
      <div className={styles.description}>
        <TextInput
          className={styles.field}
          label={
            <span>
              User Name <span style={{ color: 'red' }}>*</span>
            </span>
          }
          name="username"
          type="text"
          value={userInfo.username}
          onChange={handleInputChange}
          tooltip="Maximum 50 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          className={styles.field}
          label={
            <span>
              Email Address <span style={{ color: 'red' }}>*</span> 
            </span>
          }
          name="email"
          type="text"
          value={userInfo.email}
          onChange={handleInputChange}
          tooltip=""
          required
        />
        <TextInput
          className={styles.field}
          label={
            <span>
              Password <span style={{ color: 'red' }}>*</span> 
            </span>
          }
          name="password"
          type="password"
          value={userInfo.password}
          onChange={handleInputChange}
          tooltip=""
          required
        />
        <TextInput
          className={styles.field}
          label={
            <span>
              Confirm Password <span style={{ color: 'red' }}>*</span> 
            </span>
          }
          name="confirmPassword"
          type="password"
          value={userInfo.confirmPassword}
          onChange={handleInputChange}
          tooltip=""
          required
        />
        <Dropdown
          className={styles.field}
          label={
            <span>
              Role <span style={{ color: 'red' }}>*</span> 
            </span>
          }
          value={userInfo.role}
          setValue={(role) => setUserInfo({ ...userInfo, role })}
          options={optionsRole}
          onChange={handleRoleChange} 
        />
      </div>
    </Card>
  );
};

export default InforNewUser;
