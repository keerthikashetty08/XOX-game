let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn= document.getElementById("restart");
let msgRef= document.getElementById("message");

//winning pattern array
let winningPattern = [ [0,1,2], [0,3,6],[2,5,8],[6,7,8],[3,4,5],[1,4,7],[0,4,8],[2,4,6]];

//player x plays first
let xTurn=true;
let count=0;
//disable all buttons
const disableButtons = () =>{
    btnRef.forEach((element) => (element.disabled=true));
    //enable popup
    popupRef.classList.remove("hide");
};


//enable all buttons fornew game
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText="";
        element.disabled=false;
    });
    popupRef.classList.add("hide");
};

//new game
newgameBtn.addEventListener("click", () =>{
    count =0;
    enableButtons();
});
restartBtn.addEventListener("click",() =>{
    count =0;
    enableButtons();
})

//this function is to execute when player wins
const winFunction=(letter)=>{
    disableButtons();
    if(letter== "X"){
        msgRef.innerHTML = "&#x1F389; <br>  'X'  Won the Game ";
    }else{
        msgRef.innerHTML= "&#x1F389;  <br> 'O'  Won the Game "
    }
};


//function for draw
const drawFunction =() =>{
    disableButtons();
    msgRef.innerHTML= " &#x1F60E; <br> It's a Draw  "
};


//win logic
const winChecker=()=>{
    //loop through all win patterns
    for(let i of winningPattern){
        let [element1, element2, element3] =[btnRef[i[0]].innerText,btnRef[i[1]].innerText, btnRef[i[2]].innerText];
        //Check if element are filled 
        //if 3 empty elemets are same and would give win as win
        if(element1 != "" && element2 !="" & element3 !=""){
            if(element1 == element2 && element2 == element3){
                //if all 3 value are equal then pass the value as win
                winFunction(element1);
            }
        }
    }
}


//display x/0 on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if(xTurn){
            xTurn=false;
            //display x
            element.innerText="X";
            element.disabled=true;
        } else{
            xTurn=true;
            //display y
            element.innerText="O";
            element.disabled=true;
        }

        //increment count on each click
        count+=1;
        if(count==9)
        {
            drawFunction();
        }
        //check win on every click
        winChecker();
    });
});

//Enable buttons and siable popup on page load 
Window.onload = enableButtons();