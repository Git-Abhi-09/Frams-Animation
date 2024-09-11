const frames = {
    currentIndex:0,
    maxIndex:55
}

let imagesLoaded = 0;
const images = [];

const canves = document.querySelector("canvas");
const context = canves.getContext("2d");

function preloadImages(){
    for(var i = 0;i<=frames.maxIndex;i++){
        const imgUrl = `./video_to_img/clock/21952-323495860_medium_${i.toString().padStart(3,"0")}.jpg`
        const img = new Image();
        img.src = imgUrl;
        img.onload = ()=>{
            imagesLoaded++;
            if(imagesLoaded === frames.maxIndex){
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}

function loadImage(index){
    if(index>=0 && index<=frames.maxIndex){
        const img = images[index];
        canves.width = window.innerWidth;
        canves.height = window.innerHeight;
        
        const scaleX = canves.width / img.width;
        const scaleY = canves.height / img.height;
        const scale = Math.max(scaleX,scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canves.width - newWidth)/2;
        const offsetY = (canves.height - newHeight)/2;

        context.clearRect(0,0,canves.width,canves.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img,offsetX,offsetY,newWidth,newHeight);
        frames.currentIndex = index;
    }
}

function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger:{
            trigger:".parent",
            start:"top top",
            scrub:2
        }
    })

    tl.to(frames,{
        currentIndex:frames.maxIndex,
        onUpdate:function(){
            loadImage(Math.floor(frames.currentIndex))
        }
    })
}

preloadImages();