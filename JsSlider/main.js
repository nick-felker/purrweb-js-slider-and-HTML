/*I used onload event to start slider function. It`s promotes correct script execution. Also recently I started using strict directive in my projects. After I initialize constant variables and add some variables for my work, for example: offset I use to indicate how long the slider should be shifted; i I used for smooth movement of the slider. This variable follows offset until it catches up and the loop ends;dotsArray I use to refer to needful dot ;options object I used to set default slider`s options like image`s width, count is a count of images in slider, animSpeed is 
the number of microseconds after which the function of smooth displacement of the slider is called, spaceBetweenDots is a count of px between slider`s navigation dots; variable dotsActive i use to control motion by dots, if motion don`t stoped i off dots motion function, and after on it */
window.onload = function slider(){
'use strict'
//sorry but this slider works with img equal width <
const ArrowToRight = window.document.body.getElementsByClassName('ArrowToRight')[0];
const ArrowToLeft = window.document.body.getElementsByClassName('ArrowToLeft')[0];
const slides = window.document.body.querySelectorAll('.SlidesImg');
const sliderLine = window.document.body.querySelector('.SliderLine');
const dotsNavigBlock = window.document.body.querySelector('.dots');
let dotsArray = [];
const slider = window.document.body.querySelector('.Slider');
slider.style.width = slides[0].width;

let offset = 0, i = 0, dotsActive;
let options = {
    width: slides[0].width,
    count: slides.length,
    animSpeed: 5,
    spaceBetweenDots: 14,
}
//this function allow to change img by clicking on dots that you like, but does`nt ask why is it :]
function dots(index){
    dotsActive = false;
    if(num==index) {
        ArrowToLeft.onclick = SlideToLeft;
        ArrowToRight.onclick = SlideToRight;
        dotsActive = true;
        return;
    }
    if(num >= index){
        let numDuplicate = num;
        num --;
        offset+=options.width*(Math.abs(num-index))+options.width;
        let timer = setInterval(() => {
            i+=15;
            sliderLine.style.marginLeft = -i + "px";
            if (i == offset){
                ArrowToRight.onclick = SlideToRight; 
                ArrowToLeft.onclick = SlideToLeft;
                dotsArray[numDuplicate].style.backgroundColor = 'grey';
                num=index;
                numDuplicate = num;
                dotsArray[num].style.backgroundColor = 'black';
                dotsActive = true;
                clearInterval(timer);
                
            }
    }, options.animSpeed);
    }
    else{
        let numDuplicate = num;
        num++;
        offset-=options.width*(Math.abs(num-index))+options.width;
        ArrowToLeft.onclick = null;
        let timer = setInterval(() => {
        i-=15;
        if (i == offset){
          ArrowToLeft.onclick = SlideToLeft;
          ArrowToRight.onclick = SlideToRight;
          num = index;
          dotsArray[numDuplicate].style.backgroundColor = 'grey';
          dotsArray[num].style.backgroundColor = 'black';
          dotsActive = true;
          clearInterval(timer);
          
        }
        sliderLine.style.marginLeft = -i + 'px';
        }, options.animSpeed);
    }
}

let num = options.count;
// i used iife for initialization dots: this function expression draws definite count of dots, its depends on optinos.count (count of images in this slider);
+function initDots(){
    for(let w = 1;  w<=slides.length; w++){
        let dot = document.createElement('div');
        dot.classList.add('dotNavigation');
        dotsNavigBlock.prepend(dot);
        dot.style.marginRight = options.spaceBetweenDots + 'px';
        dotsArray[w] = dot; 
        dotsActive = true;
        dotsArray[w].onclick = function (){
            let index = dotsArray.indexOf(dotsArray[w]);
            ArrowToLeft.onclick =null;
            ArrowToRight.onclick = null;
            if(dotsActive) dots(index);
            
        };
    }
    dotsNavigBlock.firstElementChild.style.backgroundColor = 'black';
    
}()
//this is where the main logic of the slider movement begins. Function SliderToRight moves slider`s axis to the left by css property - marginLeft.
function SlideToRight (params) { 
   if(offset<options.width*options.count-options.width){
    num--;
        ArrowToRight.onclick = null;
        offset+=options.width;
        let timer = setInterval(() => {
            i+=5;
            sliderLine.style.marginLeft = -i + "px";
            //stop
            if (i == offset){
                ArrowToRight.onclick = SlideToRight; 
                ArrowToLeft.onclick = SlideToLeft;
                dotsArray[num].style.backgroundColor = 'black';
                dotsArray[num+1].style.backgroundColor = 'grey';
                dotsActive = true;
                clearInterval(timer);
            }
    }, options.animSpeed);
    } 
//creation slider`s clone at the end and delete it after;
    else{
        num = options.count;
        dotsArray[1].style.backgroundColor = 'grey';
        ArrowToRight.onclick = null;
        offset+=options.width;
        let clone = sliderLine.cloneNode(true);
        sliderLine.after(clone);
        clone.classList.add('fsfs')
        clone.style.marginLeft = 0 + 'px';
        let timer = setInterval(() => {
            i+=5;
            
            sliderLine.style.marginLeft = -i + "px";
            //stop motion
            if (i==offset){
                i = 0;
                offset = 0;
                sliderLine.style.marginLeft = 0 + "px";
                slider.removeChild(clone)
                ArrowToRight.onclick = SlideToRight;
                ArrowToLeft.onclick = SlideToLeft;
                dotsActive = true;
                dotsArray[options.count].style.backgroundColor = 'black';
                
                clearInterval(timer)
            }
        }, options.animSpeed);
    }     
    
}
//motion to left 
function SlideToLeft(params) {
//motion if current image isn`t first
  if(offset > 0){
      num++;
      offset-=options.width;
  ArrowToLeft.onclick = null;
  
  let timer = setInterval(() => {
      i-=5;
      if (i == offset){
        ArrowToLeft.onclick = SlideToLeft;
        ArrowToRight.onclick = SlideToRight;
        dotsArray[num-1].style.backgroundColor = 'grey';
        dotsArray[num].style.backgroundColor = 'black';
        dotsActive = true;
        clearInterval(timer);
      }
      sliderLine.style.marginLeft = -i + 'px';
  }, options.animSpeed);
  }
//motion if current image is first. Function creates slider`s clone and moves it before original. After function smoothly moves both elements and when clone`s last image appears on the visible area of ​​the slider the clone will be replaced by the original slider, and after will be delete
  else{   
      dotsArray[num].style.backgroundColor = 'grey';
      ArrowToLeft.onclick = null;
      let c = -options.width*options.count;
      let clone = sliderLine.cloneNode(true);
      sliderLine.prepend(clone);
      clone.style.marginLeft = -options.width*options.count + 'px';
      let timer = setInterval(() => {
          i+=5;
          c+=5;
          clone.style.marginLeft = c + 'px';
          if (i == options.width){ 
              
              offset = + options.width*options.count-options.width;
              i = offset;
              sliderLine.style.marginLeft = `-${options.width*options.count-options.width}px`
              clone.remove()
              ArrowToLeft.onclick = SlideToLeft;
              ArrowToRight.onclick = SlideToRight;
              num = 1;
              dotsArray[num].style.backgroundColor = 'black';
              dotsActive = true;
              clearInterval(timer);   
          }
      }, options.animSpeed);
  }
  
}
//click event on navigation arrows
ArrowToRight.onclick = SlideToRight 
ArrowToLeft.onclick = SlideToLeft;
}



