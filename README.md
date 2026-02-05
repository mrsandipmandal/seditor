# SEditor (Open PHP)

**SEditor** is a lightweight, dependency-free WYSIWYG editor for PHP applications. It handles rich text editing, form synchronization, and asset management seamlessly.

## Features
-   **Zero Dependencies**: Pure Vanilla JS/CSS.
-   **Compatibility**: PHP 5.6+ and Laravel 5.x - 11.x support.
-   **Form & Database Ready**: Automatically syncs content to a hidden `<textarea>`.
-   **Dynamic Toolbar**: Configure tools, placeholders, and modes.
-   **Source View**: Toggle between Visual and HTML Code view.
-   **Rich Tools**:
    -   Formatting: Bold, Italic, Underline, Strike, Sub/Superscript.
    -   Structure: Headings (H1-H3), Paragraphs, Lists (Bullet/Number).
    -   Media: Insert Image, Link, Table.
    -   Styling: Fonts, Font Size, Text Color, Highlight Color.
    -   Layout: Alignment (Left, Center, Right, Justify), Indentation.

## Installation

### Method 1: Composer (Recommended)
1.  Run the command:
    ```bash
    composer require open-php/seditor
    ```

2.  **For Laravel Users**:
    Run the publish command:
    ```bash
    php artisan vendor:publish --tag=seditor-assets
    ```

3.  **For Core PHP Users**:
    We have added a custom command to help you.
    Run this command in your project terminal:
    ```bash
    composer run publish-assets
    ```
    This will automatically copy the files to your `assets/` folder.

    Then link them in your HTML:
    ```html
    <link rel="stylesheet" href="assets/seditor.css">
    <script src="assets/seditor.js"></script>
    ```

### Method 2: Manual Download
1.  Download this repository.
2.  Copy `assets/seditor.js` and `assets/seditor.css` to your project.
3.  Include them in your HTML.

## Quick Start

### 1. The HTML
Create a standard textarea for your form input.
```html
<form method="POST" action="save.php">
    <textarea id="my-editor" name="content"></textarea>
    <button type="submit">Save</button>
</form>
```

### 2. The Script
Initialize SEditor on the textarea.
```html
<script>
    // Initialize the editor on the textarea
    const editor = SEditor.create('#my-editor');
</script>
```

### 3. Edit Mode (Loading Content)
To load existing data (e.g., from a database), simply put it inside the textarea.
```html
<textarea id="my-editor">
    <p>This is existing content loaded from the database.</p>
    <b>SEditor will automatically pick it up!</b>
</textarea>

<script>
    const editor = SEditor.create('#my-editor');
</script>
```

## Important Note for Laravel Users
Run the `php artisan vendor:publish` command **in your Laravel Application root directory**, not inside the vendor/package directory.

## Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `placeholder` | String | `''` | Text to show when empty. |
| `mode` | String | `'classic'` | `'classic'` (fluid width) or `'document'` (A4 page style). |
| `toolbar` | Array | `null` | Custom array of toolbar groups. |

### Custom Toolbar Example
```javascript
SEditor.create('#my-editor', {
    placeholder: 'Write your story...',
    toolbar: [
        { type: 'group', items: [{ icon: 'bold', cmd: 'bold' }] },
        { type: 'group', items: [{ icon: 'code', action: function() { /* ... */ } }] }
    ]
});
```

## Contributing
-   **Source**: [https://github.com/mrsandipmandal/seditor.git](https://github.com/mrsandipmandal/seditor.git)
-   **Author**: Sandip Mandal (mr_sandip@zohomail.in)

## License
MIT License
