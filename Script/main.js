const myHeading = document.querySelector('h1');
let myButton=document.querySelector('button');
myHeading.textContent="Good Morning ";

const myImage = document.querySelector('img[alt="Corgi"]');
myImage.onclick=function(){
    let mySrc = myImage.getAttribute('src');
    //console.log(mySrc);
    if(mySrc==="Image/Corgi.jpeg"){
        alert("It's Corgi");
    }
}

if(!localStorage.getItem('name')){
    setUserName();
}else{
    let storeName=localStorage.getItem('name');
    myHeading.textContent="Good Morning Britain, "+storeName;
}
function setUserName(){
    let name =prompt("Please enter your name.");
    if(!name){
        setUserName();
        return;
    }
    localStorage.setItem('name',name);
    myHeading.textContent="Good Morning Britain, "+name;
}
myButton.onclick=function(){
    setUserName();
}
