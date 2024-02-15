import React, { useEffect, useState } from "react";
import { fetchlist } from "../apiCalls/user";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { MdOutlineChair } from "react-icons/md";
import { useSelector, useStore } from "react-redux";
import Contact from "../components/Contact";
function Listing() {
  const { user } = useSelector((state) => state.user);
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const response = await fetchlist(params.listingId);
        console.log(response);
        if (response.success === false) {
          console.log(response.message);
          setLoading(false);
          setError(response.message);
          return;
        }

        setList(response.list);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    getList();
  }, []);
  return (
    <main>
      {loading && <p className="text-center text-6xl mt-7">Loading...</p>}
      {console.log(list)}
      {error && <p className="text-center text-6xl mt-7">{error}</p>}
      {list && !error && !loading && (
        <div>
          <Swiper navigation>
            {list.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[450px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[14%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <MdOutlineContentCopy
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <div className="flex gap-4">
              <p className="bg-red-600 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {list.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {list.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md ">
                  ${list.discountPrice} OFF
                </p>
              )}
            </div>

            <p className="flex items-center mt-6 gap-2 text-slate-900  text-base">
              <FaLocationDot className="text-green-700" />
              {list.address}
            </p>
            <p className="flex text-2xl font-semibold">
              {list.name} - ${" "}
              {list.offer ? (
                <div className="flex  gap-2">
                  <span className="line-through text-red-600">
                    {list.regularPrice.toLocaleString("en-US")}
                  </span>
                  ${""}
                  <span>
                    {(+list.regularPrice - +list.discountPrice).toLocaleString(
                      "en-US"
                    )}
                  </span>
                </div>
              ) : (
                <span>{list.regularPrice.toLocaleString("en-US")}</span>
              )}
              {list.type === "rent" && " / month"}
            </p>

            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {list.description}
            </p>
            <ul className=" font-semibold text-base flex items-center gap-6 sm:gap-8 flex-wrap">
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <IoBedOutline className="text-2xl text-green-900" />
                <p className="text-black">
                  {list.bedrooms > 1
                    ? `${list.bedrooms} beds`
                    : `${list.bedrooms} bed`}
                </p>
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <FaBath className="text-xl text-green-900" />
                <p className="text-black">
                  {list.bathrooms > 1
                    ? `${list.bathrooms} bathrooms`
                    : `${list.bathrooms} bathroom`}
                </p>
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <LuParkingCircle className="text-xl text-green-900" />
                <p className="text-black">
                  {list.parking ? "Parking" : "No Parking"}
                </p>
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <MdOutlineChair className="text-xl text-green-900" />
                <p className="text-black">
                  {list.furnished ? "Furnished" : "Unfurnished"}
                </p>
              </li>
            </ul>
            {user && user._id !== list.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-black text-white rounded-lg uppercase hover:opacity-85 p-3"
              >
                Contact Landloard
              </button>
            )}
            {contact && <Contact list={list} />}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
