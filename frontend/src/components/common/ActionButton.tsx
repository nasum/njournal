import styled from "styled-components";

const BaseButtonStyle = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  color: #000;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 25px;
  font-size: 50px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
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
			+
		</BaseButtonStyle>
	);
};
