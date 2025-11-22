// =====================================================
// NOTEPAD TEMPLATE LOADER (NEW)
// =====================================================

const NOTEPAD_TEMPLATE_PATH = "/templates-divs/tools-div/notepad.html";

async function loadNotepadTemplate() {
    try {
        const res = await fetch(NOTEPAD_TEMPLATE_PATH);
        return await res.text();
    } catch (err) {
        console.error("❌ Failed to load notepad template:", err);
        return `<p style="color:red;">Failed to load notepad tool.</p>`;
    }
}

function executeNotepadScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        for (let attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
        }
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
    });
}

async function openNotepad(targetId) {
    const container = document.getElementById(targetId);
    if (!container) return;
    const html = await loadNotepadTemplate();
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.srcdoc = html;
    container.innerHTML = '';
    container.appendChild(iframe);
}



// ===================================================================
// EXISTING CODE (unchanged below this line)
// ===================================================================


// ========== TOAST NOTIFICATIONS (Utility) ==========
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${type === 'success' ? 'check-circle' :
                type === 'error' ? 'x-circle' : 'exclamation-triangle'} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ========== UI/FORM UTILITIES ==========
function toggleAdvanced() {
    const container = document.getElementById('advancedContainer');
    const icon = document.querySelector('#advancedToggle i');
    if (container.style.maxHeight === '0px' || !container.style.maxHeight) {
        container.style.maxHeight = '500px';
        icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
    } else {
        container.style.maxHeight = '0';
        icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
    }
}

function showFixModal() {
    new bootstrap.Modal(document.getElementById('fixModal')).show();
}

async function pasteResponse() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('aiResponse').value = text;
        showToast('Content pasted successfully', 'success');
    } catch (error) {
        showToast('Failed to paste from clipboard', 'error');
    }
}

async function copyResponse() {
    try {
        const text = document.getElementById('aiResponse').value;
        await navigator.clipboard.writeText(text);
        showToast('Content copied to clipboard', 'success');
    } catch (error) {
        showToast('Failed to copy to clipboard', 'error');
    }
}

function retryContent() {
    document.getElementById('aiResponse').value = '';
    document.getElementById('console').textContent = 'Console: Cleared. Regenerate.';
    showToast('Response cleared. Click Generate again.', 'warning');
}

function switchPreviewTab(event, tabName) {
    document.querySelectorAll('#previewModal .content-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#previewModal .content-display').forEach(d => d.classList.remove('active'));
    event.target.closest('.content-tab').classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function switchContentTab(event, tabName) {
    document.querySelectorAll('#workspaceScreen .content-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#workspaceScreen .content-display').forEach(d => d.classList.remove('active'));
    event.target.closest('.content-tab').classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// ========== SIDEBAR & NAVIGATION UTILITIES ==========
function toggleMobileSidebar() {
    document.getElementById('sidebar-panel').classList.toggle('open');
    document.querySelector('.sidebar-overlay').classList.toggle('active');
}

// ========== NOTES (Tool) ==========

function toggleNotesSidebar() {
    const sidebar = document.getElementById('notesSidebar');
    const container = document.getElementById('notesContainer');
    const btn = document.querySelector('.notes-toggle-btn');

    sidebar.classList.toggle('collapsed');
    container.classList.toggle('collapsed');

    btn.innerHTML = sidebar.classList.contains('collapsed')
        ? '<i class="bi bi-chevron-right"></i>'
        : '<i class="bi bi-chevron-left"></i>';
}

// ========== AI TUTOR ==========
function showAITutorModal() {
    new bootstrap.Modal(document.getElementById('aiTutorModal')).show();
}

function sendMessage() {
    const input = document.getElementById('tutorInput');
    const msg = input.value.trim();
    if (!msg) return;

    const chat = document.getElementById('chatMessages');
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message message-user';
    userMsg.innerHTML = `<div class="message-bubble">${msg}</div>`;
    chat.appendChild(userMsg);

    input.value = '';
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
        const tutorMsg = document.createElement('div');
        tutorMsg.className = 'chat-message message-tutor';
        tutorMsg.innerHTML = `<div class="message-bubble">About "${msg}": Let me help.</div>`;
        chat.appendChild(tutorMsg);
        chat.scrollTop = chat.scrollHeight;
    }, 1000);
}

// ========== NOTES AUTOSAVE ==========
function autoSaveNotes(e) {
    try {
        if (window.currentWorkspace) {
            window.currentWorkspace.notes = window.currentWorkspace.notes || {};
            window.currentWorkspace.notes.general = e.target.value;
            if (typeof window.saveAll === 'function') window.saveAll();
        }
    } catch (_) {}
}

// ========== AI TUTOR LIVE CALL & CONTEXT ==========
let tutorStreamController = null;

async function startTutorCall() {
    const chat = document.getElementById('chatMessages');
    const topic = window.currentTopic;
    const ws = window.currentWorkspace;
    const contentLang = document.getElementById('contentLang')?.value || 'English';
    const narrationLang = document.getElementById('narrationLang')?.value || 'en-IN';
    const visType = window.selectedVisType || '2d-animation';
    const template = window.selectedTemplate || 'surprise-me';

    let promptText = 'Live tutor connected. Ask your question.';
    if (topic && ws && window.promptGen) {
        promptText = window.promptGen.generateAutoContext(
            topic.name,
            window.getParentChapter?.(topic) || 'No Chapter',
            window.getParentUnit?.(topic) || 'No Unit',
            ws.title,
            template,
            visType,
            window.getComplexityText?.() || 'Intermediate',
            contentLang,
            narrationLang,
            topic.objective || 'Master concept'
        );
    }

    const msg = document.createElement('div');
    msg.className = 'chat-message message-tutor';
    msg.innerHTML = `<div class="message-bubble">[streaming] ${promptText}</div>`;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;

    tutorStreamController = new AbortController();
    try {
        const res = await fetch('/api/gemini-stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptText, model: 'gemini-2.5-flash-native-audio-preview-09-2025' }),
            signal: tutorStreamController.signal
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const tutorMsg = document.createElement('div');
            tutorMsg.className = 'chat-message message-tutor';
            tutorMsg.innerHTML = `<div class="message-bubble">${chunk}</div>`;
            chat.appendChild(tutorMsg);
            chat.scrollTop = chat.scrollHeight;
        }
    } catch (err) {
        const errMsg = document.createElement('div');
        errMsg.className = 'chat-message message-tutor';
        errMsg.innerHTML = `<div class="message-bubble">Stream error: ${err.message}</div>`;
        chat.appendChild(errMsg);
        chat.scrollTop = chat.scrollHeight;
    }
}

function endTutorCall() {
    if (tutorStreamController) {
        try { tutorStreamController.abort(); } catch (_) {}
        tutorStreamController = null;
    }
    const chat = document.getElementById('chatMessages');
    const msg = document.createElement('div');
    msg.className = 'chat-message message-tutor';
    msg.innerHTML = `<div class="message-bubble">[call ended]</div>`;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

async function sendTutorContext() {
    const chat = document.getElementById('chatMessages');
    const topic = window.currentTopic;
    const ws = window.currentWorkspace;
    const contentLang = document.getElementById('contentLang')?.value || 'English';
    const narrationLang = document.getElementById('narrationLang')?.value || 'en-IN';
    const visType = window.selectedVisType || '2d-animation';
    const template = window.selectedTemplate || 'surprise-me';

    let promptText = 'Provide guidance based on current context.';
    if (topic && ws && window.promptGen) {
        promptText = window.promptGen.generateAutoContext(
            topic.name,
            window.getParentChapter?.(topic) || 'No Chapter',
            window.getParentUnit?.(topic) || 'No Unit',
            ws.title,
            template,
            visType,
            window.getComplexityText?.() || 'Intermediate',
            contentLang,
            narrationLang,
            topic.objective || 'Master concept'
        );
    }

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message message-user';
    userMsg.innerHTML = `<div class="message-bubble">[context] ${promptText}</div>`;
    chat.appendChild(userMsg);
    chat.scrollTop = chat.scrollHeight;

    try {
        const res = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptText })
        });
        const data = await res.json();
        const tutorMsg = document.createElement('div');
        tutorMsg.className = 'chat-message message-tutor';
        tutorMsg.innerHTML = `<div class="message-bubble">${data.content || 'No content'}</div>`;
        chat.appendChild(tutorMsg);
        chat.scrollTop = chat.scrollHeight;
    } catch (err) {
        const errMsg = document.createElement('div');
        errMsg.className = 'chat-message message-tutor';
        errMsg.innerHTML = `<div class="message-bubble">Context error: ${err.message}</div>`;
        chat.appendChild(errMsg);
        chat.scrollTop = chat.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tutorCallStartBtn')?.addEventListener('click', startTutorCall);
    document.getElementById('tutorCallEndBtn')?.addEventListener('click', endTutorCall);
    document.getElementById('tutorSendContextBtn')?.addEventListener('click', sendTutorContext);
    const notesBtn = document.getElementById('open-notes-modal-btn');
    notesBtn?.addEventListener('click', () => {
        const modalEl = document.getElementById('notepadModal');
        if (!modalEl) return;
        const bodyId = 'notepadModalBody';
        openNotepad(bodyId);
        new bootstrap.Modal(modalEl).show();
    });
    openNotepad('notepadHost');
});

// ========== CONFIRMATION MODAL (Utility) ==========
function showConfirm(title, message, onConfirm) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;

    const confirmBtn = document.getElementById('confirmBtn');
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

    newBtn.onclick = () => {
        onConfirm();
        bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();
    };

    new bootstrap.Modal(document.getElementById('confirmModal')).show();
}
