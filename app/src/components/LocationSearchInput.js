import React from 'react'
import { connect } from 'react-redux'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { GoogleApiWrapper } from 'google-maps-react'
import { setCurrentLocation } from '../action-creators/positions'

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
  }

  handleChange = address => {
    this.setState({ address })
  }

  handleSelect = address => {
    this.setState({ address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log(latLng)
        this.props.setCurrentLocation(latLng)
      })
      .catch(error => console.error('Error', error))
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search by address ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(
  connect(
    null,
    { setCurrentLocation }
  )(LocationSearchInput)
)
