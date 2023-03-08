import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { CloseButton } from "./layout/CloseButton";

const unfoldIn = keyframes`
0% {
  transform:scaleY(.005) scaleX(0);
}
50% {
  transform:scaleY(.005) scaleX(1);
}
100% {
  transform:scaleY(1) scaleX(1);
}
`;

const unfoldOut = keyframes`
0% {
  transform:scaleY(1) scaleX(1);
}
50% {
  transform:scaleY(.005) scaleX(1);
}
100% {
  transform:scaleY(.005) scaleX(0);
}
`;

const zoomIn = keyframes`
    0% {
        transform:scale(0);
    }
    100% {
        transform:scale(1);
    }
  
  `;

const zoomOut = keyframes`
  0% {
    transform:scale(1);
  }
  100% {
    transform:scale(0);
  }
  
  `;

const StyledModal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  transform: scale(0);
  z-index: 100;
  transform: scaleY(0.01) scaleX(0);
  animation: ${unfoldIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  .modal-background {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    vertical-align: middle;
    .modal {
      background-color: ${({ theme }) => theme.colors.modalBg};
      border-radius: 1rem;
      max-width: 80%;
      max-height: 80vh;
      font-weight: 300;
      transform: scale(0);
      animation: ${zoomIn} 0.5s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      position: relative;
      > div {
        align-items: flex-start;
        justify-content: flex-start;
        overflow: auto;
        padding: 50px;
        display: flex;
        flex-direction: column;
        max-width: 100%;
        height: 100%;
        > div {
          width: 100%;
        }
        &::-webkit-scrollbar {
          width: 0.5rem;
        }

        /* Track */
        &::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 0.25rem;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
      }

      h2 {
        font-size: 25px;
        line-height: 25px;
        margin-bottom: 15px;
      }
      p {
        font-size: 18px;
        line-height: 22px;
      }

      .modal-svg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 3px;
        rect {
          stroke: #fff;
          stroke-width: 2px;
          stroke-dasharray: 778;
          stroke-dashoffset: 778;
        }
      }
      @media screen and (max-width: 420px) {
        width: 90%;
        max-width: 90%;
        > div {
          padding: 2rem;
        }
      }
    }
  }
  &.out {
    transform: scale(1);
    animation: ${unfoldOut} 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    .modal-background {
      .modal {
        animation: ${zoomOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
    }
  }
`;

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
  }, [visible]);
  return (
    <StyledModal className={visible ? "" : "out"}>
      <div className="modal-background">
        <div className="modal">
          {children}
          {/* <h2>I'm a Modal</h2>
          <p>Hear me roar.</p> */}
          <CloseButton onClick={onClose}>&#x2715;</CloseButton>
          {/* <svg
            className="modal-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            <rect
              x="0"
              y="0"
              fill="none"
              width="226"
              height="162"
              rx="3"
              ry="3"
            ></rect>
          </svg> */}
        </div>
      </div>
    </StyledModal>
  );
};
