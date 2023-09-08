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
        <div className="flex gap-2 justify-center">
            <button onClick={() => addOrRemove(-1)} type="button">
                <AiOutlineMinus className="w-6 h-6" />
            </button>
            <input
                type="number"
                className="w-14 text-center flex h-10 border border-input bg-transparent px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                min={1}
                max={maxValue}
                value={inputValue}
                onChange={handleInputChange} // Agregar el manejador onChange
            />
            <button onClick={() => addOrRemove(1)} type="button">
                <AiOutlinePlus className="w-6 h-6" />
            </button>
        </div>
    );
};

export default ItemCounter;
