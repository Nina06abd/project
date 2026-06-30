<?php
include 'config.php';
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Petals and Promises</title>

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="style.css">
</head>

<body>

<!-- HEADER -->
<header>
  <div class="hero-text">
    <h1>Petal and Promise</h1>
    <p>
      Workshops, inspiration, and creative experiences.<br>
      Join us and bring your floral vision to life.
    </p>
  </div>
</header>

<!-- SEARCH BAR -->
<div class="search-wrap">
  <input type="text" id="searchInput"
         placeholder="Search by event name...">

  <button onclick="doSearch()">Search</button>
  <button onclick="clearSearch()" style="color:#aaa;">Clear</button>
</div>

<p id="searchResult"></p>

<!-- TOOLBAR -->
<div class="toolbar">
  <div class="toolbar-label">Upcoming Events</div>

  <div class="toolbar-icons">

    <button class="view-btn active"
            id="btnList"
            onclick="showList()">

      <svg class="icon-list-svg" viewBox="0 0 20 16" fill="currentColor">
        <rect x="6" y="0" width="14" height="2" rx="1"/>
        <rect x="6" y="7" width="14" height="2" rx="1"/>
        <rect x="6" y="14" width="14" height="2" rx="1"/>
        <rect x="0" y="0" width="3" height="2" rx="1"/>
        <rect x="0" y="7" width="3" height="2" rx="1"/>
        <rect x="0" y="14" width="3" height="2" rx="1"/>
      </svg>

      List
    </button>

    <button class="view-btn"
            id="btnMonth"
            onclick="showMonth()">

      <svg class="icon-month-svg" viewBox="0 0 20 16" fill="currentColor">
        <rect x="0" y="0" width="8" height="6" rx="1"/>
        <rect x="12" y="0" width="8" height="6" rx="1"/>
        <rect x="0" y="10" width="8" height="6" rx="1"/>
        <rect x="12" y="10" width="8" height="6" rx="1"/>
      </svg>

      Month
    </button>

  </div>
</div>

<!-- MONTH VIEW -->
<div id="monthView">
  <div class="cal-header">
    <h3 id="calTitle"></h3>

    <div class="cal-nav">
      <button onclick="changeMonth(-1)">&#8592;</button>
      <button onclick="changeMonth(1)">&#8594;</button>
    </div>
  </div>

  <div class="cal-grid" id="calGrid"></div>

  <p style="font-size:12px;color:#aaa;margin-top:16px;font-style:italic;">
    Highlighted dates have scheduled events.
  </p>
</div>

<!-- LIST VIEW -->
<div id="listView">

<?php

$sql = "SELECT * FROM events";
$result = mysqli_query($conn, $sql);

if (!$result) {
    die("Query Failed: " . mysqli_error($conn));
}

if (mysqli_num_rows($result) > 0) {

    while ($row = mysqli_fetch_assoc($result)) {

?>

<div class="event-row"
     data-name="<?php echo strtolower($row['event_name']); ?>">

    <div class="event-details">

        <h2><?php echo $row['event_name']; ?></h2>

        <div class="location">
            <?php echo $row['venue']; ?>
        </div>

        <div class="time">
            <?php echo date("g:i a", strtotime($row['start_time'])); ?>
            —
            <?php echo date("g:i a", strtotime($row['end_time'])); ?>
        </div>

        <p>
            <?php echo $row['description']; ?>
        </p>

        <div class="divider"></div>

        <a href="Register.html">Register Now</a>

        <br><br>

        <a href="delete_event.php?id=<?php echo $row['event_id']; ?>"
           onclick="return confirm('Are you sure you want to delete this event?');">
           Delete Event
        </a>

    </div>

</div>

<?php

    }

} else {

    echo "<h2>No Events Available</h2>";

}

?>

<div id="noResults">
    No events found matching your search.
</div>

</div>

<!-- PREVIOUS EVENTS -->
<div class="prev-events">
  <div class="prev-circle">&#8592;</div>
  <span>Previous Events</span>
</div>

<!-- FOOTER -->
<footer>
  <div class="footer-text">
    <p>Where Every Detail Blooms.</p>

    <div class="footer-logo">Q</div>

    <small>
      &copy; 2026 Qaiwan University — All Rights Reserved
    </small>
  </div>
</footer>

<script src="script.js"></script>

</body>
</html>