export default defineEventHandler(async (event) => {
  try {
    // 1. Gọi API lấy danh sách TẤT CẢ bài viết
    // Khai báo limit thật lớn (ví dụ 1000) để lấy toàn bộ bài viết trong 1 lần gọi
    const response = await $fetch('https://api.tdmk.vn/api/posts?limit=1000&page=1', {
      method: 'GET',
      query: { 
        limit: 1000, 
        page: 1 
      }
    });

    // 2. Bóc tách mảng dữ liệu dựa theo đúng cấu trúc JSON của bạn
    const posts = response?.data?.data || [];

    // 3. Map dữ liệu thành định dạng Sitemap yêu cầu
    return posts.map((post: any) => {
      // Ưu tiên dùng slug, nếu bài viết cũ chưa có slug thì dùng _id
      const urlPath = post.slug ? post.slug : post._id;

      return {
        loc: `/post/${urlPath}`, 
        lastmod: post.updatedDate || post.createdDate || new Date().toISOString(),
        changefreq: 'weekly', // Tần suất bot nên quay lại quét (weekly = hàng tuần)
        priority: 0.8 // Độ ưu tiên của trang chi tiết bài viết (0.0 đến 1.0)
      };
    });

  } catch (error) {
    console.error('Lỗi khi tạo sitemap động:', error);
    // Trả về mảng rỗng nếu lỗi để không làm sập sitemap các trang tĩnh
    return []; 
  }
});