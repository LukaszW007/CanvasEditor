import React, { useEffect, useRef, useState } from "react";

// import Poster from "../assets/poster.svg";

interface IButtonProps {
	title: string;
	onClick: () => void;
}

function Button(props: IButtonProps) {
	const { title, onClick } = props;

	const button = (
		<button
			className="bg-primary-100 w-[172px] h-[40px] rounded-[5px] "
			onClick={onClick}
		>
			<span className={`text-white-100 text-button font-semibold`}>{title}</span>
		</button>
	);

	return button;
}

export default Button;
