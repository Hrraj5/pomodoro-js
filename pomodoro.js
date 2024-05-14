const readline = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

let workTime = 25*60;
let breakTime = 5*60;
let longBreakTime = 15*60;
let pomodoroCount = 5;

function stopWatch(duration){
    const timeintervalId = setInterval(()=>{
        console.log(`Time left ${duration}`)
        duration--;
    },1000)
    setTimeout(()=>{
        clearInterval(timeintervalId)
    }, duration*1000)
}

function pomodoroTimer(type, duration) {
  console.log(`${type} time has started for ${duration}s`);
  if (type === "work"){
    stopWatch(duration);
    setTimeout(() => {
        console.log("Work time is completed,please take your short break");
        pomodoroCount--;
        if(pomodoroCount !=0){
          pomodoroTimer("break", breakTime)
        }else{
            pomodoroTimer("longBreak",longBreakTime)
            pomodoroCount = 4;
        }
      }, duration * 1000);
  }else if(type === "break"){
    stopWatch(duration);
    setTimeout(()=>{
        console.log("break Time has ended");
        pomodoroTimer("work", workTime)
    },duration * 1000)
  }else if(type === "longBreak"){
    stopWatch(duration);
    setTimeout(()=>{
        console.log("Long break has ended");
        pomodoroTimer("work", workTime)
    },duration * 1000)
  } 
}

rl.question("Press Y to start the timer? ", (answer) => {
  if (answer === "Y" || answer === "y") {
    pomodoroTimer("work", workTime);
  } else {
    console.log("Bye");
    rl.close();
  }
});
