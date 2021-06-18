import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Container from "./../components/Container"
import SignUpStep1 from "./../components/SignUpSteps/SignUpStep1";
import SignUpStep2 from "./../components/SignUpSteps/SignUpStep2";
import SignUpStep3 from "./../components/SignUpSteps/SignUpStep3";
import CardHeader from '../components/CardHeader';
import StepsBar from '../components/StepsBar';

import MemberContext from '../context/MemberContext';

import { STEP_STATUS } from '../utils/constants';

const STEPS = [
    {stepIndex: 0, description: "Dados", status: STEP_STATUS.DOING },
    {stepIndex: 1, description: "Ministério", status: STEP_STATUS.HOLD },
    {stepIndex: 2, description: "Habilidades", status: STEP_STATUS.HOLD },
    {stepIndex: 3, description: "Habilidades", status: STEP_STATUS.HOLD },
    {stepIndex: 4, description: "Final", status: STEP_STATUS.HOLD }
];

const STEPS_INDEX = {
    ONE: 0,
    TWO: 1,
    THREE: 2,
    FOUR: 3,
    FIVE: 4 
};

const SignUp = props => {
    const [steps, setSteps] = useState(STEPS);
    const [currentStep, setCurrentStep] = useState(0);

    const [memberData, setMemberData] = useState({});

    useEffect(() => {
        console.log(currentStep);
    }, [currentStep]);

    const updateSteps = (newStepIndex, memberData = {}) => {
        console.log({newStepIndex});
        const newSteps = steps.map(step => {
            const status = step.stepIndex < newStepIndex ? STEP_STATUS.DONE : step.stepIndex === newStepIndex ? STEP_STATUS.DOING : STEP_STATUS.HOLD;
            return {...step, status};
        });
        setSteps(newSteps);
        setCurrentStep(newStepIndex);
        if (memberData)
            updaterMemberData(memberData);
    }

    const updaterMemberData = memberData => {
        setMemberData(oldData => ({...oldData, memberData}));
    }

    return (
        <MemberContext.Provider>
            <Container>
                <CardHeader />
                <StepsBar steps={steps} />
                {currentStep === 0 && <SignUpStep1 onClickNext={(memberData) => updateSteps(STEPS_INDEX.TWO, memberData)}/>}
                {currentStep === 1 && <SignUpStep2 onClickNext={(memberData) => updateSteps(STEPS_INDEX.THREE, memberData)} onClickBack={() => updateSteps(STEPS_INDEX.ONE)}/>}
                {currentStep === 2 && <SignUpStep3 onClickNext={(memberData) => updateSteps(STEPS_INDEX.FOUR, memberData)} onClickBack={() => updateSteps(currentStep-1)}/>}
            </Container>
        </MemberContext.Provider>
    )
}

SignUp.propTypes = {

}

export default SignUp
