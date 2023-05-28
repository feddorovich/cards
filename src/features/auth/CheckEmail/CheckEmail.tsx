import { FC } from "react"
import { Grid, Paper } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./CheckEmail.module.css"
import { Link } from "react-router-dom"
import checkEmail from "assets/image/checkEmail.png"

export const CheckEmail: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.checkEmail}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>Check Email</div>
              <div className={s.img}>
                <img src={checkEmail} alt="email image" />
              </div>
              <div className={s.text}>We’ve sent an Email with instructions to example@mail.com</div>
              <Link to="/login">
                <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6 }}>
                  Back to login
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
