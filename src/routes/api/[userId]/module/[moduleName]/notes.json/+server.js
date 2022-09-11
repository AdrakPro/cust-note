import { getDataFromModel } from '$lib/prisma.js';
import { json } from '@sveltejs/kit';
import { MODULE } from '$lib/utils/constants.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const { moduleName } = params;
	const data = await getDataFromModel(MODULE, { name: moduleName }, { notes: true });

	if (data === null) {
		return json([]);
	}

	const { notes } = data;
	const headers = { 'cache-control': 'max-age=0, s-maxage=1800' };

	return json(notes, { headers, status: 200 });
}
