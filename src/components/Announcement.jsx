import { BiMailSend } from 'react-icons/bi'

export const Announcement = ({ className = "" }) => {


	return (
		<div className={`bg-pink-400 py-1 text-white sticky top-0 z-10`}>
			<p className="flex justify-center items-center gap-1 text-sm font-medium">
				<BiMailSend />  Envios gratis en compras superiores a {import.meta.env.VITE_SHIPPING_OFFER}
			</p>
		</div>
	)
}
