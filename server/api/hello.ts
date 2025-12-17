
export default defineEventHandler((event) => {
    const process = useRuntimeConfig();
    console.log("process", process.env.SECRET);
    return { message: "Hello World!" };
});
