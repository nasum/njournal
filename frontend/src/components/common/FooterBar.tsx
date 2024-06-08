import { useAtom } from "jotai";
import styled from "styled-components";

import { FooterTools } from "../../atoms/footerTools";

const FooterBarWrapper = styled.div`
  width: 100%;
  height: 25px;
  border-top: 1px solid;
	display: flex;
	justify-content: right;
	flex-direction: row-reverse;
`;

const ButtonWrapper = styled.div`
	padding: 0 5px;
	border-left: 1px solid;
`;

export const FooterBar = () => {
	const [tools] = useAtom(FooterTools);
	return (
		<FooterBarWrapper>
			{tools?.map((tool) => (
				<ButtonWrapper key={String(tool)}>{tool}</ButtonWrapper>
			))}
		</FooterBarWrapper>
	);
};
