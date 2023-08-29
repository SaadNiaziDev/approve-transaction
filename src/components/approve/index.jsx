import React, { useEffect } from "react";
import { parseEther } from "viem";
import { useContractWrite, useAccount, erc20ABI, useContractRead } from "wagmi";
import { Cri3xFarm_ABI, Cri3xToken, Cri3xFarm } from "../../constants";

const Approve = () => {
	const { address } = useAccount();
	const { write: approveWrite } = useContractWrite( {
		address: Cri3xToken,
		abi: erc20ABI,
		chain: 97,
		functionName: "approve",
		args: [ Cri3xFarm, Number( parseEther( "1" ) ) ],
		onSuccess() {
			setTimeout( () => {
				buyCri3x?.();
			}, 7000 );
		},
	} );

	const { write: buyCri3x } = useContractWrite( {
		address: Cri3xFarm,
		abi: Cri3xFarm_ABI,
		functionName: "deposit",
		account: address,
		chainId: 97,
		args: [ 0, Number( parseEther( "2" ) ), 10 ],
		onSuccess( data ) {
			console.log( data );
		},
		onError( err ) {
			console.log( err?.shortMessage );
		},
	} );

	const { data: allowance } = useContractRead( {
		address: Cri3xToken,
		abi: erc20ABI,
		functionName: "allowance",
		chainId: 97,
		args: [ address, Cri3xFarm ],
		watch: true,
	} );

	return (
		<>
			<div style={{ width: 500, gap: 3, display: "flex", justifyContent: "space-between" }}>
				<span style={{ color: "black" }}>Allowance : {Number( allowance )}</span>
				<button onClick={() => approveWrite?.()}>Approve/Transfer</button>
			</div>
		</>
	);
};

export default Approve;
