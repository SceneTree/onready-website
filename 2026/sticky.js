const styleSheet = document.createElement("style");
const stickyHeader = document.querySelector('.sticky-container');
const starHolder = document.querySelector('.star-holder');
const starImages = [
    "star_01.png",
    "star_02.png",
    "star_03.png",
    "star_04.png",
    "star_05.png",
    "star_06.png",
    "star_07.png"
];
let lastScrollY = 0;
const disappearAnimation = stickyHeader.animate(
        [{opacity: 1}, {opacity: 0}],
        {duration: 1000, iterations: 1, fill: "forwards" },
    );
disappearAnimation.pause();

function getScrollTop() {
    if (typeof window.pageYOffset !== "undefined" ) {
        // Most browsers
        return window.pageYOffset;
    }
  
    var d = document.documentElement;
    if (typeof d.clientHeight !== "undefined") {
        // IE in standards mode
        return d.scrollTop;
    }
  
    // IE in quirks mode
    return document.body.scrollTop;
}

function getDocumentHeight() {
    // Take the maximum of several properties to ensure cross-browser accuracy
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
}

function getViewportHeight() {
    // Prefer window.innerHeight for modern browsers
    if (typeof window.innerHeight === 'number') {
        return window.innerHeight;
    }
    // For older IE in standards mode
    else if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    }
    // For older IE in quirks mode
    else if (document.body && document.body.clientHeight) {
        return document.body.clientHeight;
    }
    // Fallback
    return 0;
}

function getViewportWidth() {
    // Prefer window.innerWidth for modern browsers
    if (typeof window.innerWidth === 'number') {
        return window.innerWidth;
    }
    // For older IE in standards mode
    else if (document.documentElement && document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
    }
    // For older IE in quirks mode
    else if (document.body && document.body.clientWidth) {
        return document.body.clientWidth;
    }
    // Fallback
    return 0;
}

window.addEventListener('scroll', function () {
    if (window.scrollY < lastScrollY) {
        lastScrollY = window.scrollY;
    }

    if (getViewportWidth() < 800) {
        disappearAnimation.currentTime = 0;
        disappearAnimation.play();
    }

    if (window.scrollY - lastScrollY > 80) {
            const newDiv = document.createElement("div");
            newDiv.classList.add("star-path");

            const starImg = document.createElement("img");
            starImg.src = "../images/2026/" + starImages[Math.floor(Math.random() * starImages.length)]
            newDiv.appendChild(starImg);
            starHolder.appendChild(newDiv);

            const starKeyFrames = new KeyframeEffect(
                newDiv,
                [
                    { transform: "scale(0) translate(0px, 0px)" },
                    { transform: "scale(.16) translate(-"+(Math.random()*5000 + 400)+"px, -"+(Math.random() * 4000 + 6500)+"px)" },
                ],
                {
                    duration: Math.floor(Math.random() * 2500) + 2500,
                    rangeStart: "entry 0%",
                    rangeEnd: "entry 100%",
                    easing: "linear",
                },
            );
            const starAnimation = new Animation(starKeyFrames, document.timeline); 
            starAnimation.onfinish = () => {
                newDiv.remove();
            };
            starAnimation.play();

            lastScrollY = window.scrollY;
        }

    if (window.scrollY > 400) {
        var scrollTop = getScrollTop();
        stickyHeader.style.top = ((scrollTop / getDocumentHeight()) * getViewportHeight() - 15) + "px";
        stickyHeader.classList.add('scrolled');
    } else {
        stickyHeader.style.top = "0";
        stickyHeader.classList.remove('scrolled');
    }

});