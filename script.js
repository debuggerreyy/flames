document.getElementById('flamesForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let yourName = document.getElementById('yourName').value.toLowerCase();
    let crushName = document.getElementById('crushName').value.toLowerCase();

    let leftoverLetters = calculateLeftoverLetters(yourName, crushName);
    let result = flamesGame(leftoverLetters);

    // Show the result in the result div
    document.getElementById('result').innerHTML = `The relationship type is: <strong>${result}</strong>`;
    
    // Hide the form and display a fun message or animation
    document.getElementById('flamesForm').style.display = 'none'; // Hide the form
    document.getElementById('result').style.display = 'block'; // Display the result

    // Optionally, change the heart animation or show a celebratory message
    showCelebration(result);
});

function calculateLeftoverLetters(yourName, crushName) {
    let combinedNames = yourName + crushName;
    let leftoverLetters = combinedNames.split('');

    for (let i = 0; i < yourName.length; i++) {
        let index = leftoverLetters.indexOf(yourName[i]);
        if (index !== -1) leftoverLetters.splice(index, 1);
    }

    return leftoverLetters.length;
}

function flamesGame(count) {
    const flames = ['Friends', 'Lovers', 'Affectionate', 'Marriage', 'Enemies', 'Siblings'];
    return flames[count % flames.length];
}

function showCelebration(result) {
    // Customize based on the result
    if (result === "Lovers") {
        document.body.style.backgroundColor = "#ff5050"; // Set a special color for Lovers
        alert("Congratulations! You're in love! 💕");
    } else if (result === "Friends") {
        document.body.style.backgroundColor = "#ff9e9e"; // Set a color for Friends
        alert("You're friends! 🤗");
    } else {
        document.body.style.backgroundColor = "#ff6a6a"; // Set a color for others
        alert("A unique relationship is ahead! 🌟");
    }

    // Optionally, animate the heart or any other element
    let heart = document.querySelector('.heart');
    if (heart) {
        heart.style.animation = 'none'; // Stop previous animation
        setTimeout(() => {
            heart.style.animation = 'heartbeat 1.5s infinite ease-in-out'; // Restart animation
        }, 500);
    }
}
