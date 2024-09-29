import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

const BaseButtonStyle = styled.div`
  position: fixed;
  bottom: 35px;
  right: 10px;
  width: 50px;
  height: 50px;
  border: 1px solid;
  border-radius: 25px;
  font-size: 50px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
	background-color: #fff;

	@media (prefers-color-scheme: dark) {
		background-color: #000;
	}
`;

type ActionButtonProps = {
	createNote: (e: React.MouseEvent | React.KeyboardEvent) => void;
};

export const ActionButton = ({ createNote }: ActionButtonProps) => {
	return (
		<BaseButtonStyle
			tabIndex={0}
			role="button"
			onClick={createNote}
			onKeyDown={(e) => {
				if (e.key === "Enter") createNote(e);
			}}
		>
			<FiPlus />
		</BaseButtonStyle>
	);
};
