<?php
// Handle Form Submission
$submittedContent = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $submittedContent = $_POST['content'] ?? '';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compact Editor - PHP Form Demo</title>
    
    <!-- Dependencies -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Calibri&family=Times+New+Roman&family=Arial&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    
    <!-- Editor Library -->
    <link rel="stylesheet" href="../assets/seditor.css">

    <style>
        body { font-family: 'Inter', sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        h1 { margin-top: 0; color: #333; }
        .btn-submit { background: #1a73e8; color: white; border: none; padding: 12px 24px; border-radius: 4px; font-size: 16px; cursor: pointer; margin-top: 20px; }
        .btn-submit:hover { background: #1557b0; }
        
        .result-box { margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; }
        .result-section { margin-bottom: 30px; }
        .result-label { font-weight: bold; margin-bottom: 10px; display: block; color: #666; }
        .source-code { background: #2d2d2d; color: #eee; padding: 15px; border-radius: 4px; overflow-x: auto; font-family: monospace; white-space: pre-wrap; }
        .rendered-view { border: 1px solid #ddd; padding: 20px; background: white; min-height: 100px; }
    </style>
</head>
<body>

<div class="container">
    <h1>PHP Form Integration (SEditor)</h1>
    
    <form action="" method="post">
        <textarea id="my-editor" name="content" style="width: 100%; height: 300px;">
            <?php echo $submittedContent ? htmlspecialchars($submittedContent) : '<p>Welcome! This is a <b>PHP enabled</b> demo of SEditor.</p>'; ?>
        </textarea>
        
        <button type="submit" class="btn-submit">Submit Content</button>
    </form>

    <?php if ($submittedContent): ?>
    <div class="result-box">
        <h2>Submission Results</h2>
        
        <!-- Rendered Design -->
        <div class="result-section">
            <span class="result-label">1. Rendered Design (What the user sees):</span>
            <div class="rendered-view">
                <?php echo $submittedContent; ?>
            </div>
        </div>

        <!-- HTML Source -->
        <div class="result-section">
            <span class="result-label">2. HTML Source (What is saved in DB):</span>
            <pre class="source-code"><?php echo htmlspecialchars($submittedContent); ?></pre>
        </div>
    </div>
    <?php endif; ?>

</div>

<!-- Script to Init -->
<script src="../assets/seditor.js"></script>
<script>
    // Initialize the editor
    SEditor.create('#my-editor', {
        placeholder: 'Enter your rich text here...'
    });
</script>

</body>
</html>
