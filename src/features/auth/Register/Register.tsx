import { useAppDispatch } from "app/hooks"
import { FC } from "react"
import { FormControl, FormGroup, Grid, Paper, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./Register.module.css"
import { useFormik } from "formik"
import { authThunks } from "features/auth/auth.slice"
import { Link } from "react-router-dom"

export const Register: FC = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: any = {}
      // TODO
      if (!values.email) {
        errors.email = "Email required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Password required"
      } else if (values.password.length < 8) {
        errors.password = "Must be more than 7 characters"
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Password required"
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords must be the same"
      }

      return errors
    },
    onSubmit: (values) => {
      dispatch(authThunks.register(values))
      formik.resetForm()
    },
  })

  return (
    <div className={s.wrapper}>
      <div className={s.login}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>Sign up</div>
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
                    </div>
                    <div className={s.password}>
                      <TextField
                        type="password"
                        variant="standard"
                        label="Password"
                        margin="normal"
                        error={!!formik.touched.password && !!formik.errors.password}
                        // helperText={formik.errors.password}
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className={s.errorPassword}>{formik.errors.password}</div>
                      ) : null}
                    </div>
                    <div className={s.confirmPassword}>
                      <TextField
                        type="password"
                        variant="standard"
                        label="Password"
                        margin="normal"
                        error={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        // helperText={formik.errors.password}
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className={s.confirmPasswordError}>{formik.errors.confirmPassword}</div>
                      ) : null}
                    </div>
                    <div className={s.forgotPassword}>Forgot Password?</div>
                    <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6 }}>
                      Sign up
                    </Button>
                    <div className={s.dha}>Don't have account?</div>
                    <div className={s.singIn}>
                      <Link to="/login">Sing In</Link>
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
