const inputImg = document.getElementById("input-img");
const outputImg = document.getElementById("output-img");
const convertBtn = document.getElementById("convert-btn");

convertBtn.addEventListener("click", () => {
  if (inputImg.files && inputImg.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      outputImg.src = toGrayscale(e.target.result);
    };

    reader.readAsDataURL(inputImg.files[0]);
  }
});

function toGrayscale(src) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const img = new Image();

  img.src = src;

  canvas.width = img.width;
  canvas.height = img.height;

  context.drawImage(img, 0, 0);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const gray = 0.2989 * r + 0.587 * g + 0.114 * b;

    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  context.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
}
