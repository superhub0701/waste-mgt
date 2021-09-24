import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Submission from "./Submission";
import Summary from "./Summary";
import SayGoodbye from "./SayGoodbye";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0072bc',
    height: 'calc(100vh - 336px)',
    // padding: 8,
    textShadow: '2px 3px 5px black',
    [theme.breakpoints.down(576)]: {
      height: 'calc(100vh - 200px)',
      // overflow: 'scroll'
    }
  },
}))

const Dashboard = () => {
  const classes = useStyles()
  const [type, setType] = useState('input')
  const [weight, setWeight] = useState(0)
  const [packs, setPacks] = useState(0)
  const onChangeType = (type) => setType(type)
  const onChangeWeight = (val) => setWeight(val * 1 + weight)
  const onChangeNumOfPacks = (val) => setPacks(val * 1 + packs)

  return (
    <div className={classes.container}>
      {type === 'input' ?
        <Submission onChangeType={onChangeType} onChangeWeight={onChangeWeight}
                    numOfPacks={onChangeNumOfPacks}/> : null}
      {type === 'summary' ?
        <Summary onChangeType={onChangeType}
                 weight={weight} numOfPacks={packs}/> : null}
      {type === 'end' ? <SayGoodbye/> : null}
    </div>
  )
}

export default Dashboard;
