import { useState } from "react"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // React recognizes onReset as an event listener instead of const reset = () ...
  const onReset = () => {
    setValue('')
  }
  
  return {
    type,
    value,
    onChange,
    onReset
  }
}