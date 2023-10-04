

// Function to handle the form submission
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

        // Send the POST request to create a new post
        const response = await fetch(apiUrl, fetchOptions);
        console.log(response)

        if (response.ok) {
            console.log("New post created successfully.");
            // Handle success (e.g., redirect or display a success message)
        } else {
            console.error("Failed to create a new post.");
            // Handle error (e.g., display an error message)
        }
    } catch (error) {
        console.error(error);
    }
}

const createPostForm = document.getElementById("create-post-form");
createPostForm.addEventListener("submit", handleFormSubmit);
