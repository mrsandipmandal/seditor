// Auto-inject CSS
(function () {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const cssPath = currentScript.src.replace('.js', '.css');

    // Check if style already exists to avoid duplicates
    if (!document.querySelector(`link[href^="${cssPath}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath + '?v=' + new Date().getTime();
        document.head.appendChild(link);
    }
})();

const ICONS = {
    menu: '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
    code: '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>',
    undo: '<path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>',
    redo: '<path d="M18.4 10.6C16.55 9 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>',
    format_bold: '<path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7c2.09 0 3.85-1.52 3.85-3.5 0-1.8-1.21-3.21-2.92-3.66zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>',
    format_italic: '<path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>',
    format_underlined: '<path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>',
    strikethrough_s: '<path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/>',
    subscript: '<path d="M22 18h-2v1h3v1h-4v-2c0-.55.45-1 1-1h2v-1h-3v-1h3c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1zM5.88 18h2.66l3.4-5.42h-3L6.32 16.5l-2.7-4.06H.9l3.52 5.42L1 23h3.02l2.42-3.84L8.8 23h2.88L5.88 18z"/>',
    superscript: '<path d="M22 7h-2v1h3v1h-4V7c0-.55.45-1 1-1h2V5h-3V4h3c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1zM5.88 18h2.66l3.4-5.42h-3L6.32 16.5l-2.7-4.06H.9l3.52 5.42L1 23h3.02l2.42-3.84L8.8 23h2.88L5.88 18z"/>',
    format_color_text: '<path d="M0 20h24v4H0zM11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>',
    border_color: '<path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15 2.25 18.75 6l1.96-1.96z"/><path fill-opacity=".36" d="M0 20h24v4H0z"/>',
    format_align_left: '<path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>',
    format_align_center: '<path d="M7 15v2h10v-2H7zm-4 6h14v-2H3v2zm0-8h14v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/>',
    format_align_right: '<path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>',
    format_align_justify: '<path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/>',
    format_indent_decrease: '<path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>',
    format_indent_increase: '<path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>',
    format_list_bulleted: '<path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12.17c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>',
    format_list_numbered: '<path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>',
    link: '<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>',
    image: '<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>',
    table_chart: '<path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z"/>',
    format_clear: '<path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"/>',
    insert_page_break: '<path d="M6 4c-1.1 0-2 .9-2 2v5.5h16V6c0-1.1-.9-2-2-2H6zm0 16c-1.1 0-2-.9-2-2v-5.5h16V20c0 1.1-.9 2 2 2H6z"/>',
    sort_by_alpha: '<path d="M12.9 19.43l4.98-4.98-1.41-1.41-2.57 2.57V3h-2v12.59l-2.58-2.57-1.41 1.41 5 4.99zM7 6.47v1.51H2.57L6.02 12H2v1.5h6V12L4.55 7.98H7zM7 13v1.5H2v-1.5h5zm0 3.5v1.5H2v-1.5h5z"/>',
    print: '<path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-2h8zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z"/><circle cx="18" cy="11.5" r="1"/>',
    arrow_drop_down: '<path d="M7 10l5 5 5-5z"/>',
    format_size: '<path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>',
    font_download: '<path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"/>',
    format_line_spacing: '<path d="M6 7h2.5L5 3.5 1.5 7H4v10H1.5L5 20.5 8.5 17H6V7zm4-2v2h12V5H10zm0 14h12v-2H10v2zm0-6h12v-2H10v2z"/>',
    subject: '<path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>',
    page_size: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
    orientation: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-6h3v6zm6 0h-3v-6h3v6z"/>',
    margins: '<path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM11 7h2v2h-2zM7 7h2v2H7zm8 0h2v2h-2zm-8 4h2v2H7zm8 0h2v2h-2zm-4 4h2v2h-2zm-4 0h2v2H7zm8 0h2v2h-2z"/>',
    content_paste: '<path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/>',
    // Table Icons
    // Table Icons (Customized for Toolbar)
    insert_col_left: '<path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm-2 2v16H5V4H2zm5 0v16h3V4H7zm5 0v16h3V4h-3z" opacity=".5"/><path d="M2 4h3v16H2z"/>',
    insert_col_right: '<path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm2 2v16h3V4H6zm5 0v16h3V4h-3zm5 0v16h3V4h-3z" opacity=".5"/><path d="M11 4h3v16h-3z"/>', // Highlight middle column
    delete_col: '<path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm2 2h3v16H6V4zm5 0h3v16h-3V4zm5 0h3v16h-3V4z" opacity=".5"/><path d="M12 8l4 4m0-4l-4 4" stroke="red" stroke-width="2"/>',
    
    insert_row_above: '<path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2h16v3H4V4zm0 5h16v3H4V9zm0 5h16v3H4v-3z" opacity=".5"/><path d="M4 4h16v3H4z"/>',
    insert_row_below: '<path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2h16v3H4V4zm0 5h16v3H4V9zm0 5h16v3H4v-3z" opacity=".5"/><path d="M4 9h16v3H4z"/>', // Highlight middle row
    delete_row: '<path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2h16v3H4V4zm0 5h16v3H4V9zm0 5h16v3H4v-3z" opacity=".5"/><path d="M8 10l4 4m0-4l-4 4" stroke="red" stroke-width="2"/>',

    merge_cells: '<path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h16v7H4v-7z"/>', // Merged bottom
    split_cells: '<path d="M4 4h7v16H4V4zm9 0h7v16h-7V4z"/>',

    table_props: '<g><path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/><path d="M18 15l-1.5-3L18 9l-3 1.5L12 9l1.5 3L12 15l3-1.5z" fill="#fbbc04"/></g>', // Table with Star
    cell_props: '<g><path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" opacity=".5"/><path d="M10 10h4v4h-4z"/><path d="M18 15l-1.5-3L18 9l-3 1.5L12 9l1.5 3L12 15l3-1.5z" fill="#fbbc04"/></g>', // Cell with Star
    caption: '<path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 2h10l-1-2h5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12z"/>', // Monitor style
    
    // Enter Icon for Paragraph Insertion
    insert_paragraph: '<path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7h-2z"/>',
    
    // Merge Icons
    merge_cell_up: '<path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm6 5v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" opacity=".5"/><path d="M8 8l4-4 4 4H8z"/>', // Arrow Up
    merge_cell_right: '<path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm6 5v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" opacity=".5"/><path d="M16 12l-4-4v8l4-4z"/>', // Arrow Right
    merge_cell_down: '<path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm6 5v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" opacity=".5"/><path d="M12 16l-4-4h8l-4 4z"/>', // Arrow Down
    merge_cell_left: '<path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm6 5v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" opacity=".5"/><path d="M8 12l4 4V8l-4 4z"/>', // Arrow Left
    
    // Split Icons
    split_cell_vertical: '<path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/><path d="M12 6v12" stroke="currentColor" stroke-width="2"/>', // Divider V
    split_cell_horizontal: '<path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/><path d="M6 12h12" stroke="currentColor" stroke-width="2"/>', // Divider H

    vertical_align_top: '<path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/>',
    vertical_align_center: '<path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"/>',
    vertical_align_bottom: '<path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/>',
    fullscreen: '<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>',
    fullscreen_exit: '<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>'
};

class SEditor {
    constructor(term, options = {}) {
        // Support selector string or direct element
        this.targetElement = typeof term === 'string' ? document.querySelector(term) : term;

        if (!this.targetElement) {
            console.error(`SEditor: Element not found.`);
            return;
        }

        // Check if already initialized
        if (this.targetElement._seditor) {
            return this.targetElement._seditor;
        }

        // Store instance
        this.targetElement._seditor = this;

        // Global dropdown closer
        if (!window._seditorClickBound) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.se-dropdown')) {
                    document.querySelectorAll('.se-dropdown-menu.show').forEach(m => m.classList.remove('show'));
                }
            });
            window._seditorClickBound = true;
        }

        // Default Options
        this.options = {
            mode: 'classic', // classic | document
            placeholder: '',
            toolbar: null, // If null, uses default
            ...options
        };

        this.init();
    }

    static create(term, options) {
        return new SEditor(term, options);
    }

    init() {
        // Create UI Structure
        this.container = document.createElement('div');
        this.container.className = 'se-main-container';

        this.toolbar = this.createToolbar();
        this.container.appendChild(this.toolbar);

        this.wrapper = document.createElement('div');
        this.wrapper.className = 'se-editor-wrapper';

        this.page = document.createElement('div');
        this.page.className = 'se-page-content';

        if (this.options.mode === 'document') {
            this.page.classList.add('se-document-mode');
        }

        this.page.contentEditable = true;

        // Create Source View Textarea (Hidden by default)
        this.sourceArea = document.createElement('textarea');
        this.sourceArea.className = 'se-source-view';
        this.sourceArea.style.display = 'none';

        // Create Source View Toolbar
        this.sourceToolbar = document.createElement('div');
        this.sourceToolbar.className = 'se-source-toolbar';
        this.sourceToolbar.style.display = 'none';
        
        // Copy Button
        const btnCopy = document.createElement('button');
        btnCopy.className = 'se-btn-source-action';
        btnCopy.title = 'Copy Minified HTML';
        btnCopy.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">${ICONS.content_paste || '<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>'}</svg>`;
        btnCopy.onclick = () => {
             this.sourceArea.select();
             const textToCopy = this.sourceArea.value;

             if (navigator.clipboard) {
                 navigator.clipboard.writeText(textToCopy).then(() => {
                     showFeedback();
                 }).catch(err => {
                     // Fallback
                     document.execCommand('copy');
                     showFeedback();
                 });
             } else {
                 document.execCommand('copy');
                 showFeedback();
             }

             function showFeedback() {
                 const originalHTML = btnCopy.innerHTML;
                 btnCopy.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`; // Checkmark
                 setTimeout(() => btnCopy.innerHTML = originalHTML, 1500);
             }
        };

        this.sourceToolbar.appendChild(btnCopy);

        // Load initial content
        if (this.targetElement.value) {
            this.page.innerHTML = this.targetElement.value;
        } else if (this.targetElement.innerHTML) {
            this.page.innerHTML = this.targetElement.innerHTML;
        } else {
            this.page.innerHTML = `<p>${this.options.placeholder}</p>`;
        }

        // History Init
        this.historyStack = [];
        this.historyIndex = -1;
        
        // Table Hover State
        this.tableHandles = [];
        this.currentHoverTable = null;
        this.currentSourceMode = 'formatted'; // Track state

        this.saveState(); // Save initial state

        // Sync Handling & History
        this.page.addEventListener('input', () => {
            // Debounce syncing and history saving for performance
            clearTimeout(this.saveTimeout);
            this.saveTimeout = setTimeout(() => {
                this.updateOriginal();
                this.saveState();
            }, 300); // Wait 300ms after typing stops
        });

        this.sourceArea.addEventListener('input', () => {
            // In source mode, sync directly if form submit happens
            if (this.isFormInput()) {
                this.targetElement.value = this.sourceArea.value;
            }
        });

        // Tab Handling & Shortcuts
        this.page.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                this.cmd('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
                // Create a history point manually for tab
                this.saveState(); 
            }
            
            // Undo / Redo Shortcuts
            if ((e.ctrlKey || e.metaKey) && !e.altKey) {
                if (e.key.toLowerCase() === 'z') {
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                } else if (e.key.toLowerCase() === 'y') {
                    e.preventDefault();
                    this.redo();
                }
            }
        });

        // Paste Sanitization (Strip bloated styles)
        this.page.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text');
            const html = (e.clipboardData || window.clipboardData).getData('text/html');

            if (html) {
                const clean = this.cleanHTML(html);
                this.cmd('insertHTML', clean);
                this.saveState(); // Save state immediately after paste
            } else {
                this.cmd('insertText', text);
                this.saveState(); // Save state immediately after paste
            }
        });

        // Update Toolbar State on interaction (Debounced)
        const updateToolbarDebounced = () => {
            clearTimeout(this.toolbarTimeout);
            this.toolbarTimeout = setTimeout(() => {
                this.updateToolbarState();
            }, 200);
        };

        this.page.addEventListener('keyup', (e) => {
            updateToolbarDebounced();
            
            // Slash Command (keep immediate for responsiveness?)
            // Slash command logic relies on selection, which is fast.
            // Let's keep slash command check immediate or it feels laggy.
            if (e.key === '/') {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();
                    // Basic check: only if collapsed (cursor)
                    if (range.collapsed) {
                        this.showPopup('menu', rect);
                    }
                }
            }
        });
        this.page.addEventListener('mouseup', () => updateToolbarDebounced());
        this.page.addEventListener('click', () => updateToolbarDebounced());

        this.wrapper.appendChild(this.page);
        this.wrapper.appendChild(this.sourceArea);
        this.wrapper.appendChild(this.sourceToolbar);
        this.container.appendChild(this.wrapper);
        
        // Replace logic
        if (this.isFormInput()) {
            this.targetElement.style.display = 'none';
            this.targetElement.parentNode.insertBefore(this.container, this.targetElement.nextSibling);
        } else {
            this.targetElement.innerHTML = '';
            this.targetElement.appendChild(this.container);
        }

        this.createPopup();  
    }

    isFormInput() {
        return this.targetElement.tagName === 'TEXTAREA' || this.targetElement.tagName === 'INPUT';
    }

    updateOriginal() {
        if (this.isFormInput()) {
            this.targetElement.value = this.cleanHTML(this.page.innerHTML);
        }
    }

    // History Manager
    saveState() {
        // If we are in the middle of the stack (undone some moves), discard the future
        if (this.historyIndex < this.historyStack.length - 1) {
            this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
        }

        const state = {
            html: this.page.innerHTML,
            classes: this.page.className,
            style: this.page.getAttribute('style') || ''
        };

        this.historyStack.push(state);
        this.historyIndex++;

        // Optional: Limit stack size (e.g., 50)
        if (this.historyStack.length > 50) {
            this.historyStack.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreState(this.historyStack[this.historyIndex]);
        }
    }

    redo() {
        if (this.historyIndex < this.historyStack.length - 1) {
            this.historyIndex++;
            this.restoreState(this.historyStack[this.historyIndex]);
        }
    }

    restoreState(state) {
        this.page.innerHTML = state.html;
        this.page.className = state.classes;
        if (state.style) {
            this.page.setAttribute('style', state.style);
        } else {
            this.page.removeAttribute('style');
        }
        this.updateOriginal();
    }


    getDefaultToolbar() {
        return [
            {
                type: 'group',
                items: [
                    { icon: 'code', action: () => this.toggleSource(), title: 'View Source', id: 'se-btn-source' },
                    { icon: 'content_paste', action: () => this.pasteContent(), title: 'Paste' },
                    { icon: 'print', action: () => this.printEditor(), title: 'Print' },
                    { icon: 'undo', action: () => this.undo(), title: 'Undo (Ctrl+Z)' },
                    { icon: 'redo', action: () => this.redo(), title: 'Redo (Ctrl+Y)' },
                    { icon: 'fullscreen', action: () => this.toggleFullScreen(), title: 'Enter fullscreen mode' }   
                ]
            },
            {
                type: 'group',
                items: [
                    { type: 'select', cmd: 'formatBlock', title: 'Format', options: ['p', 'h1', 'h2', 'h3', 'blockquote', 'pre'], labels: ['Normal', 'Heading 1', 'Heading 2', 'Heading 3', 'Quote', 'Code'] },
                    {
                        type: 'select',
                        cmd: 'fontName',
                        title: 'Font Family',
                        options: [
                            'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Lucida Sans Unicode', 'Palatino Linotype', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'sans-serif', 'serif', 'monospace'
                        ]
                    },
                    { type: 'select', cmd: 'fontSize', title: 'Font Size', options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 72], customHandler: true }
                ]
            },
            {
                type: 'group',
                items: [
                    { icon: 'format_bold', cmd: 'bold', title: 'Bold' },
                    { icon: 'format_italic', cmd: 'italic', title: 'Italic' },
                    { icon: 'format_underlined', cmd: 'underline', title: 'Underline' },
                    { icon: 'strikethrough_s', cmd: 'strikeThrough', title: 'Strikethrough' },
                    { icon: 'subscript', cmd: 'subscript', title: 'Subscript' },
                    { icon: 'superscript', cmd: 'superscript', title: 'Superscript' },
                    { icon: 'format_clear', cmd: 'removeFormat', title: 'Clear Formatting' }
                ]
            },
            {
                type: 'group',
                items: [
                    { type: 'color', icon: 'format_color_text', cmd: 'foreColor', title: 'Text Color', color: 'red' },
                    { type: 'color', icon: 'border_color', cmd: 'hiliteColor', title: 'Highlight Color', color: 'yellow' }
                ]
            },
            {
                type: 'group',
                items: [
                    { icon: 'format_align_left', cmd: 'justifyLeft', title: 'Align Left' },
                    { icon: 'format_align_center', cmd: 'justifyCenter', title: 'Align Center' },
                    { icon: 'format_align_right', cmd: 'justifyRight', title: 'Align Right' },
                    { icon: 'format_align_justify', cmd: 'justifyFull', title: 'Justify' },
                    { icon: 'format_indent_decrease', cmd: 'outdent', title: 'Decrease Indent' },
                    { icon: 'format_indent_increase', cmd: 'indent', title: 'Increase Indent' },
                    { type: 'select', cmd: 'lineHeight', title: 'Line Height', icon: 'format_line_spacing', options: ['0.8', '0.9', '1.0', '1.15', '1.5', '2.0', 'Custom'], customHandler: true }
                ]
            },
            {
                type: 'group',
                items: [
                    { icon: 'format_list_bulleted', cmd: 'insertUnorderedList', title: 'Bullet List' },
                    { icon: 'format_list_numbered', cmd: 'insertOrderedList', title: 'Num List' },
                    { icon: 'sort_by_alpha', action: () => this.sortSelection(), title: 'Sort' },
                    { icon: 'link', action: () => this.insertLink(), title: 'Link' },
                    { icon: 'image', action: () => this.insertImage(), title: 'Insert Image' },
                    { icon: 'table_chart', action: () => this.insertTable(), title: 'Table' },
                    { icon: 'insert_page_break', action: () => this.insertPageBreak(), title: 'Page Break' }
                ]
            },
            {
                type: 'group',
                items: [
                    { type: 'select', cmd: 'pageSize', title: 'Page Size', icon: 'page_size', options: ['A4', 'A5', 'Letter', 'Legal', 'Custom'], customHandler: true },
                    { type: 'select', cmd: 'orientation', title: 'Orientation', icon: 'orientation', options: ['Portrait', 'Landscape'], customHandler: true },
                    { type: 'select', cmd: 'margins', title: 'Margins', icon: 'margins', options: ['Normal', 'Narrow', 'Wide', 'Custom'], customHandler: true }
                ]
            }
        ];
    }

    createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'se-toolbar-container';

        // Use custom toolbar if provided, otherwise default
        const toolParams = this.options.toolbar || this.getDefaultToolbar();

        toolParams.forEach(group => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'se-toolbar-group';

            group.items.forEach(tool => {
                if (tool.type === 'select') {
                    // Create Custom Dropdown
                    const dropdown = document.createElement('div');
                    dropdown.className = 'se-dropdown';

                    const toggle = document.createElement('div');
                    toggle.className = 'se-btn-tool se-dropdown-toggle';
                    toggle.title = tool.title || '';

                    // Icon + Arrow OR Text + Arrow
                    let content = '';
                    if (tool.icon) {
                        const iconSvg = ICONS[tool.icon] || '';
                        content = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">${iconSvg}</svg>`;
                    } else {
                        // Text Label - Default to first option or title
                        let defaultLabel = tool.title;

                        // Specific defaults for cleaner look
                        if (tool.cmd === 'fontName') defaultLabel = 'Arial';
                        else if (tool.cmd === 'fontSize') defaultLabel = '12';
                        else if (tool.cmd === 'formatBlock') defaultLabel = 'Normal';
                        else if (tool.labels && tool.labels.length > 0) defaultLabel = tool.labels[0];
                        else if (tool.options && tool.options.length > 0) defaultLabel = tool.options[0];

                        content = `<span class="se-dropdown-label" style="margin-right:4px; font-size:13px; font-weight:500;">${defaultLabel}</span>`;
                        toggle.style.minWidth = '60px'; // Give some space
                        toggle.style.justifyContent = 'space-between';
                    }

                    let arrowSvg = ICONS['arrow_drop_down'];
                    toggle.innerHTML = `${content} <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${arrowSvg}</svg>`;

                    if (tool.cmd) toggle.dataset.cmd = tool.cmd; // Mark for updates

                    const menu = document.createElement('div');
                    menu.className = 'se-dropdown-menu';

                    const options = tool.options || [];
                    const labels = tool.labels || options;

                    options.forEach((opt, idx) => {
                        const item = document.createElement('a');
                        item.className = 'se-dropdown-item';
                        item.textContent = labels[idx];

                        // Font Preview Styling
                        if (tool.cmd === 'fontName') {
                            item.style.fontFamily = opt;
                            item.style.fontSize = '16px';
                        }



                        // Prevent focus loss on mousedown
                        item.onmousedown = (e) => {
                            e.preventDefault();
                        };

                        item.onclick = (e) => {
                            e.preventDefault();
                            this.restoreSelection();
                            if (tool.customHandler) {
                                if (tool.cmd === 'fontSize') this.setFontSize(opt);
                                else if (tool.cmd === 'lineHeight') this.setLineHeight(opt);
                                else if (tool.cmd === 'pageSize') this.setPageSize(opt);
                                else if (tool.cmd === 'orientation') this.setOrientation(opt);
                                else if (tool.cmd === 'margins') this.setMargins(opt);
                            } else {
                                this.cmd(tool.cmd, opt);
                            }

                            // Update label immediately
                            const labelSpan = toggle.querySelector('.se-dropdown-label');
                            if (labelSpan) labelSpan.textContent = labels[idx] || opt;


                            this.closeAllDropdowns();
                        };
                        menu.appendChild(item);
                    });

                    toggle.onmousedown = (e) => {
                        e.preventDefault(); // Prevent focus loss
                        this.saveSelection();
                    };

                    toggle.onclick = (e) => {
                        e.stopPropagation();
                        // Close others first
                        this.closeAllDropdowns(menu);
                        menu.classList.toggle('show');
                    };

                    dropdown.appendChild(toggle);
                    dropdown.appendChild(menu);
                    groupDiv.appendChild(dropdown);

                } else if (tool.type === 'color') {
                    const btn = this.createButton(tool.icon, tool.title, () => input.click());
                    // Update color indicator
                    const svg = btn.querySelector('svg');
                    svg.style.borderBottom = `3px solid ${tool.color === 'yellow' ? 'transparent' : tool.color}`;
                    if (tool.color === 'yellow') svg.style.background = 'yellow';

                    const input = document.createElement('input');
                    input.type = 'color';
                    input.style.display = 'none';
                    input.onchange = (e) => this.cmd(tool.cmd, e.target.value);

                    groupDiv.appendChild(btn);
                    groupDiv.appendChild(input);

                } else {
                    const action = tool.action ? tool.action : () => this.cmd(tool.cmd);
                    const btn = this.createButton(tool.icon, tool.title, action);
                    if (tool.id) btn.id = tool.id;
                    if (tool.cmd) btn.dataset.cmd = tool.cmd; // Store command for state checking
                    groupDiv.appendChild(btn);
                }
            });
            toolbar.appendChild(groupDiv);
        });

        return toolbar;
    }

    toggleSource() {
        if (this.sourceArea.style.display === 'none') {
            // Switch to Source
            const raw = this.page.innerHTML;
            const processed = this.processExportHTML(raw);
            this.sourceArea.value = this.minifyHTML(processed); // Always minified
            this.sourceArea.style.display = 'block';
            this.sourceToolbar.style.display = 'flex'; // Show toolbar
            this.page.style.display = 'none';

            const btn = this.container.querySelector('#se-btn-source');
            if (btn) btn.classList.add('se-active');

            this.setToolbarDisabled(true);
        } else {
            // Switch to Design
            this.page.innerHTML = this.sourceArea.value;
            this.updateOriginal();
            this.sourceArea.style.display = 'none';
            this.sourceToolbar.style.display = 'none'; // Hide toolbar
            this.page.style.display = 'block';

            const btn = this.container.querySelector('#se-btn-source');
            if (btn) btn.classList.remove('se-active');

            this.setToolbarDisabled(false);
        }
    }

    processExportHTML(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        
        // Ensure tables have inline styles for portability (CKEditor style)
        div.querySelectorAll('table').forEach(table => {
            if (!table.style.width) table.style.width = '100%';
            if (!table.style.borderCollapse) table.style.borderCollapse = 'collapse';
            
            // Apply caption style if present
            const caption = table.querySelector('caption');
            if (caption) {
                // Inline default caption styles
                if (!caption.style.fontWeight) caption.style.fontWeight = 'bold';
                if (!caption.style.padding) caption.style.padding = '10px';
                if (!caption.style.textAlign) caption.style.textAlign = 'center';
                if (!caption.style.backgroundColor) caption.style.backgroundColor = '#f8f9fa';
                if (!caption.style.border) caption.style.border = '1px solid #ddd';
                if (!caption.style.borderRadius) caption.style.borderRadius = '4px';
                if (!caption.style.marginBottom) caption.style.marginBottom = '8px';
            }

            // Apply cell borders if missing
            table.querySelectorAll('td, th').forEach(cell => {
                if (!cell.style.border) cell.style.border = '1px solid #000';
                if (!cell.style.padding) cell.style.padding = '5px';
            });
        });
        
        return div.innerHTML;
    }

    formatHTML(html) {
        let formatted = '';
        let indent = 0;
        
        // Remove existing whitespace between tags to avoid double spacing
        html = html.replace(/>\s+</g, '><').trim();
        
        // Split by tags
        const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);
        
        tokens.forEach(token => {
            if (token.match(/^<\//)) {
                // Closing tag
                indent = Math.max(0, indent - 1);
                formatted += '\n' + '  '.repeat(indent) + token;
            } else if (token.match(/^<[^\/].*\/>$/) || token.match(/^<(br|img|hr|input|meta|link)/)) {
                // Self-closing or void tag (no indent change)
                formatted += '\n' + '  '.repeat(indent) + token;
            } else if (token.match(/^<[^\/]/)) {
                // Opening tag
                formatted += '\n' + '  '.repeat(indent) + token;
                indent++;
            } else {
                // Text content
                formatted += token.trim(); 
            }
        });
        
        return formatted.trim();
    }

    minifyHTML(html) {
        // Safer minification: only remove whitespace between tags
        // Avoid collapsing whitespace inside text nodes or attributes excessively
        return html.replace(/>\s+</g, '><').trim();
    }

    setToolbarDisabled(disabled) {
        // Disable buttons, inputs, selects AND custom dropdown toggles (.se-btn-tool)
        const tools = this.toolbar.querySelectorAll('button, select, input, .se-btn-tool, .se-dropdown');
        tools.forEach(tool => {
            // Skip the source button itself
            if (tool.id === 'se-btn-source' || tool.closest('#se-btn-source')) return;

            if (disabled) {
                // For form elements
                if (tool.tagName === 'BUTTON' || tool.tagName === 'SELECT' || tool.tagName === 'INPUT') {
                    tool.disabled = true;
                }
                // For all elements (including custom divs)
                tool.style.opacity = '0.5';
                tool.style.pointerEvents = 'none';
            } else {
                // Enable
                if (tool.tagName === 'BUTTON' || tool.tagName === 'SELECT' || tool.tagName === 'INPUT') {
                    tool.disabled = false;
                }
                tool.style.opacity = '1';
                tool.style.pointerEvents = ''; // Restore default
            }
        });
    }

    createButton(icon, title, onClick) {
        const btn = document.createElement('button');
        btn.className = 'se-btn-tool';
        btn.title = title || '';

        // Use SVG from ICONS map
        const svgContent = ICONS[icon] || '';
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">${svgContent}</svg>`;

        btn.onclick = (e) => {
            e.preventDefault();
            onClick(e);
        };
        // Prevent focus loss when clicking tool
        btn.onmousedown = (e) => e.preventDefault();
        return btn;
    }

    cmd(command, value = null) {
        // Special handling for color commands to ensure robust sequential application
        if (command === 'foreColor' || command === 'hiliteColor') {
            const sel = window.getSelection();
            // If no selection or collapsed (and we have a saved one), try to restore
            if ((!sel.rangeCount || sel.isCollapsed) && this.savedSelection) {
                this.restoreSelection();
            }
        }

        document.execCommand(command, false, value);
        this.page.focus();
        this.updateToolbarState(); // Update state immediately after command
    }

    updateToolbarState() {
        if (!this.toolbar) return;

        const tools = this.toolbar.querySelectorAll('.se-btn-tool');
        tools.forEach(btn => {
            const cmd = btn.dataset.cmd;
            if (cmd && document.queryCommandState) {
                try {
                    const state = document.queryCommandState(cmd);
                    if (state) {
                        btn.classList.add('se-active');
                    } else {
                        btn.classList.remove('se-active');
                    }
                } catch (e) {
                    // Ignore unsupported commands
                }
            }
        });
    }

    setFontSize(size) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            document.execCommand('fontSize', false, '7');
            const fontElements = this.page.getElementsByTagName("font");
            for (let i = 0; i < fontElements.length; i++) {
                if (fontElements[i].size === "7") {
                    fontElements[i].removeAttribute("size");
                    fontElements[i].style.fontSize = size + "pt";
                }
            }
        }
        this.updateOriginal();
    }


    setLineHeight(value, specificRange = null) {
        let finalValue = value;
        if (value === 'Custom') {
            this.saveSelection();
            const rect = this.getSmartRect();
            this.showPopup('lineHeight', rect, { value: '1.5' }, (result) => {
                if (result.value) {
                    this.restoreSelection();
                    this.setLineHeight(result.value, this.savedSelection);
                }
            });
            return;
        }

        let range;
        if (specificRange) {
            range = specificRange;
        } else {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
            }
        }

        if (range) {
            // Use 'formatBlock' on root text if necessary
            let ancestor = range.commonAncestorContainer;
            if (ancestor.nodeType === 3) ancestor = ancestor.parentElement; // Text node -> Element

            // Check if we are inside a block
            const blockTags = ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BLOCKQUOTE', 'PRE'];
            let currentBlock = ancestor;
            while (currentBlock && currentBlock !== this.page && !blockTags.includes(currentBlock.tagName)) {
                currentBlock = currentBlock.parentElement;
            }

            if (currentBlock && currentBlock !== this.page) {
                // Apply to single containing block
                currentBlock.style.lineHeight = finalValue;
            } else {
                // Selection spans multiple blocks OR is raw text
                // Attempt to wrap raw text first
                if (ancestor === this.page) {
                    document.execCommand('formatBlock', false, 'p');
                    // Refresh range as formatBlock might have moved nodes
                    const sel = window.getSelection();
                    if (sel.rangeCount > 0) range = sel.getRangeAt(0);
                }

                // Now iterate all blocks in selection
                const blocks = this.page.querySelectorAll(blockTags.join(','));
                blocks.forEach(block => {
                    // Check if block is part of selection
                    if (range.intersectsNode(block)) {
                        block.style.lineHeight = finalValue;
                    }
                });
            }
        }
        this.updateOriginal();
    }

    setPageSize(size, specificRange = null) {
        // Remove existing size classes
        Array.from(this.page.classList).forEach(cls => {
            if (cls.startsWith('se-page-size-')) this.page.classList.remove(cls);
        });
        this.page.style.width = '';
        this.page.style.minHeight = '';

        if (size === 'Custom') {
            this.saveSelection();
            const rect = this.getSmartRect();
            this.showPopup('pageSize', rect, { width: '210mm', height: '297mm' }, (result) => {
                if (result.width && result.height) {
                    this.restoreSelection();
                    // Although unused logic-wise, passing it keeps consistency
                    this.setPageSize(result.width, this.savedSelection);
                    // Manual apply here for now since setPageSize logic doesn't use the arg yet, 
                    // but calling it recursively handles the style application in the ELSE block or below.
                    // Wait, recursive call? 
                    // If I call setPageSize('210mm', range), it goes to else block.
                    // But in else block: this.page.classList.add(...)
                    // Wait, Custom logic manually sets style:
                    // this.page.style.width = result.width;
                    // this.page.style.minHeight = result.height;
                    // this.saveState();

                    // So if I call setPageSize recursively with a specific size string (e.g. 'Custom' -> no, result is width/height? No result is object).
                    // Wait, setPageSize takes 'size' string (A4, Letter, Custom).
                    // The popup returns specific width/height.
                    // So I CANNOT call setPageSize recursively with the result because setPageSize expects a preset name or 'Custom'.
                    // Unless I change setPageSize logic to accept direct dimensions? 
                    // The current implementation deals with PRESETS or CUSTOM.
                    // If Custom, it opens popup.
                    // The actual application of custom size happens INSIDE the callback:
                    // this.page.style.width = result.width; ...

                    // So I DON'T need to call setPageSize recursively here.
                    // I just need to ensure restoreSelection is called.
                    // AND since 'size' is 'Custom', we are IN the Custom block.
                    // Only setLineHeight needed recursive call because it RE-USED the logic.
                    // setPageSize has specific logic for custom inside the callback.

                    // So ignore recursive call for setPageSize. Just signature update.
                }
            });
        } else {
            this.page.classList.add(`se-page-size-${size.toLowerCase()}`);
        }
    }

    setOrientation(orientation) {
        // Remove existing orientation classes
        Array.from(this.page.classList).forEach(cls => {
            if (cls.startsWith('se-page-orientation-')) this.page.classList.remove(cls);
        });

        if (orientation === 'Landscape') {
            this.page.classList.add('se-page-orientation-landscape');
        }
        // Portrait is default
        this.saveState();
    }

    setMargins(marginType, specificRange = null) {
        // Remove existing margin classes
        Array.from(this.page.classList).forEach(cls => {
            if (cls.startsWith('se-page-margins-')) this.page.classList.remove(cls);
        });
        this.page.style.padding = '';

        if (marginType === 'Custom') {
            this.saveSelection();
            const rect = this.getSmartRect();
            this.showPopup('margins', rect, { value: '25mm' }, (result) => {
                if (result.value) {
                    this.restoreSelection();
                    this.page.style.padding = result.value;
                    this.saveState();
                }
            });
        } else {
            this.page.classList.add(`se-page-margins-${marginType.toLowerCase()}`);
        }
    }

    insertLink() {
        this.saveSelection();
        const selection = window.getSelection();
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        // Fallback rect if no range (e.g. lost focus)
        const rect = this.getSmartRect();

        let data = { url: '', text: selection.toString() };

        let anchor = this.currentLink || this.getSelectionAnchor();
        if (anchor) {
            data.url = anchor.getAttribute('href');
            data.text = anchor.innerText;
            data.target = anchor.getAttribute('target'); // Fix: Read target attribute
            this.currentLink = anchor;
        } else {
            this.currentLink = null;
        }

        this.showPopup('link', rect, data, (result) => {
            this.restoreSelection();
            const targetAttr = result.target ? ` target="${result.target}"` : '';

            if (this.currentLink) {
                this.currentLink.href = result.url;
                this.currentLink.innerText = result.text;
                if (result.target) this.currentLink.target = result.target;
                else this.currentLink.removeAttribute('target');
            } else {
                if (result.text && result.text !== window.getSelection().toString()) {
                    this.cmd('insertHTML', `<a href="${result.url}"${targetAttr}>${result.text}</a>`);
                } else {
                    this.cmd('createLink', result.url);
                    // Apply target to the newly created link
                    if (result.target) {
                        const selection = window.getSelection();
                        if (selection.rangeCount > 0) {
                            const anchor = selection.getRangeAt(0).startContainer.parentNode;
                            if (anchor && anchor.tagName === 'A') {
                                anchor.target = result.target;
                            }
                        }
                    }
                }
            }
        });
    }

    getSelectionAnchor() {
        const sel = window.getSelection();
        if (!sel.rangeCount) return null;
        let node = sel.anchorNode;
        while (node && node !== this.page) {
            if (node.tagName === 'A') return node;
            node = node.parentNode;
        }
        return null;
    }

    createPopup() {
        this.popup = document.createElement('div');
        this.popup.className = 'se-popup';
        document.body.appendChild(this.popup);

        // Global close
        document.addEventListener('mousedown', (e) => {
            if (this.popup.classList.contains('visible') && !this.popup.contains(e.target) && !e.target.closest('.se-btn-tool')) {
                this.closePopup();
            }
        });

        // Context Menu for Links/Images/Tables
        this.page.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            const img = e.target.closest('img');
            const cell = e.target.closest('td, th');

            if (anchor && this.page.contains(anchor)) {
                e.preventDefault();
                this.currentLink = anchor;
                this.showPopup('link-actions', anchor.getBoundingClientRect(), { url: anchor.href });
            } else if (img && this.page.contains(img)) {
                this.currentImage = img;
                this.showPopup('image-actions', img.getBoundingClientRect());
            } else if ((cell && this.page.contains(cell)) || (e.target.closest('table') && e.target.closest('table').classList.contains('se-table-hover'))) {
                const table = cell ? cell.closest('table') : e.target.closest('table');
                if (table && this.page.contains(table)) {
                    this.currentTable = table;
                    // Try to find a cell if clicked on border/table-bg
                    if (cell) {
                        this.currentRow = cell.closest('tr');
                        this.currentCell = cell;
                    } else if (table.rows.length > 0 && table.rows[0].cells.length > 0) {
                         this.currentRow = table.rows[0];
                         this.currentCell = table.rows[0].cells[0];
                    }

                    // Trigger main menu
                    this.showPopup('table-main', (cell || table).getBoundingClientRect());
                }
            }
        });

        // Table Hover UI
        document.addEventListener('mousemove', (e) => {
            const table = e.target.closest('table');
            const handle = e.target.closest('.se-table-handle');

            // Check if hovering over a table within the editor page
            if (table && this.page.contains(table)) {
                this.showTableHandles(table);
            } else if (handle) {
                // Keep handles visible if hovering over them
                return; 
            } else {
                // Remove handles if not on a table and not on a handle
                if (this.currentHoverTable) {
                    // Slight delay or check distance? 
                    // For now, immediate removal if strictly outside
                    this.removeTableHandles();
                }
            }
        });
    }

    showTableHandles(table) {
        if (this.currentHoverTable === table) return;
        this.removeTableHandles();
        this.currentHoverTable = table;
        table.classList.add('se-table-hover');

        const rect = table.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        
        // Offset relative to container
        // We need handles to be in the container, absolute positioned
        // Coordinates:
        const top = rect.top - containerRect.top + this.container.scrollTop; // If container scrolls? 
        // Actually usually page scrolls inside editor-wrapper. 
        // Let's assume editor-wrapper is the offset parent for absolute handles?
        // No, Handles should probably be injected into the wrapper or body.
        // Let's inject into document.body to be safe and use fixed/absolute coordinates like popup.
        
        const createHandle = (cls, icon, title, onClick) => {
            const h = document.createElement('div');
            h.className = `se-table-handle ${cls}`;
            h.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${icon}</svg>`;
            h.title = title;
            h.onclick = (e) => {
                e.stopPropagation();
                onClick();
            }
            document.body.appendChild(h);
            return h;
        };

        const scrollTop = window.scrollY;
        const scrollLeft = window.scrollX;

        // Top Paragraph Handle
        const btnTop = createHandle('se-table-handle-top', ICONS.insert_paragraph || '+', 'Insert Paragraph Before', () => {
             const p = document.createElement('p');
             p.innerHTML = '<br>';
             table.parentNode.insertBefore(p, table);
             this.removeTableHandles();
        });
        btnTop.style.top = (rect.top + scrollTop - 12) + 'px';
        btnTop.style.left = (rect.left + scrollLeft + rect.width/2 - 12) + 'px';
        this.tableHandles.push(btnTop);

        // Bottom Paragraph Handle
        const btnBot = createHandle('se-table-handle-bottom', ICONS.insert_paragraph || '+', 'Insert Paragraph After', () => {
             const p = document.createElement('p');
             p.innerHTML = '<br>';
             if (table.nextSibling) {
                 table.parentNode.insertBefore(p, table.nextSibling);
             } else {
                 table.parentNode.appendChild(p);
             }
             this.removeTableHandles();
        });
        btnBot.style.top = (rect.bottom + scrollTop - 12) + 'px';
        btnBot.style.left = (rect.left + scrollLeft + rect.width/2 - 12) + 'px';
        this.tableHandles.push(btnBot);

        // Menu Handle (Top-Right or Top-Left? Req says "design top enter icon... hole table hover click to open")
        // "hole table hover click to open" might mean clicking the table itself opens menu (which we have on cell click).
        // Let's add a visual menu trigger at top-left.
        const btnMenu = createHandle('se-table-handle-menu', ICONS.menu || '≡', 'Table Menu', () => {
             this.currentTable = table;
             // Select first cell for context
             this.currentCell = table.rows[0].cells[0];
             this.currentRow = table.rows[0];
             this.showPopup('table-main', table.getBoundingClientRect());
        });
        btnMenu.style.top = (rect.top + scrollTop - 12) + 'px';
        btnMenu.style.left = (rect.left + scrollLeft - 12) + 'px';
        this.tableHandles.push(btnMenu);
    }

    removeTableHandles() {
        if (this.currentHoverTable) {
            this.currentHoverTable.classList.remove('se-table-hover');
            this.currentHoverTable = null;
        }
        if (this.tableHandles) {
            this.tableHandles.forEach(h => h.remove());
        }
        this.tableHandles = [];
    }

    showPopup(type, rect, data = {}, onSave = null) {
        let content = '';

        if (type === 'link') {
            content = `
                <input type="text" id="se-popup-text" placeholder="Text to display" value="${data.text || ''}">
                <input type="text" id="se-popup-url" placeholder="URL (https://...)" value="${data.url || ''}">
                <label style="display:flex; align-items:center; gap:5px; font-size:12px; margin-bottom:5px;">
                    <input type="checkbox" id="se-popup-target" ${data.target === '_blank' ? 'checked' : ''}> Open in new tab
                </label>
                <div class="se-popup-actions">
                    <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                    <button type="button" class="se-btn-primary" id="se-popup-save">Save</button>
                </div>`;
        } else if (type === 'image') {
            content = `
                <input type="text" id="se-popup-url" placeholder="Image URL (https://...)" value="${data.url || ''}">
                <div class="se-popup-actions">
                    <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                    <button type="button" class="se-btn-primary" id="se-popup-save">Insert</button>
                </div>`;
        } else if (type === 'table') {
            content = `
                <div style="padding:10px; width:220px;">
                    <div style="font-weight:600; margin-bottom:8px;">Insert Table</div>
                    <input type="number" id="se-popup-rows" placeholder="Rows" value="" min="1" style="width:100%; margin-bottom:5px;">
                    <input type="number" id="se-popup-cols" placeholder="Columns" value="" min="1" style="width:100%; margin-bottom:5px;">
                    <div class="se-popup-actions">
                        <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                        <button type="button" class="se-btn-primary" id="se-popup-save">Insert</button>
                    </div>
                </div>`;
        } else if (type === 'link-actions') {
            content = `
                <div class="se-popup-tools">
                    <a href="${data.url}" target="_blank" class="se-popup-preview">${data.url}</a>
                    <button type="button" class="se-btn-secondary" id="se-popup-edit">Edit</button>
                    <button type="button" class="se-btn-danger" id="se-popup-unlink">Unlink</button>
                </div>`;
        } else if (type === 'image-actions') {
            content = `
                <div class="se-popup-tools">
                    <button type="button" class="se-btn-secondary" id="se-popup-edit">Edit</button>
                    <button type="button" class="se-btn-danger" id="se-popup-delete">Delete</button>
                </div>`;
        } else if (type === 'table-main') {
            // Horizontal Toolbar Design
            // Using a compact flex container
            content = `
                <div class="se-popup-tools se-table-toolbar">
                    <!-- Column Group -->
                    <div class="se-toolbar-group-btn" title="Column Options" data-action="table-column">
                         <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.insert_col_right || ICONS.table_chart}</svg>
                         <span class="se-toolbar-arrow">▼</span>
                    </div>
                    
                    <!-- Row Group -->
                    <div class="se-toolbar-group-btn" title="Row Options" data-action="table-row">
                         <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.insert_row_below || ICONS.table_chart}</svg>
                         <span class="se-toolbar-arrow">▼</span>
                    </div>

                    <!-- Merge Group -->
                    <div class="se-toolbar-group-btn" title="Merge/Split" data-action="table-merge">
                         <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.merge_cells}</svg>
                         <span class="se-toolbar-arrow">▼</span>
                    </div>

                    <div class="se-toolbar-separator"></div>

                    <!-- Properties -->
                    <div class="se-toolbar-btn" title="Table Properties" data-action="table-props-detail">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.table_props}</svg>
                    </div>
                    <div class="se-toolbar-btn" title="Cell Properties" data-action="cell-props-detail">
                         <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.cell_props}</svg>
                    </div>

                    <div class="se-toolbar-separator"></div>

                    <!-- Caption -->
                    <div class="se-toolbar-btn" title="Toggle Caption" id="se-tbl-caption-toggle-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.caption}</svg>
                    </div>
                </div>`;
        } else if (type === 'table-column') {
             // Check if current column is header
             const isHeader = this.isCurrentColumnHeader();
             content = `
                <div class="se-popup-menu-list" style="width:200px;">
                    <div style="padding: 8px 12px; font-weight:600; font-size:13px; color:#333;">Column Options</div>
                    <div class="se-menu-divider"></div>

                    <!-- Header Toggle -->
                    <label class="se-toggle-wrapper" id="se-col-nav-header">
                        <span class="se-toggle-label">Header Column</span>
                        <div class="se-switch">
                            <input type="checkbox" ${isHeader ? 'checked' : ''}>
                            <span class="se-slider"></span>
                        </div>
                    </label>

                    <div class="se-menu-divider"></div>

                    <div class="se-menu-item" id="se-col-insert-left"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.insert_col_left || ''}</svg> Insert Column Left</div>
                    <div class="se-menu-item" id="se-col-insert-right"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.insert_col_right || ''}</svg> Insert Column Right</div>
                    <div class="se-menu-item" id="se-col-delete"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.delete_col || ''}</svg> Delete Column</div>
                    <div class="se-menu-item" id="se-col-select"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.dataset_linked || ''}</svg> Select Column</div>
                </div>`;
        } else if (type === 'table-row') {
             // Check if current row is header
             const isHeader = this.isCurrentRowHeader();
             content = `
                <div class="se-popup-menu-list" style="width:200px;">
                    <div style="padding: 8px 12px; font-weight:600; font-size:13px; color:#333;">Row Options</div>
                    <div class="se-menu-divider"></div>

                    <!-- Header Toggle -->
                    <label class="se-toggle-wrapper" id="se-row-nav-header">
                        <span class="se-toggle-label">Header Row</span>
                        <div class="se-switch">
                            <input type="checkbox" ${isHeader ? 'checked' : ''}>
                            <span class="se-slider"></span>
                        </div>
                    </label>

                    <div class="se-menu-divider"></div>

                    <div class="se-menu-item" id="se-row-insert-above"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.insert_row_above || ''}</svg> Insert Row Above</div>
                    <div class="se-menu-item" id="se-row-insert-below"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.insert_row_below || ''}</svg> Insert Row Below</div>
                    <div class="se-menu-item" id="se-row-delete"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.delete_row || ''}</svg> Delete Row</div>
                    <div class="se-menu-item" id="se-row-select"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.dataset_linked || ''}</svg> Select Row</div>
                </div>`;
        } else if (type === 'table-merge') {
             content = `
                <div class="se-popup-menu-list" style="width:200px;">
                    <div style="padding: 8px 12px; font-weight:600; font-size:13px; color:#333;">Merge/Split</div>
                    <div class="se-menu-divider"></div>
                    <div class="se-menu-item" id="se-merge-up"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.merge_cell_up}</svg> Merge Cell Up</div>
                    <div class="se-menu-item" id="se-merge-right"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.merge_cell_right}</svg> Merge Cell Right</div>
                    <div class="se-menu-item" id="se-merge-down"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.merge_cell_down}</svg> Merge Cell Down</div>
                    <div class="se-menu-item" id="se-merge-left"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.merge_cell_left}</svg> Merge Cell Left</div>
                    <div class="se-menu-divider"></div>
                    <div class="se-menu-item" id="se-split-vert"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.split_cell_vertical}</svg> Split Cell Vertically</div>
                    <div class="se-menu-item" id="se-split-horiz"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">${ICONS.split_cell_horizontal}</svg> Split Cell Horizontally</div>
                </div>`;
        } else if (type === 'table-props-detail') {
             // Dimensions, Border, Background, Align
             content = `
                <div style="padding:10px; width:240px;">
                    <div style="font-weight:600; margin-bottom:8px;">Table Properties</div>
                    
                    <div class="se-props-grid">
                        <div>
                            <span class="se-props-label">Border Style</span>
                            <select id="se-tbl-border-style" style="width:100%;">
                                <option value="solid" ${data.borderStyle === 'solid' ? 'selected' : ''}>Solid</option>
                                <option value="dashed" ${data.borderStyle === 'dashed' ? 'selected' : ''}>Dashed</option>
                                <option value="dotted" ${data.borderStyle === 'dotted' ? 'selected' : ''}>Dotted</option>
                                <option value="double" ${data.borderStyle === 'double' ? 'selected' : ''}>Double</option>
                                <option value="groove" ${data.borderStyle === 'groove' ? 'selected' : ''}>Groove</option>
                                <option value="ridge" ${data.borderStyle === 'ridge' ? 'selected' : ''}>Ridge</option>
                                <option value="inset" ${data.borderStyle === 'inset' ? 'selected' : ''}>Inset</option>
                                <option value="outset" ${data.borderStyle === 'outset' ? 'selected' : ''}>Outset</option>
                                <option value="hidden" ${data.borderStyle === 'hidden' ? 'selected' : ''}>Hidden</option>
                                <option value="none" ${data.borderStyle === 'none' ? 'selected' : ''}>None</option>
                            </select>
                        </div>
                        <div>
                            <span class="se-props-label">Width (px)</span>
                            <input type="number" id="se-tbl-border-width" value="${data.borderWidth || 1}" style="width:100%;">
                        </div>
                        <div class="se-props-row">
                             <span class="se-props-label">Border Color</span>
                             <div style="display:flex; gap:5px;">
                                 <input type="color" id="se-tbl-border-color" value="${data.borderColor || '#000000'}" class="se-color-input">
                             </div>
                        </div>
                        <div class="se-props-row">
                             <span class="se-props-label">Background</span>
                             <input type="color" id="se-tbl-bg-color" value="${data.backgroundColor || '#ffffff'}" class="se-color-input">
                        </div>
                        <div>
                             <span class="se-props-label">Width</span>
                             <input type="text" id="se-tbl-width" value="${data.width || ''}" placeholder="100%">
                        </div>
                        <div>
                             <span class="se-props-label">Height</span>
                             <input type="text" id="se-tbl-height" value="${data.height || ''}" placeholder="auto">
                        </div>
                        <div class="se-props-row">
                             <span class="se-props-label">Alignment</span>
                             <div style="display:flex; justify-content:space-between;">
                                 <button type="button" class="se-btn-tool" id="se-tbl-align-left"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.format_align_left}</svg></button>
                                 <button type="button" class="se-btn-tool" id="se-tbl-align-center"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.format_align_center}</svg></button>
                                 <button type="button" class="se-btn-tool" id="se-tbl-align-right"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.format_align_right}</svg></button>
                             </div>
                        </div>
                    </div>
                    <div class="se-popup-actions">
                         <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                         <button type="button" class="se-btn-primary" id="se-popup-save">Save</button>
                    </div>
                </div>`;
        } else if (type === 'cell-props-detail') {
             content = `
                <div style="padding:10px; width:240px;">
                    <div style="font-weight:600; margin-bottom:8px;">Cell Properties</div>
                    
                    <div class="se-props-grid">
                         <div class="se-props-row">
                             <span class="se-props-label">Background</span>
                             <input type="color" id="se-cell-bg-color" value="#ffffff" class="se-color-input">
                        </div>
                        <div>
                             <span class="se-props-label">Width</span>
                             <input type="text" id="se-cell-width" value="${data.width || ''}">
                        </div>
                        <div>
                             <span class="se-props-label">Height</span>
                             <input type="text" id="se-cell-height" value="${data.height || ''}">
                        </div>
                        <div>
                             <span class="se-props-label">Padding</span>
                             <input type="text" id="se-cell-padding" value="${data.padding || ''}">
                        </div>
                        <div class="se-props-row">
                             <span class="se-props-label">Text Align</span>
                             <div style="display:flex; gap:2px;">
                                 <button type="button" class="se-btn-tool" id="se-cell-align-left"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.format_align_left}</svg></button>
                                 <button type="button" class="se-btn-tool" id="se-cell-align-center"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.format_align_center}</svg></button>
                                 <button type="button" class="se-btn-tool" id="se-cell-align-right"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.format_align_right}</svg></button>
                                 <button type="button" class="se-btn-tool" id="se-cell-align-justify"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.format_align_justify}</svg></button>
                             </div>
                        </div>
                         <div class="se-props-row">
                             <span class="se-props-label">Vertical Align</span>
                             <div style="display:flex; gap:2px;">
                                 <button type="button" class="se-btn-tool" id="se-cell-valign-top"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.vertical_align_top}</svg></button>
                                 <button type="button" class="se-btn-tool" id="se-cell-valign-middle"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.vertical_align_center}</svg></button>
                                 <button type="button" class="se-btn-tool" id="se-cell-valign-bottom"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">${ICONS.vertical_align_bottom}</svg></button>
                             </div>
                        </div>
                    </div>
                    <div class="se-popup-actions">
                         <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                         <button type="button" class="se-btn-primary" id="se-popup-save">Save</button>
                    </div>
                </div>`;
        } else if (type === 'menu') {
            content = `
                <div class="se-popup-tools" style="flex-direction: column; align-items: stretch; gap: 5px;">
                    <button type="button" class="se-btn-secondary" id="se-menu-link">Link</button>
                    <button type="button" class="se-btn-secondary" id="se-menu-table">Table</button>
                </div>`;
        } else if (type === 'lineHeight') {
            content = `
                <input type="text" id="se-popup-text" placeholder="Line Height (e.g. 1.5, 30px)" value="">
                <div class="se-popup-actions">
                    <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                    <button type="button" class="se-btn-primary" id="se-popup-save">Apply</button>
                </div>`;
        } else if (type === 'pageSize') {
            content = `
                <div style="padding:10px; width:220px;">
                    <div style="font-weight:600; margin-bottom:8px;">Page Size</div>
                    <input type="text" id="se-popup-width" placeholder="Width (e.g. 210mm)" value="" style="width:100%; margin-bottom:5px;">
                    <input type="text" id="se-popup-height" placeholder="Height (e.g. 297mm)" value="" style="width:100%; margin-bottom:5px;">
                    <div class="se-popup-actions">
                        <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                        <button type="button" class="se-btn-primary" id="se-popup-save">Apply</button>
                    </div>
                </div>`;
        } else if (type === 'margins') {
            content = `
                <input type="text" id="se-popup-text" placeholder="Margins (e.g. 25mm, 1in)" value="">
                <div class="se-popup-actions">
                    <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                    <button type="button" class="se-btn-primary" id="se-popup-save">Apply</button>
                </div>`;
        } else if (type === 'paste') {
            content = `
                <div style="font-weight:600; margin-bottom:8px; font-size:14px; color:#333;">Paste Content</div>
                <textarea id="se-popup-textarea" placeholder="Paste your content here..." style="width: 100%; height: 80px; margin-bottom: 10px; padding: 6px; border: 1px solid #ccc; border-radius: 3px; resize: vertical; box-sizing: border-box; font-family: sans-serif; font-size: 13px; display: block;"></textarea>
                <div class="se-popup-actions">
                    <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                    <button type="button" class="se-btn-primary" id="se-popup-save">Paste</button>
                </div>`;
        }

        this.popup.innerHTML = content;
        this.popup.classList.add('visible');
        this.container.classList.add('se-popup-active');

        // Prevent clicking inside the popup from clearing editor selection
        this.popup.onmousedown = (e) => e.stopPropagation();

        // Position
        // Position
        const containerRect = this.container.getBoundingClientRect();

        // Determine if we should center (if rect is invalid/missing)
        const isRectValid = rect && rect.width > 0 && rect.height > 0;

        // Approximate dimensions for clamping/centering (since it's just became visible)
        // We could use this.popup.getBoundingClientRect() but it might need a tick.
        // Let's rely on CSS max-width/defaults or just clamp safely.
        const popupWidth = 280;
        const popupHeight = 200;

        let top, left;

        if (!isRectValid) {
            // Center in container
            top = (containerRect.height - popupHeight) / 2;
            left = (containerRect.width - popupWidth) / 2;
        } else {
            // Close to cursor (Absolute)
            // Add window scroll since we are in body
            top = rect.bottom + window.scrollY + 10;
            left = rect.left + window.scrollX;
        }

        // Clamp to viewport/window bounds
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        // Ensure it doesn't go off screen
        if (left + popupWidth > scrollX + viewportWidth) {
            left = scrollX + viewportWidth - popupWidth - 10;
        }
        if (left < scrollX + 10) left = scrollX + 10;

        // Ensure it doesn't go below screen (optional, maybe flip up?)
        // For now, simple clamping to document bottom might be tricky without document height.
        // Let's just trust valid coordinates + scroll.

        // Legacy clamp removed in favor of viewport logic above
        // if (top < 10) top = 10;
        // if (top + popupHeight > containerRect.height) top = containerRect.height - popupHeight - 10;

        this.popup.style.top = top + 'px';
        this.popup.style.left = left + 'px';

        // Bind Events
        const saveBtn = this.popup.querySelector('#se-popup-save');
        const cancelBtn = this.popup.querySelector('#se-popup-cancel');
        const editBtn = this.popup.querySelector('#se-popup-edit');
        const deleteBtn = this.popup.querySelector('#se-popup-unlink') || this.popup.querySelector('#se-popup-delete');

        // Menu Events
        const menuLink = this.popup.querySelector('#se-menu-link');
        const menuImage = this.popup.querySelector('#se-menu-image');
        const menuTable = this.popup.querySelector('#se-menu-table');

        if (menuLink) menuLink.onclick = () => {
            this.closePopup();
            // Remove the '/' character? 
            // Ideally we should select it and delete it, or just let insertLink handle selection
            // For now, let's just open the tool. User can backspace if needed or we can automate.
            // Automate: Select the '/' before cursor and delete it.
            this.deleteSlash();
            this.insertLink();
        };
        if (menuImage) menuImage.onclick = () => {
            this.closePopup();
            this.deleteSlash();
            this.insertImage();
        };
        if (menuTable) menuTable.onclick = () => {
            this.closePopup();
            this.deleteSlash();
            this.insertTable();
        };

        if (saveBtn) {
            saveBtn.onmousedown = (e) => e.preventDefault(); // Prevent focus loss
            saveBtn.onclick = () => {
                const result = {};
                if (this.popup.querySelector('#se-popup-url')) result.url = this.popup.querySelector('#se-popup-url').value;
                if (this.popup.querySelector('#se-popup-text')) result.text = this.popup.querySelector('#se-popup-text').value;
                if (this.popup.querySelector('#se-popup-textarea')) result.text = this.popup.querySelector('#se-popup-textarea').value;
                if (this.popup.querySelector('#se-popup-rows')) result.rows = this.popup.querySelector('#se-popup-rows').value;
                if (this.popup.querySelector('#se-popup-cols')) result.cols = this.popup.querySelector('#se-popup-cols').value;

                // Custom Inputs
                if (this.popup.querySelector('#se-popup-width')) result.width = this.popup.querySelector('#se-popup-width').value;
                if (this.popup.querySelector('#se-popup-height')) result.height = this.popup.querySelector('#se-popup-height').value;
                // General text input for simple prompts (Line Height, Margins)
                // Fix: Always populate result.value if text input exists, as some handlers expect value (lineHeight) and some text (link)
                if (this.popup.querySelector('#se-popup-text')) {
                    const val = this.popup.querySelector('#se-popup-text').value;
                    if (!result.text) result.text = val;
                    result.value = val;
                }

                // Checkbox for Target
                const targetCheck = this.popup.querySelector('#se-popup-target');
                if (targetCheck) {
                    result.target = targetCheck.checked ? '_blank' : '';
                }

                if (onSave) onSave(result);
                this.closePopup();
            };
        }

        if (cancelBtn) {
            cancelBtn.onmousedown = (e) => e.preventDefault(); // Prevent focus loss
            cancelBtn.onclick = () => this.closePopup();
        }

        if (deleteBtn) {
            deleteBtn.onmousedown = (e) => e.preventDefault();
            deleteBtn.onclick = () => {
                if (type === 'link-actions') {
                    // Fix: Ensure link is selected before unlinking
                    if (this.currentLink) {
                        const range = document.createRange();
                        range.selectNode(this.currentLink);
                        const sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                    this.cmd('unlink');
                }
                if (type === 'image-actions') {
                    if (this.currentImage) this.currentImage.remove();
                }
                this.closePopup();
            };
        }

        if (editBtn) {
            editBtn.onmousedown = (e) => e.preventDefault();
            editBtn.onclick = () => {
                const savedLink = this.currentLink;
                const savedImage = this.currentImage;
                this.closePopup();

                if (type === 'link-actions') {
                    this.currentLink = savedLink;
                    this.insertLink();
                }
                if (type === 'image-actions') {
                    this.currentImage = savedImage;
                    this.insertImage();
                }
            };
        }

        // Action Buttons (Menu buttons)
        [menuLink, menuImage, menuTable].forEach(btn => {
            if (btn) btn.onmousedown = (e) => e.preventDefault();
        });

        // Helper to convert color
        const rgbToHex = (col) => {
            if (!col) return '#000000';
            if (col.startsWith('#')) return col;
            const rgb = col.match(/\d+/g);
            if (!rgb) return '#000000';
            return '#' + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
        };

        // Initialize Menu Navigation
        // Unified Handler for Menu Actions (Toolbar & Sub-menus)
        const handleActionClick = (target) => {
             const action = target.getAttribute('data-action');
             if (!action) return;

             // Check if it's a direct command
             if (actions[action]) {
                 actions[action]();
                 this.closePopup();
                 return;
             }

             // Sub-menu navigation / Properties handling
             let data = {};
             if (action === 'table-props-detail' && this.currentTable) {
                 const s = this.currentTable.style;
                 data = {
                     width: s.width,
                     height: s.height,
                     backgroundColor: rgbToHex(s.backgroundColor || '#ffffff'),
                     borderStyle: s.borderStyle || 'solid',
                     borderWidth: parseInt(s.borderWidth) || 1,
                     borderColor: rgbToHex(s.borderColor || '#000000')
                 };
             } else if (action === 'cell-props-detail' && this.currentCell) {
                 const s = this.currentCell.style;
                 data = {
                     width: s.width,
                     height: s.height,
                     backgroundColor: rgbToHex(s.backgroundColor || '#ffffff'),
                     padding: s.padding,
                     textAlign: s.textAlign,
                     verticalAlign: s.verticalAlign
                 };
             }
             
             this.showPopup(action, rect, data);
        };

        // Bind to all interactive elements
        const menuItems = this.popup.querySelectorAll('.se-menu-item[data-action], .se-toolbar-group-btn[data-action], .se-toolbar-btn[data-action]');
        menuItems.forEach(item => {
            item.onclick = (e) => {
                e.stopPropagation();
                handleActionClick(item.closest('[data-action]')); 
            };
        });



        // Toggle Caption
        const captionToggle = this.popup.querySelector('#se-tbl-caption-toggle-btn');
        if (captionToggle) {
            captionToggle.onclick = () => {
                this.toggleCaption();
                this.showPopup('table-main', rect); // Refresh to update (On)/(Off) status
            };
        }

        // Sub-menu actions
        const actions = {
            'se-col-nav-header': () => this.toggleHeaderColumn(),
            'se-col-insert-left': () => this.insertColumn('left'),
            'se-col-insert-right': () => this.insertColumn('right'),
            'se-col-delete': () => this.deleteColumn(),
            'se-col-select': () => this.selectColumn(),
            'se-row-nav-header': () => this.toggleHeaderRow(),
            'se-row-insert-above': () => this.insertRow('above'),
            'se-row-insert-below': () => this.insertRow('below'),
            'se-row-delete': () => this.deleteRow(),
            'se-row-select': () => this.selectRow(),
            'se-merge-up': () => this.mergeCell('up'),
            'se-merge-right': () => this.mergeCell('right'),
            'se-merge-down': () => this.mergeCell('down'),
            'se-merge-left': () => this.mergeCell('left'),
            'se-split-vert': () => this.splitCell('vertical'),
            'se-split-horiz': () => this.splitCell('horizontal')
        };

        Object.keys(actions).forEach(id => {
            const el = this.popup.querySelector('#' + id);
            if (el) {
                // If it's a toggle/label, we want to listen to the change or click
                if (el.classList.contains('se-toggle-wrapper')) {
                    el.onchange = (e) => {
                         // e.target is the input
                         actions[id]();
                         // Delay closing to show animation?
                         setTimeout(() => this.closePopup(), 300);
                    };
                } else {
                    el.onclick = () => {
                        actions[id]();
                        this.closePopup(); 
                    }
                }
            }
        });

        // Table Properties Save
        if (type === 'table-props-detail') {
             const saveBtn = this.popup.querySelector('#se-popup-save');
             if (saveBtn) {
                 saveBtn.onclick = () => {
                     const width = this.popup.querySelector('#se-tbl-width').value;
                     const height = this.popup.querySelector('#se-tbl-height').value;
                     const bgColor = this.popup.querySelector('#se-tbl-bg-color').value;
                     
                     // Construct Border
                     const bStyle = this.popup.querySelector('#se-tbl-border-style').value;
                     let bWidth = this.popup.querySelector('#se-tbl-border-width').value;
                     const bColor = this.popup.querySelector('#se-tbl-border-color').value;
                     
                     // Enforce minimum width for complex styles to be visible
                     if (['double', 'groove', 'ridge', 'inset', 'outset'].includes(bStyle) && bWidth < 3) {
                         bWidth = 3; 
                     }

                     let border = '';
                     if (bStyle !== 'none' && bStyle !== 'hidden') {
                         border = `${bWidth}px ${bStyle} ${bColor}`;
                     } else {
                         border = 'none';
                     }

                     if (this.currentTable) {
                         this.currentTable.style.width = width;
                         this.currentTable.style.height = height;
                         this.currentTable.style.backgroundColor = bgColor;
                         this.currentTable.style.border = border;
                         this.currentTable.style.borderCollapse = 'collapse'; // Ensure clean borders
                         
                         // Apply border to all cells to match table style (user expectation)
                         const cells = this.currentTable.querySelectorAll('td, th');
                         cells.forEach(cell => {
                             cell.style.border = border;
                         });
                     }
                     this.closePopup();
                 };
             }
             
             // Alignment Buttons
             ['left', 'center', 'right'].forEach(align => {
                 const btn = this.popup.querySelector(`#se-tbl-align-${align}`);
                 if (btn) btn.onclick = () => {
                     if (this.currentTable) {
                         // Table alignment involves margin auto or float depending on doc mode.
                         // Standard: margin-left: auto, margin-right: auto for center.
                         if (align === 'center') {
                             this.currentTable.style.marginLeft = 'auto';
                             this.currentTable.style.marginRight = 'auto';
                         } else if (align === 'left') {
                             this.currentTable.style.marginLeft = '0';
                             this.currentTable.style.marginRight = 'auto';
                         } else if (align === 'right') {
                             this.currentTable.style.marginLeft = 'auto';
                             this.currentTable.style.marginRight = '0';
                         }
                     }
                 }
             });
        }

        // Cell Properties Save
        if (type === 'cell-props-detail') {
             const saveBtn = this.popup.querySelector('#se-popup-save');
             if (saveBtn) {
                 saveBtn.onclick = () => {
                     const width = this.popup.querySelector('#se-cell-width').value;
                     const height = this.popup.querySelector('#se-cell-height').value;
                     const bgColor = this.popup.querySelector('#se-cell-bg-color').value;
                     const padding = this.popup.querySelector('#se-cell-padding').value;

                     if (this.currentCell) {
                         this.currentCell.style.width = width;
                         this.currentCell.style.height = height;
                         this.currentCell.style.backgroundColor = bgColor;
                         this.currentCell.style.padding = padding;
                     }
                     this.closePopup();
                 };
             }

             // Text Align
             ['left', 'center', 'right', 'justify'].forEach(align => {
                 const btn = this.popup.querySelector(`#se-cell-align-${align}`);
                 if (btn) btn.onclick = () => {
                     if (this.currentCell) this.currentCell.style.textAlign = align;
                 }
             });

             // Vertical Align
             ['top', 'middle', 'bottom'].forEach(align => {
                 const btn = this.popup.querySelector(`#se-cell-valign-${align}`);
                 if (btn) btn.onclick = () => {
                     if (this.currentCell) this.currentCell.style.verticalAlign = align;
                 }
             });
        }

    }

    closePopup() {
        this.popup.classList.remove('visible');
        this.container.classList.remove('se-popup-active');
        this.currentLink = null;
        this.currentImage = null;

        // CRITICAL: Use setTimeout to allow click events to process before removing markers
        // This prevents the "wrong selection" bug when cancelling
        setTimeout(() => this.removeMarkers(), 10);
    }

    insertImage() {
        this.saveSelection();
        const selection = window.getSelection();
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        let rect;

        if (this.currentImage) {
            rect = this.currentImage.getBoundingClientRect();
        } else {
            rect = this.getSmartRect();
        }

        const data = { url: this.currentImage ? this.currentImage.src : '' };

        this.showPopup('image', rect, data, (result) => {
            if (result.url) {
                this.restoreSelection();
                if (this.currentImage) {
                    this.currentImage.src = result.url;
                } else {
                    this.cmd('insertImage', result.url);
                }
            }
        });
    }

    insertTable() {
        this.saveSelection();
        const selection = window.getSelection();
        const rect = this.getSmartRect();

        this.showPopup('table', rect, {}, (result) => {
            if (result.rows > 0 && result.cols > 0) {
                this.restoreSelection();
                let html = '<table style="width:100%; border-collapse: collapse; margin-bottom: 1em;"><tbody>';
                for (let i = 0; i < result.rows; i++) {
                    html += '<tr>';
                    for (let j = 0; j < result.cols; j++) {
                        html += '<td style="border: 1px solid #000; padding: 5px;">Cell</td>';
                    }
                    html += '</tr>';
                }
                html += '</tbody></table><p><br></p>';
                this.cmd('insertHTML', html);
            }
        });
    }

    insertPageBreak() {
        const html = '<hr class="se-page-break">';
        this.cmd('insertHTML', html);
    }

    toggleFullScreen() {
        this.container.classList.toggle('se-fullscreen');
        const isFull = this.container.classList.contains('se-fullscreen');
        
        const buttons = this.toolbar.querySelectorAll('.se-btn-tool');
        buttons.forEach(btn => {
             if (btn.title === 'Enter fullscreen mode' || btn.title === 'Exit fullscreen mode') {
                 if (isFull) {
                     btn.title = 'Exit fullscreen mode';
                     btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">${ICONS.fullscreen_exit || '<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>'}</svg>`;
                 } else {
                     btn.title = 'Enter fullscreen mode';
                     btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">${ICONS.fullscreen || '<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>'}</svg>`;
                 }
             }
        });
    }

    sortSelection() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        let listNode = range.commonAncestorContainer;

        while (listNode && listNode.tagName !== 'UL' && listNode.tagName !== 'OL' && listNode !== this.page) {
            listNode = listNode.parentElement;
        }

        if (listNode && (listNode.tagName === 'UL' || listNode.tagName === 'OL')) {
            const items = Array.from(listNode.querySelectorAll('li'));
            items.sort((a, b) => a.innerText.localeCompare(b.innerText));
            items.forEach(item => listNode.appendChild(item));
        } else {
            // Sort Block Elements (Paragraphs)
            // Attempt to find shared container
            let container = range.commonAncestorContainer;
            if (container.nodeType === 3) container = container.parentElement; // Text node -> Element

            if (container === this.page) {
                // Only sort if we can identify clear block children? 
                // For safety, let's just alert if not in a list for now, or maybe simply ignore to avoid destroying layout
                // Implementation for paragraph sorting:
                const blocks = Array.from(container.children).filter(el => {
                    return (el.tagName === 'P' || el.tagName === 'DIV') && selection.containsNode(el, true);
                });

                if (blocks.length > 1) {
                    blocks.sort((a, b) => a.innerText.localeCompare(b.innerText));
                    const fragment = document.createDocumentFragment();
                    blocks.forEach(b => fragment.appendChild(b)); // This moves them

                    // Re-insertion point? They might be scattered.
                    // Usually safer to assume contiguous selection.
                    // If not contiguous, this could reorder widely separated paragraphs.
                    // Let's stick to List Sorting primarily.
                }
            }
        }
    }

    printEditor() {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
            alert("Pop-up blocked! Please allow pop-ups for this site.");
            return;
        }

        // Get absolute path for CSS
        const linkEl = document.querySelector('link[href*="seditor.css"]');
        const cssHref = linkEl ? linkEl.href : '';

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Document</title>
                ${cssHref ? `<link rel="stylesheet" href="${cssHref}">` : ''}
                <style>
                    body { padding: 40px; font-family: sans-serif; }
                    .se-page-content { border: none !important; box-shadow: none !important; outline: none !important; }
                    
                    /* Override seditor.css print hiding */
                    @media print {
                        body * {
                            visibility: visible !important;
                        }
                        .se-page-content {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            margin: 0;
                            padding: 0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="${this.page.className}" style="${this.page.getAttribute('style') || ''}">
                    ${this.page.innerHTML}
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(() => {
                            window.print();
                            window.close();
                        }, 500);
                    }
                <\/script>
            </body>
            </html>
        `;
        printWindow.document.write(html);
        printWindow.document.close();
    }

    async pasteContent() {
        this.saveSelection(); // Save immediately before async ops
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                this.restoreSelection(); // Ensure focus/range is correct
                this.cmd('insertText', text);
            }
        } catch (err) {
            // Fallback for browsers that block clipboard access or if permission denied
            // Use custom popup instead of prompt
            const rect = this.getSmartRect();
            this.showPopup('paste', rect, {}, (result) => {
                if (result.text) {
                    this.restoreSelection();
                    this.cmd('insertText', result.text);
                }
            });
        }
    }

    // Helper for smart popup positioning
    getSmartRect() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let rect = range.getBoundingClientRect();

            // If rect is invalid (collapsed/caret), use temp element
            if (rect.width === 0 && rect.height === 0) {
                const span = document.createElement('span');
                span.innerText = '|';
                range.insertNode(span);
                rect = span.getBoundingClientRect();
                span.remove();

            }

            // Check if rect is valid
            if (rect.top !== 0 && rect.left !== 0) {
                return rect;
            }
        }
        // Fallback to toolbar or center
        return this.toolbar.getBoundingClientRect();
    }

    destroy() {
        if (this.popup && this.popup.parentNode) {
            this.popup.parentNode.removeChild(this.popup);
        }
        // Remove other listeners if needed (not tracked currently)
    }

    // Table Operations
    insertRow(where) {
        if (!this.currentRow) return;
        const table = this.currentTable;
        const rowIndex = this.currentRow.rowIndex;
        const newRow = table.insertRow(where === 'above' ? rowIndex : rowIndex + 1);
        
        // Match cell count of current row
        const cellsCount = this.currentRow.cells.length;
        for (let i = 0; i < cellsCount; i++) {
            const newCell = newRow.insertCell(i);
            newCell.innerHTML = '<br>';
            newCell.style.border = '1px solid black';
            newCell.style.padding = '8px';
        }
    }

    deleteRow() {
        if (!this.currentRow || !this.currentTable) return;
        this.currentTable.deleteRow(this.currentRow.rowIndex);
        this.closePopup();
    }

    insertColumn(where) {
        if (!this.currentCell || !this.currentTable) return;
        const cellIndex = this.currentCell.cellIndex;
        // Simple column insertion - iterate all rows
        // Note: usage of colspan/rowspan can complicate this. 
        // For basic tables this is fine. For complex ones, we'd need a matrix map.
        for (let i = 0; i < this.currentTable.rows.length; i++) {
            const row = this.currentTable.rows[i];
            const targetIndex = where === 'left' ? cellIndex : cellIndex + 1;
            // Guard against out of bounds (though insertCell handles -1 for end)
            const newCell = row.insertCell(targetIndex);
            newCell.innerHTML = '<br>';
            newCell.style.border = '1px solid black';
            newCell.style.padding = '8px';
        }
    }

    deleteColumn() {
        if (!this.currentCell || !this.currentTable) return;
        const cellIndex = this.currentCell.cellIndex;
        for (let i = 0; i < this.currentTable.rows.length; i++) {
            const row = this.currentTable.rows[i];
            if (row.cells.length > cellIndex) {
                row.deleteCell(cellIndex);
            }
        }
        this.closePopup();
    }

    // Enhanced Table Operations
    isCurrentRowHeader() {
        if (!this.currentRow || this.currentRow.cells.length === 0) return false;
        return this.currentRow.cells[0].tagName === 'TH';
    }

    isCurrentColumnHeader() {
        if (!this.currentCell) return false;
        return this.currentCell.tagName === 'TH';
    }

    toggleHeaderRow() {
        if (!this.currentRow) return;
        const replaceCell = (cell, type) => {
            const newCell = document.createElement(type);
            newCell.innerHTML = cell.innerHTML;
            // Copy attributes
            Array.from(cell.attributes).forEach(attr => newCell.setAttribute(attr.name, attr.value));
            cell.parentNode.replaceChild(newCell, cell);
        };
        
        const isHeader = this.currentRow.cells[0].tagName === 'TH';
        const newType = isHeader ? 'td' : 'th';
        
        Array.from(this.currentRow.cells).forEach(cell => replaceCell(cell, newType));
    }

    toggleHeaderColumn() {
        if (!this.currentCell) return;
        const cellIndex = this.currentCell.cellIndex;
        const replaceCell = (cell, type) => {
             const newCell = document.createElement(type);
             newCell.innerHTML = cell.innerHTML;
             Array.from(cell.attributes).forEach(attr => newCell.setAttribute(attr.name, attr.value));
             cell.parentNode.replaceChild(newCell, cell);
        };

        const isHeader = this.currentCell.tagName === 'TH';
        const newType = isHeader ? 'td' : 'th';

        for (let i = 0; i < this.currentTable.rows.length; i++) {
            const row = this.currentTable.rows[i];
            if (row.cells.length > cellIndex) {
                replaceCell(row.cells[cellIndex], newType);
            }
        }
    }

    selectRow() {
        if (!this.currentRow) return;
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(this.currentRow);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    selectColumn() {
        // Visual selection only for columns is hard with native selection APIs.
        // We can simulate effectively by selecting all cells, but standard selection is one range.
        // We will just highlight visually for now or select the current cell as fallback?
        // Let's select the whole table as a fallback or iterate cells if possible (Multi-range FF only).
        // For cross-browser, let's just highlight the current cell index column with a class?
        // But persistent selection is tricky without custom selection engine.
        // Let's just implement a "Select Table" instead if Column is too hard?
        // Or just select all text in the column cells (creating multiple ranges is supported in Firefox, partially in others).
        // Let's try selecting the first cell of the column.
        if (this.currentCell) {
             const range = document.createRange();
             range.selectNodeContents(this.currentTable); 
             // Ideally we want column, but let's just select table for now to avoid complexity of non-contiguous selection.
             // Or maybe we can implement a custom "selected" class?
             // Start simple: Select table.
             const selection = window.getSelection();
             selection.removeAllRanges();
             selection.addRange(range);
        }
    }

    mergeCell(direction) {
        if (!this.currentCell) return;
        const cell = this.currentCell;
        const row = this.currentRow;
        
        // Helper to get cell at exact coords
        const getGrid = (tbl) => {
            // Very basic grid mapper that doesn't account for complex existing spans fully correctly without 2D array
            // But sufficient for basic merges.
            // For robust verify, we access cells by row index.
            return tbl.rows;
        };

        if (direction === 'right') {
            const nextCell = cell.nextElementSibling;
            if (nextCell) {
                const colspanCurrent = parseInt(cell.getAttribute('colspan') || 1);
                const colspanNext = parseInt(nextCell.getAttribute('colspan') || 1);
                cell.setAttribute('colspan', colspanCurrent + colspanNext);
                cell.innerHTML += ' ' + nextCell.innerHTML;
                nextCell.remove();
            }
        } else if (direction === 'down') {
            const rowIndex = row.rowIndex;
            const table = this.currentTable;
            if (rowIndex + 1 < table.rows.length) {
                const nextRow = table.rows[rowIndex + 1];
                const cellIndex = cell.cellIndex;
                const cellBelow = nextRow.cells[cellIndex]; 
                
                if (cellBelow) {
                    const rowspanCurrent = parseInt(cell.getAttribute('rowspan') || 1);
                    const rowspanBelow = parseInt(cellBelow.getAttribute('rowspan') || 1);
                    cell.setAttribute('rowspan', rowspanCurrent + rowspanBelow);
                    cell.innerHTML += '<br>' + cellBelow.innerHTML;
                    cellBelow.remove();
                }
            }
        } else if (direction === 'left') {
             const prevCell = cell.previousElementSibling;
             if (prevCell) {
                 const colspanCurrent = parseInt(cell.getAttribute('colspan') || 1);
                 const colspanPrev = parseInt(prevCell.getAttribute('colspan') || 1);
                 prevCell.setAttribute('colspan', colspanCurrent + colspanPrev);
                 prevCell.innerHTML += ' ' + cell.innerHTML;
                 cell.remove();
                 this.currentCell = prevCell; // Update focus
             }
        } else if (direction === 'up') {
             const rowIndex = row.rowIndex;
             const table = this.currentTable;
             if (rowIndex > 0) {
                 const prevRow = table.rows[rowIndex - 1];
                 const cellIndex = cell.cellIndex;
                 const cellAbove = prevRow.cells[cellIndex]; 
                 
                 if (cellAbove) {
                     const rowspanCurrent = parseInt(cell.getAttribute('rowspan') || 1);
                     const rowspanAbove = parseInt(cellAbove.getAttribute('rowspan') || 1);
                     cellAbove.setAttribute('rowspan', rowspanCurrent + rowspanAbove);
                     cellAbove.innerHTML += '<br>' + cell.innerHTML;
                     cell.remove();
                     this.currentCell = cellAbove;
                     this.currentRow = prevRow;
                 }
             }
        }
    }

    splitCell(direction) {
        if (!this.currentCell) return;
        
        const colspan = parseInt(this.currentCell.getAttribute('colspan') || 1);
        const rowspan = parseInt(this.currentCell.getAttribute('rowspan') || 1);

        // Standard Split logic (Reset)
        // If direction is specific we could try to be smarter, but standard 'split' usually means "reset to 1x1".
        // The user menu has 'Split Vertically' and 'Split Horizontally', suggesting we might want to split a 1x1 cell?
        // If 1x1:
        // Split Vertically (Cols): Increase colspan? No, that merges.
        // Split 1x1 into 2 cells:
        // Horizontally (Row split): Add a row? No, insert a cell into current row?
        // Actually, splitting a 1x1 cell usually implies modifying the table structure (adding columns/rows globally) or just nested table?
        // Let's assume standard behavior:
        // If spanned, un-span.
        // If 1x1:
        //   Horizontal Split: turn <td>A</td> into <td>A</td><td><br></td>? This breaks grid unless we add col globally.
        //   Vertical Split: turn <td>A</td> into <tr><td>A</td></tr><tr><td>B</td></tr>? Breaks grid unless we add row globally.
        // For now, let's implement un-span for spanned cells, and NO-OP for 1x1 cells to avoid breaking table layout.
        
        if (colspan > 1) {
             for(let i=0; i < colspan - 1; i++) {
                 const newCell = this.currentRow.insertCell(this.currentCell.cellIndex + 1);
                 newCell.innerHTML = '<br>';
                 newCell.style.border = '1px solid black';
                 newCell.style.padding = '8px';
             }
             this.currentCell.removeAttribute('colspan');
        }
        
        if (rowspan > 1) {
             const startRow = this.currentRow.rowIndex;
             const colIdx = this.currentCell.cellIndex;
             for (let i = 1; i < rowspan; i++) {
                 const targetRow = this.currentTable.rows[startRow + i];
                 if (targetRow) {
                     const newCell = targetRow.insertCell(colIdx);
                     newCell.innerHTML = '<br>';
                     newCell.style.border = '1px solid black';
                     newCell.style.padding = '8px';
                 }
             }
             this.currentCell.removeAttribute('rowspan');
        }
    }

    toggleCaption() {
        if (!this.currentTable) return;
        let caption = this.currentTable.querySelector('caption');
        if (caption) {
            caption.remove();
        } else {
            caption = this.currentTable.createCaption();
            caption.className = 'se-table-caption';
            caption.innerText = 'Table Caption';
            
            // Focus and Select
            const range = document.createRange();
            range.selectNodeContents(caption);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            
            // this.closePopup(); // Optional: Close popup so they can type? 
            // The popup logic currently refreshes 'table-main' which might steal focus back or obscure?
            // "this.showPopup('table-main', rect)" is called in the click handler.
            // If we want to focus, we should probably NOT show the popup again or show it intelligently.
            // But the listener calls showPopup... logic issue.
            // We need to focus AFTER the popup refresh or prevent refresh?
            // Actually, if I toggle on, I want to type. The popup is for *table* tools.
            // Maybe we should prioritize the user typing.
            // I will return the caption element so the caller can focus it? 
            // Or just do it here. The caller in showPopup calls showPopup again.
            // That second showPopup might steal focus to the toolbar buttons? No, buttons are not auto-focused.
            // But if the popup is re-rendered, focus remains in editable area unless explicitly moved.
            // Let's try explicit focusing here.
        }
    }

    setTableProperties(data) {
        if (!this.currentTable) return;
        if (data.width) this.currentTable.style.width = data.width;
        if (data.border) {
            this.currentTable.style.border = data.border;
            // Also apply to cells if requested? Usually table border implies cell borders in simple mode
            // But let's keep it to wrapper for now or simple "1px solid black" toggles
        }
        if (data.borderCollapse) this.currentTable.style.borderCollapse = data.borderCollapse;
        if (data.backgroundColor) this.currentTable.style.backgroundColor = data.backgroundColor;
    }

    setCellProperties(data) {
        if (!this.currentCell) return;
        if (data.width) this.currentCell.style.width = data.width;
        if (data.height) this.currentCell.style.height = data.height;
        if (data.backgroundColor) this.currentCell.style.backgroundColor = data.backgroundColor;
        if (data.borderColor) this.currentCell.style.borderColor = data.borderColor;
        if (data.textAlign) this.currentCell.style.textAlign = data.textAlign;
        if (data.verticalAlign) this.currentCell.style.verticalAlign = data.verticalAlign;
    }

    getSelectionAnchor() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const startNode = range.startContainer;
            const startOffset = range.startOffset;

            if (startNode.nodeType === 3 && startOffset > 0) {
                const text = startNode.textContent;
                if (text[startOffset - 1] === '/') {
                    const newRange = document.createRange();
                    newRange.setStart(startNode, startOffset - 1);
                    newRange.setEnd(startNode, startOffset);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                    document.execCommand('delete');
                }
            }
        }
    }

    closeAllDropdowns(except = null) {
        document.querySelectorAll('.se-dropdown-menu.show').forEach(m => {
            if (m !== except) m.classList.remove('show');
        });
    }

    // Public API Helpers
    setValue(html) {
        this.page.innerHTML = html;
        this.updateOriginal();
    }


    getValue() {
        return this.page.innerHTML;
    }

    saveSelection() {
        const sel = window.getSelection();

        // GUARD: If markers or visual guide already exist, do not overwrite
        if (this.page.querySelector('#se-start-marker') || this.page.querySelector('#se-visual-guide') || this.page.querySelector('.se-visual-guide-part')) return;

        if (sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);

            if (this.page.contains(range.commonAncestorContainer)) {
                // Check if we need robust saving (cross-block or complex)
                if (this.isComplexSelection(range)) {
                    this.saveSelectionRobust(range);
                    return;
                }

                // Method A: Visual Wrapping (Best for UX, simple block)
                if (!range.collapsed) {
                    try {
                        const span = document.createElement('span');
                        span.id = 'se-visual-guide';
                        range.surroundContents(span);
                        this.savedSelection = range.cloneRange();
                        return; // Success! Visual guide active.
                    } catch (e) {
                        // Fallback to Method B
                        this.saveSelectionRobust(range);
                        return;
                    }
                }

                // Method C: Invisible Markers (Fallback)
                this.saveSelectionMarkers(range);
            }
        }
    }

    isComplexSelection(range) {
        if (range.collapsed) return false;
        // Check if common ancestor is the page itself (likely cross-block)
        if (range.commonAncestorContainer === this.page) return true;

        // Check if start/end are in different block elements
        const getBlock = (n) => {
            while (n && n !== this.page) {
                if (['P', 'DIV', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TD', 'TH', 'PRE', 'BLOCKQUOTE'].includes(n.nodeName)) return n;
                n = n.parentNode;
            }
            return this.page;
        };
        return getBlock(range.startContainer) !== getBlock(range.endContainer);
    }

    saveSelectionRobust(range) {
        // Method B: Robust Multi-Node Wrapping
        const treeWalker = document.createTreeWalker(
            range.commonAncestorContainer,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const nodes = [];
        let currentNode;
        while (currentNode = treeWalker.nextNode()) {
            nodes.push(currentNode);
        }

        if (nodes.length === 0) {
            this.saveSelectionMarkers(range);
            return;
        }

        let wrappedCount = 0;
        nodes.forEach(node => {
            const rangePart = document.createRange();
            rangePart.selectNodeContents(node);

            // Intersect with original range
            if (range.compareBoundaryPoints(Range.START_TO_START, rangePart) > 0) {
                rangePart.setStart(range.startContainer, range.startOffset);
            }
            if (range.compareBoundaryPoints(Range.END_TO_END, rangePart) < 0) {
                rangePart.setEnd(range.endContainer, range.endOffset);
            }

            if (!rangePart.collapsed) {
                const span = document.createElement('span');
                span.className = 'se-visual-guide-part';
                try {
                    rangePart.surroundContents(span);
                    wrappedCount++;
                } catch (e) {
                    // Ignore errors
                }
            }
        });

        if (wrappedCount > 0) {
            this.savedSelection = range.cloneRange();
        } else {
            this.saveSelectionMarkers(range);
        }
    }

    saveSelectionMarkers(range) {
        const startMarker = document.createElement('span');
        startMarker.id = 'se-start-marker';

        const endMarker = document.createElement('span');
        endMarker.id = 'se-end-marker';

        // Insert markers (End first)
        const endRange = range.cloneRange();
        endRange.collapse(false);
        endRange.insertNode(endMarker);

        const startRange = range.cloneRange();
        startRange.collapse(true);
        startRange.insertNode(startMarker);

        this.savedSelection = range.cloneRange();
    }

    restoreSelection() {
        // Option A: Visual Guide (Simple)
        const manualGuide = this.page.querySelector('#se-visual-guide');
        if (manualGuide) {
            this.page.focus();

            // Capture text node reference BEFORE unwrapping
            let firstChild = manualGuide.firstChild;
            let lastChild = manualGuide.lastChild;

            // Unwrap
            this.unwrap(manualGuide);

            // Ensure we are targeting text nodes if possible
            if (firstChild && firstChild.nodeType !== 3 && firstChild.firstChild) firstChild = firstChild.firstChild;
            if (lastChild && lastChild.nodeType !== 3 && lastChild.lastChild) lastChild = lastChild.lastChild;

            if (firstChild) {
                const sel = window.getSelection();
                sel.removeAllRanges();
                const range = document.createRange();

                try {
                    range.setStart(firstChild, 0);
                    if (lastChild && lastChild.nodeType === 3) {
                        range.setEnd(lastChild, lastChild.length);
                    } else if (lastChild) {
                        range.setEndAfter(lastChild);
                    } else {
                        // Fallback if only firstChild exists
                        if (firstChild.nodeType === 3) range.setEnd(firstChild, firstChild.length);
                        else range.setEndAfter(firstChild);
                    }
                    sel.addRange(range);
                    this.savedSelection = range.cloneRange();
                } catch (e) {
                    console.error("Restore failed", e);
                }
            }
            return;
        }

        // Option B: Visual Guide Parts (Robust)
        const parts = this.page.querySelectorAll('.se-visual-guide-part');
        if (parts.length > 0) {
            this.page.focus();

            const firstPart = parts[0];
            const lastPart = parts[parts.length - 1];

            // Capture text nodes (they are often the first child of the wrapper span)
            let startNode = firstPart.firstChild;
            let endNode = lastPart.firstChild;

            parts.forEach(part => {
                this.unwrap(part);
            });

            // Ensure we are targeting text nodes
            // If the startNode was a text node, it persists.

            if (startNode && endNode) {
                try {
                    const range = document.createRange();

                    // Validate nodes are still in blocked DOM (they should be)
                    // If startNode isn't text (unlikely for our robust saver), try to find text
                    if (startNode.nodeType !== 3 && startNode.firstChild) startNode = startNode.firstChild;
                    if (endNode.nodeType !== 3 && endNode.lastChild) endNode = endNode.lastChild;

                    range.setStart(startNode, 0);
                    if (endNode.nodeType === 3) {
                        range.setEnd(endNode, endNode.length);
                    } else {
                        range.setEndAfter(endNode);
                    }

                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    this.savedSelection = range.cloneRange();
                } catch (e) {
                    console.error("Restore robust failed", e);
                }
            }
            return;
        }

        const startMarker = this.page.querySelector('#se-start-marker');
        const endMarker = this.page.querySelector('#se-end-marker');

        if (startMarker && endMarker) {
            this.page.focus();

            const sel = window.getSelection();
            sel.removeAllRanges();

            const range = document.createRange();
            range.setStartAfter(startMarker);
            range.setEndBefore(endMarker);

            sel.addRange(range);

            // Update the clone while markers are still in DOM
            this.savedSelection = range.cloneRange();

            // CRITICAL: Delay marker removal slightly to let the browser "paint" the selection
            // This prevents the visual flicker or "deselection" bug
            setTimeout(() => {
                const s = this.page.querySelector('#se-start-marker');
                const e = this.page.querySelector('#se-end-marker');
                if (s) s.remove();
                if (e) e.remove();
            }, 10);

        } else if (this.savedSelection) {
            // Fallback for cases where markers might have been stripped
            this.page.focus();
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(this.savedSelection);
        } else {
            // No saved selection (e.g. first time use) -> Focus editor at end
            this.page.focus();
            const range = document.createRange();
            range.selectNodeContents(this.page);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    removeMarkers() {
        const markers = this.page.querySelectorAll('#se-start-marker, #se-end-marker');
        markers.forEach(m => m.remove());

        // Unwrap Visual Guide (without selecting)
        const guide = this.page.querySelector('#se-visual-guide');
        if (guide) {
            this.unwrap(guide);
        }

        // Unwrap Visual Guide Parts
        this.page.querySelectorAll('.se-visual-guide-part').forEach(part => this.unwrap(part));
    }

    unwrap(el) {
        const parent = el.parentNode;
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        parent.removeChild(el);
    }


    cleanHTML(html) {
        const div = document.createElement('div');
        div.innerHTML = html;

        div.querySelectorAll('*').forEach(el => {
            // Remove box-sizing (major bloat source)
            if (el.style.boxSizing) el.style.removeProperty('box-sizing');
            if (el.style.webkitBoxSizing) el.style.removeProperty('-webkit-box-sizing');

            // Remove specific colors (often pasted from other sources)
            const color = el.style.color;
            if (color === 'rgb(51, 51, 51)' || color === 'rgb(0, 0, 0)' || color === '#333333' || color === 'black') {
                el.style.removeProperty('color');
            }

            // Remove Word-specific artifacts
            if (el.style.marginLeft === '0in') el.style.removeProperty('margin-left');
            if (el.style.marginRight === '0in') el.style.removeProperty('margin-right');

            // Clean up empty style attributes
            if (el.getAttribute('style') === '') {
                el.removeAttribute('style');
            }

            // Unwrap empty spans or spans with only atomic styles we removed
            if (el.tagName === 'SPAN' && !el.hasAttributes()) {
                const parent = el.parentNode;
                while (el.firstChild) parent.insertBefore(el.firstChild, el);
                parent.removeChild(el);
            }
        });

        return div.innerHTML;
    }

    deleteSlash() {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            // Check if character before is '/'
            const startNode = range.startContainer;
            const startOffset = range.startOffset;

            if (startNode.nodeType === 3 && startOffset > 0) {
                const text = startNode.textContent;
                if (text[startOffset - 1] === '/') {
                    range.setStart(startNode, startOffset - 1);
                    range.deleteContents();
                }
            }
        }
    }

    saveState() {
        // Debounce or check if content changed?
        const currentHTML = this.page.innerHTML;
        
        // If stack is ahead of current index, cut it (new branch)
        if (this.historyIndex < this.historyStack.length - 1) {
            this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
        }

        // Avoid duplicate states if possible
        if (this.historyStack.length > 0 && this.historyStack[this.historyIndex] === currentHTML) {
            return;
        }

        this.historyStack.push(currentHTML);
        this.historyIndex++;
        
        // Limit stack size
        if (this.historyStack.length > 50) {
            this.historyStack.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            const html = this.historyStack[this.historyIndex];
            this.page.innerHTML = html;
            this.updateOriginal();
        }
    }

    redo() {
        if (this.historyIndex < this.historyStack.length - 1) {
            this.historyIndex++;
            const html = this.historyStack[this.historyIndex];
            this.page.innerHTML = html;
            this.updateOriginal();
        }
    }
}
