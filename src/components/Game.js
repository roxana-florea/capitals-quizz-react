import React from 'react';
import styled from 'styled-components';



const Container = styled.div `
display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
 background-color: #FEDDD8;
`

const Game = (props) => {
    
  return (
      <Container>
      {props.status && 
      <Container> 
      <h2>What is the capital of {props.country} ?</h2>
        <div className="btns">
        {
          props.answers.map((item, key) => (
            <button
              className="btn"
              key={key}
              onClick={() => props.action(key)}
            >
              {item}
            </button>
          ))}
        </div>
        
          <p className="score">Score: {props.score}</p>
      </Container>
      
          }

        
       
      </Container>

  );
};

export default Game;
