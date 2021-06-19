import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Box } from "@chakra-ui/react"

import Container from "./../components/Container"
import SignUpStep1 from "./../components/SignUpSteps/SignUpStep1";
import SignUpStep2 from "./../components/SignUpSteps/SignUpStep2";
import SignUpStep3 from "./../components/SignUpSteps/SignUpStep3";
import SignUpRevisionStep from "./../components/SignUpSteps/SignUpRevisionStep";
import SignUpFinalStep from "./../components/SignUpSteps/SignUpFinalStep"
import CardHeader from '../components/CardHeader';
import StepsBar from '../components/StepsBar';
import StepBox from "../components/SignUpSteps/StepBox"

import MemberContext from '../context/MemberContext';

import api from "./../utils/api";

import { STEP_STATUS, API_STATUS } from '../utils/constants';

const STEPS = [
    {stepIndex: 0, description: "Dados", status: STEP_STATUS.DOING },
    {stepIndex: 1, description: "Ministério", status: STEP_STATUS.HOLD },
    {stepIndex: 2, description: "Habilidades", status: STEP_STATUS.HOLD },
    {stepIndex: 3, description: "Revisão", status: STEP_STATUS.HOLD },
    {stepIndex: 4, description: "Finalizado", status: STEP_STATUS.HOLD }
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
    const [dataSteps, setDataSteps] = useState([]);
    const [apiStatus, setApiStatus] = useState(API_STATUS.NONE)

    const [memberData, setMemberData] = useState({});

    useEffect(() => {
    }, [currentStep]);

    const updateSteps = (newStepIndex, memberData = {}) => {
        const newSteps = steps.map(step => {
            const status = step.stepIndex < newStepIndex ? STEP_STATUS.DONE : step.stepIndex === newStepIndex ? STEP_STATUS.DOING : STEP_STATUS.HOLD;
            return {...step, status};
        });
        setSteps(newSteps);
        setCurrentStep(newStepIndex);
        if (memberData)
            updateMemberData(memberData);
    }

    const updateMemberData = memberData => {
        console.log({ memberData })
        setMemberData(oldData => ({...oldData, ...memberData}));
    }

    const submitMemberData = async memberData => {
        console.log({toSubmit: memberData});
        const response = await api.post("/api/member", {member: memberData});
        if(response) {
            updateSteps(STEPS_INDEX.FIVE);
            console.log(response);
        }
    }

    return (
        <MemberContext.Provider>
                <Container>
                    <Box padding="30px">
                        <CardHeader />
                        <Box marginTop="30px"/>
                        <StepsBar steps={steps} />
                        <Box marginTop="30px"/>
                        <StepBox
                            onClickNext={(memberData) => updateSteps(STEPS_INDEX.TWO, memberData)}
                            show={ currentStep===STEPS_INDEX.ONE }
                            component={SignUpStep1} />

                        <StepBox
                            onClickNext={(memberData) => updateSteps(STEPS_INDEX.THREE, memberData)}
                            onClickBack={() => updateSteps(STEPS_INDEX.ONE)}
                            show={ currentStep===STEPS_INDEX.TWO }
                            component={SignUpStep2} />

                        <StepBox 
                            onClickNext={(memberData) => updateSteps(STEPS_INDEX.FOUR, memberData)}
                            onClickBack={() => updateSteps(currentStep-1)}
                            show={ currentStep===STEPS_INDEX.THREE }
                            component={SignUpStep3} />
                        <StepBox
                            onClickNext={() => submitMemberData(memberData)}
                            onClickBack={() => updateSteps(currentStep-1)}
                            show={ currentStep===STEPS_INDEX.FOUR }
                            component={SignUpRevisionStep} 
                            nextTitle="Enviar"
                            memberData={{...memberData}}
                        />
                        {
                            currentStep===STEPS_INDEX.FIVE && <SignUpFinalStep status={apiStatus} /> 
                        }

                    </Box>
                </Container>
        </MemberContext.Provider>
    )
}

SignUp.propTypes = {

}

export default SignUp
