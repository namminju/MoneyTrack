//성공실패 값 처리 json
const resJson = (code = '000', result = false, msg) => {
  const data = {
    code: code,
    result: result,
    msg: msg
  }
  return data;
}

export { resJson };