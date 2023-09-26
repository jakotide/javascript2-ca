import { fetchToken } from "../utilities/fetchToken.js";
import { postUrl } from "../utilities/consts.js";

async function displayFeedPosts () {
    try {
        const json = await fetchToken(postUrl);
        console.log(json);
        const feedPostDiv = document.querySelector(".feed-posts");

        for (let i = 0; i < 5 && i < json.length; i++) {
            const post = json[i];

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
    } catch(error) {
        console.log(error)
    }
   
}

displayFeedPosts();
