import React, { useState } from 'react';
import ConfPeople from '../svg/ConfPeople.svg';

const colorOptions = [
    { id: 0, gtaId: 111, hex: '#ffffff' }, // Ice White
    { id: 1, gtaId: 27,  hex: '#cf1f21' }, // Torino Red
    { id: 2, gtaId: 92,  hex: '#b0ee6e' }, // Lime Green
    { id: 3, gtaId: 0,   hex: '#0d1116' }, // Black
    { id: 4, gtaId: 145, hex: '#6b1f7b' }, // Midnight Purple
    { id: 5, gtaId: 5,   hex: '#81827f' }, // Graphite
];

const CarDetails = ({ car, params, name, price, type, sale, image, onRentComplete, conf1, conf2, conf3 }) => {
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

    const sendTrigger = (type) => {
        const data = {
            ...params,
            color: selectedColor.gtaId // передаём GTA ID цвета
        };
        const triggerName = type === 'card' ? 'client:carRent:buyCard' : 'client:carRent:buyCash';
        try {
            mp.trigger(triggerName, name, JSON.stringify(data)); // eslint-disable-line
            if (onRentComplete) onRentComplete();
        } catch (e) {
            console.log("Ошибка при отправке триггера:", e);
        }
    };

    if (!car) return null;

    return (
        <div className="car-details-container">
                            <div className='stick--select--24'></div>
                            <div className='stick--select--25'></div>
                            <div className='stick--select--26'></div>
                            <div className="text--price--car--4_17">
                                <div className='text--info--1'><h >Итоговая сумма</h></div>
                                <h className='text--price--2'>{price}</h>
                            </div>
                            <div className='text--conf--car--1_18'>
                                <h className='text--conf--max--speed--1'>Максимальная скорость</h>
                                <div className="text--conf--car--1_18_2">
                                <h className='text--conf--max--speed--2'>{conf1}</h>
                                <h className='text--conf--max--speed--3'>КМ/Ч</h>
                                </div>
                            </div>
                            <div className='text--conf--car--2_19'>
                                <div><h className='text--conf--people--1'>Вместимость</h></div>
                                <h className='text--conf--people--2'>{conf2}</h>
                                <img alt='' src={ConfPeople} className='svg--conf--people--3'/>
                            </div>
                            <div className='text--conf--car--3_20'>
                                <div className='text--conf--fill--1'><h>Тип топлива</h></div>
                                <h className='text--conf--fill--2'>{conf3}</h>
                            </div>
                <div className='general--block--15'>
                    <img
                        alt=''
                        src={image}
                        className="general--image--block--7"
                    />
                    <div className='general--cap--block--16'>
                        <h className="car--brand--text--11">{name}</h>
                        <h className="car--brand--text--12">{type}</h>
                    </div>
                </div>
            <div className="color--grid--rent--22">
    {colorOptions.map((color, index) => (
        <button
            key={index}
            onClick={() => setSelectedColor(color)}
            className={`color--block--rent--23 ${selectedColor.id === color.id ? 'selected' : ''}`}
            style={{ backgroundColor: color.hex }}
        />
    ))}
</div>

            <div className="rent-buttons-container">
                <span onClick={() => sendTrigger('card')} className="rent--car--button--21">Картой</span>
                <span onClick={() => sendTrigger('cash')} className="rent--car--button--22">Наличные</span>
                {/* {sale < 0 && (
                    <span onClick={() => sendTrigger('take')} className="rent-button">Взять</span>
                )} */}
            </div>
        </div>
    );
};

export default CarDetails;