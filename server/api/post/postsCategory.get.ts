export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const id_category = query.id_category;
    const response = await $fetch(
        `https://api.tdmk.vn/api/posts/category/${id_category}`,
        {
            onResponse({ response }) {
                const data = response._data.data;
                return data;
            },
        },
    );
    return response;
});
