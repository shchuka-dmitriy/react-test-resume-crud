import React from 'react';
import {connect} from 'react-redux';
import styles from './SummariesList.module.sass';
import {getUsersAction} from "../../actions/actionCreator";
import ListItem from "../ListItem/ListItem";
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import history from "../../browserHistory";
import classNames from 'classnames';
import {confirmAlert} from 'react-confirm-alert';

class SummariesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 8,
            offset: 0
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
        this.props.getUsersArr(Object.assign({}, {
            limit: this.state.limit,
            offset: this.state.offset
        }));
    };

    prevButtonHandler = () => {
        if (this.state.offset > 0) {
            this.setState({
                offset: --this.state.offset
            });
            this.getData();
        }
    };

    nextButtonHandler = () => {
        if (this.props.users.length >= 8) {
            this.setState({
                offset: ++this.state.offset
            });
            this.getData();
        }
    };

    /**
     *
     * @description Redirect to the User info page
     * @param {Number} user_id
     */
    goToExtended = (user_id) => {

        localStorage.getItem("accessToken")
            ? history.push('/user/' + user_id)
            : confirmAlert({
                message: `First you need to log in, please`,
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => {
                            history.push('/registration')
                        }
                    }]
            });
    };

    /**
     * @description Create list of html elements (users)
     * @return {html[]}
     */
    setProductsList = () => {
        const { users } = this.props;
        return [...users.values()].map(user =>
            <ListItem id={user.id} key={user.id + 1} data={user} goToExtended={this.goToExtended}/>)
    };

    render() {
        const { error, isFetching, haveMore } = this.props;

        return (
            <>
                <div className={styles.mainInfoContainer}>
                    {error ? <div className={styles.tryContainer}><TryAgain getData={this.getData}/></div> :
                        (
                            <div className={styles.usersContainerWrapper}>
                                    {
                                        isFetching
                                        ?   <div className={styles.containerSpinner}>
                                                <Spinner/>
                                            </div>
                                        :
                                            <div className={styles.usersContainer}>
                                                {this.setProductsList()}
                                            </div>
                                    }
                                    <div className={styles.paginationContainer}>
                                        <button className={ classNames(styles.paginationButton,
                                            this.state.offset === 0 && styles.notActive) }
                                                onClick={this.prevButtonHandler}>prev</button>
                                        <button className={classNames(styles.paginationButton, !haveMore && styles.notActive)}
                                                onClick={this.nextButtonHandler}>next</button>
                                    </div>

                            </div>
                        )
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return state.usersStore;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsersArr: (data) => dispatch(getUsersAction(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SummariesList);