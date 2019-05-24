// 把params参数缓存起来
export default  {
    save(args){
        sessionStorage.setItem('argments', JSON.stringify(args));
    },
    set(routeParams) {
        let data =  JSON.parse(sessionStorage.getItem('argments'));
           if (typeof data === 'object') {
                for (let k in data) {
                    routeParams[k] = data[k];
                }
           }
    },
    deal(toRoute, fromRoute) {
        sessionStorage.setItem('from', fromRoute.name);
        if (!sessionStorage.getItem('now')) {
            sessionStorage.setItem('now', toRoute.name);
        } 
        if (sessionStorage.getItem('now') !== toRoute.name) {
            if(fromRoute.name
                && fromRoute.name !== 'login' 
                && toRoute.name !== 'login') {
                this.save(toRoute.params)
            };
            sessionStorage.setItem('now', toRoute.name);
        };
      
    }
};