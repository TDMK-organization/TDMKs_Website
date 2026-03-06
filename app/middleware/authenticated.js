export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedIn, user } = useUserSession();

    if (!loggedIn.value) {
        return navigateTo("/auth");
    }
});
