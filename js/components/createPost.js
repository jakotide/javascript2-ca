

/**
 * Creates a new post when form is submitted.
 * @param {*} event 
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    try {
        const form = document.getElementById("create-post-form");
        const formData = new FormData(form);
        console.log("hello")

        const apiUrl = "https://api.noroff.dev/api/v1/social/posts";
        const token = localStorage.getItem("accessToken");
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        };


        const response = await fetch(apiUrl, fetchOptions);
        console.log(response)

        if (response.ok) {
            console.log("New post created successfully.");
            alert("Success!")
            
        } else {
            console.error("Failed to create a new post.");

        }
    } catch (error) {
        console.error(error);
    }
}

const createPostForm = document.getElementById("create-post-form");
createPostForm.addEventListener("submit", handleFormSubmit);
