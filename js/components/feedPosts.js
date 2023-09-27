import { fetchToken } from "../utilities/fetchToken.js";
import { postUrl } from "../utilities/consts.js";

async function displayFeedPosts() {
    try {
        const json = await fetchToken(postUrl);
        console.log(json);
        const feedPostDiv = document.querySelector(".feed-posts");

        for (let i = 0; i < 10 && i < json.length; i++) {
            const post = json[i];

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

            // Convert and format the date
            const createdDate = new Date(post.created);
            const formattedDate = `${createdDate.getDate()}-${(createdDate.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${createdDate
                .getFullYear()
                .toString()
                .slice(-2)}, ${createdDate.getHours()}:${createdDate.getMinutes()}`;

            feedDate.textContent = formattedDate;

            feedPost.append(feedTitle);
            feedPost.append(feedMedia);
            feedPost.append(feedContent);
            feedPost.append(feedReactionRow);
           
            feedReactionRow.append(feedLikeBtn, feedDate);

            feedPostDiv.append(feedPost);
        }
    } catch (error) {
        console.log(error);
    }
}

displayFeedPosts();