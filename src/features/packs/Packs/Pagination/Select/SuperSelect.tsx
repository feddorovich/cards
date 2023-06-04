import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent } from "react"
import s from "./SuperSelect.module.css"

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
  isLoading: boolean
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  className,
  onChange,
  onChangeOption,
  isLoading,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map((o) => (
        <option className={s.option} key={o.id} value={o.id}>
          {o.value}
        </option>
      ))
    : [] // map options with key

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e)
    if (onChangeOption) {
      onChangeOption(+e.currentTarget.value)
    }
  }

  const finalSelectClassName = s.select + (className ? " " + className : "")

  return (
    <select className={finalSelectClassName} onChange={onChangeCallback} disabled={isLoading} {...restProps}>
      {mappedOptions}
    </select>
  )
}

export default SuperSelect
