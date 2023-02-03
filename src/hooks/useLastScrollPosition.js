import { useEffect } from "react"

export const useLastScrollPosition = ({ page }) => {

	useEffect(() => {

		document.documentElement.scrollTop = localStorage.getItem(page+"scrollTop") ?? 0
		const handleScroll = () => localStorage.setItem(page+"scrollTop", document.documentElement.scrollTop)


		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}

	}, [])

	return {
		page: page+"scrollTop"
	}
}
