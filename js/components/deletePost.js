import { postUrl } from "../utilities/consts.js";
// const deleteBtn = document.querySelector("#delete-btn");

async function deletePost(postId) {
    const token = localStorage.getItem("accessToken");
    const deletePostUrl = `${postUrl}/${postId}`;
    const fetchOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await fetch(deletePostUrl, fetchOptions);
    if (response.status >= 200 && response.status < 300) {
        
        return true;
    } else {
        
        return false;
    }
}
function loginFormListener() {

    const deleteButton = document.querySelector("#delete-btn"); 

    const url = new URL(location.href);
    const id = url.searchParams.get("id");



    if (deleteButton) {
        deleteButton.addEventListener("click", async () => {
            if (confirm("Are you sure you want to delete this post?")) {
                const deleted = await deletePost(id);
                if (deleted) {
                    console.log("Post was succesfully deleted");
                    window.location.href = "index.html";
                    
                } else {
                    console.error("Failed to delete the post.");
                }
            }
        });
    }
}

loginFormListener();

