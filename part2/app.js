let baseURL = 'https://deckofcardsapi.com/api/deck';

async function one() {
    let data = $.getJSON(`${baseURL}/new/draw/`);
    let suit = data.cards[0]['suit'];
    let value = data.cards[0]['value'];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

async function two() {
    let firstCard = await $.getJSON(`${baseURL}/new/draw`);
    let secondCard = await $.getJSON(`${baseURL}/${firstCard.deck_id}/draw`);
    console.log(`${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}`);
    console.log(`${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}`);
}
two();

async function three() {
    let $btn = $('button');
    let $cardArea = $('#cards');    
    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.on('click', async function() {
        let cardData = await  $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
        let cardImageURL = cardData.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardImageURL,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (cardData.remaining === 0) $btn.remove();
    })
}
three();