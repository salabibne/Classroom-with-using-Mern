import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import usePrivateApi from "../../Hooks/usePrivateApi";
import { useContext } from "react";
import { classRoomcontext } from "../../Providers/AuthContext";
import Swal from "sweetalert2";
import usePublicApi from "../../Hooks/usePublicApi";
import CopyToClipboard from "react-copy-to-clipboard";


const CheckOutForm = ({ price, id }) => {
    const { user } = useContext(classRoomcontext)
    const stripe = useStripe();
    const elements = useElements()
    const privateApi = usePrivateApi()
    const publicApi = usePublicApi()

    const [clientSecret, setClientSecret] = useState("");

    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {
        privateApi.post("/create-payment-intent", { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [privateApi, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if stripe or elemnts is not founds

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        // ConFirm Card payment:

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email
                }

            }
        })

        if (confirmError) {
            -
                console.log(confirmError);
        }
        else {
            console.log("paymentIntent", paymentIntent);

            setTransactionId(paymentIntent?.id)

            if (paymentIntent?.status == "succeeded") {



                console.log("Transaction Id", transactionId);
                const enrollData = { user: user?.email, classId: id, TransactionID: paymentIntent.id }
                console.log("after payment", enrollData);
                const res = await publicApi.post("/student/enroll", enrollData)
                console.log(res);
                if (res.data?.insertedId) {
                    Swal.fire({
                        title: "Payment Done and You have successfully Enrolled the Class",
                        text: "You have to keep Transaction Id For unAvoidable circumstances  ",
                        icon: "success"
                    });
                }
            }


        }

    }

    return (

        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '20px',
                            color: '#424780',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button disabled={!stripe || !clientSecret} className="btn bg-purple-800 text-white my-6" type="submit" disabled={!stripe}>
                Pay
            </button>

            {
                transactionId && <p className="text-green-600"> <span className="text-purple-800">Transaction Id :  </span>{transactionId} <span>
                    <CopyToClipboard text={transactionId}
                        onCopy={() => this.setState({ copied: true })}>
                        <button className="btn btn-xs bg-purple-800 text-white">COPY</button>
                    </CopyToClipboard>

                </span>
                </p>
            }



        </form>

    );
};

export default CheckOutForm;