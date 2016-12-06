export default function parseNumberAsTwoDigits(number) {
  return '0'.concat(number).slice(-2);
}
