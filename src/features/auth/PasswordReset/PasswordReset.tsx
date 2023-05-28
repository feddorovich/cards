import { useAppDispatch } from "app/hooks"
import { FC } from "react"
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Paper, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./PasswordReset.module.css"
import { useFormik } from "formik"
import { authThunks } from "features/auth/auth.slice"
import { Link } from "react-router-dom"

export const PasswordReset: FC = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: any = {}
      // TODO
      if (!values.email) {
        errors.email = "Email required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      return errors
    },
    onSubmit: (values) => {
      dispatch(authThunks.reset(values.email))
      formik.resetForm()
    },
  })

  return (
    <div className={s.wrapper}>
      <div className={s.login}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>Forgot your password?</div>
              <form onSubmit={formik.handleSubmit} className={s.form}>
                <FormControl>
                  <FormGroup>
                    <div className={s.email}>
                      <TextField
                        variant="standard"
                        label="Email"
                        margin="normal"
                        autoComplete="off"
                        error={!!formik.touched.email && !!formik.errors.email}
                        // helperText={formik.errors.email}
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className={s.errorEmail}>{formik.errors.email}</div>
                      ) : null}
                      <p>Enter your email address and we will send you</p>
                      <p>further instructions </p>
                    </div>
                    <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6 }}>
                      Sign in
                    </Button>
                    <div className={s.dha}>Did you remember your password?</div>
                    <div className={s.loginLink}>
                      <Link to="/login">Try logging in</Link>
                    </div>
                  </FormGroup>
                </FormControl>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
