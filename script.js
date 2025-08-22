// Get references to elements
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Filter controls
const brightness = document.getElementById('brightnessSlider');
const contrast = document.getElementById('contrastSlider');
const grayscale = document.getElementById('grayscaleSlider');
const sepia = document.getElementById('sepiaSlider');
const hue = document.getElementById('hueRotateSlider');
const saturation = document.getElementById('saturationSlider');

// Save and reset buttons
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');

let originalImage = new Image();

imageInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    originalImage.src = ev.target.result;
    originalImage.onload = function() {
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      drawImage();
    }
  }
  reader.readAsDataURL(file);
});

function getFilterString() {
  return (
    `brightness(${brightness.value}%) ` +
    `contrast(${contrast.value}%) ` +
    `grayscale(${grayscale.value}%) ` +
    `sepia(${sepia.value}%) ` +
    `hue-rotate(${hue.value}deg) ` +
    `saturate(${saturation.value}%)`
  );
}

function drawImage() {
  ctx.filter = getFilterString();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(originalImage, 0, 0);
}

function resetFilters() {
  brightness.value = 100;
  contrast.value = 100;
  grayscale.value = 0;
  sepia.value = 0;
  hue.value = 0;
  saturation.value = 100;
  drawImage();
}

[brightness, contrast, grayscale, sepia, hue, saturation].forEach(input => {
  input.addEventListener('input', drawImage);
});

resetBtn.addEventListener('click', resetFilters);

saveBtn.addEventListener('click', function() {
  const link = document.createElement('a');
  link.download = 'edited_image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
