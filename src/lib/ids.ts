enum IdPrefix {
  COMPUTER = "pc_",
  LAMPS = "lamp_",
  EQUIPMENT = "eq_",
  ABSENTEE = "abs_",
  NETWORK = "net_",
  API_KEY = "pk_",
}

export default IdPrefix;

export function generateId(prefix: IdPrefix, length = 32) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
  }

  return `${prefix}${randomId}`;
}
