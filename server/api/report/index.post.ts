export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    const accessToken = (session.secure as any)?.accessToken;
    console.log(accessToken);
    // Đọc dữ liệu gửi lên từ frontend
    const body = await readBody(event);

    try {
        const response = await $fetch("https://api.tdmk.vn/api/reports", {
            method: "POST",
            body: body,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error: any) {
        console.error("Lỗi POST reports:", error);
        throw createError({
            statusCode: error.response?.status || 500,
            statusMessage: error.message || "Lỗi hệ thống",
        });
    }
});
