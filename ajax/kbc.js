var remainingTime = 30;
var elem = document.getElementsByClassName('timer');
console.log(elem);
var timer = setInterval(countdown, 1000); //set the countdown to every second
  function countdown() {
      if (remainingTime == -1) {
        clearTimeout(timer);
        alert("timeout");
    } else {
       elem.innerHTML = remainingTime;
       remainingTime--; //we subtract the second each iteration
     }
     document.getElementsByClassName('timer').textContent=remainingTime;
     console.log(remainingTime)
   }
