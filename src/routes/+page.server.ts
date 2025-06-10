import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import type { UserWithGroup } from '$lib/types';

export const load: PageServerLoad = async () => {
  try {
    const result = await db.execute(
      'SELECT u.id, u.name, u.group_id, g.name AS group_name FROM user u JOIN `group` g ON u.group_id = g.id ORDER BY u.id'
    );

    // Ensure rows is not undefined and is an array
    const users = (result.rows || []) as UserWithGroup[];

    return {
      users,
    };
  } catch (error) {
    console.error('Failed to load users:', error);
    // Return an empty array or a specific error object for the page to handle
    return {
      users: [],
      error: 'ユーザー情報の読み込みに失敗しました。',
    };
  }
};
