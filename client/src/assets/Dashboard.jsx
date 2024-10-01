/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { HiDotsVertical } from "react-icons/hi";
import { GrActions } from "react-icons/gr";
import { CiTempHigh } from "react-icons/ci";
import { IoWaterOutline } from "react-icons/io5";
import { GiDew } from "react-icons/gi";
import { PiWindFill } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { ConfigProvider, Slider, Dropdown, Space } from "antd";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import withAuth from "./auth/auth";
import moment from "moment";
import "moment-timezone";
import { motion } from "framer-motion";

const Dashboard = (user) => {
  // const navigate = useNavigate();

  // const state = useLocation();
  // const userProfile = state.state.state;
  // const user = JSON.parse(localStorage.getItem("user"));
  // const location = user ? user.location : "Mumbai";
  // console.log(user);
  // const [user, setUser] = useState({ name: "", location: "" });
  const [data, setData] = useState();
  const [hourlyData, setHourly] = useState();
  const [dailyData, setDailyData] = useState();
  const [currentDateTime, setcurrentDateTime] = useState();
  const [currentWeaIcon, setCurrentWeaIcon] = useState("");
  const [currentWMT, setcurrenWMT] = useState();
  const [currentWD, setCurrentWD] = useState("");
  const [currentMinMax, setMinMax] = useState();
  const [currentAI, setCurrentAI] = useState();
  const [currentUV, setUV] = useState({
    uv: null,
    desc: "",
    feelslike: null,
    humidity: null,
    windspeed: null,
    dew: null,
    visibility: null,
    datetimeEpoch: null,
    sunriseEpoch: null,
    sunsetEpoch: null,
    rise: null,
    set: null,
  });

  const [isNight, setIsNight] = useState(null);
  const [bgUrl, setBgUrl] = useState();
  const [timeOffset, setTimeOffset] = useState();

  // const [whiteBlack, setWhiteBlack] = useState();
  // const [whiteBlue, setWhiteBlue] = useState();

  // const location = userProfile.location;

  // eslint-disable-next-line no-unused-vars

  const converToLocalTime = (timeStamp, timeZone) => {
    const timeInMilliseconds = timeStamp * 1000;

    const timezoneOffSetInMinutes = timeZone / 60;

    const utcMoment = moment.utc(timeInMilliseconds);

    const localMoment = utcMoment.clone().utcOffset(timezoneOffSetInMinutes);

    return localMoment;
  };

  const fetchData = async () => {
    try {
      const location = user.user.location;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/getweather`,
        {
          location,
        }
      );
      console.log(response.data);

      // console.log(response.data);
      setData(response.data);
      const icn = response.data.weather[0].icon;
      setCurrentWeaIcon(icn);
      // const timeInMilliseconds = response.data.dt * 1000;

      // console.log(response.data.main.feels_like);
      const feelslike = Math.round(response.data.main.feels_like);

      // setUV(...currentUV, feelslike);

      // // Get the timezone offset in seconds and convert it to minutes
      // const timezoneOffsetInSeconds = response.data.timezone;
      // const timezoneOffsetInMinutes = timezoneOffsetInSeconds / 60;

      // // Create a Moment object for UTC time
      // const utcMoment = moment.utc(timeInMilliseconds);

      // // Convert to local time using Moment Timezone
      // const localMoment = utcMoment.clone().utcOffset(timezoneOffsetInMinutes);
      const time = response.data;

      setTimeOffset(time.timezone);
      const localMoment = converToLocalTime(time.dt, time.timezone);

      const currentDate = localMoment.format("dddd, MMMM D");
      // const currentDate = moment
      //   .unix(response.data.dt)
      //   .tz(time)
      //   .format("dddd, MMMM D");
      const currentTime = localMoment.format("h:mm A");
      // const currentTime = moment
      //   .unix(response.data.dt)
      //   .tz(time)
      //   .format("h:mm A");

      setcurrentDateTime(`${currentDate}  |   ${currentTime}`);
      const { sunrise, sunset } = response.data.sys;
      // console.log(sunrise, sunset);
      const currentRiseTime = sunrise;
      const currentSetTime = sunset;
      const checkCurrentTime = response.data.dt;

      // const currentTime = 1725256800;
      // console.log(
      //   checkCurrentTime >= currentSetTime ||
      //     checkCurrentTime <= currentRiseTime
      // );
      const getBackgroundImage = () => {
        switch (
          checkCurrentTime >= currentSetTime ||
          checkCurrentTime <= currentRiseTime
        ) {
          case true:
            return `url('../../images/Dashboard/Dashboard Night.svg')`;
          case false:
            return `url('../../images/Dashboard/Dashboard Day.svg')`;
          default:
            return `url('../../images/Dashboard/Blue.png')`;
        }
      };
      setBgUrl(getBackgroundImage());
      setIsNight(
        checkCurrentTime >= currentSetTime ||
          checkCurrentTime <= currentRiseTime
      );

      // const currentSunriseMiliSeconds = currentRiseTime * 1000;
      // const currenSunSetMiliSeconds = currentSetTime * 1000;

      // const riseutcMoment = moment.utc(currentSunriseMiliSeconds);
      // const setutcMoment = moment.utc(currenSunSetMiliSeconds);

      // const localRiseTime = riseutcMoment
      //   .clone()
      //   .utcOffset(timezoneOffsetInMinutes);
      // const localSetTime = setutcMoment
      //   .clone()
      //   .utcOffset(timezoneOffsetInMinutes);

      // moment
      //   .unix(response.data.dt)
      //   .tz(time)
      //   .format("h:mm A");

      const localRiseTime = converToLocalTime(currentRiseTime, time.timezone);
      const localSetTime = converToLocalTime(currentSetTime, time.timezone);

      const rise = localRiseTime.format("h:mm A");
      const set = localSetTime.format("h:mm A");

      // const rise = moment.unix(currentRiseTime).tz(time).format("h:mm A");
      // const set = moment.unix(currentSetTime).tz(time).format("h:mm A");

      setUV({
        ...currentUV,
        feelslike,
        rise,
        set,
      });
    } catch (error) {
      console.log(error.response.status, error.response.data);
    }
  };

  const fetchDailyData = async () => {
    const { lat, lon } = data.coord;
    console.log("ccccccccccccccccccc");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/getDaily`,
        {
          lat,
          lon,
        }
      );
      console.log(response, "daily");
      // const currentWeaI = response.data.currentConditions.icon;

      // setCurrentWeaIcon(currentWeaI);

      const minMax = response.data.days[0];
      setMinMax(
        `${Math.round(minMax.tempmin)}°/${Math.round(minMax.tempmax)}°`
      );
      const newData = response.data.days.slice(1);

      const editedNewData = newData.map((day, index) => ({
        weekDay:
          index === 0
            ? "Tommorow"
            : new Date(day.datetimeEpoch * 1000).toLocaleDateString("en-US", {
                weekday: "long",
              }),
        icon: day.icon,
        minmax: `${Math.round(day.tempmax)}º / ${Math.round(day.tempmin)}º`,
      }));
      setDailyData(editedNewData);
      // console.log(response.data);
      const uv = response.data.currentConditions.uvindex;

      const humidity = response.data.currentConditions.humidity;
      const windspeed = response.data.currentConditions.windspeed;
      const dew = response.data.currentConditions.dew;
      const visibility = response.data.currentConditions.visibility;
      const { datetimeEpoch, sunriseEpoch, sunsetEpoch } =
        response.data.currentConditions;

      const desc =
        uv < 3
          ? "Low"
          : uv < 6
          ? "Medium"
          : uv < 8
          ? "High"
          : uv < 11
          ? "Very High"
          : "Extreme";

      setUV({
        ...currentUV,
        uv,
        desc,

        humidity,
        windspeed,
        dew,
        visibility,
        datetimeEpoch,
        sunriseEpoch,
        sunsetEpoch,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const hourlyDataCall = async () => {
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/getHourly`,
        {
          lat,
          lon,
        }
      );
      const { list } = response.data;
      console.log(response.data, "hit hourly");
      const newlistData = list.map((item) => {
        // console.log(timeOffset);
        const localMoment = converToLocalTime(item.dt, timeOffset);

        const currentTime = localMoment.format("h A");

        return {
          time: currentTime,
          temp: Math.round(item.main.temp),
          iconcode: item.weather[0].icon,
        };
      });

      setHourly(newlistData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAirIndex = async () => {
    // console.log(data.coord);
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    try {
      if (data) {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/getairIndex`,
          {
            lat,
            lon,
          }
        );
        console.log(response, "air index fetched.....");
        const digit = response.data;
        let descAI = "";

        if (digit === 1) {
          descAI = "Good";
        } else if (digit === 2) {
          descAI = "Fair";
        } else if (digit === 3) {
          descAI = "Moderate";
        } else if (digit === 4) {
          descAI = "Poor";
        } else if (digit === 5) {
          descAI = "Very Poor";
        } else {
          descAI = "N.A";
        }
        // console.log(digit, descAI);

        setCurrentAI(`Air Quality : ${digit} - ${descAI}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data);

  // eslint-disable-next-line no-unused-vars
  // const getCurrentDateTime = () => {
  //   const now = new Date();

  //   const currentDate = now.toLocaleString("en-US", {
  //     weekday: "long",
  //     day: "numeric",
  //     month: "long",
  //   });

  //   const currentTime = now.toLocaleString("en-US", {
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //   });

  //   setcurrentDateTime(`${currentDate}  |   ${currentTime}`);
  // };

  // console.log(currentDateTime);

  // const getIconUrl = (iconCode) => {
  //   const baseUrl = "https://openweathermap.org/img/wn/";
  //   const iconSize = "@4x.png";

  //   return `${baseUrl}${iconCode}${iconSize}`;
  // };

  // const getCurrentWeatherIcon = () => {
  //   const url = getIconUrl(data.weather[0].icon);
  //   setCurrentWeaIcon(url);
  //   // console.log(url);
  // };

  const getCurrenWeatherTemp = () => {
    if (data) {
      // console.log(data);
      const cWT = Math.round(data.main.temp) + "º";
      setcurrenWMT(cWT);
    }
  };

  const getCurrentDescription = () => {
    const descript = data.weather[0].description;

    setCurrentWD(
      descript
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace(/\s+/g, " ")
    );
  };

  // const getCurrenMinMax = () => {
  //   const min = Math.round(data.main.temp_min);
  //   const max = Math.round(data.main.temp_max);

  //   setMinMax(`${min}°/${max}°`);
  // };
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (user) {
      fetchData();
      // getCurrentDateTime();
      // setInterval(() => {
      //   getCurrentDateTime();
      // }, 60000);
    }
    // getCurrentWeatherIcon();
    // getCurrentWeatherIcon();
  }, []);

  useEffect(() => {
    if (data) {
      // getCurrentWeatherIcon();
      getCurrenWeatherTemp();
      getCurrentDescription();
      // getCurrenMinMax();
      fetchAirIndex();

      fetchDailyData();
      hourlyDataCall();
    }
  }, [data]);

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/logout`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const items = [
    {
      label: <Link to="/profile">Profile</Link>,
      key: "0",
    },
    {
      label: (
        <Link to="/login" onClick={handleLogOut}>
          Logout
        </Link>
      ),
      key: "1",
    },
  ];

  //   console.log(data);

  //   useEffect(() => {
  //     fetchData();
  //     console.log("fetched now");

  //     setInterval(() => {
  //       fetchData();
  //     }, 15 * 60 * 1000);

  //

  //     setInterval(() => {
  //       getCurrentDateTime();
  //     }, 60 * 1000);
  //   }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
      className="w-[100vw] bg-cover overflow-hidden relative"
      style={{
        backgroundImage: bgUrl,
      }}>
      <div
        className="w-[3492px] h-[578px] mt-[-310px] absolute top-0   animate-translate"
        style={{
          backgroundImage: "url('../../images/Dashboard/Clouds.svg')",
        }}></div>
      <div className="max-w-[88%] z-10 relative flex flex-col py-[30px] justify-center items-center mx-auto">
        <div className="flex items-center justify-between w-full ">
          <div className={`flex flex-col ${isNight ? "text-white" : null}`}>
            <div className="flex items-center">
              <TfiLocationPin className=" text-lg mr-1" />
              <p className="text-lg font-medium">{user.user.location.name}</p>
            </div>
            <div className="text-[10px] ml-5">{currentDateTime}</div>
          </div>
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Dropdown: {
                    paddingBlock: 8,
                    controlPaddingHorizontal: 45,
                  },
                },
              }}>
              <Dropdown
                placement="bottomLeft"
                menu={{
                  items,
                }}
                trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <HiDotsVertical
                      className={`${isNight ? "text-white" : null}`}
                    />
                  </Space>
                </a>
              </Dropdown>
            </ConfigProvider>
          </div>
        </div>

        <img
          className="w-[240px] "
          src={`/images/icons/WeatherBigIcons/icons/${currentWeaIcon}.png`}
          loading="lazy"
        />
        <p
          className={`leading-none tracking-wide text-[80px]  ml-8 ${
            isNight ? "text-white" : null
          }`}>
          {currentWMT}
        </p>
        <div
          className={`flex gap-3 mt-2.5 tracking-wide text-xl font-medium ${
            isNight ? "text-white" : null
          }`}>
          <p>{currentWD}</p>
          <p className="tracking-wider">{currentMinMax}</p>
        </div>
        <p
          className={`text-[13px] mt-2.5 font-medium ${
            isNight ? "text-white" : null
          }`}>
          {currentAI}
        </p>

        <div
          className={`flex w-full py-3 rounded-xl ${
            isNight ? "bg-white" : " bg-[#C7D7F5]"
          } mt-8`}>
          {hourlyData && hourlyData.length > 0
            ? hourlyData.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="w-2/12 justify-center   text-center flex flex-col text-xs font-medium ">
                    <p className="leading-none text-[10px] font-medium">
                      {data.time}
                    </p>
                    <img
                      className=""
                      src={`/images/icons/WeatherBigIcons/icons/${data.iconcode}.png`}
                    />
                    <p className="leading-none text-[10px] ">{data.temp}º</p>
                  </div>
                );
              })
            : null}
        </div>
        <div
          className={`mt-8 flex flex-col gap-[7px] px-5 rounded-xl py-3 justify-center ${
            isNight ? "bg-white" : " bg-[#C7D7F5]"
          }  w-full`}>
          {dailyData && dailyData.length > 0
            ? dailyData.map((day, index) => {
                return (
                  <div key={index} className="flex justify-between text-[11px]">
                    <div className="flex">
                      <img
                        className="w-[37px]"
                        src={`/images/icons/WeatherBigIcons/${day.icon}.png`}
                      />
                      <p className="my-auto ml-[16px] tracking-wide font-medium">
                        {day.weekDay}
                      </p>
                    </div>
                    <p className="my-auto tracking-wide font-medium">
                      {day.minmax}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
        <div className="w-full mt-8">
          <div className="flex gap-5 mb-6">
            <div
              className={`w-4/12 py-2 px-3 ${
                isNight ? "bg-white" : " bg-[#C7D7F5]"
              } rounded-xl`}>
              <GrActions className="w-[30px] h-[32px] animate-pulse mb-3" />
              <p className="text-[11.2px] font-medium">UV</p>
              <div className="flex gap-2 items-center">
                <p className="text-[13.5px] font-bold">{currentUV.uv}</p>
                <p className="text-[11.2px]">{currentUV.desc}</p>
              </div>
            </div>
            <div
              className={`w-4/12 py-2 px-3 ${
                isNight ? "bg-white" : " bg-[#C7D7F5]"
              } rounded-xl`}>
              <CiTempHigh className="w-[30px] h-[32px] animate-pulse mb-3" />

              <p className="text-[11.2px] font-medium">Feels Like</p>
              <div className="flex gap-2">
                <p className="text-[13.5px] font-bold">
                  {currentUV.feelslike}º
                </p>
              </div>
            </div>
            <div
              className={`w-4/12 py-2 ${
                isNight ? "bg-white" : " bg-[#C7D7F5]"
              }  px-3 rounded-xl`}>
              <IoWaterOutline className="w-[30px] h-[32px] animate-pulse mb-3" />
              <p className="text-[11.2px] font-medium">Humidity</p>
              <div className="flex gap-2">
                <p className="text-[13.5px] font-bold">{currentUV.humidity}%</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div
              className={`w-4/12 py-2 ${
                isNight ? "bg-white" : " bg-[#C7D7F5]"
              }  px-3 rounded-xl`}>
              <GiDew className="w-[30px] h-[32px] animate-pulse mb-3" />
              <p className="text-[11.2px] font-medium">Dew</p>
              <div className="flex gap-2">
                <p className="text-[13.5px] font-bold">{currentUV.dew}</p>
              </div>
            </div>
            <div
              className={`w-4/12 py-2 ${
                isNight ? "bg-white" : " bg-[#C7D7F5]"
              }  px-3 rounded-xl`}>
              <FaRegEye className="w-[30px] h-[32px] animate-pulse mb-3" />

              <p className="text-[11.2px] font-medium">visibility</p>
              <div className="flex gap-2">
                <p className="text-[13.5px] font-bold">
                  {currentUV.visibility}
                </p>
              </div>
            </div>
            <div
              className={`w-4/12 py-2 ${
                isNight ? "bg-white" : " bg-[#C7D7F5]"
              }  px-3 rounded-xl`}>
              <PiWindFill className="w-[30px] h-[32px] animate-pulse mb-3" />
              <p className="text-[11.2px] font-medium">Windspeed</p>
              <div className="flex gap-2">
                <p className="text-[13.5px] font-bold">{currentUV.windspeed}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col w-full mt-8  ${
            isNight ? "bg-white" : " bg-[#C7D7F5]"
          } px-3 py-3 rounded-xl`}>
          <div className="flex justify-between text-[13.5px] font-medium mb-2">
            <div className="flex flex-col">
              <FiSunrise className="text-2xl" />
              <p className="">Sunrise</p>
            </div>
            <div className="flex flex-col">
              <FiSunset className="ml-auto text-2xl" />
              <p>Sunset</p>
            </div>
          </div>
          <ConfigProvider
            theme={{
              components: {
                Slider: {
                  trackBgDisabled: "#2F2F2F",
                  handleColorDisabled: "#2F2F2F",
                  railBg: "#ffff",
                },
              },
            }}>
            <Slider
              className="w-full m-0 animate-pulse"
              disabled
              value={currentUV.datetimeEpoch}
              min={currentUV.sunriseEpoch}
              max={currentUV.sunsetEpoch}
            />
          </ConfigProvider>
          <div className="flex justify-between font-semibold mt-2">
            <div>{currentUV.rise}</div>
            <div>{currentUV.set}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NamedDashboard = withAuth(Dashboard);

export default NamedDashboard;
