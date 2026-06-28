
<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en"
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1200, initial-scale=1.0">
    <title>Login - Online Event Registration System</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="login.css">
</head>
<body>

<?php if (isset($_SESSION['error'])) echo '<p style="color:red">' . $_SESSION['error'] . '</p>'; ?>

<div class="desktop-viewport-wrapper">
    <div class="container">

        <div class="menu-icon">
            <span></span>
            <span></span>
        </div>

        <div class="left">
            <img src="c:\Users\valan\Desktop\output (1).jpg">
            <div class="overlay">
                <h1>Turning special occasions into lasting memories through unique events and experiences.</h1>
            </div>
            <div class="left-decorations">
                <div class="line-circle c1"></div>
                <div class="line-circle c2"></div>
            </div>
        </div>

        <div class="right">
            <div class="form-wrapper">
                <h2>Welcome<br>Back</h2>

                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
                </div>

                <div class="input-group password-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password">
                    <span class="toggle-password" onclick="togglePassword()">
                        <svg id="eyeIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    </span>
                </div>

                <div class="form-options">
                    <label class="remember-me">
                        <input type="checkbox" id="rememberMe">
                        <span class="checkmark"></span>
                        Remember me
                    </label>
                    <a href="#" class="forgot-link" onclick="forgotPassword()">Forgot Password</a>
                </div>

                <button type="button" class="btn-signin" onclick="signIn()">Sign in</button>

                <div class="divider">Or</div>

                <a href="event.html" class="btn-google">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"  alt="Google Logo">
                    Sign in with Google
                </a>

                <p id="loginMessage"></p>
            </div>

            <div class="right-decorations">
                <div class="dark-blob"></div>
                <div class="blob-line b1"></div>
                <div class="blob-line b2"></div>
                <div class="blob-line b3"></div>
            </div>
        </div>
    </div>
</div>

<script src="login.js"></script>
</body>
<?php session_write_close(); ?>
</html>