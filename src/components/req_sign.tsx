//import { toBuffer, ecrecover, pubToAddress, BN, rlphash, bufferToHex } from 'ethereumjs-util'

import { SignTypedDataVersion, recoverTypedSignature } from '@metamask/eth-sig-util';


const Request_Signature = (props: any) => {
    // Step 2:  Once user has authorized the use of its crypto wallet a signature can
    //          be requested

    async function sign_TypedDataV4() {
        const msgParamsOg = {
            domain: {
                // Defining the chain: 1 - Ethereum Main Net
                chainId: 1,
                // Friendly name
                name: "Initial Example Contract",
                // Additional way of verifying contract to make sure you are establishing contracts with the proper entity
                verifyingContract: "this",
                // Just let's you know the latest version. Definitely make sure the field name is correct.
                version: "1",
            },

            // Defining the message signing data content.
            message: {
                Request: "Please complete your authentication by signing this",
                username: "test_user",
            },
            // Refers to the keys of the *types* object below.
            primaryType: "LogIn",
            types: {
                EIP712Domain: [
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "version",
                        type: "string",
                    },
                    {
                        name: "chainId",
                        type: "uint256",
                    },
                    {
                        name: "verifyingContract",
                        type: "address",
                    },
                ],
                // Refer to PrimaryType
                LogIn: [
                    {
                        name: "username",
                        type: "string",
                    },
                ],
            },
        };
        let msgParams = JSON.stringify(msgParamsOg);

        let account = props.account;
        var params = [account, msgParams];
        var method = "eth_signTypedData_v4";
        console.log('User Address:' + account);

        (window as any).ethereum.sendAsync(
            {
                method,
                params,
                account,
            },
            async function (err: Error, result: any) {
                if (err) return console.dir(err);
                if (result.error) {
                    alert(result.error.message);
                    return console.error("ERROR", result);
                }
                //console.log('TYPED SIGNED:' + JSON.stringify(result.result));

                let signature = result.result;

                const restored = recoverTypedSignature({
                    data: msgParamsOg as any,
                    signature,
                    version: SignTypedDataVersion.V4,
                  });

                console.log(restored);

            }
        );
    }


    return (
        <div>
            <button
                className='btn_main'
                type="button"
                onClick={async (e) => {
                    e.preventDefault();
                    sign_TypedDataV4();
                }}
            >
                Sign Now
            </button>
        </div>
    )
};

export default Request_Signature;