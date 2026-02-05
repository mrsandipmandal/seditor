# SEditor (Open PHP)

**SEditor** (formerly CompactEditor) is a lightweight, dependency-free WYSIWYG editor for PHP applications.

## Features
-   **Zero Dependencies**: Pure Vanilla JS/CSS.
-   **Compact & Dynamic**: CKEditor-style toolbar, fully customizable via options.
-   **PHP Form Ready**: Syncs with `<textarea>` automatically.
-   **View Source**: Toggle raw HTML editing.
-   **Rich Tools**: Headings, Fonts, Spacing, Image, Table, etc.

## Installation

### Method 1: Composer (Laravel)
1.  Run the following command:
    ```bash
    composer require open-php/seditor
    ```
2.  Publish the assets:
    ```bash
    php artisan vendor:publish --tag=seditor-assets
    ```
3.  Include assets in your Blade layout:
    ```html
    <link rel="stylesheet" href="{{ asset('vendor/seditor/seditor.css') }}">
    <script src="{{ asset('vendor/seditor/seditor.js') }}"></script>
    ```

### Method 2: Manual / Standard PHP
1.  Copy `assets/seditor.js` and `assets/seditor.css` to your public directory.
2.  Include them in your project.

## Usage

### 1. Include Assets
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
<link rel="stylesheet" href="assets/seditor.css">
<script src="assets/seditor.js"></script>
```

### 2. Initialize
```javascript
// Simple
SEditor.create('#my-editor');

// With Options
SEditor.create('#my-editor', {
    placeholder: 'Type here...',
    mode: 'classic' // or 'document'
});
```

## Contributing
-   **Source**: [https://github.com/mrsandipmandal/seditor.git](https://github.com/mrsandipmandal/seditor.git)
-   **Author**: Sandip Mandal (mr_sandip@zohomail.in)

## License
MIT License
