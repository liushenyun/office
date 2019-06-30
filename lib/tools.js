(function(ch) {
    ch(window)
})(function(win) {
    var _request = function(obj, callback) {
        window.Tools.showLoading()
        var _url = obj.url || '',
            _data = obj.data || {},
            _type = obj.type || 'POST',
            _timeout = obj.timeout || 30 * 3000;
        $.ajax({
            url: _url,
            dataType: 'json',
            async: true, // true: 同步， false: 异步
            data: _data,
            type: _type,
            timeout: _timeout,
            xhrFields: { withCredentials: true },
            beforeSend: function(d) {
                // 请求前的处理
            },
            complete: function() {
                // 请求完成的处理
                window.Tools.hideLoading()
            },
            success: function(msg) {
                window.Tools.hideLoading()
                // 请求前的处理
                var responseCode = msg.responseCode
                var responseMsg = msg.responseMsg
                if (responseCode == '000000') {
                    callback({
                        status: 'success',
                        data: msg.data
                    })
                } else {
                    callback({
                        status: 'failed',
                        data: ''
                    })
                    window.Tools.toast(responseMsg || '请求失败')
                }
            },
            error: function() {
                // 请求前的处理
                callback({
                    status: 'failed',
                    data: ''
                })
                window.Tools.hideLoading()
                window.Tools.toast(responseMsg || '请求失败')
            },
        })
    }
    win.Tools = {
        request: _request
    }
})