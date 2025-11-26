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
    resumeContent.id = 'resume-pdf-content';
    
    // Fixed width matching A4 at 72dpi (595px) with padding accounted for
    resumeContent.style.cssText = 'position:fixed;top:0;left:0;width:595px;background:#fff;color:#000;font-family:Georgia,serif;font-size:9px;line-height:1.35;padding:40px 45px;box-sizing:border-box;z-index:99999;';
    
    resumeContent.innerHTML = `
<div style="text-align:center;border-bottom:2px solid #333;padding-bottom:10px;margin-bottom:12px;">
<div style="font-size:20px;font-weight:bold;letter-spacing:2px;margin-bottom:4px;">SHEENA CHUGH</div>
<div style="font-size:10px;color:#444;margin-bottom:3px;">Senior Project Manager | Program Lead | Release Manager</div>
<div style="font-size:8px;color:#555;">Brampton, ON, Canada | sheenachugh92@gmail.com | +1 (647) 236-0034</div>
</div>

<div style="margin-bottom:10px;">
<div style="font-size:10px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:6px;">EXECUTIVE SUMMARY</div>
<div style="text-align:justify;">Results-driven Project Manager with 9+ years of progressive experience leading enterprise programs across cloud infrastructure, MSP software, and application platforms. Deep expertise in Jira administration, process automation, and AI integration—reducing manual coordination by 40% and improving forecasting accuracy by 25%. Proven track record in client relationship management, cross-functional leadership, and governance frameworks ensuring on-time, on-budget delivery.</div>
</div>

<div style="margin-bottom:10px;">
<div style="font-size:10px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:6px;">CORE COMPETENCIES</div>
<div style="margin-bottom:2px;">• Program & Portfolio Management • Agile/Scrum/Waterfall • Stakeholder Engagement • Release Management</div>
<div style="margin-bottom:2px;">• Risk & Issue Mitigation • Resource & Budget Planning • Jira & Confluence Administration • Process Automation</div>
<div>• Client Communication • Cross-Functional Leadership • Requirements Management • AI Integration</div>
</div>

<div style="margin-bottom:10px;">
<div style="font-size:10px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:6px;">PROFESSIONAL EXPERIENCE</div>

<div style="margin-bottom:8px;">
<div style="font-weight:bold;">IDEALOGICAL GROUP – Markham, ON</div>
<div style="font-style:italic;margin-bottom:3px;">Program & Project Manager | May 2024 – Present</div>
<div style="padding-left:10px;margin-bottom:1px;">• Lead strategic programs across MSP software and infrastructure, aligning with corporate objectives</div>
<div style="padding-left:10px;margin-bottom:1px;">• Drive client engagement; maintain communication channels for internal/external stakeholders</div>
<div style="padding-left:10px;margin-bottom:1px;">• Own project estimations for resources, timelines, and cost planning across workstreams</div>
<div style="padding-left:10px;margin-bottom:1px;">• Pioneered AI integration into test case generation, mapping outputs to Jira for QA traceability</div>
<div style="padding-left:10px;margin-bottom:1px;">• Author requirement documents from client meetings; resolve gaps and ambiguities</div>
<div style="padding-left:10px;margin-bottom:1px;">• Architected Jira dashboards, portfolios, timelines for 50+ stakeholders</div>
<div style="padding-left:10px;">• Designed 9+ workflow automations, reducing manual coordination by 40%</div>
</div>

<div style="margin-bottom:8px;">
<div style="font-weight:bold;">TESTINGXPERTS – Remote</div>
<div style="font-style:italic;margin-bottom:3px;">Project Manager / Coordinator | Aug 2021 – Jan 2024</div>
<div style="padding-left:10px;margin-bottom:1px;">• Delivered 15+ enterprise projects across cloud, API, web platforms with 98% on-time completion</div>
<div style="padding-left:10px;margin-bottom:1px;">• Managed client relationships; served as primary contact for project communications</div>
<div style="padding-left:10px;margin-bottom:1px;">• Developed requirement documents from stakeholder meetings; resolved scope gaps</div>
<div style="padding-left:10px;margin-bottom:1px;">• Led resource, timeline, cost estimations ensuring accurate scoping and budget adherence</div>
<div style="padding-left:10px;margin-bottom:1px;">• Facilitated Agile ceremonies, sprint planning, executive reporting for global teams</div>
<div style="padding-left:10px;">• Implemented governance frameworks, reducing rework by 30%</div>
</div>

<div style="margin-bottom:8px;">
<div style="font-weight:bold;">SEASIA INFOTECH – India</div>
<div style="font-style:italic;margin-bottom:3px;">Associate Project Manager | May 2019 – Aug 2021</div>
<div style="padding-left:10px;margin-bottom:1px;">• Managed project planning for large-scale healthcare and financial services programs</div>
<div style="padding-left:10px;margin-bottom:1px;">• Cultivated client relationships through proactive communication across lifecycles</div>
<div style="padding-left:10px;margin-bottom:1px;">• Conducted resource/timeline estimations; documented requirements from stakeholder sessions</div>
<div style="padding-left:10px;margin-bottom:1px;">• Introduced reporting templates increasing visibility, reducing follow-up delays by 40%</div>
<div style="padding-left:10px;">• Automated 150+ workflows, reducing manual effort by 60%</div>
</div>

<div style="margin-bottom:8px;">
<div style="font-weight:bold;">TECH MAHINDRA – India</div>
<div style="font-style:italic;margin-bottom:3px;">Project Coordinator | Aug 2016 – Apr 2019</div>
<div style="padding-left:10px;margin-bottom:1px;">• Supported deployment programs for utility and telecom projects ensuring zero-downtime</div>
<div style="padding-left:10px;margin-bottom:1px;">• Maintained communication channels with internal teams and external vendors</div>
<div style="padding-left:10px;margin-bottom:1px;">• Coordinated 20+ monthly deployments with playbooks and readiness packs</div>
<div style="padding-left:10px;margin-bottom:1px;">• Created dashboards improving decision-making speed by 25%</div>
<div style="padding-left:10px;">• Developed automation scripts reducing incident resolution time by 30%</div>
</div>
</div>

<div style="margin-bottom:10px;">
<div style="font-size:10px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:6px;">KEY ACHIEVEMENTS</div>
<div style="padding-left:10px;margin-bottom:1px;">• 40% Reduction in manual coordination through Jira automation</div>
<div style="padding-left:10px;margin-bottom:1px;">• 25% Improvement in forecasting accuracy via story point tracking</div>
<div style="padding-left:10px;margin-bottom:1px;">• 98% On-time Delivery rate across 15+ enterprise projects</div>
<div style="padding-left:10px;margin-bottom:1px;">• Pioneered AI Integration for automated test case generation</div>
<div style="padding-left:10px;">• 50+ Stakeholders using real-time dashboards for visibility</div>
</div>

<div style="margin-bottom:10px;">
<div style="font-size:10px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:6px;">TECHNICAL EXPERTISE</div>
<div style="margin-bottom:2px;"><b>PM Tools:</b> Jira (Admin), Confluence, MS Project, Azure DevOps, ServiceNow</div>
<div style="margin-bottom:2px;"><b>Automation:</b> Jira Workflows, Excel VBA, AI-driven Test Generation, Scripting</div>
<div style="margin-bottom:2px;"><b>Collaboration:</b> Slack, Microsoft Teams, SharePoint, Git/GitHub</div>
<div><b>Methodologies:</b> Agile, Scrum, Kanban, Waterfall, SDLC, SAFe</div>
</div>

<div style="margin-bottom:10px;">
<div style="font-size:10px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:6px;">EDUCATION</div>
<div style="margin-bottom:3px;"><b>Master of Computer Applications (MCA)</b> – IGNOU, 2017–2021</div>
<div><b>Bachelor of Science, Computer Science</b> – Kurukshetra University, 2013–2016</div>
</div>

<div>
<div style="font-size:10px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:6px;">CERTIFICATIONS</div>
<div style="padding-left:10px;margin-bottom:1px;">• ISTQB Certified Tester – Advanced Level Test Management</div>
<div style="padding-left:10px;">• Business Analyst Certification</div>
</div>
    `;
    
    document.body.appendChild(resumeContent);
    
    // Use simpler options for mobile compatibility
    html2pdf()
        .set({
            margin: 0,
            filename: 'Sheena_Chugh_Resume.pdf',
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: { 
                scale: 2,
                width: 595,
                windowWidth: 595
            },
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
        })
        .from(resumeContent)
        .save()
        .then(() => {
            document.body.removeChild(resumeContent);
            showNotification('Resume downloaded successfully!');
        })
        .catch(err => {
            document.body.removeChild(resumeContent);
            console.error('Error generating PDF:', err);
            showNotification('Error generating PDF. Please try again.');
        });
}

