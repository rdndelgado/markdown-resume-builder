import React, { useState } from 'react'
import { generateHTML, triggerDownload } from '../../utils/exportHTML'

export default function ExportBar({ resumeData }) {
  const [copied, setCopied] = useState(false)
  const theme = resumeData?.meta?.theme || 'classic'

  const handlePDF = () => {
    window.print()
  }

  const handleHTML = () => {
    const html = generateHTML(resumeData, theme)
    const name = resumeData?.personal?.name?.replace(/\s+/g, '_') || 'resume'
    triggerDownload(html, `${name}_resume.html`)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      // Fallback
      const el = document.createElement('textarea')
      el.value = window.location.href
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={handlePDF}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded hover:bg-gray-700 transition-colors"
        title="Download PDF via browser print dialog"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        PDF
      </button>

      <button
        onClick={handleHTML}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 border border-gray-300 text-xs font-medium rounded hover:bg-gray-50 hover:border-gray-400 transition-colors"
        title="Download as HTML file"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        HTML
      </button>

      <button
        onClick={handleCopyLink}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors border ${
          copied
            ? 'bg-green-50 text-green-700 border-green-300'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
        }`}
        title="Copy shareable link"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Link
          </>
        )}
      </button>
    </div>
  )
}
