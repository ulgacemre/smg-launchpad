import React, {useState, useRef} from "react"

const InputMax = ({max, value, currency, placeholder, className='', onChange}) => {
    const inputRef = useRef(null)
    const handleMax = () => {
        inputRef.current.value = max;
        if( onChange ) onChange(max)
    }

    return (
        <div className={`d-flex justify-content-between align-items-center caption ${className}`}>
            <input type="text" value={value} className="form-control v-input" ref={inputRef} placeholder={placeholder} onChange={(e) => { if(onChange) onChange(e.target.value) }} style={{'fontSize': '1rem'}}/>
            <div style={{flex: '0 0 auto'}}>
                <span style={{border:'#1e1e1e solid 1px', fontSize: '0.75rem', cursor: 'pointer'}} className="v-span-rounded" onClick={handleMax}>Max</span>
                <span className="primary--text ml-2">{currency}</span>
            </div>
        </div>
    );
  };
  
  export default InputMax;
  