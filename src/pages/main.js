import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import materialStyle from "../styles/material";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {setWeight} from "../api";
import {font1, font2, font3, font4, font5} from "../global";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0072bc',
    height: 'calc(100vh - 200px)',
    // padding: 8,
    textShadow: '2px 3px 5px black',
    [theme.breakpoints.down(576)]: {
      height: 'calc(100vh - 100px)',
      // overflow: 'scroll'
    }
  },
  title: {
    fontSize: 56,
    [theme.breakpoints.down(576)]: {fontSize: 40},
  },
  packsContainer: {
    width: 500,
    marginTop: 24,
    fontSize: font2,
    [theme.breakpoints.down(576)]: {width: '90%', marginTop: 0, fontSize: 28},
  },
  input: {height: 40, width: 200, boxShadow: '2px 2px 5px black', marginRight: 16, border: 0, outline: 'none', fontFamily:'sans-serif'},
  button: {fontSize: 28, background: '#083ca7', borderRadius: 12, border: '2px solid black', color: '#fff', width: 110, height: 42},
  separatorContainer: {
    width: 500,
    [theme.breakpoints.down(576)]: {width: '90%'}
  },
  total_title: {
    width: 190,
    [theme.breakpoints.down(576)]: {width: 80}
  },
  total_value: {
    width: 200, display: 'flex', justifyContent: 'flex-end', marginRight: 16,
    [theme.breakpoints.down(576)]: {width: 120}
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  // const matches = useMediaQuery('(max-width: 767.98px)');
  // const [isLoading, setIsLoading] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const [severity, setSeverity] = useState('')
  const [packs, setPacks] = useState(Array.apply(null, new Array(3)).map((x, i) => 0))

  const onChangeWeight = (val, i) => {
    if(val >= 0) {
      let temp = [...packs];
      temp[i] = val;
      setPacks(temp);
    }
  }

  const onCancel = () => {
    let temp = Array.apply(null, new Array(3)).map((x, i) => 0)
    setPacks(temp);
  }

  const onSubmit = () => {
    let weight = packs.reduce((prev, current) => prev * 1 + current * 1)
    let myDataObj = {type: 'setWeight', weight: weight, userId: JSON.parse(localStorage.getItem('wastemgt_app_user')).id}
    let formData = new FormData();

    for (let key in myDataObj) {
      formData.append(key, myDataObj[key])
    }
    setWeight(formData)
      .then(res => {
        // setIsLoading(false)
        console.log('res: ', res)
        setSeverity('success')
        setOpenMessage(true)
      }).catch(err => {
      // setIsLoading(false)
      console.log('error: ', err.response)
      setSeverity('warning')
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>BioDigester</div>
      <div className={classes.title}>Recording System</div>
      {packs.map((pack, i) => (
        <div className={`d-flex flex-column flex-sm-row align-items-start align-items-sm-center ${classes.packsContainer}`} key={i}>
          <span style={{width: 190}}>Package 0{i}:</span>
          <div className={'d-flex-1 d-flex align-items-center mr-5'}>
            <input type={'number'} value={pack} className={classes.input} min={'0'}
                   onChange={(e)=> onChangeWeight(e.target.value, i)}
            />
            <span>Kg</span>
          </div>
        </div>
      ))}
      <div className={`d-flex align-items-center mt-3 mt-sm-4 ${classes.separatorContainer}`}>
        <div className={'d-none d-sm-block'} style={{width: 190}}></div>
        <div style={{background: '#fff', height: 4, width: 200}}></div>
        <div className={'d-flex-1'}></div>
      </div>
      <div className={`d-flex align-items-center mt-2 mt-sm-3 ${classes.separatorContainer}`} style={{fontSize: font2}}>
        <div className={classes.total_title}>Total</div>
        <div className={classes.total_value}>{packs.reduce((prev, current) => prev * 1 + current * 1)}</div>
        <div className={'d-flex-1'}>Kg</div>
      </div>
      <div className={`d-flex justify-content-end ${classes.packsContainer}`} style={{marginTop: 12}}>
        <div className={'d-flex justify-content-between'} style={{width: 250}}>
          <button className={classes.button} onClick={onCancel}>Cancel</button>
          <button className={classes.button} onClick={onSubmit}>Submit</button>
        </div>
      </div>
      {/*{isLoading ? <div className={classes1.loading}>*/}
      {/*  <CircularProgress size={100} color="secondary"/>*/}
      {/*</div> : null}*/}
      <Snackbar open={openMessage} autoHideDuration={3000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                key="topcenter" onClose={() => setOpenMessage(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpenMessage(false)} severity={severity}>
          {severity === 'success'? 'You have submitted successfully.' : 'Failed'}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Dashboard;
