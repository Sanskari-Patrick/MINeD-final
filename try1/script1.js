document.addEventListener('DOMContentLoaded', function() {
        
    var strings = ["Hello, world!", "Welcome to Typed.js!", "Enjoy typing effects."];

    var currentString = 0;
    
    function typeNextString() {
        if (currentString >= strings.length) return; // Stop if no more strings

        var newElement = document.createElement("p"); // Create a new paragraph for each string
        newElement.style.marginBottom = '0'; // Remove the bottom margin to avoid extra line spaces
        document.getElementById("typed-output").appendChild(newElement); // Append the new paragraph to the container
        
        var options = {
            strings: [strings[currentString]],
            typeSpeed: 40,
            showCursor: false, // Do not show the cursor
            onComplete: function(self) {
                currentString++;
                // Add a little delay before starting the next string
                setTimeout(function() {
                    typeNextString(); // Type the next string once the current one is complete
                }, 500); // Delay can be adjusted as needed
            },
        };
        
        new Typed(newElement, options); // Initialize Typed.js on the new element
    }
    
    typeNextString(); // Start typing the first string
});




function buttonSubmit(){
    document.getElementById('welcome-text1').style.display = 'none';
    document.getElementById('welcome-text2').style.display = 'none';
    document.getElementById('container-subsection').style.display = 'none';
}