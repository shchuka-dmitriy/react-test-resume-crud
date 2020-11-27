import React from 'react';
import styles from './ListItem.module.sass';
import CONSTANTS from "../../constants";

class ListItem extends React.Component {

    /**
     *
     * @description Creates users list element
     * @return {JSX.Element} - Users list element
     */
    renderProductItem = () => {
        const {id, avatar, firstName, lastName} = this.props.data;
        return (
            <button onClick={() => this.props.goToExtended(id)} className={styles.userMainContainer}>
                <div className={styles.descriptionContainer}>
                    <img src={ avatar === CONSTANTS.ANONYM_PHOTO ? CONSTANTS.ANONYM_IMAGE_PATH
                        : `${CONSTANTS.publicPhotosURL}${avatar}` }
                         className={styles.userImage} alt='User'/>
                    <span className={styles.title}>{lastName} {firstName}</span>
                </div>
            </button>
        )
    };

    render()
    {
        return (
            <>
                {this.renderProductItem()}
            </>
        )
    }
}

export default ListItem;