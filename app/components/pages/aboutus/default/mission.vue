<template>
    <Header class="m-20" text="Triết lý phát triển" />
    <div class="flex">
        <UPageCard
            :class="`w-full m-5 cursor-pointer`"
            v-for="(item, index) in items"
            :description="item.description"
            icon="i-simple-icons-tailwindcss"
            spotlight
            spotlight-color="primary"
        >
            <template #title>
                <div class="bg-blue">
                    {{ item.title }}
                </div>
            </template>
        </UPageCard>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [
                {
                    title: "Tầm nhìn",
                    description:
                        "Đi đầu trong việc cung cấp các sản phẩm và dịch vụ kỹ thuật cho lĩnh vực công nghiệp với tư cách là đối tác kỹ thuật tốt nhất.",
                    icon: "material-symbols:mission",
                },
                {
                    title: "Sứ mệnh",
                    description:
                        "Cung cấp hàng hóa và dịch vụ chất lượng cao cho khách hàng; Xây dựng mạng lưới tốt với các đối tác có uy tín; Tạo môi trường làm việc chuyên nghiệp; Tích cực thực hiện các hoạt động CSR.",
                    icon: "material-symbols:mission",
                },
                {
                    title: "Giá trị cốt lõi",
                    description:
                        "Con người là quan trọng nhất và không ngừng cải tiến; Khách hàng là hành động ưu tiên hàng đầu của chúng tôi; Cung cấp lợi thế và dịch vụ độc đáo thông qua hàng hóa và dịch vụ kỹ thuật.",
                    icon: "material-symbols:mission",
                },
            ],
        };
    },
};
</script>
<style lang=""></style>
