import { useState } from "react";
import { CallCreateImages, Image } from "../lib/images";
import { LogDebug } from "../../wailsjs/runtime/runtime";

export type ImageHookType = {
	images: Image[];
	loading: boolean;
	createImage: (fileName: string, paths: number[]) => Promise<void>;
};

export const useImages = (): ImageHookType => {
	const [images, setImages] = useState<Image[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const createImage = async (
		fileName: string,
		data: number[],
	): Promise<void> => {
		try {
			setLoading(true);
			console.log(data);
			await CallCreateImages(fileName, data);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	return {
		images,
		loading,
		createImage,
	};
};
