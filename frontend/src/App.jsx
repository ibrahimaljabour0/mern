import React, { useState } from "react";
import styled from "styled-components";
import img from "./images/TODO_Logo.jpg";
import Content from "./pages/Content";
import Button from "./components/Button/Button";
import toast from "react-hot-toast";

const App = () => {
  const [selected, setSelected] = useState(false)
  const handleClick = ()=>{
    toast.dismiss();
    setSelected((prev)=>!prev)
    toast.success(!selected? "Search Mode On": "Search Mode Off")
  }
  return (
    <Home>
      <Header>
        <img src={img} alt="logo img" />
      </Header>

      <div className="btn-container"  >
        <Button handleClick={handleClick} />
      </div>
      <Content selected={selected} />
    </Home>
  );
};

export default App;

const Home = styled.main`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  .btn-container{
    top: 18px;
    left: 20px;
    position: absolute;
  }
  
`;
const Header = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  img {
    height: 50px;
    cursor: pointer;
  }
`;
