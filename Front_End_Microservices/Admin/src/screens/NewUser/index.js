import React, { useState } from "react";
import styles from "./NewUser.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import InforNewUser from "./InforNewUser";
import ImagesAndCTA from "./ImagesAndCTA";
import Panel from "./Panel";
import { ro } from "date-fns/locale";

const NewUser = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const handleRefresh = () => {
    setUserInfo({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "User"
    });
  };
  

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <InforNewUser 
            className={styles.card}
            userInfo={userInfo} 
            setUserInfo={setUserInfo}
          />
        </div>
      </div>
      <Panel 
        onRefresh={handleRefresh}
      />
    </>
  );
};

export default NewUser;
