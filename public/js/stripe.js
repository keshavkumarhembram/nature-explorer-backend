const stripe = Stripe('lsjfaoerew');

export const bookTour = async tourId => {
    try {

        // 1) Get checkout session from API
            const session = await axios(`http://127.0.0.1:3000/api/v1/booking/checkout-session/${tourId}`);
            console.log(session);
            
            // 2) Create checkout form = charge credit card
            await stripe.redirectCheckout({
                sesionId: session.data.session.id
            })
        } catch(err) {
            console.log(err);
            showAlert('error', err);
        }
}