export interface Category {
    id: string;
    name: string;
}
// server/api/category/list.get.ts
export default defineEventHandler(async (event) => {
    try {
        const response: any = await $fetch(
            "https://api.tdmk.vn/api/categories",
            {
                method: "GET",
            },
        );

        // 3. Map lại dữ liệu để khớp với Interface Category (chuyển _id -> id)
        const categories: Category[] = response.data.map((item) => ({
            id: item._id, // API trả về _id nên phải gán vào id
            name: item.name,
        }));

        return {
            success: true,
            categories: categories,
        };
    } catch (error: any) {
        throw createError({
            statusCode: error.response?.status || 500,
            statusMessage: "Không thể lấy danh sách danh mục",
            data: error.data,
        });
    }
});
