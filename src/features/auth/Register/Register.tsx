import { useAppDispatch, useAppSelector } from "app/hooks"
import React, { FC, useEffect } from "react"
import { FormControl, FormGroup, Grid, Paper, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./Register.module.css"
import { useFormik } from "formik"
import { authThunks } from "features/auth/auth.slice"
import { Link, Navigate, useNavigate } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"

export const Register: FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const navigate = useNavigate()
  const redirectPath = useAppSelector((state) => state.auth.redirectPath)

  // see password
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickConfirmShowPassword = () => setShowConfirmPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  //

  useEffect(() => {
    if (redirectPath) navigate(redirectPath)
  }, [redirectPath])

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

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.login}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>Sign Up</div>
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
                    <div className={s.confirmPassword}>
                      <TextField
                        type={showConfirmPassword ? "text" : "password"}
                        variant="standard"
                        label="Сonfirm password"
                        margin="normal"
                        error={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        // helperText={formik.errors.password}
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      <div className={s.passwordSeeWrapper}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickConfirmShowPassword}
                          onMouseDown={handleClickConfirmShowPassword}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </div>
                      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className={s.confirmPasswordError}>{formik.errors.confirmPassword}</div>
                      ) : null}
                    </div>
                    <Button
                      type={"submit"}
                      variant="contained"
                      color={"primary"}
                      sx={{ borderRadius: 6 }}
                      disabled={isLoading}
                    >
                      Sign up
                    </Button>
                    <div className={s.dha}>Already have an account?</div>
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
