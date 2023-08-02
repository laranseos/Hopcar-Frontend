import { LocalPicker, GoogleMapsAdapter } from './'

describe('Index file', () => {
  it('exports LocalPicker', () => {
    expect(LocalPicker).not.toBeUndefined()
  })

  it('exports GoogleMapsAdapter', () => {
    expect(GoogleMapsAdapter).not.toBeUndefined()
  })
})
