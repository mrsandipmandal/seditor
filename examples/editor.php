<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compact Editor (PHP Integration)</title>
    
    <!-- Dependencies -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Calibri&family=Times+New+Roman&family=Arial&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    
    <!-- Editor Library -->
    <link rel="stylesheet" href="../assets/compact-editor.css">
</head>
<body style="margin:0; height: 100vh; display: flex; flex-direction: column;">

    <!-- Method: Target a Textarea for Form Submission -->
    <form action="" method="post" style="height: 100%; display: flex; flex-direction: column;">
        
        <!-- The library will hide this textarea and insert the editor -->
        <textarea id="my-editor" name="content" style="width: 100%; height: 300px;">
            <p>This is the <b>initial content</b> loaded from the textarea.</p>
        </textarea>

    </form>

    <!-- Script to Init -->
    <script src="../assets/compact-editor.js"></script>
    <script>
        // Initialize the editor on the textarea
        const editor = CompactEditor.create('#my-editor');
    </script>
</body>
</html>
