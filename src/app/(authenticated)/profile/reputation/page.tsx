import { getReputationHistory } from '@/app/actions/profile/getReputationHistory';
import ReputationComponent from './reputationComponent';
import { getAuth } from '@/auth/cookie';

export default async function reputationProfilePage() {
	const { user } = await getAuth();
	const reputationData = await getReputationHistory(user!.username);

	return (
		<div className='space-y-6'>
			<ReputationComponent reputationHistory={reputationData}/>
		</div>
	);
}