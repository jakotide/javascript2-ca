import { postUrl } from "../utilities/consts.js";


/**
 * Updates the post data using PUT method.
 * @param {*} postData 
 * @returns 
 */
async function updatePost(postData) {
    console.log(postData)
    if (!postData.id) {
        throw new Error("Update requires a post ID")
    }
    const token = localStorage.getItem("accessToken");
    const updatePostUrl = `${postUrl}/${postData.id}`;
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData),
    }

    const response = await fetch(updatePostUrl, fetchOptions);
    console.log(response);
    return await response.json();
}



function loginFormListener() {
    const form = document.querySelector("#edit-post");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if(form){

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());
            post.id = id;
            alert("Success!")

            updatePost(post);
    
    })
    }
}

 loginFormListener();
