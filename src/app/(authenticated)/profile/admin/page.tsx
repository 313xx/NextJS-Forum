import React from 'react';
import AdminCategoryForm from './components/adminCategoryForm';
import { getCategories } from '@/app/action/categories/getCategories';
import { createCategory } from '@/app/action/admin/category/createCategory';
import { updateCategory } from '@/app/action/admin/category/updateCategory';

const AdminProfilePage: React.FC = async () => {
	const categories = await getCategories();

	return (
		<div>
			<AdminCategoryForm existingCategories={categories} onCategorySubmit={createCategory} onCategoryUpdate={updateCategory}/>
		</div>
	);
};

export default AdminProfilePage;