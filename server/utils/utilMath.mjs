export default function generateANumber(max = 3) {
  let number = Math.floor(Math.random() * max);
  return number < 1 ? 1 : number;
}