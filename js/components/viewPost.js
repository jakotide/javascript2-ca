import { fetchToken } from "../utilities/fetchToken.js";
import { postUrl } from "../utilities/consts.js";

function getId () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
}

async function getPosts() {
    try {
        const response = await fetchToken(postUrl);

        return await response;
        
        console.log(response);
        } 
     catch (error) {
        console.error(error);
    }
}

getPosts();

async function getSinglePost() {
    try {
        const posts = await getPosts(getId());
        console.log("HELLO")
        console.log(posts);
    }
    catch(error) {
        console.log(error)
    }
}

getSinglePost()



