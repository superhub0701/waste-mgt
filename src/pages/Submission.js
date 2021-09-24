import React, {useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import {font1, font2} from "../global";
import {setWeight} from "../api";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 40, textAlign: 'center',
    [theme.breakpoints.down(576)]: {fontSize: 28, lineHeight: '36px', marginBottom: 8},
  },
  packsContainer: {
    width: 500,
    marginTop: 24,
    fontSize: font2,
    [theme.breakpoints.down(576)]: {width: '90%', marginTop: 0, fontSize: font1},
  },
  input: {height: 40, width: 200, boxShadow: '2px 2px 5px black', marginRight: 16, border: 0, outline: 'none', fontFamily:'sans-serif',
    [theme.breakpoints.down(576)]: {height: 30}
  },
  button: {fontSize: 20, background: '#518fe2', borderRadius: 8, border: 0, color: '#fff', width: 110, height: 42, outline: 'none', boxShadow: '1px 2px 4px black'},
  separatorContainer: {
    width: 500, fontSize: font2,
    [theme.breakpoints.down(576)]: {width: '90%', fontSize: font1}
  },
  total_title: {
    width: 190, textAlign: 'right',
    [theme.breakpoints.down(576)]: {width: 80, textAlign: 'left'}
  },
  total_value: {
    width: 200, display: 'flex', justifyContent: 'flex-end', marginRight: 16,
    [theme.breakpoints.down(576)]: {width: 120}
  }
}))

const Submission = ({onChangeType, numOfPacks, onChangeWeight}) => {
  const classes = useStyles()
  // const matches = useMediaQuery('(max-width: 767.98px)');
  // const [isLoading, setIsLoading] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const [severity, setSeverity] = useState('')
  const [packs, setPacks] = useState(Array.apply(null, new Array(3)).map((x, i) => 0))

  const onChange_Weight = (val, i) => {
    if(val >= 0) {
      let temp = [...packs];
      temp[i] = val;
      setPacks(temp);
    }
  }
  const getTotal = () => {
    let total = packs.reduce((prev, current) => prev * 1 + current * 1)
    return total.toFixed(2);
  }

  const onCancel = () => {
    let temp = Array.apply(null, new Array(3)).map((x, i) => 0)
    setPacks(temp);
  }

  const onSubmit = () => {
    let weight = getTotal() * 1;
    let myDataObj = {type: 'setWeight', weight: weight, userId: JSON.parse(localStorage.getItem('wastemgt_app_user')).id}
    let formData = new FormData();

    for (let key in myDataObj) {
      formData.append(key, myDataObj[key])
    }
    setWeight(formData)
      .then(res => {
        // setIsLoading(false)
        onChangeWeight(weight)
        let num = 0
        packs.map(pack => {
          if(pack>0) num++
        })
        numOfPacks(num)
        onChangeType('summary')

        // setSeverity('success')
        // setOpenMessage(true)
      }).catch(err => {
      // setIsLoading(false)
      console.log('error: ', err.response)
      setSeverity('warning')
      setOpenMessage(true)
    })

  }

  return (
    <>
      <div className={classes.title}>Please key in the weight of the packages below:</div>
      {packs.map((pack, i) => (
        <div className={`d-flex flex-column flex-sm-row align-items-start align-items-sm-center ${classes.packsContainer}`} key={i}>
          <span style={{width: 190}}>Package 0{i + 1}:</span>
          <div className={'d-flex-1 d-flex align-items-center mr-5'}>
            <input type={'number'} value={pack} className={classes.input} min={'0'}
                   onChange={(e)=> onChange_Weight(e.target.value, i)}
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
      <div className={`d-flex align-items-center mt-2 mt-sm-3 ${classes.separatorContainer}`}>
        <div className={classes.total_title}>TOTAL:</div>
        <div className={classes.total_value}>{getTotal()}</div>
        <div className={'d-flex-1'}>Kg</div>
      </div>
      <div className={`d-flex justify-content-end ${classes.packsContainer}`} style={{marginTop: 12}}>
        <div className={'d-flex justify-content-between'} style={{width: 250}}>
          <button className={classes.button} onClick={onCancel}>CANCEL</button>
          <button className={classes.button} onClick={onSubmit} disabled={!(getTotal() * 1)} style={{cursor: getTotal() * 1? 'pointer' : 'not-allowed'}}>SUBMIT</button>
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
    </>
  )
}

export default Submission;
