// components/UserProfileCard.tsx

import { FC } from 'react';
import Image from 'next/image';

interface UserProfileCardProps {
  name: string;
  email: string;
  profileImage: string;
}

const UserProfileCard: FC<UserProfileCardProps> = ({ name, email, profileImage }) => {
  return (
    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md max-w-sm">
      <Image
        src={profileImage}
        alt="Profile picture"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="ml-4 flex-1">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
