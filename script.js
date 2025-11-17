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
        title: 'Technology Operations Optimization - Idealogical Group',
        description: 'Led strategic programs across technology operations, ensuring alignment with corporate objectives and measurable KPIs. Collaborated with executives to define program roadmaps, secure approvals, and manage cross-functional delivery outcomes. Developed analytics dashboards using Power BI for real-time visibility into progress, risks, and KPIs, enabling data-driven decisions. Optimized delivery processes, reducing manual effort by 40% and increasing planning accuracy by 25%. Prepared business cases and strategic recommendations to gain leadership buy-in and budget approvals.'
    },
    2: {
        title: 'Enterprise Project Portfolio Management - TestingXperts',
        description: 'Managed delivery of 15+ enterprise projects with 98% on-time completion and adherence to scope and quality goals. Facilitated Agile ceremonies, sprint planning, and executive updates for global cross-functional teams. Implemented project governance models and reporting frameworks to track deliverables and risk indicators. Enhanced stakeholder communication and change control, reducing rework by 30%. Developed and presented project proposals to support resource allocation and funding approvals. Utilized Jira and Confluence for project tracking and collaboration.'
    },
    3: {
        title: 'Healthcare & Finance Program Delivery - Seasia Infotech',
        description: 'Coordinated project planning and execution for large-scale healthcare and finance programs. Monitored schedules, deliverables, and budgets, ensuring full compliance with SLAs and quality standards. Assisted senior management with stakeholder communication and project documentation for global clients. Introduced reporting templates that increased visibility and reduced follow-up delays by 40%. Supported process improvement initiatives that enhanced delivery predictability and client satisfaction. Applied SDLC methodologies and quality assurance practices throughout the project lifecycle.'
    }
};

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project) {
            modalTitle.textContent = project.title;
            modalDescription.innerHTML = project.description.split('. ').map(sentence => sentence.trim() ? `<p>${sentence.trim()}${sentence.trim().endsWith('.') ? '' : '.'}</p>` : '').join('');
            modal.style.display = 'block';
        }
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
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
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Brampton, Ontario, Canada</p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Email: sheenachugh92@gmail.com | Phone: +1 (647) 236-0034</p>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Career Summary</h2>
            <ul style="list-style: none; padding-left: 0;">
                <li style="margin-bottom: 8px;">• 9+ years of progressive experience in Project and Program Management across technology and business domains.</li>
                <li style="margin-bottom: 8px;">• Expert in Agile execution, end-to-end delivery, and stakeholder management to achieve measurable business outcomes.</li>
                <li style="margin-bottom: 8px;">• Proven ability to streamline operations, optimize resources, and improve cross-functional collaboration.</li>
                <li style="margin-bottom: 8px;">• Skilled in KPI tracking, budget management, and risk mitigation to ensure project success and sustainability.</li>
                <li style="margin-bottom: 8px;">• Strong communicator adept at aligning executive priorities with operational execution.</li>
            </ul>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Core Skills</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                <div>
                    <strong>Project Management:</strong> End-to-End Delivery, Planning & Execution, Scope & Budget Control, Risk & Issue Management, Process Optimization
                </div>
                <div>
                    <strong>Leadership & Collaboration:</strong> Stakeholder Engagement, Cross-Functional Coordination, Executive Reporting, Team Mentoring
                </div>
                <div>
                    <strong>Methodologies:</strong> Agile, Scrum, Waterfall, SDLC, PMO Practices
                </div>
                <div>
                    <strong>Tools & Platforms:</strong> Jira, Confluence, MS Project, Trello, Asana, Power BI, Excel, SharePoint, Google Workspace
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Professional Experience</h2>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Idealogical Group – Markham, ON</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Project Manager | May 2024 – Present</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Lead strategic programs across technology operations, ensuring alignment with corporate objectives and measurable KPIs.</li>
                    <li style="margin-bottom: 5px;">• Collaborate with executives to define program roadmaps, secure approvals, and manage cross-functional delivery outcomes.</li>
                    <li style="margin-bottom: 5px;">• Develop analytics dashboards for real-time visibility into progress, risks, and KPIs, enabling data-driven decisions.</li>
                    <li style="margin-bottom: 5px;">• Optimized delivery processes, reducing manual effort by 40% and increasing planning accuracy by 25%.</li>
                    <li style="margin-bottom: 5px;">• Prepare business cases and strategic recommendations to gain leadership buy-in and budget approvals.</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">TestingXperts – Remote (India)</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Project Manager / Coordinator | Aug 2021 – Jan 2024</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Managed delivery of 15+ enterprise projects with 98% on-time completion and adherence to scope and quality goals.</li>
                    <li style="margin-bottom: 5px;">• Facilitated Agile ceremonies, sprint planning, and executive updates for global cross-functional teams.</li>
                    <li style="margin-bottom: 5px;">• Implemented project governance models and reporting frameworks to track deliverables and risk indicators.</li>
                    <li style="margin-bottom: 5px;">• Enhanced stakeholder communication and change control, reducing rework by 30%.</li>
                    <li style="margin-bottom: 5px;">• Developed and presented project proposals to support resource allocation and funding approvals.</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Seasia Infotech – India</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Associate Project Manager | May 2019 – Aug 2021</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Coordinated project planning and execution for large-scale healthcare and finance programs.</li>
                    <li style="margin-bottom: 5px;">• Monitored schedules, deliverables, and budgets, ensuring full compliance with SLAs and quality standards.</li>
                    <li style="margin-bottom: 5px;">• Assisted senior management with stakeholder communication and project documentation for global clients.</li>
                    <li style="margin-bottom: 5px;">• Introduced reporting templates that increased visibility and reduced follow-up delays by 40%.</li>
                    <li style="margin-bottom: 5px;">• Supported process improvement initiatives that enhanced delivery predictability and client satisfaction.</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0a192f; font-size: 16px; margin-bottom: 5px;">Tech Mahindra – India</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;"><strong>Project Coordinator | Aug 2016 – Apr 2019</strong></p>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">• Supported deployment programs for national utility and telecom projects ensuring zero downtime.</li>
                    <li style="margin-bottom: 5px;">• Coordinated between onshore and offshore teams to maintain delivery timelines and stakeholder alignment.</li>
                    <li style="margin-bottom: 5px;">• Created project reports and dashboards for leadership, improving decision-making speed by 25%.</li>
                    <li style="margin-bottom: 5px;">• Facilitated documentation, change management, and risk tracking for multi-phase implementation programs.</li>
                </ul>
            </div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Education</h2>
            <p style="margin-bottom: 8px;"><strong>Master of Computer Applications (MCA)</strong><br>Indira Gandhi National Open University (2017–2021)</p>
            <p style="margin-bottom: 8px;"><strong>Bachelor of Science (BS), Computer Science</strong><br>Kurukshetra University (2013–2016)</p>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h2 style="color: #0a192f; font-size: 20px; border-bottom: 1px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px;">Certifications</h2>
            <p style="margin-bottom: 5px;">• ISTQB Certified Tester – Advanced Level Test Management</p>
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

