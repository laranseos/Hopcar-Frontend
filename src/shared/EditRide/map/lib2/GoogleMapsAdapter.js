export function init(value, mapContainer, searchInput, onChange, config) {
  if (mapContainer) {
    initWithMap(value, mapContainer, searchInput, onChange, config)
  } else {
    initAutocompleteOnly(value, searchInput, onChange, config)
  }
}

function initAutocompleteOnly(value, searchInput, onChange, config) {
  const autocomplete = createAutoComplete(searchInput)

  autocomplete.addListener('place_changed', () => {
    const newPlace = autocomplete.getPlace()
    const validPlaceFound = newPlace.geometry && newPlace.address_components

    if (validPlaceFound) {
      fireOnChangeEvent(newPlace.geometry.location, newPlace.address_components, onChange)
    }
  })
}

function initWithMap(value, mapContainer, searchInput, onChange, config) {
  const map = createMap(mapContainer, config.map)
  const marker = createMarker(value, map)
  const autocomplete = createAutoComplete(searchInput)

  centerMapInMarker(map, marker)

  map.addListener('click', event => {
    changeMarkerPosition(marker, event.latLng)
    updateAddressAndFireOnChange(event.latLng, searchInput, config.text.loadingText, onChange)
  })

  autocomplete.addListener('place_changed', () => {
    const newPlace = autocomplete.getPlace()
    const validPlaceFound = newPlace.geometry && newPlace.address_components

    if (validPlaceFound) {
      changeMarkerPosition(marker, newPlace.geometry.location)
      centerMapInMarker(map, marker)
      fireOnChangeEvent(newPlace.geometry.location, newPlace.address_components, onChange)
    }
  })
}

function createMap(mapContainer, config) {
  return new window.google.maps.Map(
    mapContainer,
    config
  )
}

function createAutoComplete(input) {
  return new window.google.maps.places.Autocomplete(
    input,
    { types: ['geocode',  'establishment'] }
  )
}

function createMarker(position, map) {
  return new window.google.maps.Marker({
    position: new window.google.maps.LatLng(position.lat, position.lng),
    map
  })
}

function centerMapInMarker(map, marker) {
  map.setCenter(marker.position)
}

function changeMarkerPosition(marker, position) {
  marker.setPosition(position)
}

function fireOnChangeEvent(latLng, addressComponents, onChange) {
  const eventValue = {
    lat: latLng.lat(),
    lng: latLng.lng(),
    address: addressComponents
  }
  onChange(eventValue)
}

function updateAddressAndFireOnChange(position, input, loadingText, onChange) {
  const geocoder = new window.google.maps.Geocoder()

  input.value = loadingText

  geocoder.geocode({ location: position }, results => {
    const closestResult = results[0]
    input.value = closestResult.formatted_address
    fireOnChangeEvent(closestResult.geometry.location, closestResult.address_components, onChange)
  })
}
