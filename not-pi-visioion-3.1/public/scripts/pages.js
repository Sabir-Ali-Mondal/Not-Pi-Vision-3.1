// ===============================
// TEMPLATE PATHS (LOCAL)
// ===============================
const PAGES_TEMPLATE_CANDIDATES = [
  "/templates-divs/pages-div/description.html"
];


// ===============================
// FETCH LOCAL TEMPLATE (tries public path first)
// ===============================
async function loadPageTemplate() {
    for (const url of PAGES_TEMPLATE_CANDIDATES) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                const txt = await res.text();
                if (txt.includes('id="VisualContainer-description"') || txt.includes('description-contentCard')) {
                    return txt;
                }
                console.warn('⚠️ Loaded unexpected content for description template from', url);
            }
        } catch (err) {
            console.warn("⚠️ Failed to load:", url, err);
        }
    }
    console.error("❌ Failed to load description template from all candidates");
    return null;
}


// ===============================
// REPLACE: let ExampleJson = {...};
// ===============================
function insertPageJson(html, desc) {
    if (!desc) return html;
    const jsonString = JSON.stringify(desc);
    const pattern = /let\s+ExampleJson\s*=\s*[^;]+;?/;
    return html.replace(pattern, `let ExampleJson = ${jsonString};`);
}


// ===============================
// EXECUTE <script> TAGS
// ===============================
function executePageScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");

        // Copy attributes (type, src, etc.)
        for (let attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
        }

        newScript.textContent = oldScript.textContent;

        oldScript.replaceWith(newScript);
    });
}


// ===============================
// MAIN DESCRIPTION RENDER ENGINE
// ===============================
async function renderPages(desc, containerId = "pagesContent") {
    const container = document.getElementById(containerId);
    if (!container) return console.error("❌ Missing pages container:", containerId);

    const template = await loadPageTemplate();
    if (!template) {
        container.innerHTML = `<p style="color:red">Failed to load description template.</p>`;
        return;
    }

    const htmlForIframe = insertPageJson(template, typeof desc === 'string' ? desc : String(desc || ''));

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.srcdoc = htmlForIframe;
    container.innerHTML = '';
    container.appendChild(iframe);
}
