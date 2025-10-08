// Contact form validation
const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];

    // Name
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
        errors.push('Name must be a string between 2 and 100 characters.');
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Email must be valid.');
    }

    // Subject
    if (!subject || subject.trim().length < 5 || subject.trim().length > 200) {
        errors.push('Subject must be between 5 and 200 characters.');
    }

    // Message
    if (!message || message.trim().length < 10 || message.trim().length > 1000) {
        errors.push('Message must be between 10 and 1000 characters.');
    }

    // Phone (optional)
    const phoneRegex = /^[0-9]{9,10}$/;
    if (phone && !phoneRegex.test(phone)) {
        errors.push('Phone must be 9-10 digits.');
    }

    // Company (optional)
    if (company && company.length > 100) {
        errors.push('Company cannot exceed 100 characters.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    // Sanitize
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.subject = subject.trim();
    req.body.message = message.trim();

    next();
};

// Feedback validation
const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];

    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
        errors.push('Rating must be a number between 1 and 5.');
    }

    if (!comment || comment.trim().length < 5 || comment.trim().length > 500) {
        errors.push('Comment must be between 5 and 500 characters.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push('Email must be valid.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    next();
};

module.exports = { validateContact, validateFeedback };
