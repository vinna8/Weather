import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import LeftColumn from './components/LeftColumn/LeftColumn';
import RightColumn from './components/RightColumn/RightColumn';
import { currentWeather, dailyWeather } from './redux/actions';

function App() {
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]); 
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);  
    })
    if (latitude & longitude) {
      dispatch(currentWeather(latitude, longitude));
      dispatch(dailyWeather(latitude, longitude));
    }
}, [latitude, longitude])

  return (
    <div className="App">
      <div>
        <LeftColumn />
      </div>
      <div>
        <RightColumn />
      </div>
    </div>
  );
}

export default App;
