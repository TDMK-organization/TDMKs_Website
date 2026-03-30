// server/api/posts/detail.get.ts

export default defineEventHandler(async (event) => {
    // Lưu ý: Chúng ta lấy từ 'secure' vì đó là nơi an toàn nhất đã thiết lập ở bước Login
    const session = await getUserSession(event);
    const accessToken = (session.secure as any)?.accessToken;

    if (!accessToken) {
        return createError({
            statusCode: 401,
            message: "Unauthorized: No access token found in session",
        });
    }

    const body = await readBody(event);
    const postId = getQuery(event);

    const response: any = await $fetch(
        `https://api.tdmk.vn/api/posts/${postId.id_post}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: body,
        },
    );

    return response.data;
});
