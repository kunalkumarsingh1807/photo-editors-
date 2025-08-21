const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');

const filters = {
  brightness: document.getElementById('brightness'),
  contrast: document.getElementById('contrast'),
  saturate: document.getElementById('saturate'),
  grayscale: document.getElementById('grayscale'),
  sepia: document.getElementById('sepia'),
  invert: document.getElementById('invert')
};

const resetBtn = document.getElementById('reset');
const downloadBtn = document.getElementById('download');

let imgDataUrl = '';
let imgOriginal = null;

function getFilterString() {
  return `
    brightness(${filters.brightness.value}%)
    contrast(${filters.contrast.value}%)
    saturate(${filters.saturate.value}%)
    grayscale(${filters.grayscale.value}%)
    sepia(${filters.sepia.value}%)
    invert(${filters.invert.value}%)
  `;
}

function drawImage() {
  if (!imgDataUrl) return;
  const tempImg = new Image();
  tempImg.onload = function() {
    const scale = Math.min(450 / tempImg.width, 350 / tempImg.height, 1);
    canvas.width = tempImg.width * scale;
    canvas.height = tempImg.height * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = getFilterString();
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
    Object.entries(filters).forEach(([k, el]) => {
      if (['brightness', 'contrast', 'saturate'].includes(k)) el.value = 100;
      else el.value = 0;
    });
  };
  reader.readAsDataURL(file);
});

Object.values(filters).forEach(control => {
  control.addEventListener('input', drawImage);
});

resetBtn.addEventListener('click', () => {
  if (imgOriginal) {
    imgDataUrl = imgOriginal;
    Object.entries(filters).forEach(([k, el]) => {
      if (['brightness', 'contrast', 'saturate'].includes(k)) el.value = 100;
      else el.value = 0;
    });
    drawImage();
  }
});

downloadBtn.addEventListener('click', () => {
  if (canvas.width === 0 || canvas.height === 0) return;
  const link = document.createElement('a');
  link.download = 'edited-photo.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
