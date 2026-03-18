export const encode = (data) => btoa(unescape(encodeURIComponent(JSON.stringify(data))))
export const decode = (hash) => JSON.parse(decodeURIComponent(escape(atob(hash))))
