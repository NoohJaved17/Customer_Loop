import React from "react";

// components
import RecTab from "components/Cards/RecTab.js";


export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <RecTab />
        </div>
      </div>
    </>
  );
}
