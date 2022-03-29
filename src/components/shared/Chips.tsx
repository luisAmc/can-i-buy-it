import { CheckIcon } from '@heroicons/react/outline';
import { FieldError } from './Form';
import { useFormContext, useWatch } from 'react-hook-form';
import clsx from 'clsx';

interface ChipProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}

export function Chips({ label, name, options }: ChipProps) {
  const { control, setValue } = useFormContext();

  const selectedChip = useWatch({ control, name });

  function onChange(value: string) {
    if (selectedChip === value) {
      setValue(name, '');
    } else {
      setValue(name, value);
    }
  }

  return (
    <label>
      <div className='font-medium text-gray-800 mb-1'>{label}</div>

      <div className='flex flex-wrap gap-x-4 gap-y-2'>
        {options.map((chip) => (
          <SingleChip
            key={chip.value}
            {...chip}
            isSelected={selectedChip === chip.value}
            onClick={onChange}
          />
        ))}
      </div>

      <FieldError name={name} />
    </label>
  );
}

interface SingleChipProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: (value: string) => void;
}

function SingleChip({
  label,
  value,
  isSelected,
  onClick
}: SingleChipProps) {
  return (
    <div
      className={clsx(
        'flex items-center px-4 py-3 rounded-full leading-3 transition-all ease-in-out duration-500 cursor-pointer select-none text-sm',
        isSelected ? 'bg-brand-300 text-brand-800' : 'bg-stone-200'
      )}
      onClick={() => onClick(value)}
    >
      {isSelected && <CheckIcon className='w-3 h-3.w-3 mr-1' />}
      <span>{label}</span>
    </div>
  );
}
