import { hashMapConnect } from "./hashMap"
import { listConnect } from "./list"
import { setConnect } from "./set"
import { stringConnect } from "../string"

const init = async () => {
  // await stringConnect()
  // await listConnect()
  // await setConnect()
  await hashMapConnect()
}

init()