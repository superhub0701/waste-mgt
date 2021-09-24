import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Dashboard from "./main";
import {logoutIcon, logoIcon} from "../components/image"

const useStyles = makeStyles(theme=> ({
  container: {
    [theme.breakpoints.down(768)]: {
      maxWidth: '100%',
    }
  },
  logoutContainer: {position: 'absolute', top: 10, right: 0, zIndex: 1},
  logout_img: {
    width: 200,
    [theme.breakpoints.down(768)]: {
      width: 160,
    }
  },
  logo_img: {
    width: 200,
    height: 60, borderRadius: 8,
    [theme.breakpoints.down(768)]: {
      width: 160,
      height: 48,
    }
  },
  logoutContent: {
    position: 'absolute', right: 25, top: 12, width: 100, textAlign: 'center', wordBreak: 'break-all', display: 'flex', flexDirection: 'column', cursor: 'pointer',
    [theme.breakpoints.down(768)]: {
      top: 10, right: 10
    }
  },
  logout: {
    fontSize: 22,
    [theme.breakpoints.down(768)]: {
      fontSize: 18
    }
  },
  username: {marginTop: -8},
  logoContainer: {
    height: 100,
    [theme.breakpoints.down(768)]: {height: 80}
  },
  titleContainer: {
    lineHeight: '56px', textShadow: '1px 3px 1px grey', marginBottom: 24,
    [theme.breakpoints.down(576)]: {lineHeight: '40px', marginBottom: 16}
  },
  title: {
    fontSize: 56,
    [theme.breakpoints.down(576)]: {fontSize: 40},
  },
}))

const Main = () => {
  const User = JSON.parse(localStorage.getItem('wastemgt_app_user'))
  const classes = useStyles()
  const history = useHistory()
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
  const getFormatDate = (date) => {
    let result = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ', ' + weekday[date.getDay()] + ', ' +
      date.getDate() + `${nth(date.getDate())} ` + month[date.getMonth()] + date.getFullYear();
    return result;
  }
  const [currentTime, setCurrentTime] = useState(getFormatDate(new Date()))

  useEffect(() => {
    const intervalFunc = setInterval(() => {
      setCurrentTime(getFormatDate(new Date()))
    }, 60000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  return (
    <div className={`container position-relative ${classes.container}`}>
      <div className={classes.logoutContainer}>
        <img className={classes.logout_img} src={logoutIcon} alt={'logout img'} />
        <div className={classes.logoutContent} onClick={() => {
          localStorage.removeItem('wastemgt_app_user')
          history.push('/auth/login')
        }}>
          <span className={classes.logout}>LOGOUT</span>
          <span className={classes.username}>{User.name}</span>
        </div>
      </div>
      <div className={"row"}>
        <div className={`col-12 d-flex align-items-center ${classes.logoContainer}`}>
          <img className={classes.logo_img} src={logoIcon} alt={'logo img'} />
        </div>
        <div className={`col-12 d-flex flex-column align-items-center ${classes.titleContainer}`}>
          <div className={classes.title}>BioDigester</div>
          <div className={classes.title}>Recording System</div>
        </div>
        <div className={"col-12"}>
          <Dashboard />
        </div>
        <div className={"col-12 d-none d-sm-flex align-items-end justify-content-end text-break"} style={{fontSize: 32, textShadow: '2px 3px 5px black', height: 90}}>
          {currentTime}
        </div>
      </div>
    </div>
  );
};

export default Main;
