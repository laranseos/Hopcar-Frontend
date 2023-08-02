const google = {
  maps: {
    events: {},
    event: {
      trigger: (eventName, event) => {
        google.maps.events[eventName](event)
      }
    },
    Map: jest.fn(function() {
      this.setCenter = jest.fn()
      this.addListener = (eventName, callback) => {
        google.maps.events[eventName] = callback
      }
    }),
    LatLng: function(lat, lng) {
      return { lat, lng }
    },
    Marker: jest.fn(function() {
      this.setPosition = jest.fn()
    }),
    Geocoder: jest.fn(() => {
      return {
        geocode: (location, callback) => {
          const results = [
            { 
              formatted_address: 'Belo Horizonte - MG',
              geometry: {
                location: {
                  lat: jest.fn(() => 5),
                  lng: jest.fn(() => 5)
                }
              },
              address_components: []
            }
          ]

          callback(results)
        }
      }
    }),
    places: {
      Autocomplete: jest.fn(function() {
        this.addListener = (eventName, callback) => {
          google.maps.events[eventName] = callback
        }
        this.getPlace = () => {
          return {
            geometry: {
              location: {
                lat: jest.fn(() => 5),
                lng: jest.fn(() => 5)
              }
            },
            address_components: []
          }
        }
      })
    }
  }
}

export default google
