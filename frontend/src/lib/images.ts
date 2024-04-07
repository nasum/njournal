import { CreateImageFromLocal, GetImageList } from "../../wailsjs/go/main/App";
import { LogDebug } from "../../wailsjs/runtime";

export type Image = {
	ID: string;
	Data: string;
	UpdatedAt?: string;
	CreatedAt?: string;
};

export function CallCreateImages(
	fileName: string,
	data: number[],
): Promise<void> {
	return CreateImageFromLocal(fileName, data);
}

export async function CallGetImages(): Promise<Image[]> {
	LogDebug("CallGetImages");
	const imageList = await GetImageList();

	return imageList.map((image) => {
		return {
			ID: image.ID,
			Data: image.Data,
			UpdatedAt: image.UpdatedAt,
			CreatedAt: image.CreatedAt,
		};
	});
}
