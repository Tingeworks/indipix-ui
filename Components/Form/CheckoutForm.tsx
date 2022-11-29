import { PaymentElement } from "@stripe/react-stripe-js";
import CONFIG from "../../CONFIG";

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;
