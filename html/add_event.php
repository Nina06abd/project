<?php
include 'config.php';

if (isset($_POST['submit'])) {

    $event_name = $_POST['event_name'];
    $venue = $_POST['venue'];
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];
    $description = $_POST['description'];

    $sql = "INSERT INTO events
            (event_name, venue, start_time, end_time, description)
            VALUES
            ('$event_name', '$venue', '$start_time', '$end_time', '$description')";

    if (mysqli_query($conn, $sql)) {
        echo "<script>
                alert('Event added successfully!');
                window.location.href='Event.php';
              </script>";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Add Event</title>
</head>
<body>

<h2>Add New Event</h2>

<form method="POST">

    <label>Event Name:</label><br>
    <input type="text" name="event_name" required><br><br>

    <label>Venue:</label><br>
    <input type="text" name="venue" required><br><br>

    <label>Start Time:</label><br>
    <input type="time" name="start_time" required><br><br>

    <label>End Time:</label><br>
    <input type="time" name="end_time" required><br><br>

    <label>Description:</label><br>
    <textarea name="description" rows="5" cols="40" required></textarea><br><br>

    <input type="submit" name="submit" value="Add Event">

</form>

</body>
</html>