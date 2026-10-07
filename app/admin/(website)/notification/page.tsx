import Heading from "@/app/components/common/Heading";
import React from "react";
import data from "./data.json";
const page = () => {
  return (
    <div>
      <Heading headingParts={[{ text: "Notification" }]} />
      <div className="space-y-2 mt-10">
        {data.feedback.map((item, idx) => (
          <div key={idx} className="p-4 bg-white rounded-lg shadow">
            <div></div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
