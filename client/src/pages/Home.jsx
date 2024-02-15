import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import LlistingItemCard from "../components/LlistingItemCard";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { fetchGoogleAuthUser } from "../apiCalls/user";

function Home() {
  const { loginMethod } = useSelector((state) => state.user);
  const [offerList, setofferList] = useState([]);
  const [rentList, setRentList] = useState([]);
  const [sellList, setSellList] = useState([]);

  const dispatch = useDispatch();
  SwiperCore.use(Navigation);

  const getAuthenticate = useCallback(async () => {
    try {
      dispatch(signInStart());
      const res = await fetchGoogleAuthUser();
      console.log(res);
      if (res.success === false) {
        dispatch(signInFailure(res.message));
        return;
      }
      console.log(res.userinfo);
      dispatch(
        signInSuccess({ userinfo: res.userinfo, loginMethod: "google" })
      );
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }, []);

  useEffect(() => {
    const fetchOfferList = async () => {
      const response = await axios.get(
        "/api/lists/get-listings?offer=true&limit=4"
      );
      console.log(response);
      setofferList(response.data);
    };
    fetchOfferList();

    const fetchRentList = async () => {
      const response = await axios.get(
        "/api/lists/get-listings?rent=true&limit=4"
      );
      console.log(response);
      setRentList(response.data);
    };
    fetchRentList();
    const fetchSellList = async () => {
      const response = await axios.get(
        "/api/lists/get-listings?sale=true&limit=4"
      );
      console.log(response);
      setSellList(response.data);
    };
    fetchSellList();
    console.log(loginMethod);
    if (loginMethod === "google") {
      getAuthenticate();
    }
  }, [getAuthenticate]);
  return (
    <div>
      <div className="flex flex-col gap-4 py-28 px-10">
        <h1 className="text-slate-800 text-3xl lg:text-6xl">
          Find Your <span className="text-slate-400">dream</span> place to Live
        </h1>
        <div className="text-gray-500 text-sm sm:text-base">
          Yero Real state is a prefect solution that allows you to find your
          dream place to live.
          <br />
          We come up with a wide range of dwelling properties.
        </div>
        <Link
          to={"/search"}
          className="text-xl md:text-2xl text-slate-700 font-semibold hover:underline"
        >
          Getting Start
        </Link>
      </div>
      <Swiper navigation>
        {offerList &&
          offerList.length > 0 &&
          offerList.map((offer) => (
            <SwiperSlide key={offer._id}>
              <div
                style={{
                  background: `url(${offer.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerList && offerList.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerList.map((listing) => (
                <LlistingItemCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {sellList && sellList.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent house for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {sellList.map((listing) => (
                <LlistingItemCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentList && rentList.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent House for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentList.map((listing) => (
                <LlistingItemCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
