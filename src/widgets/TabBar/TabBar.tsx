import React from 'react';
import HomeIcon from '~assets/icons/home.svg?react';
import QrIcon from '~assets/icons/qr.svg?react';
import ReportIcon from '~assets/icons/report.svg?react';
import RequestIcon from '~assets/icons/request.svg?react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

// interface ITabBarProps {
//   isSuperuser?: boolean; // Флаг для пользователя с большими правами
// }

export const TabBar = (
  // { isSuperuser = false }: ITabBarProps
) => {
  const baseBtnClass = "flex flex-col items-center pt-1.5 pb-2 bg-light-gray-white dark:bg-light-gray-7-logo ";
  const activeIconClass = "text-light-brand-green";
  const inactiveIconClass = "text-light-gray-3 dark:text-light-gray-4";
  const activeTextClass = "text-light-brand-green";
  const inactiveTextClass = "text-light-gray-4";

  const renderTabContent = (Icon: React.FC<React.SVGProps<SVGSVGElement>>, label: string, isActive: boolean) => (
    <>
      <Icon className={`h-5 min-w-5 min-h-5 ${isActive ? activeIconClass : inactiveIconClass}`} />
      <span className={classNames('mt-1.25 font-label-emphasized w-21.75 min-w-21.75', isActive ? activeTextClass : inactiveTextClass)}>
        {label}
      </span>
    </>
  );

  return (
    <div className="w-full max-w-125 h-12.5 min-h-12.5 self-center px-4 bottom-0 fixed bg-light-gray-white border-t-[0.33px] border-light-gray-3 dark:border-light-gray-6">
      <div className="flex justify-between w-full">
        
        {/* 1. Главная */}
        <NavLink
          to="/curator/main"
          className={() => classNames(baseBtnClass)}
        >
          {({ isActive }) => renderTabContent(HomeIcon, 'Главная', isActive)}
        </NavLink>

        <NavLink
          to="/curator/report"
          className={() => classNames(baseBtnClass)}
        >
          {({ isActive }) => renderTabContent(ReportIcon, 'Отчеты', isActive)}
        </NavLink>

        <NavLink
          to="/curator/request"
          className={() => classNames(baseBtnClass)}
        >
          {({ isActive }) => renderTabContent(RequestIcon, 'Заявки', isActive)}
        </NavLink>

        <NavLink
          to="/curator/qr"
          className={() => classNames(baseBtnClass)}
        >
          {({ isActive }) => renderTabContent( QrIcon, 'QR-коды', isActive)}
        </NavLink>

      </div>
    </div>
  );
};