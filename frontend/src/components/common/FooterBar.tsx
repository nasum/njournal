import styled from "styled-components";

const FooterBarWrapper = styled.div`
  width: 100%;
  height: 25px;
  background-color: #f5f5f5;
  border-top: 1px solid #000;
`;

export const FooterBar = () => {
	return (
		<FooterBarWrapper>
			<p>Footer</p>
		</FooterBarWrapper>
	);
};
