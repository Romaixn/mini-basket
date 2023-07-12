import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Interface from '../src/Interface'

describe("Interface test", () => {
    test("should show number of points", async () => {
        render(<Interface />)
        
        expect(screen.getByText(/0 points/i)).toBeDefined()
    })
})