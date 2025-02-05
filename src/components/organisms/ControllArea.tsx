import React, { useEffect, useRef, useState } from "react";
import ActionButton from "../molecules/buttons/ActionButton";
import TextIcon from "../../assets/text.svg?react";
import ImageIcon from "../../assets/img.svg?react";
import BackgroundIcon from "../../assets/background.svg?react";
import TitleBar from "../atoms/TitleBar";
import Navbar from "../molecules/NavBar";
import Button from "../molecules/buttons/Button";
import { ACTION_BUTTON_TYPE } from "../../utils/enums";
import { v4 as uuidv4 } from "uuid";
import TextArea from "../molecules/TextArea";
import PictureArea from "../molecules/PictureArea";

interface IControllAreaProps {
	addCanvasElement: (element: React.ReactNode, id: string) => void;
	removeCanvasElement: (id: string) => void;
	setBackgroundUrl: (url: string) => void;
	exportToPNG: () => void;
}
function ControllArea({ addCanvasElement, removeCanvasElement, setBackgroundUrl, exportToPNG }: IControllAreaProps) {
	const [isBackgroundSetting, setIsBackgroundSetting] = useState(false);
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const onAddElement = (actionButtonType: ACTION_BUTTON_TYPE) => {
		switch (actionButtonType) {
			case ACTION_BUTTON_TYPE.BACKGROUND: {
				onAddBackground();
				break;
			}
			case ACTION_BUTTON_TYPE.TEXT: {
				onAddEditTextArea();
				break;
			}
			case ACTION_BUTTON_TYPE.IMAGE: {
				onAddImage();
				break;
			}
		}
	};

	// const handleBackgroundFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = e.target.files?.[0];
	// 	if (file) {
	// 		const reader = new FileReader();
	// 		reader.onloadend = () => {
	// 			setBackgroundUrl(reader.result as string);
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// };

	const onAddBackground = (): void => {
		setIsBackgroundSetting(true);
		fileInputRef.current?.click();
	};

	const onAddEditTextArea = (): void => {
		const id = uuidv4();
		addCanvasElement(
			<TextArea
				key={id}
				id={id}
				onDelete={() => removeCanvasElement(id)}
			/>,
			id
		);
	};

	const onAddImage = (): void => {
		setIsBackgroundSetting(false);
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (isBackgroundSetting) {
					setBackgroundUrl(reader.result as string);
				} else {
					const id = uuidv4();
					const pictureElement = (
						<PictureArea
							key={id}
							id={id}
							onDelete={() => removeCanvasElement(id)}
							imageSrc={reader.result as string}
						/>
					);
					addCanvasElement(pictureElement, id);
				}
				setIsBackgroundSetting(false);
			};
			reader.readAsDataURL(file);
		}
	};
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
					onAddElement={(actionButtonType: ACTION_BUTTON_TYPE) => onAddElement(actionButtonType)}
				/>
				<ActionButton
					Icon={ImageIcon}
					title="Image"
					type={ACTION_BUTTON_TYPE.IMAGE}
					onAddElement={(actionButtonType: ACTION_BUTTON_TYPE) => onAddElement(actionButtonType)}
				/>
				<ActionButton
					Icon={BackgroundIcon}
					title="Background"
					type={ACTION_BUTTON_TYPE.BACKGROUND}
					onAddElement={(actionButtonType: ACTION_BUTTON_TYPE) => onAddElement(actionButtonType)}
				/>
			</div>
			{/*Export Buttons */}
			<div className="w-[759px] flex items-center justify-end mt-8">
				<Button
					title="Export to PNG"
					onClick={exportToPNG}
				/>
			</div>

			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
				accept="image/*"
			/>
		</div>
	);
}

export default ControllArea;
