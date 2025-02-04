import React, { useEffect, useRef, useState } from "react";
import ActionButton from "../molecules/buttons/ActionButton";
import TextIcon from "../../assets/text.svg?react";
import ImageIcon from "../../assets/img.svg?react";
import BackgroundIcon from "../../assets/background.svg?react";
import TitleBar from "../atoms/TitleBar";
import Navbar from "../molecules/NavBar";
import Button from "../molecules/buttons/Button";
import { ACTION_BUTTON_TYPE } from "../../utils/enums";

function ControllArea() {
	return (
		<div className="w-[759px] h-[948px] bg-white flex flex-col items-center justify-center">
			<Navbar />
			<TitleBar />
			<div className="h-[609px] bg-primary grid grid-cols-2 gap-x-[29px] items-center justify-start gap-y-8 gap-x-[29px] content-start mb-8">
				{/* Action Buttons */}
				<ActionButton
					Icon={TextIcon}
					title="Text"
					type={ACTION_BUTTON_TYPE.TEXT}
				/>
				<ActionButton
					Icon={ImageIcon}
					title="Image"
					type={ACTION_BUTTON_TYPE.IMAGE}
				/>
				<ActionButton
					Icon={BackgroundIcon}
					title="Background"
					type={ACTION_BUTTON_TYPE.BACKGROUND}
				/>
			</div>
			{/*Export Buttons */}
			<div className="w-[759px] flex items-center justify-end mt-8">
				<Button title="Export to PNG" />
			</div>
		</div>
	);
}
import { ACTION_BUTTON_TYPE } from "../../utils/enums";

export default ControllArea;
