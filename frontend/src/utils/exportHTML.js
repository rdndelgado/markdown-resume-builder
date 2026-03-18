const classicCSS = `
  body { margin: 0; padding: 0; background: white; }
  .resume { font-family: Georgia, 'Times New Roman', serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #000; background: white; }
  .resume-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 16px; margin-bottom: 24px; }
  .resume-header h1 { font-size: 28px; font-weight: bold; margin: 0 0 4px 0; letter-spacing: 1px; text-transform: uppercase; }
  .resume-header .title { font-size: 14px; color: #444; margin: 0 0 12px 0; }
  .contact-info { font-size: 12px; color: #333; display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
  .contact-info span { display: inline; }
  .section { margin-bottom: 20px; }
  .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #000; padding-bottom: 4px; margin-bottom: 12px; }
  .experience-entry { margin-bottom: 16px; }
  .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
  .exp-role { font-weight: bold; font-size: 14px; }
  .exp-company { font-size: 13px; color: #444; }
  .exp-dates { font-size: 12px; color: #666; white-space: nowrap; }
  .bullets { margin: 6px 0 0 18px; padding: 0; }
  .bullets li { font-size: 13px; margin-bottom: 3px; line-height: 1.4; }
  .education-entry { margin-bottom: 12px; }
  .edu-header { display: flex; justify-content: space-between; }
  .edu-degree { font-weight: bold; font-size: 14px; }
  .edu-institution { font-size: 13px; color: #444; }
  .edu-dates { font-size: 12px; color: #666; }
  .skills-grid { display: flex; gap: 24px; }
  .skill-group { flex: 1; }
  .skill-group-label { font-weight: bold; font-size: 13px; margin-bottom: 6px; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .skill-tag { font-size: 12px; background: #f0f0f0; border: 1px solid #ccc; padding: 2px 8px; border-radius: 2px; }
  .cert-entry { margin-bottom: 8px; font-size: 13px; }
  .cert-name { font-weight: bold; }
  .summary-text { font-size: 13px; line-height: 1.6; color: #333; }
`;

const modernCSS = `
  body { margin: 0; padding: 0; background: white; }
  .resume { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; display: flex; background: white; min-height: 1056px; }
  .sidebar { width: 30%; background: #2C3E50; color: white; padding: 32px 20px; box-sizing: border-box; }
  .main-content { width: 70%; padding: 32px 28px; box-sizing: border-box; }
  .sidebar h1 { font-size: 22px; font-weight: 700; margin: 0 0 4px 0; color: white; line-height: 1.2; }
  .sidebar .title { font-size: 13px; color: #BDC3C7; margin: 0 0 24px 0; }
  .sidebar-section { margin-bottom: 24px; }
  .sidebar-section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #7F8C8D; border-bottom: 1px solid #3D5166; padding-bottom: 6px; margin-bottom: 12px; font-weight: 600; }
  .contact-item { font-size: 12px; color: #BDC3C7; margin-bottom: 6px; word-break: break-all; }
  .contact-label { color: #7F8C8D; font-size: 10px; display: block; text-transform: uppercase; letter-spacing: 1px; }
  .skill-tag { display: inline-block; font-size: 11px; background: #3D5166; color: #ECF0F1; padding: 3px 8px; border-radius: 3px; margin: 2px 2px 2px 0; }
  .section { margin-bottom: 24px; }
  .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #2C3E50; border-bottom: 2px solid #2C3E50; padding-bottom: 4px; margin-bottom: 14px; }
  .experience-entry { margin-bottom: 16px; }
  .exp-role { font-weight: 700; font-size: 14px; color: #2C3E50; }
  .exp-company { font-size: 13px; color: #555; }
  .exp-dates { font-size: 12px; color: #888; margin-bottom: 6px; }
  .bullets { margin: 6px 0 0 18px; padding: 0; }
  .bullets li { font-size: 13px; margin-bottom: 3px; line-height: 1.5; color: #333; }
  .education-entry { margin-bottom: 12px; }
  .edu-degree { font-weight: 700; font-size: 14px; color: #2C3E50; }
  .edu-institution { font-size: 13px; color: #555; }
  .edu-dates { font-size: 12px; color: #888; }
  .cert-entry { margin-bottom: 8px; }
  .cert-name { font-weight: 600; font-size: 13px; }
  .cert-issuer { font-size: 12px; color: #666; }
  .summary-text { font-size: 13px; line-height: 1.6; color: #444; }
`;

const minimalCSS = `
  body { margin: 0; padding: 0; background: white; }
  .resume { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 760px; margin: 0 auto; padding: 60px 48px; background: white; color: #111; }
  .resume-header { margin-bottom: 40px; }
  .resume-header h1 { font-size: 32px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 6px 0; color: #111; }
  .resume-header .title { font-size: 13px; color: #888; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 16px 0; }
  .contact-info { display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #666; }
  .section { margin-bottom: 36px; }
  .section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: #aaa; margin-bottom: 16px; font-weight: 400; }
  .section-divider { border: none; border-top: 1px solid #eee; margin-bottom: 16px; }
  .experience-entry { margin-bottom: 20px; }
  .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  .exp-role { font-weight: 500; font-size: 14px; }
  .exp-company { font-size: 13px; color: #555; }
  .exp-dates { font-size: 12px; color: #aaa; }
  .bullets { margin: 8px 0 0 16px; padding: 0; }
  .bullets li { font-size: 13px; margin-bottom: 4px; line-height: 1.6; color: #333; }
  .education-entry { margin-bottom: 16px; }
  .edu-header { display: flex; justify-content: space-between; }
  .edu-degree { font-weight: 500; font-size: 14px; }
  .edu-institution { font-size: 13px; color: #555; }
  .edu-dates { font-size: 12px; color: #aaa; }
  .skill-group { margin-bottom: 10px; }
  .skill-group-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #aaa; margin-bottom: 6px; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag { font-size: 12px; color: #333; }
  .skill-tag::after { content: "·"; margin-left: 8px; color: #ccc; }
  .skill-tag:last-child::after { content: ""; }
  .cert-entry { margin-bottom: 8px; font-size: 13px; color: #333; }
  .cert-name { font-weight: 500; }
  .summary-text { font-size: 13px; line-height: 1.8; color: #444; }
`;

function renderContact(personal) {
  const items = [];
  if (personal.email) items.push(`<span>${personal.email}</span>`);
  if (personal.phone) items.push(`<span>${personal.phone}</span>`);
  if (personal.location) items.push(`<span>${personal.location}</span>`);
  if (personal.linkedin) items.push(`<span>${personal.linkedin}</span>`);
  if (personal.website) items.push(`<span>${personal.website}</span>`);
  return items.join('<span style="color:#999"> | </span>');
}

function renderBullets(bullets) {
  if (!bullets || bullets.filter(b => b.trim()).length === 0) return '';
  return `<ul class="bullets">${bullets.filter(b => b.trim()).map(b => `<li>${b}</li>`).join('')}</ul>`;
}

function renderClassic(data) {
  const { personal, experience, education, skills, certifications } = data;
  return `
    <div class="resume">
      <div class="resume-header">
        <h1>${personal.name || 'Your Name'}</h1>
        ${personal.title ? `<p class="title">${personal.title}</p>` : ''}
        <div class="contact-info">${renderContact(personal)}</div>
      </div>
      ${personal.summary ? `
      <div class="section">
        <div class="section-title">Summary</div>
        <p class="summary-text">${personal.summary}</p>
      </div>` : ''}
      ${experience && experience.length > 0 ? `
      <div class="section">
        <div class="section-title">Experience</div>
        ${experience.map(exp => `
          <div class="experience-entry">
            <div class="exp-header">
              <div>
                <div class="exp-role">${exp.role || ''}</div>
                <div class="exp-company">${exp.company || ''}</div>
              </div>
              <div class="exp-dates">${exp.start_date || ''}${exp.start_date ? ' – ' : ''}${exp.current ? 'Present' : (exp.end_date || '')}</div>
            </div>
            ${renderBullets(exp.bullets)}
          </div>
        `).join('')}
      </div>` : ''}
      ${education && education.length > 0 ? `
      <div class="section">
        <div class="section-title">Education</div>
        ${education.map(edu => `
          <div class="education-entry">
            <div class="edu-header">
              <div>
                <div class="edu-degree">${edu.degree || ''}${edu.field ? ` in ${edu.field}` : ''}</div>
                <div class="edu-institution">${edu.institution || ''}</div>
              </div>
              <div class="edu-dates">${edu.start_date || ''}${edu.start_date && edu.end_date ? ' – ' : ''}${edu.end_date || ''}</div>
            </div>
          </div>
        `).join('')}
      </div>` : ''}
      ${(skills.technical?.filter(s=>s.trim()).length > 0 || skills.soft?.filter(s=>s.trim()).length > 0) ? `
      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills-grid">
          ${skills.technical?.filter(s=>s.trim()).length > 0 ? `
          <div class="skill-group">
            <div class="skill-group-label">Technical</div>
            <div class="skill-tags">${skills.technical.filter(s=>s.trim()).map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
          </div>` : ''}
          ${skills.soft?.filter(s=>s.trim()).length > 0 ? `
          <div class="skill-group">
            <div class="skill-group-label">Soft Skills</div>
            <div class="skill-tags">${skills.soft.filter(s=>s.trim()).map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
          </div>` : ''}
        </div>
      </div>` : ''}
      ${certifications && certifications.filter(c=>c.name.trim()).length > 0 ? `
      <div class="section">
        <div class="section-title">Certifications</div>
        ${certifications.filter(c=>c.name.trim()).map(cert => `
          <div class="cert-entry">
            <span class="cert-name">${cert.name}</span>${cert.issuer ? ` — ${cert.issuer}` : ''}${cert.year ? ` (${cert.year})` : ''}
          </div>
        `).join('')}
      </div>` : ''}
    </div>
  `;
}

function renderModern(data) {
  const { personal, experience, education, skills, certifications } = data;
  const contactItems = [];
  if (personal.email) contactItems.push({ label: 'Email', value: personal.email });
  if (personal.phone) contactItems.push({ label: 'Phone', value: personal.phone });
  if (personal.location) contactItems.push({ label: 'Location', value: personal.location });
  if (personal.linkedin) contactItems.push({ label: 'LinkedIn', value: personal.linkedin });
  if (personal.website) contactItems.push({ label: 'Website', value: personal.website });

  return `
    <div class="resume">
      <div class="sidebar">
        <h1>${personal.name || 'Your Name'}</h1>
        ${personal.title ? `<p class="title">${personal.title}</p>` : ''}
        ${contactItems.length > 0 ? `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Contact</div>
          ${contactItems.map(item => `
            <div class="contact-item">
              <span class="contact-label">${item.label}</span>
              ${item.value}
            </div>
          `).join('')}
        </div>` : ''}
        ${skills.technical?.filter(s=>s.trim()).length > 0 ? `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Technical Skills</div>
          <div>${skills.technical.filter(s=>s.trim()).map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
        </div>` : ''}
        ${skills.soft?.filter(s=>s.trim()).length > 0 ? `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Soft Skills</div>
          <div>${skills.soft.filter(s=>s.trim()).map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
        </div>` : ''}
        ${certifications && certifications.filter(c=>c.name.trim()).length > 0 ? `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Certifications</div>
          ${certifications.filter(c=>c.name.trim()).map(cert => `
            <div class="cert-entry">
              <div class="cert-name" style="color:white;font-size:12px">${cert.name}</div>
              ${cert.issuer ? `<div style="font-size:11px;color:#BDC3C7">${cert.issuer}${cert.year ? ` · ${cert.year}` : ''}</div>` : ''}
            </div>
          `).join('')}
        </div>` : ''}
      </div>
      <div class="main-content">
        ${personal.summary ? `
        <div class="section">
          <div class="section-title">Profile</div>
          <p class="summary-text">${personal.summary}</p>
        </div>` : ''}
        ${experience && experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Experience</div>
          ${experience.map(exp => `
            <div class="experience-entry">
              <div class="exp-role">${exp.role || ''}</div>
              <div class="exp-company">${exp.company || ''}</div>
              <div class="exp-dates">${exp.start_date || ''}${exp.start_date ? ' – ' : ''}${exp.current ? 'Present' : (exp.end_date || '')}</div>
              ${renderBullets(exp.bullets)}
            </div>
          `).join('')}
        </div>` : ''}
        ${education && education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${education.map(edu => `
            <div class="education-entry">
              <div class="edu-degree">${edu.degree || ''}${edu.field ? ` in ${edu.field}` : ''}</div>
              <div class="edu-institution">${edu.institution || ''}</div>
              <div class="edu-dates">${edu.start_date || ''}${edu.start_date && edu.end_date ? ' – ' : ''}${edu.end_date || ''}</div>
            </div>
          `).join('')}
        </div>` : ''}
      </div>
    </div>
  `;
}

function renderMinimal(data) {
  const { personal, experience, education, skills, certifications } = data;
  return `
    <div class="resume">
      <div class="resume-header">
        <h1>${personal.name || 'Your Name'}</h1>
        ${personal.title ? `<p class="title">${personal.title}</p>` : ''}
        <div class="contact-info">${renderContact(personal)}</div>
      </div>
      ${personal.summary ? `
      <div class="section">
        <div class="section-title">About</div>
        <hr class="section-divider"/>
        <p class="summary-text">${personal.summary}</p>
      </div>` : ''}
      ${experience && experience.length > 0 ? `
      <div class="section">
        <div class="section-title">Experience</div>
        <hr class="section-divider"/>
        ${experience.map(exp => `
          <div class="experience-entry">
            <div class="exp-header">
              <div>
                <span class="exp-role">${exp.role || ''}</span>
                ${exp.company ? `<span class="exp-company"> · ${exp.company}</span>` : ''}
              </div>
              <div class="exp-dates">${exp.start_date || ''}${exp.start_date ? ' – ' : ''}${exp.current ? 'Present' : (exp.end_date || '')}</div>
            </div>
            ${renderBullets(exp.bullets)}
          </div>
        `).join('')}
      </div>` : ''}
      ${education && education.length > 0 ? `
      <div class="section">
        <div class="section-title">Education</div>
        <hr class="section-divider"/>
        ${education.map(edu => `
          <div class="education-entry">
            <div class="edu-header">
              <div>
                <div class="edu-degree">${edu.degree || ''}${edu.field ? ` in ${edu.field}` : ''}</div>
                <div class="edu-institution">${edu.institution || ''}</div>
              </div>
              <div class="edu-dates">${edu.start_date || ''}${edu.start_date && edu.end_date ? ' – ' : ''}${edu.end_date || ''}</div>
            </div>
          </div>
        `).join('')}
      </div>` : ''}
      ${(skills.technical?.filter(s=>s.trim()).length > 0 || skills.soft?.filter(s=>s.trim()).length > 0) ? `
      <div class="section">
        <div class="section-title">Skills</div>
        <hr class="section-divider"/>
        ${skills.technical?.filter(s=>s.trim()).length > 0 ? `
        <div class="skill-group">
          <div class="skill-group-label">Technical</div>
          <div class="skill-tags">${skills.technical.filter(s=>s.trim()).map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
        </div>` : ''}
        ${skills.soft?.filter(s=>s.trim()).length > 0 ? `
        <div class="skill-group">
          <div class="skill-group-label">Soft Skills</div>
          <div class="skill-tags">${skills.soft.filter(s=>s.trim()).map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
        </div>` : ''}
      </div>` : ''}
      ${certifications && certifications.filter(c=>c.name.trim()).length > 0 ? `
      <div class="section">
        <div class="section-title">Certifications</div>
        <hr class="section-divider"/>
        ${certifications.filter(c=>c.name.trim()).map(cert => `
          <div class="cert-entry">
            <span class="cert-name">${cert.name}</span>${cert.issuer ? ` · ${cert.issuer}` : ''}${cert.year ? ` · ${cert.year}` : ''}
          </div>
        `).join('')}
      </div>` : ''}
    </div>
  `;
}

export function generateHTML(resumeData, theme) {
  const cssMap = { classic: classicCSS, modern: modernCSS, minimal: minimalCSS };
  const css = cssMap[theme] || classicCSS;

  let bodyContent;
  if (theme === 'modern') {
    bodyContent = renderModern(resumeData);
  } else if (theme === 'minimal') {
    bodyContent = renderMinimal(resumeData);
  } else {
    bodyContent = renderClassic(resumeData);
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${resumeData.personal?.name || 'Resume'}</title>
  <style>${css}</style>
</head>
<body>
${bodyContent}
</body>
</html>`;
}

export function triggerDownload(html, filename) {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
