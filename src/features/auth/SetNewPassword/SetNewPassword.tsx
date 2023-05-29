import { useAppDispatch, useAppSelector } from "app/hooks"
import React, { FC, useEffect } from "react"
import { FormControl, FormGroup, Grid, Paper, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./SetNewPassword.module.css"
import { useFormik } from "formik"
import { authThunks } from "features/auth/auth.slice"
import { useNavigate, useParams } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"

export const SetNewPassword: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const redirectPath = useAppSelector((state) => state.auth.redirectPath)
  const isLoading = useAppSelector((state) => state.app.isLoading)

  // see password
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  //

  useEffect(() => {
    if (redirectPath) navigate(redirectPath)
  }, [redirectPath])

  const { token } = useParams()

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: (values) => {
      const errors: any = {}
      // TODO
      if (!values.password) {
        errors.password = "Password required"
      } else if (values.password.length < 8) {
        errors.password = "Must be more than 7 characters"
      }

      return errors
    },
    onSubmit: (values) => {
      if (token) {
        dispatch(authThunks.setNewPassword({ password: values.password, resetPasswordToken: token }))
      }
      formik.resetForm()
    },
  })

  return (
    <div className={s.wrapper}>
      <div className={s.passwordReset}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>Create new password</div>
              <form onSubmit={formik.handleSubmit} className={s.form}>
                <FormControl>
                  <FormGroup>
                    <div className={s.email}>
                      <TextField
                        type={showPassword ? "text" : "password"}
                        variant="standard"
                        label="Password"
                        margin="normal"
                        autoComplete="off"
                        error={!!formik.touched.password && !!formik.errors.password}
                        // helperText={formik.errors.email}
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
                        <div className={s.errorEmail}>{formik.errors.password}</div>
                      ) : null}
                      <div className={s.text}>
                        <p>Create new password and we will send you further instructions to email</p>
                      </div>
                    </div>
                    <Button
                      type={"submit"}
                      variant="contained"
                      color={"primary"}
                      sx={{ borderRadius: 6 }}
                      disabled={isLoading}
                    >
                      Create new password
                    </Button>
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
