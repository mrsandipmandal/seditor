# Compact Editor

A lightweight, dependency-free WYSIWYG editor that looks and feels like CKEditor.

## Features
- **Zero Dependencies**: Pure Vanilla JS and CSS.
- **Compact UI**: Modern, grouped toolbar with Material Icons.
- **Form Ready**: Automatically syncs with `<textarea>` for form submissions.
- **Customizable**: Supports both 'Document' (A4) and 'Classic' (Fluid) modes.

## Installation

### Method 1: Composer (Recommended)
Run the following command in your project:
```bash
composer require open-php/compact-editor
```
Then copy the files from `vendor/open-php/compact-editor/assets` to your public directory, or reference them directly if accessible.

### Method 2: Direct Download
1.  Copy the `assets/` folder to your project.
2.  Include `compact-editor.css` and `compact-editor.js` in your HTML.

## Basic Usage

### Include Assets
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
<link rel="stylesheet" href="assets/compact-editor.css">
```
```html
<script src="assets/compact-editor.js"></script>
```

### Initialize
```javascript
CompactEditor.create('#my-editor');
```

## Demos
Check the `examples/` folder for working demos:
-   `examples/index.html`: Standard Usage
-   `examples/editor.php`: PHP Form Integration

## Configuration

You can pass an options object as the second argument.

```javascript
CompactEditor.create('#my-editor', {
    mode: 'classic' // 'classic' (fluid width) or 'document' (A4 styled page)
});
```

- **mode**:
    - `'classic'` (Default): The editor fills the width of the container (like CKEditor).
    - `'document'`: The editor looks like an A4 piece of paper with margins and shadows.

## Keyboard Shortcuts
- `Ctrl+B`: Bold
- `Ctrl+I`: Italic
- `Ctrl+U`: Underline
- `Tab`: Inserts 4 spaces
