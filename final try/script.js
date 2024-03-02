// Function for submitting a question
function submitQuestion() {
    const question = document.getElementById('hero-field').value; // Ensure this ID matches your question input
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Assuming you have an element to display the answer
            document.getElementById('answer').textContent = data.answer;
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('answer').textContent = 'Failed to get an answer. Please try again.';
        });
}

// Function for document upload
function uploadDocument() {
    const input = document.getElementById('document');
    const data = new FormData();
    data.append('document', input.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: data,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Document uploaded successfully!');
            input.value = ''; // Clear the input field
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Upload failed!');
        });
}


function checkFile() {
    var file = document.getElementById('document').files[0];
    if (file) {
        alert('Document uploaded successfully!');

        uploadDocument()
    } else {
        alert('No document selected or document upload failed!');
    }
}


document.getElementById('toggleButton').addEventListener('click', function () {
    document.getElementById('welcome-text').style.display = 'none';
    var cardsContainer = document.getElementById('cards-container');
    var chatbox = document.getElementById('chatbox');

    // Toggle cards and chatbox visibility
    cardsContainer.classList.toggle('hidden');
    chatbox.classList.toggle('hidden');
});