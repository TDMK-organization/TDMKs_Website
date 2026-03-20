export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedIn, user } = useUserSession();
    console.log(loggedIn.value);
    if (!loggedIn.value) {
        return navigateTo("/auth");
    }
});
