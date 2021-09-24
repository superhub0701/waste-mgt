import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    fontSize: 40, textAlign: 'center',
    [theme.breakpoints.down(576)]: {fontSize: 28, lineHeight: '36px', marginBottom: 8},
  },
}))

const SayGoodbye = () => {
  const classes = useStyles()
  const history = useHistory()
  useEffect(()=> {
    setTimeout(() => {
      localStorage.removeItem('wastemgt_app_user')
      history.push('/auth/login')
    }, 3000)
  }, [])

  return (
    <div className={classes.title}>
      <span>
        Thank you for the submission.
      </span>
      <span>
        Have a nice day...
      </span>
    </div>
  )
}

export default SayGoodbye;
