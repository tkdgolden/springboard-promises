$(function() {
    const $fact1 = $("#fact1");
    const $facts2 = $("#facts2");
    const $facts3 = $("#facts3");
    const $card1 = $("#card1");
    const $card1of2 = $("#card1of2");
    const $card2of2 = $("#card2of2");
    const $button = $("button");
    const $manyCards = $("#manyCards")

    const num1 = 17;
    function oneNumFact(num) {
        axios.get(`http://numbersapi.com/${num}?json`)
            .then(data => $fact1.text(data.data.text));
    }
    oneNumFact(num1);

    const nums2 = [2, 5, 17];
    function multipleNumsFacts(numsArray) {
        axios.get(`http://numbersapi.com/${numsArray}?json`)
            .then(function(data) {
                for (var num in numsArray) {
                    const text = data.data[numsArray[num]];
                    const li = $("<li></li>").text(text);
                    $facts2.append(li);
                }
            });
    }
    multipleNumsFacts(nums2);

    function fourFactsOneNum(num) {
        axios.get(`http://numbersapi.com/${num}?json`)
            .then(function(data) {
                var li1 = $("<li></li>").text(data.data.text);
                $facts3.append(li1);
                return axios.get(`http://numbersapi.com/${num}?json`)
            })
            .then(function(data) {
                var li2 = $("<li></li>").text(data.data.text);
                $facts3.append(li2);
                return axios.get(`http://numbersapi.com/${num}?json`)
            })
            .then(function(data) {
                var li3 = $("<li></li>").text(data.data.text);
                $facts3.append(li3);
                return axios.get(`http://numbersapi.com/${num}?json`)
            })
            .then(function(data) {
                var li4 = $("<li></li>").text(data.data.text);
                $facts3.append(li4);
                return axios.get(`http://numbersapi.com/${num}?json`)
            })
    }
    fourFactsOneNum(num1);

//////////////////////////////////////////////////////////////////////////////////// 

    function newShuffledDeck() {
        return axios.get('https://deckofcardsapi.com/api/deck/new/shuffle');
    }

    function singleCard() {
        var card1 = {};
        newShuffledDeck()
            .then(function(data) {
                return axios.get(`https://deckofcardsapi.com/api/deck/${data.data.deck_id}/draw`)
            })
            .then(function(data) {
                card1.value = data.data.cards[0].value;
                card1.suit = data.data.cards[0].suit;
                console.log(card1.value + " of " + card1.suit);
                var li = $("<li></li>").text(card1.value + " of " + card1.suit);
                $card1.append(li);
            })
    }

    singleCard();

    function twoCards() {
        var card1 = {};
        var card2 = {};
        newShuffledDeck()
            .then(function(data) {
                return axios.get(`https://deckofcardsapi.com/api/deck/${data.data.deck_id}/draw`)
            })
            .then(function(data) {
                card1.value = data.data.cards[0].value;
                card1.suit = data.data.cards[0].suit;
                console.log(card1.value + " of " + card1.suit);
                $card1of2.text(card1.value + " of " + card1.suit);
                return axios.get(`https://deckofcardsapi.com/api/deck/${data.data.deck_id}/draw`)
            })
            .then(function(data) {
                card2.value = data.data.cards[0].value;
                card2.suit = data.data.cards[0].suit;
                console.log(card2.value + " of " + card2.suit);
                $card2of2.text(card2.value + " of " + card2.suit);
            })
    }

    twoCards();


    function getCard(deckId) {
        var card1 = {};
        deckId.then(data => data.data.deck_id)
            .then(deckId => {
                return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw`)
            })
            .then(data => {
                console.log(data);
                card1.value = data.data.cards[0].value;
                card1.suit = data.data.cards[0].suit;
                console.log(card1.value + " of " + card1.suit);
                var li = $("<li></li>").text(card1.value + " of " + card1.suit);
                $manyCards.append(li);
            })
    }

    const deck = newShuffledDeck()

    $button.on("click", function() {
        getCard(deck);
    })
});


