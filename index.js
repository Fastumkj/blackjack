let playerFirstCard = Math.floor(Math.random() * 11) + 1;
let playerSecondCard = Math.floor(Math.random() * 11) + 1;
let dealerFirstCard = Math.floor(Math.random() * 11) + 1;
let dealerSecondCard = Math.floor(Math.random() * 11) + 1;

let playerSum = playerFirstCard + playerSecondCard;
let dealerSum = dealerFirstCard + dealerSecondCard;

let stopDrawing = false;
let standButtonClicked = false;

let standardButtons = document.getElementById("standardButtons");
let startingButton = document.getElementById("startingButton");
let msg = document.getElementById("error-el");
let playerDisplayCardsMsg = document.getElementById("playerDisplayCards-el");
//let secondCardMsg = document.getElementById("secondCard-el");
let playerSumMsg = document.getElementById("playerSum-el");
let dealerDisplayCardsMsg = document.getElementById("dealerDisplayCards-el");
let dealerSumMsg = document.getElementById("dealerSum-el");
let betAmount = document.getElementById("amount-el");
let creditAmount = document.getElementById("creditAmount-el");
let newGameBtn = document.getElementsByClassName("newGameBtn")[0];
let drawCardBtn = document.getElementsByClassName("drawCardBtn")[0];
let standBtn = document.getElementsByClassName("standBtn")[0];
let beforeStartGame = document.getElementById("beforeStartGame");
let topUpBtn = document.getElementById("topup-el");
let betBtns = document.getElementById("betBtns");

let betSum = 0;
let cards = [
    [playerFirstCard, playerSecondCard],
    [dealerFirstCard, dealerSecondCard]
];

standardButtons.style.display = "none";

function topUp() {
    let topupAmount = creditAmount.textContent;
    topupAmount = Number(prompt("Top-up amount: "));
    if (topupAmount < 0) {
        alert("only positive numbers!");
        return;
    }
    creditAmount.textContent = Number(creditAmount.textContent) + Number(topupAmount);
    
}

function add() {
    betSum++;
    if (betSum > 20) {
        betSum = 20;
    } else if (betSum < 0) {
        betSum = 1;
    }
    betAmount.textContent = betSum;
}

function minus() {
    betSum--;
    if (betSum > 20) {
        betSum = 20;
    } else if (betSum < 0) {
        betSum = 1;
    }
    betAmount.textContent = betSum;
}

function selectAmount() {
    betSum = Number(prompt("Select your amount($1-$20): "));
    if (betSum > 20) {
        betSum = 20;
    } else if (betSum < 0) {
        betSum = 1;
    }
    betAmount.textContent = betSum;
}

function startGame() {
    if (creditAmount.textContent == 0) {
        alert('Not enough money! Please top up!');
    } else if (betAmount.textContent == 0) {
        alert('Please bet minimum of 1 dollar to 20 dollars');
    } else if (creditAmount.textContent < betAmount.textContent * 3) {
        alert('Please make sure you have sufficient funds. (credit amount must be at least 3x of betting amount)');
    } else {
        renderGame();
    }
}

function renderGame() {
    startingButton.style.display = "none";
    standardButtons.style.display = "block"

    beforeStartGame.style.display = "none";
    topUpBtn.style.display = "none";
    betBtns.style.display = "none";
    newGameBtn.disabled = true;
    newGameBtn.style.opacity = "0.5";

    let playerCardsText = "Cards: " + cards[0].join(" ");
    playerDisplayCardsMsg.textContent = playerCardsText;
    playerSumMsg.textContent = "Total Sum: " + playerSum;

    let dealerCardsText = "Cards: " + cards[1].join(" ");
    dealerDisplayCardsMsg.textContent = dealerCardsText;
    dealerSumMsg.textContent = "Total Sum: " + dealerSum;

    if (playerSum >= 21 || dealerSum >= 21) {
        if (playerSum == 22 && dealerSum == 21) {
            creditAmount.textContent = Number(creditAmount.textContent) + Number(betAmount.textContent);
            setTimeout(function() {
                alert("Good fight! You won 1x (3x from you - 2x from dealer) :), please click next game button to continue!");
            }, 1000);
        } else if (playerSum == 21 && dealerSum == 22) {
            creditAmount.textContent = Number(creditAmount.textContent) + Number(betAmount.textContent);
            setTimeout(function() {
                alert("Close fight! You lost 1x (2x from you - 1x from dealer) :), please click next game button to continue!");
            }, 1000);
        } else if (playerSum == 21 && dealerSum == 21 || playerSum == 22 && dealerSum == 22 ) {
            creditAmount.textContent = Number(creditAmount.textContent) + Number(betAmount.textContent);
            setTimeout(function() {
                alert("Close fight! It's a draw, please click next game button to continue!");
            }, 1000);
        } else if (playerSum == 21) {
            //print congrats msg out, hide all buttons and show next game button
            creditAmount.textContent = Number(creditAmount.textContent) + Number(betAmount.textContent) * 2;
            setTimeout(function() {
                alert("BLACKJACKKK! You have won 2x of your betting :), please click next game button to continue!");
            }, 1000);
        } else if (dealerSum == 21) { 
            creditAmount.textContent = Number(creditAmount.textContent) - Number(betAmount.textContent) * 2;
            setTimeout(function() {
                alert("You have lost 2x of your betting :(, please click next game button to continue.");
            }, 1000);
        } else if (playerSum == 22) {
            creditAmount.textContent = Number(creditAmount.textContent) + Number(betAmount.textContent) * 3;
            setTimeout(function() {
                alert("BEST PRIZE! You have won 3x of your betting :), please click next game button to continue!");
            }, 1000);
        } else if (dealerSum == 22) {
            creditAmount.textContent = Number(creditAmount.textContent) - Number(betAmount.textContent) * 3;
            setTimeout(function() {
                alert("You have lost 3x of your betting :(, please click next game button to continue.");
            }, 1000);
        }
        drawCardBtn.disabled = true;
        drawCardBtn.style.opacity = '0.5';
    }
}

function dealerDrawCard() {
    while (dealerSum < 16 && stopDrawing == true && cards[1].length < 5) {
        let nextCard = Math.floor(Math.random() * 11) + 1;
        dealerSum += nextCard;

        cards[1].push(nextCard);

        let cardsText = "Cards: " + cards[1].join(" ");
        dealerDisplayCardsMsg.textContent = cardsText;
        dealerSumMsg.textContent = "Total Sum: " + dealerSum;
    }

    if (cards[0].length >= 5 && playerSum <= 21) {
        msg.textContent = "You won the game against the dealer!";
        creditAmount.textContent = Number(creditAmount.textContent) + Number(betAmount.textContent);
    } else if (playerSum < dealerSum && dealerSum <= 21) {
        msg.textContent = "You lost against the dealer";
        creditAmount.textContent = Number(creditAmount.textContent) - Number(betAmount.textContent);
    } else if (playerSum > 21 && dealerSum <= 21) {
        msg.textContent = "You lost against the dealer";
        creditAmount.textContent = Number(creditAmount.textContent) - Number(betAmount.textContent);
    } else if (playerSum > dealerSum && playerSum <= 21) {
        msg.textContent = "You won the game against the dealer!";
        creditAmount.textContent = Number(creditAmount.textContent) + Number(betAmount.textContent);
    } else if (dealerSum > 21 && playerSum <= 21) {
        msg.textContent = "You won the game against the dealer!";
        creditAmount.textContent = Number(creditAmount.textContent) + Number(betAmount.textContent);
    } else if (playerSum > 21 && dealerSum > 21 || playerSum == dealerSum) {
        msg.textContent = "It's a draw, nobody wins.";
    }
}

function drawCard() {
    if (cards[0].length >= 5 || stopDrawing) {
        return ;
    }

    let nextCard = Math.floor(Math.random() * 11) + 1;
    playerSum += nextCard;

    //Add drawn card to array
    cards[0].push(nextCard);
    
    let cardsText = "Cards: " + cards[0].join(" ");
    playerDisplayCardsMsg.textContent = cardsText;

    playerSumMsg.textContent = "Total Sum: " + playerSum;

    if (playerSum >= 21 || cards[0].length >= 5) {
        drawCardBtn.disabled = true;
        drawCardBtn.style.opacity = "0.5";
    }
}

function stand() {
    if (standButtonClicked) {
        return;
    }

    stopDrawing = true;
    dealerDrawCard();

    newGameBtn.disabled = false;
    newGameBtn.style.opacity = "1.0";
    drawCardBtn.disabled = true;
    drawCardBtn.style.opacity = "0.5";
    standBtn.style.opacity = "0.5";

    standButtonClicked = true;
}

function newGame() {
    //Reset game variables
    standButtonClicked = false;
    playerFirstCard = Math.floor(Math.random() * 11) + 1;
    playerSecondCard = Math.floor(Math.random() * 11) + 1;
    dealerFirstCard = Math.floor(Math.random() * 11) + 1;
    dealerSecondCard = Math.floor(Math.random() * 11) + 1;

    playerSum = playerFirstCard + playerSecondCard;
    dealerSum = dealerFirstCard + dealerSecondCard;

    stopDrawing = false;

    cards = [
        [playerFirstCard, playerSecondCard],
        [dealerFirstCard, dealerSecondCard]
    ];

    //Reset UI elements
    standardButtons.style.display = "none";
    startingButton.style.display = "block";
    playerDisplayCardsMsg.textContent = "Cards: ";
    playerSumMsg.textContent = "Total Sum: ";
    dealerDisplayCardsMsg.textContent = "Cards: ";
    dealerSumMsg.textContent = "Total Sum: ";
    beforeStartGame.style.display = "block";
    topUpBtn.style.display = "block";
    betBtns.style.display = "block";
    drawCardBtn.disabled = false;
    drawCardBtn.style.opacity = "1.0";
    standBtn.style.opacity = "1.0";
    //startingScreen.style.display = "block";
    msg.textContent = "";
}
