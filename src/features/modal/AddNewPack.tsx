import React, { FC, ReactNode } from "react"
import { BasicModal } from "features/modal/BasicModal"
import s from "./AddNewPack.module.css"
import { useFormik } from "formik"
import { Checkbox, FormControlLabel, TextField } from "@mui/material"
import Button from "@mui/material/Button"

type AddNewPackPropsType = {
  children: ReactNode
}

export const AddNewPack: FC<AddNewPackPropsType> = ({ children }) => {
  const formik = useFormik({
    initialValues: {
      packName: "",
      privatPack: false,
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.packName) {
        errors.packName = "Name required"
      }

      return errors
    },
    onSubmit: (values) => {
      // dispatch(authThunks.login(values))
      formik.resetForm()
    },
  })

  return (
    <div>
      <BasicModal title={"Add new pack"} childrenOpen={<div>{children}</div>}>
        <div className={s.newPackWrapper}>
          <div className={s.packField}>
            <TextField
              variant="standard"
              label="Pack Name"
              margin="normal"
              autoComplete="off"
              error={!!formik.touched.packName && !!formik.errors.packName}
              sx={{ backgroundColor: "white", width: "100%" }}
              {...formik.getFieldProps("packName")}
            />
            {formik.touched.packName && formik.errors.packName ? (
              <div className={s.packFieldError}>{formik.errors.packName}</div>
            ) : null}
          </div>
          <div className={s.checkbox}>
            <FormControlLabel
              label={"Private pack"}
              control={<Checkbox checked={formik.values.privatPack} {...formik.getFieldProps("privatPack")} />}
            />
          </div>
          <div className={s.buttons}>
            <Button
              type={"submit"}
              variant="contained"
              color={"inherit"}
              sx={{ borderRadius: 6, backgroundColor: "white", width: 120 }}
            >
              Cancel
            </Button>
            <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6, width: 120 }}>
              Save
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
