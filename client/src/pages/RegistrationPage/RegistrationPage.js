import React from 'react';
import styles from '../../assets/styles/LoginRegistrationPages.module.sass';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearErrorSignUpAndLogin} from '../../actions/actionCreator';
import PropTypes from "prop-types";
import Form from "../../components/Form/Form";

const RegistrationPage = (props) => {
    props.clearError();

    return (
        <div className={styles.mainContainer}>
            <div className={styles.wrapperContainer}>
                <div className={styles.headerPage}>
                    <div className={styles.linkLoginContainer}>
                        <Link to={'/'} style={{textDecoration: 'none'}}>
                            <span>To list</span>
                        </Link>
                    </div>
                    <div className={styles.linkLoginContainer}>
                        <Link to='/login' style={{textDecoration: 'none'}}>
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
                <div className={styles.headerFormContainer}>
                    <h2 className={styles.formHeader}>
                        CREATE AN ACCOUNT
                    </h2>
                    <Form isEdit={false}/>
                </div>
            </div>
        </div>
    )
};

RegistrationPage.propTypes = {
    clearError: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearError: () => dispatch(clearErrorSignUpAndLogin())
    }
};

export default connect(null, mapDispatchToProps)(RegistrationPage);