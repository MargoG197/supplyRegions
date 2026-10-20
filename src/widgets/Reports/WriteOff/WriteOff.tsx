import { useState } from 'react';
import { ChipGroup, ChipOption } from '~/shared/ui/ChipGroup';
import CalendarIcon from '~assets/icons/calendar-x.svg?react';
import BoxIcon from '~assets/icons//package-x.svg?react';
import BarcodeIcon from '~assets/icons/barcode.svg?react';
import BanIcon from '~assets/icons//circle-off.svg?react';


// Опции для выбора
const writeOffReasons: ChipOption[] = [
  { value: 'expired', label: 'Просрочка', icon: <CalendarIcon /> },
  { value: 'damaged', label: 'Порча упаковки', icon: <BoxIcon /> },
  { value: 'unmarked', label: 'Немаркированный', icon: <BarcodeIcon /> },
  { value: 'rotten', label: 'Скоропорт/быт', icon: <BanIcon /> },
];

export const WriteOff = () => {
  // Стейт для выбранных причин
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  return (
    <>
      <ChipGroup
        label="Причина списания"
        options={writeOffReasons}
        value={selectedReasons}
        onChange={setSelectedReasons}
        multiple={true} 
      />
    </>
  );
};