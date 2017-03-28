let LOCALKEY = [];
let SESSIONKEY = [];

let _webStorage = {
    remove: function(key) {
        if (LOCALKEY.indexOf(key) == -1) {
            sessionStorage.removeItem(key);

            for(let i=0; i<SESSIONKEY.length; i++){
              if(SESSIONKEY[i] == key){
                SESSIONKEY.spcice(i,1);
              }
            }

            console.log('删除成功')
        } else if (SESSIONKEY.indexOf(key) == -1) {
            localStorage.removeItem(key);

            for(let i=0; i<LOCALKEY.length; i++){
              if(LOCALKEY[i] == key){
                LOCALKEY.spcice(i,1);
              }
            }
            console.log('删除成功')
        } else {
            alert(
                'localStorage和sessionStorage都储存了该字段，' +
                '请检查代码并确定要删除localStorage或sessionStorage中的该字段，' +
                '点击确定查看console.log储存情况');

            console.log({
                localStorage: {
                    key: localStorage.getItem(key)
                }
            });
            console.log({
                sessionStorage: {
                    key: sessionStorage.getItem(key)
                }
            });
        }
    },
    clear: function(type) {
        if (!type) {
            localStorage.clear();
            sessionStorage.clear();
            LOCALKEY = [];
            SESSIONKEY = [];
        }
        if (type == 'local') {
            localStorage.clear();
            LOCALKEY = [];
        } else if (type == 'session') {
            sessionStorage.clear();
            SESSIONKEY = [];
        }
    },
    sess: {},
    local: {}
    // length:function(type){}
};

let _session = {
    set: function(key, value) {

        if (SESSIONKEY.indexOf(key) == -1) {
            SESSIONKEY.push(key);
            console.log('sessionStorage存储成功↓');
            console.log({
                key: value
            });
        } else {
            console.log('sessionStorage已重新覆盖该字段');
        }

        value = JSON.stringify(value);
        sessionStorage.setItem(key, value);

        if (_webStorage.key) {
            console.log('该字段已存在于localStorage，调用时请加上sess前缀');
            _webStorage.sess.key = value;
            _webStorage.local.key = _webStorage.key;
            _webStorage.key = null;
        } else {
            _webStorage.key = value;
        }

    },
    get: function(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }
}

let _local = {
    set: function(key, value) {
        if (LOCALKEY.indexOf(key) == -1) {
            LOCALKEY.push(key);
            console.log('localStorage存储成功↓');
            console.log({
                key: value
            });
        } else {
            console.log('localStorage已重新覆盖该字段')
        }

        value = JSON.stringify(value);
        localStorage.setItem(key, value);

        if (_webStorage.key) {
            console.log('该字段已存在于sessionStorage，调用时请加上local前缀');
            _webStorage.local.key = value;
            _webStorage.sess.key = _webStorage.key;
            _webStorage.key = null;
        } else {
            _webStorage.key = value;

        }

    },
    get: function(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export const sess = _session;
export const local = _local;
export const webStorage = _webStorage;
