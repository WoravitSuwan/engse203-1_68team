// ... (โค้ดเดิมส่วน global variables และ initializeForms)

async function submitFeedbackForm() {
    if (isSubmitting) return;
    const formData = new FormData(feedbackForm);
    const data = Object.fromEntries(formData.entries());
    data.rating = parseInt(data.rating);

    try {
        isSubmitting = true;
        updateSubmitButton('feedbackSubmit', 'กำลังส่ง...', true);

        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (result.success) {
            showStatusMessage('✅ ส่ง feedback สำเร็จ', 'success');
            feedbackForm.reset();
            ratingSlider.value = 3;
            ratingValue.textContent = 3;
        } else {
            showStatusMessage(`❌ ${result.message}`, 'error');
            if (result.errors) displayValidationErrors(result.errors);
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาด', 'error');
        console.error(error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('feedbackSubmit', 'ส่งความคิดเห็น', false);
    }
}

async function loadContacts() {
    try {
        apiResults.textContent = 'Loading contacts...';
        const res = await fetch('/api/contact');
        const data = await res.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading contacts: ' + error.message;
    }
}

async function loadFeedbackStats() {
    try {
        apiResults.textContent = 'Loading feedback stats...';
        const res = await fetch('/api/feedback/stats');
        const data = await res.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading feedback stats: ' + error.message;
    }
}

async function loadAPIStatus() {
    try {
        apiResults.textContent = 'Loading API status...';
        const res = await fetch('/api/status');
        const data = await res.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading API status: ' + error.message;
    }
}

// Real-time validation example
function validateField(fieldName, value) {
    switch (fieldName) {
        case 'name': return { isValid: value.trim().length >= 2, message: 'Name at least 2 characters' };
        case 'email': return { isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Invalid email' };
        case 'subject': return { isValid: value.trim().length >= 5, message: 'Subject at least 5 characters' };
        case 'message': return { isValid: value.trim().length >= 10, message: 'Message at least 10 characters' };
        default: return { isValid: true, message: '' };
    }
}

contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', e => {
        const { isValid, message } = validateField(e.target.name, e.target.value);
        const errorDiv = document.getElementById(e.target.name + 'Error');
        if (!isValid) errorDiv.textContent = message;
        else errorDiv.textContent = '';
    });
});
