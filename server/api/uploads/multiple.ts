import { readMultipartFormData, createError } from "h3";

export default defineEventHandler(async (event) => {
    // 1. Lấy Token từ Cookie gửi kèm trong request
    // Giả sử cookie của bạn tên là 'auth_token'
    const session = await getUserSession(event);
    const accessToken = (session.secure as any)?.accessToken;

    if (!accessToken) {
        return createError({
            statusCode: 401,
            message: "Unauthorized: No access token found in session",
        });
    }
    if (!accessToken) {
        throw createError({
            statusCode: 401,
            statusMessage: "Không tìm thấy token xác thực.",
        });
    }

    // 2. Đọc Form-data (files) từ Frontend gửi lên
    const formDataBody = await readMultipartFormData(event);
    if (!formDataBody) {
        throw createError({
            statusCode: 400,
            statusMessage: "Dữ liệu form trống.",
        });
    }

    // 3. Tạo FormData mới để forward sang API TDMK
    const forwardFormData = new FormData();

    for (const file of formDataBody) {
        if (file.name === "files" && file.filename) {
            // Chuyển đổi buffer thành Blob để FormData của Node.js hiểu được
            const blob = new Blob([file.data], { type: file.type });
            forwardFormData.append("files", blob, file.filename);
        }
    }

    try {
        // 4. Gọi API đích với Token và FormData
        const response = await $fetch(
            "https://api.tdmk.vn/api/uploads/multiple",
            {
                method: "POST",
                body: forwardFormData,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        return response; // Trả về y nguyên kết quả cho Frontend
    } catch (error: any) {
        throw createError({
            statusCode: error.response?.status || 500,
            statusMessage: error.message || "Lỗi khi upload sang TDMK",
        });
    }
});
