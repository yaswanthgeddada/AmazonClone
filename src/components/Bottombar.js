import React from "react";
import { FcGlobe } from "react-icons/fc";

const Bottombar = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="w-sreen bg-gray-700 py-3 text-center text-white text-sm">
          Back to top
        </div>
        <div className="w-sreen bg-gray-800 py-20">
          <div className="flex justify-around items-top px-20 py-14">
            <div className="text-white ">
              <div className="font-bold text-lg ">Get to Know Us</div>
              <p>About Us</p>
              <p>Careers</p>
              <p>Press Releases</p>
              <p>Amazon Cares</p>
              <p>Gift a Smile</p>
            </div>

            <div className="text-white">
              <div className="font-bold text-lg ">Connect with Us</div>
              <p>Facebook</p>
              <p>Twitter</p>
              <p>Instagram</p>
            </div>

            <div className="text-white">
              <div className="font-bold text-lg ">Make Money with Us</div>
              <p>Sell on Amazon</p>
              <p>Sell under Amazon Accelerator</p>
              <p>Amazon Global Selling</p>
              <p>Become an Affiliate</p>
              <p>Fulfilment by Amazon</p>
              <p>Advertise Your Products</p>
              <p>Amazon Pay on Merchants</p>
            </div>

            <div className="text-white">
              <div className="font-bold text-lg ">Let Us Help You</div>
              <p>COVID-19 and Amazon</p>
              <p>Your Account</p>
              <p>Returns Centre</p>
              <p>100% Purchase Protection</p>
              <p>Help</p>
            </div>
          </div>

          <hr />

          <div className="flex justify-center items-center mt-10">
            <img src="/assets/logo.png" className="h-16" alt="" />
            <div className="flex items-center text-white border border-white p-2 mx-4 ">
              <div className="mx-2">
                <FcGlobe />
              </div>
              Only English
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-10 text-gray-300 text-sm">
          AbeBooks Books, art & collectibles Amazon Web Services Scalable Cloud
          Computing Services Audible Download Audio Books DPReview Digital
          Photography IMDb Movies, TV & Celebrities Shopbop Designer Fashion
          Brands Amazon Business Everything For Your Business Prime Now 2-Hour
          Delivery on Everyday Items Amazon Prime Music 70 million songs,
          ad-free Over 9 million podcast episodes
          <br />
        </div>
        <div className="bg-gray-900 p-10 text-gray-300 text-sm text-center font-semibold">
          Conditions of Use & SalePrivacy NoticeInterest-Based Ads© 1996-2021,
          Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
