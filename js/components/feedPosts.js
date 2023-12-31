import { fetchToken } from "../utilities/fetchToken.js";
import { postUrl } from "../utilities/consts.js";
const feedPostsUrl = `${postUrl}/?_author=true&_reactions=true`;



// Function to display feed posts
async function displayFeedPosts() {
  try {
    const json = await fetchToken(feedPostsUrl);
    renderFeedPosts(json);
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

// Function to render feed posts
function renderFeedPosts(json) {
  const feedPostDiv = document.querySelector(".feed-posts");
  feedPostDiv.innerHTML = "";

  for (let i = 0; i < 30 && i < json.length; i++) {
    const post = json[i];
    const feedPost = createFeedPostElement(post);
    feedPostDiv.append(feedPost);
  }
}

// Function to create a feed post element
function createFeedPostElement(post) {
  const feedPost = document.createElement("div");
  feedPost.classList.add(
    "card",
    "bg-body-secondary",
    "mx-4",
    "my-3",
    "d-flex",
    "justify-content-center",
    "flex-column",
    "p-3",
    "border-0"
  );
  feedPost.id = post.id;

  const feedAuthor = document.createElement("div");
  feedAuthor.innerText = `${post.author.name} posted:`;
  feedAuthor.classList.add("text-primary", "mb-2")

  const feedTitle = document.createElement("h2");
  feedTitle.classList.add("mb-3");
  feedTitle.textContent = post.title;

  const feedMedia = document.createElement("img");
  feedMedia.classList.add("img-fluid", "feed-media", "mb-3");
  feedMedia.src = post.media;

  const feedContent = document.createElement("p");
  feedContent.textContent = post.body;

  const feedReactionRow = document.createElement("div");
  feedReactionRow.classList.add(
    "d-flex",
    "flex-row",
    "justify-content-between",
    "align-content-center",
    "mt-4"
  );

  const viewBtn = document.createElement("a");
  viewBtn.classList.add("view-btn");
  viewBtn.textContent = "View Post";
  viewBtn.href = `post.html?id=${post.id}`;

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

  feedPost.append(feedAuthor, feedTitle, feedMedia, feedContent, feedReactionRow);
  feedReactionRow.append(viewBtn, feedDate);

  return feedPost;
}

// Function to sort and display posts based on the selected option
async function sortAndDisplayPosts() {
  try {
    // Get the selected sorting option
    const feedFilterSelect = document.getElementById("feed-filter");
    const selectedOption = feedFilterSelect.value;

    // Construct the API URL based on the selected sorting option
    let apiUrl = postUrl;

    if (selectedOption === "latest") {
      apiUrl =
        "https://api.noroff.dev/api/v1/social/posts?_created=sort=latest&sortOrder=desc";
    } else if (selectedOption === "oldest") {
      apiUrl =
        "https://api.noroff.dev/api/v1/social/posts?_created=sort=latest&sortOrder=asc";
    }
    const json = await fetchToken(apiUrl);

    renderFeedPosts(json);
  } catch (error) {
    console.log(error);
  }
}

// Add an event listener to the select element to trigger sorting
const feedFilterSelect = document.getElementById("feed-filter");
feedFilterSelect.addEventListener("change", sortAndDisplayPosts);

// Initially, display the feed posts with the default sorting
displayFeedPosts();
