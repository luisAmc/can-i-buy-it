import { CheckIcon } from '@heroicons/react/outline';
import { FieldError } from '../shared/Form';
import { useFormContext, useWatch } from 'react-hook-form';
import clsx from 'clsx';

interface Props {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}

export function CategorySelector({ label, name, options }: Props) {
  const { control, setValue } = useFormContext();

  const selectedCategory = useWatch({ control, name });

  function onChange(value: string) {
    if (selectedCategory === value) {
      setValue(name, '');
    } else {
      setValue(name, value);
    }
  }

  return (
    <label>
      <div className='font-medium text-gray-800 mb-1'>{label}</div>

      <div className='grid grid-cols-2 gap-2'>
        {options.map((category) => (
          <SingleCategory
            key={category.value}
            {...category}
            isSelected={selectedCategory === category.value}
            onClick={onChange}
          />
        ))}
      </div>

      <FieldError name={name} />
    </label>
  );
}

interface SingleCategoryProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: (value: string) => void;
}

function SingleCategory({
  label,
  value,
  isSelected,
  onClick
}: SingleCategoryProps) {
  return (
    <button
      type='button'
      className={clsx(
        'h-20 flex flex-col items-center justify-center p-4 rounded-md transition-all ease-in-out cursor-pointer select-none text-sm border-2',
        isSelected
          ? 'border-solid border-brand-300 bg-brand-200 font-medium text-brand-800'
          : 'border-solid'
      )}
      onClick={() => onClick(value)}
    >
      {isSelected && <CheckIcon className='w-10 h-10 mr-1' />}
      <span>{label}</span>
    </button>
  );
}
