import React from 'react';
import CONSTANTS from "../../constants";
import styles from "./UserPhotoContainer.module.sass";
import PropTypes from 'prop-types';

const UserPhotoContainer = ({avatar, isEdit, onClickHandler}) => {

    const onClick = (targetPhoto) => {
        onClickHandler(targetPhoto);
    };

    return (
        <>
            <div className={styles.photosContainer}>
                <img src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
                     className={styles.avatar} onClick={ (isEdit && (avatar !== 'anon.png') )
                    ? (() => {onClick(avatar)}
                    )
                    : undefined } alt='user'/>
            </div>
        </>
    );
};

UserPhotoContainer.propTypes = {
    avatar: PropTypes.string,
    isEdit: PropTypes.bool,
    onClickHandler: PropTypes.func
};

export default UserPhotoContainer;