(function(ch) {
    ch(window)
})(function(win) {
    
    /**
     * 格式化日期
     * @version 0.0.1
     * @param { Date Object } date 日期对象 new Date() || new Date('2016-09-02') || new Date(1512347715000)【时间戳必须是毫秒】....
     * @param { String } fmt 返回格式 'yyyy-MM-dd hh:mm:ss' || 'yyyy.MM.dd' || ...
     * @returns { String } 返回的日期 "2017-12-04 08:35:15" || "2017-12-04" || ...
     * @example
     * dateFormat(new Date(), 'yyyy-MM-dd')
     * => "2017-12-07"
     * dateFormat(new Date('2016-09-02'), 'yyyy.MM.dd hh:mm:ss')
     * => "2016.09.02 08:00:00"
     * dateFormat(new Date(1512347715000), 'yyyy-MM-dd hh:mm:ss')
     * => "2017-12-04 08:35:15"
     */
    function padLeftZero(str) {
        return ('00' + str).substr(str.length)
    }
    var _dateFormat =  function(timeG, fmt) {
        var time = typeof timeG == 'string' ? timeG.replace(/-/g, '/') : timeG
        var fmt = fmt ? fmt : 'yyyy-MM-dd'
        var _date = new Date(time);
        
        var z = {
            M: _date.getMonth() + 1,
            d: _date.getDate(),
            h: _date.getHours(),
            m: _date.getMinutes(),
            s: _date.getSeconds()
        }
        fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2);
        });
        return fmt.replace(/(y+)/g, function(v) {
            return _date.getFullYear().toString().slice(-v.length);
        });
    }
      
    var _getSearch = function() {
        var _l = location.search || location.hash
        var _qIndex = _l.indexOf('?')
        var qs = _l.length > 0 ? _l.substring(_qIndex + 1) : ''
        var args = {}
        var items = qs.length ? qs.split('&') : []
        for (var i = 0; i < items.length; i++) {
            var v = items[i]            
            var _i = v.indexOf('=')
            var key = decodeURIComponent(v.substring(0, _i))
            var value = decodeURIComponent(v.substring(_i + 1))
            if (key.length) {
                args[key] = value
            }
        }
        return args
    }
    var _toast = function(data) {
        if ($('.PB-toast-outbox').length > 0) {
            $('.PB-toast-outbox').remove()
        }
        var _str = ''
        _str += '<div class="PB-toast-outbox">'
        _str +=     '<div class="PB-toast-content">' + data + '</div>'
        _str += '</div>'
        $('body').append(_str)
        setTimeout(function() {
            $('.PB-toast-outbox').remove()
        }, 2000)
    }
    var _request = function(obj, callback) {
        // window.Tools.showLoading()
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
                // window.Tools.hideLoading()
            },
            success: function(msg) {
                // window.Tools.hideLoading()
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
                    // window.Tools.toast(responseMsg || '请求失败')
                }
            },
            error: function() {
                // 请求前的处理
                callback({
                    status: 'failed',
                    data: ''
                })
                // window.Tools.hideLoading()
                // window.Tools.toast(responseMsg || '请求失败')
            },
        })
    }
    // var _apiBase = 'http://120.92.216.96:8080/'
    var _apiBase = ''
    var _constant = {
        apiOfficeDetail: _apiBase + 'inquireMeetingServiceCondition',
        listOffices: _apiBase + 'listOffices',
        handleLockOffices: _apiBase + 'handleLockOffices'
    }
    win.Tools = {
        constant: _constant,
        request: _request,
        toast: _toast,
        getSearch: _getSearch,
        dateFormat: _dateFormat
    }
})