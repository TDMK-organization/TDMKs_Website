// server/api/auth/login.post.ts
interface LoginResponse {
    user: { [key: string]: any };
    data: { token: string };
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        // 1. Gọi đến API Server
        const response = await $fetch<LoginResponse>(
            "https://api.tdmk.vn/api/auth/login",
            {
                method: "POST",
                body: body,
            },
        );
        // 2. setup session
        await setUserSession(event, {
            user: {
                // Bạn có thể lưu fullname hoặc bất cứ thông tin gì API trả về
                name: response.user?.fullname || "Thành viên TDMK",
            },
            secure: {
                accessToken: response.data.token,
            },
        });

        return { success: true };
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: "Thôngs tin đăng nhập không chính xác",
        });
    }
});
