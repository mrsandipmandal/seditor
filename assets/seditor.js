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
    insert_page_break: '<path d="M6 4c-1.1 0-2 .9-2 2v5.5h16V6c0-1.1-.9-2-2-2H6zm0 16c-1.1 0-2-.9-2-2v-5.5h16V20c0 1.1-.9 2 2 2H6z"/>'
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

        // Sync Handling
        this.page.addEventListener('input', () => this.updateOriginal());
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

        // Update Toolbar State on interaction
        this.page.addEventListener('keyup', () => this.updateToolbarState());
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
    }

    isFormInput() {
        return this.targetElement.tagName === 'TEXTAREA' || this.targetElement.tagName === 'INPUT';
    }

    updateOriginal() {
        if (this.isFormInput()) {
            this.targetElement.value = this.page.innerHTML;
        }
    }

    getDefaultToolbar() {
        return [
            {
                type: 'group',
                items: [
                    { icon: 'code', action: () => this.toggleSource(), title: 'View Source', id: 'se-btn-source' }
                ]
            },
            {
                type: 'group',
                items: [
                    { icon: 'undo', cmd: 'undo', title: 'Undo' },
                    { icon: 'redo', cmd: 'redo', title: 'Redo' }
                ]
            },
            {
                type: 'group',
                items: [
                    { type: 'select', cmd: 'formatBlock', title: 'Format', options: ['p', 'h1', 'h2', 'h3', 'blockquote', 'pre'], labels: ['Normal', 'Heading 1', 'Heading 2', 'Heading 3', 'Quote', 'Code'] },
                    { type: 'select', cmd: 'fontName', title: 'Font Family', options: ['Sans-Serif', 'Serif', 'Monospace', 'Arial', 'Courier New', 'Georgia', 'Tahoma', 'Times New Roman', 'Verdana'] },
                    { type: 'select', cmd: 'fontSize', title: 'Font Size', options: [10, 11, 12, 14, 16, 18, 20, 24, 30], customHandler: true }
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
                    { icon: 'superscript', cmd: 'superscript', title: 'Superscript' }
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
                    { type: 'select', cmd: 'lineHeight', title: 'Line Height', options: ['1.0', '1.15', '1.5', '2.0', 'Custom'], customHandler: true }
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
                    { icon: 'format_indent_increase', cmd: 'indent', title: 'Increase Indent' }
                ]
            },
            {
                type: 'group',
                items: [
                    { icon: 'format_list_bulleted', cmd: 'insertUnorderedList', title: 'Bullet List' },
                    { icon: 'format_list_numbered', cmd: 'insertOrderedList', title: 'Num List' },
                    { icon: 'link', action: () => this.insertLink(), title: 'Link' },
                    { icon: 'image', action: () => this.insertImage(), title: 'Insert Image' },
                    { icon: 'table_chart', action: () => this.insertTable(), title: 'Table' },
                    { icon: 'insert_page_break', action: () => this.insertPageBreak(), title: 'Page Break' }
                ]
            },
            {
                type: 'group',
                items: [
                    { icon: 'format_clear', cmd: 'removeFormat', title: 'Clear Formatting' }
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
                    const select = document.createElement('select');
                    select.className = 'se-select-tool';
                    select.title = tool.title || '';

                    if (tool.labels) {
                        tool.options.forEach((opt, index) => {
                            const option = document.createElement('option');
                            option.value = opt;
                            option.text = tool.labels[index];
                            // Basic default selection logic
                            if (opt === 'p' || (tool.cmd === 'fontName' && opt === 'Calibri') || (tool.cmd === 'fontSize' && opt === 12)) {
                                option.selected = true;
                            }
                            select.appendChild(option);
                        });
                    } else {
                        tool.options.forEach(opt => {
                            const option = document.createElement('option');
                            option.value = opt;
                            option.text = opt;
                            if (opt === 12 || opt === 'Calibri' || (tool.cmd === 'lineHeight' && opt === '1.5')) option.selected = true;
                            select.appendChild(option);
                        });
                    }

                    select.onchange = (e) => {
                        if (tool.customHandler) {
                            if (tool.cmd === 'fontSize') this.setFontSize(e.target.value);
                            if (tool.cmd === 'lineHeight') this.setLineHeight(e.target.value);
                        } else {
                            this.cmd(tool.cmd, e.target.value);
                        }
                    };
                    groupDiv.appendChild(select);

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
        return btn;
    }

    cmd(command, value = null) {
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
    }

    setLineHeight(value) {
        let finalValue = value;
        if (value === 'Custom') {
            const custom = prompt("Enter Line Height (e.g., 1.5, 30px):", "1.5");
            if (!custom) return;
            finalValue = custom;
        }

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const parent = range.commonAncestorContainer.nodeType === 1
                ? range.commonAncestorContainer
                : range.commonAncestorContainer.parentElement;

            if (parent === this.page) {
                this.page.style.lineHeight = finalValue;
            } else {
                let block = parent;
                while (block && block !== this.page && !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(block.tagName)) {
                    block = block.parentElement;
                }
                if (block && block !== this.page) {
                    block.style.lineHeight = finalValue;
                } else {
                    this.cmd('formatBlock', 'p');
                    setTimeout(() => this.setLineHeight(finalValue), 0);
                }
            }
        }
    }

    insertLink() {
        const url = prompt("Enter Link URL:");
        if (url) this.cmd('createLink', url);
    }

    insertImage() {
        const url = prompt("Enter Image URL:");
        if (url) this.cmd('insertImage', url);
    }

    insertTable() {
        const rows = prompt("Rows:", 3);
        const cols = prompt("Columns:", 3);

        if (rows > 0 && cols > 0) {
            let html = '<table style="width:100%; border-collapse: collapse; margin-bottom: 1em;"><tbody>';
            for (let i = 0; i < rows; i++) {
                html += '<tr>';
                for (let j = 0; j < cols; j++) {
                    html += '<td style="border: 1px solid #000; padding: 5px;">Cell</td>';
                }
                html += '</tr>';
            }
            html += '</tbody></table><p><br></p>';
            this.cmd('insertHTML', html);
        }
    }

    insertPageBreak() {
        const html = '<hr class="se-page-break">';
        this.cmd('insertHTML', html);
    }

    // Public API Helpers
    setValue(html) {
        this.page.innerHTML = html;
        this.updateOriginal();
    }

    getValue() {
        return this.page.innerHTML;
    }
}
