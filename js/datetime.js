const title = document.querySelectorAll("h1"),
dateTitle = title[0],
clockTitle = title[1];

function getDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    dateTitle.innerText = `
    ${year}년 ${month}월 ${day}일`;
}

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}
        
        `;
    if (hours===24 && minutes===00 && seconds===00) {
        getDate();
    }
}

function init(){
    getDate();
    getTime();
    setInterval(getTime, 1000);
}

init();