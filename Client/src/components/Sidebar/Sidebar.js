import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, IconButton } from "@mui/material";
import SidebarChat from "./SidebarChat";
import { AccountContext } from "../../context/AccountContext";
import { getusers } from "../../services/api";
function Sidebar() {
	const account = useContext(AccountContext);
	const { loginDetails } = account;
	const [users, setusers] = useState([]);
	const [search, setsearch] = useState("");
	useEffect(() => {
		const fetchuser = async () => {
			const getuser = await getusers();
			const filterdata = getuser.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
			setusers(filterdata);
		};
		fetchuser();
	}, [search]);
	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<Avatar src={`${loginDetails?.picture}`} />
				<div className="sidebar-header-right">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar-search">
				<div className="sidebar-search-container">
					<SearchOutlinedIcon />
					<input
						type="text "
						placeholder="Search or Start a new chat"
						onChange={(e) => setsearch(e.target.value)}
					/>
				</div>
			</div>

			<div className="sidebar-chats">
				{   // eslint-disable-next-line
					users?.map((e, i) => {
					if (e.sub !== loginDetails.sub) {
						return <SidebarChat userdetails={e} key={i} />;
					}
				})}
			</div>
		</div>
	);
}

export default Sidebar;
