import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../../App.jsx'

// jsdom lacks IntersectionObserver; provide a no-op so the hook doesn't throw.
beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('portfolio content', () => {
  it('renders the name in nav and hero', () => {
    render(<App />)
    expect(screen.getAllByText('ANDRE NEIL').length).toBeGreaterThan(0)
  })

  it('renders each section heading', () => {
    render(<App />)
    for (const h of ['Profile', 'Experience', 'HLASM Knowledge', 'Skills', 'Contact']) {
      expect(screen.getByRole('heading', { name: h })).toBeInTheDocument()
    }
  })

  it('renders all four employers', () => {
    render(<App />)
    expect(screen.getByText(/z\/OS JES Tech Support/)).toBeInTheDocument()
    expect(screen.getByText(/z\/OSMF Core Support/)).toBeInTheDocument()
    expect(screen.getByText(/Mainframe QA Tester Analyst/)).toBeInTheDocument()
    expect(screen.getByText(/Knowledge Transfer/)).toBeInTheDocument()
  })

  it('renders a mailto link with the resume email', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: 'atrumcarv@gmail.com' })
    expect(link).toHaveAttribute('href', 'mailto:atrumcarv@gmail.com')
  })

  it('renders key HLASM topic cards', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'The USING Instruction' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Relocatability' })).toBeInTheDocument()
  })
})
