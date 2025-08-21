const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const grayscale = document.getElementById('grayscale');
const sepia = document.getElementById('sepia');
const reset = document.getElementById('reset');
const download = document.getElementById('download');

let img = new Image();
let original = null;

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Compose filter string
    const filter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        grayscale(${grayscale.value}%)
        sepia(${sepia.value}%)
    `;

    ctx.filter = filter;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';
}

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        img.onload = function() {
            canvas.width = img.width > 400 ? 400 : img.width;
            canvas.height = img.height > 400 ? 400 : img.height;
            // Save original image data for reset
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            original = ctx.getImageData(0, 0, canvas.width, canvas.height);
            drawImage();
        }
        img.src = evt.target.result;
    }
    reader.readAsDataURL(file);
});

[brightness, contrast, grayscale, sepia].forEach(control => {
    control.addEventListener('input', () => {
        if (img.src) drawImage();
    });
});

reset.addEventListener('click', () => {
    brightness.value = 100;
    contrast.value = 100;
    grayscale.value = 0;
    sepia.value = 0;
    if (original) {
        ctx.putImageData(original, 0, 0);
        drawImage();
    }
});

download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-photo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
