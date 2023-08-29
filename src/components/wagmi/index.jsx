import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { bscTestnet } from "viem/chains";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import Approve from "../approve";

export const Wagmi = () => {
	const [ modal, setModal ] = useState( false );
	const { connect, connectors, isError, isLoading, pendingConnector } = useConnect();
	const { address } = useAccount();
	const { disconnect } = useDisconnect();

	const handleDropDown = () => setModal( true );
	const handleClose = () => setModal( false );

	if ( isLoading ) return "Loading...";
	if ( isError ) return "Something went wrong!";
	if ( address )
		return (
			<>
				<button className='address-btn' onClick={handleDropDown}>
					{address}
				</button>
				{<Approve />}
				<Modal show={modal} centered size='sm' onHide={handleClose}>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body>
						<div className='d-flex flex-column justify-content-center align-items-center'>
							<img width={50} height={50} src='/vite.svg' alt='' />
							<div className='modal-address'>{address.slice( 0, 5 ) + "....." + address.slice( -5 )}</div>
							<div className='modal-balance'>{2.33}</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className='d-flex justify-content-between align-items-center gap-2 w-100'>
							<button className='modal-button' onClick={handleClose}>
								COPY
							</button>
							<button
								className='modal-button'
								onClick={() => {
									disconnect();
									handleClose();
								}}>
								DISCONNECT
							</button>
						</div>
					</Modal.Footer>
				</Modal>
			</>
		);

	return (
		<>
			<button
				className='btn btn-primary'
				onClick={() =>
					connect( {
						chainId: 97,
						connector: new MetaMaskConnector( {
							chains: [ bscTestnet ],
							options: {
								shimDisconnect: true,
								UNSTABLE_shimOnConnectSelectAccount: true,
							},
						} ),
					} )
				}>
				Connect using wagmi
			</button>
		</>
	);
};
