// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// View Projects Button
const viewProjectsBtn = document.getElementById('viewProjectsBtn');
if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', function() {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Contact Button
const contactBtn = document.getElementById('contactBtn');
if (contactBtn) {
    contactBtn.addEventListener('click', function() {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Download Resume Button
const downloadResumeBtn = document.getElementById('downloadResumeBtn');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function() {
        // Create a link to download the resume
        const link = document.createElement('a');
        link.href = 'Interview Prep & Resume.docx';
        link.download = 'Chockalingam_Resume.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show feedback
        showNotification('Resume download started!');
    });
}

// Send Email Button
const sendEmailBtn = document.getElementById('sendEmailBtn');
if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', function() {
        const email = 'rupeshsharma137@gmail.com';
        const subject = 'Portfolio Contact';
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
        window.location.href = mailtoLink;
    });
}

// Project details data
const projectDetails = {
    1: {
        title: 'Multi-Tenant Loan Lifecycle Platform',
        description: 'Designed and implemented core loan lifecycle services (Read/CUD/Bulk) on a multi-tenant platform powering end-to-end lending workflows built on Domain Driven Design (DDD). Improved API response times by 60% by redesigning the read service and optimizing queries. Enabled regulatory compliance and auditability features including transaction logs and change history. The platform supports complete loan lifecycle management from onboarding to disbursement and repayment.',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Domain Driven Design', 'Microservices', 'AWS']
    },
    2: {
        title: 'Business Rule Engine for Credit Decisions',
        description: 'Designed rule-driven workflows for real-time credit decisions using a Business Rule Engine (BRE). Worked on a credit scoring system based on user location and R models for advanced analytics. Automated data normalization processes, reducing turnaround time from 10 days to 2 days. Implemented database automation utilities, improving schema management and deployment efficiency. This system enables rapid credit decision-making with high accuracy.',
        tech: ['Java', 'Business Rules Engine', 'R Models', 'PostgreSQL', 'Automation', 'Data Processing']
    },
    3: {
        title: 'High-Performance Accounting Service',
        description: 'Developed an accounting service processing 800,000 records in under 30 minutes for reconciliation in agent incentive management in the insurance domain. Reduced cloud infrastructure costs by ~10%, optimizing RDS from 8xlarge to 2xlarge instances through query optimization and caching strategies. Led the automation of deployment pipelines, reducing deployment time by 80%. Formed an SRE team, defining responsibilities and ensuring system reliability.',
        tech: ['Java', 'AWS RDS', 'PostgreSQL', 'CI/CD', 'Docker', 'SRE', 'Performance Optimization']
    }
};

// View Project Details
function viewProject(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    
    if (modal && modalTitle && modalDescription && modalTech) {
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        
        // Clear and populate tech tags
        modalTech.innerHTML = '';
        project.tech.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            modalTech.appendChild(tag);
        });
        
        // Show modal
        modal.style.display = 'block';
    }
}

// Close Modal
const closeModal = document.querySelector('.close-modal');
if (closeModal) {
    closeModal.addEventListener('click', function() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
});

// Notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Initialize - show first section immediately
window.addEventListener('load', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

