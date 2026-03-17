export default defineNuxtRouteMiddleware(async (event) => {
    const { loggedIn, user } = useUserSession();

    if (!loggedIn.value) {
        return navigateTo("/auth");
    }
    try {
        const payload = {
            title: "TDMK vừa ra mắt trang web & diễn đàn tdmk.com",
            content:
                "Đây là trang web giúp tdmk tiếp cận được nhiều khách hàng hơn",
            description:
                "Đây là trang web giúp tdmk tiếp cận được nhiều khách hàng hơn",
            category: "69afd19cb09007343f9a6ef5",
        };
        const data = await $fetch("/api/post/init", {
            method: "POST",
            body: payload,
        });
        console.log("Phản hồi từ API khởi tạo bài viết:", data.data._id);
        if (data.data._id) {
            return navigateTo(`/user/posts/detail?id_post=${data.data._id}`);
        }
    } catch (error) {   
        console.error("Lỗi khởi tạo bài viết:", error);
        // Nếu lỗi (ví dụ 401), đẩy về trang danh sách hoặc trang login
        return navigateTo("/user/posts?category=forum");
    }
});
