import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBarHeader = styled.div`
  padding: 5px;
`;

const SideBarContent = styled.div`
  padding: 10px;
  border-right: 1px solid #000;
  width: 150px;
  height: 100%;
`;

const linkStyle = {
	display: "block",
	padding: "5px",
	cursor: "pointer",
};

export const SideBar = () => {
	return (
		<SideBarContent id="AppSidebar">
			<SideBarHeader>njournal</SideBarHeader>
			<ul>
				<li>
					<Link style={linkStyle} to="/">
						Home
					</Link>
				</li>
				<li>
					<Link style={linkStyle} to="/notes">
						Notes
					</Link>
				</li>
			</ul>
		</SideBarContent>
	);
};
