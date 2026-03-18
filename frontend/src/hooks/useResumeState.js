import { useState, useEffect, useCallback } from 'react'
import { encode, decode } from '../utils/hashEncoder'
import { v4 as uuidv4 } from 'uuid'

const DEFAULT_RESUME = {
  meta: { theme: 'classic' },
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: { technical: [], soft: [] },
  certifications: []
}

export function useResumeState() {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const hash = window.location.hash.slice(1)
      if (hash) {
        return decode(hash)
      }
    } catch (e) {
      console.warn('Failed to decode hash:', e)
    }
    return DEFAULT_RESUME
  })

  // Sync to URL hash on every state change
  useEffect(() => {
    try {
      window.location.hash = encode(resumeData)
    } catch (e) {
      console.warn('Failed to encode state:', e)
    }
  }, [resumeData])

  const updatePersonal = useCallback((field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }))
  }, [])

  const updateMeta = useCallback((field, value) => {
    setResumeData(prev => ({
      ...prev,
      meta: { ...prev.meta, [field]: value }
    }))
  }, [])

  // Experience
  const addExperience = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: uuidv4(),
        company: '',
        role: '',
        start_date: '',
        end_date: '',
        current: false,
        bullets: ['']
      }]
    }))
  }, [])

  const updateExperience = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }, [])

  const removeExperience = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }, [])

  const updateBullet = useCallback((expId, bulletIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp
        const newBullets = [...exp.bullets]
        newBullets[bulletIndex] = value
        return { ...exp, bullets: newBullets }
      })
    }))
  }, [])

  const addBullet = useCallback((expId) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
      )
    }))
  }, [])

  const removeBullet = useCallback((expId, bulletIndex) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp
        const newBullets = exp.bullets.filter((_, i) => i !== bulletIndex)
        return { ...exp, bullets: newBullets.length > 0 ? newBullets : [''] }
      })
    }))
  }, [])

  // Education
  const addEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: uuidv4(),
        institution: '',
        degree: '',
        field: '',
        start_date: '',
        end_date: ''
      }]
    }))
  }, [])

  const updateEducation = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }, [])

  const removeEducation = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }, [])

  // Skills
  const updateSkills = useCallback((type, skills) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [type]: skills }
    }))
  }, [])

  // Certifications
  const addCertification = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        id: uuidv4(),
        name: '',
        issuer: '',
        year: ''
      }]
    }))
  }, [])

  const updateCertification = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }))
  }, [])

  const removeCertification = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }))
  }, [])

  return {
    resumeData,
    updatePersonal,
    updateMeta,
    addExperience,
    updateExperience,
    removeExperience,
    updateBullet,
    addBullet,
    removeBullet,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    addCertification,
    updateCertification,
    removeCertification,
  }
}
