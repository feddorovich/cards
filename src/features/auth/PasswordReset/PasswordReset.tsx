import React, { FC, useEffect } from "react"
import { FormControl, FormGroup, Grid, Paper, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./PasswordReset.module.css"
import { useFormik } from "formik"
import { authThunks } from "features/auth/auth.slice"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectIsLoggedIn, selectRedirectPath } from "features/auth/auth.selector"
import { selectIsLoading } from "app/app.selector"

export const PasswordReset: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const redirectPath = useAppSelector(selectRedirectPath)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    if (redirectPath) navigate(redirectPath)
  }, [redirectPath])

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

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.passwordReset}>
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
                      <div className={s.text}>
                        <p>Enter your email address and we will send you</p>
                        <p>further instructions </p>
                      </div>
                    </div>
                    <Button
                      type={"submit"}
                      variant="contained"
                      color={"primary"}
                      sx={{ borderRadius: 6 }}
                      disabled={isLoading}
                    >
                      Send Instructions
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
