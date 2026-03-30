// server/api/post/posts.ts
export default defineEventHandler(async (event) => {
    // Lấy query từ Frontend gửi lên (ví dụ: ?page=1&limit=5&q=tdmk)
    const query = getQuery(event);

    try {
        const response = await $fetch("https://api.tdmk.vn/api/posts", {
            method: "GET",
            query: query // Chuyển tiếp toàn bộ query xuống backend
        });
        
        return response;
    } catch (error) {
        console.error("Lỗi khi fetch danh sách bài viết:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Không thể lấy danh sách bài viết"
        });
    }
})