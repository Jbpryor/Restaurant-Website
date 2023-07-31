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
const navLinks = document.querySelectorAll('.nav-link');

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
const   body = document.querySelector('body'),
        navContent = body.querySelector('.nav-content'),
        navOpenBtn = body.querySelector('.navOpen-btn');

if (navContent && navOpenBtn) {
    navOpenBtn.addEventListener('click', () => {
        navContent.classList.add('open');
    })
}