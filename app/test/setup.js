import '@testing-library/jest-dom'

// Si vous utilisez des globals spécifiques à React Testing Library
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Nettoyer le DOM après chaque test
afterEach(() => {
  cleanup()
})