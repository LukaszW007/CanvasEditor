import React, { useEffect, useRef, useState } from "react";

// import Poster from "../assets/poster.svg";

interface IButtonProps {
	Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	title: string;
	onClick: () => void;
}

function ResetButton(props: IButtonProps) {
	const { title, Icon, onClick } = props;

	const button = (
		<button
			className={`w-[90px] h-[32px] border-bottom-weight-1 border-red text-red  flex items-center justify-center border-b`}
			onClick={onClick}
		>
			<span className={`text-red text-body font-medium`}>{title}</span>
			<Icon className={`w-[32px] h-[32px] text-red `} />
		</button>
	);

	return button;
}

export default ResetButton;
