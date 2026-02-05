class CompactEditor {
    constructor(selector, options = {}) {
        this.targetElement = document.querySelector(selector);
        if (!this.targetElement) {
            console.error(`CompactEditor: Element ${selector} not found.`);
            return;
        }
        this.options = options;
        this.init();
    }

    static create(selector, options) {
        return new CompactEditor(selector, options);
    }

    init() {
        // Create UI Structure
        this.container = document.createElement('div');
        this.container.className = 'ce-main-container';

        this.toolbar = this.createToolbar();
        this.container.appendChild(this.toolbar);

        this.wrapper = document.createElement('div');
        this.wrapper.className = 'ce-editor-wrapper';

        this.page = document.createElement('div');
        this.page.className = 'ce-page-content';
        if (this.options.mode === 'document') {
            this.page.classList.add('ce-document-mode');
        }
        this.page.contentEditable = true;

        // Load initial content if any, or placeholder
        if (this.targetElement.value) {
            this.page.innerHTML = this.targetElement.value;
        } else if (this.targetElement.innerHTML) {
            this.page.innerHTML = this.targetElement.innerHTML;
        } else {
            this.page.innerHTML = '<p>Start typing...</p>';
        }

        // Sync back to original element (if it's a textarea/input) on change
        this.page.addEventListener('input', () => {
            if (this.targetElement.tagName === 'TEXTAREA' || this.targetElement.tagName === 'INPUT') {
                this.targetElement.value = this.page.innerHTML;
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
        this.container.appendChild(this.wrapper);

        // Replace target or append? 
        // Best practice: Hide target (if textarea) and insert after. 
        // If div, clear and append.
        if (this.targetElement.tagName === 'TEXTAREA') {
            this.targetElement.style.display = 'none';
            this.targetElement.parentNode.insertBefore(this.container, this.targetElement.nextSibling);
        } else {
            this.targetElement.innerHTML = '';
            this.targetElement.appendChild(this.container);
        }
    }

    createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'ce-toolbar-container';

        // Define groups and tools
        const tools = [
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

        tools.forEach(group => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'ce-toolbar-group';

            group.items.forEach(tool => {
                if (tool.type === 'select') {
                    const select = document.createElement('select');
                    select.className = 'ce-select-tool';
                    select.title = tool.title;

                    if (tool.labels) {
                        // Use values and labels
                        tool.options.forEach((opt, index) => {
                            const option = document.createElement('option');
                            option.value = opt;
                            option.text = tool.labels[index];
                            if (opt === 'p') option.selected = true;
                            if (tool.cmd === 'fontName' && opt === 'Calibri') option.selected = true;
                            if (tool.cmd === 'fontSize' && opt === 12) option.selected = true;
                            select.appendChild(option);
                        });
                    } else {
                        // Simple array
                        tool.options.forEach(opt => {
                            const option = document.createElement('option');
                            option.value = opt;
                            option.text = opt;
                            if (opt === 12 || opt === 'Calibri') option.selected = true;
                            // Line height default
                            if (tool.cmd === 'lineHeight' && opt === '1.5') option.selected = true;
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
                    // wrapper for color picker
                    const btn = this.createButton(tool.icon, tool.title, () => {
                        input.click();
                    });
                    // colored indicator
                    btn.querySelector('i').style.borderBottom = `3px solid ${tool.color === 'yellow' ? 'transparent' : tool.color}`;
                    if (tool.color === 'yellow') btn.querySelector('i').style.background = 'yellow';

                    const input = document.createElement('input');
                    input.type = 'color';
                    input.style.display = 'none';
                    input.onchange = (e) => this.cmd(tool.cmd, e.target.value);

                    groupDiv.appendChild(btn);
                    groupDiv.appendChild(input);

                } else {
                    // Standard button
                    const action = tool.action ? tool.action : () => this.cmd(tool.cmd);
                    const btn = this.createButton(tool.icon, tool.title, action);
                    groupDiv.appendChild(btn);
                }
            });
            toolbar.appendChild(groupDiv);
        });

        return toolbar;
    }

    createButton(icon, title, onClick) {
        const btn = document.createElement('button');
        btn.className = 'ce-btn-tool';
        btn.title = title;
        btn.innerHTML = `<i class="material-icons-outlined">${icon}</i>`;
        btn.onclick = (e) => {
            e.preventDefault(); // prevent form submit if in form
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
            // Use execCommand 7 as a temporary marker
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
            const custom = prompt("Enter Line Height (e.g., 1.2, 2.5, 150%):", "1.5");
            if (!custom) return; // User cancelled
            finalValue = custom;

            // Update the dropdown logic if needed, or just let it apply
            // (Re-selecting 'Custom' in the dropdown won't visually show the number but it works)
        }

        // Apply line-height to the current block
        // execCommand doesn't support line-height directly, so we use a block format approach
        // or just apply it to the main page if no selection (simplified). 
        // For a library, let's try to apply to the selection block.
        // A simple hack: toggle a span? No, line-height is block level.
        // We will simple apply it to the selection's parent block or the whole page if difficult.
        // Let's try applying to the parent element of the selection.
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const parent = range.commonAncestorContainer.nodeType === 1
                ? range.commonAncestorContainer
                : range.commonAncestorContainer.parentElement;

            // If parent is the page itself, set on page.
            if (parent === this.page) {
                this.page.style.lineHeight = finalValue;
            } else {
                // Try to find the nearest block (P, DIV, H1-6)
                let block = parent;
                while (block && block !== this.page && !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(block.tagName)) {
                    block = block.parentElement;
                }
                if (block && block !== this.page) {
                    block.style.lineHeight = finalValue;
                } else {
                    this.cmd('formatBlock', 'p'); // Ensure it's a block
                    setTimeout(() => this.setLineHeight(finalValue), 0); // Retry
                }
            }
        }
    }

    insertLink() {
        const url = prompt("Enter the URL:");
        if (url) {
            this.cmd('createLink', url);
        }
    }

    insertImage() {
        const url = prompt("Enter Image URL:");
        if (url) {
            this.cmd('insertImage', url);
        }
    }

    insertTable() {
        const rows = prompt("Enter number of rows:", 3);
        const cols = prompt("Enter number of columns:", 3);

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
