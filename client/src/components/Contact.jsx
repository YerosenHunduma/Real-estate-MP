import React, { useEffect, useState } from "react";
import { fetchlandlord } from "../apiCalls/user";
import { Link } from "react-router-dom";

function Contact({ list }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getLandlord = async () => {
      try {
        const response = await fetchlandlord(list.userRef);
        console.log(response);
        if (response.success === false) {
          console.log(response.message);
          return;
        }
        setLandlord(response.landlord);
      } catch (err) {
        console.log(err);
      }
    };
    getLandlord();
  }, [list.userRef]);
  const onchangeHandler = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-4">
          <p>
            Please Contact landlord{" "}
            <span className="font-semibold">{landlord.username}</span> for more
            information about <span className="font-semibold">{list.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            placeholder="Enter your message here..."
            className="border border-gray-400 rounded-lg p-3"
            value={message}
            onChange={onchangeHandler}
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding${list.name}&body=${message}`}
            className="bg-black text-white rounded-lg uppercase hover:opacity-85 p-3 text-center"
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
