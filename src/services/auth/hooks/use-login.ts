import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router"
import { useLoginMutation } from "../api/hooks/"
import { useAppDispatch } from "@/shared/hooks/redux"
import { setToken } from "@/store/slices/auth-slice"
import { routes } from "@/shared/routes"
import type { LoginBody } from "../api/contracts/login"

export const useLogin = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname
	const navigateTo = from && from !== '/' ? from : routes.home()
	const [login, { isLoading, isError }] = useLoginMutation()

	const handleLogin = async (formData: LoginBody) => {
		try {
			const res = await login({ body: formData }).unwrap()
			dispatch(setToken(res.accessToken))
			navigate(navigateTo, { replace: true })
			toast.success(t("auth.loginSuccess"))
		} catch {
			toast.error(t("auth.loginError"))
		}
	}

	return { handleLogin, isLoading, isError }
}
