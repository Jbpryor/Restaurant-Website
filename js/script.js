// Image Slider

const baseURL = 'images/'
const imageURLs = [
    'Dessert.jpg',
    'Entree.jpg',
    'Salad.jpg',
    'Appetizer.jpg',
    'Soup.jpg'
];

let currentImageIndex = 0;

function showNextImage() {
    const backgroundSlider = document.querySelector('.background-slider');
    backgroundSlider.style.backgroundImage = `url(${baseURL}${imageURLs[currentImageIndex]})`;

    currentImageIndex = (currentImageIndex + 1) % imageURLs.length;
};

showNextImage();

setInterval(showNextImage, 2500);

// Nav Links Underline

const   body = document.querySelector('body'),
        header = document.querySelector('.header'),
        navLinks = document.querySelectorAll('.nav-link'),
        navList = document.querySelector('.nav-list'),
        navContent = body.querySelector('.nav-content'),
        navOpenBtn = body.querySelector('.navOpen-btn'),
        orderBtn = body.querySelector('.orderBtn-2'),
        sections = document.querySelectorAll('.section'),
        logoContent = document.querySelector('.logo-content');
        


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        if (navContent.classList.contains('open')) {
            navContent.classList.remove('open');
            updateBtnAndLogoDisplay();
        }
    });

    link.addEventListener('mouseleave', (e) => {
        if (!e.target.classList.contains('active')) {
            e.target.classList.remove('active');
        }        
    });
});

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

document.addEventListener('click', (e) => {
    if (!navContent.contains(e.target) && !navOpenBtn.contains(e.target)) {
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
    });
}


// Active Page Transition

function PageTransitions() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetSectionId = link.dataset.target;
            const targetSection = document.getElementById(targetSectionId);

            sections.forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
        });
    });
};

PageTransitions();

// Overflow for home off

const homeSection = document.querySelector('#home');

function setBodyOverflow() {
        const isHomeActive = homeSection.classList.contains('active');
        document.body.style.overflow = isHomeActive ? 'hidden' : 'auto';
    }

document.addEventListener('DOMContentLoaded', setBodyOverflow);
document.addEventListener('click', setBodyOverflow);

// Sticky Nav Links

function stickyNavLinks() {
    const headerHeight = header.clientHeight;

if (window.innerWidth > 900) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
    
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
    });
} else if (window.innerWidth <= 900 && window.innerWidth > 820){
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
    
        if (scrollY >= headerHeight + 140) {
            navList.classList.add('sticky');
        } else {
            navList.classList.remove('sticky');
        }
    });
} else if (window.innerWidth <= 820) {
    navList.classList.remove('sticky');
}
};

stickyNavLinks();

// window.addEventListener('resize', () => {
//     updateBtnAndLogoDisplay();
//     stickyNavLinks();
// })


// trying to figure out why the nav bar gets triggered on resize at < 820px