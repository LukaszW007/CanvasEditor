import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import Move from "../../assets/move.svg?react";
import Delete from "../../assets/delete.svg?react";

interface PictureAreaProps {
	id: string;
	onDelete: (id: string) => void;
	imageSrc: string;
}

const PictureArea: React.FC<PictureAreaProps> = ({ id, onDelete, imageSrc }) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [pictureAreaPosition, setPictureAreaPosition] = useState({ x: 100, y: 100 });
	const [pictureAreaSize, setPictureAreaSize] = useState({ width: 350, height: 350 });
	const [isEditing, setIsEditing] = useState(true);

	const containerRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
			setIsEditing(false);
		}
	};

	useEffect(() => {
		setImageUrl(imageSrc);
		const img = new Image();
		img.onload = () => {
			const ratio = img.height / img.width;
			setPictureAreaSize({ width: 350, height: 350 * ratio });
		};
		img.src = imageSrc;
	}, [imageSrc]);

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

	const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const img = e.target as HTMLImageElement;
		const aspectRatio = img.naturalHeight / img.naturalWidth;
		const newHeight = 350 * aspectRatio;
		setPictureAreaSize({ width: 350, height: newHeight });
	};

	return (
		<Rnd
			style={{ backgroundColor: "transparent" }}
			disableDragging={!isEditing}
			dragHandleClassName={"handle"}
			enableResizing={isEditing}
			size={{ width: pictureAreaSize.width, height: pictureAreaSize.height }}
			position={{ x: pictureAreaPosition.x, y: pictureAreaPosition.y }}
			onDragStop={(e, data) => {
				setPictureAreaPosition({ x: data.x, y: data.y });
			}}
			onResizeStop={(e, dir, refToElement, delta, position) => {
				setPictureAreaSize({ width: pictureAreaSize.width + delta.width, height: pictureAreaSize.height });
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
							style={{ left: `${pictureAreaSize.width - 12}px`, top: "-12px" }}
							onClick={(e) => {
								e.stopPropagation(); // Prevent triggering the toggleEditMode when delete is clicked
								onDelete(id);
							}}
						>
							<Delete />
						</button>
						<div
							className="absolute flex justify-center rounded-[50%] w-[24px] h-[24px] bottom-0 right-0 cursor-resize p-1 bg-white-100 items-center"
							style={{ left: `${pictureAreaSize.width - 12}px`, top: `${pictureAreaSize.height - 12}px` }}
						>
							<div className="relative rounded-full w-[12px] h-[12px] cursor-resize bg-primary-100 text-align"></div>
						</div>
					</>
				)}
				{imageUrl && (
					<img
						src={imageUrl}
						alt="User selected"
						className="w-full h-full object-cover"
						onLoad={handleImageLoad}
					/>
				)}
			</div>
		</Rnd>
	);
};

export default PictureArea;
