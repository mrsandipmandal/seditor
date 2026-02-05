<?php
// Core PHP Example (No Laravel)
// Save this file next to your 'assets' folder to reference them easily.

$content = isset($_POST['content']) ? $_POST['content'] : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Core PHP SEditor Demo</title>
    
    <!-- 1. Include the CSS (Standard HTML, No Blade {{ }}) -->
    <!-- Adjust path if your assets folder is somewhere else -->
    <link rel="stylesheet" href="../assets/seditor.css"> 
    
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <style>
        body { font-family: sans-serif; padding: 20px; }
        .editor-container { max-width: 800px; margin: 0 auto; }
        button { margin-top: 10px; padding: 10px 20px; cursor: pointer; }
    </style>
</head>
<body>

<div class="editor-container">
    <h2>Core PHP Form</h2>
    
    <form method="POST" action="">
        <!-- 2. The Textarea -->
        <textarea id="my-editor" name="content" style="width:100%; height:300px;"><?php echo htmlspecialchars($content); ?></textarea>
        <br>
        <button type="submit">Save Content</button>
    </form>

    <?php if($content): ?>
        <h3>Submitted Result:</h3>
        <div style="border:1px solid #ccc; padding:10px;">
            <?php echo $content; ?>
        </div>
    <?php endif; ?>
</div>

<!-- 3. Include the JS -->
<script src="../assets/seditor.js"></script>

<!-- 4. Initialize -->
<script>
    if (typeof SEditor === 'undefined') {
        alert("Error: SEditor is not loaded! \n\nPlease check your Console (F12) for 404 errors. \n\nThe path '../assets/seditor.js' seems wrong for your file location.");
        document.querySelector('.editor-container').insertAdjacentHTML('afterbegin', '<div style="background:#ffcccc; padding:10px; border:1px solid red; margin-bottom:10px; color:red;"><strong>Error:</strong> <code>seditor.js</code> not found. Please update the <code>&lt;script src="..."&gt;</code> path.</div>');
    } else {
        const editor = SEditor.create('#my-editor', {
            placeholder: 'Write something in Core PHP...',
        });
    }
</script>

</body>
</html>
