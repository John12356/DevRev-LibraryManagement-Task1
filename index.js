const loginBtn=document.getElementById('login-btn');
const closeBtn=document.getElementsByClassName('login-close');
const loginPage=document.querySelector('.login-page');

const cartBtn=document.getElementById('cart-btn');
const closeCartBtn=document.querySelector('.cart-close');
const cartPage=document.querySelector('.cart-page');

const container=document.getElementById('container');
const search=document.querySelector('#search-bar');
const apiKey = 'AIzaSyCf22z93Um6fWkFlUKDWf0gymqFsjFBW0E';
const cart=document.getElementsByClassName("cart-content")[0];
const total=document.getElementById('final-cart');
const cartVal=document.getElementById('cart-count');
const flipper=document.getElementById('flipper');
const availability=document.querySelector('.availability');
const startDate=document.getElementById("start-d");
const endDate=document.getElementById("end-d");
const filteredAuthors=document.getElementById("filterbyauthor");
const filterbtn=document.getElementsByClassName("filter-menu")[0];
const radioAll=document.getElementsByClassName("radiosAll");
const rentBtn=document.getElementsByClassName('rent-btn')[0];


function filtertab(){
    if(filterbtn.style.transform=="scaleY(0)"){
        filterbtn.style.transform="scaleY(100%)";
    }else{
        filterbtn.style.transform="scaleY(0)";
    }
}

var startdate="";
var enddate="";
var author=[];
var s="";

////////////// login woriking/////////////////
loginBtn.addEventListener('click',()=>{
    if(loginBtn.textContent=="Sign Out"){
        alert("Signout Successfully");
        loginBtn.innerText="Login"
        loginBtn.style.pointerEvents="";
        return;
    }
    loginPage.classList.toggle('show-login-page');
});
for(let i of closeBtn){
    i.addEventListener('click',()=>{
        loginPage.classList.toggle('show-login-page');
    });
}
///////////////cart working/////////////////
cartBtn.addEventListener('click',()=>{
    cartPage.classList.toggle('show-cart-page');
});
closeCartBtn.addEventListener('click',()=>{
    cartPage.classList.toggle('show-cart-page');
});


search.addEventListener("change",()=>{
    if(search.value==""){
        s="";
        loaditems();
    }else{
        s=search.value;
        searchfun(search.value);
    }
})

function filter(){
    let arr=[];
    for(let i of radioAll){
        if(i.checked==true){
            arr.push(i.parentNode.children[1].textContent);
        }
    }
    if(arr.lenght==0 || s=="") return;
    for(let i of container.children){
        if(!arr.includes(i.children[4].children[0].textContent)){
            container.removeChild(i);
            continue;
        }
    }
    
}

function searchfun(){
    container.innerHTML="";
    filteredAuthors.innerHTML=`<h3>Filter By Author</h3>`;
    // let storeBooks=[];
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${s}&publishedDate:${startdate}:${enddate}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    for(let i=0; i<data.items.length && i<19;i++){
        let authors="";
        for(let j of data.items[i].volumeInfo.authors){
            authors+=j;
            if(filteredAuthors.children.length<5){
                filteredAuthors.innerHTML+=`<div class="author-selection">
                <input type="radio" name="" id="" class="radiosAll">
                <p>${j}</p>
            </div>`;
            }
        }
        
        let rand=(Math.floor(Math.random()*400))+100;
        let avail=(Math.floor(Math.random()*25))+5;

        container.innerHTML+=`
        <div class="card">
            <h6 class="availability" >${avail}</h6>
            <img class="book-img" src="${data.items[i].volumeInfo.imageLinks.thumbnail}" alt="">
            <h4 class="book-name">${data.items[i].volumeInfo.title}</h4>
            <p class="book-price">Price: Rs <span>${rand}</span></p>
            <p class="book-author">Author: <span>${authors}</span></p>
            <button id="rent" onclick="addToCart(this.parentNode)">Buy Now</button>
        </div>`; 
    }
  })
  .catch(error => {
    console.error(error);
  });
}



//////////////////////////////////////////////
// window.onload=firebase.initializeApp(config);
window.onload=loaditems();
function loaditems(){
    var startIndex=Math.floor(Math.random() * 50);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&startIndex=${startIndex}&maxResults=30&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for(let i of data.items){
            let authors="";
            for(let j of i.volumeInfo.authors){
                authors+=j;
            }
            let rand=(Math.floor(Math.random()*400))+100;
            let avail=(Math.floor(Math.random()*25))+5;
            container.innerHTML+=`
            <div class="card">
                <h6 class="availability" >${avail}</h6>
                <img class="book-img" src="${i.volumeInfo.imageLinks.thumbnail}" alt="">
                <h4 class="book-name">${i.volumeInfo.title}</h4>
                <p class="book-price">Price: Rs <span>${rand}</span></p>
                <p class="book-author">Author: <span>${authors}</span></p>
                <button id="rent" onclick="addToCart(this.parentNode)">Buy Now</button>
            </div>`;
        }
    })
    .catch(error => {
        console.error(error);
    });
}
//////////////////////////////////////////////////////
let totalAmount=0;
function addToCart(item){
    item.children[0].textContent--;
    cart.innerHTML+=`
    <div class="item-cart">
        <img src="${item.children[1].src}" alt="">
        <p class="book-name-cart">${item.children[2].textContent}</p>
        <p class="book-price">Rs.<span>${item.children[3].children[0].textContent}<span></p>
        <button class="remove-cart" onclick="test(this.parentNode)">
            <img id="remove-cart-img" src="images/icons8-delete-30.png" alt="">
        </button>
    </div>`
    
    cartVal.innerHTML++;
    totalAmount+=parseInt(item.children[3].children[0].textContent );
    total.innerHTML=`
    <div class="total-price">
        <h2 class="total">Total</h2>
        <h2>Rs.${totalAmount}</h2>
    </div>`
}

function test(item){
   cart.removeChild(item);
   
   cartVal.innerHTML--;
   totalAmount-=parseInt(item.children[2].children[0].textContent );
    total.innerHTML=`
    <div class="total-price">
        <h2 class="total">Total</h2>
        <h2>Rs.${totalAmount}</h2>
    </div>`
}

function signin(){
    flipper.style.transform="rotateY(0deg)";
}
function signup(){
    flipper.style.transform="rotateY(180deg)";
}

rentBtn.addEventListener('click',()=>{
    alert("Rented Succcessfully To Your Home Address");
})