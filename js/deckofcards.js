
const shuffleCardUrl = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let drawCardUrl = 'http://deckofcardsapi.com/api/deck/new/draw/?count=2';
const brandnewUrl = 'http://deckofcardsapi.com/api/deck/new/';

const docardbtn = document.querySelector('#do-card-btn');
const cardItem = document.querySelector('#imageitem');
const cardleft = document.querySelector('#cardleft'); 


const cardDiv = document.querySelector('#cardItem');

const imageClick = document.querySelector('#cardItem'); 




let isStart = true;

// image click
imageClick.addEventListener('click', function () {

    let _url = isStart ? shuffleCardUrl : drawCardUrl;

    fetchCardData(_url);

});

docardbtn.addEventListener('click', function () {

    let _url = isStart ? shuffleCardUrl : drawCardUrl;

    console.log(docardbtn.innerHTML.search('Klicka')); 

    if (docardbtn.innerHTML.search('Hämta') >= 0 ) {docardbtn.innerHTML = "Klicka en gång till";}
    else if (docardbtn.innerHTML.search('Klicka') >= 0 ) {docardbtn.innerHTML = "Nu kan du klicka på kortet";}

    fetchCardData(_url);


});


const fetchCardData = async (url) => {
    await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

        .then(response => response.json())
        .then(jsondata => {

            if (!isStart) {
                createCardElement(jsondata.cards[0].image);
                cardleft.innerHTML = `Återstående kort: ${jsondata.remaining}`; 
            }
            else {
                isStart = false;
                drawCardUrl = drawCardUrl.replace('/new', '/' + jsondata.deck_id)

                console.log(drawCardUrl);

                cardleft.innerHTML = "";
                cardleft.innerHTML = `Återstående kort: ${jsondata.remaining}`; 
            }
        })
        .catch(err => console.log(err))

}

const createCardElement = (imgsrc) => {

    cardDiv.innerHTML = "";

    let _main = document.createElement('div');
    _main.setAttribute('width', "100%");


    let _img = document.createElement('img');
    _img.src = imgsrc;
    _img.classList.add('rotate');

    console.log(_img);
    console.log(_main);
    _main.appendChild(_img);

    cardDiv.appendChild(_main);
} 


// Funktion används ej
// Blev inte bra. Kanppen måste finnas initial vilket innebär att hela flexbox strukturen måste byggas
//  när man öppnas sidan just för att ha en kappa att klicka på. 
const createCardElementX = (imgsrc) => {

    cardDiv.innerHTML = "";

    //Flexbox element
    let _main = document.createElement('div');
    _main.classList.add('flx-main');

    let _flx_ch1 = document.createElement('div');
    _flx_ch1.classList.add('flx-main__ch'); 

    let _flx_ch2 = document.createElement('div');
    _flx_ch2.classList.add('flx-main__ch');     

    //Button
    let _btn = document.createElement('button');
    _btn.classList.add('btn', 'btn-primary'); 
    console.log('button ' + _btn);
    _btn.setAttribute('id', 'do-card-btn'); 
    _btn.innerHTML = 'Hämta ett kort'; 

    let _img = document.createElement('img');
    _img.src = imgsrc;
    _img.classList.add('rotate');
    _flx_ch2.appendChild(_img); 

    _flx_ch1.appendChild(_btn); 


    _main.appendChild(_flx_ch1);
    _main.appendChild(_flx_ch2); 

    cardDiv.appendChild(_main);
} 


