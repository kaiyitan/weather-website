console.log('Client side javascript file is loaded');

const weatherform = document.querySelector('form');

const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two')

weatherform.addEventListener('submit', (e) => {

    e.preventDefault();

    messageOne.textContent = "Loading";
    messageTwo.textContent = "";

    const location = search.value;

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
})