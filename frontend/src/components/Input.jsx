import React, { useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

const Input = ({setTodos}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = async () => {
    if (!inputValue.trim()){
      toast.error("Empty Input");
      return;
    } 

    try {
      const response = await axiosInstance.post("/add", { name: inputValue });

      if (response.data.notFind) {
        setTodos((prevTodos) => [...prevTodos, response.data.newTodo]); // Fix here
        setInputValue("");
        toast.success("Todo Added.");
      } else {
        toast.error("Todo Already Existed.");
      }
    } catch (error) {
      console.log(error);
    }
};
  return (
    <InputContainer>
      <input
        type="text"
        value={inputValue}
        placeholder="Enter Todo"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e)=>{if(e.key === "Enter" && inputValue.trim()){handleAdd()}}} 
      />
      <button onClick={handleAdd}>Add</button>
    </InputContainer>
  );
};

export default Input;
const InputContainer = styled.div`
  display: flex;
  height: 45px;
  margin: 3px 0;
  width: 45vw;

  
  @media (max-width: 1200px) {
    margin-top: 20px;
    width: 50vw;
  }
  @media (max-width: 1000px) {
    margin-top: 20px;
    width: 55vw;
  }
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 70vw;
  }
  @media (max-width: 480px) {
    margin-top: 30px;
    width: 85vw;
  }

  input {
    border: 1px solid black;
    width: 100%;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    height: 100%;
    padding: 10px 13px;
    font-size: 16px;
    border-top-left-radius: 10px;
    background-color: #f9f9f9;
    outline: none;
  }
  button {
    border: 1px solid black;
    height: 100%;
    width: 80px;
    font-weight: 800;
    background-color: #f9f9f9;
    outline: none;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border-left: none;
    color: black;
    cursor: pointer;
    transition: 0.3s ease-out background;
    &:hover {
      background-color: #a2d147;
      color: white;
      border: 1px solid black;
      border-left: none;
      scale: 1;
    }
  }
`;
