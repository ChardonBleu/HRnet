import { describe, it, expect} from 'vitest'
import { render, screen} from '@testing-library/react'
import Home from './home'
import { MemoryRouter } from 'react-router'

describe('Home', () => {
    it('renders with title', () => {
       render(<MemoryRouter  initialEntries={['/']}><Home /></MemoryRouter>)
       const title = screen.getByText("Create Employee")
       expect(title).toBeInTheDocument()
    })
})