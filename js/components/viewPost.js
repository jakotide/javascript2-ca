import { fetchToken } from "../utilities/fetchToken.js";

/**
 * Fetches and displays a post from the API
 * @returns 
 */
async function displaySinglePost() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
      console.error("Post ID is missing in the URL.");
      return;
    }

    const apiUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}`;

    const json = await fetchToken(apiUrl);

    if (json) {
      renderSinglePost(json);
    } else {
      console.error("Failed to fetch the post data.");
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Creates the HTML for the post. 
 * @param {*} post 
 */
function renderSinglePost(post) {
  const viewPost = document.querySelector(".view-post");
  viewPost.classList.add(
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

  const viewTitle = document.createElement("h2");
  viewTitle.classList.add("view-title");
  viewTitle.textContent = post.title;

  const viewImg = document.createElement("img");
  viewImg.classList.add("view-img", "img-fluid");
  viewImg.src = post.media;

  const viewContent = document.createElement("p");
  viewContent.classList.add("view-content");
  viewContent.textContent = post.body;

  viewPost.append(viewTitle, viewImg, viewContent);
}

displaySinglePost();
