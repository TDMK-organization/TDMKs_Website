// server/api/posts/detail.get.ts

export default defineEventHandler(async (event) => {
    // Lấy tất cả các query parameters từ URL
    const query = getQuery(event);

    // Truy cập vào id_post
    const postId = query.id_post;

    try {
        const response: any = await $fetch(
            `https://api.tdmk.vn/api/posts/${postId}`,
        );

        return response.data;
    } catch (error: any) {
        throw createError({
            statusCode: error.response?.status || 500,
            message:
                error.data?.message ||
                "Lỗi kết nối API TDMK hoặc dữ liệu không hợp lệ",
        });
    }
});
