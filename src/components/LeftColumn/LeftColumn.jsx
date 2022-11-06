import styled from "styled-components";
import { CiCircleChevUp, CiCircleChevDown } from "react-icons/ci";
import { WiHorizonAlt, WiHorizon } from "react-icons/wi";
import * as selectors from "../../redux/selectors";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

const LeftColumn = () => {
    const {city_name, country_code, temp, app_temp, sunrise, sunset, weather, timezone} = useSelector(selectors.weatherCurrent); 
    const [time, setTime] = useState(new Date());
    const [timeSunrise, setTimeSunrise] = useState('');
    const [timeSunset, setTimeSunset] = useState('');

    let url;
    if (weather) {
        url = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`;
    }

    const TimeNew = () => {
        if (timezone) {
            let newTimeHour, newTimeMinute, newHour, newMinute; 
            const gmt = moment(time).tz(`${timezone}`).format('Z');
            /*const gmt =(new Date().toLocaleString(["en-US"], {timeZone: `${timezone}`, timeZoneName: 'short'})).split(' ')[3].replace('GMT', '');*/
            const hour = Number(gmt[1] + gmt[2]) * 60;
            const minute = Number(gmt[4] + gmt[5]);

            if (gmt) {
                if (sunrise) {
                    newHour = (gmt[0] == '+') ? (Number(sunrise[0] + sunrise[1]) * 60 + hour) : (Number(sunrise[0] + sunrise[1]) * 60 - hour)
                    newMinute = (gmt[0] == '+') ? (Number(sunrise[3] + sunrise[4]) + minute) : (Number(sunrise[3] + sunrise[4]) - minute)
                    newTimeHour = Math.floor((newHour + newMinute) / 60);
                    newTimeHour = (newTimeHour <= 24) ? newTimeHour : newTimeHour - 12;
                    newTimeHour = (newTimeHour <= 12) ? newTimeHour : newTimeHour - 12;
                    newTimeHour = (newTimeHour < 10) ? ('0' + newTimeHour) : newTimeHour;
                    newTimeMinute = (((newHour + newMinute) % 60) < 10) ? ('0' + ((newHour + newMinute) % 60)) : ((newHour + newMinute) % 60);
                    setTimeSunrise(newTimeHour + ':' + newTimeMinute);
                }
                if (sunset) {
                    newHour = (gmt[0] == '+') ? (Number(sunset[0] + sunset[1]) * 60 + hour) : (Number(sunset[0] + sunset[1]) * 60 - hour)
                    newMinute = (gmt[0] == '+') ? (Number(sunset[3] + sunset[4]) + minute) : (Number(sunset[3] + sunset[4]) - minute)
                    newTimeHour = Math.floor((newHour + newMinute) / 60);
                    newTimeHour = (newTimeHour <= 24) ? newTimeHour : newTimeHour - 12;
                    newTimeHour = (newTimeHour <= 12) ? newTimeHour : newTimeHour - 12;
                    newTimeHour = (newTimeHour < 10) ? ('0' + newTimeHour) : newTimeHour;
                    newTimeMinute = (((newHour + newMinute) % 60) < 10) ? ('0' + ((newHour + newMinute) % 60)) : ((newHour + newMinute) % 60);
                    setTimeSunset(newTimeHour + ':' + newTimeMinute);
                }
            }
        }
    }

    useEffect(() => {
        TimeNew();
    })

    useEffect(() => {
        let TimeId = setInterval(() => setTime(new Date()), 1000 * 60);
        return () => {
            clearInterval(TimeId);
        }
    }) 

    return (
        <Container>
            {weather &&
            <>
            <Header>
                <div>
                    <City>
                        {city_name}
                    </City>
                    {country_code}
                </div>
                <Time>
                    {time.toLocaleTimeString(["en-US"], { timeZone: `${timezone}`, hour: '2-digit', minute: '2-digit', hour12: true })}
                </Time>
            </Header>

            <TempInfo>
                <div>
                    <div>
                        <Img src={url} alt=""/>
                    </div>
                    <Temperature>
                        {temp} °C
                    </Temperature>
                </div>
                <Description>
                    {weather.description}
                </Description>
                <div>
                    Feels like {app_temp} °C
                </div>
            </TempInfo>

            <Line></Line>

            {/*<HourlyWeather>
                    Hourly Weather Forecast
                <HourlyBlock>
                    <CiCircleChevUp style={{fontSize: '40px', marginBottom: '15px', cursor: 'pointer'}}/>
                    <TemperatureHourly>
                        <div>
                            Картинка
                            <div>
                                Время
                            </div>
                        </div>
                        <div>
                            20 *С
                        </div>
                        </TemperatureHourly>
                    <CiCircleChevDown style={{fontSize: '40px', marginTop: '15px', cursor: 'pointer'}}/>
                </HourlyBlock>
            </HourlyWeather>*/}

            <Sun>
                Sunrise & Sunset
                <SunBlock>
                    <div>
                        <WiHorizonAlt style={{fontSize: '80px', marginLeft: '25px'}}></WiHorizonAlt>
                    </div>
                    <div>
                        Sunrise
                        <TimeSun>{timeSunrise} AM</TimeSun>
                    </div>
                </SunBlock>
                <SunBlock>
                    <div>
                        <WiHorizon style={{fontSize: '80px', marginLeft: '25px'}}></WiHorizon>
                    </div>
                    <div>
                        Sunset
                        <TimeSun>{timeSunset} PM</TimeSun>
                    </div>
                </SunBlock>
            </Sun>
            </>
            }
        </Container>
    );
}

export default LeftColumn;

const Container = styled.div`
    padding: 30px;
    background: rgb(254,254,254);
    background: linear-gradient(90deg, rgba(254,254,254,1) 0%, rgba(22,56,122,1) 0%, rgba(31,62,99,1) 100%);
    color: white;
    height: 100vh;
    border-radius: 25px;
`
const Header = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 50px;
`

const City = styled.div`
    margin-bottom: 3px;
    font-size: 27px;
`

const Time = styled.div`
    margin-top: 10px;
    font-size: 30px;
    text-align: center;
`

const TempInfo = styled.div`
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`

const Img = styled.img`
    width: 90px;
    height: 90px;
`

const Temperature = styled.div`
    font-size: 50px;
`

const Description = styled.div`
    margin-top: 35px;
    font-size: 18px;
`

const Line = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid #425875;
`

const HourlyWeather = styled.div`
    font-size: 18px;
`

const HourlyBlock = styled.div`
    margin-top: 30px;
    text-align: center;
`

const TemperatureHourly = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`

const Sun = styled.div`
    margin-top: 50px;
    font-size: 18px;
`

const SunBlock = styled.div`
    margin-top: 20px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: auto;
    height: 70px;
    border: 1px solid #6082c5;
    border-radius: 25px;
    background-color: rgba(44, 72, 124, 0.8);
`

const TimeSun = styled.div`
    margin-top: 5px;
    font-size: 25px;
`