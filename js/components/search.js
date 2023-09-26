import { fetchToken } from "../utilities/fetchToken.js";
import { postUrl } from "../utilities/consts.js";

// Function to filter posts based on the search query
function filterPosts(posts, query) {
  return posts.filter((post) => {
    const searchString = post.title + post.body;
    return searchString.toLowerCase().includes(query.toLowerCase());
  });
}

// Function to display filtered posts
function displayFilteredPosts(posts) {
  const feedPostDiv = document.querySelector(".feed-posts");
  feedPostDiv.innerHTML = ''; // Clear existing posts

  for (const post of posts) {
    const feedPost = document.createElement("div");
            feedPost.classList.add("card", "bg-body-secondary", "mx-4", "my-3", "d-flex", "justify-content-center", "flex-column", "p-3", "border-0");
            
            const feedTitle = document.createElement("h2");
            feedTitle.classList.add("mb-3");
            feedTitle.textContent  = post.title;

            const feedContent = document.createElement("p");
            // feedContent.classList.add("");
            feedContent.textContent = post.body;

            const feedReactionRow = document.createElement("div");
            feedReactionRow.classList.add("d-flex", "flex-row", "justify-content-between", "align-content-center", "mt-4");

            const feedLikeBtn = document.createElement("i");
            feedLikeBtn.classList.add("fa-solid", "fa-thumbs-up", "fa-xl", "feed-like-btn");

            const feedDate = document.createElement("p");
            feedDate.classList.add("feed-date");
            feedDate.textContent = post.created;

            feedPost.append(feedTitle);           
            feedPost.append(feedContent);
            feedPost.append(feedReactionRow);
            feedReactionRow.append(feedLikeBtn, feedDate);

            feedPostDiv.append(feedPost)
  }
}

// Function to handle search
async function handleSearch(event) {
  event.preventDefault();
  const query = document.querySelector('#searchInput').value.trim(); // Get the search query

  try {
    const json = await fetchToken(postUrl);
    const filteredPosts = filterPosts(json, query);
    displayFilteredPosts(filteredPosts);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Event listener for the search button
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", handleSearch);

// Event listener for the Enter key in the search input
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleSearch(event);
  }
});
