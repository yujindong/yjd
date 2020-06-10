import Test from "./test";
import jsonRpc from "jsonrpc-lite";
console.log(jsonRpc.JsonRpcError.parseError({}));
const test = async () => {
  await Promise.resolve(res => {
    console.log(res);
    res({ name: 1 });
  });
};
export default function core() {
  const a = test().then(res => {
    console.log(res);
    return Test;
  });
  return "222";
  // TODO
}
