import { fetchToken } from "./fetchToken.js";

async function getProfilePosts() {
    try {
        const username = localStorage.getItem("Username")
        const profilePostsUrl = `https://api.noroff.dev/api/v1/social/profiles/${username}/posts`;
        const json = await fetchToken(profilePostsUrl);

        createProfile();

        renderProfilePosts(json);

    } catch(error) {
        console.log(error)
    }
}

function renderProfilePosts(posts) {
    const profilePosts = document.querySelector(".profile-posts");
    profilePosts.innerHTML = ""; // Clear previous posts

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const profileCard = document.createElement("div");
        profileCard.classList.add("card");

        const profilePostTitle = document.createElement("h3");
        profilePostTitle.classList.add("post-title");
        profilePostTitle.innerText = post.title;

        const profilePostImage = document.createElement("img");
        profilePostImage.classList.add("img-fluid");
        profilePostImage.src = post.media;

        const profilePostBody = document.createElement("p");
        profilePostBody.classList.add("post-body");
        profilePostBody.innerText = post.body;

        const profileLinks = document.createElement("div");
        profileLinks.classList.add("d-flex", "flex-column", "justify-content-center")

        const profileEdit = document.createElement("a");
        profileEdit.classList.add("profile-post-link");
        profileEdit.innerText = "Edit"
        profileEdit.href = `edit.html?id=${post.id}`

        profileCard.appendChild(profilePostTitle);
        profileCard.append(profilePostImage)
        profileCard.appendChild(profilePostBody);
        profileLinks.append(profileEdit)
        profileCard.append(profileLinks)
        profilePosts.appendChild(profileCard);
    }
}

function createProfile() {
    const profileName = document.querySelector(".username");
    const profileAva = document.querySelector(".user-avatar");
    const username = localStorage.getItem("Username")
    const avatar = localStorage.getItem("User avatar")
    profileName.innerText = `${username}'s Profile`;
    profileAva.classList.add("img-fluid", "user-avatar")
    profileAva.src = avatar;
}

getProfilePosts();