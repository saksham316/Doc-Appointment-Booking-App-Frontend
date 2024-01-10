// ----------------------------------------------------------Imports-------------------------------------------------------------------
import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import styles from "./buttonLoadingSpinner.module.css"
// ------------------------------------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------------------------------------

export const ButtonLoadingSpinner = () => {
    return (
        <div>
            <FaSpinner className={`${styles.loadingIcon}`}/>
        </div>
    )
}
