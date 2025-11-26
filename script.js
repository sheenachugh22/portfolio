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
        title: 'Program & Project Manager — Idealogical Group',
        description: 'Lead strategic programs across MSP software and infrastructure initiatives, ensuring alignment with corporate objectives and measurable KPIs. Drive client calls and maintain communication channels for internal and external stakeholders. Lead project estimations for resources, timelines, and cost planning. Introduced AI into test case generation with direct Jira mapping for seamless QA integration. Write requirement documents based on meetings and proactively resolve requirement gaps and queries. Built Jira dashboards, portfolios, and timelines used by 50+ stakeholders for real-time project visibility. Designed 9+ Jira automations reducing manual coordination by 40% and improving planning accuracy by 25%.'
    },
    2: {
        title: 'Project Manager / Coordinator — TestingXperts',
        description: 'Managed delivery of 15+ enterprise projects with 98% on-time completion across cloud, API, and web platforms. Drove client calls and maintained communication channels for internal and external stakeholders. Wrote requirement documents based on meetings and efficiently resolved requirement gaps and queries. Led project estimations for resources, time, and cost planning. Facilitated Agile ceremonies, sprint planning, and executive updates for global cross-functional teams. Implemented project governance models and reporting frameworks. Enhanced stakeholder communication and change control, reducing rework by 30%.'
    },
    3: {
        title: 'Associate Project Manager — Seasia Infotech',
        description: 'Coordinated project planning and execution for large-scale healthcare and finance programs. Drove client communications and maintained stakeholder relationships across project lifecycles. Conducted project estimations for resources and timelines; documented requirements from stakeholder meetings. Monitored schedules, deliverables, and budgets ensuring full compliance with SLAs and quality standards. Introduced reporting templates that increased visibility and reduced follow-up delays by 40%. Automated 150+ workflows reducing manual effort by 60%.'
    },
    4: {
        title: 'Project Coordinator — Tech Mahindra',
        description: 'Supported deployment programs for national utility and telecom projects ensuring zero downtime. Maintained communication channels with internal teams and external vendors. Resolved requirement gaps and queries; documented project requirements and change requests. Coordinated between onshore and offshore teams to maintain delivery timelines and stakeholder alignment. Coordinated 20+ monthly deployments with detailed playbooks and readiness packs. Created project reports and dashboards improving decision-making speed by 25%. Built automation scripts reducing incident resolution time by 30%.'
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
    showNotification('Generating PDF resume...');
    
    // Create an iframe for better cross-browser/mobile compatibility
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.left = '-9999px';
    printFrame.style.width = '210mm';
    printFrame.style.height = '297mm';
    document.body.appendChild(printFrame);
    
    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @page { size: A4; margin: 15mm 18mm; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Georgia, 'Times New Roman', serif; 
            font-size: 10.5pt; 
            line-height: 1.4; 
            color: #222; 
            background: #fff;
            padding: 0;
        }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 12px; margin-bottom: 16px; }
        .name { font-size: 22pt; font-weight: bold; letter-spacing: 2px; margin-bottom: 6px; }
        .title { font-size: 11pt; color: #444; margin-bottom: 4px; }
        .contact { font-size: 9pt; color: #555; }
        .section { margin-bottom: 14px; }
        .section-title { font-size: 11pt; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 2px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
        .summary { text-align: justify; }
        .competencies { margin-bottom: 4px; }
        .job { margin-bottom: 12px; }
        .job-header { font-weight: bold; margin-bottom: 1px; }
        .job-title { font-style: italic; margin-bottom: 4px; }
        .bullet { padding-left: 14px; margin-bottom: 2px; }
        .two-col { margin-bottom: 3px; }
        .edu-item { margin-bottom: 4px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">SHEENA CHUGH</div>
        <div class="title">Senior Project Manager | Program Lead | Release Manager</div>
        <div class="contact">Brampton, ON, Canada | sheenachugh92@gmail.com | +1 (647) 236-0034</div>
    </div>
    
    <div class="section">
        <div class="section-title">Executive Summary</div>
        <div class="summary">Results-driven Project Manager with 9+ years of progressive experience leading enterprise programs across cloud infrastructure, MSP software, and application platforms. Deep expertise in Jira administration, process automation, and AI integration—reducing manual coordination by 40% and improving forecasting accuracy by 25%. Proven track record in client relationship management, cross-functional leadership, and governance frameworks ensuring on-time, on-budget delivery.</div>
    </div>
    
    <div class="section">
        <div class="section-title">Core Competencies</div>
        <div class="competencies">• Program & Portfolio Management • Agile/Scrum/Waterfall • Stakeholder Engagement • Release Management</div>
        <div class="competencies">• Risk & Issue Mitigation • Resource & Budget Planning • Jira & Confluence Administration • Process Automation</div>
        <div class="competencies">• Client Communication • Cross-Functional Leadership • Requirements Management • AI Integration</div>
    </div>
    
    <div class="section">
        <div class="section-title">Professional Experience</div>
        
        <div class="job">
            <div class="job-header">IDEALOGICAL GROUP – Markham, ON</div>
            <div class="job-title">Program & Project Manager | May 2024 – Present</div>
            <div class="bullet">• Lead strategic programs across MSP software and infrastructure, aligning with corporate objectives and KPIs</div>
            <div class="bullet">• Drive client engagement through regular calls; maintain communication channels for stakeholders</div>
            <div class="bullet">• Own project estimations for resources, timelines, and cost planning across multiple workstreams</div>
            <div class="bullet">• Pioneered AI integration into test case generation, directly mapping outputs to Jira for QA traceability</div>
            <div class="bullet">• Author requirement documents from client meetings; proactively resolve gaps and ambiguities</div>
            <div class="bullet">• Architected Jira dashboards, portfolios, and timelines providing visibility to 50+ stakeholders</div>
            <div class="bullet">• Designed 9+ workflow automations, reducing manual coordination by 40%</div>
        </div>
        
        <div class="job">
            <div class="job-header">TESTINGXPERTS – Remote</div>
            <div class="job-title">Project Manager / Coordinator | Aug 2021 – Jan 2024</div>
            <div class="bullet">• Delivered 15+ enterprise projects across cloud, API, and web platforms with 98% on-time completion</div>
            <div class="bullet">• Managed client relationships through regular calls; primary contact for project communications</div>
            <div class="bullet">• Developed requirement documents from stakeholder meetings; resolved gaps for clear project scope</div>
            <div class="bullet">• Led resource, timeline, and cost estimations ensuring accurate scoping and budget adherence</div>
            <div class="bullet">• Facilitated Agile ceremonies, sprint planning, and executive reporting for global teams</div>
            <div class="bullet">• Implemented governance frameworks and change control processes, reducing rework by 30%</div>
        </div>
        
        <div class="job">
            <div class="job-header">SEASIA INFOTECH – India</div>
            <div class="job-title">Associate Project Manager | May 2019 – Aug 2021</div>
            <div class="bullet">• Managed project planning and execution for large-scale healthcare and financial services programs</div>
            <div class="bullet">• Cultivated client relationships through proactive communication across project lifecycles</div>
            <div class="bullet">• Conducted resource and timeline estimations; documented requirements from stakeholder sessions</div>
            <div class="bullet">• Introduced reporting templates increasing visibility and reducing follow-up delays by 40%</div>
            <div class="bullet">• Automated 150+ workflows, reducing manual effort by 60%</div>
        </div>
        
        <div class="job">
            <div class="job-header">TECH MAHINDRA – India</div>
            <div class="job-title">Project Coordinator | Aug 2016 – Apr 2019</div>
            <div class="bullet">• Supported deployment programs for national utility and telecom projects ensuring zero-downtime</div>
            <div class="bullet">• Maintained communication channels with internal teams and external vendors</div>
            <div class="bullet">• Coordinated 20+ monthly deployments with detailed playbooks and readiness packs</div>
            <div class="bullet">• Created dashboards and reports improving decision-making speed by 25%</div>
            <div class="bullet">• Developed automation scripts reducing incident resolution time by 30%</div>
        </div>
    </div>
    
    <div class="section">
        <div class="section-title">Key Achievements</div>
        <div class="bullet">• 40% Reduction in manual coordination through Jira automation implementation</div>
        <div class="bullet">• 25% Improvement in project forecasting accuracy via story point tracking</div>
        <div class="bullet">• 98% On-time Delivery rate across 15+ enterprise projects</div>
        <div class="bullet">• Pioneered AI Integration for automated test case generation with Jira mapping</div>
        <div class="bullet">• 50+ Stakeholders actively using real-time dashboards for project visibility</div>
    </div>
    
    <div class="section">
        <div class="section-title">Technical Expertise</div>
        <div class="two-col"><strong>PM Tools:</strong> Jira (Admin & Automation), Confluence, MS Project, Azure DevOps, ServiceNow</div>
        <div class="two-col"><strong>Automation:</strong> Jira Workflows, Excel VBA/Macros, AI-driven Test Generation, Scripting</div>
        <div class="two-col"><strong>Collaboration:</strong> Slack, Microsoft Teams, SharePoint, Git/GitHub</div>
        <div class="two-col"><strong>Methodologies:</strong> Agile, Scrum, Kanban, Waterfall, SDLC, SAFe</div>
    </div>
    
    <div class="section">
        <div class="section-title">Education</div>
        <div class="edu-item"><strong>Master of Computer Applications (MCA)</strong> – Indira Gandhi National Open University, 2017–2021</div>
        <div class="edu-item"><strong>Bachelor of Science, Computer Science</strong> – Kurukshetra University, 2013–2016</div>
    </div>
    
    <div class="section">
        <div class="section-title">Certifications</div>
        <div class="bullet">• ISTQB Certified Tester – Advanced Level Test Management</div>
        <div class="bullet">• Business Analyst Certification</div>
    </div>
</body>
</html>
    `;
    
    // Write to iframe
    const doc = printFrame.contentDocument || printFrame.contentWindow.document;
    doc.open();
    doc.write(resumeHTML);
    doc.close();
    
    // Wait for content to render, then generate PDF
    setTimeout(() => {
        const opt = {
            margin: [15, 18, 15, 18],
            filename: 'Sheena_Chugh_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 794
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(doc.body).save().then(() => {
            document.body.removeChild(printFrame);
            showNotification('Resume downloaded successfully!');
        }).catch(err => {
            document.body.removeChild(printFrame);
            console.error('Error generating PDF:', err);
            showNotification('Error generating PDF. Please try again.');
        });
    }, 500);
}

