<?php
// SEditor Core PHP Example (Root Directory)
$content = isset($_POST['content']) ? $_POST['content'] : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SEditor Demo</title>
    
    <!-- 
      Debug Info:
      Current Directory: <?php echo getcwd(); ?>
      Assets Path Check: <?php echo file_exists('assets/seditor.js') ? 'FOUND' : 'NOT FOUND (Check Directory Structure)'; ?>
    -->
    <link rel="stylesheet" href="./assets/seditor.css"> 
    
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <style>
        body { font-family: sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        button { margin-top: 10px; padding: 10px 20px; cursor: pointer; background: #1a73e8; color: white; border: none; border-radius: 4px; }
    </style>
</head>
<body>

    <h2>SEditor Demo</h2>
    
    <!-- Path Debugger -->
    <div style="background:#eee; padding:5px; font-size:11px; margin-bottom:10px; border:1px solid #ccc;">
        <strong>Debug:</strong> 
        CSS Path: <code>./assets/seditor.css</code> | 
        JS Path: <code>./assets/seditor.js</code> <br>
        Server Path: <code><?php echo __DIR__; ?></code>
    </div>

    <form method="POST" action="">
        <textarea id="my-editor" name="content" style="width:100%; height:300px;"><?php echo htmlspecialchars($content); ?></textarea>
        <br>
        <button type="submit">Save Content</button>
    </form>

    <?php if($content): ?>
        <h3>Submitted Result:</h3>
        <div style="border:1px solid #ccc; padding:10px; background: #f9f9f9;">
            <?php echo $content; ?>
        </div>
    <?php endif; ?>

<!-- Include JS -->
<script src="./assets/seditor.js"></script>

<!-- Initialize -->
<script>
    if (typeof SEditor === 'undefined') {
        document.body.insertAdjacentHTML('beforeend', '<div style="background:red; color:white; padding:20px; font-weight:bold;">Javascript NOT Loaded. <br> Browser tried to load: ' + new URL('./assets/seditor.js', document.baseURI).href + '</div>');
    } else {
        const editor = SEditor.create('#my-editor');
    }
</script>

</body>
</html>
