import React from 'react'
import LocalPicker from './LocalPicker'
import { mount } from 'enzyme'

describe('LocalPicker', () => {
  let wrapper

  const adapterMock = {
    init: jest.fn()
  }

  describe('when mounts', () => {
    it('works', () => {
      wrapper = mount(
        <LocalPicker
          value={{ lat: 5, lng: 5 }}
          adapter={adapterMock}
          loadingText="Loading..."
          inputPlaceholder="Search here..."
          onChange={() => {}}
        />
      )
    })

    it('inits adapter', () => {
      expect(adapterMock.init).toBeCalled()
    })
  })

  describe('input', () => {
    it('exists', () => {
      expect(wrapper.instance().input).not.toBeUndefined()
    })
  })

  describe('map container', () => {
    it('exists', () => {
      expect(wrapper.instance().mapContainer).not.toBeUndefined()
    })
  })
})
