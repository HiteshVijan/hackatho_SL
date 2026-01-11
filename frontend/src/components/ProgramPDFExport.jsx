import { motion } from 'framer-motion'
import { Download, FileText, Printer } from 'lucide-react'

// Generate HTML content for PDF export
export function generateProgramHTML(program, user) {
  const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${program.data.programName || program.name} - Program Design Document</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #fff;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 3px solid #d4af37;
      margin-bottom: 40px;
    }
    
    .logo {
      font-size: 14px;
      color: #d4af37;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 10px;
    }
    
    h1 {
      font-family: 'Crimson Pro', serif;
      font-size: 32px;
      color: #1a472a;
      margin-bottom: 10px;
    }
    
    .subtitle {
      color: #666;
      font-size: 14px;
    }
    
    .meta {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
    
    .section {
      margin-bottom: 35px;
      page-break-inside: avoid;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;
    }
    
    .section-number {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #d4af37, #b8942e);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }
    
    .section-title {
      font-family: 'Crimson Pro', serif;
      font-size: 20px;
      color: #1a472a;
    }
    
    .field {
      margin-bottom: 20px;
    }
    
    .field-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #d4af37;
      margin-bottom: 6px;
      font-weight: 600;
    }
    
    .field-content {
      background: #fafafa;
      padding: 15px;
      border-radius: 8px;
      border-left: 3px solid #d4af37;
      white-space: pre-wrap;
      font-size: 14px;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #f0f0f0;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
    
    .footer-logo {
      color: #d4af37;
      font-weight: 600;
    }
    
    .badge {
      display: inline-block;
      background: linear-gradient(135deg, #1a472a, #2d5a3d);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      margin-left: 10px;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      .section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">⚒️ ProgramForge</div>
    <h1>${program.data.programName || program.name}</h1>
    <p class="subtitle">Program Design Document</p>
    <div class="meta">
      <span>📅 Created: ${formatDate(program.createdAt)}</span>
      <span>📝 Last Updated: ${formatDate(program.updatedAt)}</span>
      <span>✅ Progress: ${Math.round((program.completedStages.length / 7) * 100)}%</span>
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <div class="section-number">1</div>
      <h2 class="section-title">Problem Definition</h2>
    </div>
    
    <div class="field">
      <div class="field-label">Problem Statement</div>
      <div class="field-content">${program.data.problemStatement || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Context & Background</div>
      <div class="field-content">${program.data.context || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Scope & Scale</div>
      <div class="field-content">${program.data.scope || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Target Beneficiaries</div>
      <div class="field-content">${program.data.targetBeneficiaries || 'Not specified'}</div>
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <div class="section-number">2</div>
      <h2 class="section-title">Outcome Vision</h2>
    </div>
    
    <div class="field">
      <div class="field-label">Primary Student Outcomes</div>
      <div class="field-content">${program.data.primaryOutcomes || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Secondary Outcomes</div>
      <div class="field-content">${program.data.secondaryOutcomes || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Success Indicators</div>
      <div class="field-content">${program.data.indicators || 'Not specified'}</div>
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <div class="section-number">3</div>
      <h2 class="section-title">Stakeholder Map</h2>
    </div>
    
    <div class="field">
      <div class="field-label">Primary Stakeholders</div>
      <div class="field-content">${program.data.primaryStakeholders || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Secondary Stakeholders</div>
      <div class="field-content">${program.data.secondaryStakeholders || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Potential Partnerships</div>
      <div class="field-content">${program.data.partnerships || 'Not specified'}</div>
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <div class="section-number">4</div>
      <h2 class="section-title">Practice Changes</h2>
    </div>
    
    <div class="field">
      <div class="field-label">Current Practices</div>
      <div class="field-content">${program.data.currentPractices || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Desired Practices</div>
      <div class="field-content">${program.data.desiredPractices || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Barriers to Change</div>
      <div class="field-content">${program.data.barriers || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Enablers for Change</div>
      <div class="field-content">${program.data.enablers || 'Not specified'}</div>
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <div class="section-number">5</div>
      <h2 class="section-title">Success Metrics</h2>
    </div>
    
    <div class="field">
      <div class="field-label">Leading Indicators</div>
      <div class="field-content">${program.data.leadIndicators || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Lagging Indicators (Outcomes)</div>
      <div class="field-content">${program.data.lagIndicators || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Data Collection Methods</div>
      <div class="field-content">${program.data.dataCollection || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Monitoring Frequency</div>
      <div class="field-content">${program.data.frequency || 'Not specified'}</div>
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <div class="section-number">6</div>
      <h2 class="section-title">Theory of Change</h2>
    </div>
    
    <div class="field">
      <div class="field-label">Inputs (Resources)</div>
      <div class="field-content">${program.data.inputs || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Activities</div>
      <div class="field-content">${program.data.activities || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Outputs</div>
      <div class="field-content">${program.data.outputs || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Outcomes</div>
      <div class="field-content">${program.data.outcomes || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Key Assumptions</div>
      <div class="field-content">${program.data.assumptions || 'Not specified'}</div>
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <div class="section-number">7</div>
      <h2 class="section-title">Program Blueprint</h2>
    </div>
    
    <div class="field">
      <div class="field-label">Implementation Timeline</div>
      <div class="field-content">${program.data.timeline || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Resource Requirements</div>
      <div class="field-content">${program.data.resources || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Key Risks</div>
      <div class="field-content">${program.data.risks || 'Not specified'}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Risk Mitigations</div>
      <div class="field-content">${program.data.mitigations || 'Not specified'}</div>
    </div>
  </div>
  
  <div class="footer">
    <p>Generated by <span class="footer-logo">⚒️ ProgramForge</span></p>
    <p style="margin-top: 5px;">Aligned with Shikshagraha's Common Logical Framework</p>
    <p style="margin-top: 10px; font-size: 11px;">
      Innovation for Education Equity Hackathon 2026 | ShikshaLokam
    </p>
  </div>
</body>
</html>
`
}

export default function ProgramPDFExport({ program }) {
  const handleExportPDF = () => {
    const html = generateProgramHTML(program)
    const printWindow = window.open('', '_blank')
    printWindow.document.write(html)
    printWindow.document.close()
    
    // Auto-trigger print dialog
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
  
  const handleExportHTML = () => {
    const html = generateProgramHTML(program)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(program.data.programName || program.name).replace(/\s+/g, '_')}_Program_Document.html`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className="flex gap-3">
      <motion.button
        className="btn-primary flex items-center gap-2"
        onClick={handleExportPDF}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Printer size={18} />
        Print / Save as PDF
      </motion.button>
      
      <motion.button
        className="btn-secondary flex items-center gap-2"
        onClick={handleExportHTML}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FileText size={18} />
        Download HTML
      </motion.button>
    </div>
  )
}

