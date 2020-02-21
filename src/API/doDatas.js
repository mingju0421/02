
function parseJSON(response) {
    return response.json()
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
export default {
    doGetDatas(url, cb, errorCb) {
        fetch(url, {
                credentials: 'same-origin',
                method: 'GET'
            }).then(checkStatus)
            .then(parseJSON)
            .then(function(data) {
                cb(data)
            }).catch(function(error) {
                errorCb(error)
            })
    }
}