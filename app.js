let count = 3;
const apiKey = "1EkpyaHLxOIJkaKHsE-mAOjwB5d37SuvDUCu69eNkgo";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}
`;
const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImags = 0;
let phtosArray = [];
const scrollTop = document.getElementById("scrollTop");

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImags) {
    ready = true;
    loader.hidden = true;
    count = 10;
  }
}

async function displayPhotos() {
  totalImags = phtosArray.length;
  phtosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    const image = document.createElement("img");
    image.setAttribute("src", photo.urls.regular);
    image.setAttribute("alt", photo.alt_description);
    image.setAttribute("title", photo.alt_description);
    image.addEventListener("load", imageLoaded);
    item.appendChild(image);
    imgContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    phtosArray = await response.json();
    displayPhotos();
  } catch (error) {
    alert(error);
  }
}

// check if scroll is near the bottom of the page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imagesLoaded = 0;
    getPhotos();
  }
});

window.addEventListener("scroll", () => {
  if (scrollY >= 1500) {
    scrollTop.style.display = "block";
  } else {
    scrollTop.style.display = "none";
  }
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
getPhotos();
