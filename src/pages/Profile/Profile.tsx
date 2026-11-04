import { Card } from "@/shared/ui/Card";
import { Chip } from "@/shared/ui/Chip";
import { TabPageLayout } from "@/shared/layouts/TabPageLayout";
import { Vacation } from "@/widgets/Profile/Vacation";
import { CategoriesList } from "@/widgets/Profile/CategoriesList";
import { KnowledgeBaseWidget } from "@/widgets/KnowledgeBase/KnowledgeBaseWidget";

export const Profile = () => {

  const curatorName = "Константин Константинопольский Константинович";
  const curatorPhone = "+7(950)005-35-08";
  const curatorEmail = "dv.spb.rf@mail.ru";
  const companyName = "Благотворительный фонд «Добрый Волшебник»";
  const companyCity = "Самара";
  const companyAdress =
    "198260, город Санкт-Петербург, улица Стойкости, дом 18, корпус 1, квартира 75";

  return (
    <TabPageLayout title="Профиль">
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
        <Vacation />
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
        <CategoriesList />
        <Card>
          <KnowledgeBaseWidget />
        </Card>
      </div>
    </TabPageLayout>
  );
};
