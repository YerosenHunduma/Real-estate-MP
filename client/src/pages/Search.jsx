import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListings } from "../apiCalls/user";
import LlistingItemCard from "../components/LlistingItemCard";

function Search() {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  console.log(listingData);

  const onChangeHandler = (e) => {
    if (
      e.target.id === "sale" ||
      e.target.id === "rent" ||
      e.target.id === "all"
    ) {
      setSearchData({
        ...searchData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.id === "true" ? true : false,
      });
    }
    if (e.target.id === "searchTerm") {
      setSearchData({
        ...searchData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "desc";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({
        ...searchData,
        sort,
        order,
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/search`);
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("type", searchData.type);
    urlParams.set("offer", searchData.offer);
    urlParams.set("parking", searchData.parking);
    urlParams.set("furnished", searchData.furnished);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    const urlQuery = urlParams.toString();
    navigate(`/search?${urlQuery}`);
  };

  useEffect(() => {
    setShowMore(false);
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    const typeUrl = urlParams.get("type");
    const offerUrl = urlParams.get("offer");
    const parkingUrl = urlParams.get("parking");
    const furnishedUrl = urlParams.get("furnished");
    const sortUrl = urlParams.get("sort");
    const orderUrl = urlParams.get("order");
    console.log(searchTermUrl);
    if (
      searchTermUrl ||
      sortUrl ||
      orderUrl ||
      typeUrl ||
      offerUrl ||
      parkingUrl ||
      furnishedUrl
    ) {
      setSearchData({
        searchTerm: searchTermUrl || "",
        type: typeUrl || "all",
        offer: offerUrl === "true" ? true : false,
        parking: parkingUrl === "true" ? true : false,
        furnished: furnishedUrl === "true" ? true : false,
        sort: sortUrl || "createdAt",
        order: orderUrl || "desc",
      });
    }
    const fetchListingData = async () => {
      try {
        const searchQuery = urlParams.toString();
        setLoading(true);
        const response = await getListings(searchQuery);
        console.log(response);
        setListingData(response);
        if (response.length > 8) {
          setShowMore(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListingData();
  }, [location.search]);

  const fetchMoreData = async () => {
    try {
      const numberOfData = listingData.length;
      const startIndex = numberOfData;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();
      setLoading(true);
      const response = await getListings(searchQuery);
      if (response.length < 9) {
        setShowMore(false);
      }
      setListingData([...listingData, ...response]);
      setLoading(false);
    } catch (error) {
      setShowMore(false);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              className="border rounded-lg p-3 w-full"
              id="searchTerm"
              type="text"
              placeholder="search....."
              onChange={onChangeHandler}
              value={searchData.searchTerm}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={onChangeHandler}
                checked={searchData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={onChangeHandler}
                checked={searchData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={onChangeHandler}
                checked={searchData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={onChangeHandler}
                checked={searchData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={onChangeHandler}
                checked={searchData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={onChangeHandler}
                checked={searchData.parking}
              />
              <span>Parking</span>
            </div>
          </div>
          <div className=" flex gap-2 items-center">
            <label className="font-semibold">Sort:</label>
            <select
              className="border rounded-lg p-3 "
              onChange={onChangeHandler}
              defaultValue={"createdAt_desc"}
              id="sort_order"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="p-3 rounded-lg bg-slate-700 text-white hover:opacity-80">
            Search
          </button>
        </form>
      </div>
      <div className="w-fullzz">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Items:
        </h1>
        {loading && (
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        )}
        {!loading && listingData.length === 0 && (
          <div className="flex justify-center items-center h-screen">
            No listing items found.
          </div>
        )}
        {!loading && (
          <div className="flex flex-wrap gap-4 p-3">
            {listingData.map((list) => (
              <LlistingItemCard key={list._id} listing={list} />
            ))}
          </div>
        )}
        {showMore && (
          <button
            onClick={fetchMoreData}
            className="text-slate-500 hover:underline p-8 text-2xl"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
