import styled from "styled-components";

const StyledHomePage = styled.div`
	background-color: #e6e0f6;
	border-radius: 12px;
	box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.25);
	padding: 15px 20px;
	margin-top: 20px;
    margin-bottom: 20px;
    width: 80%;

	h2 {
		font-size: 24px;
		font-weight: 800;
	}

    h3 {
        font-size: 20px;
        font-weight: 700;
    }

	p {
		font-size: 20px;
		font-weight: 400;
		color: #2d235b;
	}

    button {
        background: #452CC9;
        color: #fff;
        border-radius: 12px;
        padding: 10px 20px;
        cursor: pointer;

        img {
            display: inline-block;
            width: 25px;
        }

        &:hover {
            opacity: .7;
        }
    }

	footer {
		a {
			font-size: 24px;
			color: #452cc9;
		}
	}

	@media (max-width: 426px) {
        padding: 10px 10px;
        width: 100%;
		h2 {
			font-size: 18px;
		}

		p, h3 {
			font-size: 14px;
		}
	}
`;

export default StyledHomePage;
