module.exports = {
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0, transform: "translateY(-6px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                fadeOut: {
                    "0%": { opacity: 1, transform: "translateY(0)" },
                    "100%": { opacity: 0, transform: "translateY(-6px)" },
                },
            },
            animation: {
                "fade-in": "fadeIn 0.2s ease-out forwards",
                "fade-out": "fadeOut 0.3s ease-in forwards",
            },
        },
    },
};
