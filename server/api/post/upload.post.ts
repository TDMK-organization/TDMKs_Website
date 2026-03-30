// server/api/upload.post.ts
export default defineEventHandler(async (event) => {
    // 1. Đọc dữ liệu form-data do Frontend gửi lên
    const body = await readMultipartFormData(event);

    if (!body || body.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "Không tìm thấy file tải lên",
        });
    }

    // 2. Tìm trường có tên là 'files'
    const fileData = body.find((item) => item.name === "files");

    if (!fileData || !fileData.data) {
        throw createError({
            statusCode: 400,
            statusMessage: "Dữ liệu file không hợp lệ",
        });
    }

    // 3. Lấy token xác thực từ Cookie (NHỚ THAY 'token' BẰNG TÊN COOKIE BẠN ĐANG DÙNG)
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

    // 4. Tái cấu trúc lại file thành định dạng FormData của Node.js để gửi đi
    const formData = new FormData();
    const blob = new Blob([fileData.data], { type: fileData.type });
    formData.append("files", blob, fileData.filename);

    try {
        // 5. Gọi API upload thật (NHỚ THAY DOMAIN BACKEND CỦA BẠN VÀO ĐÂY)
        const response: any = await $fetch(
            "https://api.tdmk.vn/api/uploads/multiple",
            {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: accessToken ? `Bearer ${accessToken}` : "",
                },
            },
        );

        // 6. Xử lý chính xác dựa trên response JSON bạn cung cấp
        let uploadedUrl = "";

        // Kiểm tra xem response có thành công và có mảng data hay không
        if (
            response?.success &&
            Array.isArray(response.data) &&
            response.data.length > 0
        ) {
            // Lấy URL của file đầu tiên trong mảng
            uploadedUrl = response.data[0].url;
        }

        // Nếu backend báo lỗi hoặc không có URL trả về
        if (!uploadedUrl) {
            console.error("Backend response lạ:", response);
            throw createError({
                statusCode: 500,
                statusMessage: "Không trích xuất được link ảnh từ server.",
            });
        }

        // 7. Trả về cho Frontend Nuxt
        return {
            success: true,
            url: uploadedUrl,
        };
    } catch (error: any) {
        console.error("Lỗi khi gọi API Backend:", error);

        // Bắt lỗi từ $fetch nếu API backend trả về 4xx, 5xx
        const statusCode = error.response?.status || 500;
        const statusMessage =
            error.response?._data?.message ||
            "Lỗi hệ thống khi upload file lên server chính.";

        throw createError({
            statusCode,
            statusMessage,
        });
    }
});
