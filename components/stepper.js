import React from 'react';
import { date2normal, time2str } from '../utils'

const Stepper = function({
    step=0,
    data,
    className=''
}) {
    
    return (
        <div className={`stepper d-flex justify-content-between ${className}`}>
            {data.map((item, idx) => (
                <div className={`stepper-item d-flex flex-column ${step === idx ? 'active' : step > idx ? 'done' : ''}`} key={`stepper-${item.title}`}>
                    <div className="stepper-item-steps d-flex justify-content-center">
                        <div className={`stepper-item-steps-left flex-1 ${idx === 0 ? 'hidden' : ''}`}></div>
                        <div className={`stepper-item-steps-wrapper d-flex align-items-center justify-content-center flex-0`}>
                            <div className="stepper-item-steps-circle"></div>
                        </div>
                        <div className={`stepper-item-steps-right flex-1 ${idx === data.length - 1 ? 'hidden' : ''}`}></div>
                    </div>
                    <div className="text-center mt-3">
                        <h5>{item.title}</h5>
                        <div className="text-gray">{date2normal(item.date)}</div>
                        <div className="text-gray">{time2str(item.date)}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Stepper;
