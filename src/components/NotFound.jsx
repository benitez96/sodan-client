import { Link } from "react-router-dom"
import './styles.css'


export const NotFound = () => {
	return (
		<div className="h-screen">
			<div className="bg-gray-100 grid content-center">
				<center className="mt-24 m-auto">
					<div className=" tracking-widest mt-4">
						<span className="text-gray-500 text-6xl block"><span>4  0  4</span></span>
						<span className="text-gray-500 text-xl">Lo sentimos, pero no pudimos encontrar lo que estas buscando!</span>

					</div>
				</center>
				<center className="mt-6">
					<Link to='/' className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md">Volver</Link>
				</center>
			</div>
		</div>
	)
}
