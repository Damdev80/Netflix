const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODIxY2FkMzI5NjRlODQ5MmRjNDYzZGY3NjVhYjk3ZCIsIm5iZiI6MTczNjM4OTY5OC4wNDksInN1YiI6IjY3N2YzNDQyYjExZDA4ODExMTdiMzFkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zrQEY4_IDOF1NZrVfCzw8FF9wUDbkfcnKMBLi8bCRuI"; // Reemplaza con tu token
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


const fetchMovies = async () => {
try {
    const response = await fetch(`${BASE_URL}/movie/popular`, {
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
    },
    });
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
} catch (error) {
    console.error("Error al obtener las películas:", error);
}
};

// Renderizar películas dentro del carrusel
const renderCarousel = (movies) => {
    const carrusel = document.querySelector('.carrusel');

  // Limpiar carrusel previo
    carrusel.innerHTML = '';

  // Agregar cada película como un elemento del carrusel
    movies.forEach((movie, index) => {
    const carruselItem = document.createElement('div');
    carruselItem.classList.add('carrusel_item');

    // Crear contenedor para el número y la imagen
    const overlayContainer = document.createElement('div');
    overlayContainer.classList.add('overlay-container');

    // Crear el número
    const numberLabel = document.createElement('span');
    numberLabel.classList.add('movie-number');
    numberLabel.textContent = index + 1; // Índice basado en 1

    // Crear la imagen
    const movieImage = document.createElement('img');
    movieImage.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
    movieImage.alt = movie.title;

    // Añadir número e imagen al contenedor
    overlayContainer.appendChild(numberLabel);
    overlayContainer.appendChild(movieImage);

    // Añadir el contenedor al elemento del carrusel
    carruselItem.appendChild(overlayContainer);
    carrusel.appendChild(carruselItem);
    });
};

// Configurar navegación del carrusel
const initializeCarouselNavigation = () => {
    const carrusel = document.querySelector(".carrusel");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

let scrollPosition = 0;
  const scrollStep = 200; // Ajusta según el tamaño de las imágenes

prevButton.addEventListener("click", () => {
    scrollPosition -= scrollStep;
    if (scrollPosition < 0) scrollPosition = 0;
    carrusel.style.transform = `translateX(-${scrollPosition}px)`;
});

    nextButton.addEventListener("click", () => {
    scrollPosition += scrollStep;
    const maxScroll = carrusel.scrollWidth - carrusel.parentElement.offsetWidth;
    if (scrollPosition > maxScroll) scrollPosition = maxScroll;
    carrusel.style.transform = `translateX(-${scrollPosition}px)`;
});
};

// Inicializar todo
const initialize = async () => {
const movies = await fetchMovies();
    if (movies) {
    renderCarousel(movies);
    initializeCarouselNavigation();
}
};

initialize();
