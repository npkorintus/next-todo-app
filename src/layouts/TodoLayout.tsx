import React from "react";
// import "../styles/index.css";
import styles from "./TodoLayout.module.css";

function TodoLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}

export default TodoLayout;
