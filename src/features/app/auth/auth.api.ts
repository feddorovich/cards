import { AuthInstance } from "features/app/auth/auth.instance"

export const AuthApi = () => ({
  register: (params: { email: string; password: string }) => {
    return AuthInstance.post("register", params)
  },
})
