import PubSub from 'pubsub-js'

export default {
    /**
     * 发布
     */
    publish:(eventName, body) => {
        PubSub.publish(eventName, body)
    },
    /**
     * 订阅
     */
    subscribe: (eventName, cb) => {
        if(!cb) {
            throw new Error(eventName + "事件的回调为空");
        }
        return PubSub.subscribe(eventName,(e, body)=>{
            if(cb) {
                cb(body);
            }
        });
    },
    /**
     * 取消订阅
     */
    unsubscribe: (subscribeId) => {
        PubSub.unsubscribe(subscribeId)
    },
    /**
     * 事件总览
     */
    $events: {
        CARD_READER: 'CARD_READER',
        CAPTURE_TAKE: 'CAPTURE_TAKE',
        WEIGHT_BRIDGE: 'WEIGHT_BRIDGE'
    }
}
