import "./App.css";
import { Wagmi } from "./components/wagmi";

function App() {
	return (
		<div className='container'>
			<div className='d-flex justify-content-between align-items-center gap-3'>
				<Wagmi />
			</div>
		</div>
	);
}

export default App;
