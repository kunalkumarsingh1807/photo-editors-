const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const grayscale = document.getElementById('grayscale');
const sepia = document.getElementById('sepia');
const reset = document.getElementById('reset');
const download = document.getElementById('download');

let imgDataUrl = '';
let imgOriginal = null;

function drawImage() {
    if (!imgDataUrl) return;
    const tempImg = new Image();
    tempImg.onload = function() {
        const scale = Math.min(400 / tempImg.width, 400 / tempImg.height, 1);
        canvas.width = tempImg.width * scale;
        canvas.height = tempImg.height * scale;
        const filter = `
            brightness(${brightness.value}%)
            contrast(${contrast.value}%)
            grayscale(${grayscale.value}%)
            sepia(${sepia.value}%)
        `;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = filter;
        ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
    };
    tempImg.src = imgDataUrl;
}

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        imgDataUrl = evt.target.result;
        drawImage();
        imgOriginal = imgDataUrl;
        brightness.value = 100;
        contrast.value = 100;
        grayscale.value = 0;
        sepia.value = 0;
    };
    reader.readAsDataURL(file);
});

[brightness, contrast, grayscale, sepia].forEach(control => {
    control.addEventListener('input', () => {
        drawImage();
    });
});

reset.addEventListener('click', () => {
    if (imgOriginal) {
        imgDataUrl = imgOriginal;
        brightness.value = 100;
        contrast.value = 100;
        grayscale.value = 0;
        sepia.value = 0;
        drawImage();
    }
});

download.addEventListener('click', () => {
    if (canvas.width === 0 || canvas.height === 0) return;
    const link = document.createElement('a');
    link.download = 'edited-photo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
