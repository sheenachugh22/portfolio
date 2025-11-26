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
    
    const resumeContent = document.createElement('div');
    resumeContent.id = 'pdf-resume-content';
    
    // Using simple block-level elements only - no flex, no complex CSS
    resumeContent.innerHTML = `
        <div style="width: 800px; padding: 50px 60px; font-family: Georgia, serif; font-size: 11px; line-height: 1.5; color: #222; background: #fff; box-sizing: border-box;">
            
            <!-- Header -->
            <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px;">
                <div style="font-size: 26px; font-weight: bold; letter-spacing: 2px; margin-bottom: 8px;">SHEENA CHUGH</div>
                <div style="font-size: 12px; color: #444; margin-bottom: 5px;">Senior Project Manager | Program Lead | Release Manager</div>
                <div style="font-size: 10px; color: #666;">Brampton, ON, Canada | sheenachugh92@gmail.com | +1 (647) 236-0034</div>
            </div>
            
            <!-- Executive Summary -->
            <div style="margin-bottom: 18px;">
                <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 3px; margin-bottom: 8px;">EXECUTIVE SUMMARY</div>
                <div style="text-align: justify;">Results-driven Project Manager with 9+ years of progressive experience leading enterprise programs across cloud infrastructure, MSP software, and application platforms. Deep expertise in Jira administration, process automation, and AI integration—reducing manual coordination by 40% and improving forecasting accuracy by 25%. Proven track record in client relationship management, cross-functional leadership, and implementing governance frameworks that ensure on-time, on-budget delivery.</div>
            </div>
            
            <!-- Core Competencies -->
            <div style="margin-bottom: 18px;">
                <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 3px; margin-bottom: 8px;">CORE COMPETENCIES</div>
                <div style="margin-bottom: 3px;">• Program & Portfolio Management | Agile/Scrum/Waterfall | Stakeholder Engagement | Release Management</div>
                <div style="margin-bottom: 3px;">• Risk & Issue Mitigation | Resource & Budget Planning | Jira & Confluence Administration | Process Automation</div>
                <div style="margin-bottom: 3px;">• Client Communication | Cross-Functional Leadership | Requirements Management | AI Integration | Vendor Management</div>
            </div>
            
            <!-- Professional Experience -->
            <div style="margin-bottom: 18px;">
                <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 3px; margin-bottom: 10px;">PROFESSIONAL EXPERIENCE</div>
                
                <!-- Job 1 -->
                <div style="margin-bottom: 14px;">
                    <div style="font-weight: bold; margin-bottom: 2px;">IDEALOGICAL GROUP – Markham, ON</div>
                    <div style="font-style: italic; margin-bottom: 5px;">Program & Project Manager | May 2024 – Present</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Lead strategic programs across MSP software and infrastructure, aligning with corporate objectives and KPIs</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Drive client engagement through regular calls; maintain communication channels for internal/external stakeholders</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Own project estimations for resources, timelines, and cost planning across multiple concurrent workstreams</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Pioneered AI integration into test case generation, directly mapping outputs to Jira for QA traceability</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Author requirement documents from client meetings; proactively resolve gaps and ambiguities</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Architected Jira dashboards, portfolios, and timelines providing visibility to 50+ stakeholders</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Designed 9+ workflow automations, reducing manual coordination by 40% and improving accuracy by 25%</div>
                </div>
                
                <!-- Job 2 -->
                <div style="margin-bottom: 14px;">
                    <div style="font-weight: bold; margin-bottom: 2px;">TESTINGXPERTS – Remote</div>
                    <div style="font-style: italic; margin-bottom: 5px;">Project Manager / Coordinator | Aug 2021 – Jan 2024</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Delivered 15+ enterprise projects across cloud, API, and web platforms with 98% on-time completion rate</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Managed client relationships through regular calls; served as primary contact for project communications</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Developed requirement documents from stakeholder meetings; resolved gaps to ensure clear project scope</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Led resource, timeline, and cost estimations ensuring accurate project scoping and budget adherence</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Facilitated Agile ceremonies, sprint planning, and executive reporting for global cross-functional teams</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Implemented governance frameworks and change control processes, reducing rework by 30%</div>
                </div>
                
                <!-- Job 3 -->
                <div style="margin-bottom: 14px;">
                    <div style="font-weight: bold; margin-bottom: 2px;">SEASIA INFOTECH – India</div>
                    <div style="font-style: italic; margin-bottom: 5px;">Associate Project Manager | May 2019 – Aug 2021</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Managed project planning and execution for large-scale healthcare and financial services programs</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Cultivated client relationships through proactive communication across full project lifecycles</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Conducted resource and timeline estimations; documented detailed requirements from stakeholder sessions</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Introduced reporting templates increasing visibility and reducing follow-up delays by 40%</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Automated 150+ workflows, reducing manual effort by 60% and improving team productivity</div>
                </div>
                
                <!-- Job 4 -->
                <div style="margin-bottom: 14px;">
                    <div style="font-weight: bold; margin-bottom: 2px;">TECH MAHINDRA – India</div>
                    <div style="font-style: italic; margin-bottom: 5px;">Project Coordinator | Aug 2016 – Apr 2019</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Supported deployment programs for national utility and telecom projects ensuring zero-downtime releases</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Maintained communication channels with internal teams and external vendors for seamless coordination</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Coordinated 20+ monthly deployments with detailed playbooks, readiness packs, and rollback plans</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Created dashboards and reports improving decision-making speed by 25%</div>
                    <div style="margin-bottom: 3px; padding-left: 15px;">• Developed automation scripts reducing incident resolution time by 30%</div>
                </div>
            </div>
        </div>
        
        <!-- PAGE 2 -->
        <div style="width: 800px; padding: 50px 60px; font-family: Georgia, serif; font-size: 11px; line-height: 1.5; color: #222; background: #fff; box-sizing: border-box;">
            
            <!-- Key Achievements -->
            <div style="margin-bottom: 18px;">
                <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 3px; margin-bottom: 8px;">KEY ACHIEVEMENTS</div>
                <div style="margin-bottom: 3px;">• 40% Reduction in manual coordination through Jira automation implementation</div>
                <div style="margin-bottom: 3px;">• 25% Improvement in project forecasting accuracy via story point tracking system</div>
                <div style="margin-bottom: 3px;">• 98% On-time Delivery rate across 15+ enterprise projects</div>
                <div style="margin-bottom: 3px;">• Pioneered AI Integration for automated test case generation with Jira mapping</div>
                <div style="margin-bottom: 3px;">• 50+ Stakeholders actively using real-time dashboards for project visibility</div>
            </div>
            
            <!-- Technical Expertise -->
            <div style="margin-bottom: 18px;">
                <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 3px; margin-bottom: 8px;">TECHNICAL EXPERTISE</div>
                <div style="margin-bottom: 3px;"><strong>PM Tools:</strong> Jira (Administration & Automation), Confluence, Microsoft Project, Azure DevOps, ServiceNow</div>
                <div style="margin-bottom: 3px;"><strong>Automation:</strong> Jira Workflows, Excel VBA/Macros, AI-driven Test Generation, Process Scripting</div>
                <div style="margin-bottom: 3px;"><strong>Collaboration:</strong> Slack, Microsoft Teams, SharePoint, Git/GitHub</div>
                <div style="margin-bottom: 3px;"><strong>Methodologies:</strong> Agile, Scrum, Kanban, Waterfall, SDLC, SAFe</div>
            </div>
            
            <!-- Education -->
            <div style="margin-bottom: 18px;">
                <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 3px; margin-bottom: 8px;">EDUCATION</div>
                <div style="margin-bottom: 5px;"><strong>Master of Computer Applications (MCA)</strong> – Indira Gandhi National Open University, 2017–2021</div>
                <div><strong>Bachelor of Science, Computer Science</strong> – Kurukshetra University, 2013–2016</div>
            </div>
            
            <!-- Certifications -->
            <div style="margin-bottom: 10px;">
                <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 3px; margin-bottom: 8px;">CERTIFICATIONS</div>
                <div style="margin-bottom: 3px;">• ISTQB Certified Tester – Advanced Level Test Management</div>
                <div>• Business Analyst Certification</div>
            </div>
            
        </div>
    `;
    
    document.body.appendChild(resumeContent);
    
    const opt = {
        margin: 0,
        filename: 'Sheena_Chugh_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(resumeContent).save().then(() => {
        document.body.removeChild(resumeContent);
        showNotification('Resume downloaded successfully!');
    }).catch(err => {
        document.body.removeChild(resumeContent);
        console.error('Error generating PDF:', err);
        showNotification('Error generating PDF. Please try again.');
    });
}

