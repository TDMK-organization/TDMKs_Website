export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    const accessToken = (session.secure as any)?.accessToken;
    // Lấy các query string từ frontend (nếu có)
    const query = getQuery(event);
    try {
        const response = await $fetch("https://api.tdmk.vn/api/reports", {
            method: "GET",
            query: query,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            // headers: { 'Authorization': 'Bearer ...' } // Mở comment nếu API yêu cầu token
        });

        return response;
    } catch (error: any) {
        console.error("Lỗi GET reports:", error);
        throw createError({
            statusCode: error.response?.status || 500,
            statusMessage: error.message || "Lỗi hệ thống",
        });
    }
});
