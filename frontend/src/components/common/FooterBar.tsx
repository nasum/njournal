import styled from "styled-components";

const FooterBarWrapper = styled.div`
  width: 100%;
  height: 25px;
  border-top: 1px solid #000;
`;

export const FooterBar = () => {
	return (
		<FooterBarWrapper>
			<p>-</p>
		</FooterBarWrapper>
	);
};
