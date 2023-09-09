'use client'

import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Props {
    currentValue: number;
    maxValue: number | any;
    updatedQuantity: (newValue: number) => void;
}

const ItemCounter = ({ currentValue, maxValue, updatedQuantity }: Props) => {
    const [inputValue, setInputValue] = useState(currentValue);

    const addOrRemove = (value: number) => {
        if (value === -1) {
            if (inputValue === 1) return;
            setInputValue(inputValue - 1);
        } else if (inputValue < maxValue) {
            setInputValue(inputValue + 1);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && newValue >= 1 && newValue <= maxValue) {
            setInputValue(newValue);
            updatedQuantity(newValue); // Llamar a la función de actualización cuando cambie el valor.
        }
    };

    return (
        <div className="grid grid-cols-3 justify-center bg-[#f2f2f2]">
            <button onClick={() => addOrRemove(-1)} type="button" className='flex justify-center items-center w-full'>
                <AiOutlineMinus className="w-4 h-4" />
            </button>
            <input
                type="number"
                className="max-w-8 text-center flex h-10 border-input p-0 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                min={1}
                max={maxValue}
                value={inputValue}
                onChange={handleInputChange} // Agregar el manejador onChange
            />
            <button onClick={() => addOrRemove(1)} type="button" className='flex justify-center items-center w-full'>
                <AiOutlinePlus className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ItemCounter;
