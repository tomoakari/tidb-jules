import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Group } from '$lib/types';

export const load: PageServerLoad = async () => {
  try {
    const result = await db.execute('SELECT id, name FROM `group` ORDER BY id');
    // Ensure rows is not undefined and is an array
    const groups = (result.rows || []) as Group[];
    return {
      groups,
    };
  } catch (error) {
    console.error('Failed to load groups:', error);
    return {
      groups: [],
      error: 'グループ情報の読み込みに失敗しました。',
    };
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const groupId = formData.get('group_id') as string;

    if (!name || name.trim().length === 0) {
      return fail(400, { name, groupId, error: 'ユーザー名は必須です。' });
    }
    if (!groupId) {
      return fail(400, { name, groupId, error: 'グループを選択してください。' });
    }

    try {
      await db.execute('INSERT INTO user (name, group_id) VALUES (?, ?)', [
        name.trim(),
        parseInt(groupId, 10),
      ]);
    } catch (error) {
      console.error('Failed to register user:', error);
      return fail(500, { name, groupId, error: 'ユーザー登録に失敗しました。データベースエラーが発生した可能性があります。' });
    }

    throw redirect(303, '/');
  },
};
