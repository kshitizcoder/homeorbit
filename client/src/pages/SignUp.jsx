import React from "react";
import BuyerSignUp from "../components/register/BuyerSignUp";
import SellerSignUp from "../components/register/SellerSignUp";

const SignUp = () => {
  return (
    <section className="md:flex md:justify-around px-5 md:px-3">
      <BuyerSignUp />
      <SellerSignUp />
    </section>
  );
};

export default SignUp;
