import React from "react";
import Image from "next/image";

const UserCard = () => {
  return (
    <>
      <div className="mt-auto p-4 bg-gray-100 rounded-lg shadow-md flex items-center gap-4">
        <div className="relative w-12 h-12">
          <Image
            src={"/icons/jan.png"}
            alt="User"
            fill
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium text-gray-800">Jan Eberwein</p>
          <p className="text-sm text-gray-500">1234 5678 9012</p>
        </div>
      </div>
    </>
  );
};

export default UserCard;
