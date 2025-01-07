export type User = {
	username: string;
	role: string;
	createdAt: Date;
	_count: {
		threads: number;
		comments: number;
	};
};
  
export type ServerActionResponse = {
	success: boolean;
	message: string;
}

export type Categories = {
	name: string;
	description: string;
}