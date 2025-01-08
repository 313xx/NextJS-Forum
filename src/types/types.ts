export type User = {
	username: string;
	role: string;
	createdAt: Date;
	_count: {
		threads: number;
		comments: number;
	};
	userInfo: {
		bio: string | null,
		reputation: number,
		reputationPower: number
	} | null;
};
  
export type ServerActionResponse = {
	success: boolean;
	message: string;
}

export type Categories = {
	name: string;
	description: string;
}