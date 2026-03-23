export default defineNuxtRouteMiddleware(async (event) => {
    // 1. Kiểm tra và xóa session cũ nếu tồn tại
    const { session, clear } = useUserSession();

    if (session.user) {
         return navigateTo("/user");
    }
});
