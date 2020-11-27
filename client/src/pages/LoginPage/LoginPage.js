import React from 'react';
import styles from '../../assets/styles/LoginRegistrationPages.module.sass';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {clearErrorSignUpAndLogin} from '../../actions/actionCreator';
import PropTypes from 'prop-types';
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = (props) => {
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
                        <Link to={'/registration'} style={{textDecoration: 'none'}}>
                            <span>Sign up</span>
                        </Link>
                    </div>
                </div>
                <div className={styles.headerFormContainer}>
                    <h2 className={styles.formHeader}>LOGIN TO YOUR ACCOUNT</h2>
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
};

LoginPage.propTypes = {
    clearError: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearError: () => dispatch(clearErrorSignUpAndLogin())
    }
};

export default connect(null, mapDispatchToProps)(LoginPage);