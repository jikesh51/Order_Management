module.exports = {
    success: function (data, status, message, extra = null) {
        return {
          data: data,
          extra: extra,
          meta: {
            status: status,
            message: message
          }
        };
    },
    
      error: function (status, message, data = {},) {
        return {
          data: data,
          meta: {
            status: status,
            message: message
          }
        };
    },
}