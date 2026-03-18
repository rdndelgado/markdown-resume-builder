import React from 'react'
import '../../themes/classic.css'
import '../../themes/modern.css'
import '../../themes/minimal.css'

function ContactItems({ personal }) {
  const items = []
  if (personal.email) items.push(personal.email)
  if (personal.phone) items.push(personal.phone)
  if (personal.location) items.push(personal.location)
  if (personal.linkedin) items.push(personal.linkedin)
  if (personal.website) items.push(personal.website)
  return items
}

function ClassicPreview({ data }) {
  const { personal, experience, education, skills, certifications } = data
  const contacts = ContactItems({ personal })

  return (
    <div className="resume-classic">
      <div className="resume-header">
        <h1 className="resume-name">{personal.name || <span className="empty-state">Your Name</span>}</h1>
        {personal.title && <p className="resume-title">{personal.title}</p>}
        {contacts.length > 0 && (
          <div className="contact-info">
            {contacts.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="contact-sep">|</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {personal.summary && (
        <div className="section">
          <div className="section-title">Summary</div>
          <p className="summary-text">{personal.summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="section">
          <div className="section-title">Experience</div>
          {experience.map(exp => (
            <div key={exp.id} className="experience-entry">
              <div className="exp-header">
                <div className="exp-left">
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-company">{exp.company}</div>
                </div>
                <div className="exp-dates">
                  {exp.start_date}{exp.start_date ? ' – ' : ''}
                  {exp.current ? 'Present' : exp.end_date}
                </div>
              </div>
              {exp.bullets && exp.bullets.filter(b => b.trim()).length > 0 && (
                <ul className="bullets">
                  {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="section">
          <div className="section-title">Education</div>
          {education.map(edu => (
            <div key={edu.id} className="education-entry">
              <div className="edu-header">
                <div className="edu-left">
                  <div className="edu-degree">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </div>
                  <div className="edu-institution">{edu.institution}</div>
                </div>
                <div className="edu-dates">
                  {edu.start_date}{edu.start_date && edu.end_date ? ' – ' : ''}{edu.end_date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(skills.technical?.filter(s=>s.trim()).length > 0 || skills.soft?.filter(s=>s.trim()).length > 0) && (
        <div className="section">
          <div className="section-title">Skills</div>
          <div className="skills-grid">
            {skills.technical?.filter(s=>s.trim()).length > 0 && (
              <div className="skill-group">
                <div className="skill-group-label">Technical</div>
                <div className="skill-tags">
                  {skills.technical.filter(s=>s.trim()).map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft?.filter(s=>s.trim()).length > 0 && (
              <div className="skill-group">
                <div className="skill-group-label">Soft Skills</div>
                <div className="skill-tags">
                  {skills.soft.filter(s=>s.trim()).map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {certifications && certifications.filter(c=>c.name.trim()).length > 0 && (
        <div className="section">
          <div className="section-title">Certifications</div>
          {certifications.filter(c=>c.name.trim()).map(cert => (
            <div key={cert.id} className="cert-entry">
              <span className="cert-name">{cert.name}</span>
              {cert.issuer ? ` — ${cert.issuer}` : ''}
              {cert.year ? ` (${cert.year})` : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ModernPreview({ data }) {
  const { personal, experience, education, skills, certifications } = data
  const contactItems = []
  if (personal.email) contactItems.push({ label: 'Email', value: personal.email })
  if (personal.phone) contactItems.push({ label: 'Phone', value: personal.phone })
  if (personal.location) contactItems.push({ label: 'Location', value: personal.location })
  if (personal.linkedin) contactItems.push({ label: 'LinkedIn', value: personal.linkedin })
  if (personal.website) contactItems.push({ label: 'Website', value: personal.website })

  return (
    <div className="resume-modern">
      <div className="sidebar">
        <div className="sidebar-name">{personal.name || <span style={{color:'#7F8C8D',fontWeight:300}}>Your Name</span>}</div>
        {personal.title && <div className="sidebar-title">{personal.title}</div>}

        {contactItems.length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">Contact</div>
            {contactItems.map(item => (
              <div key={item.label} className="contact-item">
                <span className="contact-label">{item.label}</span>
                <span className="contact-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {skills.technical?.filter(s=>s.trim()).length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">Technical Skills</div>
            <div>
              {skills.technical.filter(s=>s.trim()).map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
        )}

        {skills.soft?.filter(s=>s.trim()).length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">Soft Skills</div>
            <div>
              {skills.soft.filter(s=>s.trim()).map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.filter(c=>c.name.trim()).length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">Certifications</div>
            {certifications.filter(c=>c.name.trim()).map(cert => (
              <div key={cert.id} className="cert-entry">
                <span className="cert-name">{cert.name}</span>
                {(cert.issuer || cert.year) && (
                  <span className="cert-meta">
                    {cert.issuer}{cert.issuer && cert.year ? ' · ' : ''}{cert.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="main-content">
        {personal.summary && (
          <div className="section">
            <div className="section-title">Profile</div>
            <p className="summary-text">{personal.summary}</p>
          </div>
        )}

        {experience && experience.length > 0 && (
          <div className="section">
            <div className="section-title">Experience</div>
            {experience.map(exp => (
              <div key={exp.id} className="experience-entry">
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company">{exp.company}</div>
                <div className="exp-dates">
                  {exp.start_date}{exp.start_date ? ' – ' : ''}
                  {exp.current ? 'Present' : exp.end_date}
                </div>
                {exp.bullets && exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="bullets">
                    {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education && education.length > 0 && (
          <div className="section">
            <div className="section-title">Education</div>
            {education.map(edu => (
              <div key={edu.id} className="education-entry">
                <div className="edu-degree">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                <div className="edu-institution">{edu.institution}</div>
                <div className="edu-dates">
                  {edu.start_date}{edu.start_date && edu.end_date ? ' – ' : ''}{edu.end_date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function MinimalPreview({ data }) {
  const { personal, experience, education, skills, certifications } = data
  const contacts = ContactItems({ personal })

  return (
    <div className="resume-minimal">
      <div className="resume-header">
        <h1 className="resume-name">{personal.name || <span className="empty-state">Your Name</span>}</h1>
        {personal.title && <p className="resume-title">{personal.title}</p>}
        {contacts.length > 0 && (
          <div className="contact-info">
            {contacts.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
      </div>

      {personal.summary && (
        <div className="section">
          <div className="section-title">About</div>
          <hr className="section-divider" />
          <p className="summary-text">{personal.summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="section">
          <div className="section-title">Experience</div>
          <hr className="section-divider" />
          {experience.map(exp => (
            <div key={exp.id} className="experience-entry">
              <div className="exp-header">
                <div className="exp-left">
                  <span className="exp-role">{exp.role}</span>
                  {exp.company && <span className="exp-company"> · {exp.company}</span>}
                </div>
                <div className="exp-dates">
                  {exp.start_date}{exp.start_date ? ' – ' : ''}
                  {exp.current ? 'Present' : exp.end_date}
                </div>
              </div>
              {exp.bullets && exp.bullets.filter(b => b.trim()).length > 0 && (
                <ul className="bullets">
                  {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="section">
          <div className="section-title">Education</div>
          <hr className="section-divider" />
          {education.map(edu => (
            <div key={edu.id} className="education-entry">
              <div className="edu-header">
                <div className="edu-left">
                  <div className="edu-degree">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                  <div className="edu-institution">{edu.institution}</div>
                </div>
                <div className="edu-dates">
                  {edu.start_date}{edu.start_date && edu.end_date ? ' – ' : ''}{edu.end_date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(skills.technical?.filter(s=>s.trim()).length > 0 || skills.soft?.filter(s=>s.trim()).length > 0) && (
        <div className="section">
          <div className="section-title">Skills</div>
          <hr className="section-divider" />
          {skills.technical?.filter(s=>s.trim()).length > 0 && (
            <div className="skill-group">
              <div className="skill-group-label">Technical</div>
              <div className="skill-tags">
                {skills.technical.filter(s=>s.trim()).map((s, i, arr) => (
                  <span key={s} className="skill-tag" style={i === arr.length - 1 ? {'--after-content': 'none'} : {}}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {skills.soft?.filter(s=>s.trim()).length > 0 && (
            <div className="skill-group">
              <div className="skill-group-label">Soft Skills</div>
              <div className="skill-tags">
                {skills.soft.filter(s=>s.trim()).map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {certifications && certifications.filter(c=>c.name.trim()).length > 0 && (
        <div className="section">
          <div className="section-title">Certifications</div>
          <hr className="section-divider" />
          {certifications.filter(c=>c.name.trim()).map(cert => (
            <div key={cert.id} className="cert-entry">
              <span className="cert-name">{cert.name}</span>
              {cert.issuer ? ` · ${cert.issuer}` : ''}
              {cert.year ? ` · ${cert.year}` : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Preview({ resumeData }) {
  const theme = resumeData?.meta?.theme || 'classic'

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded overflow-auto" style={{ minHeight: '600px' }}>
      {theme === 'modern' && <ModernPreview data={resumeData} />}
      {theme === 'minimal' && <MinimalPreview data={resumeData} />}
      {theme === 'classic' && <ClassicPreview data={resumeData} />}
    </div>
  )
}
