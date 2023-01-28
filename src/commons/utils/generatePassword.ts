export default function generateUID(dob) {
  let final = 'KW';

  const now: any = new Date(dob);
  const start: any = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  // random 4 digits
  const val = Math.floor(1000 + Math.random() * 9000);
  const val2 = Math.floor(10 + Math.random() * 90);
  final = final + '' + val + '' + day + '' + val2;

  return final;
}
