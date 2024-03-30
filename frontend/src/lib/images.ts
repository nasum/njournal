import { CreateImageFromLocal } from "../../wailsjs/go/main/App";
import { LogDebug } from "../../wailsjs/runtime";

export type Image = {
	ID: string;
	path: string;
	UpdatedAt?: string;
	CreatedAt?: string;
};

export function CallCreateImages(
	fileName: string,
	data: number[],
): Promise<void> {
	return CreateImageFromLocal(fileName, data);
}
