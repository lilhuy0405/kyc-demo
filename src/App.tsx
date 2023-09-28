import {useEffect} from "react";

function App() {
  useEffect(() => {
    //insert script tag
    const script = document.createElement('script');
    script.src = "https://sandbox.kyc-pass.com/kyc.js";
  }, []);
  return (
    <>
      <h1>KYC Demo for Babbu</h1>
    </>
  )
}

export default App
