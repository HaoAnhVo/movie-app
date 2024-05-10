const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const apiKey = "99f1d9bc53139e44aefc0272249574dc";
const imgApi = "https://image.tmdb.org/t/p/w1280";
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const searchBtn = $(".navbar__btn");
const query = $("#search-input");
const result = $("#result");

const trailerVideo = $(".trailer");
const trailerList = $(".trailer__playlist");
const trailerTitle = $(".trailer__title");
const trailerDesc = $(".trailer__desc");
const trailerGenre = $(".trailer__genre");
const trailerDate = $(".trailer__date");
const trailerImdb = $(".trailer__imdb");

let page = 1;
let isSearching = false;

const app = {
    currentIndex: 0,
    movies: [
        {
            name: "Avengers: Endgame",
            desc: "After the devastating events of Avengers: Cuộc Chiến Vô Cực (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
            imdb: 9.3,
            date: "2019",
            sposter: "./assets/img/img-1.png",
            bposter: "./assets/img/img-1.png",
            genre: "Action",
            type: "series",
            trailer: "./assets/video/video-1.mp4",
        },
        {
            name: "Lật mặt 7: Một Điều Ước",
            desc: "This depicts Mrs. Hai, a 73-year-old single mother raising five children. Unexpected events unveil hidden secrets, testing familial bonds and exploring themes of sacrifice and redemption.",
            imdb: 8.2,
            date: "2024",
            sposter: "./assets/img/img-2.png",
            bposter: "./assets/img/img-2.png",
            genre: "Romance",
            type: "series",
            trailer: "./assets/video/video-2.mp4",
        },
        {
            name: "MAI",
            imdb: 6.8,
            desc: "Restlessly haunted by the past, Mai is greeted by a new dawn when she reluctantly befriends the neighborhood ladies' man. But when her yesterday catches up to her today, what will become of her tomorrow?",
            date: "2024",
            sposter: "./assets/img/img-3.png",
            bposter: "./assets/img/img-3.png",
            genre: "Romance",
            type: "series",
            trailer: "./assets/video/video-3.mp4",
        },
        {
            name: "Deadpool & Wolverine",
            desc: "Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool. They team up to defeat a common enemy.",
            imdb: 8.5,
            date: "2024",
            sposter: "./assets/img/img-4.png",
            bposter: "./assets/img/img-4.png",
            genre: "Action",
            type: "series",
            trailer: "./assets/video/video-4.mp4",
        },
        {
            name: "SpiderMan: No Way Home",
            desc: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
            imdb: 8.2,
            date: "2021",
            sposter: "./assets/img/img-5.png",
            bposter: "./assets/img/img-5.png",
            genre: "Action",
            type: "series",
            trailer: "./assets/video/video-5.mp4",
        },
        {
            name: "Despicable Me 4",
            desc: "Gru, Lucy, Margo, Edith, and Agnes welcome a new member to the family, Gru Jr., who is intent on tormenting his dad. Gru faces a new nemesis in Maxime Le Mal and his girlfriend Valentina, and the family is forced to go on the run.",
            imdb: 7.2,
            date: "2024",
            sposter: "./assets/img/img-6.png",
            bposter: "./assets/img/img-6.png",
            genre: "Animation",
            type: "series",
            trailer: "./assets/video/video-6.mp4",
        },
        {
            name: "Godzilla x Kong: The New Empire",
            desc: "The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against each other--the fearsome Godzilla and the mighty Kong--with humanity caught in the balance.",
            imdb: 6.3,
            date: "2024",
            sposter: "./assets/img/img-7.png",
            bposter: "./assets/img/img-7.png",
            genre: "Thriller",
            type: "series",
            trailer: "./assets/video/video-7.mp4",
        },
        {
            name: "The Garfield: Mèo béo siêu quậy",
            desc: "After Garfield's unexpected reunion with his long-lost father, ragged alley cat Vic, he and his canine friend Odie are forced from their perfectly pampered lives to join Vic on a risky heist.",
            imdb: 6.5,
            date: "2024",
            sposter: "./assets/img/img-8.png",
            bposter: "./assets/img/img-8.png",
            genre: "Animation",
            type: "series",
            trailer: "./assets/video/video-8.mp4",
        },
        {
            name: "Transformer One",
            desc: "The untold origin story of Optimus Prime and Megatron, better known as sworn enemies, but once were friends bonded like brothers who changed the fate of Cybertron forever.",
            imdb: 8.0,
            date: "2024",
            sposter: "./assets/img/img-9.png",
            bposter: "./assets/img/img-9.png",
            genre: "Animation",
            type: "series",
            trailer: "./assets/video/video-9.mp4",
        },
        {
            name: "Mufasa: The Lion King",
            desc: "Simba, having become king of the Pride Lands, is determined for his cub to follow in his paw prints while the origins of his late father Mufasa are explored.",
            imdb: 7.4,
            date: "2024",
            sposter: "./assets/img/img-10.png",
            bposter: "./assets/img/img-10.png",
            genre: "Animation",
            type: "series",
            trailer: "./assets/video/video-10.mp4",
        },
        {
            name: "Beetlejuice 2",
            desc: "This is a follow-up to the comedy Ngôi Nhà Ma (1988), about a ghost who's recruited to help haunt a house.",
            imdb: 7.6,
            date: "2024",
            sposter: "./assets/img/img-11.png",
            bposter: "./assets/img/img-11.png",
            genre: "Animation",
            type: "series",
            trailer: "./assets/video/video-11.mp4",
        },
        {
            name: "Kung Fu Panda 4",
            desc: "After Po is tapped to become the Spiritual Leader of the Valley of Peace, he needs to find and train a new Dragon Warrior, while a wicked sorceress plans to re-summon all the master villains whom Po has vanquished to the spirit realm.",
            imdb: 6.8,
            date: "2024",
            sposter: "./assets/img/img-12.png",
            bposter: "./assets/img/img-12.png",
            genre: "Animation",
            type: "series",
            trailer: "./assets/video/video-12.mp4",
        },
    ],
    render: function () {
        const htmls = this.movies.map((movie, index) => {
            return `
                <div class="trailer__item">
                    <img
                        src="${movie.sposter}"
                        alt="${movie.name}"
                        class="trailer__poster"
                    />
                    <div class="trailer__rest ${
                        index === this.currentIndex ? "active" : ""
                    }" data-index=${index}> 
                        <img
                            src="${movie.bposter}"
                            alt=""
                            class="trailer__rest-img"
                        />
                        <div class="trailer__rest-cont">
                            <h4>${movie.name}</h4>
                            <div class='trailer__rest-sub'>
                                <p class="trailer__rest-sub-info">
                                    ${movie.genre}, ${movie.date}
                                </p>
                                <h3 id="rate" class="rating">
                                    <span class="imdb">IMDB</span>
                                    <i class="fa-solid fa-star"></i>
                                        ${movie.imdb}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        trailerList.innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentMovie", {
            get: function () {
                return this.movies[this.currentIndex];
            },
        });
    },

    handleEvents: function () {
        const _this = this;
        const leftBtn = $(".fa-chevron-left");
        const rightBtn = $(".fa-chevron-right");
        trailerList.onclick = function (e) {
            const movieNode = e.target.closest(".trailer__rest:not(.active)");
            console.log(e.target);
            const handleClick = (index) => {
                _this.currentIndex = index;
                _this.loadCurrentMovie();
                _this.render();
            };
            if (movieNode) {
                handleClick(Number(movieNode.dataset.index));
            }
        };
        leftBtn.addEventListener("click", () => {
            trailerList.scrollLeft -= 140;
        });

        rightBtn.addEventListener("click", () => {
            trailerList.scrollLeft += 140;
        });
    },

    loadCurrentMovie: function () {
        trailerTitle.textContent = this.currentMovie.name;
        trailerDesc.textContent = this.currentMovie.desc;
        trailerGenre.textContent = this.currentMovie.genre;
        trailerDate.textContent = this.currentMovie.date;
        trailerImdb.textContent = this.currentMovie.imdb;
        trailerVideo.src = this.currentMovie.trailer;
    },

    initJsToggle: function () {
        $$(".js-toggle").forEach((button) => {
            const target = button.getAttribute("toggle-target");
            if (!target) {
                document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
            }
            button.onclick = (e) => {
                e.preventDefault();
                if (!$(target)) {
                    return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
                }
                const isHidden = $(target).classList.contains("hide");

                requestAnimationFrame(() => {
                    $(target).classList.toggle("hide", !isHidden);
                    $(target).classList.toggle("show", isHidden);
                });
            };
            document.onclick = function (e) {
                if (!e.target.closest(target)) {
                    const isHidden = $(target).classList.contains("hide");
                    if (!isHidden) {
                        button.click();
                    }
                }
            };
        });
    },

    start: function () {
        this.render();
        this.defineProperties();
        this.loadCurrentMovie();
        this.handleEvents();
    },
};

app.start();

//Fetch JSON data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        return await response.json();
    } catch (error) {
        return null;
    }
}

// Fetch and show results based on url
async function fetchAndShowResult(url) {
    const data = await fetchData(url);
    if (data && data.results) {
        showResults(data.results);
    }
}

//Create movie card html
function createMovieCard(movie) {
    const { poster_path, original_title, release_date, overview } = movie;
    const imagePath = poster_path ? imgApi + poster_path : "";
    const truncatedTitle =
        original_title.length > 15
            ? original_title.slice(0, 15) + "..."
            : original_title;
    const formattedDate = release_date || "No release date";
    const cardTemplate = `
        <div class="result__item">
            <div class="card">
                <a class="card__media" href="#!">
                    <img src="${imagePath}" alt="${original_title}" width="100%" />
                </a>
                <div class="card__content">
                    <div class="card__header">
                        <div>
                        <h3 style="font-weight: 600">${truncatedTitle}</h3>
                        <span style="color: #12efec">${formattedDate}</span>
                        </div>
                    <div >
                        <a href="${imagePath}" target="_blank" class="card__btn">See Cover</a>
                    </div>
                </div>
                <div class="card__info">
                    ${overview || "No overview yet..."}
                </div>
            </div>
        </div>
    </div>
    `;
    return cardTemplate;
}

// Clear result element for search
function clearResults() {
    result.innerHTML = "";
}

// Show results in page
function showResults(item) {
    const newContent = item.map(createMovieCard).join("");
    result.innerHTML += newContent || "<p>No results found.</p>";
}

// Load more results
async function loadMoreResults() {
    if (isSearching) {
        return;
    }
    page++;
    const searchTerm = query.value;
    const url = searchTerm
        ? `${searchUrl}${searchTerm}&page=${page}`
        : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
    await fetchAndShowResult(url);
}

// Detect end of page and load more results
function detectEnd() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
        loadMoreResults();
    }
}

// Handle search
async function handleSearch(e) {
    e.preventDefault();
    const searchTerm = query.value.trim();
    if (searchTerm) {
        isSearching = true;
        clearResults();
        const newUrl = `${searchUrl}${searchTerm}&page=${page}`;
        await fetchAndShowResult(newUrl);
        query.value = "";
    }
}

// Event listeners
searchBtn.addEventListener("click", handleSearch);
window.addEventListener("scroll", detectEnd);
window.addEventListener("resize", detectEnd);

// Initialize the page
async function init() {
    clearResults();
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
    isSearching = false;
    await fetchAndShowResult(url);
}

init();

function initJsToggle() {
    $$(".js-toggle").forEach((button) => {
        const target = button.getAttribute("toggle-target");
        if (!target) {
            document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
        }
        button.onclick = (e) => {
            e.preventDefault();
            if (!$(target)) {
                return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
            }
            const isHidden = $(target).classList.contains("hide");

            requestAnimationFrame(() => {
                $(target).classList.toggle("hide", !isHidden);
                $(target).classList.toggle("show", isHidden);
            });
        };
        document.onclick = function (e) {
            if (!e.target.closest(target)) {
                const isHidden = $(target).classList.contains("hide");
                if (!isHidden) {
                    button.click();
                }
            }
        };
    });
}

initJsToggle();
