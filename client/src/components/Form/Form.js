import React, {useState} from 'react';
import CONSTANTS from '../../constants';
import styles from './Form.module.sass';
import '../../assets/styles/react-confirm-alert.css';
import {connect} from 'react-redux';
import {Field, reduxForm, submit} from 'redux-form';
import {confirmAlert} from 'react-confirm-alert';
import {authActionRegister, updateUserAction} from "../../actions/actionCreator";
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schemes from '../../validators/validationSchemes';
import ImageUploadInput from "../ImageUploadInput/ImageUploadInput";
import UserPhotoContainer from "../UserPhotoContainer/UserPhotoContainer";
import Error from "../Error/Error";

const Form = ({handleSubmit, authClear, updateUser, createData, defaultData, isEdit, userId,
                  selectUserData, authError}) => {

    const [photosListForRemoved, setPhotosListForRemoved] = useState( null );

    const formInputClassNames = {
        container: null,
        input: styles.input,
        valid: styles.valid,
        notValid: styles.notValid,
        warning: styles.fieldWarning
    };

    const onSubmit = (userData) => {
        confirmAlert({
            message: isEdit ? 'Are you sure wish to update profile?' : 'Are you sure wish to create new account?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const data = new FormData();
                        Object.keys(userData).forEach(key => {
                            if (key !== 'file' && userData[key]) {
                                data.append(key, userData[key]);
                            }
                        });

                        if (userData.file instanceof File)
                            data.append('file', userData.file);
                        data.append('photosListForRemoved', photosListForRemoved);
                        isEdit ? updateUser(data, userId) : createData(data);
                        window.location.assign(CONSTANTS.HOME_URL);
                    }
                },
                {
                    label: 'Cancel',
                }]
        });
    };

    /**
     *
     * @description Handle onClick event on photos
     * @param {String} targetPhoto
     */
    const onClickHandler = (targetPhoto) => {
        confirmAlert({
            message: 'Are you sure wish to delete photo?',
            buttons: [
                {
                    label: 'Delete photo',
                    /**
                     *  @description Delete the target picture.
                     */
                    onClick: () => {
                        setPhotosListForRemoved(targetPhoto);
                    }
                },
                {
                    label: 'Cancel',
                }]
        });
    };

    return (

        <div className={styles.loginForm}>
            {authError && <Error data={authError.data} status={authError.status} clearError={authClear}/>}
            {
                isEdit &&
                <div>
                    <span className={styles.topFieldLabel}>You can delete avatar by clicking
                        on the picture</span>
                    <UserPhotoContainer avatar={selectUserData.user.avatar}
                                        onClickHandler={onClickHandler}
                                        isEdit={true}/>
                </div>
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <span className={styles.fieldLabel}>What is first name?</span>
                <Field
                    name='firstName'
                    classes={formInputClassNames}
                    component={FormInput}
                    type='text'
                    label='Nick name'
                />
                <span className={styles.fieldLabel}>What is last name?</span>
                <Field
                    name='lastName'
                    classes={formInputClassNames}
                    component={FormInput}
                    type='text'
                    label='Real name'
                />
                <span className={styles.fieldLabel}> { isEdit ? "Create new password" : "What is your password?" }</span>
                <Field
                    name='password'
                    classes={formInputClassNames}
                    component={FormInput}
                    type='password'
                    label='Password'
                />
                <span className={styles.fieldLabel}>What is email?</span>
                <Field
                    name='email'
                    classes={formInputClassNames}
                    component={FormInput}
                    type='text'
                    label='Email'
                />
                <span className={styles.fieldLabel}>Write resume please</span>
                <Field
                    name='resume'
                    classes={formInputClassNames}
                    component={FormInput}
                    type='textArea'
                    label='Resume'
                />
                <Field
                    name='file'
                    component={ImageUploadInput}
                    classes={{
                        uploadContainer: styles.imageUploadContainer,
                        inputContainer: styles.uploadInputContainer,
                        commonImgStyle: styles.commonImgStyle
                    }}
                    type='file'
                />

                <div className={styles.submitContainerWrapper}>
                    <button type='submit' className={styles.submitContainer}>
                        <span className={styles.submitButton}>
                            { isEdit ? "edit profile" : "registration" }
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const {error, selectUserData} = state.selectUserStore;
    const authError = state.auth.error;
    return {
        authError,
        error,
        selectUserData,
        initialValues: ownProps.defaultData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (newUserData, id) => dispatch(updateUserAction(newUserData, id)),
        createData: (userData) => dispatch(authActionRegister(userData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'eventForm',
    enableReinitialize : true,
    validate: customValidator(Schemes.RegistrationSchema)
})(Form));