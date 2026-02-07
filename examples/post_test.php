<?php
$submittedContent = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $submittedContent = isset($_POST['content']) ? $_POST['content'] : '';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEditor POST Submission Test</title>
    <style>
        body { font-family: sans-serif; max-width: 800px; margin: 20px auto; padding: 20px; }
        .result-box { 
            border: 1px solid #ccc; 
            background: #f9f9f9; 
            padding: 15px; 
            margin-bottom: 20px; 
            border-radius: 5px;
        }
        .raw-code {
            background: #333;
            color: #fff;
            padding: 10px;
            overflow-x: auto;
            white-space: pre-wrap;
            font-family: monospace;
            margin-top: 10px;
        }
        button {
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>

    <h1>SEditor POST Test</h1>

    <?php if ($submittedContent): ?>
        <div class="result-box">
            <h3>Submitted Content (Rendered):</h3>
            <div class="render-view">
                <?php echo $submittedContent; ?>
            </div>
            
            <h3>Submitted Content (Raw HTML):</h3>
            <div class="raw-code"><?php echo htmlspecialchars($submittedContent); ?></div>
        </div>
    <?php endif; ?>

    <form method="POST" action="">
        <div style="margin-bottom: 20px;">
            <label for="editor">Edit Content (Try Line Height, Fonts, Colors):</label>
            <textarea name="content" id="my-editor" style="width: 100%; height: 300px;">
                <?php echo htmlspecialchars($submittedContent); ?>
            </textarea>
        </div>
        <button type="submit">Submit Content</button>
    </form>

    <!-- Load SEditor -->
    <script src="../assets/seditor.js"></script>
    <script>
        // Initialize Editor
        const editor = SEditor.create('#my-editor');
    </script>
</body>
</html>
