// // src/components/PhoneSignIn.js
// import React, { useRef, useState } from "react";
// import usePhoneAuth from "../hooks/usePhoneAuth";

// const PhoneSignIn = () => {
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [code, setCode] = useState("");
//     const recaptchaRef = useRef(null);
//     const { requestOTP, confirmOTP } = usePhoneAuth();

//     const handleRequestOTP = async (e) => {
//         e.preventDefault();
//         await requestOTP(phoneNumber, recaptchaRef.current);
//     };

//     const handleConfirmOTP = async (e) => {
//         e.preventDefault();
//         await confirmOTP(code);
//     };

//     return (
//         <div>
//             <form onSubmit={handleRequestOTP}>
//                 <input
//                     type="text"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     placeholder="Enter phone number"
//                 />
//                 <button type="submit">Send OTP</button>
//             </form>

//             <form onSubmit={handleConfirmOTP}>
//                 <input
//                     type="text"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     placeholder="Enter OTP"
//                 />
//                 <button type="submit">Verify OTP</button>
//             </form>

//             <div ref={recaptchaRef}></div>
//         </div>
//     );
// };

// export default PhoneSignIn;
