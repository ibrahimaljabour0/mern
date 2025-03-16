import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import { BsFillCircleFill, BsTrashFill } from "react-icons/bs";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { BsCheckCircleFill } from "react-icons/bs";
import Search from "../components/Search";

const Content = ({ selected }) => {
  const [todos, setTodos] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleDelete = async (id) => {
    toast.dismiss();
    try {
      const res = await axiosInstance.delete(`/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success(`Todo "${res.data?.name || "Todo"}" Deleted`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id, currentMark) => {
    toast.dismiss();
    try {
      const updatedMark = !currentMark;
      const response = await axiosInstance.put(`mark/${id}`, { updatedMark });
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? { ...todo, mark: updatedMark } : todo
        )
      );
      console.log(response.data);

      if (updatedMark) {
        toast.success("Todo Marked");
      } else {
        toast.error("Todo Unmarked");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update todo");
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await axiosInstance.get("/get");
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container>
      {selected ? (
        <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      ) : (
        <Input setTodos={setTodos} />
      )}
      {todos.length === 0 ? (
        <div className="no_record">
          <h3>No Record</h3>
        </div>
      ) : (
        <div className="todo-list">
          {todos
            .filter((todo) => todo.name.toLowerCase().includes(searchInput))
            .map((todo, index) => (
              <div
                className={
                  index === todos.length - 1 ? "task last_task" : "task"
                }
                key={index}
              >
                <div className="checkbox">
                  <span className="index">{index + 1}.</span>
                  <span className={todo.mark ? "line" : ""}>
                    {capitalize(todo.name)}
                  </span>
                </div>
                <div className="trash">
                  {todo.mark ? (
                    <BsCheckCircleFill
                      onClick={() => handleUpdate(todo._id, todo.mark)}
                      className="hover"
                    />
                  ) : (
                    <BsFillCircleFill
                      onClick={() => handleUpdate(todo._id, todo.mark)}
                      className="hover"
                    />
                  )}
                  <BsTrashFill
                    onClick={() => handleDelete(todo._id)}
                    className="hover"
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </Container>
  );
};

export default Content;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .todo-list {
    overflow-y: auto;
    max-height: 70vh;
    min-height: 20vh;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .todo-list::-webkit-scrollbar {
    display: none;
  }

  .no_record {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 12px;
    width: 45vw;
    height: 45px;
    margin-top: 4px;
    border-radius: 2px;
    background-color: #a2d147;
    transition: 0.3s ease-out background;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
      h3 {
        color: black;
      }
    }

    &:hover h3 {
      transition: 0.3s ease-in color;
      color: black;
    }
  }

  .last_task {
    border-bottom-right-radius: 13px !important;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  .task {
    display: flex;
    justify-content: space-between;
    padding: 3px 12px;
    width: 45vw;
    height: 45px;
    margin-top: 4px;
    border-radius: 2px;
    background: linear-gradient(135deg, #a2d147, #7aa02f);
    /* background-color: #a2d147; */
    transition: 0.3s ease-out background;

    @media (max-width: 1200px) {
      width: 50vw;
    }
    @media (max-width: 1000px) {
      width: 55vw;
    }
    @media (max-width: 768px) {
      width: 70vw;
    }
    @media (max-width: 480px) {
      width: 85vw;
    }

    &:hover {
      background-color: #e0e0e0;
      color: black;
    }
    .checkbox {
      display: flex;
      align-items: center;
      gap: 10px;

      .index {
        font-size: 20px;
      }

      .line {
        text-decoration: line-through;
      }
      span {
        font-weight: 500;
        font-size: 20px;
      }
    }

    .trash {
      display: flex;
      align-items: center;
      gap: 10px;
      .hover {
        cursor: pointer;
        &:hover {
          transition: 0.2s ease-out color;
          color: white;
        }
      }
    }
  }
`;
