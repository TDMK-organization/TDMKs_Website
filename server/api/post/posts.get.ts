export default defineEventHandler(async (event) => {
    const response = await $fetch("https://api.tdmk.vn/api/posts");
    return response;
})
