import React, { useEffect, useRef, useState } from "react";
import { ACTION_BUTTON_TYPE } from "../../../utils/enums";

interface IButtonProps {
	Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	title: string;
	type: ACTION_BUTTON_TYPE;
}

function ActionButton(props: IButtonProps) {
	const { Icon } = props;
	const [title, setTitle] = useState(props.title);

	const addEditTextArea = () => {
		//
	};

	const button = (
		<button
			className="bg-white-97 hover:bg-black-25 focus:outline-primary-50 focus:outline-4 focus:outline-inside disabled:oppacity-25 w-[365px] h-[256px] rounded-[10px] flex flex-col items-center justify-center"
			onClick={() => addEditTextArea()}
		>
			<Icon className="w-[128px] h-[128px] text-black-75" />
			<p className="text-button text-black-100 font-medium">{title}</p>
		</button>
	);

	return button;
}

export default ActionButton;

//SVG - fill values inside svg file suppose to have fill="currentColor" to manipulate its color
