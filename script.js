// Event Handling
const clickButton = document.getElementById('clickButton');
const hoverArea = document.getElementById('hoverArea');
const keypressInput = document.getElementById('keypressInput');
const doubleClickTarget = document.getElementById('doubleClickTarget');
const longPressTarget = document.getElementById('longPressTarget');

clickButton.addEventListener('click', () => {
    console.log('Click button pressed!');
    alert('Button clicked!');
});

hoverArea.addEventListener('mouseover', () => {
    hoverArea.style.backgroundColor = 'yellow';
});

hoverArea.addEventListener('mouseout', () => {
    hoverArea.style.backgroundColor = 'lightblue';
});

keypressInput.addEventListener('keypress', (event) => {
    console.log(`Key pressed: ${event.key}`);
});

doubleClickTarget.addEventListener('dblclick', () => {
    alert('Double click action!');
});

let pressTimer;
const longPressDuration = 1000; // 1 second

longPressTarget.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
        alert('Long press action!');
    }, longPressDuration);
});

longPressTarget.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
});

longPressTarget.addEventListener('mouseout', () => {
    clearTimeout(pressTimer); // Clear if mouse leaves before time
});

longPressTarget.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Prevent default context menu on long press area
});

// Interactive Elements
const changeTextButton = document.getElementById('changeTextButton');
let buttonTextToggle = false;

changeTextButton.addEventListener('click', () => {
    changeTextButton.textContent = buttonTextToggle ? 'Change Text' : 'Text Changed!';
    changeTextButton.style.backgroundColor = buttonTextToggle ? '#f0f0f0' : '#aaffaa';
    buttonTextToggle = !buttonTextToggle;
});

const galleryImage = document.getElementById('galleryImage');
const prevImageButton = document.getElementById('prevImage');
const nextImageButton = document.getElementById('nextImage');
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Replace with your image paths
let currentImageIndex = 0;

function updateGalleryImage() {
    galleryImage.src = images[currentImageIndex];
}

prevImageButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateGalleryImage();
});

nextImageButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGalleryImage();
});

const tabButtons = document.querySelectorAll('.tab-buttons button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form Validation
const validationForm = document.getElementById('validationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

validationForm.addEventListener('submit', (event) => {
    let isValid = true;

    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'Password is required.';
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    if (!isValid) {
        event.preventDefault(); // Prevent submission if validation fails
    } else {
        alert('Form submitted successfully!');
    }
});

nameInput.addEventListener('input', () => {
    nameError.textContent = nameInput.value.trim() === '' ? 'Name is required.' : '';
});

emailInput.addEventListener('input', () => {
    emailError.textContent = emailInput.value.trim() === '' ? 'Email is required.' :
                           !isValidEmail(emailInput.value.trim()) ? 'Invalid email format.' : '';
});

passwordInput.addEventListener('input', () => {
    passwordError.textContent = passwordInput.value.trim() === '' ? 'Password is required.' :
                              passwordInput.value.length < 8 ? 'Password must be at least 8 characters long.' : '';
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}