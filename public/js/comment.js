// Function to post new comments
async function postComment(event) {
    event.preventDefault();

    // Local scope variables
    const newCommentId = document.getElementById("newComment");
    const newComment = newCommentId.value;

    // Fetch POST from API and save to variable
    const response = await fetch("/api/comments/", {
        method: "POST",
        body: JSON.stringify({ newComment }),
        headers: { "Content-Type": "application/json" }
    });
    
    // Refreshes the page if the response is OK
    if (response.ok) {
        document.location.reload();
    }
};

// Function to update/delete comments
async function updDelComm(event) {
    event.preventDefault();

    // const comment = event.currentTarget.children[0].value;
    const btnClicked = event.submitter.value;
    const commentId = event.target.querySelector('textarea[name="user-update"]').getAttribute('data-commendId');

    // Checks if the user clicked on Update button
    if (btnClicked == "update") {

        // User clicked on Update button
        
        // Local scope variables
        const blogId = document.querySelector('textarea[name="user-update"]').getAttribute('data-blogId');
        const newComment = event.target.querySelector('textarea[name="user-update"]').value.trim();
        
        // Fetch PUT from API and save to variable
        const response = await fetch(`/api/comments/${commentId}`, {
            method: "PUT",
            body: JSON.stringify({ id: commentId, blog_id: blogId, comment: newComment }),
            headers: { "Content-Type": "application/json" }
        });

        // Refreshes the page if the response is OK
        if (response.ok) {
            document.location.reload();            
        }
    }
    else {
        
        // Fetch DELETE from API and save to variable
        const response = await fetch(`/api/comments/${commentId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        // Refreshes the page if the response is OK
        if (response.ok) {
            document.location.reload();            
        }
    }
};

// Event listener for adding a new single comment
document.querySelector(".comment-form").addEventListener("submit", postComment);

// Event listener for updating-deleting comments
document.querySelectorAll(".comment-body").forEach(item => {
    item.addEventListener("submit", updDelComm);
});