// ===============================
// TEMPLATE PATHS (LOCAL)
// ===============================
const TEMPLATE_PATHS = {
    graph: "/templates-divs/visual-divs/graph.html",
    chemistry: "/templates-divs/visual-divs/chem.html",
    mindvoice: "/templates-divs/visual-divs/mindvoice.html",
    presentation: "/templates-divs/visual-divs/presentation.html",
    quiz: "/templates-divs/visual-divs/quiz.html"
};

// ===============================
// FETCH LOCAL TEMPLATE
// ===============================
async function loadTemplate(type) {
    const path = TEMPLATE_PATHS[type];

    if (!path) {
        console.error("❌ Template not found:", type);
        return null;
    }

    try {
        const res = await fetch(path);
        return await res.text();
    } catch (err) {
        console.error("❌ Failed to load template:", path, err);
        return null;
    }
}

// ===============================
// REPLACE: let ExampleJson = {...};
// ===============================
function insertExampleJson(html, jsonObject) {
    const jsonString = JSON.stringify(jsonObject, null, 2);

    // Multi-line safe, non-greedy, robust
    const pattern = /let\s+ExampleJson\s*=\s*\{[\s\S]*?\}\s*;?/;

    const replaced = html.replace(pattern, `let ExampleJson = ${jsonString};`);

    return replaced;
}

// ===============================
// RE-EXECUTE SCRIPT TAGS
// ===============================
function executeScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");

        // copy all attributes
        for (let attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
        }

        // copy content
        newScript.textContent = oldScript.textContent;

        oldScript.replaceWith(newScript);
    });
}

// ===============================
// MAIN RENDER ENGINE
// ===============================
async function renderVisual(blocks, containerId = "vizContainer") {
    const container = document.getElementById(containerId);
    if (!container) return console.error("❌ Missing container:", containerId);

    container.innerHTML = ""; // clear old content

    // Case 1: Full HTML comes directly from API
    if (blocks.visualType === "html") {
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        iframe.setAttribute('referrerpolicy','no-referrer');
        iframe.srcdoc = blocks.visual;
        container.innerHTML = '';
        container.appendChild(iframe);
        return;
    }

    // Case 2: Load template and inject JSON
    const template = await loadTemplate(blocks.visualType);
    if (!template) {
        container.innerHTML = "<p style='color:red;'>Failed to load template.</p>";
        return;
    }

    // Replace ExampleJson in the template
    const finalHTML = insertExampleJson(template, blocks.visual);

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.srcdoc = finalHTML;
    container.innerHTML = '';
    container.appendChild(iframe);

    if (blocks.visualType === 'quiz') {
        iframe.onload = () => {
            try {
                const w = iframe.contentWindow;
                const d = iframe.contentDocument;
                if (w && typeof w.startQuiz === 'function') {
                    w.startQuiz();
                } else {
                    const btn = d.getElementById('startBtn');
                    btn?.click();
                }
            } catch (_) {}
        };
    }
}

async function renderQuiz(quizData) {
    const container = document.getElementById('quizContent');
    if (!container || !quizData?.questions) return;
    container.innerHTML = '';
    quizData.questions.forEach((q, qi) => {
        const wrap = document.createElement('div');
        wrap.className = 'quiz-question';
        const opts = q.options.map((opt, oi) => `<div class="quiz-option" data-q="${qi}" data-idx="${oi}">${opt}</div>`).join('');
        wrap.innerHTML = `<h5>${q.question}</h5>${opts}`;
        container.appendChild(wrap);
    });

    container.querySelectorAll('.quiz-option').forEach(el => {
        el.addEventListener('click', () => {
            const qIndex = parseInt(el.dataset.q, 10);
            const selected = parseInt(el.dataset.idx, 10);
            const correct = quizData.questions[qIndex].answerIndex;
            const siblings = el.parentElement.querySelectorAll('.quiz-option');
            siblings.forEach(s => s.classList.remove('selected', 'correct', 'wrong'));
            el.classList.add('selected');
            siblings.forEach(s => s.classList.add('wrong'));
            siblings[correct]?.classList.remove('wrong');
            siblings[correct]?.classList.add('correct');
        });
    });
}
