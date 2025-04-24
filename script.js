// --- Data: Prompt Templates ---
// Modular structure for templates
const promptTemplates = [
    // --- Content Generation ---
    {
        id: 'blog_post_idea',
        name: 'Blog Post Idea Generator',
        category: 'Content',
        templateString: `Generate 5 blog post ideas about {{topic}}. The target audience is {{audience}}. Focus on topics that are {{focus_area}} and address the pain point of {{pain_point}}.`,
        variables: [
            { name: 'topic', label: 'Main Topic', type: 'text', placeholder: 'e.g., sustainable gardening' },
            { name: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., urban beginners' },
            { name: 'focus_area', label: 'Focus Area', type: 'text', placeholder: 'e.g., practical and low-cost' },
            { name: 'pain_point', label: 'Pain Point to Address', type: 'text', placeholder: 'e.g., lack of space' },
        ]
    },
    {
        id: 'article_outline',
        name: 'Article Outline Creator',
        category: 'Content',
        templateString: `Create a detailed outline for an article titled "{{article_title}}". The article should cover: {{key_points}}. The target keyword is "{{keyword}}". Aim for a {{tone}} tone. Include sections for Introduction, {{section_count}} main body points, and Conclusion.`,
        variables: [
            { name: 'article_title', label: 'Article Title', type: 'text' },
            { name: 'key_points', label: 'Key Points to Cover (comma-separated)', type: 'text' },
            { name: 'keyword', label: 'Target Keyword', type: 'text' },
            { name: 'tone', label: 'Desired Tone', type: 'text', placeholder: 'e.g., informative, engaging' },
            { name: 'section_count', label: 'Number of Main Sections', type: 'number', placeholder: 'e.g., 3' }
        ]
    },
    // --- Proposals ---
    {
        id: 'project_proposal_intro',
        name: 'Project Proposal Introduction',
        category: 'Proposal',
        templateString: `Write an introductory paragraph for a project proposal addressed to {{client_name}} at {{client_company}}. The project aims to solve {{problem}} by implementing {{solution}}. Our key differentiator is {{differentiator}}.`,
        variables: [
            { name: 'client_name', label: 'Client Contact Name', type: 'text' },
            { name: 'client_company', label: 'Client Company', type: 'text' },
            { name: 'problem', label: 'Problem to Solve', type: 'text' },
            { name: 'solution', label: 'Proposed Solution', type: 'text' },
            { name: 'differentiator', label: 'Key Differentiator', type: 'text' },
        ]
    },
    // --- Email Outreach ---
    {
        id: 'cold_email_seq1',
        name: 'Cold Email - Sequence 1 (Introduction)',
        category: 'Email',
        templateString: `Subject: Idea regarding {{company_pain_point}} at {{prospect_company}}

Hi {{prospect_name}},

My name is {{your_name}} from {{your_company}}. I was researching {{prospect_company}} and noticed you focus on {{company_focus}}.

Many companies in {{prospect_industry}} struggle with {{company_pain_point}}. We help solve this by {{your_solution_brief}}.

Would you be open to a brief chat next week to explore if this could be valuable for {{prospect_company}}?

Best regards,
{{your_name}}
{{your_title}}`,
        variables: [
            { name: 'company_pain_point', label: 'Prospect Company Pain Point', type: 'text' },
            { name: 'prospect_company', label: 'Prospect Company Name', type: 'text' },
            { name: 'prospect_name', label: 'Prospect Contact Name', type: 'text' },
            { name: 'your_name', label: 'Your Name', type: 'text' },
            { name: 'your_company', label: 'Your Company Name', type: 'text' },
            { name: 'company_focus', label: 'Prospect Company Focus Area', type: 'text' },
            { name: 'prospect_industry', label: 'Prospect Industry', type: 'text' },
            { name: 'your_solution_brief', label: 'Brief Description of Your Solution', type: 'text' },
            { name: 'your_title', label: 'Your Title', type: 'text' },
        ]
    },
    // --- Social Media ---
    {
        id: 'linkedin_post_idea',
        name: 'LinkedIn Post - Industry Insight',
        category: 'Social',
        templateString: `Draft a LinkedIn post sharing an insight about {{industry_trend}} in the {{industry_name}} sector. Discuss its impact on {{impact_area}}. Include a question to encourage engagement, such as "{{engagement_question}}". Add relevant hashtags like #{{hashtag1}} #{{hashtag2}} #{{hashtag3}}.`,
        variables: [
            { name: 'industry_trend', label: 'Industry Trend', type: 'text' },
            { name: 'industry_name', label: 'Industry Name', type: 'text' },
            { name: 'impact_area', label: 'Area of Impact', type: 'text' },
            { name: 'engagement_question', label: 'Engagement Question', type: 'text' },
            { name: 'hashtag1', label: 'Hashtag 1', type: 'text' },
            { name: 'hashtag2', label: 'Hashtag 2', type: 'text' },
            { name: 'hashtag3', label: 'Hashtag 3', type: 'text' },
        ]
    },
    {
        id: 'twitter_thread_hook',
        name: 'Twitter Thread Hook',
        category: 'Social',
        templateString: `Write a compelling hook (Tweet 1) for a Twitter thread about {{thread_topic}}. The hook should mention a surprising fact or common misconception like "{{surprising_fact}}" and promise to explain {{promise}}. End with a curiosity gap, e.g., "Here's what most people get wrong 👇".`,
        variables: [
            { name: 'thread_topic', label: 'Thread Topic', type: 'text' },
            { name: 'surprising_fact', label: 'Surprising Fact/Misconception', type: 'text' },
            { name: 'promise', label: 'What the Thread Will Explain', type: 'text' },
        ]
    },
];


// --- DOM Elements ---
const templateSelector = document.getElementById('templateSelector');
const variableInputsContainer = document.getElementById('variableInputsContainer');
const generateBtn = document.getElementById('generateBtn');
const promptOutput = document.getElementById('promptOutput');
const promptOutputContainer = document.getElementById('promptOutputContainer'); // The text field wrapping the output


// --- Core Logic ---

/**
 * Populates the template selector dropdown.
 */
function populateTemplateSelector() {
    // Clear existing options first
    templateSelector.innerHTML = '';

    // Add a default, non-selectable option
    const defaultOption = document.createElement('md-select-option');
    // defaultOption.value = ''; // No value
    defaultOption.disabled = true; // Make it non-selectable
    defaultOption.selected = true; // Make it the default display
    defaultOption.headline = "Choose a template...";
    templateSelector.appendChild(defaultOption);


    promptTemplates.forEach(template => {
        const option = document.createElement('md-select-option');
        option.value = template.id;
        option.dataset.templateId = template.id; // Store ID for easy access
        option.innerHTML = `<div slot="headline">${template.name} (${template.category})</div>`;
        templateSelector.appendChild(option);
    });
}

/**
 * Displays input fields for the selected template's variables.
 * @param {string} templateId - The ID of the selected template.
 */
function displayVariableInputs(templateId) {
    const selectedTemplate = promptTemplates.find(t => t.id === templateId);
    variableInputsContainer.innerHTML = ''; // Clear previous inputs

    if (!selectedTemplate || !selectedTemplate.variables || selectedTemplate.variables.length === 0) {
        variableInputsContainer.innerHTML = '<p class="text-sm text-on-surface-variant text-center">No variables needed for this template.</p>';
        return;
    }

    selectedTemplate.variables.forEach(variable => {
        const textField = document.createElement('md-outlined-text-field');
        textField.label = variable.label;
        textField.dataset.variableName = variable.name; // Store variable name
        textField.id = `var-${variable.name}`; // Unique ID
        textField.type = variable.type || 'text'; // Default to text
        if (variable.placeholder) {
            textField.placeholder = variable.placeholder;
        }
        textField.required = true; // Make fields required
        textField.classList.add('w-full'); // Tailwind class for full width

        variableInputsContainer.appendChild(textField);
    });
}

/**
 * Gathers values from the dynamically generated input fields.
 * @returns {object} An object mapping variable names to their values.
 */
function getVariableValues() {
    const values = {};
    const inputFields = variableInputsContainer.querySelectorAll('md-outlined-text-field');
    inputFields.forEach(field => {
        const name = field.dataset.variableName;
        if (name) {
            values[name] = field.value.trim(); // Get the value from the Material component
        }
    });
    return values;
}

/**
 * Generates the final prompt by substituting variables into the template string.
 */
function generatePrompt() {
    const selectedOption = templateSelector.selectedOptions[0]; // Material select gives options array
    if (!selectedOption || !selectedOption.value) {
         promptOutput.textContent = 'Please select a template first.';
         promptOutputContainer.error = true; // Show error state on the text field
         promptOutputContainer.errorText = 'Template selection required.';
        return;
    }
     promptOutputContainer.error = false; // Clear error state if selection is valid
     promptOutputContainer.errorText = '';


    const templateId = selectedOption.value;
    const selectedTemplate = promptTemplates.find(t => t.id === templateId);

    if (!selectedTemplate) {
        promptOutput.textContent = 'Error: Selected template not found.';
        return;
    }

    const variableValues = getVariableValues();

    // Basic validation: check if all required fields are filled
    let allFilled = true;
    if (selectedTemplate.variables) {
       selectedTemplate.variables.forEach(variable => {
           const inputField = variableInputsContainer.querySelector(`#var-${variable.name}`);
            if (!variableValues[variable.name]) {
                allFilled = false;
                // Highlight the empty field (optional)
                if (inputField) {
                    inputField.error = true;
                    inputField.errorText = 'This field is required';
                }

            } else {
                 if (inputField) {
                    inputField.error = false;
                    inputField.errorText = '';
                }
            }
       });
    }


    if (!allFilled) {
         promptOutput.textContent = 'Please fill in all required variable fields.';
         return;
    }


    let generatedString = selectedTemplate.templateString;

    // Substitute variables
    for (const name in variableValues) {
        // Use a RegExp for global replacement of {{variableName}}
        const placeholder = new RegExp(`\\{\\{${name}\\}\\}`, 'g');
        generatedString = generatedString.replace(placeholder, variableValues[name] || `[${name}]`); // Use value or placeholder if empty
    }

    // Display the result
    promptOutput.textContent = generatedString;

     // Optional: Auto-focus and select the generated text
    // promptOutputContainer.focus();
    // setTimeout(() => { // Allow DOM update before selecting
    //     promptOutputContainer.select();
    // }, 0);


}


// --- Event Listeners ---
templateSelector.addEventListener('change', (event) => {
    // Use event.target.value which Material Web components update
    const selectedTemplateId = event.target.value;
     promptOutputContainer.error = false; // Reset error on change
     promptOutputContainer.errorText = '';
     promptOutput.textContent = 'Your generated prompt will appear here...'; // Reset output
    if (selectedTemplateId) {
        displayVariableInputs(selectedTemplateId);
    } else {
        variableInputsContainer.innerHTML = '<p class="text-sm text-on-surface-variant text-center">Select a template to see variable fields.</p>'; // Reset variables section
    }
});

generateBtn.addEventListener('click', generatePrompt);

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    populateTemplateSelector();
    // Set initial state for variable inputs
    variableInputsContainer.innerHTML = '<p class="text-sm text-on-surface-variant text-center">Select a template to see variable fields.</p>';
    promptOutput.textContent = 'Your generated prompt will appear here...';
});
