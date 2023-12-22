import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLocation, useParams } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT)

const Payment = () => {
    const{id} = useParams()
    const location = useLocation();
    const priceString = new URLSearchParams(location.search).get("price")
    const price=parseInt(priceString)
    return (
        <div  className="mt-6 p-14" >
            <h3 className="text-purple-800 text-2xl font-bold mb-4">Payment</h3>
            
           <Elements stripe={stripePromise}>
            <div>
            <CheckOutForm id={id} price={price}></CheckOutForm>
            </div>
           </Elements>
        </div>
    );

};

export default Payment;