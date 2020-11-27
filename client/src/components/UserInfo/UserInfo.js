import React from 'react';
import styles from './UserInfo.module.sass';
import UserPhotoContainer from "../UserPhotoContainer/UserPhotoContainer";

const UserInfo = (props) => {
    const {userData} = props;
    const {avatar, firstName, lastName, resume, email} = userData.user;
    return (
        <div className={styles.mainContainer}>
            {/*<UserPhotoContainer superheroesPhotos={SuperheroesPhotos}/>*/}
            <UserPhotoContainer avatar={avatar} isEdit={false}/>
            <div className={styles.infoContainer}>
                <div className={styles.infoBlock}>
                    <span className={styles.label}>First name</span>
                    <span className={styles.info}>{firstName}</span>
                </div>
                <div className={styles.infoBlock}>
                    <span className={styles.label}>Last name</span>
                    <span className={styles.info}>{lastName}</span>
                </div>
                <div className={styles.infoBlock}>
                    <span className={styles.label}>Email</span>
                    <span className={styles.info}>{email}</span>
                </div>
                <div className={styles.infoBlock}>
                    <span className={styles.label}>Resume</span>
                    <span className={styles.info}>{resume}</span>
                </div>
            </div>
        </div>
    )
};

export default UserInfo;