export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    const accessToken = (session.secure as any)?.accessToken;

    if (!accessToken) {
        throw createError({
            statusCode: 401,
            message: "Unauthorized: Access token is missing",
        });
    }
    
    // Lấy tất cả các query parameters từ URL
    const postId = getRouterParam(event, 'id')
    const response = await $fetch(`https://api.tdmk.vn/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response;
});
