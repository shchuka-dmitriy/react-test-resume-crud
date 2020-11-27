import React from 'react';
import styles from "./CreateHeroPage.module.sass";
import Form from "../../components/Form/Form";
import BackButton from "../../components/BackButton/BackButton";

const CreateHeroPage = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.backButtonsContainer}>
                <BackButton/>
            </div>

            <div className={styles.descriptionContainer}>
                <div className={styles.creatingContainer}>
                    <Form isEdit={false}/>
                </div>
            </div>
        </div>
    );
};

export default CreateHeroPage;