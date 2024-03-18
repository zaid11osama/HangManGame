let letters="abcdefghijklmnopqrstuvwxyz+#";

//get Array from letters
let lettersArray=Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

//generate letters
lettersArray.forEach(letter =>{

    //create a span
    let span = document.createElement("span");

    //create text node letter
    let theLetter=document.createTextNode(letter);

    //append the letter to the span
    span.append(theLetter);

    //add class to the span
    span.className="letter-box";

    //append span to letters container
    lettersContainer.append(span);
});
//objects of words and categories
const words={
    programming:["python","javaScript","java","c++","c#","php","ruby","swift","rust"],
    Animals:["lion","elephant","dolphin","tiger","giraffe","penguin","koala","gorilla","zebra","kangaroo","chimpanzee","octopus"],
    Cars:["toyota","honda","ford","bmw","audi","chevrolet","tesla","hyundai","mazda","lexus","porsche","ferrari","nissan"],
    mobiles:["apple","samsung","huawei","oppo","vivo","sony","motorola","lenovo","realme"],
    players : ["messi","ronaldo","pele","maradona","zidane","xavi","iniesta","ronaldinho","maldini",],
    people:["Albert Einstein","William Shakespeare","Leonardo da Vinci","Bill Gates","J.K. Rowling","Beyonce Knowles","Mark Zuckerberg",],
    countries:["jordan","palestine","netherland","america","panama","egypt","germany","brazil"],
 
}
//get random proprety
let allKeys = Object.keys(words);
//category
let randomPropretyNumber = Math.floor(Math.random() * allKeys.length  );
//category words
let randomPropretyName = allKeys[randomPropretyNumber];
//category 
let randomPropretyValue = words[randomPropretyName]; 
//random number depends on word
let randomValueNumber = Math.floor(Math.random() * randomPropretyValue.length);

//guessed word
let randomValueValueName = randomPropretyValue[randomValueNumber];

//set category info
document.querySelector(".category span").innerHTML=randomPropretyName;

//select letters guess elements
let letterGuessContainer = document.querySelector(".letters-guess");

//convert chosen word to an array
let lettersAndSpace = Array.from(randomValueValueName);

//create spans depending on the word
lettersAndSpace.forEach(letter =>{

    //create empty span
    let emptySpan=document.createElement("span");

    //if the letter is a space add a special class
    if(letter ===" "){
        emptySpan.setAttribute("class","has-space");

    }
    
    //append to letter guess container
    letterGuessContainer.append(emptySpan);

});

//select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

//set wrong attempts
let wrongAttempts = 0;
let rightAttempts = 0;
//select the draw Element
let theDraw = document.querySelector(".hangman-draw");

//handle clicking on letters
console.log(randomValueValueName);
document.addEventListener("click",(e)=>{
    //set the status
let theStatus = false;

    if(e.target.className === "letter-box"){

        e.target.classList.add("clicked");

        //get clicked letter
        let clickedLetter=e.target.innerHTML.toLowerCase();
        //the chosen word
        let theGuessedWord = Array.from(randomValueValueName.toLowerCase());

        // lettersAndSpace ,,,guessed word as an array;

        theGuessedWord.forEach((guessesWordLetter,wordIndex)=>{
            if(guessesWordLetter.toLowerCase() === clickedLetter){

                //set status to true
                theStatus = true;
                for(let i=0 ;i<guessSpans.length ;i++)
                {
                    if(i === wordIndex)
                    letterGuessContainer.children[i].innerHTML=clickedLetter;
                    
                
                }
                

            }

        })
        //outside loop
        let gameName = document.querySelector(".game-name");
        let wordIs = document.querySelector(".category ");
        //if letter is wrong
        if(theStatus === false){

            //increase number of wrong attempts
            wrongAttempts++;

            // add class wrong to the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            //play sound fail
            document.getElementById("fail").play();

            if(wrongAttempts === 8){
                
                lettersContainer.classList.add("finished");
               
                gameName.innerHTML="Game Over : - (";
                
                wordIs.innerHTML = "word is: " + randomValueValueName;
                document.getElementById("loseGame").play();
            }
            
        }
        else{
            rightAttempts++;

            document.getElementById("success").play();
            
            if(rightAttempts >= randomValueValueName.length){
                lettersContainer.classList.add("finished");
                document.getElementById("winGame").play();
                 gameName = document.querySelector(".game-name");
                gameName.innerHTML=`you win after ${rightAttempts - wrongAttempts} trials`;
               
                // wordIs.innerHTML = "accuracy: " + (((wrongAttempts+ rightAttempts ) / randomValueValueName.length)*100) +"%";
                 
                


            }
        }
        
        
    }

});

//end game function

