# SEditor (Open PHP)

[![Latest Stable Version](https://poser.pugx.org/open-php/seditor/v/stable)](https://packagist.org/packages/open-php/seditor)
[![Total Downloads](https://poser.pugx.org/open-php/seditor/downloads)](https://packagist.org/packages/open-php/seditor)
[![License](https://poser.pugx.org/open-php/seditor/license)](https://packagist.org/packages/open-php/seditor)

**SEditor** is a lightweight, dependency-free WYSIWYG editor for PHP applications. It handles rich text editing, form synchronization, and asset management seamlessly.

---

## Features

✅ **Zero Dependencies** — Built with pure Vanilla JS & CSS. No jQuery required.  
✅ **Laravel Integration** — Includes ServiceProvider for auto-discovery and asset publishing.  
✅ **Core PHP Support** — Simple command to publish assets in non-framework projects.  
✅ **Form Sync** — Automatically updates hidden `<textarea>` for seamless form submission.  
✅ **Document Mode** — Special A4 page interface for document-style editing.  
✅ **Page Breaks** — Insert print-friendly page breaks.  
✅ **Rich Tools** — Tables, Images, Links, Colors, and Typography controls.

---

## Installation

### Prerequisites
-   PHP 5.6 or higher
-   Composer

### Method 1: Composer (Recommended)

1.  **Install the package:**
    ```bash
    composer require open-php/seditor
    ```

2.  **Publish Assets:**

    **For Laravel:**
    ```bash
    php artisan vendor:publish --tag=seditor-assets
    ```

    **For Core PHP:**
    ```bash
    composer run publish-assets
    ```

3.  **Link Assets:**
    Add these to your HTML `<head>` and `<body>`:
    ```html
    <link rel="stylesheet" href="assets/seditor.css">
    <script src="assets/seditor.js"></script>
    ```

### Method 2: Manual Download
1.  Download this repository.
2.  Copy `assets/seditor.js` and `assets/seditor.css` to your project.
3.  Include them in your HTML.

---

## Quick Start

### 1. Create the Form
Use a standard textarea. SEditor will hide it and use it to store the final HTML.

```html
<form method="POST" action="save.php">
    <!-- The name attribute is what PHP allows you to $_POST['content'] -->
    <textarea id="my-editor" name="content"></textarea>
    <button type="submit">Save Content</button>
</form>
```

### 2. Initialize SEditor
Add the script at the bottom of your page.

```html
<script>
    <!-- Initialize the editor on the textarea -->
    const editor = SEditor.create('#my-editor');

    <!-- Initialize the editor on the textarea with placeholder -->
    const editor = SEditor.create('#my-editor', {
        placeholder: 'Start writing your story...',
    });
</script>
```

### 3. Edit Mode (Loading Content)
To load existing data (e.g., from a database), simply put it inside the textarea.

```html
<textarea id="my-editor">
    <p>This is existing content loaded from the database.</p>
    <b>SEditor will automatically pick it up!</b>
</textarea>
```

---

## Configuration

You can pass an options object to `SEditor.create()`.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `placeholder` | String | `''` | Text to show when the editor is empty. |
| `mode` | String | `'classic'` | `'classic'` (fluid width) or `'document'` (A4 page style). |
| `toolbar` | Array | `null` | Custom array of toolbar groups. |

### Custom Toolbar Example
```javascript
SEditor.create('#my-editor', {
    mode: 'document',
    toolbar: [
        { type: 'group', items: [{ icon: 'bold', cmd: 'bold' }, { icon: 'italic', cmd: 'italic' }] },
        { type: 'group', items: [{ icon: 'image', action: () => alert('Custom Action') }] }
    ]
});
```

---

## Contributing
-   **Source**: [https://github.com/mrsandipmandal/seditor.git](https://github.com/mrsandipmandal/seditor.git)
-   **Author**: Sandip Mandal (mr_sandip@zohomail.in)

## License
MIT License
