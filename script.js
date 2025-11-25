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
        title: 'Program & Release Lead — Idealogical Group',
        description: 'Lead release cycles across multiple MSP software and infrastructure initiatives, keeping product, engineering, and operations streams aligned. Manage readiness checkpoints, risk/issue logs, dependencies, and stakeholder communications to keep launches predictable. Built Jira and Confluence visibility dashboards that reduced planning conflicts by 25% and automated workflows that removed 40% of manual coordination work. Partner closely with QA to attach regression milestones and ensure deployment readiness for every release.'
    },
    2: {
        title: 'Release Coordinator & QA Lead — TestingXperts',
        description: 'Coordinated 2+ major product releases per cycle across cloud, API, and web platforms. Served as the connective tissue between engineering, QA, and business stakeholders to keep readiness signals transparent and risks escalated early. Introduced metrics-driven reporting to improve predictability, authored UAT scenarios to secure feature signoff, and led defect triage/post-release reviews that eliminated repeat incidents.'
    },
    3: {
        title: 'QA Analyst & Automation Engineer — Seasia Infotech',
        description: 'Automated more than 150 workflows to shorten release cycles and cut manual QA effort by 60%. Maintained weekly regression suites and coverage dashboards so product teams could ship confidently. Built API and functional test frameworks that hardened stability across healthcare and finance products.'
    },
    4: {
        title: 'QA & Deployment Analyst — Tech Mahindra',
        description: 'Supported 20+ monthly deployments for national utility platforms with zero downtime tolerances. Authored deployment playbooks, runbooks, and readiness documentation to improve rollout accuracy. Delivered automation scripts that reduced incident resolution time by 30% and drove RCA with engineering partners to prevent repeat release issues.'
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
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Program &amp; Product Release Lead</p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Brampton, Ontario, Canada · sheenachugh92@gmail.com · +1 (647) 236-0034</p>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Career Summary</h2>
            <ul style="list-style: none; padding-left: 0;">
                <li style="margin-bottom: 8px;">• Strategic Software Delivery &amp; Release Lead with 9+ years orchestrating enterprise-scale launches across cloud, infrastructure, and application portfolios.</li>
                <li style="margin-bottom: 8px;">• Expert in release governance, readiness checkpoints, and cross-functional leadership that keeps multi-stream programs synchronized.</li>
                <li style="margin-bottom: 8px;">• Skilled at building Jira/Confluence dashboards, metrics, and automation to bring data-backed visibility to planning, risk, and dependency calls.</li>
                <li style="margin-bottom: 8px;">• Known for aligning QA/UAT milestones, risk mitigation, and stakeholder communications so every deployment is auditable and adoption-ready.</li>
            </ul>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Core Competencies</h2>
            <ul style="list-style: none; padding-left: 0; columns: 2; column-gap: 20px;">
                <li style="margin-bottom: 6px;">• Release Management &amp; Readiness</li>
                <li style="margin-bottom: 6px;">• Enterprise Program Delivery</li>
                <li style="margin-bottom: 6px;">• Multi-Platform Delivery Coordination</li>
                <li style="margin-bottom: 6px;">• Governance, Metrics &amp; Reporting</li>
                <li style="margin-bottom: 6px;">• Agile / Scrum / SDLC</li>
                <li style="margin-bottom: 6px;">• Risk, Change &amp; Dependency Management</li>
                <li style="margin-bottom: 6px;">• Cross-Functional Leadership</li>
                <li style="margin-bottom: 6px;">• Jira &amp; Confluence – Dashboards &amp; Automation</li>
            </ul>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Professional Experience</h2>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Idealogical Group – Markham, ON</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Program &amp; Release Lead | May 2024 – Present</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Lead release cycles across multiple software and infrastructure initiatives ensuring cross-team alignment.</li>
                    <li style="margin-bottom: 5px;">• Manage readiness checkpoints, risks, dependencies, and stakeholder communication across delivery streams.</li>
                    <li style="margin-bottom: 5px;">• Built visibility dashboards using Jira/Confluence increasing transparency and reducing planning conflicts by 25%.</li>
                    <li style="margin-bottom: 5px;">• Created Jira automations reducing manual coordination effort by 40%.</li>
                    <li style="margin-bottom: 5px;">• Improved consistency across multi-stream releases through structured governance and tracking models.</li>
                    <li style="margin-bottom: 5px;">• Direct QA alignment with release milestones ensuring defect closure, regression validation, and deployment readiness.</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">TestingXperts – Remote (India)</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Release Coordinator &amp; QA Lead | Aug 2021 – Jan 2024</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Coordinated 2+ major product releases across cloud, API, and web platforms ensuring scope and timing alignment.</li>
                    <li style="margin-bottom: 5px;">• Acted as bridge between engineering, QA, and business teams for readiness and risk communication.</li>
                    <li style="margin-bottom: 5px;">• Introduced metrics-driven reporting improving predictability and early risk identification.</li>
                    <li style="margin-bottom: 5px;">• Wrote UAT scenarios and ensured feature-level validation to support business signoff.</li>
                    <li style="margin-bottom: 5px;">• Led defect triage and post-release reviews reducing repeat issues.</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Seasia Infotech – India</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>QA Analyst &amp; Automation Engineer | May 2019 – Aug 2021</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Automated 150+ workflows improving release cycle efficiency and reducing manual QA load by 60%.</li>
                    <li style="margin-bottom: 5px;">• Supported weekly release cycles by maintaining regression suites and coordinating test coverage.</li>
                    <li style="margin-bottom: 5px;">• Developed API and functional test frameworks improving stability across product versions.</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Tech Mahindra – India</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>QA &amp; Deployment Analyst | Aug 2016 – Apr 2019</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Supported 20+ monthly deployments for critical utility platforms ensuring zero downtime.</li>
                    <li style="margin-bottom: 5px;">• Prepared deployment playbooks and readiness documentation improving accuracy of rollouts.</li>
                    <li style="margin-bottom: 5px;">• Implemented automation scripts reducing incident resolution time by 30%.</li>
                    <li style="margin-bottom: 5px;">• Partnered with engineering teams to minimize release issues through structured RCA processes.</li>
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

