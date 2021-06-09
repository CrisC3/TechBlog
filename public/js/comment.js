async function commentFormHandler(event) {
    event.preventDefault();

    const newComment = document.querySelector('textarea[name="user-input"]').value.trim();

    const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({
                    newComment
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            location.reload();

}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);