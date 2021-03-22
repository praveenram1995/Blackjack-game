var p_card1 = document.getElementById('pcard1'); //player cards  
var p_card2 = document.getElementById('pcard2');
var p_card3 = document.getElementById('pcard3');
var p_card4 = document.getElementById('pcard4');
var p_card5 = document.getElementById('pcard5');

var d_card1 = document.getElementById('dcard1'); //dealers cards
var d_card2 = document.getElementById('dcard2');
var d_card3 = document.getElementById('dcard3');
var d_card4 = document.getElementById('dcard4');
var d_card5 = document.getElementById('dcard5');

var deal = document.getElementById("deal"); //deal button
var hit = document.getElementById("hit"); //hit button
var stand = document.getElementById("stand"); //stand

var _100 = document.getElementById("_100"); //100 dollar button
var _200 = document.getElementById("_200"); //200 dollar button
var _500 = document.getElementById("_500"); //500 dollar button
var _bet = document.getElementById("bet"); //bet field 
var _bet_dis = document.getElementById("bet1"); //bet display 
var bank = document.getElementById("bank_dis"); //our bank field
var win_amount = document.getElementById("win_amount"); //display winner amount 

var new_game = document.getElementById("new_game"); // new game button
var overlay = document.getElementById("overlay"); //initial over lay before the game start
var overlay_winner = document.getElementById("overlay_winner"); //overlay to display winner 
var winner_display = document.getElementById("winner"); //winner display on winner overlay

var dealerscore = 0; //dealer score
var playerscore = 0; //player score 

var dcnt = 0; //dealer count
var pcnt = 0; //player count

overlay_winner.hidden = false; //making our winner over hidden to false
winner_display.style.display = "none"; //making winner display to none 
win_amount.style.display = "none"; //making our winning amount to be none

function card(val, name, suit) //creating a card constructor
{
    this.val = val;
    this.name = name;
    this.suit = suit;
    this.weight = val;
}

var names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; //names array consits of all the card names 
var suits = ["♥", "♦", "♠", "♣"]; //suits names
var cards = []; //new empty array to store all the cards
var shuffled_cards = []; //new empty array to store all the shuffuled cards 

for (var s = 0; s < suits.length; s++) //looping through the suits array 
{
    for (n = 0; n < names.length; n++) //looping through the names array
    {
        cards.push(new card(n + 1, names[n], suits[s])); //creating a new card using the card constructor and pushing in to the cards array
    }
}

function shuffle(array) //function for shuffling the cards 
{
    array.sort(function () {
        return Math.random() - 0.5;
    });
}

for (var i = 0; i < cards.length; i++) //looping through the cards array
{
    shuffled_cards.push(cards[i]); //pushing all the cards from cards array to shuffle_cards array
}

shuffle(shuffled_cards); //shuffling the shuffled_cards 

new_game.addEventListener("click", function () //adding the eventlistener to new_game button 
    {
        overlay.style.display = "none";
        new_game.hidden = true;
        newgame();
        dis1();
        stand.hidden = true;
        hit.hidden = true;
        alert("please make sure that u make a bet before dealing");
    });

function show_cards(arr, card) //function show_cards to display or to insert the values , names and suits into a card
{
    for (var i = 0; i < arr.length; i++) {
        var c = card;
        if (i == 0) //if the index of that particular element is "0" then give its inner HTMl value to name
        {
            arr[i].innerHTML = c.name;
        } else // else give its inner HTML value to suit
        {
            arr[i].innerHTML = c.suit;
        }
    }
}

function colour(arr, card) //function color to make red if the suit is hear or diamond else color is black
{
    for (var i = 0; i < arr.length; i++) {
        if (card.suit == "♥" || card.suit == "♦") {
            arr[i].style.color = "red";
        } else {
            arr[i].style.color = "black";
        }
    }
}

function start() //function start this will invoke when we press deal button
{
    d_card1.style.display = "block"; //displaying the card
    var d_1 = d_card1.children; //storing the childrens of dealer card into d_1 array
    var c = shuffled_cards.pop(); //popping one card
    show_cards(d_1, c); //calling the show_cards function
    colour(d_1, c); //calling the colour function
    weight(c); //calling the weight function
    dealerscore += c.weight; //calculating the dealer score 
    dcnt++; //increamenting the dealer count

    p_card1.style.display = "block"; //displaying the card
    var p_1 = p_card1.children; //storing the childrens of player card into p_1 array
    var c1 = shuffled_cards.pop(); //poping the card
    show_cards(p_1, c1); //calling the show_cards function
    colour(p_1, c1); //calling the colour function
    weight(c1); //calling the weight function
    playerscore += c1.weight; //calculating the player score
    pcnt++; //increamenting the player count

    p_card2.style.display = "block"; //displaying the player card
    var p_2 = p_card2.children; //storing the childrens of player in an array
    var c2 = shuffled_cards.pop(); //popping the card from shuffled cards 
    show_cards(p_2, c2); //calling the show_cards function
    colour(p_2, c2); //calling the colour function              
    weight(c2); //calling the weight function
    playerscore += c2.weight; //updating the player score 
    pcnt++; //increasing the player count
}

deal.addEventListener("click", function () //adding the event listener to deal button 
    {
        start(); //calling the start function
        stand.hidden = false; //stand button is displayed 
        hit.hidden = false; //hit button is displayed
        deal.hidden = true; //deal is hidden 
    });

function weight(x) //weight function
{
    if (x.name == "J" || x.name == "Q" || x.name == "K") //checking if name is J or Q or K
    {
        x.weight = 10; //then make its weight to 10
    } else if (x.name == "A") // if name is A 
    {
        x.weight = 11; // then weight is 11
    } else // else
    {
        x.weight = x.val; //make its weight to its val
    }
}

function _hit(pcnt) //hit function
{
    if (playerscore < 21) //checking if playerscore is less than 21 or not
    {
        x = shuffled_cards.pop(); // popping one card from the shuffled_cards 
        switch (pcnt) //switch case
        {
            case 3: //case 3
                p_card3.style.display = "block"; //displaying the card
                p_3 = p_card3.children; //storing the children in an array
                show_cards(p_3, x); //calling show cards function 
                colour(p_3, x); //calling the colour function
                weight(x); //calling the weight function
                pcnt++; //increamenting the player count
                playerscore += x.weight; //updating player score 
                break;

            case 4: //case 4
                p_card4.style.display = "block"; //displaying the card
                p_4 = p_card4.children; //storing the children in an array
                show_cards(p_4, x); //calling show cards function 
                colour(p_4, x); //calling the colour function
                weight(x); //calling the weight function
                pcnt++; //increamenting the player count
                playerscore += x.weight; //updating player score 
                break;

            case 5: //case 5
                p_card5.style.display = "block"; //displaying the card
                p_5 = p_card5.children; //storing the children in an array
                show_cards(p_5, x); //calling show cards function 
                colour(p_5, x); //calling the colour function
                weight(x); //calling the weight function
                pcnt++; //increamenting the player count 
                playerscore += x.weight; //updating player score 
                break;
        }
    }
}

hit.addEventListener("click", function () //adding the event listener to hit button
    {
        _hit(++pcnt); //calling the hit function
        setTimeout(function () {
            if (playerscore > 21) //checking the playerscore is greater than 21 or not
            {
                winner_display.innerHTML = "Winner is Dealer"; //displaying the winner is dealer
                win_amount.innerHTML = "YOU HAVE LOST : $ " + Number(_bet_dis.innerHTML); //displaying the amount lost
                winner_dis(); //calling the winner_dis function
            }
        }, 1000);
    });

function _stand(dcnt) //stand function
{
    hit.disabled = true; //hit button is disabled 
    if (dealerscore < 20) // checking the dealerscore is less than 20 or not
    {
        var y = shuffled_cards.pop(); //popping the card from the shuffled_cards 
        switch (dcnt) //switch case
        {
            case 2:
                d_card2.style.display = "block"; //displaying the card
                d_2 = d_card2.children; //storing the childrens in an array
                show_cards(d_2, y); //calling the show_cards function
                colour(d_2, y); //calling the colour function
                weight(y); //calling the weight function
                dcnt++; //increamenting the dealer count
                dealerscore += y.weight; //calculating the dealer score 
                break;

            case 3:
                d_card3.style.display = "block"; //displaying the card
                d_3 = d_card3.children; //storing the childrens in an array
                show_cards(d_3, y); //calling the show_cards function
                colour(d_3, y); //calling the colour function
                weight(y); //calling the weight function
                dcnt++; //increamenting the dealer count
                dealerscore += y.weight; //calculating the dealer score 
                break;

            case 4:
                d_card4.style.display = "block"; //displaying the card
                d_4 = d_card4.children; //storing the childrens in an array
                show_cards(d_4, y); //calling the show_cards function
                colour(d_4, y); //calling the colour function
                weight(y); //calling the weight function
                dcnt++; //increamenting the dealer count
                dealerscore += y.weight; //calculating the dealer score 
                break;

            case 5:
                d_card5.style.display = "block"; //displaying the card
                d_5 = d_card5.children; //storing the childrens in an array
                show_cards(d_5, y); //calling the show_cards function
                colour(d_5, y); //calling the colour function
                weight(y); //calling the weight function
                dcnt++; //increamenting the dealer count
                dealerscore += y.weight; //calculating the dealer score 
                break;
        }
    }
}
stand.addEventListener("click", function () //adding the eventlistener to stand button
        {
            setInterval(function () {
                        if (dealerscore < 19) //checking the dealer score 
                        {
                            _stand(++dcnt); //calling the stand function inside setInterval for 500 ms
            }
        }, 500);

        setTimeout(function () //setTimeOut function
        {
            winner(); //calling winner function
            winner_dis(); //calling the winner_dis function
        }, 2600);
        });

function winner() //winner function
{
    if (playerscore > dealerscore && playerscore <= 21) {
        winner_display.innerHTML = "Winner is Player";
        win_amount.innerHTML = "YOU HAVE WON : $ " + Number(_bet_dis.innerHTML) * 2;
    } else if (dealerscore > playerscore && dealerscore <= 21) {
        winner_display.innerHTML = "Winner is Dealer";
        win_amount.innerHTML = "YOU HAVE LOST : $ " + Number(_bet_dis.innerHTML);
    } else if (playerscore == dealerscore) {
        winner_display.innerHTML = "It is a Tie";
    }

    if (playerscore > 21) {
        winner_display.innerHTML = "Winner is Dealer";
        win_amount.innerHTML = "YOU HAVE LOST : " + Number(_bet_dis.innerHTML);
    }
    if (dealerscore > 21) {
        winner_display.innerHTML = "Winner is Player";
        win_amount.innerHTML = "YOU HAVE WON : $" + Number(_bet_dis.innerHTML) * 2;
    }
}
function winner_dis() //winner display function
{
    overlay_winner.hidden = false; //overlay is set to false
    winner_display.style.display = "block"; //winner display is shown
    win_amount.style.display = "block"; //winner amount is shown
    }

    function dis1() {
        overlay_winner.hidden = true;
        winner_display.style.display = "none";
        win_amount.style.display = "none";
    }

    function newgame() //new game function in which every card is hide 
    {
        d_card1.style.display = "none";
        d_card2.style.display = "none";
        d_card3.style.display = "none";
        d_card4.style.display = "none";
        d_card5.style.display = "none";
        p_card1.style.display = "none";
        p_card2.style.display = "none";
        p_card3.style.display = "none";
        p_card4.style.display = "none";
        p_card5.style.display = "none";
    }

function bet(n) //bet function to calculate the total amount win amount etc
{
    var temp = 0;
    temp = Number(_bet_dis.innerHTML) + Number(n);
    _bet_dis.innerHTML = temp;
    bank.innerHTML = Number(bank.innerHTML) - Number(n);
    if (Number(bank.innerHTML) <= 500 && Number(bank.innerHTML) > 10) {
        alert("your bank bal is low");
    } else if (Number(bank.innerHTML) <= 0) {
        alert("your bank bal is nill or zero");
    }
}