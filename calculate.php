-- Active: 1733365910375@@127.0.0.1@3306@flames_game
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $yourName = $_POST['yourName'];
    $crushName = $_POST['crushName'];

    $leftoverLetters = calculateLeftoverLetters($yourName, $crushName);
    $result = flamesGame($leftoverLetters);

    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'flames_game');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO results (your_name, crush_name, result) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $yourName, $crushName, $result);
    $stmt->execute();
    $stmt->close();
    $conn->close();

    echo "The relationship type is: " . $result;
}

function calculateLeftoverLetters($yourName, $crushName) {
    $combinedNames = strtolower($yourName . $crushName);
    $leftoverLetters = str_split($combinedNames);

    foreach (str_split($yourName) as $letter) {
        $index = array_search($letter, $leftoverLetters);
        if ($index !== false) {
            unset($leftoverLetters[$index]);
        }
    }

    return count($leftoverLetters);
}

function flamesGame($count) {
    $flames = ['Friends', 'Lovers', 'Affectionate', 'Marriage', 'Enemies', 'Siblings'];
    return $flames[$count % count($flames)];
}
?>
