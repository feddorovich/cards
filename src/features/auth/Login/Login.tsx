import { useAppDispatch, useAppSelector } from "app/hooks"
import React, { FC, useEffect, MouseEvent } from "react"
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Paper, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./Login.module.css"
import { useFormik } from "formik"
import { authActions, authThunks } from "features/auth/auth.slice"
import { Link, Navigate, useNavigate } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"

export const Login: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const redirectPath = useAppSelector((state) => state.auth.redirectPath)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const isLoading = useAppSelector((state) => state.app.isLoading)

  // see password
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  //

  useEffect(() => {
    if (redirectPath) navigate(redirectPath)
  }, [navigate, redirectPath])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
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

      return errors
    },
    onSubmit: (values) => {
      dispatch(authThunks.login(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.login}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>Sign in</div>
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
                        type={showPassword ? "text" : "password"}
                        variant="standard"
                        label="Password"
                        margin="normal"
                        autoComplete="off"
                        error={!!formik.touched.password && !!formik.errors.password}
                        // helperText={formik.errors.password}
                        {...formik.getFieldProps("password")}
                      />
                      <div className={s.passwordSeeWrapper}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </div>
                      {formik.touched.password && formik.errors.password ? (
                        <div className={s.errorPassword}>{formik.errors.password}</div>
                      ) : null}
                    </div>
                    <FormControlLabel
                      label={"Remember me"}
                      control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
                    />
                    <div className={s.forgotPassword}>
                      <Link to="/password-reset">Forgot Password?</Link>
                    </div>
                    <Button
                      type={"submit"}
                      variant="contained"
                      color={"primary"}
                      sx={{ borderRadius: 6 }}
                      disabled={isLoading}
                    >
                      Sign in
                    </Button>
                    <div className={s.dha}>Don't have account?</div>
                    <div className={s.singUp}>
                      <Link to="/register">Sing Up</Link>
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
