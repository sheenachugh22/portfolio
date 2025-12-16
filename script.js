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

// Project details for BA/CSM/Account Manager/Pre-Sales profile
const projectDetails = {
    1: {
        title: 'Senior Business Analyst / Program Manager — Idealogical Group',
        description: 'Primary liaison between business stakeholders, vendors, and implementation teams for enterprise MSP software and infrastructure initiatives. Lead client discovery sessions, translating complex business needs into structured requirements and solution proposals. Manage end-to-end client relationships from pre-sales engagement through implementation and ongoing success. Create process mapping diagrams, user stories with acceptance criteria, and use cases to guide solution delivery. Architected Jira dashboards, portfolios, and real-time timelines reducing manual coordination by 40%. Pioneered AI integration into test case generation, demonstrating innovation in delivery quality improvement.'
    },
    2: {
        title: 'Business Analyst / Project Coordinator — TestingXperts',
        description: 'Managed client engagements and requirements gathering for enterprise testing projects across cloud, API, and web platforms. Conducted discovery workshops with clients to gather and prioritize business requirements. Developed BRDs, proposals, and functional specifications from stakeholder meetings; resolved scope gaps ensuring alignment with client goals. Owned client communication and escalation management throughout project lifecycle, ensuring satisfaction. Implemented governance frameworks reducing rework by 30% through improved requirements traceability.'
    },
    3: {
        title: 'Associate Business Analyst / Project Manager — Seasia Infotech',
        description: 'Managed business analysis and client relationships for large-scale healthcare and financial services programs, ensuring compliance with industry regulations. Served as primary client contact for requirements gathering, solution consulting, and ongoing relationship management. Conducted workflow observation sessions with clinical and operational teams to document current-state processes and identify improvement opportunities. Introduced reporting templates and process enhancements, increasing client visibility and reducing follow-up delays by 40%. Automated 150+ workflows, reducing manual effort by 60%.'
    },
    4: {
        title: 'Business Analyst / Project Coordinator — Tech Mahindra',
        description: 'Supported client deployments for utility and telecom projects, ensuring seamless transitions and client satisfaction. Maintained client communication channels and coordinated between internal teams and external vendors. Coordinated 20+ monthly deployments with detailed playbooks and readiness documentation. Created dashboards improving decision-making speed by 25% and providing real-time visibility to clients and stakeholders.'
    }
};

function openProjectModal(project) {
    modalTitle.textContent = project.title;
    modalDescription.innerHTML = project.description
        .split('. ')
        .map(sentence => sentence.trim() ? `<p>• ${sentence.trim()}${sentence.trim().endsWith('.') ? '' : '.'}</p>` : '')
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
    
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy email:', err);
        showNotification('Failed to copy email');
    });
});

// Show Notification Function
function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
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
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Add animation on scroll
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

// Observe fit items for animation
document.querySelectorAll('.fit-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
    observer.observe(item);
});

<<<<<<< HEAD
function generateResumePDF() {
    showNotification('Generating PDF resume...');
    
    // Create a visible container that will be captured
    const resumeContent = document.createElement('div');
    resumeContent.id = 'resume-pdf-content';
    resumeContent.style.cssText = 'position:relative;width:595px;background:#fff;color:#000;font-family:Georgia,serif;font-size:10px;line-height:1.4;padding:15px 40px;box-sizing:border-box;';
    
    // Use text nodes and proper escaping to avoid LaTeX conversion issues
    const createText = (text) => document.createTextNode(text);
    
    // Build the resume structure
    const header = document.createElement('div');
    header.style.cssText = 'text-align:center;border-bottom:2px solid #333;padding-bottom:10px;margin-bottom:15px;';
    header.innerHTML = '<div style="font-size:22px;font-weight:bold;letter-spacing:2px;margin-bottom:5px;">SHEENA CHUGH</div><div style="font-size:11px;color:#444;margin-bottom:3px;">Senior Project Manager | Program Lead | Release Manager</div><div style="font-size:9px;color:#555;">Brampton, ON, Canada | sheenachugh92@gmail.com | +1 (647) 236-0034</div><div style="font-size:9px;color:#0066cc;margin-top:3px;">sheenachugh22.github.io/portfolio</div>';
    
    const execSummary = document.createElement('div');
    execSummary.style.cssText = 'margin-bottom:12px;';
    execSummary.innerHTML = '<div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:7px;">EXECUTIVE SUMMARY</div><div style="text-align:justify;">Results-driven Project Manager with 9+ years of progressive experience leading enterprise programs across cloud infrastructure, MSP software, and application platforms. Deep expertise in Jira administration, process automation, and AI integration—reducing manual coordination by 40 percent and improving forecasting accuracy by 25 percent. Proven track record in client relationship management, cross-functional leadership, and governance frameworks ensuring on-time, on-budget delivery.</div>';
    
    const competencies = document.createElement('div');
    competencies.style.cssText = 'margin-bottom:12px;';
    competencies.innerHTML = '<div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:7px;">CORE COMPETENCIES</div><div style="margin-bottom:3px;">• Program & Portfolio Management • Agile/Scrum/Waterfall • Stakeholder Engagement • Release Management</div><div style="margin-bottom:3px;">• Risk & Issue Mitigation • Resource & Budget Planning • Jira & Confluence Administration • Process Automation</div><div>• Client Communication • Cross-Functional Leadership • Requirements Management • AI Integration</div>';
    
    const experience = document.createElement('div');
    experience.style.cssText = 'margin-bottom:12px;';
    experience.innerHTML = `
<div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:8px;">PROFESSIONAL EXPERIENCE</div>
=======
// Resume Modal Elements
const resumeModal = document.getElementById('resumeModal');
const resumePreviewContainer = document.getElementById('resumePreviewContainer');
const closeResumeModal = document.getElementById('closeResumeModal');
const confirmDownloadBtn = document.getElementById('confirmDownloadBtn');
const downloadResumeBtn = document.getElementById('downloadResumeBtn');
>>>>>>> 432cf76cc7616c340e2d599ed31ca7d58f656c40

// Generate Resume HTML for preview and download
function generateResumeHTML() {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.4; margin: 0.5in; color: #000; }
h1 { font-size: 20pt; text-align: center; margin: 0 0 5px 0; letter-spacing: 2px; }
.subtitle { text-align: center; font-size: 11pt; color: #444; margin-bottom: 5px; }
.contact { text-align: center; font-size: 10pt; color: #555; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #333; }
h2 { font-size: 11pt; font-weight: bold; border-bottom: 1px solid #333; margin: 15px 0 8px 0; padding-bottom: 3px; text-transform: uppercase; letter-spacing: 1px; }
.summary { text-align: justify; margin-bottom: 10px; }
.competencies { margin-bottom: 10px; }
.job { margin-bottom: 12px; }
.job-header { font-weight: bold; }
.job-location { float: right; font-weight: normal; color: #555; }
.job-title { font-style: italic; color: #444; margin-bottom: 5px; }
ul { margin: 5px 0; padding-left: 20px; }
li { margin-bottom: 3px; }
.two-col { display: table; width: 100%; }
.two-col > div { display: table-cell; width: 50%; vertical-align: top; }
</style>
</head>
<body>

<h1>SHEENA CHUGH</h1>
<div class="subtitle">Business Analyst | Customer Success Manager | Account Manager | Pre-Sales</div>
<div class="contact">Brampton, ON, Canada | sheenachugh92@gmail.com | +1 (647) 236-0034 | sheenachugh22.github.io/portfolio</div>

<h2>Executive Summary</h2>
<div class="summary">Results-driven Business Analyst and Project Management professional with 9+ years of experience bridging business stakeholders and technical teams across healthcare, enterprise software, and cloud platforms. Proven expertise in client relationship management, requirements elicitation, solution consulting, and driving customer success through strategic engagement and value delivery. Strong track record in leading discovery sessions, creating proposals and BRDs, managing accounts, and ensuring client satisfaction through the entire customer lifecycle.</div>

<h2>Core Competencies</h2>
<ul>
<li>Requirements Elicitation & Documentation</li>
<li>Client Onboarding & Adoption</li>
<li>Account Planning & Relationship Building</li>
<li>Discovery Calls & Needs Assessment</li>
<li>Solution Demonstrations & POCs</li>
<li>Proposal & RFP Response</li>
<li>Process Mapping (BPMN, Flowcharts)</li>
<li>Renewal Management & Retention</li>
<li>Stakeholder Engagement</li>
<li>Executive Presentations</li>
<li>Jira Administration & Workflows</li>
<li>Upsell & Cross-sell Identification</li>
</ul>

<h2>Professional Experience</h2>

<div class="job">
<div class="job-header">IDEALOGICAL GROUP <span class="job-location">Markham, ON</span></div>
<div class="job-title">Senior Business Analyst / Program Manager | May 2024 – Present</div>
<ul>
<li>Primary liaison between business stakeholders, vendors, and implementation teams for enterprise MSP software initiatives</li>
<li>Lead client discovery sessions, translating complex business needs into structured requirements and solution proposals</li>
<li>Manage end-to-end client relationships from pre-sales engagement through implementation and ongoing success</li>
<li>Create process mapping diagrams, user stories with acceptance criteria, and use cases to guide solution delivery</li>
<li>Architected Jira dashboards and automations reducing manual coordination by 40%</li>
</ul>
</div>

<div class="job">
<div class="job-header">TESTINGXPERTS <span class="job-location">Remote</span></div>
<div class="job-title">Business Analyst / Project Coordinator | Aug 2021 – Jan 2024</div>
<ul>
<li>Managed client engagements and requirements gathering for enterprise projects across cloud, API, and web platforms</li>
<li>Conducted discovery workshops with clients to gather and prioritize business requirements</li>
<li>Developed BRDs, proposals, and functional specifications; resolved scope gaps ensuring alignment with client goals</li>
<li>Owned client communication and escalation management throughout project lifecycle</li>
<li>Implemented governance frameworks reducing rework by 30%</li>
</ul>
</div>

<div class="job">
<div class="job-header">SEASIA INFOTECH <span class="job-location">India</span></div>
<div class="job-title">Associate Business Analyst / Project Manager | May 2019 – Aug 2021</div>
<ul>
<li>Managed business analysis and client relationships for healthcare and financial services programs</li>
<li>Served as primary client contact for requirements gathering, solution consulting, and relationship management</li>
<li>Introduced reporting templates increasing client visibility and reducing follow-up delays by 40%</li>
<li>Automated 150+ workflows, reducing manual effort by 60%</li>
</ul>
</div>

<div class="job">
<div class="job-header">TECH MAHINDRA <span class="job-location">India</span></div>
<div class="job-title">Business Analyst / Project Coordinator | Aug 2016 – Apr 2019</div>
<ul>
<li>Supported client deployments for utility and telecom projects, ensuring seamless transitions</li>
<li>Maintained client communication channels and coordinated with internal teams and vendors</li>
<li>Created dashboards improving decision-making speed by 25%</li>
</ul>
</div>
<<<<<<< HEAD
    `;
    
    const achievements = document.createElement('div');
    achievements.style.cssText = 'margin-bottom:12px;';
    achievements.innerHTML = '<div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:7px;">KEY ACHIEVEMENTS</div><div style="padding-left:12px;margin-bottom:2px;">• 40 percent Reduction in manual coordination through Jira automation</div><div style="padding-left:12px;margin-bottom:2px;">• 25 percent Improvement in forecasting accuracy via story point tracking</div><div style="padding-left:12px;margin-bottom:2px;">• 98 percent On-time Delivery rate across 15+ enterprise projects</div><div style="padding-left:12px;margin-bottom:2px;">• Pioneered AI Integration for automated test case generation</div><div style="padding-left:12px;">• 50+ Stakeholders using real-time dashboards for visibility</div>';
    
    const technical = document.createElement('div');
    technical.style.cssText = 'margin-bottom:12px;';
    technical.innerHTML = '<div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:7px;">TECHNICAL EXPERTISE</div><div style="margin-bottom:3px;"><b>PM Tools:</b> Jira (Admin), Confluence, MS Project, Azure DevOps, ServiceNow</div><div style="margin-bottom:3px;"><b>Automation:</b> Jira Workflows, Excel VBA, AI-driven Test Generation, Scripting</div><div style="margin-bottom:3px;"><b>Collaboration:</b> Slack, Microsoft Teams, SharePoint, Git/GitHub</div><div><b>Methodologies:</b> Agile, Scrum, Kanban, Waterfall, SDLC, SAFe</div>';
    
    const education = document.createElement('div');
    education.style.cssText = 'margin-bottom:12px;';
    education.innerHTML = '<div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:7px;">EDUCATION</div><div style="margin-bottom:4px;"><b>Master of Computer Applications (MCA)</b> – IGNOU, 2017–2021</div><div><b>Bachelor of Science, Computer Science</b> – Kurukshetra University, 2013–2016</div>';
    
    const certifications = document.createElement('div');
    certifications.innerHTML = '<div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:2px;margin-bottom:7px;">CERTIFICATIONS</div><div style="padding-left:12px;margin-bottom:2px;">• ISTQB Certified Tester – Advanced Level Test Management</div><div style="padding-left:12px;">• Business Analyst Certification</div>';
    
    resumeContent.appendChild(header);
    resumeContent.appendChild(execSummary);
    resumeContent.appendChild(competencies);
    resumeContent.appendChild(experience);
    resumeContent.appendChild(achievements);
    resumeContent.appendChild(technical);
    resumeContent.appendChild(education);
    resumeContent.appendChild(certifications);
    
    document.body.appendChild(resumeContent);
    
    // Wait for render
    setTimeout(() => {
        const opt = {
            margin: [2, 10, 2, 10],
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
        
        html2pdf()
            .set(opt)
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
    }, 500);
=======

<h2>Key Achievements</h2>
<ul>
<li><strong>40% Reduction</strong> in manual coordination through Jira automation and workflow optimization</li>
<li><strong>60% Faster Onboarding</strong> through automated workflows and streamlined client processes</li>
<li><strong>30% Reduced Rework</strong> through improved governance frameworks and requirements traceability</li>
<li><strong>25% Improved Planning</strong> accuracy through better forecasting and dashboard visibility</li>
</ul>

<h2>Technical Expertise</h2>
<div>
<strong>BA & CSM Tools:</strong> Jira (Advanced Admin), Confluence, Microsoft Visio, MS Project, Azure DevOps, ServiceNow<br>
<strong>Documentation:</strong> BRDs, Proposals, User Stories, Use Cases, BPMN Process Maps, Functional Specifications<br>
<strong>Collaboration:</strong> Microsoft Office Suite, Slack, Teams, SharePoint, CRM Systems<br>
<strong>Methodologies:</strong> Agile, Scrum, Kanban, Waterfall, SDLC, Customer Success Frameworks
</div>

<h2>Education & Certifications</h2>
<div>
<strong>Master of Computer Applications (MCA)</strong> – IGNOU | 2017 – 2021<br>
<strong>Bachelor of Science, Computer Science</strong> – Kurukshetra University | 2013 – 2016<br><br>
• Business Analyst Certification &nbsp;&nbsp; • ISTQB Certified Tester – Advanced Level Test Management
</div>

<h2>Why I'm A Strong Fit</h2>
<ul>
<li>9+ years bridging business stakeholders and technical teams</li>
<li>Extensive experience creating BRDs, proposals, and solution documentation</li>
<li>Proven track record in client relationship management and account growth</li>
<li>Strong pre-sales capabilities including discovery, demos, and POCs</li>
<li>Healthcare and enterprise software domain expertise</li>
<li>Skilled at presenting business cases to executive leadership</li>
</ul>

</body>
</html>`;
>>>>>>> 432cf76cc7616c340e2d599ed31ca7d58f656c40
}

// Generate Resume Preview HTML for modal display
function generateResumePreviewHTML() {
    return `<div class="resume-preview" id="resumePreviewContent" style="background:#fff;padding:30px 40px;font-family:Calibri,Arial,sans-serif;font-size:11px;line-height:1.4;color:#000;">
        <div style="text-align:center;border-bottom:2px solid #333;padding-bottom:10px;margin-bottom:15px;">
            <div style="font-size:20px;font-weight:bold;letter-spacing:2px;margin-bottom:5px;">SHEENA CHUGH</div>
            <div style="font-size:11px;color:#444;margin-bottom:5px;">Business Analyst | Customer Success Manager | Account Manager | Pre-Sales</div>
            <div style="font-size:10px;color:#555;">Brampton, ON, Canada | sheenachugh92@gmail.com | +1 (647) 236-0034 | sheenachugh22.github.io/portfolio</div>
        </div>
        
        <div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;margin:12px 0 8px;padding-bottom:3px;">EXECUTIVE SUMMARY</div>
        <div style="text-align:justify;margin-bottom:10px;">Results-driven Business Analyst and Project Management professional with 9+ years of experience bridging business stakeholders and technical teams across healthcare, enterprise software, and cloud platforms. Proven expertise in client relationship management, requirements elicitation, solution consulting, and driving customer success.</div>
        
        <div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;margin:12px 0 8px;padding-bottom:3px;">CORE COMPETENCIES</div>
        <div style="margin-bottom:10px;font-size:10px;padding-left:10px;">
            • Requirements Elicitation & Documentation<br>
            • Client Onboarding & Adoption<br>
            • Account Planning & Relationship Building<br>
            • Discovery Calls & Needs Assessment<br>
            • Solution Demonstrations & POCs<br>
            • Proposal & RFP Response<br>
            • Process Mapping (BPMN, Flowcharts)<br>
            • Renewal Management & Retention<br>
            • Stakeholder Engagement<br>
            • Executive Presentations<br>
            • Jira Administration & Workflows<br>
            • Upsell & Cross-sell Identification
        </div>
        
        <div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;margin:12px 0 8px;padding-bottom:3px;">PROFESSIONAL EXPERIENCE</div>
        
        <div style="margin-bottom:10px;">
            <div style="font-weight:bold;">IDEALOGICAL GROUP <span style="float:right;font-weight:normal;color:#555;">Markham, ON</span></div>
            <div style="font-style:italic;color:#444;margin-bottom:4px;">Senior Business Analyst / Program Manager | May 2024 – Present</div>
            <div style="padding-left:10px;font-size:10px;">• Primary liaison between stakeholders, vendors, and implementation teams<br>• Lead client discovery sessions, translating needs into requirements<br>• Manage end-to-end client relationships from pre-sales to success<br>• Architected Jira dashboards reducing coordination by 40%</div>
        </div>
        
        <div style="margin-bottom:10px;">
            <div style="font-weight:bold;">TESTINGXPERTS <span style="float:right;font-weight:normal;color:#555;">Remote</span></div>
            <div style="font-style:italic;color:#444;margin-bottom:4px;">Business Analyst / Project Coordinator | Aug 2021 – Jan 2024</div>
            <div style="padding-left:10px;font-size:10px;">• Managed client engagements for enterprise projects<br>• Conducted discovery workshops with clients<br>• Developed BRDs, proposals, and functional specifications<br>• Implemented governance frameworks reducing rework by 30%</div>
        </div>
        
        <div style="margin-bottom:10px;">
            <div style="font-weight:bold;">SEASIA INFOTECH <span style="float:right;font-weight:normal;color:#555;">India</span></div>
            <div style="font-style:italic;color:#444;margin-bottom:4px;">Associate Business Analyst / Project Manager | May 2019 – Aug 2021</div>
            <div style="padding-left:10px;font-size:10px;">• Primary client contact for requirements and consulting<br>• Increased client visibility by 40% with reporting templates<br>• Automated 150+ workflows, 60% effort reduction</div>
        </div>
        
        <div style="margin-bottom:10px;">
            <div style="font-weight:bold;">TECH MAHINDRA <span style="float:right;font-weight:normal;color:#555;">India</span></div>
            <div style="font-style:italic;color:#444;margin-bottom:4px;">Business Analyst / Project Coordinator | Aug 2016 – Apr 2019</div>
            <div style="padding-left:10px;font-size:10px;">• Supported client deployments for utility and telecom<br>• Created dashboards improving decisions by 25%</div>
        </div>
        
        <div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;margin:12px 0 8px;padding-bottom:3px;">EDUCATION & CERTIFICATIONS</div>
        <div style="font-size:10px;"><strong>MCA</strong> – IGNOU | <strong>BSc Computer Science</strong> – Kurukshetra University<br>• Business Analyst Certification • ISTQB Advanced Level</div>
        
        <div style="font-size:11px;font-weight:bold;border-bottom:1px solid #333;margin:12px 0 8px;padding-bottom:3px;">WHY I'M A STRONG FIT</div>
        <div style="font-size:10px;padding-left:10px;">
            • 9+ years bridging business stakeholders and technical teams<br>
            • Extensive experience creating BRDs, proposals, and solution documentation<br>
            • Proven track record in client relationship management and account growth<br>
            • Strong pre-sales capabilities including discovery, demos, and POCs<br>
            • Healthcare and enterprise software domain expertise<br>
            • Skilled at presenting business cases to executive leadership
        </div>
    </div>`;
}

// Open Resume Modal with Preview
downloadResumeBtn.addEventListener('click', () => {
    resumePreviewContainer.innerHTML = generateResumePreviewHTML();
    resumeModal.classList.add('open');
    document.body.classList.add('modal-open');
});

// Close Resume Modal
closeResumeModal.addEventListener('click', () => {
    resumeModal.classList.remove('open');
    document.body.classList.remove('modal-open');
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        resumeModal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }
});

// Download Word Document
confirmDownloadBtn.addEventListener('click', () => {
    generateResumeDoc();
});

function generateResumeDoc() {
    showNotification('Generating Word document...');
    
    const htmlContent = generateResumeHTML();
    
    // Create blob with Word-compatible HTML
    const blob = new Blob(['\ufeff' + htmlContent], {
        type: 'application/msword'
    });
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Sheena_Chugh_BA_CSM_Resume.doc';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(link.href);
    
    showNotification('Resume downloaded successfully!');
    setTimeout(() => {
        resumeModal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }, 1000);
}
