import React from 'react';
import styles from './Header.module.sass';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import CONSTANTS from '../../constants';
import history from "../../browserHistory";
import {clearUserStore, headerRequest} from '../../actions/actionCreator';

class Header extends React.Component {

    componentDidMount() {
        if (!this.props.data) {
            this.props.getUser();
        }
    }
    logOut = () => {
        localStorage.clear();
        this.props.clearUserStore();
        history.replace('/');
    };

    renderLoginButtons = () => {
        if (this.props.data) {
            return (
                <>
                    <div className={styles.userInfo}>
                        <span className={styles.btn}>{`Hi, ${this.props.data.user.firstName}`}</span>
                        <button onClick={this.logOut} className={styles.button}>Logout</button>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Link to='/login' style={{textDecoration: 'none'}} className={styles.buttonContainer}>
                        <button className={styles.button}>LOGIN</button>
                    </Link>
                    <Link to='/registration' style={{textDecoration: 'none'}} className={styles.buttonContainer}>
                        <button className={styles.button}>SIGN UP</button>
                    </Link>
                </>
            )
        }
    };

    render() {
        if (this.props.isFetching) {
            return null;
        }
        return (
            <div className={styles.headerContainer}>
                <div className={styles.loginSignUpHeaders}>
                    <div className={styles.numberContainer}>
                        <Link to={'/'}>
                            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}hr-logo.png`} alt='logo' className={styles.logo}/>
                        </Link>
                    </div>
                    <div className={styles.userButtonsContainer}>
                        {this.renderLoginButtons()}
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.userStore;
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(headerRequest()),
        clearUserStore: () => dispatch(clearUserStore())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));