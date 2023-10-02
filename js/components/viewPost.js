import { fetchToken } from "../utilities/fetchToken.js";

// Function to fetch and display a single post
async function displaySinglePost() {
    try {
        // Get the postId from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("id");

        if (!postId) {
            // Handle the case where postId is not found in the URL
            console.error("Post ID is missing in the URL.");
            return;
        }

        // Construct the API URL to fetch the single post
        const apiUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}`;

        // Use the fetchToken function to make the authenticated request
        const json = await fetchToken(apiUrl);

        // Check if the response contains the post data
        if (json) {
            renderSinglePost(json);
        } else {
            console.error("Failed to fetch the post data.");
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to render a single post
function renderSinglePost(post) {
    const viewPost = document.querySelector(".view-post");
    viewPost.classList.add("card", "bg-body-secondary","mx-4", "my-3", "d-flex", "justify-content-center", "flex-column", "p-3", "border-0")

    const viewTitle = document.createElement("h2");
    viewTitle.classList.add("view-title")
    viewTitle.textContent = post.title;

    const viewImg = document.createElement("img");
    viewImg.classList.add("view-img", "img-fluid");
    viewImg.src = post.media;
    
    const viewContent = document.createElement("p");
    viewContent.classList.add("view-content");
    viewContent.textContent = post.body;

    viewPost.append(viewTitle, viewImg, viewContent)
}

// Call the function to display the single post
displaySinglePost();




