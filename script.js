document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
        itemCount: 3,
        containerProps: {
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        }
    };

    // --- DOM ELEMENT REFERENCES ---
    const sandboxContainer = document.getElementById('sandbox-container');
    const cssCodeSnippet = document.getElementById('css-code-snippet');
    const controls = {
        justifyContent: document.getElementById('justify-content'),
        alignItems: document.getElementById('align-items'),
        flexDirection: document.getElementById('flex-direction'),
        flexWrap: document.getElementById('flex-wrap'),
    };
    const addItemBtn = document.getElementById('add-item-btn');
    const removeItemBtn = document.getElementById('remove-item-btn');

    // --- CORE FUNCTIONS ---

    /**
     * Applies styles to the sandbox container based on the current state.
     */
    function applyStyles() {
        const props = state.containerProps;
        for (const prop in props) {
            sandboxContainer.style[prop] = props[prop];
        }
        updateCodeSnippet();
    }

    /**
     * Updates the code snippet view based on the current state.
     */
    function updateCodeSnippet() {
        const props = state.containerProps;
        let cssText = `.container {\n`;
        cssText += `  display: flex;\n`;
        for (const prop in props) {
            // Convert camelCase to kebab-case for CSS property names
            const cssProp = prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
            cssText += `  ${cssProp}: ${props[prop]};\n`;
        }
        cssText += `}`;
        cssCodeSnippet.textContent = cssText;
    }

    /**
     * Renders the items inside the sandbox container based on the state.
     */
    function renderItems() {
        sandboxContainer.innerHTML = ''; // Clear existing items
        for (let i = 1; i <= state.itemCount; i++) {
            const item = document.createElement('div');
            item.className = 'sandbox-item';
            item.textContent = i;
            sandboxContainer.appendChild(item);
        }
    }

    // --- EVENT LISTENERS ---

    // Add listeners for all the control select dropdowns
    for (const control in controls) {
        controls[control].addEventListener('change', (event) => {
            const newValue = event.target.value;
            // Update the state with the new value
            state.containerProps[control] = newValue;
            // Re-apply the styles
            applyStyles();
        });
    }

    // Listener for the "Add Item" button
    addItemBtn.addEventListener('click', () => {
        state.itemCount++;
        renderItems();
    });

    // Listener for the "Remove Item" button
    removeItemBtn.addEventListener('click', () => {
        if (state.itemCount > 0) {
            state.itemCount--;
            renderItems();
        }
    });

    // --- INITIALIZATION ---

    // Set initial values for controls based on default state
    for (const control in controls) {
        controls[control].value = state.containerProps[control];
    }
    
    // Perform initial render
    renderItems();
    applyStyles();
});