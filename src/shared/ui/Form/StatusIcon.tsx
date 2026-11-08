import classNames from "classnames";
import Check from "@/assets/icons/check.svg?react";

interface StatusIconProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "m";
  className?: string;
}

const sizeMap = {
  m: "w-6 h-6",
};
export const StatusIcon = ({
  checked,
  onChange,
  disabled = false,
  size = "m",
  className,
}: StatusIconProps) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={classNames(
      "inline-flex items-center justify-center p-0 leading-none rounded-full shrink-0 transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-brand-green focus-visible:ring-offset-2",
      sizeMap[size],
      checked ? "bg-light-brand-green" : "bg-light-gray-3 dark:bg-light-gray-5",
      disabled && "opacity-50 cursor-not-allowed",
      !disabled && "cursor-pointer",
      className,
    )}
  >
    <Check
      className={classNames(
        "block w-4 h-4 text-light-gray-white transition-opacity",
        checked ? "opacity-100" : "opacity-0",
      )}
    />
  </button>
);
