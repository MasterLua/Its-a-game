var BattonLenght = 13;
var BattonSelected = 0
var BattonTable = []
var PlayWithRobot = false
var GameStarted = false
var BotIsPlaying = false

const GameDiv = document.getElementById("maingame");
const ValidateButton = document.getElementById("validate");
const ButtonRobotDiv = document.getElementById("robotgame")
const WarningMessageDiv = document.getElementById("msgwarning")

async function ReloadChecking() {
    GameDiv.innerHTML = '';
    for (var i = 0; i < BattonLenght; i++) {
        if(BattonTable[i].IsActive) {
            if(BattonTable[i].Selected) {
                CreateButton(i, true);
            }else{
                CreateButton(i, false);
            }
        }else{
            console.log("Button "+i+" is disable.")
        }
    }
}

async function CreateButton(i, selected) {
    let btn = document.createElement("button");
    btn.innerHTML = "";
    btn.type = "submit";
    btn.name = "Button"+i;
    btn.id = "Button"+i
    btn.className = "buttonclass"
    btn.style.position = "relative";
    btn.style.height = "150px";
    // btn.style.borderRadius = "20px"
    if(selected) {
        btn.style.backgroundColor = "rgb(78, 77, 77)";
    }
    GameDiv.appendChild(btn);
    btn.addEventListener("click", function(a, d){
        if(!BotIsPlaying) {
            var id = this.id.replace("Button", "")
            if(BattonTable[id].Selected) {
                BattonSelected--;
                BattonTable[id].Selected = false;
                ReloadChecking(); 
            }else{
                if(BattonSelected < 3) {
                    BattonSelected++;
                    BattonTable[id].Selected = true;
                    ReloadChecking();    
                }else{
                    alert("Attention vous ne pouvez pas selectioner plus de 3 !")
                }    
            }    
        }else{
            alert("LE BOT JOUE DEJA ! VEUILLEZ ATTENDRE LA FIN DE SON TOURS !")
        }
    })
    return btn;
}

ButtonBot();

function ButtonBot() {
    let ButtonRobot = document.createElement("button");
    ButtonRobotDiv.innerHTML = "<h1 class=\"Titre4\"><span class=\"titre1\">Jouer</span><span class=\"titre2\"> avec le </span><span class=\"titre1\"> robot :</span></h1> ";
    if(!PlayWithRobot) {
        ButtonRobot.innerHTML = "Non";
    }else{
        ButtonRobot.innerHTML = "Oui";
    }
    ButtonRobot.type = "submit";
    ButtonRobot.name = "Button"
    ButtonRobot.id = "robotbuton"
    ButtonRobotDiv.appendChild(ButtonRobot);
    
    ButtonRobot.addEventListener("click", function(){
        if(!GameStarted) {
            if(!PlayWithRobot) {
                PlayWithRobot = true;
                ButtonBot();
            }else{
                PlayWithRobot = false;
                ButtonBot();
            }    
        }else{
            alert("La partie a deja commencé recharger la page !")
        }
    })    
}


for (var i = 0; i < BattonLenght; i++) {
    console.log("Has Been created a button with ID \"Button"+i+"\".")
    BattonTable[i] = {
        IsActive: true,
        Selected: false,
        NameID: "Button"+i
    }
    CreateButton(i);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
  
ValidateButton.addEventListener("click", function(){
    if(!GameStarted) {
        GameStarted = true;
    }
    if(!BotIsPlaying) {
        BattonSelected = 0;
        for (var i = 0; i < BattonLenght; i++) {
            if(BattonTable[i].Selected) {
                BattonTable[i].Selected = false;
                BattonTable[i].IsActive = false;
            }
        }
        ReloadChecking();
        if(PlayWithRobot) {
            BotIsPlaying = true
            var TableForRemove = []
            for (var i = 0; i < BattonLenght; i++) {
                if(BattonTable[i].IsActive) {
                    TableForRemove.push(i)
                }
            }
            var NumPlayed = getRandomInt(1, 4)
            console.log("Robot will play " + NumPlayed)
            console.log("Table is " + TableForRemove.length)
            if(TableForRemove.length <= NumPlayed) {
                // Robot Perdu
                console.log("Robot lose.")
                
            }else{
                console.log("Robot Playing.")
                time = 1000;
                for(var i = 0; i < NumPlayed; i++) {
                    setTimeout(selecting.bind(null, i, TableForRemove, NumPlayed), time)
                    time = time + 1000;
                }
            }
        }    
    }else{
        alert("LE BOT JOUE DEJA ! VEUILLEZ ATTENDRE LA FIN DE SON TOURS !")
    }
})

function selecting(a, b, max) {
    if(a == max - 1) {
        BattonTable[b[a]].Selected = true;
        ReloadChecking();    
        setTimeout(function(){
            console.log("RESET !!")
            for(var i = 0; i < max; i++) {
                BattonTable[b[i]].Selected = false;
                BattonTable[b[i]].IsActive = false;
            }
            ReloadChecking();
            BotIsPlaying = false;
        }, 2000)
    }else{
        BattonTable[b[a]].Selected = true;
        ReloadChecking();    
    }
}

// COPYRIGHT REDOUU FOR SCHOOL