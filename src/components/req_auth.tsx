import React, { useState, useEffect } from 'react';
import RequestSignature from './req_sign';

const RequestLogIn = () => {

    const [userWalletAddress, setuserWalletAddress] = useState([]);

    // Check for changes in the stored user wallet address (state)
    useEffect(() => {
        if (userWalletAddress.length !== 0) {
            console.log('User logged in');
            //console.log(userWalletAddress);
        }
    }, [userWalletAddress]);

    // If wallet address has not been stored
    // Request user to log in
    if (userWalletAddress.length === 0) {
        return (
            <div>
                <img src="images/logo.png" alt="SignUtopia Logo" />
                <p>
                    Step 1: Let's sign with your MetaMask Wallet
                </p>
                <p>
                    It seems like you have not logged in yet, please click below to complete authorization process
                </p>
                <button
                    className='button-52'
                    type="button"
                    onClick={async (e) => {
                        e.preventDefault();
                        const accounts = await (window as any).ethereum.request({
                            method: "eth_requestAccounts",
                        });
                        setuserWalletAddress(accounts[0]);
                        //console.log(userWalletAddress);
                    }}
                >
                    Sign In with MetaMask
                </button>
            </div>
        );
    } else {
        // If wallet address is store, then allow user to request signature
        return (
            <div>
                <p>
                    User wallet address: {userWalletAddress}
                </p>
                <RequestSignature account={userWalletAddress} />
            </div>
        );
    }
};

export default RequestLogIn;