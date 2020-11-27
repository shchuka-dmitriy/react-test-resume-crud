import React from 'react';
import {connect} from 'react-redux';
import styles from './UserPage.module.sass';
import CONSTANTS from '../../constants';
import TryAgain from '../../components/TryAgain/TryAgain';
import {
    deleteUserAction,
    getUsersAction, getUserAction, getUserByIdAction, headerRequest
} from "../../actions/actionCreator";
import BackButton from "../../components/BackButton/BackButton";
import UserInfo from "../../components/UserInfo/UserInfo";
import Spinner from '../../components/Spinner/Spinner';
import Form from "../../components/Form/Form";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    /**
     *
     * @description Get new users data from server
     */
    getData = () => {
        this.props.getUserRole();
        const {params} = this.props.match;
        this.props.getUser(params.id);
    };

    /**
     *
     * @description Delete user
     * @param {Class} user
     */
    deleteCurrentEvent = (user) => {
        if ( window.confirm('Are you sure wish to delete this User?') ) {
            this.props.deleteUser(user.currentTarget.id);
            this.props.getUsersArr();
            window.location.assign(CONSTANTS.HOME_URL);
        }
    };

    /**
     *
     * @description Set view mode between Display and Edit user
     */
    changeViewMode = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    /**
     *
     * @description Get default data about user for Edit page
     */
    getSuperheroObjInfo = () => {
        const {firstName, lastName, email, avatar, resume} = this.props.selectUserStore.selectUserData.user;
        const defaultData = {};
        const data = { firstName, lastName, email, avatar, resume };

        Object.keys(data).forEach((key) => {
            if (data[key]) {
                defaultData[key] = data[key];
            }
        });
        return defaultData;
    };

    render() {
        const {isEdit} = this.state;
        const {userStore, selectUserStore, match: {params: {id}}, error} = this.props;
        const {selectUserData, isFetching} = selectUserStore;

        return (
            <div>
                {error ? <div className={styles.tryContainer}><TryAgain getData={this.getData}/></div> :
                    (
                        isFetching ?
                            <div className={styles.containerSpinner}>
                                <Spinner/>
                            </div>
                            :
                            <div className={styles.mainInfoContainer}>
                                <div className={styles.backButtonsContainer}>
                                    <BackButton/>
                                    {
                                        userStore.data.user.role === 'admin' &&
                                        <div>
                                            <button id={id} onClick={this.deleteCurrentEvent}
                                                    className={styles.buttonEdit}>
                                                Delete
                                            </button>
                                            <button onClick={this.changeViewMode} className={styles.buttonEdit}>
                                                {isEdit ? "Cancel" : "Edit"}
                                            </button>
                                        </div>
                                    }
                                </div>
                                <div className={styles.mainContainerWrapper}>
                                    {
                                        isEdit ? <Form defaultData={this.getSuperheroObjInfo()}
                                                       userId={selectUserData.user.id}
                                                       isEdit={isEdit}
                                                 />
                                            :
                                            <div className={styles.infoContainer}>
                                                <UserInfo userData={selectUserData} userId={id}/>
                                            </div>
                                    }
                                </div>
                            </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = ({selectUserStore, userStore}) => {
    return {selectUserStore, userStore};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserRole: () => dispatch(headerRequest()),
        getUsersArr: () => dispatch(getUsersAction()),
        getUser: (id) => dispatch(getUserByIdAction(id)),
        deleteUser: (id) => dispatch(deleteUserAction(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);