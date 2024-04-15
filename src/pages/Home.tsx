import React from "react";

const Home = (props: {firstname:string}) => {
    return (
        <div>
            {props.firstname ? 'Hi ' + props.firstname : 'Register or Login to your account'}
        </div>
    );
};

export default Home;