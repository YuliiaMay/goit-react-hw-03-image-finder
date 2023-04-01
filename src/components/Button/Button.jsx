import React from "react";
import { FiArrowDownCircle } from "react-icons/fi";
import { LoadMoreBtn } from "./Button.styled";

const LoadMoreButton = () => {
    return (
        <LoadMoreBtn>
            <span>
                Load More
                {/* <FiArrowDownCircle /> */}
            </span>
        </LoadMoreBtn>
    )
};

export default LoadMoreButton;

