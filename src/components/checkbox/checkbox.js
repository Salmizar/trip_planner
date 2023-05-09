import React from 'react'
import { Input } from "../../components/input/input.style";
import "./checkbox.css"

const CheckBox = ({ disabled, title, checked, className, placeHolder, label }) => {
    return (
        <div className={'check-box-container '+className}>
            <label>
                <Input
                    title={title}
                    disabled={disabled}
                    type="checkbox"
                    checked = {checked}
                    onChange={(e) => console.log('do nothing')}
                    placeholder={placeHolder}
                />
                <span className='check-box-label'>{label}</span>
            </label>
        </div>
    )
}

export default CheckBox