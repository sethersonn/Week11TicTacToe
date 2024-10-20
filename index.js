/*Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
Create a Tic-Tac-Toe game grid using your HTML element of choice.
When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
A heading should say whether it is X's or O's turn and change with each move made.
A button should be available to clear the grid and restart the game.
When a player has won, or the board is full and the game results in a draw,
 a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.
*/


//hide alerts so they aren't always present
$('#alertStart').hide();
$('#alertWinner').hide();
$('#alertDraw').hide();

//arry of winning combinations
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


//create a class for players, keep track of turns. Maybe keep track of turns by using a boolean value associated with X and O. 
//Or every even turn is O and every odd is X

class Players {
    constructor() {
        this.currentPlayer = "X";
        this.turns = 0;
        this.winner = null;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.turns++;
    }

    reset() {
        this.currentPlayer = "X";
        this.turns = 0;
        this.winner = null;
    }
}

const players = new Players();

//handle clicks

$('.col').on('click', function () {
    //using 'this' to refer to the clicked cell
    const cell = $(this); // store the clicked cell

    //check if cell is taken
    if (cell.text() === '' && !players.winner) {
        //mark the cell with the current player's symbol
        cell.text(players.currentPlayer);

        if (players.turns === 0) {
            //hide the start alert so it doesn't stay all game
            $('#alertStart').hide();
        }

        //check for a win condition
        if (checkWinCondition()) {
            players.winner = players.currentPlayer;
            $('#alertWinner').text(`${players.currentPlayer} wins!`).show();
        } else if (players.turns === 8) {
            //checking for draw
            $('#alertDraw').show();
        } else {
            players.switchPlayer(); //switch turns
            $('#playerturn').text(`It's ${players.currentPlayer}'s Turn!`);
        }
    }
});


//check win conditions

function checkWinCondition() {
    return winConditions.some(condition => {
        return condition.every(index => {
            return $(`#grid${index}`).text() === players.currentPlayer;
        });
    });
}


//start game button

$('#startBtn').on('click', function () {
    /*players.reset();
    $('#alertStart').show();
    $('#playerturn').text(`It's ${players.currentPlayer}'s Turn!`);*/
    $('.col').text('');//clears cells
    players.reset(); //reset players using the class method
    $('#alertStart').show();
    $('#alertWinner').hide();
    $('#alertDraw').hide();
    $('#playerturn').text("It's X's Turn!")
});

//create an event that clears the grid and restarts the game when button is clicked

$('#restartBtn').on('click', function () {
    $('.col').text('');//clears cells
    players.reset(); //reset players using the class method
    $('#alertStart').show();
    $('#alertWinner').hide();
    $('#alertDraw').hide();
    $('#playerturn').text("It's X's Turn!")
})


//create an alert for when a player has won, or the board is full and it's a draw, announcing winner