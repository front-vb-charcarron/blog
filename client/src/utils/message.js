import { Message } from 'element-ui';
import { isMobile } from '@/utils/isMobile';

export function message(type, msg) {
    return Message({
        type: type,
        message: msg,
        duration: 2 * 1000,
        customClass: isMobile() ? 'my-message' : '' // 根据不同的平台显示不同的 message 组件样式
    });
}