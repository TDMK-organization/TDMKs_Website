<template>
    <div
        class="bg-product min-h-screen mt-50"
        style="display: flex; flex-direction: column; align-items: center"
    >
        <Header text="Các dịch vụ và sản phẩm của chúng tôi" />
        <div
            class="text-lg sm:text-xl/8 text-muted text-balance mt-6 text-center"
        >
            Chúng tôi cung cấp các dịch vụ và sản phẩm chất lượng cao, đáp ứng
            nhu cầu đa dạng của khách hàng trong lĩnh vực công nghiệp và kỹ
            thuật.
        </div>
        <div
            style="
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                flex-direction: column;
            "
        >
            <div
                style="
                    display: flex;
                    margin-top: 50px;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                "
            >
                <UPageCard
                    spotlight
                    spotlight-color="primary"
                    class="flex w-80 m-5 h-125 cursor-pointer"
                    v-for="(item, index) in items"
                >
                    <UBlogPost
                        :title="item.title"
                        :description="item.description"
                        image="https://nuxt.com/assets/blog/nuxt-icon/cover.png"
                        :to="item.to"
                        target="_blank"
                        variant="naked"
                    />
                </UPageCard>
            </div>
            <UButton trailing-icon="i-lucide-arrow-right" size="md" class="m-14"
                >Xem thêm</UButton
            >
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [
                {
                    title: "TDMK AI VISION",
                    description:
                        "Giải pháp tích hợp Machine Learning vào sản xuất hỗ trợ cho con người. Kiểm tra lỗi bề mặt, đo lường kích thước, hướng dẫn robot...",
                },
                {
                    title: "TDMK SPC",
                    description:
                        "Hệ thống kiểm soát quy trình bằng thống kê, giúp số hóa dữ liệu chất lượng. Tự động tính toán năng lực sản xuất ($Cpk$, $Pp$), dự báo xu hướng lỗi và tối ưu hóa thông số vận hành nhằm giảm thiểu tỷ lệ phế phẩm.",
                },
                {
                    title: "TDMK IIoT",
                    description:
                        "Nền tảng kết nối vạn vật công nghiệp, thu thập dữ liệu thời gian thực từ mọi thiết bị hiện trường. Tối ưu hóa hiệu suất tổng thể (OEE), giám sát trạng thái máy tập trung và hỗ trợ bảo trì dự báo qua điện toán đám mây.",
                },
                {
                    title: "Thiết bị đo lường và camera công nghiệp",
                    description:
                        "Phân phối đa dạng thiết bị đo lường điện, kiểm tra cơ khí chính xác, phân tích vật liệu (NDT) và quan trắc môi trường. Sản phẩm chính hãng từ các thương hiệu hàng đầu thế giới, đáp ứng toàn diện nhu cầu kiểm định cho nhà máy và phòng thí nghiệm.",
                    to: "https://tdmk.vn/san-pham/",
                },
            ],
        };
    },
};
</script>
<style scoped>
.bg-product {
    animation: gradient 15s ease infinite;
}
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
