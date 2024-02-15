import React, { useState } from "react";
import { createListing } from "../apiCalls/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    imageUrls: [
      "https://www.cio.com/wp-content/uploads/2023/07/shutterstock_676661263.jpg?resize=1024%2C683&quality=50&strip=all",
      "https://assets-global.website-files.com/620ec747459e13c7cf12a39e/625b10a58137b364b18df2ea_iStock-94179607.jpg",
    ],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    userRef: user._id,
  });
  console.log("50", formData.regularPrice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log("formdata", formData);
  const onChangeHandler = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFromData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFromData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFromData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (formData.regularPrice < formData.discountPrice)
        return setError("discountPrice must be greater than regularPrice");
      setLoading(true);

      console.log(formData);
      const response = await createListing(formData);
      console.log("response", response);
      setLoading(false);
      if (response.success === false) {
        setError(response.message);
        setLoading(false);
        return;
      }
      navigate(`/listings/${response.List._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="my-7 text-3xl font-semibold text-center uppercase">
        Create Listing
      </h1>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg id "
            id="name"
            maxLength="60"
            minLength="5"
            onChange={onChangeHandler}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg id "
            id="description"
            onChange={onChangeHandler}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg id "
            id="address"
            onChange={onChangeHandler}
            value={formData.address}
          />
          <div className="flex  gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-6"
                onChange={onChangeHandler}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-6"
                onChange={onChangeHandler}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-6"
                onChange={onChangeHandler}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-6"
                onChange={onChangeHandler}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-6"
                onChange={onChangeHandler}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                className="p-3 border border-gray-300 rounded-lg w-16"
                onChange={onChangeHandler}
                value={formData.bedrooms}
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                className="p-3 border border-gray-400 rounded-lg w-16"
                onChange={onChangeHandler}
                value={formData.bathrooms}
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={50}
                max={10000000000000}
                className="p-3 border border-gray-400 rounded-lg "
                onChange={onChangeHandler}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">$/month</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={0}
                  className="p-3 border border-gray-400 rounded-lg"
                  onChange={onChangeHandler}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  <span className="text-xs">$/month</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold ">
            Images: <span>The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              multiple
              className="p-3 border border-gray-400 rounded-lg w-full"
              accept="image/*"
            />
            <button className="p-3 border text-green-700 border-green-700 uppercase hover:shadow-lg rounded disabled:opacity-80">
              Upload
            </button>
          </div>
          <button
            disabled={loading}
            className="p-3 text-white rounded-lg uppercase bg-green-700 hover:opacity-80 disabled:opacity-65"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
