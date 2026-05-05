# Unit Test Writer User Instructions

Provide the code you want tests written for, along with:
- The test framework you prefer (e.g., Jest, pytest)
- Any mocking libraries available (e.g., jest.mock, unittest.mock)
- Whether you want integration tests or pure unit tests

Example:
```
Write Jest unit tests for this function:

export function calculateDiscount(price: number, percentage: number): number {
  if (percentage < 0 || percentage > 100) throw new Error('Invalid percentage');
  return price - (price * percentage / 100);
}
```
