// components/SelectField.tsx
import { forwardRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

type Option = { value: string; label?: string; disabled?: boolean };

type Props = {
  id: string;
  name?: string;
  autoComplete?: string;
  value: string; // allow "" when using placeholder
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onValueChange?: (value: string) => void; // ergonomic alternative
  options: readonly (string | Option)[];
  className?: string;
  placeholder?: string; // rendered as disabled+hidden option
  required?: boolean;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  hint?: string;   // small helper text
  error?: string;  // small error text
};

export const SelectField = forwardRef<HTMLSelectElement, Props>(
  (
    {
      id,
      name = id,
      autoComplete,
      value,
      onChange,
      onValueChange,
      options,
      className,
      placeholder,
      required,
      disabled,
      "aria-invalid": ariaInvalid,
      hint,
      error,
    },
    ref
  ) => {
    const base =
      "col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base border-2 border-gray-300 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500";

    return (
      <div className="sm:max-w-xs">
        <div className="grid grid-cols-1">
          <select
            ref={ref}
            id={id}
            name={name}
            autoComplete={autoComplete}
            value={value}
            required={required}
            disabled={disabled}
            aria-invalid={ariaInvalid}
            onChange={(e) => {
              onChange?.(e);
              onValueChange?.(e.currentTarget.value);
            }}
            className={className ? `${base} ${className}` : base}
          >
            {placeholder ? (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            ) : null}

            {options.map((opt) =>
              typeof opt === "string" ? (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ) : (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label ?? opt.value}
                </option>
              )
            )}
          </select>

          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
          />
        </div>

        {(hint || error) && (
          <p
            className={`mt-1 text-xs ${
              error ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);
SelectField.displayName = "SelectField";
