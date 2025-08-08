// validateMandatoryColumns.test.js
import { validateMandatoryColumns } from './path-to-your-file';

describe('validateMandatoryColumns', () => {
  const requiredFields = {
    name: 'notBlank',
    age: 'numeric'
  };

  it('should return true when all rules are satisfied', () => {
    const data = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 }
    ];
    expect(validateMandatoryColumns(data, requiredFields)).toBe(true);
  });

  it('should throw when notBlank field is empty', () => {
    const data = [
      { name: '', age: 25 }
    ];
    expect(() =>
      validateMandatoryColumns(data, requiredFields)
    ).toThrowError(/name is blank/);
  });

  it('should throw when numeric field is not a number', () => {
    const data = [
      { name: 'Alice', age: 'abc' }
    ];
    expect(() =>
      validateMandatoryColumns(data, requiredFields)
    ).toThrowError(/age must be numeric or blank/);
  });

  it('should throw grouped errors for multiple rows', () => {
    const data = [
      { name: '', age: 'abc' },
      { name: '', age: 20 },
      { name: 'Charlie', age: 'xyz' }
    ];

    try {
      validateMandatoryColumns(data, requiredFields);
    } catch (err) {
      expect(err.message).toMatch(/name is blank/);
      expect(err.message).toMatch(/age must be numeric or blank/);
      expect(err.message).toMatch(/rows:/); // grouped message output
    }
  });

  it('should allow numeric field to be blank', () => {
    const data = [
      { name: 'Alice', age: '' } // numeric but blank allowed
    ];
    expect(validateMandatoryColumns(data, requiredFields)).toBe(true);
  });
});
