import { useState } from "react";
import { PATHS } from "@/paths";
import { useNavigate } from "react-router-dom";


export const ProfileWidget = () => {
  const userName = "Анна";
  const userPicture = "";
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();
  const handleGoTo = () => {
    navigate(PATHS.PROFILE);
  };

  return (
    <>
      <div
        className="flex items-center justify-center w-10 h-10 min-w-10 min-h-10 bg-light-gray-1 dark:bg-light-gray-5 rounded-full overflow-hidden cursor-pointer"
        onClick={handleGoTo}
      >
        {userPicture && !imageError ? (
          <img
            src={userPicture}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-light-gray-black dark:text-light-gray-white font-bodytext-m">
            {userName ? userName[0]?.toUpperCase() : "A"}
          </span>
        )}
      </div>
    </>
  );
};
