import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ status }) => {
    var stepPercentage = 0;
    if (status === "intransit") {
        stepPercentage = 34;
    } else if (status === "outfordelivery") {
        stepPercentage = 82.5;
    } else if (status === "delivered") {
        stepPercentage = 100;
    } else {
        stepPercentage = 1;
    }


    return (
        <ProgressBar
            percent={stepPercentage}
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        width="30"
                        src='assets/cardboardBox.png'
                    />
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        width="30"
                        src='assets/cardboardBox.png'
                    />
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        width="30"
                        src='assets/cardboardBox.png'
                    />
                )}
            </Step>

            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        width="30"
                        src='assets/cardboardBox.png'
                    />
                )}
            </Step>
        </ProgressBar>
    );
}

export default MultiStepProgressBar