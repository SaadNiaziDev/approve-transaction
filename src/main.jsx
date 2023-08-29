import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WagmiConfig } from 'wagmi'
import { config } from './wagmi'

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
	<React.StrictMode>
		<WagmiConfig config={config}>
			<App />
		</WagmiConfig>
	</React.StrictMode>,
)