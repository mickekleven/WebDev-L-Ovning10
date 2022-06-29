const starwarsurl = 'https://www.swapi.tech/api/people/?name=';

let swform = document.querySelector('#swform');
let swbtn = document.querySelector('#swbtn');
const outresult = document.querySelector('#out-result');
const charField = document.querySelector('#charfield');

//Event listerner

swform.addEventListener('input', function () {
    if (charField !== null && charField.value !== '') {
        swbtn.disabled = false;
    }
    else {
        swbtn.disabled = true;
    }
});


swbtn.addEventListener('click', function () {

    let _url = starwarsurl + encodeURIComponent(charField.value);



    console.log(_url);
    fetchData(_url);
});



const submitForm = () => {

    console.log('Kommer jag ens hit');
    console.log(swform);
}



const fetchData = async (url) => {
    await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    .then(response => response.json())
    .then(jsondata => {
        outresult.innerHTML = "";

        //let jsonStr =  JSON.stringify(jsondata);

        outresult.innerHTML +=  'Height : ' + jsondata.result[0].properties.height + '&#10'; 
        outresult.innerHTML += 'Mass : ' + jsondata.result[0].properties.mass + '&#10';  
        outresult.innerHTML += 'Hair color : ' + jsondata.result[0].properties.hair_color + '&#10';  
        outresult.innerHTML += 'Skin color : ' + jsondata.result[0].properties.skin_color + '&#10';  
        outresult.innerHTML += 'Eye color : ' + jsondata.result[0].properties.eye_color + '&#10';   
        outresult.innerHTML += 'Gender : ' + jsondata.result[0].properties.gender + '&#10';   

/*         outresult.innerHTML = result;
        outresult.innerHTML += jsondata.message;
        outresult.innerHTML += jsondata.result[0].properties.height; */
    

    })
        .catch(err => console.log(err))

}