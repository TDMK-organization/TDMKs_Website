<template>
    <div
        class="relative min-h-screen text-slate-200 font-sans overflow-hidden pb-20"
    >
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-600/20 blur-[150px] pointer-events-none z-0 rounded-full"
        ></div>
        <div
            class="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] pointer-events-none z-0 rounded-full"
        ></div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div class="text-center max-w-4xl mx-auto mb-20 reveal">
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm mb-6 animate-pulse"
                >
                    <UIcon name="i-heroicons-cpu-chip" class="w-5 h-5" />
                    <span>Smart Factory Ecosystem</span>
                </div>
                <h1
                    class="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 via-primary-500 to-primary-700 drop-shadow-lg"
                >
                    Chuyển Đổi Số Toàn Diện <br />
                    Cho Nhà Máy 4.0
                </h1>
                <p class="text-lg md:text-xl text-muted leading-relaxed">
                    Hệ sinh thái công nghệ từ phần cứng đến phần mềm, kết nối
                    vạn vật, tự động hóa quy trình và ra quyết định dựa trên dữ
                    liệu thời gian thực.
                </p>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
                <UPageCard
                    spotlight
                    spotlight-color="primary"
                    class="lg:col-span-2 reveal group relative overflow-hidden bg-slate-900/40 border-slate-800 hover:border-emerald-500/50 transition-all duration-700"
                >
                    <div class="flex flex-col md:flex-row h-full">
                        <div class="p-8 md:w-1/2 flex flex-col justify-center">
                            <UIcon
                                name="i-heroicons-eye"
                                class="w-12 h-12 text-emerald-400 mb-4 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                            />
                            <h3 class="text-3xl font-bold text-primary-400">
                                AI Vision
                            </h3>
                            <p class="text-muted mb-3 mb-6">
                                Thị giác máy tính tích hợp Deep Learning. Kiểm
                                tra khuyết tật ngoại quan, đọc mã vạch và đo
                                lường kích thước chính xác.
                            </p>
                            <UButton
                                color="gray"
                                variant="ghost"
                                class="w-fit text-emerald-400 hover:bg-emerald-500/10"
                                >Khám phá &rarr;</UButton
                            >
                        </div>
                        <div
                            class="md:w-1/2 relative min-h-[250px] overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                                class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                            />
                        </div>
                    </div>
                </UPageCard>

                <UPageCard
                    spotlight
                    spotlight-color="primary"
                    class="lg:row-span-2 reveal group relative overflow-hidden bg-slate-900/40 border-slate-800 hover:border-rose-500/50 transition-all duration-700"
                >
                    <div class="p-8 h-full flex flex-col relative z-10">
                        <div class="flex items-center justify-between mb-8">
                            <UIcon
                                name="i-heroicons-bolt"
                                class="w-10 h-10 text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]"
                            />
                            <div
                                class="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"
                            >
                                <span
                                    class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                                ></span>
                                ONLINE
                            </div>
                        </div>
                        <h3 class="text-2xl font-bold text-primary mb-2">
                            Live Metrics
                        </h3>
                        <p class="text-muted text-sm mb-10 font-light">
                            Giám sát luồng dữ liệu & hiệu suất phần cứng thực
                            tế.
                        </p>

                        <div class="mt-auto space-y-8">
                            <div v-for="(metric, i) in metrics" :key="i">
                                <div
                                    class="flex justify-between text-[10px] font-mono mb-2 text-muted uppercase tracking-widest"
                                >
                                    <span>{{ metric.label }}</span>
                                    <span :class="metric.colorClass">{{
                                        metric.value
                                    }}</span>
                                </div>
                                <div
                                    class="w-full h-1.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden"
                                >
                                    <div
                                        class="h-full transition-all duration-1000 ease-out"
                                        :class="metric.bgClass"
                                        :style="{ width: metric.width }"
                                    ></div>
                                </div>
                            </div>
                            <div
                                class="flex items-end justify-between gap-1 h-16 bg-slate-950/50 p-2 rounded-lg border border-slate-800"
                            >
                                <div
                                    v-for="h in [
                                        30, 50, 40, 70, 90, 45, 65, 80,
                                    ]"
                                    :key="h"
                                    class="w-full bg-cyan-500/50 rounded-t-sm transition-all duration-500 hover:bg-cyan-400"
                                    :style="{ height: h + '%' }"
                                ></div>
                            </div>
                        </div>
                    </div>
                </UPageCard>

                <UPageCard
                    spotlight
                    spotlight-color="primary"
                    class="reveal bg-slate-900/40 border-slate-800 hover:border-cyan-500/50 transition-all duration-700"
                >
                    <div class="p-8 h-full flex flex-col">
                        <UIcon
                            name="i-heroicons-wifi"
                            class="w-12 h-12 text-cyan-400 mb-4"
                        />
                        <h3 class="text-2xl font-bold text-primary mb-3">
                            Industrial IoT
                        </h3>
                        <p class="text-muted">
                            Kết nối vạn vật trong xưởng sản xuất, theo dõi OEE
                            thời gian thực.
                        </p>
                    </div>
                </UPageCard>

                <UPageCard
                    spotlight
                    spotlight-color="primary"
                    class="reveal bg-slate-900/40 border-slate-800 hover:border-blue-500/50 transition-all duration-700"
                >
                    <div class="p-8 h-full flex flex-col">
                        <UIcon
                            name="i-heroicons-server-stack"
                            class="w-12 h-12 text-blue-400 mb-4"
                        />
                        <h3 class="text-2xl font-bold text-primary mb-3">
                            Big Data
                        </h3>
                        <p class="text-muted">
                            Hồ sơ hóa hàng triệu bản ghi, phân tích xu hướng sản
                            xuất.
                        </p>
                    </div>
                </UPageCard>

                <UPageCard
                    spotlight
                    spotlight-color="primary"
                    class="lg:col-span-2 reveal group relative overflow-hidden bg-slate-900/40 border-slate-800 hover:border-purple-500/50 transition-all duration-700"
                >
                    <div class="flex flex-col md:flex-row-reverse h-full">
                        <div class="p-8 md:w-1/2 flex flex-col justify-center">
                            <UIcon
                                name="i-heroicons-presentation-chart-line"
                                class="w-12 h-12 text-purple-400 mb-4"
                            />
                            <h3 class="text-3xl font-bold text-primary mb-3">
                                Hệ thống SPC
                            </h3>
                            <p class="text-muted mb-6">
                                Tính toán năng lực sản xuất (Cp, Cpk), cảnh báo
                                lệch chuẩn tức thời.
                            </p>
                            <UButton
                                color="gray"
                                variant="ghost"
                                class="w-fit text-purple-400 hover:bg-purple-500/10"
                                >Dashboard &rarr;</UButton
                            >
                        </div>
                        <div
                            class="md:w-1/2 relative min-h-[250px] overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                                class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                            />
                        </div>
                    </div>
                </UPageCard>

                <UPageCard
                    spotlight
                    spotlight-color="primary"
                    class="reveal bg-slate-900/40 border-slate-800 hover:border-orange-500/50 transition-all duration-700"
                >
                    <div class="p-8 h-full flex flex-col">
                        <UIcon
                            name="i-heroicons-cog-8-tooth"
                            class="w-12 h-12 text-orange-400 mb-4 animate-spin-slow"
                        />
                        <h3 class="text-2xl font-bold text-primary mb-3">
                            Robotics
                        </h3>
                        <p class="text-muted">
                            Tự động hóa khâu gắp nhả (Pick & Place) và vận
                            chuyển nội bộ.
                        </p>
                    </div>
                </UPageCard>
            </div>

            <div
                class="mt-24 reveal p-10 rounded-3xl border   backdrop-blur-md text-center"
            >
                <h3 class="text-2xl font-bold mb-4 text-primary">
                    Sẵn sàng tối ưu hóa nhà máy?
                </h3>
                <UButton
                    size="xl"
                    class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-12 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                >
                    Liên hệ tư vấn ngay
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const metrics = ref([
    {
        label: "OEE Tổng thể",
        value: "94.2%",
        width: "94.2%",
        colorClass: "text-emerald-400",
        bgClass: "bg-emerald-500 shadow-[0_0_10px_#10b981]",
    },
    {
        label: "GPU Load (Vision)",
        value: "82%",
        width: "82%",
        colorClass: "text-rose-400",
        bgClass:
            "bg-gradient-to-r from-orange-500 to-rose-500 shadow-[0_0_10px_#f43f5e]",
    },
    {
        label: "Storage Used",
        value: "65%",
        width: "65%",
        colorClass: "text-blue-400",
        bgClass: "bg-blue-500 shadow-[0_0_10px_#3b82f6]",
    },
]);

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Thêm một chút delay staggered dựa trên thứ tự xuất hiện
                    setTimeout(() => {
                        entry.target.classList.add("reveal-active");
                    }, index * 50);
                }
            });
        },
        { threshold: 0.15 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
</script>

<style scoped>
/* TRẠNG THÁI CHƯA XUẤT HIỆN */
.reveal {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
    filter: blur(10px);
    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* TRẠNG THÁI ĐÃ XUẤT HIỆN */
.reveal-active {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
}

.animate-spin-slow {
    animation: spin 8s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
