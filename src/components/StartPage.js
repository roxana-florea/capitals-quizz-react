import React from 'react';
import styled from 'styled-components';


const Container = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FEDDD8;
  margin-top: 10%;
`

const StartPage = (props) =>{
  return (
    <Container>
    <h2>Welcome to Guess the Capital Quizz Game!</h2>
    <button className="btn" onClick={props.action}>
      START GAME
    </button>
  </Container>
  )  
}



export default StartPage;