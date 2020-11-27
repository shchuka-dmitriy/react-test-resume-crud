import React from 'react';
import styles from './TryAgain.module.sass';

/**
 * @description Renders error message in page if error
 */
const TryAgain = (props) => {
    const {getData} = props;
    return (
        <div className={styles.container}>
            <span onClick={() => getData()}>Server Error. Try again</span>
            <i className="fas fa-redo" onClick={() => getData()}/>
        </div>
    );
};

export default TryAgain;