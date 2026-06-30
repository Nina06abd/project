<?php
include 'config.php';

$id = $_POST['event_id'];
$event_name = $_POST['event_name'];
$venue = $_POST['venue'];

$sql = "UPDATE events
        SET event_name='$event_name',
            venue='$venue'
        WHERE event_id=$id";

if (mysqli_query($conn, $sql)) {
    echo "Event updated successfully!";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>