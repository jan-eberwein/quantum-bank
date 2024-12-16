import React from "react";
import Image from "next/image";
import Link from "next/link";

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
        <div className="ml-auto">
          <Link href="/sign-in">
            <Image
              src={"/icons/logout.svg"}
              alt="Visa"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserCard;
