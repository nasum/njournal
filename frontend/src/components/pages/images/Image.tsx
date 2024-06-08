import {
	type DragEvent,
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { type ImageHookType, useImages } from "../../../hooks/useImages";

const ImageContext = createContext<ImageHookType | null>(null);

export const Images = () => {
	const image = useImages();

	if (!image) {
		return null;
	}

	useEffect(() => {
		image.getImages();
	}, [image.getImages]);

	return (
		<ImageContext.Provider value={image}>
			<Outlet />
		</ImageContext.Provider>
	);
};

type Props = {
	onDropFile: (files: FileList) => void;
	children: ReactNode;
};

const DropImageZone = ({ onDropFile, children }: Props) => {
	const [isDragActive, setIsDragActive] = useState(false);

	const onDragStart = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragActive(true);
	};

	const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragActive(false);
	};

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragActive(false);
		if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
			onDropFile(e.dataTransfer.files);
			e.dataTransfer.clearData();
		}
	};

	return (
		<div
			onDragOver={onDragStart}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			style={{
				height: "100%",
				backgroundColor: isDragActive ? "black" : "inherit",
				opacity: isDragActive ? 0.5 : 1,
			}}
			className={"drop-target"}
		>
			{children}
		</div>
	);
};

const ImageListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: space-between;
`;

const ImageWrapper = styled.div`
	flex-direction: column;
`;

const ImageDialog = styled.dialog`
	border: none;
	margin: auto;
`;

const DialogImage = styled.img`
	display: block;
	margin: 0 auto;
`;

export const ImageList = () => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const image = useContext(ImageContext);

	const [selectedImageData, setSelectedImageData] = useState<string>("");

	const onDropFile = (files: FileList) => {
		for (let i = 0; i < files.length; i++) {
			const file = files.item(i);

			if (!file) {
				continue;
			}

			if (file.type.substring(0, 5) === "image") {
				const reader = new FileReader();
				reader.onload = (e) => {
					const data = e.target?.result as ArrayBuffer;
					image?.createImage(file.name, Array.from(new Uint8Array(data)));
				};

				reader.readAsArrayBuffer(file);
			}
		}
	};

	const openImageDialog = (imageData: string) => {
		setSelectedImageData(imageData);
		dialogRef.current?.showModal();
		dialogRef.current?.focus();
	};

	const clickDialog = () => {
		dialogRef.current?.close();
	};

	return (
		<DropImageZone onDropFile={onDropFile}>
			<ImageListContainer>
				{image?.images.map((image, index) => {
					return (
						<ImageWrapper key={image.ID} tabIndex={0}>
							<img
								key={image.ID}
								src={image.Data}
								style={{ height: "200px", cursor: "pointer" }}
								onClick={() => openImageDialog(image.Data)}
								onKeyDown={(e) => {
									if (e.key !== "Enter") {
										return;
									}
									openImageDialog(image.Data);
								}}
								aria-label={`image-${index}`}
							/>
						</ImageWrapper>
					);
				})}
			</ImageListContainer>
			<ImageDialog
				ref={dialogRef}
				onClick={clickDialog}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						clickDialog();
					}
				}}
			>
				<DialogImage src={selectedImageData} />
			</ImageDialog>
		</DropImageZone>
	);
};
