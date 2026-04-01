export default defineEventHandler(async (event) => {
  // Lấy ID từ URL (VD: /api/reports/123 -> id = 123)
  const id = getRouterParam(event, 'id')
  
  // Đọc dữ liệu gửi lên cần cập nhật
  const body = await readBody(event)

  try {
    const response = await $fetch(`https://api.tdmk.vn/api/reports/${id}`, {
      method: 'PUT',
      body: body
    })
    
    return response
  } catch (error: any) {
    console.error(`Lỗi PUT reports ID ${id}:`, error)
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message || 'Lỗi hệ thống'
    })
  }
})