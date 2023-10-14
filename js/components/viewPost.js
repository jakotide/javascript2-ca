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

    const apiUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}?_author=true&_reactions=true&_comments=true`;

    const json = await fetchToken(apiUrl);
    console.log(json)

    if (json) {
      renderSinglePost(json);
      renderCommentSection(json)
      
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

  const authorBanner = document.createElement("img");
  authorBanner.src = post.author.banner;
  authorBanner.classList.add("author-banner")

  const viewAuthor = document.createElement("div");
  viewAuthor.innerText = `${post.author.name} posted:`;
  viewAuthor.classList.add("mb-3")

  const viewTitle = document.createElement("h2");
  viewTitle.classList.add("view-title");
  viewTitle.textContent = post.title;

  const viewImg = document.createElement("img");
  viewImg.classList.add("view-img", "img-fluid", "mb-3");
  viewImg.src = post.media;

  const viewContent = document.createElement("p");
  viewContent.classList.add("view-content");
  viewContent.textContent = post.body;

  const reactionRow = document.createElement("div");
  reactionRow.classList.add("d-flex", "flex-row")

    post.reactions.forEach((reaction) => {
        const reactionEmoji = document.createElement("div");
        reactionEmoji.innerText = `${reaction.symbol}${reaction.count}` + ` `;
        reactionRow.appendChild(reactionEmoji);
    })


  
 
  viewPost.append(authorBanner, viewAuthor, viewTitle, viewImg, viewContent, reactionRow);
}

function renderCommentSection(post) {
  const commentSection = document.querySelector(".comment-section");

  if (commentSection) {
      post.comments.forEach((comment) => {
          const commentAuthor = document.createElement("div");
          commentAuthor.innerText = comment.author.name;
          commentAuthor.classList.add("text-primary", "mb-1");

          const commentElement = document.createElement("div");
          commentElement.classList.add("comment-element")
          commentElement.innerText = comment.body; 

          commentSection.append(commentAuthor, commentElement);
      });
  }
}



displaySinglePost();
