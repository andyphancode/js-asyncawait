let favNum = 42;
let baseURL = "http://numbersapi.com"


async function one() {
    let data = await $.getJSON(`${baseURL}/${favNum}?json`)
    console.log(data);
}
one();

let multiNum = [42, 43, 44]

async function two() {
    let data = await $.getJSON(`${baseURL}/${multiNum}?json`)
    for (num in data) {
        $("body").append(`<p>${data[num]}</p>`);        
    }
}
two();


async function three() {
    let fourFacts = await Promise.all(
        Array.from({length:4}, () => $.getJSON(`${baseURL}/${favNum}?json`))
    );
    fourFacts.forEach(fact => $("body").append(`<p>${fact.text}</p>`));
}

three();