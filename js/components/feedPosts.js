// import { fetchToken } from "../utilities/fetchToken.js";
// import { postUrl } from "../utilities/consts.js";

// async function displayFeedPosts() {
//     try {
//         const json = await fetchToken(postUrl);
//         console.log(json);
//         const feedPostDiv = document.querySelector(".feed-posts");

//         for (let i = 0; i < 20 && i < json.length; i++) {
//             const post = json[i];

//             const feedPost = document.createElement("div");
//             feedPost.classList.add("card", "bg-body-secondary", "mx-4", "my-3", "d-flex", "justify-content-center", "flex-column", "p-3", "border-0");

//             const feedTitle = document.createElement("h2");
//             feedTitle.classList.add("mb-3");
//             feedTitle.textContent = post.title;

//             const feedMedia = document.createElement("img");
//             feedMedia.classList.add("img-fluid", "feed-media");
//             feedMedia.src = post.media;

//             const feedContent = document.createElement("p");
//             feedContent.textContent = post.body;

//             const feedReactionRow = document.createElement("div");
//             feedReactionRow.classList.add("d-flex", "flex-row", "justify-content-between", "align-content-center", "mt-4");

//             const feedLikeBtn = document.createElement("i");
//             feedLikeBtn.classList.add("fa-solid", "fa-thumbs-up", "fa-xl", "feed-like-btn");

//             const feedDate = document.createElement("p");
//             feedDate.classList.add("feed-date");

//             // Convert and format the date
//             const createdDate = new Date(post.created);
//             const formattedDate = `${createdDate.getDate()}-${(createdDate.getMonth() + 1)
//                 .toString()
//                 .padStart(2, "0")}-${createdDate
//                 .getFullYear()
//                 .toString()
//                 .slice(-2)}, ${createdDate.getHours()}:${createdDate.getMinutes()}`;

//             feedDate.textContent = formattedDate;

//             feedPost.append(feedTitle);
//             feedPost.append(feedMedia);
//             feedPost.append(feedContent);
//             feedPost.append(feedReactionRow);
           
//             feedReactionRow.append(feedLikeBtn, feedDate);

//             feedPostDiv.append(feedPost);
           
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// // displayFeedPosts();
// // Function to sort and display posts based on the selected option
// async function sortAndDisplayPosts() {
//     try {
//         // Fetch the JSON data
//         const json = await fetchToken(postUrl);
//         console.log(json);
//         // Get the selected sorting option
//         const feedFilterSelect = document.getElementById('feed-filter');
//         const selectedOption = feedFilterSelect.value;

//         // Sort the JSON data based on the selected option
//         if (selectedOption === 'latest') {
//             json.sort((a, b) => new Date(b.created) - new Date(a.created));
//         } else if (selectedOption === 'popular') {
//             // Implement your popularity-based sorting logic here
//         } else if (selectedOption === 'oldest') {
//             json.sort((a, b) => new Date(a.created) - new Date(b.created));
//         }

//         // Clear the existing feed posts
//         const feedPostDiv = document.querySelector('.feed-posts');
//         feedPostDiv.innerHTML = '';

//         // Render the sorted feed posts
//         for (let i = 0; i < 20 && i < json.length; i++) {
//             // ... (rest of your code to render each feed post)
//             const post = json[i];

//             const feedPost = document.createElement("div");
//             feedPost.classList.add("card", "bg-body-secondary", "mx-4", "my-3", "d-flex", "justify-content-center", "flex-column", "p-3", "border-0");

//             const feedTitle = document.createElement("h2");
//             feedTitle.classList.add("mb-3");
//             feedTitle.textContent = post.title;

//             const feedMedia = document.createElement("img");
//             feedMedia.classList.add("img-fluid", "feed-media");
//             feedMedia.src = post.media;

//             const feedContent = document.createElement("p");
//             feedContent.textContent = post.body;

//             const feedReactionRow = document.createElement("div");
//             feedReactionRow.classList.add("d-flex", "flex-row", "justify-content-between", "align-content-center", "mt-4");

//             const feedLikeBtn = document.createElement("i");
//             feedLikeBtn.classList.add("fa-solid", "fa-thumbs-up", "fa-xl", "feed-like-btn");

//             const feedDate = document.createElement("p");
//             feedDate.classList.add("feed-date");

//             // Convert and format the date
//             const createdDate = new Date(post.created);
//             const formattedDate = `${createdDate.getDate()}-${(createdDate.getMonth() + 1)
//                 .toString()
//                 .padStart(2, "0")}-${createdDate
//                 .getFullYear()
//                 .toString()
//                 .slice(-2)}, ${createdDate.getHours()}:${createdDate.getMinutes()}`;

//             feedDate.textContent = formattedDate;

//             feedPost.append(feedTitle);
//             feedPost.append(feedMedia);
//             feedPost.append(feedContent);
//             feedPost.append(feedReactionRow);
           
//             feedReactionRow.append(feedLikeBtn, feedDate);

//             feedPostDiv.append(feedPost);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// // Add an event listener to the select element to trigger sorting
// const feedFilterSelect = document.getElementById('feed-filter');
// feedFilterSelect.addEventListener('change', sortAndDisplayPosts);

// // Initially, display the feed posts with the default sorting
// displayFeedPosts();
import { fetchToken } from "../utilities/fetchToken.js";
import { postUrl } from "../utilities/consts.js";

// Function to display feed posts
async function displayFeedPosts() {
    try {
        const json = await fetchToken(postUrl);
        renderFeedPosts(json);
    } catch (error) {
        console.log(error);
    }
}

// Function to render feed posts
function renderFeedPosts(json) {
    const feedPostDiv = document.querySelector(".feed-posts");
    feedPostDiv.innerHTML = '';

    for (let i = 0; i < 20 && i < json.length; i++) {
        const post = json[i];
        const feedPost = createFeedPostElement(post);
        feedPostDiv.append(feedPost);
    }
}

// Function to create a feed post element
function createFeedPostElement(post) {
    const feedPost = document.createElement("div");
    feedPost.classList.add("card", "bg-body-secondary", "mx-4", "my-3", "d-flex", "justify-content-center", "flex-column", "p-3", "border-0");

    const feedTitle = document.createElement("h2");
    feedTitle.classList.add("mb-3");
    feedTitle.textContent = post.title;

    const feedMedia = document.createElement("img");
    feedMedia.classList.add("img-fluid", "feed-media");
    feedMedia.src = post.media;

    const feedContent = document.createElement("p");
    feedContent.textContent = post.body;

    const feedReactionRow = document.createElement("div");
    feedReactionRow.classList.add("d-flex", "flex-row", "justify-content-between", "align-content-center", "mt-4");

    const feedLikeBtn = document.createElement("i");
    feedLikeBtn.classList.add("fa-solid", "fa-thumbs-up", "fa-xl", "feed-like-btn");

    const feedDate = document.createElement("p");
    feedDate.classList.add("feed-date");

    const createdDate = new Date(post.created);
    const formattedDate = `${createdDate.getDate()}-${(createdDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${createdDate
        .getFullYear()
        .toString()
        .slice(-2)}, ${createdDate.getHours()}:${createdDate.getMinutes()}`;

    feedDate.textContent = formattedDate;

    feedPost.append(feedTitle, feedMedia, feedContent, feedReactionRow);
    feedReactionRow.append(feedLikeBtn, feedDate);

    return feedPost;
}

// Function to sort and display posts based on the selected option
async function sortAndDisplayPosts() {
    try {
        // Get the selected sorting option
        const feedFilterSelect = document.getElementById('feed-filter');
        const selectedOption = feedFilterSelect.value;

        // Construct the API URL based on the selected sorting option
        let apiUrl = postUrl;

        if (selectedOption === 'latest') {
            apiUrl = 'https://api.noroff.dev/api/v1/social/profiles?sort=latest&sortOrder=desc';
        } 

        const json = await fetchToken(apiUrl);

        renderFeedPosts(json);
    } catch (error) {
        console.log(error);
    }
}

// Add an event listener to the select element to trigger sorting
const feedFilterSelect = document.getElementById('feed-filter');
feedFilterSelect.addEventListener('change', sortAndDisplayPosts);

// Initially, display the feed posts with the default sorting
displayFeedPosts();

