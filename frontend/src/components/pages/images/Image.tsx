import {
	useState,
	DragEvent,
	ReactNode,
	createContext,
	useContext,
} from "react";
import { useImages, ImageHookType } from "../../../hooks/useImages";
import { Outlet } from "react-router-dom";

const ImageContext = createContext<ImageHookType | null>(null);

export const Images = () => {
	const image = useImages();

	if (!image) {
		return null;
	}

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
				backgroundColor: isDragActive ? "black" : "white",
				opacity: isDragActive ? 0.5 : 1,
			}}
			className={"drop-target"}
		>
			{children}
		</div>
	);
};

export const ImageList = () => {
	const image = useContext(ImageContext);
	const [imageList, setImageList] = useState<string[]>([]);

	const onDropFile = (files: FileList) => {
		for (let i = 0; i < files.length; i++) {
			const file = files.item(i);

			if (!file) {
				continue;
			}

			if (file.type.substring(0, 5) !== "image") {
				alert("画像ファイルでないものはアップロードできません！");
			} else {
				const reader = new FileReader();
				reader.onload = (e) => {
					const data = e.target?.result as ArrayBuffer;
					console.log(data);
					image?.createImage(file.name, Array.from(new Uint8Array(data)));
				};

				reader.readAsArrayBuffer(file);
			}
		}
	};

	return (
		<DropImageZone onDropFile={onDropFile}>
			<ul>
				{imageList.map((image, index) => {
					return (
						<li>
							<img key={index} src={image} alt={`image-${index}`} />
						</li>
					);
				})}
			</ul>
		</DropImageZone>
	);
};
