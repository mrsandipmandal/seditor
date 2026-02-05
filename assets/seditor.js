class SEditor {
    constructor(term, options = {}) {
        // Support selector string or direct element
        this.targetElement = typeof term === 'string' ? document.querySelector(term) : term;

        if (!this.targetElement) {
            console.error(`SEditor: Element not found.`);
            return;
        }

        // Default Options
        this.options = {
            mode: 'classic', // classic | document
            placeholder: 'Start typing...',
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
                    { type: 'select', cmd: 'fontName', title: 'Font Family', options: ['Calibri', 'Arial', 'Times New Roman', 'Verdana'] },
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
                    { icon: 'table_chart', action: () => this.insertTable(), title: 'Table' }
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
                    const i = btn.querySelector('i');
                    i.style.borderBottom = `3px solid ${tool.color === 'yellow' ? 'transparent' : tool.color}`;
                    if (tool.color === 'yellow') i.style.background = 'yellow';

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
        btn.innerHTML = `<i class="material-icons-outlined">${icon}</i>`;
        btn.onclick = (e) => {
            e.preventDefault();
            onClick(e);
        };
        return btn;
    }

    cmd(command, value = null) {
        document.execCommand(command, false, value);
        this.page.focus();
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
}
