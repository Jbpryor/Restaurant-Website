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

const showNextImage = () => {
    const backgroundSlider = document.querySelector('.background-slider');
    backgroundSlider.style.backgroundImage = `url(${baseURL}${imageURLs[currentImageIndex]})`;

    currentImageIndex = (currentImageIndex + 1) % imageURLs.length;
};

showNextImage();

setInterval(showNextImage, 2500);

// Nav Links Underline

const   body = document.querySelector('body'),
        navLinks = document.querySelectorAll('.nav-link'),
        navContent = body.querySelector('.nav-content'),
        navOpenBtn = body.querySelector('.navOpen-btn'),
        orderBtn = body.querySelector('.orderBtn-2'),
        sections = document.querySelectorAll('.section');
        


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        if (navContent.classList.contains('open')) {
            navContent.classList.remove('open');
            updateBtnDisplay();
        }
    });

    link.addEventListener('mouseleave', (e) => {
        if (!e.target.classList.contains('active')) {
            e.target.classList.remove('active');
        }        
    });
});

// Hide/Show Btn Display

const updateBtnDisplay = () => {
    if (window.innerWidth > 820) {
        navOpenBtn.style.display = 'none';
        orderBtn.style.display = 'none';
    } else {
        navOpenBtn.style.display = 'block';
        orderBtn.style.display = 'block';
    }
}

updateBtnDisplay();

window.addEventListener('resize', () => {
    updateBtnDisplay();
})

document.addEventListener('click', (e) => {
    if (!navContent.contains(e.target) && !navOpenBtn.contains(e.target)) {
        navContent.classList.remove('open');
        updateBtnDisplay();
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

const PageTransitions = () => {
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