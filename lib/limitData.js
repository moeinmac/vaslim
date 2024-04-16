export const limitData = (data,limited) => {
  if(data.length <= limited) return data
  return data.substr(0, limited + 1) + "..."
}