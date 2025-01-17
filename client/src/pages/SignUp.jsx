import React from "react";
import BuyerSignUp from "../components/register/BuyerSignUp";
import SellerSignUp from "../components/register/SellerSignUp";

const SignUp = () => {
  return (
    <section className="flex justify-around">
      <BuyerSignUp />
      <SellerSignUp />
    </section>
  );
};

export default SignUp;
