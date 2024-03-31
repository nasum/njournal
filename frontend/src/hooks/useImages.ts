import { useState } from "react";
import { CallCreateImages, CallGetImages, Image } from "../lib/images";

export type ImageHookType = {
	images: Image[];
	loading: boolean;
	createImage: (fileName: string, paths: number[]) => Promise<void>;
	getImages: () => Promise<void>;
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
			await CallCreateImages(fileName, data);
			await getImages();
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	const getImages = async (): Promise<void> => {
		try {
			const images = await CallGetImages();
			setImages(images);
		} catch (e) {
			console.error(e);
		}
	};

	return {
		images,
		loading,
		createImage,
		getImages,
	};
};
