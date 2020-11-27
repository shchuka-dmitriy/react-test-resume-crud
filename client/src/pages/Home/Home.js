import React from 'react';
import SummariesList from "../../components/SummariesList/SummariesList";
import styles from "./Home.module.sass"
import Header from "../../components/Header/Header";

const Home = () => {

    return (
        <div className={styles.mainContainer}>
            <Header/>
            <SummariesList/>
        </div>
    )
};

export default Home;