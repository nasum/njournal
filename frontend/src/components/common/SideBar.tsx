import { FiBook, FiHome, FiImage, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBarContent = styled.div`
  padding: 10px;
  border-right: 1px solid;
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
			<ul>
				<li>
					<Link tabIndex={0} style={linkStyle} to="/">
						<FiHome size="30" />
					</Link>
				</li>
				<li>
					<Link tabIndex={0} style={linkStyle} to="/notes">
						<FiBook size="30" />
					</Link>
				</li>
				<li>
					<Link tabIndex={0} style={linkStyle} to="/images">
						<FiImage size="30" />
					</Link>
				</li>
				<li>
					<Link tabIndex={0} style={linkStyle} to="/settings">
						<FiSettings size="30" />
					</Link>
				</li>
			</ul>
		</SideBarContent>
	);
};
