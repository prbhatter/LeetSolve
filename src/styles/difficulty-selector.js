import styled, { css } from "styled-components";

export const DifficultySelect = styled.select`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #ff00e0;
    color: #ff0000;
    font-family: "Cool Font";
    padding: 0.25em 1em;
    margin: 10px 10px 10px 10px;
    max-width: 165px;
    ${(props) =>
        props &&
        props.active &&
        css`
            color: #ff0000;
        `}
`;
