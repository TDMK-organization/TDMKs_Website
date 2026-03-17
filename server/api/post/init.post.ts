// server/api/posts/init.post.ts
export default defineEventHandler(async (event) => {
    // 1. Lấy session và truy xuất accessToken
    // Lưu ý: Chúng ta lấy từ 'secure' vì đó là nơi an toàn nhất đã thiết lập ở bước Login
    const session = await getUserSession(event);
    const accessToken = (session.secure as any)?.accessToken;

    // 2. Lấy dữ liệu (body) gửi từ phía Client (Vue/Middleware)
    const body = await readBody(event);

    try {
        // 3. Gọi API thực tế tới TDMK
        const response = await $fetch("https://api.tdmk.vn/api/posts", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: body,
        });

        // Trả về kết quả cho Middleware (thường chứa { id: ... })
        return response;
    } catch (error: any) {
        // Log lỗi chi tiết ra Terminal của VPS/Docker để bạn dễ debug
        console.error("Lỗi từ API TDMK:", error.data || error.message);

        throw createError({
            statusCode: error.response?.status || 500,
            message:
                error.data?.message ||
                "Lỗi kết nối API TDMK hoặc dữ liệu không hợp lệ",
        });
    }
});
