const { body } = document;
const XS = 768;
export const isMobile = () => body.getBoundingClientRect().width <= XS;