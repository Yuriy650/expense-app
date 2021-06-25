import { TotalSumPipe } from './total-sum.pipe';

describe('TotalSumPipe', () => {
  let totalSum: TotalSumPipe
  it('create an instance', () => {
    const pipe = new TotalSumPipe();
    expect(pipe).toBeTruthy();
  });
  it ('should include 2 of digits to appear after the decimal point in return price', () => {
    expect(totalSum.transform(100.4565844)).toBe(100.46)
  })
});
