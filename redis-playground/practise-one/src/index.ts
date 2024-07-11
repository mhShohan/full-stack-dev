import { listConnect } from "./list"
import { stringConnect } from "./string"

const init = async () => {
  await stringConnect()
  await listConnect()
}

init()