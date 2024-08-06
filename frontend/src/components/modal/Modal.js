import React, { useState } from "react";
import styles from "./modal.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, mutate }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const taskToken = Cookies.get("taskToken");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { title, description } = task;
    if (title === "" || description === "") {
      toast.error("Data Invalid!", { duration: 1000 });
      return false;
    }
    return true;
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { title, description } = task;
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/tasks/addTask";
        console.log(url);
        const response = await axios.post(
          url,
          { title, description },
          {
            headers: {
              authorization: taskToken,
            },
          }
        );

        if (response.status === 201) {
          const { data } = response;
          toast.success(data.message, { duration: 1000 });
          mutate();
          setTask({
            title: "",
            description: "",
          });
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { duration: 1000 });
    }
  };

  if (!isOpen) return;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2>Add Task</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <IoClose color="white" fontSize={20} />
          </button>
        </header>
        <div className={styles.content}>
          <form onSubmit={handleAddTask} className={styles.noteForm}>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Task Title"
              className={styles.input}
            />
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Task Description"
              className={styles.textarea}
            />
            <button type="submit" className={styles.submitButton}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
