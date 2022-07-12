'use strict'
/*media html */
if (window.innerWidth <= 990){
    document.getElementsByClassName("header_Offer_RightSide_Img")[0].src = "Images/HalfOfferPhoneImg.png"
    document.getElementsByClassName("header_Offer_RightSide_BackgroundBlur")[0].style.right = "300px";
    document.getElementsByClassName("header_Offer_RightSide_BackgroundBlur")[0].style.width = "250px";
    document.getElementsByClassName("header_Offer_RightSide")[0].style.marginRight = "0px";
    console.log("Done")
}



/* show cookie block*/

let CookieBlock = document.getElementsByClassName('header_Cookie')[0];
window.onload = function(){
    let i = -100;
    let CookieShowing = setInterval(() => {
        CookieBlock.style.bottom = `${i}px`
        i+=1;
        console.log(i);
        if(i==0) clearInterval(CookieShowing);
        
    }, 10); 
}
function goga() {
    document.body.style.display = "none";
}
let button = document.getElementsByClassName('header_Cookie_Button')[0];

button.onclick = function() {
    let i = 10;
    let CookieHiding = setInterval(() => {
        i-=10;
        CookieBlock.style.bottom = `${i}px`
        console.log(i);
        if(i==-200) clearInterval(CookieHiding);
        
    }, 50);   
}

/*form validation*/

const ValidationBorder = document.querySelectorAll("input");
const TextArea = document.querySelector('textarea');
const FormButton = document.getElementsByClassName("GetInTouch_Feed_Form_Send")[0];






const form = document.querySelector('form');
form.addEventListener("submit", (even) => {
    even.preventDefault();
let i = 0;
        
    let InputsArray = [];
    for (let elem of form.elements){
        i++;
        if (elem.classList.contains("ValidationBorder") && !elem.value == ""){
            InputsArray[i] = 1
        }
        else if (elem.classList.contains("ValidationBorder") && elem.value == ""){
            InputsArray[i] = 0;
        }
    }
    if (InputsArray.includes(0)) {
        for (let elem of form.elements){
            if (elem.classList.contains("ValidationBorder")){
                elem.style.boxShadow = "0px 0px 0px 2px rgba(227, 48, 10, 0.85) inset";
                if (!elem.value == "") elem.style.boxShadow = "none";
            };
            
        }
    }
    if (!InputsArray.includes(0)) {
        for (let elem of form.elements){
            elem.style.boxShadow = "none";
        }
        setTimeout(() => {
                FormButton.innerHTML = "Lucky"
        }, 200);
        setTimeout(() => {
                FormButton.innerHTML = "Sent!"
        }, 400);
    };
    
});




    
