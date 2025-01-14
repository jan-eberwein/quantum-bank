import React from "react";
import Image from "next/image";
import Link from "next/link";

const UserCard = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center gap-4">
      {/* Avatar */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16">
        <Image
          src={"/icons/jan.png"}
          alt="User Avatar"
          fill
          className="rounded-full object-cover"
        />
      </div>

      {/* User Info - Hidden on smaller screens */}
      <div className="hidden sm:flex flex-col">
        <p className="text-base font-semibold text-gray-800 sm:text-lg">
          Jan Eberwein
        </p>
        <p className="text-sm text-gray-500">1234 5678 9012</p>
      </div>

      {/* Logout Button - Hidden on smaller screens */}
      <div className="hidden sm:block ml-auto">
        <Link href="/sign-in">
          <Image
            src={"/icons/logout.svg"}
            alt="Logout Icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
