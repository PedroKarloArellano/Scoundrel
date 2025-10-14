//GLOBAL VARIABLES//
var startDeck = []
var healthPoints = 20;
var started = 0;
var avoid = 0;
var selectedCardID = "";
var selectedCardName = "";
var weapon = "";
var monster = "";
var usedCounter = 0;
var defeatedMonster = 100;
var potionCounter = 0;

//--------------------------------------------------//

function getRandomInt(max) {
        return Math.floor(Math.random() * max);
}

function randomizeDeck(){

    var rndDeck = [];

    while(startDeck.length>0){

        var cardRND = getRandomInt(startDeck.length);

        rndDeck.push(startDeck[cardRND]);
        
        //Remove selected cark from the deck
        startDeck.splice(cardRND, 1);
    }

    for(i = 0;i < rndDeck.length;i++){
        startDeck.push(rndDeck[i]);
    }
}

function detectUsed(card){
    if($(card).attr("class").includes("used")==true){
        return true;
    }
    else{
        return false;
    }
}

function detectValue(card){

    var value = parseInt(card.substring(0,2));

    //DETECTS IF THE VALUE IS NaN
    if(isNaN(value)){
        value = 0;
    }

    return value;
}

function detectType(card){

    if(card.includes("spades")==true){
        return ("spades");
    }

    if(card.includes("diamonds")==true){
        return ("diamonds");
    }

    if(card.includes("hearts")==true){
        return ("hearts");
    }

    if(card.includes("clubs")==true){
        return ("clubs");
    }

    if(card.includes("empty")==true){
        return ("empty");
    }
}

function avoidRoom(){
    if(avoid === 0){
        if(usedCounter === 0){
            for(i = 0;i<4;i++){
            newCard(0,startDeck[0]);
            removeUsed("#card"+(i+1));

            addUsed("#avoid");
        }
            avoid++;
        }else{
            $('.title').html("<h1><strong>Can't</strong> scape an started room</h1>");
        }
    }else{
        $('.title').html("<h1><strong>Can't</strong> avoid a room two times in a row</h1>");
    }

    newRoom();
    updateCardsLeft();
}

function completedRoom(){

    if(usedCounter <= 3){
        console.log(startDeck);
        //Deletes Used Cards from the deck
        for(i = 0;i<4;i++){
            //Detects if the Card doesnt have the Used class
            if(detectUsed("#card"+(i+1)) == false){
                console.log("Used not detected");
                var temp = startDeck[i];
                var tempIndex = i;
            }else{
                removeUsed("#card"+(i+1));
            }
        }

        for(i=0;i<4;i++){
            deleteCard(0);
        }

        startDeck.splice(tempIndex,0,temp);

        newRoom();
        updateCardsLeft();
        potionCounter = 0;

        addHidden("#completeRoom");
        removeHidden("#avoid");
        removeHidden("#fight");
        if(detectValue(weapon) != 0){
            removeHidden("#deteachWeapon");
        }else{
            console.log("You dont need to deteach weapon");
        }

        usedCounter = 0;
    }else{
        console.log(startDeck);
        //Deletes Used Cards from the deck
        for(i = 0;i<4;i++){
            //Detects if the Card doesnt have the Used class
            if(detectUsed("#card"+(i+1)) == false){
                console.log("Used not detected");
                var temp = startDeck[i];
                var tempIndex = i;
            }else{
                removeUsed("#card"+(i+1));
            }
        }

        for(i=0;i<4;i++){
            deleteCard(0);
        }

        newRoom();
        updateCardsLeft();
        potionCounter = 0;

        addHidden("#completeRoom");
        removeHidden("#avoid");
        removeHidden("#fight");
        if(detectValue(weapon) != 0){
            removeHidden("#deteachWeapon");
        }else{
            console.log("You dont need to deteach weapon");
        }

        usedCounter = 0;
    }

}

function newCard(cardIndex,cardValue){
    sendToBottom(cardValue);
    deleteCard(cardIndex);
}

function newRoom(){
    //SETS THE IMAGES OF THE 4 STARTING CARDS

    //Change the card1 IMG
    changeImage("#card1","./images/"+startDeck[0]);

    //Change the card2 IMG
    changeImage("#card2","./images/"+startDeck[1]);

    //Change the card3 IMG
    changeImage("#card3","./images/"+startDeck[2]);

    //Change the card4 IMG
    changeImage("#card4","./images/"+startDeck[3]);

    console.log(startDeck);

    if(startDeck.length < 4){
        addHidden("#card1");
        addHidden("#card2");
        addHidden("#card3");
        addHidden("#card4");

        addHidden(".container");

        changeTitle("<h1>You just <strong>WON</strong></h1><h2>CONGRATULATIONS</h2>");
        removeHidden(".health");
        removeHidden(".congratulations");
        $(".health").text("Your final score is: " + healthPoints);
        $(".restartButton").html("Go again?");

        removeHidden("#restart");
    }
}

function deleteCard(cardIndex){
    console.log(startDeck[cardIndex] + " deleted");
    //Remove selected card from the deck
    startDeck.splice(cardIndex, 1);
}

function sendToBottom(card){
    startDeck.push(card);
    return card;
}

function usePotion(){

    var valuePotion = detectValue(potion);

    if(potionCounter != 0){
        valuePotion = 0;
        changeTitle("<h1>You already used a <strong>potion</strong> this turn</h1>");
        console.log("Value potion = 0");
    }
    
    healthPoints = healthPoints + valuePotion;

    if(healthPoints > 20){
        healthPoints = 20;
    }

    $('.health').text("Health points: " + healthPoints);
    $('#potion').addClass("hidden");
    changeImage("#selectedCard","./images/empty.png"); 
    
    potionCounter++;
    
    addUsed(selectedCardID);
    usedCounter++;
    console.log("USED COUNTER" + usedCounter);

    if(usedCounter >= 3){
        console.log("USED COUNTER 3");
        removeHidden("#completeRoom");
        addHidden("#avoid");
        addHidden("#fight");
        addHidden("#deteachWeapon");
    }

    updateCardsLeft();
}

function addSelected(source){
    $(source).addClass("selected");
}

function addEquipped(source){
    $(source).addClass("equipped");
}

function addHidden(source){
    $(source).addClass("hidden");
}

function addUsed(source){
    $(source).addClass("used");
}

function removeSelected(source){
    $(source).removeClass("selected");
}

function removeEquipped(source){
    $(source).removeClass("equipped");
}

function removeHidden(source){
    $(source).removeClass("hidden");
}

function removeUsed(source){
    $(source).removeClass("used");
}

function changeImage(source,cardName){
    $(source).attr("src",cardName);
}

function changeTitle(title){
    $(".title").html(title);
}

function updateHealth(healthPoints){
    $('.health').text("Health points: " + healthPoints);
}

function updateCardsLeft(){
    $('.cardsLeft').text("CardsLeft: " + startDeck.length);
}

function setSelectedCardID(id){
    selectedCardID = id;
}

function setSelectedCardName(name){
    selectedCardName = name;
}

function getCardIndex(card){
    var cardIndex = card.substring(5) - 1;
    return cardIndex;
}

function diamondsFunction(selectedCard,cardID,cardName){

    if(detectUsed(cardID) == false){
        addEquipped("#weapon");
        changeImage("#weapon","./images/"+ cardName);   

        weapon = cardName;
        
        changeTitle("<h1>You equipped a <strong>weapon</strong></h1>");
        addUsed("#"+selectedCard);
        if(detectValue(weapon) != 0){
            removeHidden("#deteachWeapon");
        }else{
            console.log("You dont need to deteach weapon");
        }

        usedCounter++;
        defeatedMonster = 100;
        console.log("USED COUNTER" + usedCounter);

        changeImage("#attached","./images/empty.png");
    }
    else{
        changeTitle("<h1>You can't use this <strong>weapon</strong></h1>");
    }
}

function monsterFunction(cardName){
    monster = cardName;
    changeTitle("<h1>You selected a <strong>monster</strong></h1>");
}

function potionFunction(cardID,cardName){
    if(detectUsed(cardID) == false){
        potion = cardName;
        removeHidden("#potion");
        changeTitle("<h1>You selected a <strong>potion</strong></h1>");
    }
}

function deteachWeapon(){
    changeImage("#weapon","./images/00_no_weapon.png");
    weapon = "00_no_weapon.png";
    console.log(weapon);
    changeTitle("<h1>You deatached your <strong>weapon</strong></h1>");
    defeatedMonster = 100;
    addHidden("#deteachWeapon");

    updateCardsLeft();
}

//------------------INITIALIZE GAME-----------------//
$(document).keypress(function(){
    if(started === 0){
        startGame();
    }
});

$(".startGameButton").click(function(){
    if(started === 0){
        startGame();
    }
});

function startGame(){
    healthPoints = 20;
    started = 0;
    usedCounter = 0;
    defeatedMonster = 100;
    weapon = "00_no_weapon.png";

    startDeck = [
    "02_of_clubs.png", "02_of_diamonds.png", "02_of_hearts.png", "02_of_spades.png",
    "03_of_clubs.png", "03_of_diamonds.png", "03_of_hearts.png", "03_of_spades.png",
    "04_of_clubs.png", "04_of_diamonds.png", "04_of_hearts.png", "04_of_spades.png",
    "05_of_clubs.png", "05_of_diamonds.png", "05_of_hearts.png", "05_of_spades.png",
    "06_of_clubs.png", "06_of_diamonds.png", "06_of_hearts.png", "06_of_spades.png",
    "07_of_clubs.png", "07_of_diamonds.png", "07_of_hearts.png", "07_of_spades.png",
    "08_of_clubs.png", "08_of_diamonds.png", "08_of_hearts.png", "08_of_spades.png",
    "09_of_clubs.png", "09_of_diamonds.png", "09_of_hearts.png", "09_of_spades.png",
    "10_of_clubs.png", "10_of_diamonds.png", "10_of_hearts.png", "10_of_spades.png",
    "14_of_clubs.png", "14_of_spades.png", "11_of_clubs.png", "11_of_spades.png",
    "13_of_clubs.png", "13_of_spades.png", "12_of_clubs.png", "12_of_spades.png"]


    removeHidden("#card1");
    removeHidden("#card2");
    removeHidden("#card3");
    removeHidden("#card4");

    randomizeDeck();

    removeSelected("#selectedCard");
    removeEquipped("#weapon");

    addHidden(".instructions");

    addHidden("#completeRoom");
    removeHidden("#avoid");
    removeHidden("#fight");

    changeTitle("<h1>Select a <strong>card</strong></h1>");

    updateHealth(healthPoints);
    updateCardsLeft();

    changeImage("#selectedCard","./images/empty.png");
    changeImage("#weapon","./images/00_no_weapon.png");
    changeImage("#discarded","./images/empty.png");
    changeImage("#attached","./images/empty.png");

    removeHidden(".container");

    newRoom();

    started++;
}

//SELECT A CARD
$(".card").click(function(){
    
    var selectedCard = this.id;//eg. card1
    var cardIndex = selectedCard.substring(4);//eg. 1
    parseInt(cardIndex);
    
    var cardName = startDeck[cardIndex-1];//eg. 03_of_clubs
    var currentCardType = detectType(cardName);//eg. clubs
    var cardID = "#" + selectedCard; //eg. #card1

    //Show selected card
    addSelected("#selectedCard");

    //equip weapon
    if(currentCardType  == "diamonds"){
        diamondsFunction(selectedCard,cardID,cardName);
    }

    //Change the 'selected' card img
    if(currentCardType  != "diamonds"){

        //Change title
        if(currentCardType  == "spades" || currentCardType  == "clubs"){
            monsterFunction(cardName);
        }

        if(currentCardType  == "hearts" && usedCounter <= 3){
            potionFunction(cardID,cardName);
        }

        //Hide potion button
        if(currentCardType  != "hearts"){
            addHidden("#potion");
        }

        setSelectedCardID(cardID);
        setSelectedCardName(cardName);

        //Change selected card
        if(detectUsed(cardID) == false){
            changeImage("#selectedCard","./images/"+ cardName);
        }else{
            changeTitle("<h1>Card <strong>already</strong> used</h1>");
        }
    }

    //complete room
    if(usedCounter >= 3){
        console.log("USED COUNTER" + usedCounter);
        removeHidden("#completeRoom");
        addHidden("#avoid");
        addHidden("#fight");
        addHidden("#deteachWeapon");
    }
});

//FIGHT MECHANIC//

function fight(){

    var cardType = detectType($('#selectedCard').attr("src"));

    if(cardType != "empty" && cardType != "hearts"){
        if(detectUsed(selectedCardID) == false){
            console.log("Monster value is: " + detectValue(monster));
            console.log("defeated Monster Value is now: " + defeatedMonster);
            if(detectValue(monster) <= defeatedMonster){
                var damage = detectValue(monster) - detectValue(weapon);

                if(damage < 0){
                    damage = 0;
                }

                healthPoints = healthPoints - damage;

                updateHealth(healthPoints);
                updateCardsLeft();

                if(healthPoints <= 0){
                    changeTitle("<h1>YOU LOSED</h1>");
                    addHidden(".container");
                    removeHidden("#restart");
                    removeUsed("#avoid");
                }

                //Final Steps
                avoid = 0;
                removeUsed("#avoid");

                addUsed(selectedCardID);
                usedCounter++;
                console.log("USED COUNTER" + usedCounter);

                if(detectValue(weapon) === 0){
                    changeImage("#discarded","./images/"+ selectedCardName);
                    changeImage("#selectedCard","./images/empty.png");
                    defeatedMonster = 100;
                }else{
                    changeImage("#attached","./images/"+ selectedCardName);
                    changeImage("#selectedCard","./images/empty.png");
                    defeatedMonster = detectValue(monster);
                    console.log("defeated Monster Value is now: " + defeatedMonster);
                }

            }else{
                changeTitle("<h1>You can't fight a <strong>STRONGER</strong> monster until you <strong>change</strong> weapons</h1>");
            }
        }else{
            changeTitle("<h1>Please select a <strong>valid<strong> card</h1>");
        }
    }
    else{
        changeTitle("<h1>Please select a <strong>valid<strong> card</h1>");
    }

    //complete room
    if(usedCounter >= 3){
        removeHidden("#completeRoom");
        addHidden("#avoid");
        addHidden("#fight");
        addHidden("#deteachWeapon");
        addHidden("#potion");
    }
}

function restart(){
    addHidden("#restart");
    addHidden(".congratulations");
    addHidden("#deteachWeapon");
    
    for(i=0;i<4;i++){
        removeUsed("#card"+(i+1));
    }

    startGame();
}
