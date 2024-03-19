import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiBook, FiHome } from "react-icons/fi";

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
	display: "flex",
	padding: "5px",
	cursor: "pointer",
};

export const SideBar = () => {
	return (
		<SideBarContent id="AppSidebar">
			<SideBarHeader>njournal</SideBarHeader>
			<ul>
				<li>
					<Link tabIndex={0} style={linkStyle} to="/">
						<FiHome />Home
					</Link>
				</li>
				<li>
					<Link tabIndex={0} style={linkStyle} to="/notes">
						<FiBook />Notes
					</Link>
				</li>
			</ul>
		</SideBarContent>
	);
};
