import React from "react";
import Table from "../../components/table/table";
import styles from "./Todolist.module.css";

const Todolist = () => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Table />
      </div>
    </React.Fragment>
  );
};

export default Todolist;
