import { useAppDispatch } from "app/hooks"
import { FC } from "react"
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./Login.module.css"
import { useFormik } from "formik"
import { authThunks } from "features/auth/auth.slice"

export const Login: FC = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.email) {
        errors.email = "Required email"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Required pass"
      } else if (values.password.length < 7) {
        errors.password = "Must be 7 characters or more"
      }

      return errors
    },
    onSubmit: (values) => {
      dispatch(authThunks.login(values))
      formik.resetForm()
    },
  })

  return (
    <div>
      <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
          <div className={s.header}>Sign in</div>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormGroup>
                <TextField
                  variant="standard"
                  label="Email"
                  margin="normal"
                  error={!!formik.touched.email && !!formik.errors.email}
                  helperText={formik.errors.email}
                  {...formik.getFieldProps("email")}
                />
                <TextField
                  type="password"
                  variant="standard"
                  label="Password"
                  margin="normal"
                  autoComplete={"on"}
                  error={!!formik.touched.password && !!formik.errors.password}
                  helperText={formik.errors.password}
                  {...formik.getFieldProps("password")}
                />
                <FormControlLabel
                  label={"Remember me"}
                  control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
                />
                <Button type={"submit"} variant={"contained"} color={"primary"}>
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}
