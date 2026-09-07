const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateCredentialsPDF(outputPath) {
    const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
        info: {
            Title: 'EASA College - Login Portals & Access Credentials Guide',
            Author: 'EASA College Development Team',
            Subject: 'System Access & Authentication Documentation',
            Keywords: 'EASA College, Admin, Admission, Syllabus, Recruitment, Login, Credentials'
        }
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Color Palette
    const primaryColor = '#1e3a8a';   // Deep Blue
    const secondaryColor = '#0284c7'; // Sky Blue
    const darkColor = '#0f172a';      // Slate Dark
    const grayColor = '#475569';      // Slate Gray
    const lightBg = '#f8fafc';        // Soft light background
    const cardBorder = '#e2e8f0';

    // Header Banner
    doc.rect(40, 40, 515, 75).fillAndStroke('#0f172a', '#1e293b');
    
    doc.fillColor('#38bdf8').fontSize(9.5).font('Helvetica-Bold')
       .text('EASA COLLEGE OF ENGINEERING AND TECHNOLOGY', 55, 54, { characterSpacing: 1 });
    doc.fillColor('#ffffff').fontSize(16).font('Helvetica-Bold')
       .text('Portal Access & Login Credentials Guide', 55, 69);
    doc.fillColor('#94a3b8').fontSize(8.5).font('Helvetica')
       .text(`Confidential System Handoff Document  •  Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, 55, 92);

    let y = 125;

    // Helper: Section Title
    const drawSectionTitle = (title) => {
        doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold')
           .text(title, 40, y);
        doc.strokeColor(secondaryColor).lineWidth(1.5)
           .moveTo(40, y + 16).lineTo(555, y + 16).stroke();
        y += 24;
    };

    // Helper: Card Box
    const drawCard = (height, title, badgeText, badgeColor = '#0284c7') => {
        doc.rect(40, y, 515, height).fillAndStroke(lightBg, cardBorder);
        
        // Header in card
        doc.fillColor(darkColor).fontSize(10.5).font('Helvetica-Bold')
           .text(title, 55, y + 10);

        // Badge
        const badgeWidth = 100;
        doc.roundedRect(440, y + 8, badgeWidth, 16, 4).fill(badgeColor);
        doc.fillColor('#ffffff').fontSize(7.5).font('Helvetica-Bold')
           .text(badgeText, 440, y + 12, { width: badgeWidth, align: 'center' });
    };

    // 1. Executive Summary
    drawSectionTitle('1. Overview of Administrative & Public Portals');
    doc.fillColor(grayColor).fontSize(9).font('Helvetica').lineGap(2.5)
       .text(
           'This document catalogs the login paths, user roles, security scopes, and default credentials across all modules of the EASA College portal ecosystem—including the Central CMS, the dedicated Admissions & Quick Enquiry Portal, Syllabus Management, Recruitment, and Campus ERP.',
           40, y, { width: 515 }
       );
    y += 42;

    // Portal 1: Admissions & Quick Enquiry Hub
    drawCard(132, 'Portal 1: Dedicated Admissions & Quick Enquiry Hub', 'ADMISSIONS & LEADS', '#0284c7');
    let cy = y + 30;
    
    doc.fillColor(darkColor).fontSize(8.5).font('Helvetica-Bold').text('Route / URL:', 55, cy);
    doc.fillColor(secondaryColor).font('Helvetica-Bold').text('/admin/admission   (Alias: /admin/addmission)', 145, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Default Login:', 55, cy);
    doc.fillColor('#b91c1c').font('Helvetica-Bold').text('admin', 145, cy);
    doc.fillColor(darkColor).font('Helvetica-Bold').text('Password:', 250, cy);
    doc.fillColor('#b91c1c').font('Helvetica-Bold').text('admin123', 320, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Staff Logins:', 55, cy);
    doc.fillColor(grayColor).font('Helvetica').text('New coordinator accounts can be created directly inside the Team Logins tab.', 145, cy, { width: 395 });
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Key Capabilities:', 55, cy);
    doc.fillColor(grayColor).font('Helvetica').text('Unified hub for student admission applications & quick website enquiry leads. Full candidate biodata modal, marks verification, status workflow (Pending/Reviewed/Accepted/Rejected), direct telephone/email follow-up, and Excel (.xlsx) data export.', 145, cy, { width: 395 });
    
    y += 142;

    // Portal 2: Master Admin CMS Dashboard
    drawCard(120, 'Portal 2: Master Website Admin CMS Dashboard', 'SUPER ADMIN', '#1e3a8a');
    cy = y + 30;
    
    doc.fillColor(darkColor).fontSize(8.5).font('Helvetica-Bold').text('Route / URL:', 55, cy);
    doc.fillColor(secondaryColor).font('Helvetica-Bold').text('/admin/login   or   /admin', 145, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Master Login:', 55, cy);
    doc.fillColor('#b91c1c').font('Helvetica-Bold').text('admin', 145, cy);
    doc.fillColor(darkColor).font('Helvetica-Bold').text('Password:', 250, cy);
    doc.fillColor('#b91c1c').font('Helvetica-Bold').text('admin123', 320, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Key Capabilities:', 55, cy);
    doc.fillColor(grayColor).font('Helvetica').text('Full CMS content control: Manage hero slides, news & events, faculty statistics, research publications, photo/video gallery, academic departments, and general system settings.', 145, cy, { width: 395 });
    
    y += 130;

    // Portal 3: Syllabus & Academic Management System
    drawCard(128, 'Portal 3: Syllabus & Academic Management System', 'ROLE-BASED AUTH', '#059669');
    cy = y + 30;

    doc.fillColor(darkColor).fontSize(8.5).font('Helvetica-Bold').text('Route / URL:', 55, cy);
    doc.fillColor(secondaryColor).font('Helvetica-Bold').text('/login   →   redirects to /dashboard', 145, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Supported Roles:', 55, cy);
    doc.fillColor(grayColor).font('Helvetica').text('Admin, HOD (Head of Dept), Staff / Faculty, Student', 145, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Master Login:', 55, cy);
    doc.fillColor('#b91c1c').font('Helvetica-Bold').text('admin', 145, cy);
    doc.fillColor(darkColor).font('Helvetica-Bold').text('Password:', 250, cy);
    doc.fillColor('#b91c1c').font('Helvetica-Bold').text('admin123', 320, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Key Capabilities:', 55, cy);
    doc.fillColor(grayColor).font('Helvetica').text('Syllabus authoring, Course Outcomes (COs), Program Outcomes (PO/PSO) mapping matrices, Blooms Taxonomy levels, Department approvals.', 145, cy, { width: 395 });

    // Page 2
    doc.addPage();
    y = 40;

    drawSectionTitle('2. Recruitment & Institutional Portals');

    // Portal 4: Recruitment & Job Applications Hub
    drawCard(120, 'Portal 4: Recruitment & Careers Admin Hub', 'HR & RECRUITMENT', '#d97706');
    cy = y + 30;

    doc.fillColor(darkColor).fontSize(8.5).font('Helvetica-Bold').text('Route / URL:', 55, cy);
    doc.fillColor(secondaryColor).font('Helvetica-Bold').text('/admin/applications', 145, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Authentication:', 55, cy);
    doc.fillColor(grayColor).font('Helvetica').text('Protected with Admin session or Login (admin / admin123)', 145, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Key Capabilities:', 55, cy);
    doc.fillColor(grayColor).font('Helvetica').text('Post & edit job vacancies, open/close listings, preview candidate PDF resumes, update candidate hiring stages (Shortlisted, Interviewed, Hired, Rejected), and Excel export.', 145, cy, { width: 395 });

    y += 130;

    // Portal 5: Campus ERP
    drawCard(95, 'Portal 5: Institutional Campus ERP (External System)', 'CAMPUS ERP', '#64748b');
    cy = y + 30;

    doc.fillColor(darkColor).fontSize(8.5).font('Helvetica-Bold').text('Portal URL:', 55, cy);
    doc.fillColor(secondaryColor).font('Helvetica-Bold').text('https://portal.easacollege.com/Login', 145, cy);
    cy += 15;

    doc.fillColor(darkColor).font('Helvetica-Bold').text('Key Capabilities:', 55, cy);
    doc.fillColor(grayColor).font('Helvetica').text('College enterprise management: Semester examination marks, daily attendance tracking, student fee payments, and institutional records.', 145, cy, { width: 395 });

    y += 105;

    // Quick Reference Matrix
    drawSectionTitle('3. Master Credentials Matrix');

    const tableTop = y;

    // Table Header
    doc.rect(40, tableTop, 515, 20).fill('#1e293b');
    doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold');
    doc.text('PORTAL NAME', 48, tableTop + 5);
    doc.text('URL / ROUTE', 185, tableTop + 5);
    doc.text('USERNAME', 295, tableTop + 5);
    doc.text('PASSWORD', 375, tableTop + 5);
    doc.text('ACCESS ROLE', 455, tableTop + 5);

    const tableRows = [
        ['Admissions & Leads', '/admin/admission', 'admin', 'admin123', 'Admissions Team'],
        ['Admin CMS Portal', '/admin/login', 'admin', 'admin123', 'Super Admin'],
        ['Syllabus System', '/login', 'admin', 'admin123', 'Admin / HOD / Staff'],
        ['Recruitment Hub', '/admin/applications', 'admin', 'admin123', 'HR Recruiter'],
        ['College Campus ERP', 'portal.easacollege.com', 'Assigned by Inst.', 'Assigned by Inst.', 'Student / Faculty']
    ];

    let rowY = tableTop + 20;
    tableRows.forEach((row, idx) => {
        const bg = idx % 2 === 0 ? '#f8fafc' : '#ffffff';
        doc.rect(40, rowY, 515, 20).fillAndStroke(bg, '#e2e8f0');
        
        doc.fillColor(darkColor).fontSize(7.5).font('Helvetica-Bold').text(row[0], 48, rowY + 5);
        doc.fillColor(secondaryColor).font('Helvetica').text(row[1], 185, rowY + 5);
        doc.fillColor('#b91c1c').font('Helvetica-Bold').text(row[2], 295, rowY + 5);
        doc.fillColor('#b91c1c').font('Helvetica-Bold').text(row[3], 375, rowY + 5);
        doc.fillColor(grayColor).font('Helvetica').text(row[4], 455, rowY + 5);

        rowY += 20;
    });

    y = rowY + 20;

    // Notice Box
    doc.roundedRect(40, y, 515, 55, 6).fillAndStroke('#fffbeb', '#fde68a');
    doc.fillColor('#92400e').fontSize(8.5).font('Helvetica-Bold')
       .text('Security & Production Configuration Notice:', 50, y + 7);
    doc.fillColor('#78350f').fontSize(7.5).font('Helvetica').lineGap(2)
       .text(
           '• Master admin password "admin123" is configured in backend/.env under ADMIN_PASSWORD.\n' +
           '• Additional admission coordinators and staff accounts can be created directly on the /admin/admission portal under the "Team Logins & Passwords" tab.',
           50, y + 20, { width: 495 }
       );

    // Footer
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        doc.fillColor('#94a3b8').fontSize(7.5).font('Helvetica')
           .text(
               `EASA College of Engineering & Technology — Page ${i + 1} of ${range.count}`,
               40,
               800,
               { align: 'center', width: 515 }
           );
    }

    doc.end();
}

const outputPath1 = path.join(__dirname, '..', 'EASA_College_Login_Credentials_Guide.pdf');
const outputPath2 = path.join(__dirname, '..', 'public', 'EASA_College_Login_Credentials_Guide.pdf');

generateCredentialsPDF(outputPath1);
generateCredentialsPDF(outputPath2);

console.log('PDFs successfully updated with Admissions Portal!');
