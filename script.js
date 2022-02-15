const movieList = {
    1: 20,
    2: 30,
    3: 40,
};
const selectMovie = document.querySelector('#js-movie');
let storageMovie = localStorage.getItem('selectMovie') ?? 1;
let selectTickets = getStorageTickets();
let totalSelected = 0;
let moviePrice = 0;

document.querySelector('#js-movie').value = storageMovie;

selectTickets.forEach(function(item) {
    document.querySelector('span[data-id="' + item + '"]').classList.add('selected');
});

function calcPrice() {
    totalSelected = document.querySelectorAll('.selected').length;
    moviePrice = movieList[storageMovie];

    if (! localStorage.getItem('selectMovie')) {
        localStorage.setItem('selectMovie', storageMovie);
    }
    
    document.getElementById('js-total-price').innerText = totalSelected * moviePrice;
    document.getElementById('js-total-ticket').innerText = totalSelected;
}

function getStorageTickets() {
    let storageTickets = localStorage.getItem('selectTickets');
    
    if (storageTickets === null) {
        return [];
    } else {
        return JSON.parse(storageTickets);
    }
}

function setStorageTickets(ticket) {
    let storageTickets = getStorageTickets();
    storageTickets.push(ticket);

    localStorage.setItem('selectTickets', JSON.stringify(storageTickets));
}

function removeStorageTickets(ticket) {
    let storageTickets = getStorageTickets();

    storageTickets = storageTickets.filter(function(item) {
        return item != ticket
    })

    localStorage.setItem('selectTickets', JSON.stringify(storageTickets));
}

calcPrice();

document.querySelector('#js-ticket-wrapper').addEventListener('click', function(e) {
    let selectTarget = e.target;
    const selectDataId = selectTarget.getAttribute('data-id');
    
    if (selectTarget.nodeName == 'SPAN') {
        // remove ticket
        if (selectTarget.classList.contains('selected')) {
            selectTarget.classList.remove('selected');
            removeStorageTickets(selectDataId);
            calcPrice();
        // no select ticket
        } else if(selectTarget.classList.contains('filled')) {
            console.log('bu koltuk dolu!');
        // add ticket
        } else {
            selectTarget.classList.add('selected');
            setStorageTickets(selectDataId);
            calcPrice();
        }
    }
});

document.querySelector('#js-movie').addEventListener('change', function(e) {
    localStorage.setItem('selectMovie', e.target.value);
    storageMovie = localStorage.getItem('selectMovie');

    calcPrice();
});