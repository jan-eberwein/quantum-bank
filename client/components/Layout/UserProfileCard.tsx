// components/UserProfileCard.tsx
import Image from "next/image";
import { useUserContext } from "./UserContext";

const UserProfileCard = () => {
  const { state } = useUserContext();

  return (
    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md max-w-sm">
      {state.user ? (
        <Image
          src={`https://ui-avatars.com/api/?name=${state.user.name}`}
          alt={state.user.name}
          width={48}
          height={48}
          className="rounded-full"
        />
      ) : (
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      )}
    </div>
  );
};

export default UserProfileCard;
