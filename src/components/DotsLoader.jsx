import './styles.css'

const DotsLoader = () => {
	return (
		<div class="flex justify-center items-center">

			<div class="loader p-1.5 rounded-full flex space-x-3">
				<div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
				<div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
				<div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
			</div>

		</div>
	)
}

export default DotsLoader
