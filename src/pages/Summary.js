import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {font1, font2} from "../global";

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
  button: {
    display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center', lineHeight: '24px',
    fontSize: 20, background: '#518fe2', borderRadius: 8, border: 0, color: '#fff', width: 140, height: 60, outline: 'none', boxShadow: '1px 2px 4px black'
  },
}))

const Summary = ({onChangeType, numOfPacks, weight}) => {
  const classes = useStyles()

  const onStart = () => onChangeType('input')
  const onEnd = () => onChangeType('end')
  const getNum = (val) => {
    if(val<10) return '0' + val;
    return val;
  }

  return (
    <div className={'d-flex flex-column justify-content-between h-75'}>
      <div className={classes.title}>Summary of packages weighed:</div>
      <div>
        <div className={classes.title}>Total of <span className={'ml-3 mr-2'}>
          {getNum(numOfPacks)}</span>package(s) were submitted</div>
        <div className={classes.title}>weighing <span className={'ml-3 mr-2'}>
          {weight.toFixed(2)}</span>KG</div>
      </div>
      <div className={`d-flex justify-content-end ${classes.packsContainer}`} style={{marginTop: 12}}>
        <div className={'d-flex justify-content-between'} style={{width: 300}}>
          <button className={classes.button} onClick={onStart}>
            <span>ANOTHER</span>
            <span>SUBMISSION</span>
          </button>
          <button className={classes.button} onClick={onEnd}>
            <span>END</span>
            <span>SESSION</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Summary;
