import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import Move from "../../assets/move.svg?react";
import Delete from "../../assets/delete.svg?react";

interface TextAreaProps {
	id: string;
	onDelete: (id: string) => void;
	onTextChange: (id: string, text: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ id, onDelete, onTextChange }) => {
	const [text, setText] = useState("");
	const [textAreaPosition, setTextAreaPosition] = useState({ x: 100, y: 100 });
	const [textAreaSize, setTextAreaSize] = useState({ width: 350, height: 120 });
	const [isEditing, setIsEditing] = useState(true);

	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
		onTextChange(id, e.target.value);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
			setIsEditing(false);
		}
	};

	useEffect(() => {
		if (isEditing) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isEditing]);

	return (
		<Rnd
			style={{ backgroundColor: "transparent" }}
			disableDragging={!isEditing}
			dragHandleClassName={"handle"}
			enableResizing={isEditing}
			size={{ width: textAreaSize.width, height: textAreaSize.height }}
			position={{ x: textAreaPosition.x, y: textAreaPosition.y }}
			onDragStop={(e, data) => {
				setTextAreaPosition({ x: data.x, y: data.y });
			}}
			onResizeStop={(e, dir, refToElement, delta, position) => {
				setTextAreaSize({ width: textAreaSize.width + delta.width, height: textAreaSize.height + delta.height });
			}}
			bounds="parent"
		>
			<div
				ref={containerRef}
				className={`relative w-full h-full ${isEditing ? "bg-transparent border border-primary-100" : ""}`}
				onClick={() => setIsEditing(true)}
			>
				{isEditing && (
					<>
						<div className="handle absolute rounded-[50%] top-[-16px] left-[-16px] cursor-move p-1 bg-white-100 text-primary-100 z-10">
							<Move />
						</div>
						<button
							className={`absolute rounded-[150px] w-[24px] h-[24px] p-1 bg-white-100 text-red z-10`}
							style={{ left: `${textAreaSize.width - 12}px`, top: "-12px" }}
							onClick={(e) => {
								e.stopPropagation(); // Prevent triggering the toggleEditMode when delete is clicked
								onDelete(id);
							}}
						>
							<Delete />
						</button>
					</>
				)}
				<textarea
					ref={textAreaRef}
					className={
						text.length > 0
							? "w-full h-full p-2 text-center text-black-100 text-display font-bold leading-[36px] flex justify-center items-center bg-transparent"
							: "w-full h-full p-2 text-center text-black-100 opacity-25 text-display font-bold leading-[36px] flex justify-center items-center bg-transparent"
					}
					value={text}
					onChange={handleTextChange}
					placeholder="Type your text here"
					readOnly={!isEditing}
				/>
				{isEditing && (
					<div
						className="absolute flex justify-center rounded-[50%] w-[24px] h-[24px] bottom-0 right-0 cursor-resize p-1 bg-white-100 items-center"
						style={{ left: `${textAreaSize.width - 12}px`, top: `${textAreaSize.height - 12}px` }}
					>
						<div className="relative rounded-full w-[12px] h-[12px] cursor-resize bg-primary-100 text-align"></div>
					</div>
				)}
			</div>
		</Rnd>
	);
};

export default TextArea;
