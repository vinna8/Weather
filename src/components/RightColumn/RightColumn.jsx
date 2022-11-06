import styled from "styled-components";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { WiStrongWind, WiBarometer, WiHumidity, WiDaySunny, WiRain, WiCloudy } from "react-icons/wi";
import * as selectors from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { currentWeatherLocation, dailyWeatherLocation } from "../../redux/actions";

const RightColumn = () => {
    const {wind_spd, pres, rh, uv, precip, clouds, timezone} = useSelector(selectors.weatherCurrent); 
    const [fullDate, setFullDate] = useState(); 
    const [weekDay, setWeekDay] = useState(); 
    const [location, setLocation] = useState(''); 
    const weatherDaily = useSelector(selectors.weatherDaily);
    const dispatch = useDispatch(); 

    const NewDate = () => {
        const date = new Date();
        let week, month, day, year;
        
        if (timezone) {
            week = date.toLocaleString('en-us', { timeZone: `${timezone}`, weekday: 'long' });
            month = date.toLocaleString('en-us', { timeZone: `${timezone}`, month: 'long' });
            day = date.toLocaleString('en-us', { timeZone: `${timezone}`, day: 'numeric' });
            year = date.toLocaleString('en-us', { timeZone: `${timezone}`, year:'numeric' });
        }

        setFullDate(month + ' ' + day + ', ' + year);
        setWeekDay(week);
    }

    useEffect(() => {
        NewDate(); 
    })

    const handleKeyPress = (event) => {
        if(event.key == 'Enter'){
            console.log(location)
            dispatch(currentWeatherLocation(location));
            dispatch(dailyWeatherLocation(location));
            setLocation('');
        }
    }

    return (
        <Container>
            {wind_spd &&
            <>
            <Header>
                <div>
                    <WeekDay>
                        {weekDay}
                    </WeekDay>
                    <div>
                        {fullDate}
                    </div>
                </div>
                <div>
                    <Icon><HiOutlineMagnifyingGlass style={{color: "#898a8f"}}/></Icon>
                    <Input 
                        type="text"
                        name="city"
                        placeholder="Search location"
                        value={location}
                        onChange={event => {setLocation(event.target.value)}}
                        onKeyPress={event => {handleKeyPress(event)}}
                    />
                </div>
            </Header>
            <Line></Line>
            <div>
                <TodayInfo>
                    Today Overview
                </TodayInfo>
                <Column>
                    <InfoBlock>
                        <WiStrongWind style={{fontSize: '80px', marginBottom: '15px', color: '#173a7b'}}/>
                        <div>
                            <Parametr>
                                Wind Speed
                            </Parametr>
                            <Unit>
                                {Math.round(wind_spd)} m/c
                            </Unit>
                        </div>
                    </InfoBlock>

                    <InfoBlock>
                        <WiBarometer style={{fontSize: '80px', marginBottom: '15px', color: '#173a7b'}}/>
                        <div>
                            <Parametr>
                                Pressure
                            </Parametr>
                            <Unit>
                                {Math.round(pres * 0.750064)} mm Hb
                            </Unit>
                        </div>
                    </InfoBlock>

                    <InfoBlock>
                        <WiHumidity style={{fontSize: '80px', marginBottom: '15px', color: '#173a7b'}}/>
                        <div>
                            <Parametr>
                                Relative humidity
                            </Parametr>
                            <Unit>
                                {Math.round(rh)}%
                            </Unit>
                        </div>
                    </InfoBlock>
                </Column>
                <Column>
                    <InfoBlock>
                        <WiDaySunny style={{fontSize: '80px', marginBottom: '15px', color: '#173a7b'}}/>
                        <div>
                            <Parametr>
                                UV index
                            </Parametr>
                            <Unit>
                                {Math.round(uv)}
                            </Unit>
                        </div>
                    </InfoBlock>
                    
                    <InfoBlock>
                        <WiRain style={{fontSize: '80px', marginBottom: '15px', color: '#173a7b'}}/>
                        <div>
                            <Parametr>
                                Precipitation
                            </Parametr>
                            <Unit>
                                {Math.round(precip)} mm/hour
                            </Unit>
                        </div>
                    </InfoBlock>

                    <InfoBlock>
                        <WiCloudy style={{fontSize: '80px', marginBottom: '15px', color: '#173a7b'}}/>
                        <div>
                            <Parametr>
                                Cloud
                            </Parametr>
                            <Unit>
                                {Math.round(clouds)}%
                            </Unit>
                        </div>
                    </InfoBlock>
                </Column>
            </div>
            <div>
                <DailyInfo>
                Weather forecast for 7 days
                </DailyInfo>
                <Block>
                    {weatherDaily && weatherDaily.slice(1,8).map((daily, index) =>
                        <div key={index}>
                            <div style={{fontSize: '20px'}}> 
                                {new Date(daily.datetime).toLocaleString('en-us', { weekday: 'short' })}
                            </div>
                            <div>
                                {new Date(daily.datetime).toLocaleDateString('en-us', { day: 'numeric', month: 'short' })}
                            </div>
                            <div>
                                <IconWeather src={`https://www.weatherbit.io/static/img/icons/${daily.weather.icon}.png`} alt=""/>
                            </div>
                            <div>
                                {daily.app_max_temp} °C
                            </div>
                            <div style={{fontSize: '13px'}}>
                                {daily.app_min_temp} °C
                            </div>
                            <div style={{fontSize: '13px'}}>
                                {daily.weather.description}
                            </div>
                        </div>
                    )}
                </Block>
            </div>
            </>
            }
        </Container>
    );
}

export default RightColumn;

const Container = styled.div`
    padding: 30px;
    background-color: #ffffff; 
    height: 100vh;
    border-radius: 25px;
    color: #102747;
`

const Header = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
`

const WeekDay = styled.div`
    margin-bottom: 3px;
    font-size: 27px;
    font-weight: bold;
`

const Icon = styled.div`
    position: absolute;
    padding: 10px;
    min-width: 50px;
    text-align: center;
`

const Input = styled.input`
    padding: 10px;
    width: 500px;
    text-align: center;
    border-radius: 25px;
    border: none;
    background-color: #fbfbfb;
`

const Line = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid #425875;
`

const TodayInfo = styled.div`
    font-size: 18px;
    font-weight: bold;
`

const Column = styled.div`
    display: grid;
    grid-template-columns: 33% 33% 33%;
`

const InfoBlock = styled.div`
    margin: 15px;
    padding: 20px;
    width: auto;
    height: 90px;
    border-radius: 25px;
    background-color: rgba(251, 251, 251, 1);
    display: grid;
    grid-template-columns: 30% 70%;
`

const Parametr = styled.div`
    text-align: center;
    color: grey;
`

const Unit = styled.div`
    margin-top: 10px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #173a7b;
`

const DailyInfo = styled.div`
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
`

const Block = styled.div`
    margin: 15px;
    padding: 20px;
    width: auto;
    height: auto;
    border-radius: 25px;
    background-color: rgba(251, 251, 251, 1);
    display: grid;
    grid-template-columns: repeat(7, 1.5fr);
    text-align: center;
` 

const IconWeather = styled.img`
    width: 50px;
    height: 50px;
` 
