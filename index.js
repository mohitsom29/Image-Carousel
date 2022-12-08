const carousel = document.querySelector(".carousel");

let firstImg = carousel.querySelectorAll("img")[0];

arrowIcons = document.querySelectorAll(".wrapper button");

let isDragStart = false;
let prevPageX, prevScrollLeft, positionDiff;

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  positionDiff = e.pageX - prevPageX;
  carousel.classList.add("dragging");
  carousel.scrollLeft = e.pageX - positionDiff;
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);

carousel.addEventListener("mousemove", dragging);

carousel.addEventListener("mouseup", dragStop);
