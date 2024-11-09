const scores = JSON.parse(localStorage.getItem('score'))  || {wins: 0, losses: 0, ties: 0}
  
  updateScore()
	
	let isAutoPlaying = false
	let intervalId;
 function  autoPlay(){
 
 if(!isAutoPlaying){
 intervalId = setInterval(()=>{
  		const playermove = pickComputer()
     playerMove(playermove)
  },1000)
    
    document.querySelector(".js-auto-play")
    	.innerHTML = "Stop Playing"
  isAutoPlaying = true
  }else{
 	 clearInterval(intervalId)
 	 document.querySelector(".js-auto-play")
 	 .innerHTML = "Auto Play"
 	 isAutoPlaying = false
   }
  }
  
  document.querySelector(".js-rock-btn")
  .addEventListener("click",()=>{
  	playerMove('rock')
  })
  
  document.querySelector(".js-paper-btn")
  .addEventListener("click",()=>{
  playerMove('paper')
  })
  
  document.querySelector(".js-scissors-btn")
  .addEventListener("click",()=>{
  playerMove('scissors')
  })
  
  document.querySelector(".js-reset-btn")
  .addEventListener("click",()=>{
				confirmDelete()
  })
  
  document.querySelector('.js-auto-play')
  	.addEventListener('click',()=>{
  		autoPlay()
  	})

	document.body.addEventListener('keydown', (event)=>{
			if(event.key === 'r'){
				playerMove('rock')
			}else if (event.key === 'p'){
				playerMove('paper')
			}else if (event.key === 's'){
				playerMove('scissors')
			}else if (event.key === 'a'){
				autoPlay()
			}
	})
 
  function confirmDelete(){
		//let isAskedToReset = false
			const confirmElement = `<span>Are you sure you want to reset the score?</span> 
			<button class='js-yes-btn'>Yes</button>
		 	<button class='js-no-btn'>NO</button>`
		
		document.querySelector('.js-confirm').innerHTML = confirmElement
		
		document.querySelector('.js-yes-btn')
			.addEventListener('click', ()=>{
				localStorage.removeItem('score');
				scores.wins = 0; scores.losses = 0; scores.ties = 0
				updateScore()

				document.querySelector('.js-confirm').innerHTML =''
			})
		document.querySelector('.js-no-btn')
			.addEventListener('click',()=>{
				document.querySelector('.js-confirm').innerHTML =''
		})
//console.log(document.querySelector('.js-confirm').innerHTML)
			if(document.querySelector('.js-confirm').innerHTML === confirmElement){

				document.body.addEventListener('keydown', (event)=>{
					if(event.key === 'y'){
						localStorage.removeItem('score');
						scores.wins = 0; scores.losses = 0; scores.ties = 0
						updateScore()

						document.querySelector('.js-confirm').innerHTML =''
					}else if (event.key === 'n'){
						document.querySelector('.js-confirm').innerHTML =''
					}
				})
		}
	}


 function playerMove(playerMove){
 	const computerMove = pickComputer()
 		let result= ''
 if (playerMove === 'scissors') {	
 	if(computerMove === 'rock'){
	 	result = 'You lose.'
 	}else if (computerMove === 'paper'){
	 	result = 'You win.'
 	}else if (computerMove === 'scissors'){
	 	result = 'Tie.'
 	}
 } else if (playerMove === "rock"){
 	if (computerMove === 'rock') {
 		result = 'Tie.';
 	} else if (computerMove === 'paper') {
	 	result = 'You lose.';
 	} else if (computerMove === 'scissors') {
 		result = 'You win.';
 	}
 }else if (playerMove === 'paper'){
 	if (computerMove === 'rock') {
 		result = 'You win.';
 	} else if (computerMove === 'paper') {
 		result = 'Tie.';
 	} else if (computerMove === 'scissors') {
	 	result = 'You lose.';
 	}	
 }
 
 if(result === 'You win.'){
  	scores.wins += 1
  }else if(result === 'You lose.' ){
  	scores.losses +=1
  } else if (result = 'Tie.' ){
  	scores.ties += 1
  }
 	
 localStorage.setItem('score', JSON.stringify(scores))
 
  updateScore();
  document.querySelector('.js-result')
  	.innerHTML = result
  document.querySelector('.js-move')
  	.innerHTML = `You 
  	<img src="images/${playerMove}-emoji.png" class="move-icon" >
  	<img src="images/${computerMove}-emoji.png" class="move-icon" >
  	Computer`
 }
  
 function pickComputer() {
  const randomNumber = Math.floor(Math.random()*(3) +1)
  let computerMove=""
   if (randomNumber === 1){
   	  computerMove = 'rock'
   }else if (randomNumber === 2){
   	  computerMove = 'paper'
   }else if (randomNumber === 3){
   	  computerMove = 'scissors'
   }
   return computerMove
  }
  
  function updateScore(){
    document.querySelector('.js-score')
    	.innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`
  }