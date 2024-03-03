"use client";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast"
import { loadStripe } from "@stripe/stripe-js";
import { checkoutCredits } from "@/lib/actions/transaction.action";
import { Button } from "../ui/button";

const Checkout = ({
    plan,
    amount,
    credits,
    buyerId,
} : {
    plan: string,
    amount: number,
    credits: number,
    buyerId: string,
}) => {
    const {toast} = useToast();

    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if(query.get("success")) {
            toast({
                title: 'Order Placed',
                description: 'You will receive an email confirmation shortly.',
                duration: 5000,
                className: "success-toast"
            });
        }

        if(query.get("canceled")) {
            toast({
                title: 'Order Canceled!',
                description: "Continue to shop around and checkout when you're ready.",
                duration: 5000,
                className: "error-toast"
            });
        }
    }, []);

    const onCheckout = async () => {
        const transaction = {
            plan,
            amount,
            credits,
            buyerId,
        };
        await checkoutCredits(transaction);
        
    };
  return (
    <form action={onCheckout} method="POST">
        <section>
            <Button
                type="submit"
                role="link"
                className="w-full rounded-full bg-purple-gradient bg-cover"
            >
                Buy Credits
            </Button>
         </section>
    </form>
  );
};

export default Checkout;