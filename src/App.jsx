import { Layout } from './components/Layout'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Outlet } from 'react-router-dom'


function App() {


	return (
		<Provider store={store}>
			<Layout>
				<Outlet />
			</Layout>
		</Provider>
	)
}


export default App
