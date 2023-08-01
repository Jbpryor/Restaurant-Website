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
        sections = document.querySelectorAll('.section');
        


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
    });

    link.addEventListener('mousleave', (e) => {
        navLinks.forEach(link => link.classList.remove('active'));
    });
});


// Nav Open & Close

if (navContent && navOpenBtn) {
    navOpenBtn.addEventListener('click', () => {
        navContent.classList.add('open');
    })
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