import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Assignment</h1>
      <div className={styles.linkContainer}>
        <Link href="/Example_to_do_list" className={styles.link}>
          <div className={styles.linkBox}>
            <h2>1. Auto Delete Todo List</h2>
            <p>View assignment Auto Delete Todo List </p>
          </div>
        </Link>
        <Link href="/Example_API" className={styles.link}>
          <div className={styles.linkBox}>
            <h2>2. Create data from API </h2>
            <p>View assignment Data from API</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
