import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LocalPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleButtonClick = (event) => {
    const inputValue = document.getElementById('departure').value;
    if (inputValue === "") {
      event.preventDefault(); // Prevents navigation via <Link> if input is empty
      
      this.setState({
        error:'Fill your departure!',
      })
      
    } else {
      localStorage.setItem('pos1', JSON.stringify(inputValue));
      console.log(inputValue);
    }
  };

  handleChange = (event) => {
    this.setState({
      error: null,
    });
  };
  
  componentDidMount() {
    this.props.adapter.init(
      this.props.value,
      this.mapContainer,
      this.input,
      this.props.onChange,
      this.props.adapterConfig
    )
  }

  getContainerStyle() {
    return {
      border: '1px solid #CCC',
      ...this.props.containerSyle
    }
  }

  getInputStyle() {
    return {
      width: '100%',
      padding: 16,
      fontSize: 16,
      border: 0,
      boxSizing: 'border-box',
      ...this.props.inputStyle
    }
  }

  render() {
    const {error} = this.state;
    return (
      <div className='flex mt-0 mb-0'>
        <div className='w-1/2 text-center'>
            <h1 className='mt-24 font-bold text-4xl text-slate-700'>Where are you leaving from?</h1>
            <br/>
            {error?(
            <input
              id = 'departure'
              ref={input => this.input = input}
              onChange={this.handleChange}
              className='shake mb-4 bg-red-200 rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[400px] lg:w-[500px] xl:w-[700px] mt-8 font-semibold h-16'
              // style={this.getInputStyle()}
              type="text"
              placeholder={this.props.inputPlaceholder}
            />):(
              <input
              id = 'departure'
              ref={input => this.input = input}
              onChange={this.handleChange}
              className='mb-4 rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[400px] lg:w-[500px] xl:w-[700px] mt-8  bg-slate-200 font-semibold h-16'
              // style={this.getInputStyle()}
              type="text"
              placeholder={this.props.inputPlaceholder}
            />
            )
            }
            {error && <div className='font-medium text-red-600'>{error}</div>}
            <br></br>
            <Link to="/ride/dropoff"><button type='submit' onClick={this.handleButtonClick} className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Continue</button></Link>
        </div>
        <div className='w-1/2 cursor-pointer'>
          {
            this.props.map &&
            <div
              className='min-h-screen'
              ref={mapContainer => this.mapContainer = mapContainer}
            />
          }
        </div>
      </div>
    )
  }
}

LocalPicker.propTypes = {
  value: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  height: PropTypes.number,
  inputPlaceholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  containerSyle: PropTypes.object,
  inputStyle: PropTypes.object,
  adapterConfig: PropTypes.object,
  map: PropTypes.bool
}

LocalPicker.defaultProps = {
  height: 100,
  map: true
}

export default LocalPicker
