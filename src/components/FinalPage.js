import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FEDDD8;

`

const FinalPage = (props) => {
    return(
        <Container>
          <h2>{props.score > 7 ? "Well done!" : "You suck, loser!"}</h2>
          <h3>Your score is {props.score}</h3>
          <button className="btn first" onClick={props.action}>
          Play again
        </button>
        </Container>
    )
}


export default FinalPage;