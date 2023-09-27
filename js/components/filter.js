

// Function to sort posts based on the selected option
function sortPosts(posts, sortBy) {
  // Clone the array to avoid modifying the original data
  const sortedPosts = [...posts];

  if (sortBy === "latest") {
    sortedPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (sortBy === "oldest") {
    sortedPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
  } else if (sortBy === "popular") {
    sortedPosts.sort((a, b) => b.reactions - a.reactions);
  }

  return sortedPosts;
}

// Event listener for the select element to trigger sorting
const feedFilterSelect = document.querySelector("#feed-filter");
feedFilterSelect.addEventListener("change", async (event) => {
  const selectedSortOption = event.target.value;
  try {
   
    const sortedPosts = sortPosts(json, selectedSortOption);
    displayFeedPosts(sortedPosts);
  } catch (error) {
    console.error(error);
  }
});


