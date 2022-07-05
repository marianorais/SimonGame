import logo from './logo.svg';
import React, { useState, useRef,useEffect} from 'react';
import './App.css';

function App() {
  const Ref = useRef(null);
  
    // The state for our timer
  const [timerT1Finished,setTimerT1Finished] = useState('00:00:00');
  const [timerT2Finished,setTimerT2Finished] = useState('00:00:00');
  const [timer, setTimer] = useState('00:00:00');
  const [timerSaved,setTimerSaved] = useState('00:00:00');
  const [indexSelected,setIndexSelected] = useState('')
  const [cantidadSecuencia,setCantidadSecuencia] = useState(0)
  const [intervalID,setIntervalID] = useState()
  var segundos = 0;
  var cant = 0;
  const [finishT1,setFinishT1] = useState(false)
  const [finishT2,setFinishT2] = useState(false)
  const clicksToWon = 20;

  let seguir = false
useEffect(() => {
  // clearTimer(getDeadTime());
}, []);
useEffect(() => {
if(cantidadSecuencia>= clicksToWon){
  stopAllButtonAnimation()
  alert("You WON your timer is: " + timerSaved)
  setTimer('00:00:00')
  setIndexSelected('')
  clearTimer(getDeadTime());
  setCantidadSecuencia(0)
  if(!finishT1){
    setTimerT1Finished(timerSaved)
    setFinishT1(true)
  }
  if(finishT1 && !finishT2){
    setTimerT2Finished(timerSaved)
    setFinishT2(true)
  }
}
if(finishT1 && finishT2){
  alert("You have already won")
}
}, [cantidadSecuencia]);

const getTimeRemaining = (e) => {

    segundos ++
    const total = Date.parse(e);
    const seconds = segundos % 60;
    const minutes = Math.floor((segundos / 60) % 60);
    const hours = Math.floor(segundos / 3600);

    setTimerSaved(
      (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
    )
    return {
        total, hours, minutes, seconds
    };
}

const startTimer = (e,keepPlaying) => {
    let { total, hours, minutes, seconds } 
                = getTimeRemaining(e);
    
      seguir = true

      RemoveButtonAnimation()
      console.log("keepPlaying",keepPlaying)
      if (keepPlaying) {
        // update the timer
        // check if less than 10 then we need to 
        // add '0' at the begining of the variable

        setTimer(
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
      }
}

const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    setTimer('00:00:00');
    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    var keepPlaying = true
    if(cantidadSecuencia>=20){
      keepPlaying=false
    }
    AddRandomButtonAnimation()
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      
        startTimer(e,keepPlaying);
    }, 1000)
    Ref.current = id;
}

const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 20);
    return deadline;
}

// We can use useEffect so that when the component
// mount the timer will start as soon as possible

// We put empty array to act as componentDid
// mount only

// Another way to call the clearTimer() to start
// the countdown is via action event from the
// button first we create function to be called
// by the button
const onClickResetT1 = () => {
  if(!finishT1){
    clearTimer(getDeadTime());
  }
}
const onClickResetT2 = () => {
  if(finishT1 && !finishT2){
    clearTimer(getDeadTime());
  }
}

const handleClick = (e) => {
  
  if(e.target.id === indexSelected){
    //Que pasa si toco muchas veces
    e.target.className = ''
    e.target.className = 'btnCircle '
    parpadeo(e)
  }

}

const parpadeo = (e) => {
  setCantidadSecuencia(cantidadSecuencia + 1)
  cant++

  setTimeout(function(){

    AddRandomButtonAnimation()
 }, 1000);
}

const AddRandomButtonAnimation = () => {
  var buttonID = Math.floor((Math.random() * 6) + 1).toString();
  var elemento = document.getElementById("" + buttonID);
  elemento.className += "animacion";

  setIndexSelected(buttonID)

  //console.log(elemento,buttonID);
}

const RemoveButtonAnimation = () => {
  console.log(indexSelected)
  if(indexSelected !== ''){

    var elemento = document.getElementById(indexSelected);
    elemento.className = 'btnCircle ';
  }

}

const stopAllButtonAnimation = () => {
  for(var i=1;i<7;i++){
    var elemento = document.getElementById('' + i);
    elemento.className = 'btnCircle ';
    console.log("stopAllButtonAnimation", elemento)
  }

}

  return (
    <div className="App">
      <header className="App-header">
        <div style={{lineHeight:'15px'}}>
          <h1 style={{color:'yellow'}}>El Juego de las</h1>
          <h1 style={{marginTop:'15px'}}>Distracciones</h1>
        </div>
        <h2>{timer}</h2>
        <div style={{display:'inline', justifyContent:'space-between'}}>
          <button style={{backgroundColor:'red'}} className='btnTimer' onClick={onClickResetT1}>T1</button>
          <button style={{backgroundColor:'green'}} className='btnTimer' onClick={onClickResetT2}>T2</button>
        </div>
        <div style={{marginTop:'100px'}}>
          <button 
            style={{marginLeft:'1000px'}} 
            className={'btnCircle '}
            id='1'
            onClick={(e) => handleClick(e)}> 
          </button>
          <button 
            style={{marginRight:'1000px'}} 
            className={'btnCircle '}
            id='2'
            onClick={(e) => handleClick(e)}> 
          </button>
          <button 
            style={{marginLeft:'1000px'}} 
            className={'btnCircle '}
            id='3'
            onClick={(e) => handleClick(e)} >
          </button>
          <button 
            style={{marginRight:'1000px'}} 
            className={'btnCircle '}
            id='4'
            onClick={(e) => handleClick(e)}  >
          </button>
          <button 
            style={{marginLeft:'1000px'}} 
            className={'btnCircle '}
            id='5'
            onClick={(e) => handleClick(e)} >
          </button>
          <button 
            style={{marginRight:'1000px'}} 
            className={'btnCircle '}
            id='6'
            onClick={(e) => handleClick(e)}  > 
          </button>
        </div>
      </header>
    </div>
    
  );
}

export default App;
