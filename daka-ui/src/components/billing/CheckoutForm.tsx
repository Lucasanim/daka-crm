import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Form, message, Select } from "antd";
import { createSubscription } from "../../service/BillingService";
import { BillingPlan } from "../../model/billing/BillingPlan";
import { useDispatch } from "react-redux";
import { logout } from "../../infrastructure/state/reducers/AuthReducer";

const { Option } = Select;

enum PlanMessage {
  MONTHLY = "Monthly $12.99",
  YEARLY = "Yearly $9.99 / month",
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [selectedPlan, setSelectedPlan] = useState<BillingPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscriptionCreate = async (paymentMethodId: string) => {
    try {
      await createSubscription(paymentMethodId, selectedPlan!);
      message.success("You have successfully subscribed to Daka!");
    } catch (e) {
      console.log(e);
      message.error("Something went wrong!");
    }
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      setErrorMessage(error.message || "An error occurred");
      setLoading(false);
      return;
    }

    await handleSubscriptionCreate(paymentMethod.id);

    setTimeout(() => {}, 1000);
  };

  const handleLogout = async () => {
    // @ts-expect-error false positive
    await dispatch(logout());
  };

  return (
    <Form layout="vertical">
      <Form.Item name="plan" label="Plan">
        <Select onSelect={(opt) => setSelectedPlan(opt)}>
          {Object.values(BillingPlan).map((plan) => (
            <Option key={plan} value={plan}>
              {PlanMessage[plan]}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Credit or debit card">
        <CardElement id="card-element" options={{ hidePostalCode: true }} />
      </Form.Item>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <Button onClick={handleLogout} disabled={loading}>
        Log out
      </Button>

      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={!stripe || !selectedPlan}
      >
        Subscribe
      </Button>
    </Form>
  );
};

export default CheckoutForm;
