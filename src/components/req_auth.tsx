import React, { useState, useEffect } from 'react';
import Request_Signature from './req_sign';

const Request_LogIn = () => {

    const [userWalletAddress, setuserWalletAddress] = useState([]);

    useEffect(() => {
        if (userWalletAddress.length != 0) {
            console.log('User logged in');
            //console.log(userWalletAddress);
        }
    }, [userWalletAddress]);

    if (userWalletAddress.length == 0) {
        return (
            <div>
                <p>
                    Let's sign with Web3
                </p>
                <p>
                    Houston we have a problem...
                </p>
                <p>
                    It seems like you have not logged in yet!
                </p>
                <button
                    className='btn_main'
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
        return (
            <div>
                <p>
                    Logged in with {userWalletAddress}
                </p>
                <Request_Signature account={userWalletAddress} />
            </div>
        );
    }
};

export default Request_LogIn;