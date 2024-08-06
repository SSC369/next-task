"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";
import Cookies from "js-cookie";
import Loader from "@/components/Loader.js";
import styles from "./page.module.css";
import Modal from "@/components/modal/Modal";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { TbBrandNextjs } from "react-icons/tb";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { IoCheckmarkCircle } from "react-icons/io5";
import emptyImage from "../assets/empty.jpg";
import EditModal from "@/components/editModal/EditModal";

const Page = () => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState("");
  const router = useRouter();

  const taskToken = Cookies.get("taskToken");

  const fetcher = async (url) => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          authorization: taskToken,
        },
      });
      return data.tasks;
    } catch (error) {
      const { response } = error;
      toast.error(response.data.msg, { duration: 1000 });
    }
  };
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/tasks";
  const { data: tasks, isLoading, mutate, error } = useSWR(url, fetcher);

  const handleDelete = async (id) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/tasks/" + id;
      const res = await axios.delete(url);
      const { data } = res;
      if (res.status === 200) {
        toast.success(data.message, { duration: 1000 });
        mutate();
      }
    } catch (error) {
      toast.error(error.message, { duration: 1000 });
    }
  };

  const handleCheckboxChange = async (taskId, completed) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/task/status";
      const res = await axios.put(url, { completed, taskId });
      if (res.status === 200) {
        toast.success(res.data.message, { duration: 1000 });
        mutate();
      }
    } catch (error) {
      toast.error(error.message, { duration: 1000 });
    }
  };

  const handleLogout = () => {
    Cookies.remove("taskToken");
    toast.success("Logout Successful", { duration: 1000 });
    setTimeout(() => {
      router.replace("/login");
    }, 1000);
  };

  const renderEmptyView = () => {
    return (
      <div className={styles.emptyViewContainer}>
        <Image alt="tasks empty" quality={100} width={500} src={emptyImage} />
        <h1 className={styles.emptyHeading}>Tasks empty</h1>
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.row}>
          <TbBrandNextjs fontSize={24} />
          <p className={styles.logo}>Tasks</p>
        </h1>

        <div className={styles.row}>
          <div
            className={styles.row}
            style={{ cursor: "pointer" }}
            onClick={() => setModal(true)}
          >
            <p className={styles.addTask}>Add Task</p>
            <IoIosAddCircleOutline
              onClick={() => setModal(true)}
              cursor={"pointer"}
              fontSize={24}
            />
          </div>
          <FiLogOut
            onClick={handleLogout}
            style={{ marginLeft: "10px" }}
            cursor={"pointer"}
            fontSize={20}
          />
        </div>
      </div>

      <div className={styles.tasksContainer}>
        {tasks?.length === 0 ? (
          renderEmptyView()
        ) : (
          <>
            <h1>Your Tasks</h1>
            <ul className={styles.tasks}>
              {tasks?.map((t) => {
                const { name, description, _id, completed } = t;

                return (
                  <li
                    style={completed ? { opacity: "0.6" } : {}}
                    className={styles.task}
                    key={_id}
                  >
                    <div className={styles.titleContainer}>
                      <div className={styles.row}>
                        <h2 className={styles.taskTitle}>{name}</h2>

                        {completed && (
                          <IoCheckmarkCircle fontSize={20} color="lightgreen" />
                        )}
                      </div>
                      <div className={styles.row}>
                        <MdDelete
                          onClick={() => handleDelete(_id)}
                          className={styles.deleteIcon}
                          fontSize={16}
                        />
                        <TbEdit
                          onClick={() => setEditModal(_id)}
                          className={styles.deleteIcon}
                          fontSize={16}
                        />
                        <input
                          className={styles.checkbox}
                          type="checkbox"
                          checked={completed}
                          onChange={() => handleCheckboxChange(_id, !completed)}
                        />
                      </div>
                    </div>
                    <p className={styles.desc}>{description}</p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
      {editModal && (
        <EditModal
          taskId={editModal}
          isOpen={editModal !== ""}
          onClose={() => setEditModal("")}
          mutate={mutate}
        />
      )}
      {modal && (
        <Modal isOpen={modal} onClose={() => setModal(false)} mutate={mutate} />
      )}
    </div>
  );
};

export default Page;
