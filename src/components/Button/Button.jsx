import React from "react";
import { FiArrowDownCircle } from "react-icons/fi";
import { LoadMoreBtn } from "./Button.styled";

const LoadMoreButton = ({onLoadMore}) => {
    return (
        <LoadMoreBtn onClick={onLoadMore}>
            <span>
                Load More
                {/* <FiArrowDownCircle /> */}
            </span>
        </LoadMoreBtn>
    )
};

export default LoadMoreButton;

