export type User = {
	id: number;
	username: string;
	role: string;
};

export type ServerActionResponse = {
	success: boolean;
	message: string;
}