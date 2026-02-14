// Auto-inject CSS
(function () {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const cssPath = currentScript.src.replace('.js', '.css');

    // Check if style already exists to avoid duplicates
    if (!document.querySelector(`link[href="${cssPath}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
    }
})();

const ICONS = {
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
    content_paste: '<path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/>'
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
        this.saveState(); // Save initial state

        // Sync Handling & History
        this.page.addEventListener('input', () => {
            this.updateOriginal();
            this.saveState(); // Save on every input
        });

        this.sourceArea.addEventListener('input', () => {
            // In source mode, sync directly if form submit happens
            if (this.isFormInput()) {
                this.targetElement.value = this.sourceArea.value;
            }
        });

        // Tab Handling
        this.page.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                this.cmd('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
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
            } else {
                this.cmd('insertText', text);
            }
        });

        // Update Toolbar State on interaction
        this.page.addEventListener('keyup', (e) => {
            this.updateToolbarState();
            // Slash Command
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
        this.page.addEventListener('mouseup', () => this.updateToolbarState());
        this.page.addEventListener('click', () => this.updateToolbarState());

        this.wrapper.appendChild(this.page);
        this.wrapper.appendChild(this.sourceArea);
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
                    { icon: 'undo', action: () => this.undo(), title: 'Undo' },
                    { icon: 'redo', action: () => this.redo(), title: 'Redo' }
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
            this.sourceArea.value = this.page.innerHTML;
            this.sourceArea.style.display = 'block';
            this.page.style.display = 'none';

            const btn = this.container.querySelector('#se-btn-source');
            if (btn) btn.classList.add('se-active');

            this.setToolbarDisabled(true);
        } else {
            // Switch to Design
            this.page.innerHTML = this.sourceArea.value;
            this.updateOriginal();
            this.sourceArea.style.display = 'none';
            this.page.style.display = 'block';

            const btn = this.container.querySelector('#se-btn-source');
            if (btn) btn.classList.remove('se-active');

            this.setToolbarDisabled(false);
        }
    }

    setToolbarDisabled(disabled) {
        const tools = this.toolbar.querySelectorAll('button, select, input');
        tools.forEach(tool => {
            if (tool.id !== 'se-btn-source') {
                tool.disabled = disabled;
                tool.style.opacity = disabled ? '0.5' : '1';
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

        // Context Menu for Links/Images
        this.page.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            const img = e.target.closest('img');

            if (anchor && this.page.contains(anchor)) {
                e.preventDefault();
                this.currentLink = anchor;
                this.showPopup('link-actions', anchor.getBoundingClientRect(), { url: anchor.href });
            } else if (img && this.page.contains(img)) {
                this.currentImage = img;
                this.showPopup('image-actions', img.getBoundingClientRect());
            }
        });
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
                <input type="number" id="se-popup-rows" placeholder="Rows" value="3" min="1">
                <input type="number" id="se-popup-cols" placeholder="Columns" value="3" min="1">
                <div class="se-popup-actions">
                    <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                    <button type="button" class="se-btn-primary" id="se-popup-save">Insert</button>
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
        } else if (type === 'menu') {
            content = `
                <div class="se-popup-tools" style="flex-direction: column; align-items: stretch; gap: 5px;">
                    <button type="button" class="se-btn-secondary" id="se-menu-link">Link</button>
                    <button type="button" class="se-btn-secondary" id="se-menu-table">Table</button>
                </div>`;
        } else if (type === 'lineHeight') {
            content = `
                <input type="text" id="se-popup-text" placeholder="Line Height (e.g. 1.5, 30px)" value="${data.value || ''}">
                <div class="se-popup-actions">
                    <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                    <button type="button" class="se-btn-primary" id="se-popup-save">Apply</button>
                </div>`;
        } else if (type === 'pageSize') {
            content = `
                <input type="text" id="se-popup-width" placeholder="Width (e.g. 210mm)" value="${data.width || '210mm'}">
                <input type="text" id="se-popup-height" placeholder="Height (e.g. 297mm)" value="${data.height || '297mm'}">
                <div class="se-popup-actions">
                    <button type="button" class="se-btn-secondary" id="se-popup-cancel">Cancel</button>
                    <button type="button" class="se-btn-primary" id="se-popup-save">Apply</button>
                </div>`;
        } else if (type === 'margins') {
            content = `
                <input type="text" id="se-popup-text" placeholder="Margins (e.g. 25mm, 1in)" value="${data.value || ''}">
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
                if (type === 'link-actions') this.cmd('unlink');
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

    deleteSlash() {
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
}
