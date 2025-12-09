export type Device = {
	id: string;
	name: string;
	data: Record<string, unknown> | null;
};

const mockModule = async (): Promise<Device[]> => {
	// fetch https://api.restful-api.dev/objects
	const response = await UrlFetchApp.fetch(
		"https://api.restful-api.dev/objects",
		{
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const data = JSON.parse(response.getContentText());
	return data;
};

export default mockModule;
