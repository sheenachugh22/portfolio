// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Function to set theme
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

function setMenuState(isOpen) {
    if (navMenu) {
        navMenu.classList.toggle('active', isOpen);
    }
    document.body.classList.toggle('menu-open', isOpen);
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    }
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpening = !navMenu.classList.contains('active');
        setMenuState(isOpening);
    });
}

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            setMenuState(false);
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        setMenuState(false);
    }
});

// Contact Button Click Event
const contactBtn = document.getElementById('contactBtn');
contactBtn.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Project Button Click Events
const projectButtons = document.querySelectorAll('.project-button');
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');

// Project details based on resume experience
const projectDetails = {
    1: {
        title: 'Program & Project Lead — Idealogical Group',
        description: 'Lead strategic programs across MSP software and infrastructure initiatives, ensuring alignment with corporate objectives and measurable KPIs. Manage cross-functional project delivery with clear milestones, risks, dependencies, and stakeholder communications. Built Jira dashboards, portfolios, and timelines used by 50+ stakeholders for real-time project visibility. Designed 9+ Jira automations reducing manual coordination by 40% and improving planning accuracy by 25%. Implemented story point tracking for sprint velocity and forecasting. Manage Confluence spaces for documentation and cross-team collaboration.'
    },
    2: {
        title: 'Project Manager / Coordinator — TestingXperts',
        description: 'Managed delivery of 15+ enterprise projects with 98% on-time completion across cloud, API, and web platforms. Facilitated Agile ceremonies, sprint planning, and executive updates for global cross-functional teams. Implemented project governance models and reporting frameworks to track deliverables and risk indicators. Enhanced stakeholder communication and change control, reducing rework by 30%.'
    },
    3: {
        title: 'Associate Project Manager — Seasia Infotech',
        description: 'Coordinated project planning and execution for large-scale healthcare and finance programs. Monitored schedules, deliverables, and budgets ensuring full compliance with SLAs and quality standards. Introduced reporting templates that increased visibility and reduced follow-up delays by 40%. Automated 150+ workflows reducing manual effort by 60%. Supported process improvement initiatives enhancing delivery predictability and client satisfaction.'
    },
    4: {
        title: 'Project Coordinator — Tech Mahindra',
        description: 'Supported deployment programs for national utility and telecom projects ensuring zero downtime. Coordinated between onshore and offshore teams to maintain delivery timelines and stakeholder alignment. Created project reports and dashboards improving decision-making speed by 25%. Facilitated documentation, change management, and risk tracking. Built automation scripts reducing incident resolution time by 30%.'
    }
};

function openProjectModal(project) {
    modalTitle.textContent = project.title;
    modalDescription.innerHTML = project.description
        .split('. ')
        .map(sentence => sentence.trim() ? `<p>${sentence.trim()}${sentence.trim().endsWith('.') ? '' : '.'}</p>` : '')
        .join('');
    modal.classList.add('open');
    document.body.classList.add('modal-open');
}

function closeProjectModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
}

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project) {
            openProjectModal(project);
        }
    });
});

// Close Modal
closeModal.addEventListener('click', closeProjectModal);

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Copy Email Button
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailElement = document.getElementById('email');

copyEmailBtn.addEventListener('click', () => {
    const email = emailElement.textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Show notification
        showNotification('Email copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy email:', err);
        showNotification('Failed to copy email');
    });
});

// Show Notification Function
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards for animation
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe automation cards for animation
document.querySelectorAll('.automation-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Download Resume PDF
const downloadResumeBtn = document.getElementById('downloadResumeBtn');

downloadResumeBtn.addEventListener('click', () => {
    generateResumePDF();
});

function generateResumePDF() {
    // Show loading notification
    showNotification('Generating PDF resume...');
    
    // Create a temporary div with resume content
    const resumeContent = document.createElement('div');
    resumeContent.style.width = '210mm';
    resumeContent.style.padding = '20mm';
    resumeContent.style.backgroundColor = '#ffffff';
    resumeContent.style.color = '#000000';
    resumeContent.style.fontFamily = 'Arial, sans-serif';
    resumeContent.style.lineHeight = '1.6';
    
    resumeContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #00d4ff; padding-bottom: 20px;">
            <h1 style="color: #0a192f; font-size: 32px; margin-bottom: 10px;">Sheena Chugh</h1>
            <p style="color: #0052CC; font-size: 14px; margin: 5px 0; font-weight: bold;">Project Manager | Program Lead | Release Manager</p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Brampton, Ontario, Canada · sheenachugh92@gmail.com · +1 (647) 236-0034</p>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Career Summary</h2>
            <ul style="list-style: none; padding-left: 0;">
                <li style="margin-bottom: 8px;">• Strategic Project Manager with 9+ years delivering enterprise programs across technology and business domains.</li>
                <li style="margin-bottom: 8px;">• Expert in Agile execution, end-to-end delivery, and stakeholder management to achieve measurable business outcomes.</li>
                <li style="margin-bottom: 8px;">• Strong expertise in Jira administration and process automation, reducing manual effort by 40%.</li>
                <li style="margin-bottom: 8px;">• Proven ability to streamline operations, optimize resources, and improve cross-functional collaboration.</li>
            </ul>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Core Competencies</h2>
            <ul style="list-style: none; padding-left: 0; columns: 2; column-gap: 20px;">
                <li style="margin-bottom: 6px;">• Project &amp; Program Management</li>
                <li style="margin-bottom: 6px;">• Agile / Scrum / SDLC</li>
                <li style="margin-bottom: 6px;">• Stakeholder Management</li>
                <li style="margin-bottom: 6px;">• Risk &amp; Issue Management</li>
                <li style="margin-bottom: 6px;">• Release Management</li>
                <li style="margin-bottom: 6px;">• Cross-Functional Leadership</li>
                <li style="margin-bottom: 6px;">• Process Improvement</li>
                <li style="margin-bottom: 6px;">• Jira &amp; Confluence Administration</li>
            </ul>
        </div>

        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Jira &amp; Process Automation Skills</h2>
            <ul style="list-style: none; padding-left: 0;">
                <li style="margin-bottom: 5px;">• Built Jira dashboards, portfolios, and timelines for project visibility across 50+ stakeholders</li>
                <li style="margin-bottom: 5px;">• Designed 9+ Jira automations for ticket workflows and deployment triggers</li>
                <li style="margin-bottom: 5px;">• Implemented story point tracking improving forecasting accuracy by 25%</li>
                <li style="margin-bottom: 5px;">• Manage Confluence spaces for documentation and collaboration</li>
                <li style="margin-bottom: 5px;">• Created Excel macros for automated financial calculations</li>
            </ul>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Professional Experience</h2>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Idealogical Group – Markham, ON</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Program &amp; Project Lead | May 2024 – Present</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Lead strategic programs ensuring alignment with corporate objectives and measurable KPIs</li>
                    <li style="margin-bottom: 5px;">• Manage cross-functional delivery with clear milestones, risks, and stakeholder communications</li>
                    <li style="margin-bottom: 5px;">• Built Jira dashboards, portfolios, and timelines used by 50+ stakeholders</li>
                    <li style="margin-bottom: 5px;">• Designed 9+ Jira automations reducing manual coordination by 40%</li>
                    <li style="margin-bottom: 5px;">• Improved forecasting accuracy by 25% with story point tracking</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">TestingXperts – Remote (India)</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Project Manager / Coordinator | Aug 2021 – Jan 2024</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Managed delivery of 15+ enterprise projects with 98% on-time completion</li>
                    <li style="margin-bottom: 5px;">• Facilitated Agile ceremonies and sprint planning for global teams</li>
                    <li style="margin-bottom: 5px;">• Implemented governance models reducing rework by 30%</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Seasia Infotech – India</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Associate Project Manager | May 2019 – Aug 2021</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Coordinated project planning for healthcare and finance programs</li>
                    <li style="margin-bottom: 5px;">• Automated 150+ workflows reducing manual effort by 60%</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Tech Mahindra – India</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Project Coordinator | Aug 2016 – Apr 2019</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Coordinated 20+ monthly deployments with playbooks and readiness packs</li>
                    <li style="margin-bottom: 5px;">• Created automation scripts reducing incident resolution time by 30%</li>
                </ul>
            </div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Education</h2>
            <p style="margin-bottom: 8px;"><strong>Master of Computer Applications (MCA)</strong><br>Indira Gandhi National Open University (2017–2021)</p>
            <p style="margin-bottom: 8px;"><strong>Bachelor of Science, Computer Science</strong><br>Kurukshetra University (2013–2016)</p>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Certifications</h2>
            <p style="margin-bottom: 5px;">• ISTQB Advanced Level Test Management</p>
            <p style="margin-bottom: 5px;">• Business Analyst Certification</p>
        </div>
    `;
    
    // Append to body temporarily
    document.body.appendChild(resumeContent);
    
    // Generate PDF
    const opt = {
        margin: 0,
        filename: 'Sheena_Chugh_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(resumeContent).save().then(() => {
        // Remove temporary element
        document.body.removeChild(resumeContent);
        showNotification('Resume downloaded successfully!');
    }).catch(err => {
        document.body.removeChild(resumeContent);
        console.error('Error generating PDF:', err);
        showNotification('Error generating PDF. Please try again.');
    });
}

