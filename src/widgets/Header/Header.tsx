import Notification from '~assets/icons/notify_bell.svg?react';
import { Profile } from '../Profile/Profile';

export const Header = () => {
  // В будущем эти данные будут браться из Zustand (authStore)
  const orgName = 'НКО «Добрые Сердца»';
  const userRole = 'Куратор';
  const userCity = 'Самара';
  

  return (
    <div className="relative w-full max-w-125 p-4 pt-2.5 bg-light-gray-white dark:bg-light-gray-7-logo flex items-start justify-between overflow-x-hidden"
    >
      
      {/* Левая часть: Название и подзаголовок */}
      <div className="flex flex-col justify-start items-start ">
        <h1 className="font-bodytext-regular text-light-gray-black dark:text-light-gray-1 leading-tight">
          {orgName}
        </h1>
        <p className="font-caption-regular text-light-gray-5 dark:text-light-gray-4 mt-0.5">
          {userRole} <span className='ml-1' >{userCity}</span>
        </p>
      </div>

      {/* Правая часть: Уведомления и Аватар */}
      <div className="w-23 flex items-center justify-between gap-3.5">
        
        {/* Иконка уведомлений */}
        <div
          className="rounded-full bg-light-gray-1 dark:bg-light-gray-6 w-10 h-10 min-w-10 min-h-10 flex items-center justify-center relative cursor-pointer"
        >
          <Notification className="fill-light-gray-7-logo dark:fill-light-gray-1"/>
          {/* Зеленая точка (пока показываем всегда) */}
          <div className="bg-light-brand-green w-1.5 h-1.5 min-w-1.5 min-h-1.5 rounded-full top-8.5 left-8.5 absolute pulse" />
        </div>
       <Profile />
      </div>
    </div>
  );
};