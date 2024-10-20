//baseling
const header = document.getElementsByTagName("head")[0]
const _base = document.createElement("base")
_base.href = "http://127.0.0.1:3000/openmathapp/slideshows/"
header.appendChild(_base)
const _link = document.createElement("link")
_link.rel = "stylesheet"
_link.href = "slides_styles.css"
header.appendChild(_link)


//making buttons
var back = document.createElement("button");
back.setAttribute("id", "back");
var back_image = document.createElement("img");
back_image.setAttribute("src", "prev_frame.png");
back_image.style.width = "40px";
back.appendChild(back_image);
document.getElementsByClassName("videoPlayer")[0].appendChild(back);
back.addEventListener('click', nextSlide);
var forward = document.createElement("button");
forward.setAttribute("id", "forward");
var forward_image = document.createElement("img");
forward_image.setAttribute("src", "next_frame.png");
forward_image.style.width = "40px";
forward.appendChild(forward_image);
document.getElementsByClassName("videoPlayer")[0].appendChild(forward);
forward.addEventListener('click', nextSlide);
var currentSlideNumber = 0;
var slides = document.getElementsByClassName("slide");

for (var _i = 0, slides_1 = slides; _i < slides_1.length; _i++) {
    element = slides_1[_i];
    element.style.display = "none";
}
slides[0].style.display = "block";
function nextSlide(event) {
    for (var _i = 0, slides_2 = slides; _i < slides_2.length; _i++) {
        element = slides_2[_i];
        element.style.display = "none";
    }
    if (this.id === "back") {
        if (currentSlideNumber > 0) {
            slides[currentSlideNumber].style.display = "none";
            currentSlideNumber -= 1;
            slides[currentSlideNumber].style.display = "none";
        }
    }
    else {
        if (currentSlideNumber < slides.length - 1) {
            currentSlideNumber += 1;
        }
    }
    slides[currentSlideNumber].style.display = "block";
}
