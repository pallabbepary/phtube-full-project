function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("active")
    }
}


function loadCategories (){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
}


function loadVideos(searchText = ""){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("btn-all").classList.add("active");
        // document.getElementById("sort-btn").classList.add("active")
        displayVideos(data.videos)
    })
}


const loadCategoryeVideos = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActiveClass()
        const clickButton = document.getElementById(`btn-${id}`)
        clickButton.classList.add("active")
        // console.log(clickButton)
        displayVideos(data.category)
    })
}


const loadVideoDetails = (videoId) =>{
    // console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video))
};

const displayVideoDetails = (video) =>{
    console.log(video);
    document.getElementById("video_Details").showModal()
    const detailsContainer = document.getElementById("details_container");
    detailsContainer.innerHTML = `
        <h1></h1>
        <div class="card bg-base-100 image-full shadow-sm">
    <figure>
        <img
        src="${video.thumbnail}"
        alt="Shoes" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${video.title}</h2>
        <p>${video.description}</p>
        <div class="card-actions justify-end">
        </div>
    </div>
    </div>
    `
}




function displayCategories(categories){
    const categoryContainer = document.getElementById("Categories-container")
    for(let cat of categories ){
        // console.log(cat)

        const createDiv = document.createElement("div")
        createDiv.innerHTML = `
            <button id = "btn-${cat.category_id}" onclick="loadCategoryeVideos(${cat.category_id})" class="btn px-6  hover:bg-[#FF1F3D] text-base hover:text-white">${cat.category}</button>
        `
        categoryContainer.appendChild(createDiv)
    }
}


const displayVideos = (videos) => {
    const videosContainar = document.getElementById("videos-Containar");
    
    videosContainar.innerHTML = ""

    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100 px-0">
            <figure class="relative">
              <img class = "w-full h-[200px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-3 bg-black text-white rounded-sm px-2">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 py-5">
                <div>
                    <div class="avatar">
                        <div div class="ring-primary ring-offset-base-100 w-10 rounded-full  ">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>      
                </div>
                <div class="intro">
                    <h1 class="title font-bold text-base">${video.title}</h1>
                    <p class="text-gray-400 text-base flex gap-5 items-center">
                    ${video.authors[0].profile_name}
                    ${video.authors[0].verified == true ? `<img class="w-6 h-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ` `}
                    </p>
                    <p class="text-base text-gray-400">${video.others.views} views</p>
                </div>
            </div>

            <button onclick = loadVideoDetails('${video.video_id}') class="btn btn-block">View Details</button>

            </div>
                `
        videosContainar.append(videoCard)
    });
}


document.getElementById("search_input").addEventListener("keyup", (e) =>{
    const input = e.target.value
    loadVideos(input)
})


loadCategories()

