import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GMap = () => {
  const googleMapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const [ride, setRide] = useState({
    from : localStorage.pos1,
    to : localStorage.pos2,
    hours: "",
    distance: "",   
    routeindex: 0,
    });

  useEffect(() => {
    const googleMap = initGoogleMap();
    setMap(googleMap);
  }, []);


  useEffect(() => {
    if (!map) return;

    var directionsService = new window.google.maps.DirectionsService();
    var directionsRenderer = new window.google.maps.DirectionsRenderer();
    var haight = new window.google.maps.LatLng(localStorage.pos1_lat, localStorage.pos1_lng);
    var oceanBeach = new window.google.maps.LatLng(localStorage.pos2_lat, localStorage.pos2_lng);
    var request = {
      origin: haight,
      destination: oceanBeach,
      provideRouteAlternatives: true,
      travelMode: 'DRIVING'
      
    };
    

    directionsService.route(request, function (response, status) {
      if (status === 'OK') {
        // directionsRenderer.setDirections(response);
        // directionsRenderer.setMap(map);
            // Clear existing routes from the map
          const newRoutes = [];
          directionsRenderer.setMap(null);
          directionsRenderer.setDirections(null);

          // Iterate over each route in the response
          for (var i = 0; i < response.routes.length; i++) {
            // Create a new instance of DirectionsRenderer for each route
            var renderer = new window.google.maps.DirectionsRenderer();
            renderer.setMap(map);
            
            // Set the route and display it on the map
            renderer.setDirections(response);
            renderer.setRouteIndex(i);
            if(selectedRoute) {
              renderer.setRouteIndex(selectedRoute.routeindex);
            }
            
            // Retrieve distance and duration for each route
            var route = response.routes[i];
            var distance = 0;
            var duration = 0;
         
            // Sum up distance and duration for each leg of the route
            for (var j = 0; j < route.legs.length; j++) {
              distance += route.legs[j].distance.value;
              duration += route.legs[j].duration.value;
            }
            // Convert distance to kilometers (or miles) and display
            var distanceInKm = distance / 1000;
            // console.log('Route ' + (i + 1) + ' - Distance: ' + distanceInKm + ' km');
            
            // Convert duration to minutes and display
            var durationInMinutes = duration / 60;
            // console.log('Route ' + (i + 1) + ' - Duration: ' + durationInMinutes + ' minutes');
            var hours = parseInt(durationInMinutes/60)+'h '+parseInt((durationInMinutes/60 - parseInt(durationInMinutes/60))*60)+'min';
            var temp = {duration: hours, distance:distanceInKm.toFixed(1) + 'km', routeindex: i};
            newRoutes.push(temp);
            // console.log(routes);
          }
          setRoutes(newRoutes);
      }
    });
  }, [map, selectedRoute])

  const initGoogleMap = () => {
    
    return new window.google.maps.Map(googleMapRef.current, {
      center: new window.google.maps.LatLng(45.8121649, 15.9837788),
      zoom: 12
    });
  }

  useEffect(() => {
    if (selectedRoute) {
      console.log("Selected Route:", selectedRoute);
      setRide(prev => ({ ...prev, hours : selectedRoute.duration, distance: selectedRoute.distance, routeindex:selectedRoute.routeindex }));
    }
  }, [selectedRoute]);

  const navigate = useNavigate();
  const handleSubmitClick = (e) => {
    e.preventDefault();
      navigate('/ride/date', {state:ride})
  };

  return (
    <div className='flex mt-0 mb-0'>
    <div className='w-1/2 text-center'>
        <h1 className='mt-12 font-bold text-4xl text-slate-700'>What is your route?</h1>
        <br></br>
        <div className="grid">
          {routes.map( (route, index) => (
            <div className="relative flex mr-auto ml-auto w-[400px] lg:w-[500px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 items-center">
              <label  htmlFor={"hs-radio-"+index} className="ml-6 h-16 w-[400px] lg:w-[00px] xl:w-[700px] font-semibold text-lg">
                <span className="block text-xl font-bold text-gray-800 dark:text-gray-300 text-left">{route.duration}</span>
                <span className="block text-lg text-left text-gray-600 dark:text-gray-500">{route.distance}</span>
              </label>
              <div className='ml-auto mr-4'>
                <input id={"hs-radio-"+index} onClick={() => setSelectedRoute(route)} name="hs-radio-with-description" type="radio" className=" rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 border-blue-500 dark:focus:ring-offset-gray-800" aria-describedby="hs-radio-delete-description"/>
              </div>
            </div>
          ))
          }
        </div>
        <br></br>
        <button type='submit' onClick={handleSubmitClick} className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Continue</button>
    </div>
    <div className='w-1/2'>
      <div ref={googleMapRef} className='h-screen '/>
    </div>
  </div>
    
  )
}

export default GMap;