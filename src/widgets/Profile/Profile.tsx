import { ActionCard } from "@/shared/ui/ActionCard";
import { BaseModal } from "@/shared/ui/BaseModal";
import { Card } from "@/shared/ui/Card";
import { Chip } from "@/shared/ui/Chip";
import { useState } from "react";
import { Vacation } from "./Vacation";
import { CategoriesList } from "./CategoriesList";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = "Анна";
  const userPicture = "";
  const [imageError, setImageError] = useState(false);

  const curatorName = "Константин Константинопольский Константинович";
  const curatorPhone = "+7(950)005-35-08";
  const curatorEmail = "dv.spb.rf@mail.ru";
  const companyName = "Благотворительный фонд «Добрый Волшебник»";
  const companyCity = "Самара";
  const companyAdress =
    "198260, город Санкт-Петербург, улица Стойкости, дом 18, корпус 1, квартира 75";

  return (
    <>
      <div
        className="flex items-center justify-center w-10 h-10 min-w-10 min-h-10 bg-light-gray-1 dark:bg-light-gray-5 rounded-full overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
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
      <BaseModal title="Профиль" open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex flex-col gap-1 mb-4">
          <Card>
            <Chip label="Куратор" />
            <div className="font-bodytext-regular mt-1.5">{curatorName}</div>
          </Card>
          <Card title="Контакты" titleFont="font-bodytext-m" titleGap="s">
            <div className="flex justify-between font-bodytext-regular">
              <p className="text-light-gray-4">Номер телефона</p>
              <p>{curatorPhone}</p>
            </div>
            <div className="mt-1 flex justify-between font-bodytext-regular">
              <p className="text-light-gray-4">Электронная почта</p>
              <p>{curatorEmail}</p>
            </div>
          </Card>
          <Vacation/>
          <Card title="Организация" titleFont="font-bodytext-m" titleGap="xs">
            <div className="flex flex-col gap-1 font-bodytext-regular">
              <p>{companyName}</p>
              <span>
                <p>Город (область, регион)</p>
                <p className="text-light-gray-4 mt-1">{companyCity}</p>
              </span>
              <span>
                <p>Почтовый адрес фонда или представителя, индекс</p>
                <p className="text-light-gray-4 mt-1">{companyAdress}</p>
              </span>
            </div>
          </Card>
          <CategoriesList/>
          <Card>
            <ActionCard label="База знаний" />
          </Card>
        </div>
      </BaseModal>
    </>
  );
};
