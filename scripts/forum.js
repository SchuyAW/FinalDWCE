// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKfdSygmE426hqz-KeH4INx3W2yZ8KgBc",
    authDomain: "dwce-f884a.firebaseapp.com",
    projectId: "dwce-f884a",
    storageBucket: "dwce-f884a.appspot.com",
    messagingSenderId: "866581911640",
    appId: "1:866581911640:web:1367b07d872ed49deed22d",
    measurementId: "G-NPMJNWS7SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add a comment
async function addComment() {
    const usernameInput = document.getElementById('usernameInput');
    const commentInput = document.getElementById('commentInput');
    const username = usernameInput.value.trim() || 'Anonymous'; // Default to 'Anonymous' if no username
    const commentText = commentInput.value.trim();

    if (commentText === '') return;

    try {
        await addDoc(collection(db, 'comments'), {
            username: username,
            text: commentText,
            timestamp: serverTimestamp()
        });

        commentInput.value = '';
        usernameInput.value = ''; // Clear the username field
        loadComments();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

// Function to load comments
async function loadComments() {
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = ''; // Clear existing comments

    try {
        // Query to get comments ordered by timestamp in descending order
        const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const data = doc.data();

            // Create the comment box element
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-box'; // Use the class defined in CSS

            // Create the comment content container
            const commentContent = document.createElement('div');
            commentContent.className = 'comment-content';

            // Create the comment header
            const commentHeader = document.createElement('div');
            commentHeader.className = 'comment-header';
            
            const usernameElement = document.createElement('span');
            usernameElement.className = 'comment-username';
            usernameElement.textContent = data.username;
            
            const timestampElement = document.createElement('span');
            timestampElement.className = 'comment-timestamp';
            timestampElement.textContent = new Date(data.timestamp.seconds * 1000).toLocaleString();
            
            commentHeader.appendChild(usernameElement);
            commentHeader.appendChild(timestampElement);
            commentContent.appendChild(commentHeader);

            // Create the comment text
            const commentTextElement = document.createElement('div');
            commentTextElement.className = 'comment-text';
            commentTextElement.textContent = data.text;
            commentContent.appendChild(commentTextElement);

            commentElement.appendChild(commentContent);
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error("Error loading comments: ", error);
    }
}

// Call the autoResizeTextarea function after the page loads
window.onload = function() {
    loadComments(); // Ensure comments are also loaded
};

// Attach functions to the global window object
window.addComment = addComment;
window.loadComments = loadComments;
