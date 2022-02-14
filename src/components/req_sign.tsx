import { SignTypedDataVersion, recoverTypedSignature } from '@metamask/eth-sig-util';

const RequestSignature = (props: any) => {
  // Step 2:  Once user has authorized the use of its crypto wallet a signature can
  //          be requested

  async function sign_TypedDataV4() {
    // Set up message parameters
    const msgParamsOg = {
      domain: {
        chainId: 1,
        name: "Crypto World Test",
      },
      message: {
        name: "Translation",
        start: {
          x: 200,
          y: 600,
        },
        end: {
          x: 300,
          y: 350,
        },
        cost: 50,
      },
      primaryType: "WeightedVector",
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "chainId", type: "uint256" },
        ],
        WeightedVector: [
          { name: "name", type: "string" },
          { name: "start", type: "Point" },
          { name: "end", type: "Point" },
          { name: "cost", type: "uint256" },
        ],
        Point: [
          { name: "x", type: "uint256" },
          { name: "y", type: "uint256" },
        ],
      },
    };

    // Set up variables for message signing
    let msgParams = JSON.stringify(msgParamsOg);
    let account = props.account;
    var params = [account, msgParams];
    var method = "eth_signTypedData_v4";
    // Debug
    //console.log('User Address:' + account);

    // Send signature request
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
        // Debug
        //console.log('TYPED SIGNED:' + JSON.stringify(result.result));

        // Store retrieved signature result
        const signature: string = result.result;

        // Verify signature with recoverTypedSignature()
        let restored = recoverTypedSignature({
          signature,
          version: SignTypedDataVersion.V4,
          data: msgParamsOg as any
        });

        // Debug
        //console.log(restored);

        // Check to confirm that the signature address is the same as the original user wallet address
        if ( restored === account ) {
          alert('Successfully recovered signer as ' + restored);
        } else {
          alert(
            'Failed to verify signer when comparing ' + account + ' to ' + restored
          );
        }

      }
    );
  }


  return (
    <div className='container'>
      <p>Step 2: Sign a message or other data via the eth_signTypedData_v4 method.</p>
      <p>Once the message is signed, the application will verify the signature to confirm that it was originated by the user wallet.</p>
      <button
        className='button-52'
        type="button"
        onClick={async (e) => {
          e.preventDefault();
          sign_TypedDataV4();
        }}
      >
        Sign A Test (v4) Message Now
      </button>
    </div>
  )
};

export default RequestSignature;