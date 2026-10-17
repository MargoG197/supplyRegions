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
  const baseBtnClass = "flex flex-col items-center py-2 bg-light-gray-white dark:bg-light-gray-7-logo w-[50%]";
  const activeIconClass = "text-light-brand-green";
  const inactiveIconClass = "text-light-gray-3 dark:text-light-gray-4";
  const activeTextClass = "text-light-brand-green";
  const inactiveTextClass = "text-light-gray-4";

  const renderTabContent = (Icon: React.FC<React.SVGProps<SVGSVGElement>>, label: string, isActive: boolean) => (
    <>
      <Icon className={`w-6 h-6 min-w-6 min-h-6 ${isActive ? activeIconClass : inactiveIconClass}`} />
      <span className={classNames('mt-1 font-label-emphasized', isActive ? activeTextClass : inactiveTextClass)}>
        {label}
      </span>
    </>
  );

  return (
    <div className="relative w-full max-w-125 self-center">
      <div className="flex justify-around fixed bottom-0 w-full max-w-125 h-17.5 border-t-[0.33px] border-light-gray-3 dark:border-light-gray-6">
        
        {/* 1. Главная */}
        <NavLink
          to="/curator/main"
          className={() => classNames(baseBtnClass, 'pl-4.75')}
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
          className={() => classNames(baseBtnClass, 'pr-4 pt-1.75')}
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