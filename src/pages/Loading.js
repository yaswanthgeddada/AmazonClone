import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const loading = () => {
  return (
    <div className="flex flex-col bg-gray-700 text-white justify-center space-y-4 items-center h-screen w-screen">
      <p>Loading ....</p>
      <CircularProgress />
    </div>
  );
};

export default loading;
