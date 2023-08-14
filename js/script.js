// Image Slider

const baseURL = 'images/';
const imageURLs = ['Dessert.jpg', 'Entree.jpg', 'Salad.jpg', 'Appetizer.jpg', 'Soup.jpg'];
let currentImageIndex = 0;
let intervalId;

const   body = document.querySelector('body'),
        header = document.querySelector('.header'),
        sections = document.querySelectorAll('.section'),
        homeSection = document.querySelector('.home'),
        navLinks = document.querySelectorAll('.nav-link'),
        navList = document.querySelector('.nav-list'),
        navContent = body.querySelector('.nav-content'),
        navOpenBtn = body.querySelector('.navOpen-btn'),
        orderBtn = body.querySelector('.orderBtn-2'),        
        logoContent = document.querySelector('.logo-content'),
        bxMenu = document.querySelector('.bx-menu');

function showNextImage() {
    const backgroundSlider = document.querySelector('.background-slider');
    backgroundSlider.style.backgroundImage = `url(${baseURL}${imageURLs[currentImageIndex]})`;

    currentImageIndex = (currentImageIndex + 1) % imageURLs.length;
};

showNextImage();

function startImageSlider() {
    intervalId = setInterval(showNextImage, 2500);
}

function stopImageSlider() {
    clearInterval(intervalId);
}


window.onload = () => {
    const isHomeActive = homeSection.classList.contains('active');

    if (isHomeActive) {
        startImageSlider();
        if (window.innerWidth <= 500) {
            logoContent.style.display = 'block';
            bxMenu.style.display = 'block';
            orderBtn.style.display = 'block'
        }
    }
};

document.addEventListener('click', (event) => {
    const clickedSection = event.target.closest('.section');

    if (clickedSection === homeSection) {
        startImageSlider();
    }
    if (clickedSection !== homeSection) {
        stopImageSlider();
    }
});


// Swiper function

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

// Nav Links Underline

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');

        if (navContent.classList.contains('open')) {
            navContent.classList.remove('open');
            updateBtnAndLogoDisplay();
        }
    });

    link.addEventListener('mouseleave', (event) => {
        if (!event.target.classList.contains('active')) {
            event.target.classList.remove('active');
        }        
    });
});

// Update Section Display

function updateSectionDisplay() {
    sections.forEach(section => {
        const isSectionActive = section.classList.contains('active');
        if (isSectionActive) {
            section.style.display = '';
        } else {
            section.style.display = 'none';
        }      
    });
}

document.addEventListener('DOMContentLoaded', updateSectionDisplay);

sections.forEach(section => {
    const observer = new MutationObserver(updateSectionDisplay);
    observer.observe(section, { attributes: true });
})


// Hide/Show Btn and Logo Display

function updateBtnAndLogoDisplay() {
    if (window.innerWidth > 820 || navContent.classList.contains('open')) {
        navOpenBtn.style.display = 'none';
        orderBtn.style.display = 'none';
    } else {
        navOpenBtn.style.display = 'block';
        orderBtn.style.display = 'block';
    }
    if (window.innerWidth <= 500) {
        logoContent.style.display = 'none';
    } else {
        logoContent.style.display = 'flex';
    }
}

updateBtnAndLogoDisplay();

window.addEventListener('resize', () => {
    updateBtnAndLogoDisplay();
})

document.addEventListener('click', (event) => {
    if (!navContent.contains(event.target) && !navOpenBtn.contains(event.target)) {
        navContent.classList.remove('open');
        updateBtnAndLogoDisplay();
    }
});

// Nav Open & Close

if (navContent && navOpenBtn) {
    navOpenBtn.addEventListener('click', () => {
        navContent.classList.add('open');
        navOpenBtn.style.display = 'none';
        orderBtn.style.display = 'none';
        logoContent.style.display = 'none';
    });
}


// Active Page Transition

function pageTransitions() {
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetSectionId = link.dataset.target;
            const targetSection = document.getElementById(targetSectionId);

            sections.forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
            scrollToTop();
            updateNavBackground();
        });
    });
};

pageTransitions();


// Overflow for home off

function setBodyOverflow() {
        const isHomeActive = homeSection.classList.contains('active');
        document.body.style.overflow = isHomeActive ? 'hidden' : 'auto';
    }

document.addEventListener('DOMContentLoaded', setBodyOverflow);
document.addEventListener('click', setBodyOverflow);

// Is Home Active Function

function isActiveSectionHome() {
    const activeSection = document.querySelector('.section.active')
    return activeSection === homeSection;
}


// Sticky Nav Links

let scrollHandler;

function stickyNavLinks() {
    const headerHeight = header.clientHeight;

    if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
    }

    scrollHandler = () => {
        const scrollY = window.scrollY;

        if (!isActiveSectionHome()) {
            if (window.innerWidth > 900) {
                if (scrollY >= headerHeight - 60) {
                    navList.classList.add('sticky');
                } else {
                    navList.classList.remove('sticky');
                }
                if (scrollY >= 300) {
                    navList.classList.add('pad');
                } else {
                    navList.classList.remove('pad');
                }
            } else if (window.innerWidth <= 900 && window.innerWidth > 820) {
                if (scrollY >= headerHeight + 140) {
                    navList.classList.add('sticky');
                } else {
                    navList.classList.remove('sticky');
                }
                if (scrollY >= 300) {
                    navList.classList.add('pad');
                } else {
                    navList.classList.remove('pad');
                }
            } else if (window.innerWidth <= 820) {
                    navList.classList.remove('sticky');
                    if (!navContent.classList.contains('open')) {
                        navList.classList.add('pad');
                        navList.classList.add('flex'); 
                    }
            }
        }
    };
    window.addEventListener('scroll', scrollHandler);
};

stickyNavLinks();

window.addEventListener('resize', () => {
    updateBtnAndLogoDisplay();
    stickyNavLinks();
});


// Remove 'open' class

function removeOpenClass() {
    if (navContent.classList.contains('open')) {
        navContent.classList.remove('open');
        updateBtnAndLogoDisplay;
        stickyNavLinks();
    }
};

// change background for othe pages than main

function hasClass(element, className) {
    return element.classList.contains(className);
};

function updateNavBackground() {
    const screenWidth = window.innerWidth;
    const activeSection = document.querySelector('.section.active');

    if (screenWidth <= 500 && activeSection !== homeSection || (screenWidth > 500 && screenWidth <= 820)) {
        navContent.style.backgroundColor = 'var(--black-color)';
    } else if (screenWidth <= 500 && activeSection === homeSection) {
        navContent.style.backgroundColor = 'transparent';
    } else if (screenWidth > 820) {
        navContent.style.backgroundColor = null;
    }
};

window.addEventListener('DOMContentLoaded', updateNavBackground);
window.addEventListener('resize', updateNavBackground);


// Function to open menu img in full screen

function openFullScreenMenu(event) {
    const clickedMenu = event.target;

    const fullScreenDiv = document.createElement('div')
    fullScreenDiv.classList.add('full-screen-menu');

    const fullScreenMenu = new Image();
    fullScreenMenu.src = clickedMenu.src;
    fullScreenMenu.classList.add('full-screen-image');

    fullScreenDiv.appendChild(fullScreenMenu);

    document.body.appendChild(fullScreenDiv);

    fullScreenDiv.addEventListener('click', () => {
        fullScreenDiv.remove();
    });
}

const fullScreenMenus = document.querySelectorAll('.full-screen-img');

fullScreenMenus.forEach(menu => {
    menu.addEventListener('click', openFullScreenMenu);
});

// Function for scroll to top whenever the section changes

function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
    });
}
