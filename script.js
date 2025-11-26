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
    // Show loading notification
    showNotification('Generating PDF resume...');
    
    // Create a temporary div with resume content
    const resumeContent = document.createElement('div');
    resumeContent.style.width = '210mm';
    resumeContent.style.backgroundColor = '#ffffff';
    resumeContent.style.color = '#000000';
    resumeContent.style.fontFamily = 'Arial, sans-serif';
    resumeContent.style.fontSize = '11px';
    resumeContent.style.lineHeight = '1.5';
    
    resumeContent.innerHTML = `
        <style>
            .pdf-page { padding: 15mm 18mm; }
            .page-break { page-break-before: always; }
            .section-title { color: #0a192f; font-size: 14px; border-bottom: 2px solid #0052CC; padding-bottom: 4px; margin: 15px 0 10px 0; font-weight: bold; }
            .job-title { color: #0a192f; font-size: 12px; margin-bottom: 3px; font-weight: bold; }
            .job-meta { color: #555; font-size: 11px; margin-bottom: 6px; }
            .bullet { margin-bottom: 4px; padding-left: 12px; text-indent: -12px; }
            .two-col { columns: 2; column-gap: 25px; }
        </style>
        
        <div class="pdf-page">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 15px; border-bottom: 3px solid #0052CC; padding-bottom: 12px;">
                <h1 style="color: #0a192f; font-size: 26px; margin: 0 0 6px 0;">Sheena Chugh</h1>
                <p style="color: #0052CC; font-size: 12px; margin: 4px 0; font-weight: bold;">Project Manager | Program Lead | Release Manager</p>
                <p style="color: #555; font-size: 11px; margin: 4px 0;">Brampton, Ontario, Canada · sheenachugh92@gmail.com · +1 (647) 236-0034</p>
            </div>
            
            <!-- Career Summary -->
            <div class="section-title">Career Summary</div>
            <div class="bullet">• Strategic Project Manager with 9+ years delivering enterprise programs across cloud, infrastructure, and application platforms.</div>
            <div class="bullet">• Expert in Agile execution, end-to-end delivery, stakeholder management, and cross-functional leadership to achieve measurable business outcomes.</div>
            <div class="bullet">• Strong expertise in Jira administration, process automation, and AI integration, reducing manual effort by 40% and improving forecasting by 25%.</div>
            <div class="bullet">• Proven ability to drive client relationships, lead project estimations, write requirements, and maintain communication channels across stakeholders.</div>
            
            <!-- Core Competencies -->
            <div class="section-title">Core Competencies</div>
            <div class="two-col" style="margin-bottom: 12px;">
                <div class="bullet">• Project &amp; Program Management</div>
                <div class="bullet">• Agile / Scrum / SDLC</div>
                <div class="bullet">• Stakeholder Management</div>
                <div class="bullet">• Risk &amp; Issue Management</div>
                <div class="bullet">• Release Management</div>
                <div class="bullet">• Cross-Functional Leadership</div>
                <div class="bullet">• Process Improvement</div>
                <div class="bullet">• Jira &amp; Confluence Administration</div>
                <div class="bullet">• Client Communication &amp; Relations</div>
                <div class="bullet">• Resource &amp; Cost Estimation</div>
                <div class="bullet">• Requirements Documentation</div>
                <div class="bullet">• AI Integration &amp; Automation</div>
            </div>
            
            <!-- Technical Skills -->
            <div class="section-title">Technical &amp; Automation Skills</div>
            <div class="bullet">• Built Jira dashboards, portfolios, and timelines for real-time project visibility across 50+ stakeholders</div>
            <div class="bullet">• Designed 9+ Jira automations for ticket workflows, deployment triggers, and sprint tracking</div>
            <div class="bullet">• Introduced AI into test case generation with direct Jira mapping for seamless QA integration</div>
            <div class="bullet">• Implemented story point vs actual time tracking improving forecasting accuracy by 25%</div>
            <div class="bullet">• Manage Confluence spaces for documentation, runbooks, and cross-team collaboration</div>
            <div class="bullet">• Created Excel macros (VBA) for automated financial calculations and QA payment tracking</div>
            
            <!-- Professional Experience -->
            <div class="section-title">Professional Experience</div>
            
            <!-- Job 1 -->
            <div class="job-title">Idealogical Group – Markham, ON</div>
            <div class="job-meta"><strong>Program &amp; Project Manager</strong> | May 2024 – Present</div>
            <div class="bullet">• Lead strategic programs across MSP software and infrastructure initiatives, ensuring alignment with corporate objectives and measurable KPIs</div>
            <div class="bullet">• Drive client calls and maintain communication channels for internal and external stakeholders</div>
            <div class="bullet">• Lead project estimations for resources, timelines, and cost planning across multiple workstreams</div>
            <div class="bullet">• Introduced AI into test case generation workflows, directly mapping AI-generated test cases into Jira</div>
            <div class="bullet">• Write requirement documents based on client meetings; resolve requirement gaps and queries proactively</div>
            <div class="bullet">• Built Jira dashboards, portfolios, and timelines used by 50+ stakeholders for real-time visibility</div>
            <div class="bullet">• Designed 9+ Jira automations reducing manual coordination by 40% and improving planning accuracy by 25%</div>
            <div class="bullet">• Manage Confluence spaces for documentation, process guidelines, and cross-team collaboration</div>
        </div>
        
        <!-- Page 2 -->
        <div class="pdf-page page-break">
            <!-- Job 2 -->
            <div class="job-title">TestingXperts – Remote</div>
            <div class="job-meta"><strong>Project Manager / Coordinator</strong> | Aug 2021 – Jan 2024</div>
            <div class="bullet">• Managed delivery of 15+ enterprise projects across cloud, API, and web platforms with 98% on-time completion</div>
            <div class="bullet">• Drove client calls and maintained communication channels for internal and external stakeholders</div>
            <div class="bullet">• Wrote requirement documents based on meetings; resolved requirement gaps and queries efficiently</div>
            <div class="bullet">• Led project estimations for resources, time, and cost planning to ensure accurate project scoping</div>
            <div class="bullet">• Facilitated Agile ceremonies, sprint planning, and executive updates for global cross-functional teams</div>
            <div class="bullet">• Implemented project governance models and reporting frameworks to track deliverables and risk indicators</div>
            <div class="bullet">• Enhanced stakeholder communication and change control processes, reducing rework by 30%</div>
            
            <!-- Job 3 -->
            <div class="job-title" style="margin-top: 18px;">Seasia Infotech – India</div>
            <div class="job-meta"><strong>Associate Project Manager</strong> | May 2019 – Aug 2021</div>
            <div class="bullet">• Coordinated project planning and execution for large-scale healthcare and finance programs</div>
            <div class="bullet">• Drove client communications and maintained stakeholder relationships across project lifecycles</div>
            <div class="bullet">• Conducted project estimations for resources and timelines; documented requirements from stakeholder meetings</div>
            <div class="bullet">• Monitored schedules, deliverables, and budgets ensuring full compliance with SLAs and quality standards</div>
            <div class="bullet">• Introduced reporting templates that increased visibility and reduced follow-up delays by 40%</div>
            <div class="bullet">• Automated 150+ workflows reducing manual effort by 60% and improving team productivity</div>
            <div class="bullet">• Supported process improvement initiatives enhancing delivery predictability and client satisfaction</div>
            
            <!-- Job 4 -->
            <div class="job-title" style="margin-top: 18px;">Tech Mahindra – India</div>
            <div class="job-meta"><strong>Project Coordinator</strong> | Aug 2016 – Apr 2019</div>
            <div class="bullet">• Supported deployment programs for national utility and telecom projects ensuring zero downtime</div>
            <div class="bullet">• Maintained communication channels with internal teams and external vendors for deployment coordination</div>
            <div class="bullet">• Resolved requirement gaps and queries; documented project requirements and change requests</div>
            <div class="bullet">• Coordinated between onshore and offshore teams to maintain delivery timelines and stakeholder alignment</div>
            <div class="bullet">• Coordinated 20+ monthly deployments with detailed playbooks and readiness packs</div>
            <div class="bullet">• Created project reports and dashboards improving decision-making speed by 25%</div>
            <div class="bullet">• Facilitated documentation, change management, and risk tracking across projects</div>
            <div class="bullet">• Built automation scripts reducing incident resolution time by 30%</div>
            
            <!-- Key Achievements -->
            <div class="section-title" style="margin-top: 18px;">Key Achievements &amp; Impact</div>
            <div class="bullet">• <strong>40% Reduction</strong> in manual coordination through Jira automation implementation</div>
            <div class="bullet">• <strong>25% Improvement</strong> in project forecasting accuracy via story point tracking</div>
            <div class="bullet">• <strong>98% On-time Delivery</strong> rate across 15+ enterprise projects</div>
            <div class="bullet">• <strong>30% Reduction</strong> in rework through improved stakeholder communication</div>
            <div class="bullet">• <strong>50+ Stakeholders</strong> using dashboards for real-time project visibility</div>
            <div class="bullet">• <strong>AI Integration</strong> for test case generation with direct Jira mapping</div>
        </div>
        
        <!-- Page 3 -->
        <div class="pdf-page page-break">
            <!-- Education -->
            <div class="section-title">Education</div>
            <p style="margin: 0 0 8px 0;"><strong>Master of Computer Applications (MCA)</strong><br>Indira Gandhi National Open University (2017–2021)</p>
            <p style="margin: 0 0 15px 0;"><strong>Bachelor of Science, Computer Science</strong><br>Kurukshetra University (2013–2016)</p>
            
            <!-- Certifications -->
            <div class="section-title">Certifications</div>
            <div class="bullet">• ISTQB Certified Tester – Advanced Level Test Management</div>
            <div class="bullet">• Business Analyst Certification</div>
            
            <!-- Tools & Technologies -->
            <div class="section-title">Tools &amp; Technologies</div>
            <div class="two-col">
                <div class="bullet">• Jira (Administration &amp; Automation)</div>
                <div class="bullet">• Confluence</div>
                <div class="bullet">• Microsoft Project</div>
                <div class="bullet">• Excel (Macros/VBA)</div>
                <div class="bullet">• Azure DevOps</div>
                <div class="bullet">• ServiceNow</div>
                <div class="bullet">• Slack / Teams</div>
                <div class="bullet">• Git / GitHub</div>
            </div>
            
            <!-- Additional Highlights -->
            <div class="section-title">Additional Highlights</div>
            <div class="bullet">• <strong>AI-Driven Processes:</strong> Pioneered AI integration for test case generation, automating quality assurance workflows and improving test coverage</div>
            <div class="bullet">• <strong>Client Leadership:</strong> Lead client calls, manage expectations, and serve as primary point of contact for project communications</div>
            <div class="bullet">• <strong>Resource Planning:</strong> Expert in project estimations covering resources, timelines, costs, and capacity planning</div>
            <div class="bullet">• <strong>Requirements Management:</strong> Write detailed requirement documents from meetings; bridge gaps between stakeholders and development teams</div>
            <div class="bullet">• <strong>Communication Excellence:</strong> Maintain robust communication channels for internal teams and external stakeholders</div>
            <div class="bullet">• <strong>Problem Resolution:</strong> Proactively identify and resolve requirement gaps, queries, and project blockers</div>
        </div>
    `;
    
    // Append to body temporarily (hidden)
    resumeContent.style.position = 'absolute';
    resumeContent.style.left = '-9999px';
    document.body.appendChild(resumeContent);
    
    // Generate PDF with page break support
    const opt = {
        margin: 0,
        filename: 'Sheena_Chugh_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], before: '.page-break' }
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

