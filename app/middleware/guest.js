export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token')

  // Nếu đã có token và đang ở trang login, đẩy về dashboard
  if (token.value && to.path === '/login') {
    return navigateTo('/')
  }
})