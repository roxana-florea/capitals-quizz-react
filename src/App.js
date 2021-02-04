import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Game from "./components/Game";
import StartPage from './components/StartPage';
import FinalPage from './components/FinalPage';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import beep from './components/Tick.mp3';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
    
  },
  colorPrimary: {
    background: "green"
  }
});


const Container = styled.div `
  display: flex;
  justify-content: center;
  background-color: '#FEDDD8';
`
var sound = new Audio(beep);


function App() {
  const classes = useStyles();

  const [questions, grabQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState(false);
  const [country, setCountry] = useState("");
  const [score, setScore] = useState(0);
  const [page, changePage] = useState(0);
  const [finalPage, showFinalPage] = useState(false);
  const [progress, setProgress] = React.useState(0);
  /////////////////////////////////////////API FETCH
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios("https://restcountries.eu/rest/v2/all");
      grabQuestions(result.data.filter((item) => item.capital !== ""));
    };
    fetchData();
  }, []);
  ///////////////////////////////////////////API FETCH
  const playSound = () => {
    sound.play()
  }
  
  const startGame = () => {
    setStatus(true);
    grabData();
    playSound();
    
  };

  const grabData = () => {
    let country = questions[Math.floor(Math.random() * questions.length)];
    setCountry(country);

    let random1 = Math.floor(Math.random() * questions.length);
    let random2 = Math.floor(Math.random() * questions.length);
    let random3 = Math.floor(Math.random() * questions.length);
    let arr = [];
    arr.push(
      country.capital,
      questions[random1].capital,
      questions[random2].capital,
      questions[random3].capital
    );
    arr.sort(() => 0.5 - Math.random());
    setAnswers(arr);
  };


  const isCorrect = (key) => {
    changePage(page + 1);
    setProgress(progress + 10);
    page === 10 && showScore();
    answers[key] === country.capital
      ? setScore(score + 1)
      : setScore(score + 0);
    grabData();
    playSound();
  };

  const showScore = () => {
    showFinalPage(true);
    setStatus(false);
  };

  const playAgain = () => {
    setStatus(false);
    setScore(0);
    changePage(1);
    showFinalPage(false);
    setProgress(0);
  };



  return (
    <Container>
  { !(progress > 100) && 
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  }
    
    <Paper className='paper' elevation={3}>
      {!status && !finalPage && (
       <StartPage action={startGame}/>
      )}
      <Game
        status={status}
        country={country.name}
        answers={answers}
        action={isCorrect}
        score={score}
        finalPage={finalPage}
      
      />
      {finalPage && 
        <FinalPage action={playAgain} score={score}/>
        }
    </Paper>
    
    </Container>
  );
}

export default App;
