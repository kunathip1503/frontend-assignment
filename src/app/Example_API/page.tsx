import React from "react";
import UserData from "@/components/Userdata/userdata";
import styles from "./UserAPI.module.css";
const UserAPI = () => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <UserData />
      </div>
    </React.Fragment>
  );
};

export default UserAPI;
