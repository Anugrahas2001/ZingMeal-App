// import axios from "axios";
// import React, { useEffect } from "react";

// const Paymentpage = (props) => {
//   const { config, option, payableAmount } = props;
//   console.log(config, option, payableAmount, "propss");

//   const cartId = useSelector((store) => store.cart.id);
//   const userId = useSelector((store) => store.user.id);
//   const [btnState, setBtnState] = useState("Place Order");
//   const [btn, setBtn] = useState(false);

//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload(() => {
//         resolve(true);
//       });
//       script.onerror(() => {
//         resolve(false);
//       });

//       document.body.appendChild(script);
//     });
//   };

//   const createRazorpayOrder = async (amount) => {
//     let data = JSON.stringify({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: "recpt_id",
//     });

//     await axios
//       .post("/user/createOrder", { amount, currency, receipt }, config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         handleRazorpayscreen(response.data.amount);
//       });
//   };

//   const handleRazorpayscreen = async (amount) => {
//     const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js");

//     if (!res) {
//       alert("some error occurs at razorpay screen loading");
//       return;
//     }

//     const options = {
//       key: "rzp_test_dcM4CwYb7Oe9M2",
//       amount: amount,
//       currency: currency,
//       name: "Anugraha S",
//       description: "payment to order food",
//       image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAvnhINvIEC-10o0V7Wfn9dYxRJ98PS4WXgg&s",
//       order_id: orderId,
//       handler: function (response) {
//         alert(
//           `Payment successful! Razorpay Payment ID: ${response.razorpay_payment_id}`
//         );
//       },
//       prefill: {
//         name: "Anugraha S",
//         email: "anugrahas2001@gmail.com",
//         contact: "7306634251",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();

//     useEffect(() => {
//       axios
//         .get(`/user/paymentSuccess/${userId}/${cartId}`)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }, []);

//     return (
//       <div>
//         <div className="flex flex-col">
//           <div className="flex justify-center items-center">
//             <button
//               onClick={() => createRazorpayOrder(payableAmount)}
//               className="h-10 ml-4 mt-3 bg-blue-600 w-72 text-white text-lg font-semibold rounded-sm"
//             >
//               {btnState}
//             </button>

//             {option === "Cash On Delivery" && btn && (
//               <Confetti
//                 width={dimension.width}
//                 height={dimension.height}
//                 numberOfPieces={1000}
//                 recycle={false}
//                 gravity={0.1}
//               />
//             )}

//             {option === "Online Payment"}
//           </div>
//           <div className="text-lg flex justify-between items-center">
//             <p className="text-sm text-green-800 font-bold mt-1 ml-9">
//               You will save ₹{totalDiscountPrice} on this order
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   };
// };

// export default Paymentpage;
